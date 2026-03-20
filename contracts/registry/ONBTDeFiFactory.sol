// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { OAppOptionsType3 } from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OAppOptionsType3.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ONBTDeFiFactory
 * @dev Omnichain registry for the ONBT DeFi ecosystem (LayerZero OApp).
 *
 * Tracks two categories of entries:
 *
 * 1. Contracts â€” owner-registered staking, liquidity pool, and yield
 *    distributor deployments. Registrations are broadcast cross-chain so
 *    every peer registry stays in sync (MSG_SYNC_CONTRACT).
 *
 * 2. Users â€” self-registered ecosystem participants. Registration is
 *    permissionless. User registrations are optionally broadcast cross-chain
 *    (MSG_SYNC_USER) so apps on any chain can query local state.
 *
 * LayerZero message types
 * -----------------------
 *   MSG_SYNC_USER     (1) â€” propagate a user registration to peer registries
 *   MSG_SYNC_CONTRACT (2) â€” propagate a contract registration to peer registries
 *   MSG_NOTIFY        (3) â€” fire-and-forget notification to an ecosystem
 *                           contract (e.g. staking contract learns a new user exists)
 *
 * User roles
 * ----------
 *   0 = General participant
 *   1 = Staker
 *   2 = LP Provider
 *   3 = Governance Participant
 *   4 = Early Adopter  (first EARLY_ADOPTER_THRESHOLD registrations)
 *
 * Cross-chain flow (registerUser example)
 * ----------------------------------------
 *   1. User calls registerUser() on chain A.
 *   2. Registry records UserInfo locally.
 *   3. If syncEnabled, _broadcastUser() sends MSG_SYNC_USER to all peer EIDs.
 *   4. Each peer's _lzReceive decodes the message and calls _applyUserSync().
 *   5. Peer registry records the user locally (same registrationId, same role).
 */
