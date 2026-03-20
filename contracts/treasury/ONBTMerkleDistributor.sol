// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { OAppOptionsType3 } from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OAppOptionsType3.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { MerkleProof } from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

/**
 * @title ONBTMerkleDistributor
 * @dev LayerZero-enabled omnichain Merkle-tree token distributor for ONBT.
 *
 * Purpose
 * -------
 * Distribute ONBT to predetermined recipients via Merkle proofs. Designed for:
 *   - TGE (Token Generation Event) airdrops
 *   - Early-adopter / community rewards published in waves (rounds)
 *   - Achievement-linked claims tied to ONBTDeFiFactory user registry
 *   - Marketing campaigns with time-bounded claim windows
 *
 * How it works
 * ------------
 * 1. Owner calls `createRound(merkleRoot, totalAmount, startTime, endTime, description)`.
 *    Tokens are pulled from owner and locked in this contract under the round.
 * 2. The Merkle tree encodes `(address beneficiary, uint256 amount)` leaves.
 *    Off-chain tooling (scripts/merkle/) generates the root and per-user proofs.
 * 3. Each user calls `claim(roundId, amount, proof)`. The contract verifies the
 *    Merkle proof, marks the address as claimed for that round, and transfers tokens.
 * 4. After `endTime`, the owner can call `withdrawRemainder(roundId)` to reclaim
 *    any unclaimed tokens.
 *
 * Cross-chain sync (LayerZero OApp)
 * ----------------------------------
 * When a new round is published on chain A, the event is broadcast to all
 * configured peer EIDs so that users on any supported chain can:
 *   a) See the round in their local UI (mirrored metadata)
 *   b) Know to switch to the origin chain to claim (or, if the owner deploys
 *      funded copies, claim locally)
 *
 * Message types
 * -------------
 *   MSG_PUBLISH_ROUND (1) — new round, propagate metadata + root to peer chains
 *   MSG_PAUSE_ROUND   (2) — pause/unpause a round cross-chain
 *   MSG_WITHDRAW      (3) — signal remainder withdrawal (for analytics)
 *
 * Round lifecycle
 * ---------------
 *   PENDING  → startTime not reached
 *   ACTIVE   → startTime ≤ now < endTime (or endTime == 0)
 *   EXPIRED  → endTime > 0 && now ≥ endTime
 *   PAUSED   → manually paused by owner
 *   CLOSED   → remainder withdrawn by owner
 */
