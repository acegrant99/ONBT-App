// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { ILayerZeroEndpointV2 } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/**
 * @title OmnichainNabatPermit
 * @dev Permit functionality module for OmnichainNabatOFT
 * 
 * This module provides EIP-2612 permit functionality, allowing gasless approvals
 * through signed messages. Users can approve token transfers without sending
 * a transaction, useful for meta-transactions and improved UX.
 */
abstract contract OmnichainNabatPermit is ERC20Permit {
    /**
     * @dev Constructor initializes ERC20Permit with token name
     * @param name Token name for permit domain separator
     */
    constructor(string memory name) ERC20Permit(name) {}
}