contract ONBTDeFiFactory is OApp, OAppOptionsType3 {

    // ============ LZ message type constants ============

    uint16 public constant MSG_SYNC_USER     = 1;
    uint16 public constant MSG_SYNC_CONTRACT = 2;
    uint16 public constant MSG_NOTIFY        = 3;

    // â”€â”€ Contract-type tags (embedded in MSG_SYNC_CONTRACT) â”€â”€
    uint8 public constant CONTRACT_STAKING    = 1;
    uint8 public constant CONTRACT_POOL       = 2;
    uint8 public constant CONTRACT_YIELD      = 3;

    // ============ Constants ============

    /// @notice First N user registrations auto-tagged as Early Adopter (role 4)
    uint256 public constant EARLY_ADOPTER_THRESHOLD = 1000;

    // ============ Cross-chain config ============

    /// @notice Local chain LayerZero EID
    uint32 public immutable localEid;

    /// @notice Whether to automatically broadcast registrations cross-chain
    bool public syncEnabled = true;

    /// @notice Default gas for lzReceive on the destination side
    uint128 public defaultLzReceiveGas = 200_000;

    /// @notice Peer EIDs to broadcast to (set by owner)
    uint32[] public peerEids;
    mapping(uint32 => bool) public isPeerEid;

    // ============ Contract registry ============

    /// @notice ONBT token address (informational reference)
    address public immutable onbtToken;

    address[] public stakingContracts;
    address[] public liquidityPools;
    address[] public yieldDistributors;

    mapping(address => bool) public isRegisteredContract;

    // ============ User registry ============

    struct UserInfo {
        bool     registered;
        uint8    role;            // 0â€“4
        uint256  registeredAt;   // block.timestamp
        uint256  registrationId; // sequential (1-based)
        uint32   originEid;      // chain where registration originated
    }

    address[]                    public registeredUsers;
    mapping(address => UserInfo) public users;

    // ============ Events ============

    event StakingRegistered(address indexed staking);
    event LiquidityPoolRegistered(address indexed pool);
    event YieldDistributorRegistered(address indexed distributor);

    event UserRegistered(address indexed user, uint256 indexed registrationId, uint8 role, uint32 originEid);
    event UserDeregistered(address indexed user);
    event UserRoleUpdated(address indexed user, uint8 oldRole, uint8 newRole);

    event SyncSent(uint16 msgType, uint32 dstEid, bytes payload);
    event SyncReceived(uint16 msgType, uint32 srcEid);
    event NotificationSent(address indexed target, uint32 dstEid, bytes payload);

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
        onbtToken  = _onbtToken;
        localEid   = _localEid;
    }

    // ============ Contract registration (owner only) ============

    function registerStaking(address staking) external onlyOwner {
        require(staking != address(0), "Invalid address");
        require(!isRegisteredContract[staking], "Already registered");
        stakingContracts.push(staking);
        isRegisteredContract[staking] = true;
        emit StakingRegistered(staking);
        if (syncEnabled) _broadcastContract(staking, CONTRACT_STAKING);
    }

    function registerLiquidityPool(address pool) external onlyOwner {
        require(pool != address(0), "Invalid address");
        require(!isRegisteredContract[pool], "Already registered");
        liquidityPools.push(pool);
        isRegisteredContract[pool] = true;
        emit LiquidityPoolRegistered(pool);
        if (syncEnabled) _broadcastContract(pool, CONTRACT_POOL);
    }

    function registerYieldDistributor(address distributor) external onlyOwner {
        require(distributor != address(0), "Invalid address");
        require(!isRegisteredContract[distributor], "Already registered");
        yieldDistributors.push(distributor);
        isRegisteredContract[distributor] = true;
        emit YieldDistributorRegistered(distributor);
        if (syncEnabled) _broadcastContract(distributor, CONTRACT_YIELD);
    }

    // ============ User registration (permissionless) ============

    /**
     * @notice Register msg.sender as an ecosystem participant.
     * Optionally broadcasts the registration to all peer chains via LayerZero.
     * @param syncFee  Native fee to cover cross-chain broadcast (0 = local only)
     */
    function registerUser(uint256 syncFee) external payable {
        uint256 paid = syncFee > 0 ? syncFee : msg.value;
        _registerUserLocal(msg.sender);
        if (syncEnabled && peerEids.length > 0) {
            _broadcastUser(msg.sender, users[msg.sender], paid);
        }
    }

    /**
     * @notice Owner registers a user on their behalf (airdrops, whitelists).
     */
    function registerUserFor(address user) external onlyOwner {
        require(user != address(0), "Invalid address");
        _registerUserLocal(user);
        // Owner-managed registrations do not auto-broadcast (call broadcastUser separately)
    }

    /**
     * @notice Owner removes a user from the registry.
     */
    function deregisterUser(address user) external onlyOwner {
        require(users[user].registered, "Not registered");
        users[user].registered = false;
        emit UserDeregistered(user);
    }

    /**
     * @notice Owner updates a user's role.
     */
    function setUserRole(address user, uint8 newRole) external onlyOwner {
        require(users[user].registered, "Not registered");
        require(newRole <= 4, "Invalid role");
        uint8 old = users[user].role;
        users[user].role = newRole;
        emit UserRoleUpdated(user, old, newRole);
    }

    // ============ Cross-chain helpers (owner callable) ============

    /**
     * @notice Manually broadcast a user registration to all peers.
     * Useful for owner-registered users or retrying failed syncs.
     */
    function broadcastUser(address user) external payable onlyOwner {
        require(users[user].registered, "Not registered");
        _broadcastUser(user, users[user], msg.value);
    }

    /**
     * @notice Send a fire-and-forget notification payload to a specific
     *         ecosystem contract on a remote chain (e.g. staking contract).
     * @param dstEid    Destination chain EID
     * @param target    Address of the contract on the destination chain
     * @param payload   Arbitrary bytes the target's LZ receiver will interpret
     */
    function sendNotification(
        uint32 dstEid,
        address target,
        bytes calldata payload
    ) external payable onlyOwner {
        bytes memory encoded = abi.encode(MSG_NOTIFY, target, payload);
        bytes memory options = _buildOptions(defaultLzReceiveGas);
        MessagingFee memory fee = _quote(dstEid, encoded, options, false);
        require(msg.value >= fee.nativeFee, "Insufficient fee");
        _lzSend(dstEid, encoded, options, fee, payable(msg.sender));
        emit NotificationSent(target, dstEid, payload);
    }

    /**
     * @notice Quote the native fee to broadcast a user registration.
     */
    function quoteUserSync(address user) external view returns (uint256 totalFee) {
        require(users[user].registered, "Not registered");
        UserInfo memory info = users[user];
        bytes memory payload = abi.encode(
            MSG_SYNC_USER, user, info.role, info.registeredAt, info.registrationId, info.originEid
        );
        bytes memory options = _buildOptions(defaultLzReceiveGas);
        for (uint256 i; i < peerEids.length; i++) {
            MessagingFee memory fee = _quote(peerEids[i], payload, options, false);
            totalFee += fee.nativeFee;
        }
    }

    // ============ LZ receive ============

    function _lzReceive(
        Origin calldata origin,
        bytes32, // guid
        bytes calldata message,
        address, // executor
        bytes calldata  // extraData
    ) internal override {
        uint16 msgType = abi.decode(message[:2], (uint16));

        if (msgType == MSG_SYNC_USER) {
            (
                ,
                address user,
                uint8   role,
                uint256 registeredAt,
                uint256 registrationId,
                uint32  originEid
            ) = abi.decode(message, (uint16, address, uint8, uint256, uint256, uint32));
            _applyUserSync(user, role, registeredAt, registrationId, originEid);

        } else if (msgType == MSG_SYNC_CONTRACT) {
            (, address contractAddr, uint8 contractType)
                = abi.decode(message, (uint16, address, uint8));
            _applyContractSync(contractAddr, contractType);

        }
        // MSG_NOTIFY is handled by the target contract directly via its own LZ path;
        // we only emit the event here for observability.

        emit SyncReceived(msgType, origin.srcEid);
    }

    // ============ Internal â€” broadcast ============

    function _broadcastUser(address user, UserInfo memory info, uint256 budget) internal {
        bytes memory payload = abi.encode(
            MSG_SYNC_USER,
            user,
            info.role,
            info.registeredAt,
            info.registrationId,
            info.originEid
        );
        bytes memory options = _buildOptions(defaultLzReceiveGas);
        uint256 perChain = peerEids.length > 0 ? budget / peerEids.length : 0;
        for (uint256 i; i < peerEids.length; i++) {
            MessagingFee memory fee = MessagingFee({ nativeFee: perChain, lzTokenFee: 0 });
            _lzSend(peerEids[i], payload, options, fee, payable(msg.sender));
            emit SyncSent(MSG_SYNC_USER, peerEids[i], payload);
        }
    }

    function _broadcastContract(address contractAddr, uint8 contractType) internal {
        if (peerEids.length == 0) return;
        bytes memory payload = abi.encode(MSG_SYNC_CONTRACT, contractAddr, contractType);
        bytes memory options = _buildOptions(defaultLzReceiveGas);
        for (uint256 i; i < peerEids.length; i++) {
            MessagingFee memory fee = _quote(peerEids[i], payload, options, false);
            // Contract syncs are owner-initiated; owner must fund via msg.value not yet here.
            // Actual send happens only when owner calls with ETH; skip if balance insufficient.
            if (address(this).balance >= fee.nativeFee) {
                _lzSend(peerEids[i], payload, options, fee, payable(owner()));
                emit SyncSent(MSG_SYNC_CONTRACT, peerEids[i], payload);
            }
        }
    }

    // ============ Internal â€” apply incoming syncs ============

    function _applyUserSync(
        address user,
        uint8   role,
        uint256 registeredAt,
        uint256 registrationId,
        uint32  originEid
    ) internal {
        if (users[user].registered) return; // already known locally â€” don't overwrite
        users[user] = UserInfo({
            registered:     true,
            role:           role,
            registeredAt:   registeredAt,
            registrationId: registrationId,
            originEid:      originEid
        });
        registeredUsers.push(user);
        emit UserRegistered(user, registrationId, role, originEid);
    }

    function _applyContractSync(address contractAddr, uint8 contractType) internal {
        if (isRegisteredContract[contractAddr]) return;
        isRegisteredContract[contractAddr] = true;
        if (contractType == CONTRACT_STAKING) {
            stakingContracts.push(contractAddr);
            emit StakingRegistered(contractAddr);
        } else if (contractType == CONTRACT_POOL) {
            liquidityPools.push(contractAddr);
            emit LiquidityPoolRegistered(contractAddr);
        } else if (contractType == CONTRACT_YIELD) {
            yieldDistributors.push(contractAddr);
            emit YieldDistributorRegistered(contractAddr);
        }
    }

    function _registerUserLocal(address user) internal {
        require(!users[user].registered, "Already registered");
        uint256 id   = registeredUsers.length + 1;
        uint8   role = id <= EARLY_ADOPTER_THRESHOLD ? 4 : 0;
        users[user] = UserInfo({
            registered:     true,
            role:           role,
            registeredAt:   block.timestamp,
            registrationId: id,
            originEid:      localEid
        });
        registeredUsers.push(user);
        emit UserRegistered(user, id, role, localEid);
    }

    function _buildOptions(uint128 gas) internal pure returns (bytes memory) {
        // OAppOptionsType3 executor option: gas limit for lzReceive
        return abi.encodePacked(uint16(3), uint8(1), uint128(gas));
    }

    // ============ Admin ============

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

    function setPeer(uint32 _eid, bytes32 _peer) public override onlyOwner {
        super.setPeer(_eid, _peer);
    }

    /// @notice Allow owner to fund contract for contract-sync LZ fees
    receive() external payable {}

    // ============ View â€” contracts ============

    function getStakingContracts()  external view returns (address[] memory) { return stakingContracts; }
    function getLiquidityPools()    external view returns (address[] memory) { return liquidityPools; }
    function getYieldDistributors() external view returns (address[] memory) { return yieldDistributors; }
    function getPeerEids()          external view returns (uint32[] memory)  { return peerEids; }

    function getDeploymentCounts() external view returns (
        uint256 stakingCount, uint256 poolCount, uint256 distributorCount
    ) {
        return (stakingContracts.length, liquidityPools.length, yieldDistributors.length);
    }

    // ============ View â€” users ============

    function getRegisteredUsers() external view returns (address[] memory) { return registeredUsers; }
    function getUserCount()        external view returns (uint256)          { return registeredUsers.length; }
    function getUser(address user) external view returns (UserInfo memory) { return users[user]; }
    function isRegisteredUser(address user) external view returns (bool)   { return users[user].registered; }

    function getUsersPaginated(uint256 offset, uint256 limit)
        external view returns (address[] memory page)
    {
        uint256 total = registeredUsers.length;
        if (offset >= total) return new address[](0);
        uint256 end = offset + limit > total ? total : offset + limit;
        page = new address[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            page[i - offset] = registeredUsers[i];
        }
    }
}
