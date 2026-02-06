// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@layerzerolabs/oft-evm/contracts/OFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title OmnichainNabatOFT
 * @notice Nabat Omnichain Fungible Token (OFT) implementation using LayerZero V2
 * @dev This contract implements the OFT standard WITHOUT proxies as per LayerZero documentation.
 *      The contract inherits directly from OFT.sol which provides native omnichain functionality
 *      through burn/mint mechanics across different chains.
 * 
 * Key Features:
 * - No proxy pattern required (direct OFT inheritance)
 * - Native cross-chain transfers via LayerZero messaging
 * - Burns tokens on source chain, mints on destination chain
 * - Maintains unified global supply across all chains
 * 
 * Deployment:
 * - Deploy this same contract on each supported chain
 * - Each deployment uses the chain-specific LayerZero endpoint address
 * - Configure peer addresses after deployment to enable cross-chain transfers
 */
contract OmnichainNabatOFT is OFT {
    /**
     * @notice Constructor for OmnichainNabatOFT
     * @param _lzEndpoint LayerZero endpoint address for the specific chain
     * @param _delegate Address that can configure LayerZero settings (typically the deployer)
     * @dev The same contract is deployed on multiple chains with different endpoint addresses
     */
    constructor(
        address _lzEndpoint,
        address _delegate
    ) OFT("Nabat Token", "NBT", _lzEndpoint, _delegate) Ownable(_delegate) {}

    /**
     * @notice Mints initial supply to a specified address
     * @param _to Address to receive the minted tokens
     * @param _amount Amount of tokens to mint
     * @dev Only callable by the contract owner
     *      Should be called once per chain to establish initial supply
     */
    function mint(address _to, uint256 _amount) external onlyOwner {
        _mint(_to, _amount);
    }

    /**
     * @notice Burns tokens from the caller's balance
     * @param _amount Amount of tokens to burn
     * @dev Allows users to permanently remove tokens from circulation
     */
    function burn(uint256 _amount) external {
        _burn(msg.sender, _amount);
    }
}
