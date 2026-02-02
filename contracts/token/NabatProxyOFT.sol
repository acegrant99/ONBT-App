// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@layerzerolabs/solidity-examples/contracts/token/oft/v2/ProxyOFTV2.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NabatProxyOFT
 * @dev Proxy OFT for wrapping existing tokens on destination chains
 * This allows existing ERC20 tokens to be used in the LayerZero omnichain ecosystem
 */
contract NabatProxyOFT is ProxyOFTV2 {
    /**
     * @dev Constructor to initialize the Proxy OFT
     * @param _token Address of the existing ERC20 token to wrap
     * @param _sharedDecimals Shared decimals across all chains
     * @param _lzEndpoint LayerZero endpoint address for the current chain
     */
    constructor(
        address _token,
        uint8 _sharedDecimals,
        address _lzEndpoint
    ) ProxyOFTV2(_token, _sharedDecimals, _lzEndpoint) {}
}
