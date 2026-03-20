// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ONBTDeFiFactory
 * @dev Registry contract for the ONBT DeFi ecosystem.
 *
 * Tracks two categories of entries:
 *
 * 1. Contracts — owner-registered staking, liquidity pool, and yield
 *    distributor deployments. Single source of truth for the frontend.
 *
 * 2. Users — self-registered ecosystem participants. Registration is
 *    permissionless (anyone can join) and records a timestamp, enabling:
 *    - Early-adopter detection (ties into ONBTAchievementNFT)
 *    - On-chain participant count for analytics
 *    - Owner-managed admin registration (airdrops, private-sale whitelists)
 *    - Owner-managed deregistration (spam/bot removal)
 *
 *    User roles (optional tag, default 0):
 *      0 = General participant
 *      1 = Staker
 *      2 = LP Provider
 *      3 = Governance Participant
 *      4 = Early Adopter  (first EARLY_ADOPTER_THRESHOLD registrations)
 */
contract ONBTDeFiFactory is Ownable {

    // ============ Constants ============

    /// @notice First N users automatically tagged as early adopters (role 4)
    uint256 public constant EARLY_ADOPTER_THRESHOLD = 1000;

    // ============ Contract registry ============

    /// @notice ONBT token address (informational reference)
    address public immutable onbtToken;

    address[] public stakingContracts;
    address[] public liquidityPools;
    address[] public yieldDistributors;

    /// @notice Whether an address is a registered ecosystem contract
    mapping(address => bool) public isRegisteredContract;

    // ============ User registry ============

    struct UserInfo {
        bool     registered;
        uint8    role;            // 0–4 — see natspec above
        uint256  registeredAt;   // block.timestamp at registration
        uint256  registrationId; // sequential (1-based), useful for early-adopter rank
    }

    address[] public registeredUsers;
    mapping(address => UserInfo) public users;

    // ============ Events ============

    event StakingRegistered(address indexed staking);
    event LiquidityPoolRegistered(address indexed pool);
    event YieldDistributorRegistered(address indexed distributor);

    event UserRegistered(address indexed user, uint256 indexed registrationId, uint8 role);
    event UserDeregistered(address indexed user);
    event UserRoleUpdated(address indexed user, uint8 oldRole, uint8 newRole);

    // ============ Constructor ============

    constructor(address _onbtToken) {
        require(_onbtToken != address(0), "Invalid token address");
        onbtToken = _onbtToken;
    }

    // ============ Contract registration (owner only) ============

    function registerStaking(address staking) external onlyOwner {
        require(staking != address(0), "Invalid address");
        require(!isRegisteredContract[staking], "Already registered");
        stakingContracts.push(staking);
        isRegisteredContract[staking] = true;
        emit StakingRegistered(staking);
    }

    function registerLiquidityPool(address pool) external onlyOwner {
        require(pool != address(0), "Invalid address");
        require(!isRegisteredContract[pool], "Already registered");
        liquidityPools.push(pool);
        isRegisteredContract[pool] = true;
        emit LiquidityPoolRegistered(pool);
    }

    function registerYieldDistributor(address distributor) external onlyOwner {
        require(distributor != address(0), "Invalid address");
        require(!isRegisteredContract[distributor], "Already registered");
        yieldDistributors.push(distributor);
        isRegisteredContract[distributor] = true;
        emit YieldDistributorRegistered(distributor);
    }

    // ============ User registration (permissionless) ============

    /**
     * @notice Register msg.sender as an ecosystem participant.
     * Role is assigned automatically:
     *   - first EARLY_ADOPTER_THRESHOLD users → role 4 (Early Adopter)
     *   - all others → role 0 (General participant)
     */
    function registerUser() external {
        _registerUser(msg.sender);
    }

    /**
     * @notice Owner registers a user on their behalf (airdrop lists, whitelists).
     * @param user Address to register
     */
    function registerUserFor(address user) external onlyOwner {
        require(user != address(0), "Invalid address");
        _registerUser(user);
    }

    /**
     * @notice Owner removes a user from the registry (spam/bot removal).
     * Does NOT shrink the array (marks them inactive via the mapping).
     * @param user Address to deregister
     */
    function deregisterUser(address user) external onlyOwner {
        require(users[user].registered, "Not registered");
        users[user].registered = false;
        emit UserDeregistered(user);
    }

    /**
     * @notice Owner updates a user's role (e.g., promote to Staker after staking detected).
     * @param user    Target address
     * @param newRole New role id (0–4)
     */
    function setUserRole(address user, uint8 newRole) external onlyOwner {
        require(users[user].registered, "Not registered");
        require(newRole <= 4, "Invalid role");
        uint8 old = users[user].role;
        users[user].role = newRole;
        emit UserRoleUpdated(user, old, newRole);
    }

    // ============ Internal ============

    function _registerUser(address user) internal {
        require(!users[user].registered, "Already registered");
        uint256 id = registeredUsers.length + 1; // 1-based rank
        uint8   role = id <= EARLY_ADOPTER_THRESHOLD ? 4 : 0;
        users[user] = UserInfo({
            registered:     true,
            role:           role,
            registeredAt:   block.timestamp,
            registrationId: id
        });
        registeredUsers.push(user);
        emit UserRegistered(user, id, role);
    }

    // ============ View — contracts ============

    function getStakingContracts() external view returns (address[] memory) {
        return stakingContracts;
    }

    function getLiquidityPools() external view returns (address[] memory) {
        return liquidityPools;
    }

    function getYieldDistributors() external view returns (address[] memory) {
        return yieldDistributors;
    }

    function getDeploymentCounts() external view returns (
        uint256 stakingCount,
        uint256 poolCount,
        uint256 distributorCount
    ) {
        return (stakingContracts.length, liquidityPools.length, yieldDistributors.length);
    }

    // ============ View — users ============

    /// @notice All ever-registered user addresses (includes deregistered)
    function getRegisteredUsers() external view returns (address[] memory) {
        return registeredUsers;
    }

    /// @notice Count of users who have ever registered (includes deregistered)
    function getUserCount() external view returns (uint256) {
        return registeredUsers.length;
    }

    /// @notice Full info for a single user
    function getUser(address user) external view returns (UserInfo memory) {
        return users[user];
    }

    /// @notice Whether an address is currently an active registered user
    function isRegisteredUser(address user) external view returns (bool) {
        return users[user].registered;
    }

    /**
     * @notice Paginated user list — avoids unbounded gas on large arrays.
     * @param offset  Start index (0-based)
     * @param limit   Max entries to return
     */
    function getUsersPaginated(uint256 offset, uint256 limit)
        external
        view
        returns (address[] memory page)
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
