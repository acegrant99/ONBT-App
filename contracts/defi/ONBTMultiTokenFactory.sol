// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "./ONBTStaking.sol";
import "./ONBTLiquidityPool.sol";
import "./ONBTUniversalLiquidityPool.sol";
import "./ONBTYieldDistributor.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../libraries/ONBTSecurityLib.sol";

/**
 * @title ONBTMultiTokenFactory
 * @dev Enhanced factory contract for deploying ONBT DeFi ecosystem contracts
 * 
 * Features:
 * - Deploy staking contracts
 * - Deploy ONBT/ETH liquidity pools (original)
 * - Deploy universal liquidity pools (any token pair)
 * - Deploy yield distributors
 * - Track all deployments
 * - Validate token pairs
 * - OnchainKit compatible for Base miniapp
 */
contract ONBTMultiTokenFactory is Ownable {
    using ONBTSecurityLib for address;
    
    // ============ State Variables ============
    
    /// @notice ONBT token address
    address public immutable onbtToken;
    
    /// @notice All deployed staking contracts
    address[] public stakingContracts;
    
    /// @notice All deployed ONBT/ETH liquidity pools
    address[] public onbtLiquidityPools;
    
    /// @notice All deployed universal liquidity pools
    address[] public universalLiquidityPools;
    
    /// @notice All deployed yield distributors
    address[] public yieldDistributors;
    
    /// @notice Mapping to verify if address is a deployed contract
    mapping(address => bool) public isDeployedContract;
    
    /// @notice Mapping to check if token pair pool exists
    mapping(address => mapping(address => address)) public getPair;
    
    /// @notice All unique token pairs
    address[] public allPairs;
    
    // ============ Events ============
    
    event StakingDeployed(
        address indexed staking,
        address indexed stakingToken,
        address indexed rewardToken,
        uint256 rewardRate
    );
    
    event ONBTLiquidityPoolDeployed(
        address indexed pool,
        address indexed token,
        address feeRecipient
    );
    
    event UniversalLiquidityPoolDeployed(
        address indexed pool,
        address indexed token0,
        address indexed token1,
        address feeRecipient
    );
    
    event YieldDistributorDeployed(
        address indexed distributor,
        address indexed token
    );
    
    // ============ Constructor ============
    
    constructor(address _onbtToken) {
        ONBTSecurityLib.requireValidAddress(_onbtToken);
        onbtToken = _onbtToken;
    }
    
    // ============ Deployment Functions ============
    
    /**
     * @notice Deploy a new staking contract
     * @param stakingToken Address of token to stake
     * @param rewardToken Address of reward token
     * @param rewardRate Reward rate per second
     * @param minimumStake Minimum stake amount
     * @return staking Address of deployed staking contract
     */
    function deployStaking(
        address stakingToken,
        address rewardToken,
        uint256 rewardRate,
        uint256 minimumStake
    ) external onlyOwner returns (address staking) {
        ONBTSecurityLib.requireValidAddress(stakingToken);
        ONBTSecurityLib.requireValidAddress(rewardToken);
        
        // Deploy new staking contract
        ONBTStaking stakingContract = new ONBTStaking(
            stakingToken,
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
        
        emit StakingDeployed(staking, stakingToken, rewardToken, rewardRate);
    }
    
    /**
     * @notice Deploy a new ONBT/ETH liquidity pool (original)
     * @param feeRecipient Address to receive protocol fees
     * @return pool Address of deployed liquidity pool
     */
    function deployONBTLiquidityPool(
        address feeRecipient
    ) external onlyOwner returns (address pool) {
        ONBTSecurityLib.requireValidAddress(feeRecipient);
        
        // Deploy new ONBT/ETH liquidity pool
        ONBTLiquidityPool liquidityPool = new ONBTLiquidityPool(
            onbtToken,
            feeRecipient
        );
        
        pool = address(liquidityPool);
        
        // Track deployment
        onbtLiquidityPools.push(pool);
        isDeployedContract[pool] = true;
        
        // Transfer ownership to factory owner
        liquidityPool.transferOwnership(owner());
        
        emit ONBTLiquidityPoolDeployed(pool, onbtToken, feeRecipient);
    }
    
    /**
     * @notice Deploy a new universal liquidity pool for any token pair
     * @param tokenA Address of first token
     * @param tokenB Address of second token
     * @param feeRecipient Address to receive protocol fees
     * @return pool Address of deployed liquidity pool
     */
    function deployUniversalLiquidityPool(
        address tokenA,
        address tokenB,
        address feeRecipient
    ) external onlyOwner returns (address pool) {
        // Validate tokens
        ONBTSecurityLib.validateTokenPair(tokenA, tokenB);
        ONBTSecurityLib.requireValidAddress(feeRecipient);
        
        // Sort tokens
        (address token0, address token1) = ONBTSecurityLib.sortTokens(tokenA, tokenB);
        
        // Check if pair already exists
        require(getPair[token0][token1] == address(0), "Pair already exists");
        
        // Deploy new universal liquidity pool
        ONBTUniversalLiquidityPool liquidityPool = new ONBTUniversalLiquidityPool(
            token0,
            token1,
            feeRecipient
        );
        
        pool = address(liquidityPool);
        
        // Track deployment
        universalLiquidityPools.push(pool);
        allPairs.push(pool);
        isDeployedContract[pool] = true;
        
        // Map both directions for easy lookup
        getPair[token0][token1] = pool;
        getPair[token1][token0] = pool;
        
        // Transfer ownership to factory owner
        liquidityPool.transferOwnership(owner());
        
        emit UniversalLiquidityPoolDeployed(pool, token0, token1, feeRecipient);
    }
    
    /**
     * @notice Deploy a new yield distributor
     * @param token Address of token to distribute
     * @return distributor Address of deployed yield distributor
     */
    function deployYieldDistributor(
        address token
    ) external onlyOwner returns (address distributor) {
        ONBTSecurityLib.requireValidAddress(token);
        
        // Deploy new yield distributor
        ONBTYieldDistributor yieldDistributor = new ONBTYieldDistributor(token);
        
        distributor = address(yieldDistributor);
        
        // Track deployment
        yieldDistributors.push(distributor);
        isDeployedContract[distributor] = true;
        
        // Transfer ownership to factory owner
        yieldDistributor.transferOwnership(owner());
        
        emit YieldDistributorDeployed(distributor, token);
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get all deployed staking contracts
     */
    function getStakingContracts() external view returns (address[] memory) {
        return stakingContracts;
    }
    
    /**
     * @notice Get all deployed ONBT/ETH liquidity pools
     */
    function getONBTLiquidityPools() external view returns (address[] memory) {
        return onbtLiquidityPools;
    }
    
    /**
     * @notice Get all deployed universal liquidity pools
     */
    function getUniversalLiquidityPools() external view returns (address[] memory) {
        return universalLiquidityPools;
    }
    
    /**
     * @notice Get all deployed yield distributors
     */
    function getYieldDistributors() external view returns (address[] memory) {
        return yieldDistributors;
    }
    
    /**
     * @notice Get all pairs (universal pools)
     */
    function getAllPairs() external view returns (address[] memory) {
        return allPairs;
    }
    
    /**
     * @notice Get deployment counts
     */
    function getDeploymentCounts() external view returns (
        uint256 stakingCount,
        uint256 onbtPoolCount,
        uint256 universalPoolCount,
        uint256 distributorCount
    ) {
        return (
            stakingContracts.length,
            onbtLiquidityPools.length,
            universalLiquidityPools.length,
            yieldDistributors.length
        );
    }
    
    /**
     * @notice Check if a token pair has a pool
     */
    function pairExists(address tokenA, address tokenB) external view returns (bool) {
        return getPair[tokenA][tokenB] != address(0);
    }
    
    /**
     * @notice Get pool address for a token pair
     */
    function getPool(address tokenA, address tokenB) external view returns (address pool) {
        return getPair[tokenA][tokenB];
    }
    
    /**
     * @notice Get total number of unique pairs
     */
    function allPairsLength() external view returns (uint256) {
        return allPairs.length;
    }
}
