// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { OAppOptionsType3 } from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OAppOptionsType3.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ONBTTokenVesting
 * @dev LayerZero-enabled omnichain token vesting for ONBT.
 *
 * Each beneficiary can hold one or more named "vesting schedules". Every
 * schedule follows the standard cliff + linear-unlock model:
 *
 *   ┌─────────── cliff ───────────┬──────── linear unlock ────────┐
 *   0                          startTime+cliff          startTime+duration
 *
 * Before the cliff expires → 0 tokens claimable.
 * After the cliff          → linear fraction of (totalAmount - claimed) per second.
 * After full duration      → 100 % claimable.
 *
 * Cross-chain sync (LayerZero OApp)
 * ----------------------------------
 * When a schedule is created or revoked on chain A, the event is broadcast to
 * all configured peer EIDs so that UIs on any chain show accurate position data.
 * Token transfers themselves always happen on the chain where the schedule was
 * originally created (originEid). Peer-chain records are read-only mirrors.
 *
 * Message types
 * -------------
 *   MSG_SYNC_SCHEDULE (1) — new schedule created, propagate to peer registries
 *   MSG_SYNC_REVOKE   (2) — schedule revoked on origin, propagate to peers
 *
 * Schedule ID
 * -----------
 *   scheduleId = keccak256(beneficiary, startTime, totalAmount, salt)
 *   Globally unique across chains because origin chain + ID pair identifies it.
 *
 * User roles / who can do what
 * ----------------------------
 *   Owner  → createSchedule, revoke, withdrawExpiredRemainder, addPeerEid, admin
 *   Anyone → claim (only if msg.sender == beneficiary of their own schedule)
 */
