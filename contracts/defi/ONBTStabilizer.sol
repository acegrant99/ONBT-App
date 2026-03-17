// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { ILayerZeroEndpointV2 } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title ONBTStabilizer
 * @dev Minimal buyback/stabilization controller for ONBT.
 */
contract ONBTStabilizer is OApp {
    using SafeERC20 for IERC20;

    IERC20 public immutable onbtToken;
    bytes32 public activeStrategy;

    event BuybackExecuted(uint256 amountIn, uint256 minOut);
    event BuybackBurned(uint256 amount);
    event StrategyUpdated(bytes32 indexed strategyId);

    constructor(address _lzEndpoint, address _onbtToken)
        OApp(_lzEndpoint, msg.sender)
        Ownable()
    {
        require(_onbtToken != address(0), "Invalid token");
        onbtToken = IERC20(_onbtToken);
    }

    function executeBuyback(uint256 amountIn, uint256 minOut) external onlyOwner {
        require(amountIn > 0, "Invalid amount");
        onbtToken.safeTransferFrom(msg.sender, address(this), amountIn);
        emit BuybackExecuted(amountIn, minOut);
    }

    function burnFromBuyback(uint256 amount) external onlyOwner {
        require(amount > 0, "Invalid amount");
        onbtToken.safeTransfer(address(0x000000000000000000000000000000000000dEaD), amount);
        emit BuybackBurned(amount);
    }

    function setStrategy(bytes32 strategyId) external onlyOwner {
        activeStrategy = strategyId;
        emit StrategyUpdated(strategyId);
    }

    function setPeer(uint32 _eid, bytes32 _peer) public override onlyOwner {
        super.setPeer(_eid, _peer);
    }

    function quote(
        uint32 _dstEid,
        bytes calldata _message,
        bytes calldata _options,
        bool _payInLzToken
    ) external view returns (MessagingFee memory fee) {
        return _quote(_dstEid, _message, _options, _payInLzToken);
    }

    function _lzReceive(
        Origin calldata,
        bytes32,
        bytes calldata,
        address,
        bytes calldata
    ) internal override {}
}

