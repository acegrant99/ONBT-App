// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ONBTDeFiFactory
 * @dev Registry contract for the ONBT DeFi ecosystem.
 *      Tracks already-deployed staking, liquidity pool, and yield distributor
 *      contracts. The owner registers addresses of live contracts; no new
 *      contracts are deployed by this registry.
 */
contract ONBTDeFiFactory is Ownable {

    // ============ State Variables ============

    /// @notice ONBT token address (informational reference)
    address public immutable onbtToken;

    /// @notice Registered staking contracts
    address[] public stakingContracts;

    /// @notice Registered liquidity pools
    address[] public liquidityPools;

    /// @notice Registered yield distributors
    address[] public yieldDistributors;

    /// @notice Whether an address is registered in this registry
    mapping(address => bool) public isRegisteredContract;

    // ============ Events ============

    event StakingRegistered(address indexed staking);
    event LiquidityPoolRegistered(address indexed pool);
    event YieldDistributorRegistered(address indexed distributor);

    // ============ Constructor ============

    constructor(address _onbtToken) {
        require(_onbtToken != address(0), "Invalid token address");
        onbtToken = _onbtToken;
    }

    // ============ Registration Functions ============

    /**
     * @notice Register an already-deployed staking contract
     * @param staking Address of the deployed staking contract
     */
    function registerStaking(address staking) external onlyOwner {
        require(staking != address(0), "Invalid address");
        require(!isRegisteredContract[staking], "Already registered");
        stakingContracts.push(staking);
        isRegisteredContract[staking] = true;
        emit StakingRegistered(staking);
    }

    /**
     * @notice Register an already-deployed liquidity pool
     * @param pool Address of the deployed liquidity pool
     */
    function registerLiquidityPool(address pool) external onlyOwner {
        require(pool != address(0), "Invalid address");
        require(!isRegisteredContract[pool], "Already registered");
        liquidityPools.push(pool);
        isRegisteredContract[pool] = true;
        emit LiquidityPoolRegistered(pool);
    }

    /**
     * @notice Register an already-deployed yield distributor
     * @param distributor Address of the deployed yield distributor
     */
    function registerYieldDistributor(address distributor) external onlyOwner {
        require(distributor != address(0), "Invalid address");
        require(!isRegisteredContract[distributor], "Already registered");
        yieldDistributors.push(distributor);
        isRegisteredContract[distributor] = true;
        emit YieldDistributorRegistered(distributor);
    }

    // ============ View Functions ============

    /**
     * @notice Get all registered staking contracts
     */
    function getStakingContracts() external view returns (address[] memory) {
        return stakingContracts;
    }

    /**
     * @notice Get all registered liquidity pools
     */
    function getLiquidityPools() external view returns (address[] memory) {
        return liquidityPools;
    }

    /**
     * @notice Get all registered yield distributors
     */
    function getYieldDistributors() external view returns (address[] memory) {
        return yieldDistributors;
    }

    /**
     * @notice Get registered contract counts
     */
    function getDeploymentCounts() external view returns (
        uint256 stakingCount,
        uint256 poolCount,
        uint256 distributorCount
    ) {
        return (
            stakingContracts.length,
            liquidityPools.length,
            yieldDistributors.length
        );
    }
}
