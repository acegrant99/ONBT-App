// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@layerzerolabs/solidity-examples/contracts/token/onft721/ProxyONFT721.sol";

/**
 * @title NabatProxyONFT
 * @dev Proxy ONFT for wrapping existing NFTs on destination chains
 * This allows existing ERC721 tokens to be used in the LayerZero omnichain ecosystem
 */
contract NabatProxyONFT is ProxyONFT721 {
    /**
     * @dev Constructor to initialize the Proxy ONFT
     * @param _minGasToStore Minimum gas to store the payload on destination
     * @param _lzEndpoint LayerZero endpoint address for the current chain
     * @param _proxyToken Address of the existing ERC721 token to wrap
     */
    constructor(
        uint256 _minGasToStore,
        address _lzEndpoint,
        address _proxyToken
    ) ProxyONFT721(_minGasToStore, _lzEndpoint, _proxyToken) {}
}
