// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { ILayerZeroEndpointV2 } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ONBTIncentiveController
 * @dev Minimal reward policy controller for ONBT incentives.
 */
contract ONBTIncentiveController is OApp {
    mapping(uint32 => uint256) public chainRewardRateBps;
    uint256 public defaultRateBps = 10000;

    event RewardRateUpdated(uint32 indexed eid, uint256 rateBps);
    event DefaultRateUpdated(uint256 rateBps);

    /**
     * @notice Initializes the incentive controller.
     * @param _lzEndpoint LayerZero endpoint address.
     */
    constructor(address _lzEndpoint) OApp(_lzEndpoint, msg.sender) Ownable() {}

    /**
     * @notice Sets reward rate for a specific chain EID.
     * @param eid Chain endpoint ID.
     * @param rateBps Reward rate in basis points.
     */
    function setRewardRate(uint32 eid, uint256 rateBps) external onlyOwner {
        chainRewardRateBps[eid] = rateBps;
        emit RewardRateUpdated(eid, rateBps);
    }

    /**
     * @notice Sets the fallback default reward rate.
     * @param rateBps Default reward rate in basis points.
     */
    function setDefaultRate(uint256 rateBps) external onlyOwner {
        defaultRateBps = rateBps;
        emit DefaultRateUpdated(rateBps);
    }

    /**
     * @notice Placeholder reward computation hook.
     * @return Computed rewards (currently always 0).
     */
    function computeRewards(address) external pure returns (uint256) {
        return 0;
    }

    /**
     * @notice Returns chain-specific reward rate or default.
     * @param eid Chain endpoint ID.
     * @return Reward rate in basis points.
     */
    function getRewardRate(uint32 eid) external view returns (uint256) {
        uint256 rate = chainRewardRateBps[eid];
        return rate == 0 ? defaultRateBps : rate;
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
     * @dev No-op for current controller implementation.
     */
    function _lzReceive(
        Origin calldata,
        bytes32,
        bytes calldata,
        address,
        bytes calldata
    ) internal override {}
}

