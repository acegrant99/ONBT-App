// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { ILayerZeroEndpointV2 } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

/**
 * @title OmnichainNabatVotes
 * @dev Voting power tracking module for OmnichainNabatOFT
 * 
 * This module provides on-chain governance voting power tracking with delegation.
 * Token holders can delegate their voting power to other addresses without
 * transferring actual tokens.
 * 
 * Key features:
 * - Checkpoint-based voting power tracking
 * - Delegation of voting power
 * - Historical voting power queries
 * - Compatible with Governor contracts (OpenZeppelin/Compound governance)
 * - EIP-712 typed data for delegation signatures
 * 
 * Voting power is automatically tracked:
 * - Self-delegation: User's balance = their voting power
 * - Delegated: Delegatee receives voting power from delegator's balance
 */
abstract contract OmnichainNabatVotes is ERC20Votes {
    
    /**
     * @notice Get the current voting power of an account
     * @param account Address to query
     * @return Current voting power
     */
    function getVotes(address account) public view virtual override returns (uint256) {
        return super.getVotes(account);
    }
    
    /**
     * @notice Get historical voting power at a specific block
     * @param account Address to query
     * @param blockNumber Historical block number
     * @return Voting power at that block
     */
    function getPastVotes(address account, uint256 blockNumber) public view virtual override returns (uint256) {
        return super.getPastVotes(account, blockNumber);
    }
    
    /**
     * @notice Get historical total supply at a specific block
     * @param blockNumber Historical block number
     * @return Total supply at that block
     */
    function getPastTotalSupply(uint256 blockNumber) public view virtual override returns (uint256) {
        return super.getPastTotalSupply(blockNumber);
    }
    
    /**
     * @notice Get the current delegate of an account
     * @param account Address to query
     * @return Address of the delegate
     */
    function delegates(address account) public view virtual override returns (address) {
        return super.delegates(account);
    }
    
    /**
     * @notice Delegate voting power to another address
     * @param delegatee Address to delegate to
     */
    function delegate(address delegatee) public virtual override {
        super.delegate(delegatee);
    }
    
    /**
     * @notice Delegate voting power using a signature
     * @param delegatee Address to delegate to
     * @param nonce Nonce for replay protection
     * @param expiry Signature expiration timestamp
     * @param v Signature v component
     * @param r Signature r component
     * @param s Signature s component
     */
    function delegateBySig(
        address delegatee,
        uint256 nonce,
        uint256 expiry,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public virtual override {
        super.delegateBySig(delegatee, nonce, expiry, v, r, s);
    }
}
