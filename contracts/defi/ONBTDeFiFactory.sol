// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "./ONBTStaking.sol";
import "./ONBTLiquidityPool.sol";
import "./ONBTYieldDistributor.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ONBTDeFiFactory
 * @dev Factory contract for deploying ONBT DeFi ecosystem contracts
 * 
 * Features:
 * - Deploy staking contracts
 * - Deploy liquidity pools
 * - Deploy yield distributors
 * - Track all deployments
 * - OnchainKit compatible for Base miniapp
 */
contract ONBTDeFiFactory is Ownable {
    
    // ============ State Variables ============
    
    /// @notice ONBT token address
    address public immutable onbtToken;
    
    /// @notice All deployed staking contracts
    address[] public stakingContracts;
    
    /// @notice All deployed liquidity pools
    address[] public liquidityPools;
    
    /// @notice All deployed yield distributors
    address[] public yieldDistributors;
    
    /// @notice Mapping to verify if address is a deployed contract
    mapping(address => bool) public isDeployedContract;
    
    // ============ Events ============
    
    event StakingDeployed(
        address indexed staking,
        address indexed rewardToken,
        uint256 rewardRate
    );
    
    event LiquidityPoolDeployed(
        address indexed pool,
        address indexed token0,
        address feeRecipient
    );
    
    event YieldDistributorDeployed(
        address indexed distributor,
        address indexed token
    );
    
    // ============ Constructor ============
    
    constructor(address _onbtToken) {
        require(_onbtToken != address(0), "Invalid token address");
        onbtToken = _onbtToken;
    }
    
    // ============ Deployment Functions ============
    
    /**
     * @notice Deploy a new staking contract
     * @param rewardToken Address of reward token
     * @param rewardRate Reward rate per second
     * @param minimumStake Minimum stake amount
     * @return staking Address of deployed staking contract
     */
    function deployStaking(
        address rewardToken,
        uint256 rewardRate,
        uint256 minimumStake
    ) external onlyOwner returns (address staking) {
        // Deploy new staking contract
        ONBTStaking stakingContract = new ONBTStaking(
            onbtToken,
            rewardToken,
            rewardRate,
            minimumStake
        );
        
        staking = address(stakingContract);
        
        // Track deployment
        stakingContracts.push(staking);
        isDeployedContract[staking] = true;
        
        // Transfer ownership to factory owner
        stakingContract.transferOwnership(owner());
        
        emit StakingDeployed(staking, rewardToken, rewardRate);
    }
    
    /**
     * @notice Deploy a new liquidity pool
     * @param feeRecipient Address to receive protocol fees
     * @return pool Address of deployed liquidity pool
     */
    function deployLiquidityPool(
        address feeRecipient
    ) external onlyOwner returns (address pool) {
        // Deploy new liquidity pool
        ONBTLiquidityPool liquidityPool = new ONBTLiquidityPool(
            onbtToken,
            feeRecipient
        );
        
        pool = address(liquidityPool);
        
        // Track deployment
        liquidityPools.push(pool);
        isDeployedContract[pool] = true;
        
        // Transfer ownership to factory owner
        liquidityPool.transferOwnership(owner());
        
        emit LiquidityPoolDeployed(pool, onbtToken, feeRecipient);
    }
    
    /**
     * @notice Deploy a new yield distributor
     * @return distributor Address of deployed yield distributor
     */
    function deployYieldDistributor() external onlyOwner returns (address distributor) {
        // Deploy new yield distributor
        ONBTYieldDistributor yieldDistributor = new ONBTYieldDistributor(
            onbtToken
        );
        
        distributor = address(yieldDistributor);
        
        // Track deployment
        yieldDistributors.push(distributor);
        isDeployedContract[distributor] = true;
        
        // Transfer ownership to factory owner
        yieldDistributor.transferOwnership(owner());
        
        emit YieldDistributorDeployed(distributor, onbtToken);
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get all deployed staking contracts
     */
    function getStakingContracts() external view returns (address[] memory) {
        return stakingContracts;
    }
    
    /**
     * @notice Get all deployed liquidity pools
     */
    function getLiquidityPools() external view returns (address[] memory) {
        return liquidityPools;
    }
    
    /**
     * @notice Get all deployed yield distributors
     */
    function getYieldDistributors() external view returns (address[] memory) {
        return yieldDistributors;
    }
    
    /**
     * @notice Get deployment counts
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
