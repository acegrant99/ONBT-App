// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { IUniswapV3SwapRouter, IUniswapV3NonfungiblePositionManager } from "./interfaces/IUniswapV3.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title ONBTPoolManager
 * @dev LayerZero-enabled Uniswap V3 pool manager for ONBT
 * Coordinates pool creation and liquidity across multiple chains
 */
contract ONBTPoolManager is OApp {
    using SafeERC20 for IERC20;

    // ============ Constants & State ============
    
    IUniswapV3SwapRouter public immutable swapRouter;
    IUniswapV3NonfungiblePositionManager public immutable nftPositionManager;
    IERC20 public immutable onbtToken;

    struct PoolInfo {
        bytes32 poolId;
        address token0;
        address token1;
        uint24 fee;
        uint256 initialLiquidity;
        bool isActive;
    }

    struct LiquidityOp {
        bytes32 poolId;
        uint256 amount;
        bool isDeposit;
        uint64 timestamp;
    }

    struct CrossChainPoolSync {
        bytes32 poolId;
        uint32 srcEid;
        uint256 liquidity;
        uint256 swapVolume;
        uint256 feesCollected;
    }

    /// @notice Maps pool ID to pool info
    mapping(bytes32 => PoolInfo) public poolInfos;
    
    /// @notice Maps pool ID to chain EID for cross-chain tracking
    mapping(bytes32 => uint32) public poolToChainEid;
    
    /// @notice Maps pool ID to its liquidity allocation
    mapping(bytes32 => uint256) public poolAllocations;
    
    /// @notice Maps pool ID to current funded amount
    mapping(bytes32 => uint256) public poolFunded;
    
    /// @notice Maps (poolId, chainEid) to peer pool address for cross-chain sync
    mapping(bytes32 => mapping(uint32 => address)) public crossChainPeers;
    
    /// @notice Tracks NFT positions per pool
    mapping(bytes32 => uint256[]) public poolTokenIds;
    
    /// @notice Fee collector address
    address public feeCollector;

    /// @notice Rewards collector address
    address public rewardsCollector;

    /// @notice Share of fees sent to rewards collector in basis points
    uint16 public rewardsBps;

    uint16 public constant MAX_BPS = 10_000;
    uint24 public constant MIN_UNISWAP_FEE = 100;
    uint24 public constant MAX_UNISWAP_FEE = 1_000_000;
    
    /// @notice Pending liquidity operations
    mapping(uint32 => LiquidityOp[]) public pendingOps;

    // ============ Events ============
    
    event PoolCreated(
        bytes32 indexed poolId,
        address token0,
        address token1,
        uint24 fee,
        uint256 initialLiquidity
    );

    event PoolRegistered(
        bytes32 indexed poolId,
        uint32 chainEid,
        address indexed peerPool
    );

    event LiquidityAllocated(
        bytes32 indexed poolId,
        uint256 amount
    );

    event LiquidityDeposited(
        bytes32 indexed poolId,
        uint32 chainEid,
        uint256 amount
    );

    event LiquidityWithdrawn(
        bytes32 indexed poolId,
        uint32 chainEid,
        uint256 amount
    );

    event PositionCreated(
        bytes32 indexed poolId,
        uint256 tokenId,
        uint128 liquidity
    );

    event PositionClosed(
        bytes32 indexed poolId,
        uint256 tokenId,
        uint128 liquidity
    );

    event CrossChainSyncInitiated(
        bytes32 indexed poolId,
        uint32 dstEid,
        uint256 fee
    );

    event CrossChainSyncReceived(
        bytes32 indexed poolId,
        uint32 srcEid,
        uint256 liquidity,
        uint256 volume
    );

    event FeeCollectorUpdated(address newCollector);
    event RewardsCollectorUpdated(address newCollector);
    event RewardsBpsUpdated(uint16 newRewardsBps);
    event FeesDistributed(address indexed token, uint256 total, uint256 rewardsAmount, uint256 treasuryAmount);

    // ============ Constructor ============

    constructor(
        address _lzEndpoint,
        address _swapRouter,
        address _nftPositionManager,
        address _onbtToken,
        address _feeCollector,
        address _rewardsCollector,
        uint16 _rewardsBps
    ) OApp(_lzEndpoint, msg.sender) Ownable() {
        require(_swapRouter != address(0), "Invalid router");
        require(_nftPositionManager != address(0), "Invalid position manager");
        require(_onbtToken != address(0), "Invalid token");
        require(_feeCollector != address(0), "Invalid fee collector");
        require(_rewardsCollector != address(0), "Invalid rewards collector");
        require(_rewardsBps <= MAX_BPS, "Invalid rewards bps");

        swapRouter = IUniswapV3SwapRouter(_swapRouter);
        nftPositionManager = IUniswapV3NonfungiblePositionManager(_nftPositionManager);
        onbtToken = IERC20(_onbtToken);
        feeCollector = _feeCollector;
        rewardsCollector = _rewardsCollector;
        rewardsBps = _rewardsBps;
    }

    // ============ Pool Creation & Management ============

    /**
     * @notice Register a new ONBT pool
     * @param poolId Pool identifier
     * @param token0 First token
     * @param token1 Second token
     * @param fee Fee tier (e.g., 3000 for 0.30%)
     * @param chainEid Chain endpoint ID
     * @param allocationAmount Total allocation for this pool
     */
    function registerPool(
        bytes32 poolId,
        address token0,
        address token1,
        uint24 fee,
        uint32 chainEid,
        uint256 allocationAmount
    ) external onlyOwner {
        require(poolId != bytes32(0), "Invalid pool id");
        require(token0 != address(0) && token1 != address(0), "Invalid token");
        require(token0 != token1, "Same token pair");
        require(chainEid != 0, "Invalid chain");
        require(fee >= MIN_UNISWAP_FEE && fee <= MAX_UNISWAP_FEE, "Invalid fee");
        require(allocationAmount > 0, "Invalid allocation");
        require(!poolInfos[poolId].isActive, "Pool already registered");

        poolInfos[poolId] = PoolInfo({
            poolId: poolId,
            token0: token0,
            token1: token1,
            fee: fee,
            initialLiquidity: 0,
            isActive: true
        });

        poolToChainEid[poolId] = chainEid;
        poolAllocations[poolId] = allocationAmount;

        emit PoolCreated(poolId, token0, token1, fee, allocationAmount);
    }

    /**
     * @notice Sets allocation for a pool (equivalent to TVL cap)
     * @param poolId Pool identifier
     * @param chainEid Chain endpoint ID
     * @param allocationAmount Total allocation for this pool
     */
    function allocateLiquidity(
        bytes32 poolId,
        uint32 chainEid,
        uint256 allocationAmount
    ) external onlyOwner {
        require(poolInfos[poolId].isActive, "Pool not registered");
        require(chainEid != 0, "Invalid chain");
        require(allocationAmount > 0, "Invalid allocation");
        
        poolAllocations[poolId] = allocationAmount;
        poolToChainEid[poolId] = chainEid;
        
        emit LiquidityAllocated(poolId, allocationAmount);
    }

    /**
     * @notice Register a peer pool on another chain for synchronization
     * @param poolId Local pool identifier
     * @param dstEid Destination chain endpoint ID
     * @param peerPoolAddress Pool address on destination chain
     */
    function registerCrossChainPool(
        bytes32 poolId,
        uint32 dstEid,
        address peerPoolAddress
    ) external onlyOwner {
        require(poolInfos[poolId].isActive, "Pool not registered");
        require(dstEid != 0, "Invalid chain");
        require(peerPoolAddress != address(0), "Invalid peer");
        crossChainPeers[poolId][dstEid] = peerPoolAddress;
        
        emit PoolRegistered(poolId, dstEid, peerPoolAddress);
    }

    /**
     * @notice Deposit liquidity into a pool from owner
     * @param poolId Pool identifier
     * @param amount Amount to deposit
     */
    function depositLiquidity(
        bytes32 poolId,
        uint256 amount
    ) external onlyOwner {
        require(poolInfos[poolId].isActive, "Pool not registered");
        require(amount > 0, "Invalid amount");
        require(poolFunded[poolId] + amount <= poolAllocations[poolId], "Exceeds allocation");

        poolFunded[poolId] += amount;
        onbtToken.safeTransferFrom(msg.sender, address(this), amount);
        
        uint32 chainEid = poolToChainEid[poolId];
        emit LiquidityDeposited(poolId, chainEid, amount);
    }

    /**
     * @notice Withdraw liquidity from a pool
     * @param poolId Pool identifier
     * @param amount Amount to withdraw
     */
    function withdrawLiquidity(
        bytes32 poolId,
        uint256 amount
    ) external onlyOwner {
        require(poolInfos[poolId].isActive, "Pool not registered");
        require(amount > 0, "Invalid amount");
        require(poolFunded[poolId] >= amount, "Insufficient funded");

        poolFunded[poolId] -= amount;
        onbtToken.safeTransfer(msg.sender, amount);
        
        uint32 chainEid = poolToChainEid[poolId];
        emit LiquidityWithdrawn(poolId, chainEid, amount);
    }

    // ============ Liquidity Position Management ============

    /**
     * @notice Add liquidity to a Uniswap V3 pool position
     * @param poolId Pool identifier
     * @param amount0Desired Amount of token0
     * @param amount1Desired Amount of token1
     * @param tickLower Lower tick
     * @param tickUpper Upper tick
     */
    function addLiquidityPosition(
        bytes32 poolId,
        uint256 amount0Desired,
        uint256 amount1Desired,
        int24 tickLower,
        int24 tickUpper
    ) external onlyOwner returns (uint256 tokenId, uint128 liquidity) {
        require(poolInfos[poolId].isActive, "Pool not registered");
        PoolInfo memory poolInfo = poolInfos[poolId];

        // Approve tokens for position manager
        IERC20(poolInfo.token0).approve(address(nftPositionManager), amount0Desired);
        IERC20(poolInfo.token1).approve(address(nftPositionManager), amount1Desired);

        // Create position
        IUniswapV3NonfungiblePositionManager.MintParams memory params = IUniswapV3NonfungiblePositionManager
            .MintParams({
                token0: poolInfo.token0,
                token1: poolInfo.token1,
                fee: poolInfo.fee,
                tickLower: tickLower,
                tickUpper: tickUpper,
                amount0Desired: amount0Desired,
                amount1Desired: amount1Desired,
                amount0Min: 0,
                amount1Min: 0,
                recipient: address(this),
                deadline: block.timestamp + 120
            });

        (tokenId, liquidity, , ) = nftPositionManager.mint(params);

        // Track position
        poolTokenIds[poolId].push(tokenId);

        emit PositionCreated(poolId, tokenId, liquidity);
    }

    /**
     * @notice Remove liquidity from a position
     * @param poolId Pool identifier
     * @param tokenId NFT position ID
     * @param liquidity Amount of liquidity to remove
     */
    function removeLiquidityPosition(
        bytes32 poolId,
        uint256 tokenId,
        uint128 liquidity
    ) external onlyOwner {
        IUniswapV3NonfungiblePositionManager.DecreaseLiquidityParams memory params = IUniswapV3NonfungiblePositionManager
            .DecreaseLiquidityParams({
                tokenId: tokenId,
                liquidity: liquidity,
                amount0Min: 0,
                amount1Min: 0,
                deadline: block.timestamp + 120
            });

        nftPositionManager.decreaseLiquidity(params);

        // Collect remaining tokens
        IUniswapV3NonfungiblePositionManager.CollectParams memory collectParams = IUniswapV3NonfungiblePositionManager
            .CollectParams({
                tokenId: tokenId,
                recipient: address(this),
                amount0Max: type(uint128).max,
                amount1Max: type(uint128).max
            });

        nftPositionManager.collect(collectParams);

        emit PositionClosed(poolId, tokenId, liquidity);
    }

    // ============ Cross-Chain Synchronization ============

    /**
     * @notice Sync pool statistics to peer chain via LayerZero
     * @param poolId Pool to sync
     * @param dstEid Destination chain
     */
    function syncPoolToPeer(
        bytes32 poolId,
        uint32 dstEid
    ) external payable onlyOwner {
        require(poolInfos[poolId].isActive, "Pool not registered");
        require(dstEid != 0, "Invalid chain");
        require(crossChainPeers[poolId][dstEid] != address(0), "Peer not registered");

        // Encode pool sync message
        bytes memory payload = abi.encode(
            CrossChainPoolSync({
                poolId: poolId,
                srcEid: uint32(block.chainid),
                liquidity: poolFunded[poolId],
                swapVolume: 0,
                feesCollected: 0
            })
        );

        // Send to peer via LayerZero
        bytes memory options = abi.encodePacked(uint16(1), uint256(200000)); // Gas limit
        _lzSend(dstEid, payload, options, MessagingFee(msg.value, 0), payable(msg.sender));

        emit CrossChainSyncInitiated(poolId, dstEid, msg.value);
    }

    /**
     * @notice Batch sync multiple pools to peer chain
     */
    function syncMultiPoolsToPeer(
        bytes32[] calldata poolIds,
        uint32 dstEid
    ) external payable onlyOwner {
        require(poolIds.length > 0, "No pools");
        require(dstEid != 0, "Invalid chain");
        
        uint256 totalFee = msg.value;
        uint256 feePerPool = totalFee / poolIds.length;

        for (uint256 i = 0; i < poolIds.length; i++) {
            bytes32 poolId = poolIds[i];
            require(poolInfos[poolId].isActive, "Pool not registered");
            require(crossChainPeers[poolId][dstEid] != address(0), "Peer not registered");

            bytes memory payload = abi.encode(
                CrossChainPoolSync({
                    poolId: poolId,
                    srcEid: uint32(block.chainid),
                    liquidity: poolFunded[poolId],
                    swapVolume: 0,
                    feesCollected: 0
                })
            );

            bytes memory options = abi.encodePacked(uint16(1), uint256(200000));
            _lzSend(dstEid, payload, options, MessagingFee(feePerPool, 0), payable(msg.sender));
        }
    }

    /**
     * @notice Receive cross-chain pool sync from peer
     */
    function _lzReceive(
        Origin calldata origin,
        bytes32,
        bytes calldata payload,
        address,
        bytes calldata
    ) internal override {
        CrossChainPoolSync memory sync = abi.decode(payload, (CrossChainPoolSync));

        // Verify peer is registered for this pool
        bytes32 expectedPeer = bytes32(uint256(uint160(crossChainPeers[sync.poolId][origin.srcEid])));
        require(
            expectedPeer == origin.sender,
            "Unauthorized peer"
        );

        emit CrossChainSyncReceived(
            sync.poolId,
            origin.srcEid,
            sync.liquidity,
            sync.swapVolume
        );
    }

    // ============ Admin Functions ============

    /**
     * @notice Update fee collector address
     */
    function setFeeCollector(address newCollector) external onlyOwner {
        require(newCollector != address(0), "Invalid collector");
        feeCollector = newCollector;
        emit FeeCollectorUpdated(newCollector);
    }

    function setRewardsCollector(address newCollector) external onlyOwner {
        require(newCollector != address(0), "Invalid rewards collector");
        rewardsCollector = newCollector;
        emit RewardsCollectorUpdated(newCollector);
    }

    function setRewardsBps(uint16 newRewardsBps) external onlyOwner {
        require(newRewardsBps <= MAX_BPS, "Invalid rewards bps");
        rewardsBps = newRewardsBps;
        emit RewardsBpsUpdated(newRewardsBps);
    }

    function distributeFees(address token) external onlyOwner {
        require(token != address(0), "Invalid token");
        IERC20 feeToken = IERC20(token);
        uint256 total = feeToken.balanceOf(address(this));
        require(total > 0, "No fees");

        uint256 rewardsAmount = (total * rewardsBps) / MAX_BPS;
        uint256 treasuryAmount = total - rewardsAmount;

        if (rewardsAmount > 0) {
            feeToken.safeTransfer(rewardsCollector, rewardsAmount);
        }
        if (treasuryAmount > 0) {
            feeToken.safeTransfer(feeCollector, treasuryAmount);
        }

        emit FeesDistributed(token, total, rewardsAmount, treasuryAmount);
    }

    /**
     * @notice Set trusted peer for cross-chain messaging
     */
    function setPeer(uint32 eid, bytes32 peer) public override onlyOwner {
        super.setPeer(eid, peer);
    }

    // ============ View Functions ============

    /**
     * @notice Get pool information
     */
    function getPoolInfo(bytes32 poolId) 
        external 
        view 
        returns (
            address token0,
            address token1,
            uint24 fee,
            uint256 allocation,
            uint256 funded,
            bool isActive
        ) 
    {
        PoolInfo memory info = poolInfos[poolId];
        return (
            info.token0,
            info.token1,
            info.fee,
            poolAllocations[poolId],
            poolFunded[poolId],
            info.isActive
        );
    }

    /**
     * @notice Get pool positions
     */
    function getPoolPositions(bytes32 poolId) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return poolTokenIds[poolId];
    }

    /**
     * @notice Get estimated LayerZero message fee
     */
    function quoteCrossChainSync(
        bytes32 poolId,
        uint32 dstEid
    ) 
        external 
        view 
        returns (MessagingFee memory fee) 
    {
        require(poolInfos[poolId].isActive, "Pool not registered");
        require(dstEid != 0, "Invalid chain");
        require(crossChainPeers[poolId][dstEid] != address(0), "Peer not registered");

        CrossChainPoolSync memory sync = CrossChainPoolSync({
            poolId: poolId,
            srcEid: uint32(block.chainid),
            liquidity: poolFunded[poolId],
            swapVolume: 0,
            feesCollected: 0
        });

        bytes memory payload = abi.encode(sync);
        bytes memory options = abi.encodePacked(uint16(1), uint256(200000));

        return _quote(dstEid, payload, options, false);
    }
}