contract ONBTMerkleDistributor is OApp, OAppOptionsType3, ReentrancyGuard {
    using SafeERC20 for IERC20;
    using MerkleProof for bytes32[];

    // ============ Message types ============

    uint16 public constant MSG_PUBLISH_ROUND = 1;
    uint16 public constant MSG_PAUSE_ROUND   = 2;
    uint16 public constant MSG_WITHDRAW      = 3;

    // ============ Structs ============

    struct Round {
        bytes32 merkleRoot;
        uint256 totalAmount;      // tokens locked for this round
        uint256 claimedAmount;    // tokens actually claimed so far
        uint256 startTime;        // 0 = claimable immediately
        uint256 endTime;          // 0 = never expires
        bool    paused;
        bool    closed;           // remainder withdrawn, round over
        bool    mirrorOnly;       // true on peer chains — no tokens held locally
        string  description;      // e.g. "TGE Wave 1 — Early Adopters"
        uint32  originEid;        // chain where tokens live
    }

    // ============ State ============

    /// @notice ONBT token
    IERC20 public immutable onbtToken;

    /// @notice Local chain LZ EID
    uint32 public immutable localEid;

    /// @notice Auto-broadcast round publications to peers
    bool public syncEnabled = true;

    /// @notice Default gas for lzReceive on destination
    uint128 public defaultLzReceiveGas = 200_000;

    /// @notice Peer EIDs
    uint32[] public peerEids;
    mapping(uint32 => bool) public isPeerEid;

    /// @notice roundId → Round
    mapping(uint256 => Round) public rounds;

    /// @notice next round ID (starts at 1)
    uint256 public nextRoundId = 1;

    /// @notice roundId → beneficiary → has claimed
    mapping(uint256 => mapping(address => bool)) public hasClaimed;

    // ============ Events ============

    event RoundCreated(
        uint256 indexed roundId,
        bytes32 merkleRoot,
        uint256 totalAmount,
        uint256 startTime,
        uint256 endTime,
        string  description,
        bool    mirrorOnly,
        uint32  originEid
    );
    event Claimed(uint256 indexed roundId, address indexed beneficiary, uint256 amount);
    event RoundPaused(uint256 indexed roundId, bool paused);
    event RemainderWithdrawn(uint256 indexed roundId, uint256 amount);
    event SyncSent(uint16 msgType, uint32 dstEid, uint256 roundId);
    event SyncReceived(uint16 msgType, uint32 srcEid, uint256 roundId);
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

    // ============ Round management ============

    /**
     * @notice Publish a new distribution round.
     *         Tokens are pulled from the owner immediately.
     *
     * @param merkleRoot       Root of the Merkle tree (keccak256 leaves: abi.encodePacked(address, uint256))
     * @param totalAmount      Total tokens to reserve for this round
     * @param startTime        Earliest claim time (0 = now)
     * @param endTime          Latest claim time (0 = no expiry)
     * @param description      Human-readable round label
     */
    function createRound(
        bytes32 merkleRoot,
        uint256 totalAmount,
        uint256 startTime,
        uint256 endTime,
        string calldata description
    ) external onlyOwner returns (uint256 roundId) {
        require(merkleRoot != bytes32(0), "Empty root");
        require(totalAmount > 0, "Amount must be > 0");
        require(endTime == 0 || endTime > block.timestamp, "End time in past");

        roundId = nextRoundId++;

        rounds[roundId] = Round({
            merkleRoot:   merkleRoot,
            totalAmount:  totalAmount,
            claimedAmount: 0,
            startTime:    startTime,
            endTime:      endTime,
            paused:       false,
            closed:       false,
            mirrorOnly:   false,
            description:  description,
            originEid:    localEid
        });

        onbtToken.safeTransferFrom(msg.sender, address(this), totalAmount);

        emit RoundCreated(
            roundId, merkleRoot, totalAmount,
            startTime, endTime, description, false, localEid
        );

        if (syncEnabled) _broadcastRound(roundId, rounds[roundId]);
    }

    /**
     * @notice Pause or unpause claims for a round.
     */
    function setRoundPaused(uint256 roundId, bool paused) external onlyOwner {
        require(rounds[roundId].merkleRoot != bytes32(0), "Round not found");
        rounds[roundId].paused = paused;
        emit RoundPaused(roundId, paused);
        if (syncEnabled) _broadcastPause(roundId, paused);
    }

    /**
     * @notice Withdraw unclaimed tokens after the round has expired.
     *         Only callable on the origin chain after endTime.
     */
    function withdrawRemainder(uint256 roundId) external onlyOwner nonReentrant {
        Round storage r = rounds[roundId];
        require(r.merkleRoot != bytes32(0),  "Round not found");
        require(!r.mirrorOnly,               "Mirror chain: no tokens held");
        require(!r.closed,                   "Already withdrawn");
        require(r.endTime > 0 && block.timestamp >= r.endTime, "Round not expired");

        uint256 remainder = r.totalAmount - r.claimedAmount;
        r.closed = true;

        if (remainder > 0) {
            onbtToken.safeTransfer(owner(), remainder);
        }

        emit RemainderWithdrawn(roundId, remainder);
    }

    // ============ Claim ============

    /**
     * @notice Claim tokens from a Merkle distribution round.
     *
     * @param roundId  The round to claim from
     * @param amount   The allocation amount (must match the tree leaf)
     * @param proof    Merkle proof for (msg.sender, amount) in this round's tree
     */
    function claim(
        uint256 roundId,
        uint256 amount,
        bytes32[] calldata proof
    ) external nonReentrant {
        Round storage r = rounds[roundId];
        require(r.merkleRoot != bytes32(0),                        "Round not found");
        require(!r.paused,                                         "Round paused");
        require(!r.closed,                                         "Round closed");
        require(!r.mirrorOnly,                                     "Claim on origin chain");
        require(r.startTime == 0 || block.timestamp >= r.startTime,"Not started");
        require(r.endTime   == 0 || block.timestamp <  r.endTime,  "Round expired");
        require(!hasClaimed[roundId][msg.sender],                  "Already claimed");

        // Verify Merkle proof — leaf = keccak256(abi.encodePacked(address, uint256))
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, amount));
        require(
            MerkleProof.verify(proof, r.merkleRoot, leaf),
            "Invalid proof"
        );

        hasClaimed[roundId][msg.sender] = true;
        r.claimedAmount += amount;

        onbtToken.safeTransfer(msg.sender, amount);

        emit Claimed(roundId, msg.sender, amount);
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

    /// @notice Fund contract for LZ fees
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

        if (msgType == MSG_PUBLISH_ROUND) {
            (
                ,
                uint256 roundId,
                bytes32 merkleRoot,
                uint256 totalAmount,
                uint256 startTime,
                uint256 endTime,
                string memory description,
                uint32  originEid
            ) = abi.decode(message, (uint16, uint256, bytes32, uint256, uint256, uint256, string, uint32));

            _applyRoundSync(
                roundId, merkleRoot, totalAmount,
                startTime, endTime, description, originEid
            );
            emit SyncReceived(MSG_PUBLISH_ROUND, origin.srcEid, roundId);

        } else if (msgType == MSG_PAUSE_ROUND) {
            (, uint256 roundId, bool paused)
                = abi.decode(message, (uint16, uint256, bool));
            if (rounds[roundId].merkleRoot != bytes32(0)) {
                rounds[roundId].paused = paused;
                emit RoundPaused(roundId, paused);
            }
            emit SyncReceived(MSG_PAUSE_ROUND, origin.srcEid, roundId);
        }
    }

    // ============ Internal — broadcast ============

    function _broadcastRound(uint256 roundId, Round memory r) internal {
        if (peerEids.length == 0) return;
        bytes memory payload = abi.encode(
            MSG_PUBLISH_ROUND,
            roundId,
            r.merkleRoot,
            r.totalAmount,
            r.startTime,
            r.endTime,
            r.description,
            r.originEid
        );
        bytes memory options = _buildOptions(defaultLzReceiveGas);
        for (uint256 i; i < peerEids.length; i++) {
            MessagingFee memory fee = _quote(peerEids[i], payload, options, false);
            if (address(this).balance >= fee.nativeFee) {
                _lzSend(peerEids[i], payload, options, fee, payable(owner()));
                emit SyncSent(MSG_PUBLISH_ROUND, peerEids[i], roundId);
            }
        }
    }

    function _broadcastPause(uint256 roundId, bool paused) internal {
        if (peerEids.length == 0) return;
        bytes memory payload = abi.encode(MSG_PAUSE_ROUND, roundId, paused);
        bytes memory options = _buildOptions(defaultLzReceiveGas);
        for (uint256 i; i < peerEids.length; i++) {
            MessagingFee memory fee = _quote(peerEids[i], payload, options, false);
            if (address(this).balance >= fee.nativeFee) {
                _lzSend(peerEids[i], payload, options, fee, payable(owner()));
                emit SyncSent(MSG_PAUSE_ROUND, peerEids[i], roundId);
            }
        }
    }

    // ============ Internal — apply incoming syncs ============

    function _applyRoundSync(
        uint256 roundId,
        bytes32 merkleRoot,
        uint256 totalAmount,
        uint256 startTime,
        uint256 endTime,
        string memory description,
        uint32  originEid
    ) internal {
        // If nextRoundId is behind, advance it to avoid future collisions
        if (roundId >= nextRoundId) nextRoundId = roundId + 1;
        if (rounds[roundId].merkleRoot != bytes32(0)) return; // already known

        rounds[roundId] = Round({
            merkleRoot:    merkleRoot,
            totalAmount:   totalAmount,
            claimedAmount: 0,
            startTime:     startTime,
            endTime:       endTime,
            paused:        false,
            closed:        false,
            mirrorOnly:    true,           // peer chains don't hold tokens
            description:   description,
            originEid:     originEid
        });

        emit RoundCreated(
            roundId, merkleRoot, totalAmount,
            startTime, endTime, description, true, originEid
        );
    }

    function _buildOptions(uint128 gas) internal pure returns (bytes memory) {
        return abi.encodePacked(uint16(3), uint8(1), uint128(gas));
    }

    // ============ Views ============

    /**
     * @notice Full round info
     */
    function getRound(uint256 roundId) external view returns (Round memory) {
        return rounds[roundId];
    }

    /**
     * @notice Whether a beneficiary has claimed in a given round
     */
    function claimed(uint256 roundId, address beneficiary) external view returns (bool) {
        return hasClaimed[roundId][beneficiary];
    }

    /**
     * @notice Remaining claimable tokens in a round
     */
    function remainingAmount(uint256 roundId) external view returns (uint256) {
        Round storage r = rounds[roundId];
        if (r.totalAmount <= r.claimedAmount) return 0;
        return r.totalAmount - r.claimedAmount;
    }

    /**
     * @notice Quote native fee to broadcast a round to all peer EIDs
     */
    function quoteRoundSync(uint256 roundId) external view returns (uint256 totalFee) {
        Round storage r = rounds[roundId];
        require(r.merkleRoot != bytes32(0), "Round not found");
        bytes memory payload = abi.encode(
            MSG_PUBLISH_ROUND,
            roundId,
            r.merkleRoot,
            r.totalAmount,
            r.startTime,
            r.endTime,
            r.description,
            r.originEid
        );
        bytes memory options = _buildOptions(defaultLzReceiveGas);
        for (uint256 i; i < peerEids.length; i++) {
            MessagingFee memory fee = _quote(peerEids[i], payload, options, false);
            totalFee += fee.nativeFee;
        }
    }

    /**
     * @notice Verify a proof without claiming (for UI dry-run)
     */
    function verifyProof(
        uint256   roundId,
        address   beneficiary,
        uint256   amount,
        bytes32[] calldata proof
    ) external view returns (bool valid) {
        bytes32 leaf = keccak256(abi.encodePacked(beneficiary, amount));
        valid = MerkleProof.verify(proof, rounds[roundId].merkleRoot, leaf);
    }

    function getPeerEids() external view returns (uint32[] memory) { return peerEids; }
}
