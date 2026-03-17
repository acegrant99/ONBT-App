// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { ILayerZeroEndpointV2 } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./OmnichainNabatStorage.sol";

/**
 * @title OmnichainNabatTracking
 * @dev Omnichain tracking and analytics module for OmnichainNabatOFT
 * 
 * This module handles:
 * - Remote chain registration and supply tracking
 * - Bridge volume tracking (in/out per chain)
 * - Local transfer analytics (count, volume)
 * - Holder counting and balance tracking
 * - Cross-chain distribution queries
 * - Peak supply tracking
 * 
 * Note: Inherits from Ownable for admin functions
 */
abstract contract OmnichainNabatTracking is OmnichainNabatStorage, Ownable {
    
    // ============ Events ============
    
    /// @notice Emitted when remote chain supply is updated
    event RemoteChainSupplyUpdated(
        uint32 indexed eid,
        uint256 oldSupply,
        uint256 newSupply
    );
    
    /// @notice Emitted when a new remote chain is registered
    event RemoteChainRegistered(uint32 indexed eid);
    
    // ============ Remote Chain Management ============
    
    /**
     * @notice Register a remote chain for tracking
     * @dev Can only be called by owner when setting up cross-chain connectivity
     * @param _eid Remote chain's LayerZero endpoint ID
     */
    function registerRemoteChain(uint32 _eid) external onlyOwner {
        require(!isChainRegistered[_eid], "Chain already registered");
        registeredChains.push(_eid);
        isChainRegistered[_eid] = true;
        emit RemoteChainRegistered(_eid);
    }
    
    /**
     * @notice Update the estimated supply on a remote chain
     * @dev Owner can update this based on observed cross-chain transfers
     * @param _eid Remote chain's LayerZero endpoint ID
     * @param _supply New estimated supply on that chain
     */
    function updateRemoteChainSupply(uint32 _eid, uint256 _supply) external onlyOwner {
        require(isChainRegistered[_eid], "Chain not registered");
        uint256 oldSupply = remoteChainSupply[_eid];
        remoteChainSupply[_eid] = _supply;
        emit RemoteChainSupplyUpdated(_eid, oldSupply, _supply);
    }
    
    /**
     * @notice Get the list of all registered remote chains
     * @return Array of registered chain EIDs
     */
    function getRegisteredChains() external view returns (uint32[] memory) {
        return registeredChains;
    }
    
    /**
     * @notice Get the supply on a specific remote chain
     * @param _eid Remote chain's LayerZero endpoint ID
     * @return Supply on that chain
     */
    function getRemoteChainSupply(uint32 _eid) external view returns (uint256) {
        return remoteChainSupply[_eid];
    }
    
    // ============ Supply Distribution Queries ============
    
    /**
     * @notice Get complete token distribution across all chains
     * @return chains Array of chain EIDs
     * @return supplies Array of token supplies on each chain
     * @return localSupply Supply on this chain
     */
    function getTokenDistribution() external view returns (
        uint32[] memory chains,
        uint256[] memory supplies,
        uint256 localSupply
    ) {
        chains = registeredChains;
        supplies = new uint256[](registeredChains.length);
        
        for (uint256 i = 0; i < registeredChains.length; i++) {
            supplies[i] = remoteChainSupply[registeredChains[i]];
        }
        
        localSupply = _getCurrentSupply();
        return (chains, supplies, localSupply);
    }
    
    /**
     * @notice Get total tokens tracked across all registered chains
     * @dev This is an estimate based on manually updated values
     * @return Total supply across all tracked chains
     */
    function getTotalTrackedSupply() external view returns (uint256) {
        uint256 tracked = _getCurrentSupply(); // Local supply
        
        for (uint256 i = 0; i < registeredChains.length; i++) {
            tracked += remoteChainSupply[registeredChains[i]];
        }
        
        return tracked;
    }
    
    /**
     * @notice Check if this is the source chain (where tokens were originally minted)
     * @dev Source chain has the full circulating supply
     * @return true if this is the source chain
     */
    function isSourceChain() external view returns (bool) {
        if (totalSupplyCap == 0) {
            return false;
        }
        return _getCurrentSupply() == totalSupplyCap;
    }
    
    /**
     * @notice Get the time since deployment
     * @return Number of seconds since contract deployment
     */
    function getAge() external view returns (uint256) {
        if (deploymentTime == 0) {
            return 0;
        }
        return block.timestamp - deploymentTime;
    }
    
    // ============ Bridge Tracking (Internal) ============
    
    /**
     * @dev Track bridge out volume in local decimals
     * @param amountSentLD Amount sent in local decimals
     * @param _dstEid Destination endpoint ID
     */
    function _trackBridgeOut(uint256 amountSentLD, uint32 _dstEid) internal {
        totalBridgedOut += amountSentLD;
        totalCrossChainSendCount += 1;
        bridgedOutByEid[_dstEid] += amountSentLD;
        crossChainSendCountByEid[_dstEid] += 1;
    }
    
    /**
     * @dev Track bridge in volume in local decimals
     * @param amountReceivedLD Amount received in local decimals
     * @param _srcEid Source endpoint ID
     */
    function _trackBridgeIn(uint256 amountReceivedLD, uint32 _srcEid) internal {
        totalBridgedIn += amountReceivedLD;
        totalCrossChainReceiveCount += 1;
        bridgedInByEid[_srcEid] += amountReceivedLD;
        crossChainReceiveCountByEid[_srcEid] += 1;
    }
    
    // ============ Local Transfer Tracking (Internal) ============
    
    /**
     * @dev Track local transfer volume and count (excludes mint/burn)
     * @param amount Transfer amount
     */
    function _trackLocalTransfer(uint256 amount) internal {
        totalLocalTransferCount += 1;
        totalLocalTransferVolume += amount;
    }
    
    // ============ Holder Tracking (Internal) ============
    
    /**
     * @dev Update holder count when balances change
     * @param account Account to check
     */
    function _updateHolder(address account) internal {
        if (account == address(0)) {
            return;
        }

        uint256 balance = _getBalanceOf(account);
        bool hasBalance = balance > 0;
        
        if (hasBalance && !_hasBalance[account]) {
            _hasBalance[account] = true;
            holderCount += 1;
        } else if (!hasBalance && _hasBalance[account]) {
            _hasBalance[account] = false;
            holderCount -= 1;
        }
    }
    
    /**
     * @dev Update peak supply tracking
     */
    function _updatePeakSupply() internal {
        uint256 supply = _getCurrentSupply();
        if (supply > peakLocalSupply) {
            peakLocalSupply = supply;
        }
    }
    
    // ============ Abstract Methods (Must be implemented by child) ============
    
    /**
     * @dev Get current supply - must be implemented by child contract
     */
    function _getCurrentSupply() internal view virtual returns (uint256);
    
    /**
     * @dev Get balance of account - must be implemented by child contract
     */
    function _getBalanceOf(address account) internal view virtual returns (uint256);
}
