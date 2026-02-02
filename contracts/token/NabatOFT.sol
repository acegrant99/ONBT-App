// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@layerzerolabs/solidity-examples/contracts/token/oft/v2/OFTV2.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NabatOFT
 * @dev Omnichain Fungible Token for the Nabat Ecosystem
 * This token can be transferred across multiple chains using LayerZero
 */
contract NabatOFT is OFTV2 {
    /**
     * @dev Constructor to initialize the OFT
     * @param _name Token name
     * @param _symbol Token symbol
     * @param _sharedDecimals Shared decimals across all chains (typically 6 or 8)
     * @param _lzEndpoint LayerZero endpoint address for the current chain
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _sharedDecimals,
        address _lzEndpoint
    ) OFTV2(_name, _symbol, _sharedDecimals, _lzEndpoint) {}

    /**
     * @dev Mint tokens (only on the source chain)
     * @param _to Address to mint tokens to
     * @param _amount Amount of tokens to mint
     */
    function mint(address _to, uint256 _amount) external onlyOwner {
        _mint(_to, _amount);
    }

    /**
     * @dev Burn tokens
     * @param _from Address to burn tokens from
     * @param _amount Amount of tokens to burn
     */
    function burn(address _from, uint256 _amount) external onlyOwner {
        _burn(_from, _amount);
    }
}
