// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { ILayerZeroEndpointV2 } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title ONBTRevenueRouter
 * @dev Minimal revenue router to split fees to vault/rewards/insurance.
 */
contract ONBTRevenueRouter is OApp {
    using SafeERC20 for IERC20;

    address public vault;
    address public rewards;
    address public insurance;

    uint256 public toVaultBps = 6000;
    uint256 public toRewardsBps = 3000;
    uint256 public toInsuranceBps = 1000;

    event SplitsUpdated(uint256 toVault, uint256 toRewards, uint256 toInsurance);
    event DestinationsUpdated(address vault, address rewards, address insurance);
    event FeesRouted(address indexed token, uint256 amount);

    constructor(address _lzEndpoint, address _vault, address _rewards, address _insurance)
        OApp(_lzEndpoint, msg.sender)
        Ownable()
    {
        require(_vault != address(0), "Invalid vault");
        require(_rewards != address(0), "Invalid rewards");
        require(_insurance != address(0), "Invalid insurance");
        vault = _vault;
        rewards = _rewards;
        insurance = _insurance;
    }

    function setSplits(uint256 toVault, uint256 toRewards, uint256 toInsurance) external onlyOwner {
        require(toVault + toRewards + toInsurance == 10000, "Invalid splits");
        toVaultBps = toVault;
        toRewardsBps = toRewards;
        toInsuranceBps = toInsurance;
        emit SplitsUpdated(toVault, toRewards, toInsurance);
    }

    function setDestinations(address _vault, address _rewards, address _insurance) external onlyOwner {
        require(_vault != address(0), "Invalid vault");
        require(_rewards != address(0), "Invalid rewards");
        require(_insurance != address(0), "Invalid insurance");
        vault = _vault;
        rewards = _rewards;
        insurance = _insurance;
        emit DestinationsUpdated(_vault, _rewards, _insurance);
    }

    function routeFees(address token, uint256 amount) external onlyOwner {
        require(token != address(0), "Invalid token");
        require(amount > 0, "Invalid amount");

        IERC20 feeToken = IERC20(token);
        feeToken.safeTransferFrom(msg.sender, address(this), amount);

        uint256 toVaultAmount = (amount * toVaultBps) / 10000;
        uint256 toRewardsAmount = (amount * toRewardsBps) / 10000;
        uint256 toInsuranceAmount = amount - toVaultAmount - toRewardsAmount;

        feeToken.safeTransfer(vault, toVaultAmount);
        feeToken.safeTransfer(rewards, toRewardsAmount);
        feeToken.safeTransfer(insurance, toInsuranceAmount);

        emit FeesRouted(token, amount);
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

