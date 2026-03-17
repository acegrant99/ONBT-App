// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { ILayerZeroEndpointV2 } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title ONBTLiquidityManager
 * @dev Minimal liquidity allocation manager for ONBT.
 */
contract ONBTLiquidityManager is OApp {
    using SafeERC20 for IERC20;

    IERC20 public immutable onbtToken;

    mapping(uint32 => mapping(address => uint256)) public poolAllocations;
    mapping(uint32 => mapping(address => uint256)) public poolFunded;

    event PoolAllocationSet(uint32 indexed eid, address indexed pool, uint256 amount);
    event PoolFunded(uint32 indexed eid, address indexed pool, uint256 amount);
    event PoolWithdrawn(uint32 indexed eid, address indexed pool, uint256 amount);

    /**
     * @notice Initializes liquidity manager.
     * @param _lzEndpoint LayerZero endpoint address.
     * @param _onbtToken ONBT token address.
     */
    constructor(address _lzEndpoint, address _onbtToken)
        OApp(_lzEndpoint, msg.sender)
        Ownable()
    {
        require(_onbtToken != address(0), "Invalid token");
        onbtToken = IERC20(_onbtToken);
    }

    /**
     * @notice Sets pool allocation for a chain EID.
     * @param eid Chain endpoint ID.
     * @param pool Pool address.
     * @param amount Allocation amount.
     */
    function setPoolAllocation(uint32 eid, address pool, uint256 amount) external onlyOwner {
        require(pool != address(0), "Invalid pool");
        poolAllocations[eid][pool] = amount;
        emit PoolAllocationSet(eid, pool, amount);
    }

    /**
     * @notice Funds liquidity into a configured pool.
     * @param eid Chain endpoint ID.
     * @param pool Pool address.
     * @param amount Amount to fund.
     */
    function fundLiquidity(uint32 eid, address pool, uint256 amount) external onlyOwner {
        require(pool != address(0), "Invalid pool");
        require(amount > 0, "Invalid amount");
        require(poolFunded[eid][pool] + amount <= poolAllocations[eid][pool], "Exceeds allocation");

        poolFunded[eid][pool] += amount;
        onbtToken.safeTransferFrom(msg.sender, pool, amount);
        emit PoolFunded(eid, pool, amount);
    }

    /**
     * @notice Decrements tracked funded liquidity for a pool.
     * @param eid Chain endpoint ID.
     * @param pool Pool address.
     * @param amount Amount to withdraw.
     */
    function withdrawLiquidity(uint32 eid, address pool, uint256 amount) external onlyOwner {
        require(pool != address(0), "Invalid pool");
        require(amount > 0, "Invalid amount");
        require(poolFunded[eid][pool] >= amount, "Insufficient funded");

        poolFunded[eid][pool] -= amount;
        emit PoolWithdrawn(eid, pool, amount);
    }

    /**
     * @notice Sets trusted peer for a destination EID.
     * @param _eid Destination endpoint ID.
     * @param _peer Peer address in bytes32 format.
     */
    function setPeer(uint32 _eid, bytes32 _peer) public override onlyOwner {
        super.setPeer(_eid, _peer);
    }

    /**
     * @notice Quotes LayerZero messaging fees.
     * @param _dstEid Destination endpoint ID.
     * @param _message Encoded payload.
     * @param _options LayerZero options blob.
     * @param _payInLzToken True to pay in LZ token.
     * @return fee Estimated messaging fee.
     */
    function quote(
        uint32 _dstEid,
        bytes calldata _message,
        bytes calldata _options,
        bool _payInLzToken
    ) external view returns (MessagingFee memory fee) {
        return _quote(_dstEid, _message, _options, _payInLzToken);
    }

    /**
     * @notice Receives LayerZero messages.
     * @dev No-op for current liquidity manager implementation.
     */
    function _lzReceive(
        Origin calldata,
        bytes32,
        bytes calldata,
        address,
        bytes calldata
    ) internal override {}
}

