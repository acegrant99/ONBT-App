// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { ILayerZeroEndpointV2 } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title ONBTInsuranceFund
 * @dev Minimal insurance reserve for ONBT ecosystem.
 */
contract ONBTInsuranceFund is OApp {
    using SafeERC20 for IERC20;

    IERC20 public immutable onbtToken;

    struct Incident {
        address recipient;
        uint256 amount;
        bool approved;
    }

    mapping(bytes32 => Incident) public incidents;

    event ReserveFunded(address indexed from, uint256 amount);
    event PayoutRequested(bytes32 indexed incidentId, address indexed to, uint256 amount);
    event PayoutApproved(bytes32 indexed incidentId, address indexed to, uint256 amount);

    constructor(address _lzEndpoint, address _onbtToken)
        OApp(_lzEndpoint, msg.sender)
        Ownable()
    {
        require(_onbtToken != address(0), "Invalid token");
        onbtToken = IERC20(_onbtToken);
    }

    function fundReserve(uint256 amount) external onlyOwner {
        require(amount > 0, "Invalid amount");
        onbtToken.safeTransferFrom(msg.sender, address(this), amount);
        emit ReserveFunded(msg.sender, amount);
    }

    function requestPayout(address to, uint256 amount, bytes32 incidentId) external onlyOwner {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        incidents[incidentId] = Incident({recipient: to, amount: amount, approved: false});
        emit PayoutRequested(incidentId, to, amount);
    }

    function approvePayout(bytes32 incidentId) external onlyOwner {
        Incident storage incident = incidents[incidentId];
        require(incident.recipient != address(0), "Unknown incident");
        require(!incident.approved, "Already approved");
        incident.approved = true;

        onbtToken.safeTransfer(incident.recipient, incident.amount);
        emit PayoutApproved(incidentId, incident.recipient, incident.amount);
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

