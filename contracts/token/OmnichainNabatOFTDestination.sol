// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { OFT } from "@layerzerolabs/oft-evm/contracts/OFT.sol";

/// @title OmnichainNabatOFTDestination
/// @notice Omnichain Fungible Token (OFT) for destination chains - NO initial mint
/// @dev Tokens arrive via LayerZero cross-chain transfers from hub chain
contract OmnichainNabatOFTDestination is OFT {
    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint,
        address _delegate
    ) OFT(_name, _symbol, _lzEndpoint, _delegate) Ownable() {
        // NO MINTING on destination chains
        // Tokens will arrive via LayerZero bridge from hub chain (Base)
    }
}