contract ONBTTokenVesting is OApp, OAppOptionsType3, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // ============ Message types ============

    uint16 public constant MSG_SYNC_SCHEDULE = 1;
    uint16 public constant MSG_SYNC_REVOKE   = 2;

    // ============ Structs ============

    struct VestingSchedule {
        bool     active;
        bool     revocable;
        bool     revoked;
        address  beneficiary;
        uint256  totalAmount;       // total tokens locked
        uint256  claimedAmount;     // tokens already claimed
        uint256  startTime;         // vesting start (can be future)
        uint256  cliffDuration;     // seconds after startTime before any unlock
        uint256  vestingDuration;   // total seconds from startTime to full unlock
        uint32   originEid;         // chain where tokens actually live
    }

    // ============ State ============

    /// @notice ONBT token
    IERC20 public immutable onbtToken;

    /// @notice Local chain LZ EID
    uint32 public immutable localEid;

    /// @notice Whether to auto-broadcast schedule changes cross-chain
    bool public syncEnabled = true;

    /// @notice Default gas for lzReceive on destination
    uint128 public defaultLzReceiveGas = 200_000;

    /// @notice Peer EIDs to broadcast to
    uint32[] public peerEids;
    mapping(uint32 => bool) public isPeerEid;

    /// @notice All schedule IDs created on this chain
    bytes32[] public allScheduleIds;

    /// @notice scheduleId → VestingSchedule
    mapping(bytes32 => VestingSchedule) public schedules;

    /// @notice beneficiary → list of their scheduleIds
    mapping(address => bytes32[]) public beneficiaryScheduleIds;

    /// @notice Incrementing nonce for schedule ID uniqueness
    uint256 private _nonce;

    // ============ Events ============

    event ScheduleCreated(
        bytes32 indexed scheduleId,
        address indexed beneficiary,
        uint256 totalAmount,
        uint256 startTime,
        uint256 cliffDuration,
        uint256 vestingDuration,
        bool    revocable,
        uint32  originEid
    );
    event Claimed(bytes32 indexed scheduleId, address indexed beneficiary, uint256 amount);
    event Revoked(bytes32 indexed scheduleId, address indexed beneficiary, uint256 returnedAmount);
    event SyncSent(uint16 msgType, uint32 dstEid, bytes32 scheduleId);
    event SyncReceived(uint16 msgType, uint32 srcEid, bytes32 scheduleId);
    event PeerEidAdded(uint32 eid);
    event PeerEidRemoved(uint32 eid);
    event SyncEnabledUpdated(bool enabled);
    event DefaultGasUpdated(uint128 gas);

    // ============ Constructor ============

    constructor(
        address _lzEndpoint,
        address _onbtToken,
        uint32  _localEid
    ) OApp(_lzEndpoint, msg.sender) Ownable() {
        require(_onbtToken != address(0), "Invalid token");
        onbtToken = IERC20(_onbtToken);
        localEid  = _localEid;
    }

    // ============ Schedule creation ============

    /**
     * @notice Create a vesting schedule for a beneficiary.
     *         Tokens are pulled from the caller (owner) immediately.
     *
     * @param beneficiary      Recipient of the vested tokens
     * @param totalAmount      Total tokens to vest
     * @param startTime        Unix timestamp vesting starts (can be future; 0 = now)
     * @param cliffDuration    Seconds after startTime before first unlock
     * @param vestingDuration  Total seconds from startTime to full unlock (>= cliffDuration)
     * @param revocable        Whether the owner can cancel and reclaim unvested tokens
     */
    function createSchedule(
        address beneficiary,
        uint256 totalAmount,
        uint256 startTime,
        uint256 cliffDuration,
        uint256 vestingDuration,
        bool    revocable
    ) external onlyOwner returns (bytes32 scheduleId) {
        require(beneficiary != address(0),            "Invalid beneficiary");
        require(totalAmount > 0,                      "Amount must be > 0");
        require(vestingDuration > 0,                  "Duration must be > 0");
        require(vestingDuration >= cliffDuration,     "Cliff > vesting duration");

        if (startTime == 0) startTime = block.timestamp;

        scheduleId = keccak256(abi.encodePacked(
            beneficiary, startTime, totalAmount, _nonce++, localEid
        ));

        schedules[scheduleId] = VestingSchedule({
            active:          true,
            revocable:       revocable,
            revoked:         false,
            beneficiary:     beneficiary,
            totalAmount:     totalAmount,
            claimedAmount:   0,
            startTime:       startTime,
            cliffDuration:   cliffDuration,
            vestingDuration: vestingDuration,
            originEid:       localEid
        });

        allScheduleIds.push(scheduleId);
        beneficiaryScheduleIds[beneficiary].push(scheduleId);

        // Pull tokens from owner
        onbtToken.safeTransferFrom(msg.sender, address(this), totalAmount);

        emit ScheduleCreated(
            scheduleId, beneficiary, totalAmount,
            startTime, cliffDuration, vestingDuration, revocable, localEid
        );

        if (syncEnabled) _broadcastSchedule(scheduleId, schedules[scheduleId]);
    }

    // ============ Claim ============

    /**
     * @notice Beneficiary claims all currently vested tokens.
     * @param scheduleId  The schedule to claim from
     */
    function claim(bytes32 scheduleId) external nonReentrant {
        VestingSchedule storage s = schedules[scheduleId];
        require(s.active,                        "Schedule not found");
        require(!s.revoked,                      "Schedule revoked");
        require(s.originEid == localEid,         "Claim on origin chain only");
        require(s.beneficiary == msg.sender,     "Not beneficiary");

        uint256 claimable = _claimableAmount(s);
        require(claimable > 0, "Nothing to claim");

        s.claimedAmount += claimable;
        onbtToken.safeTransfer(msg.sender, claimable);

        emit Claimed(scheduleId, msg.sender, claimable);
    }

    // ============ Revoke ============

    /**
     * @notice Owner revokes a revocable schedule.
     *         Vested-but-unclaimed tokens remain claimable by the beneficiary.
     *         Unvested tokens are returned to the owner.
     * @param scheduleId  Schedule to revoke
     */
    function revoke(bytes32 scheduleId) external onlyOwner nonReentrant {
        VestingSchedule storage s = schedules[scheduleId];
        require(s.active,            "Schedule not found");
        require(s.revocable,         "Not revocable");
        require(!s.revoked,          "Already revoked");
        require(s.originEid == localEid, "Revoke on origin chain only");

        // Vested amount stays claimable — only return unvested portion
        uint256 vested      = _vestedAmount(s);
        uint256 unvested    = s.totalAmount - vested;
        s.revoked         = true;
        // Reduce totalAmount to what was vested; claimedAmount stays as-is
        // so beneficiary can still claim (vested - claimedAmount)
        s.totalAmount     = vested;

        if (unvested > 0) {
            onbtToken.safeTransfer(owner(), unvested);
        }

        emit Revoked(scheduleId, s.beneficiary, unvested);

        if (syncEnabled) _broadcastRevoke(scheduleId, s.beneficiary);
    }

    // ============ Admin ============

    function setPeer(uint32 _eid, bytes32 _peer) public override onlyOwner {
        super.setPeer(_eid, _peer);
    }

    function addPeerEid(uint32 eid) external onlyOwner {
        require(!isPeerEid[eid], "Already added");
        isPeerEid[eid] = true;
        peerEids.push(eid);
        emit PeerEidAdded(eid);
    }

    function removePeerEid(uint32 eid) external onlyOwner {
        require(isPeerEid[eid], "Not a peer");
        isPeerEid[eid] = false;
        uint256 len = peerEids.length;
        for (uint256 i; i < len; i++) {
            if (peerEids[i] == eid) {
                peerEids[i] = peerEids[len - 1];
                peerEids.pop();
                break;
            }
        }
        emit PeerEidRemoved(eid);
    }

    function setSyncEnabled(bool enabled) external onlyOwner {
        syncEnabled = enabled;
        emit SyncEnabledUpdated(enabled);
    }

    function setDefaultLzReceiveGas(uint128 gas) external onlyOwner {
        require(gas >= 50_000, "Too low");
        defaultLzReceiveGas = gas;
        emit DefaultGasUpdated(gas);
    }

    /// @notice Allow owner to fund contract for LZ fees
    receive() external payable {}

    // ============ LZ receive ============

    function _lzReceive(
        Origin calldata origin,
        bytes32, // guid
        bytes calldata message,
        address, // executor
        bytes calldata  // extraData
    ) internal override {
        uint16 msgType = abi.decode(message[:2], (uint16));

        if (msgType == MSG_SYNC_SCHEDULE) {
            (
                ,
                bytes32 scheduleId,
                address beneficiary,
                uint256 totalAmount,
                uint256 startTime,
                uint256 cliffDuration,
                uint256 vestingDuration,
                bool    revocable,
                uint32  originEid
            ) = abi.decode(message, (uint16, bytes32, address, uint256, uint256, uint256, uint256, bool, uint32));

            _applyScheduleSync(
                scheduleId, beneficiary, totalAmount,
                startTime, cliffDuration, vestingDuration, revocable, originEid
            );
        } else if (msgType == MSG_SYNC_REVOKE) {
            (, bytes32 scheduleId) = abi.decode(message, (uint16, bytes32));
            _applyRevokeSync(scheduleId);
        }

        emit SyncReceived(msgType, origin.srcEid, bytes32(0));
    }

    // ============ Internal — broadcast ============

    function _broadcastSchedule(bytes32 scheduleId, VestingSchedule memory s) internal {
        if (peerEids.length == 0) return;
        bytes memory payload = abi.encode(
            MSG_SYNC_SCHEDULE,
            scheduleId,
            s.beneficiary,
            s.totalAmount,
            s.startTime,
            s.cliffDuration,
            s.vestingDuration,
            s.revocable,
            s.originEid
        );
        bytes memory options = _buildOptions(defaultLzReceiveGas);
        for (uint256 i; i < peerEids.length; i++) {
            if (address(this).balance > 0) {
                MessagingFee memory fee = _quote(peerEids[i], payload, options, false);
                if (address(this).balance >= fee.nativeFee) {
                    _lzSend(peerEids[i], payload, options, fee, payable(owner()));
                    emit SyncSent(MSG_SYNC_SCHEDULE, peerEids[i], scheduleId);
                }
            }
        }
    }

    function _broadcastRevoke(bytes32 scheduleId, address /* beneficiary */ ) internal {
        if (peerEids.length == 0) return;
        bytes memory payload = abi.encode(MSG_SYNC_REVOKE, scheduleId);
        bytes memory options = _buildOptions(defaultLzReceiveGas);
        for (uint256 i; i < peerEids.length; i++) {
            MessagingFee memory fee = _quote(peerEids[i], payload, options, false);
            if (address(this).balance >= fee.nativeFee) {
                _lzSend(peerEids[i], payload, options, fee, payable(owner()));
                emit SyncSent(MSG_SYNC_REVOKE, peerEids[i], scheduleId);
            }
        }
    }

    // ============ Internal — apply incoming syncs ============

    function _applyScheduleSync(
        bytes32 scheduleId,
        address beneficiary,
        uint256 totalAmount,
        uint256 startTime,
        uint256 cliffDuration,
        uint256 vestingDuration,
        bool    revocable,
        uint32  originEid
    ) internal {
        if (schedules[scheduleId].active) return; // already known
        schedules[scheduleId] = VestingSchedule({
            active:          true,
            revocable:       revocable,
            revoked:         false,
            beneficiary:     beneficiary,
            totalAmount:     totalAmount,
            claimedAmount:   0,
            startTime:       startTime,
            cliffDuration:   cliffDuration,
            vestingDuration: vestingDuration,
            originEid:       originEid
        });
        allScheduleIds.push(scheduleId);
        beneficiaryScheduleIds[beneficiary].push(scheduleId);
        emit ScheduleCreated(
            scheduleId, beneficiary, totalAmount,
            startTime, cliffDuration, vestingDuration, revocable, originEid
        );
    }

    function _applyRevokeSync(bytes32 scheduleId) internal {
        VestingSchedule storage s = schedules[scheduleId];
        if (!s.active || s.revoked) return;
        s.revoked = true;
        emit Revoked(scheduleId, s.beneficiary, 0);
    }

    // ============ Internal — math ============

    function _vestedAmount(VestingSchedule storage s) internal view returns (uint256) {
        if (block.timestamp < s.startTime + s.cliffDuration) return 0;
        if (block.timestamp >= s.startTime + s.vestingDuration) return s.totalAmount;
        uint256 elapsed = block.timestamp - s.startTime;
        return (s.totalAmount * elapsed) / s.vestingDuration;
    }

    function _claimableAmount(VestingSchedule storage s) internal view returns (uint256) {
        uint256 vested = _vestedAmount(s);
        return vested > s.claimedAmount ? vested - s.claimedAmount : 0;
    }

    function _buildOptions(uint128 gas) internal pure returns (bytes memory) {
        return abi.encodePacked(uint16(3), uint8(1), uint128(gas));
    }

    // ============ Views ============

    /**
     * @notice How much has vested (regardless of claims) for a schedule
     */
    function vestedAmount(bytes32 scheduleId) external view returns (uint256) {
        return _vestedAmount(schedules[scheduleId]);
    }

    /**
     * @notice How much is currently claimable for a schedule
     */
    function claimableAmount(bytes32 scheduleId) external view returns (uint256) {
        return _claimableAmount(schedules[scheduleId]);
    }

    /**
     * @notice All schedule IDs for a given beneficiary
     */
    function getScheduleIds(address beneficiary) external view returns (bytes32[] memory) {
        return beneficiaryScheduleIds[beneficiary];
    }

    /**
     * @notice Total number of schedules created on this chain
     */
    function totalSchedules() external view returns (uint256) {
        return allScheduleIds.length;
    }

    /**
     * @notice Paginated schedule ID list
     */
    function getSchedulesPaginated(uint256 offset, uint256 limit)
        external view returns (bytes32[] memory page)
    {
        uint256 total = allScheduleIds.length;
        if (offset >= total) return new bytes32[](0);
        uint256 end = offset + limit > total ? total : offset + limit;
        page = new bytes32[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            page[i - offset] = allScheduleIds[i];
        }
    }

    /**
     * @notice Quote native fee to broadcast a schedule to all peer EIDs
     */
    function quoteScheduleSync(bytes32 scheduleId) external view returns (uint256 totalFee) {
        VestingSchedule storage s = schedules[scheduleId];
        require(s.active, "Schedule not found");
        bytes memory payload = abi.encode(
            MSG_SYNC_SCHEDULE,
            scheduleId,
            s.beneficiary,
            s.totalAmount,
            s.startTime,
            s.cliffDuration,
            s.vestingDuration,
            s.revocable,
            s.originEid
        );
        bytes memory options = _buildOptions(defaultLzReceiveGas);
        for (uint256 i; i < peerEids.length; i++) {
            MessagingFee memory fee = _quote(peerEids[i], payload, options, false);
            totalFee += fee.nativeFee;
        }
    }

    function getPeerEids() external view returns (uint32[] memory) { return peerEids; }
}
