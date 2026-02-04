// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@layerzerolabs/solidity-examples/contracts/token/oft/v2/OFTV2.sol";

/**
 * @title OmnichainNabatOFT (ONBT)
 * @dev Immutable Omnichain Fungible Token with built-in branding
 * 
 * Key Features:
 * - Fixed name: "Omnichain Nabat"
 * - Fixed symbol: "ONBT"
 * - Immutable total supply (1 billion tokens, minted at deployment)
 * - No mint/burn functions (true immutability)
 * - Built-in branding metadata (logo, website, social links)
 * - Cross-chain transfers via LayerZero (peer-based, no proxies needed)
 * 
 * This token represents a truly immutable omnichain asset with
 * professional branding capabilities for DeFi and ecosystem use.
 */
contract OmnichainNabatOFT is OFTV2 {
    // ============ Branding Storage ============
    
    /// @notice Token logo URI (IPFS, HTTP, or data URI)
    string public logoURI;
    
    /// @notice Project website URL
    string public website;
    
    /// @notice Project description
    string public description;
    
    /// @notice Social media links (JSON format)
    string public socialLinks;
    
    /// @notice Total supply that was minted at deployment (immutable)
    uint256 public immutable TOTAL_SUPPLY;
    
    /// @notice Block timestamp when contract was deployed
    uint256 public immutable DEPLOYMENT_TIME;
    
    // ============ Events ============
    
    /// @notice Emitted when branding metadata is updated
    event BrandingUpdated(
        string logoURI,
        string website,
        string description,
        string socialLinks
    );
    
    // ============ Constructor ============
    
    /**
     * @dev Constructor - Deploy immutable ONBT token with branding
     * @param _sharedDecimals Shared decimals across all chains (typically 6 or 8)
     * @param _lzEndpoint LayerZero endpoint address for the current chain
     * @param _initialSupply Total supply to mint at deployment (immutable)
     * @param _logoURI Token logo URI
     * @param _website Project website URL
     * @param _description Project description
     * @param _socialLinks Social media links (JSON string)
     */
    constructor(
        uint8 _sharedDecimals,
        address _lzEndpoint,
        uint256 _initialSupply,
        string memory _logoURI,
        string memory _website,
        string memory _description,
        string memory _socialLinks
    ) OFTV2("Omnichain Nabat", "ONBT", _sharedDecimals, _lzEndpoint) {
        // Store immutable values
        TOTAL_SUPPLY = _initialSupply;
        DEPLOYMENT_TIME = block.timestamp;
        
        // Set branding metadata
        logoURI = _logoURI;
        website = _website;
        description = _description;
        socialLinks = _socialLinks;
        
        // Mint entire supply to deployer (msg.sender becomes owner via OFTV2)
        _mint(msg.sender, _initialSupply);
        
        // Emit branding event
        emit BrandingUpdated(_logoURI, _website, _description, _socialLinks);
    }
    
    // ============ Branding Functions ============
    
    /**
     * @notice Update branding metadata (only owner)
     * @dev Allows updating branding without affecting token economics
     * @param _logoURI New logo URI
     * @param _website New website URL
     * @param _description New description
     * @param _socialLinks New social links (JSON)
     */
    function updateBranding(
        string memory _logoURI,
        string memory _website,
        string memory _description,
        string memory _socialLinks
    ) external onlyOwner {
        logoURI = _logoURI;
        website = _website;
        description = _description;
        socialLinks = _socialLinks;
        
        emit BrandingUpdated(_logoURI, _website, _description, _socialLinks);
    }
    
    /**
     * @notice Get complete branding information
     * @return logo Token logo URI
     * @return site Website URL
     * @return desc Description
     * @return social Social media links
     */
    function getBrandingInfo() external view returns (
        string memory logo,
        string memory site,
        string memory desc,
        string memory social
    ) {
        return (logoURI, website, description, socialLinks);
    }
    
    /**
     * @notice Get token metadata in JSON format (ERC-20 extension)
     * @return JSON string with complete token information
     */
    function tokenURI() external view returns (string memory) {
        return string(abi.encodePacked(
            '{"name":"', name(), '",',
            '"symbol":"', symbol(), '",',
            '"decimals":', _uint2str(decimals()), ',',
            '"totalSupply":"', _uint2str(TOTAL_SUPPLY), '",',
            '"logoURI":"', logoURI, '",',
            '"website":"', website, '",',
            '"description":"', description, '",',
            '"deploymentTime":', _uint2str(DEPLOYMENT_TIME), ',',
            '"socialLinks":', socialLinks,
            '}'
        ));
    }
    
    // ============ Supply Information ============
    
    /**
     * @notice Check if this is the source chain (where tokens were originally minted)
     * @dev Source chain has the full circulating supply
     * @return true if this is the source chain
     */
    function isSourceChain() external view returns (bool) {
        return totalSupply() == TOTAL_SUPPLY;
    }
    
    /**
     * @notice Get the time since deployment
     * @return Number of seconds since contract deployment
     */
    function getAge() external view returns (uint256) {
        return block.timestamp - DEPLOYMENT_TIME;
    }
    
    // ============ Internal Helpers ============
    
    /**
     * @dev Convert uint to string
     */
    function _uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
    
    // ============ Immutability Enforcement ============
    
    /**
     * @dev Override to prevent minting (immutable supply)
     * This function is removed in the immutable version
     */
    // Intentionally not implemented - no mint function
    
    /**
     * @dev Override to prevent burning (immutable supply)
     * This function is removed in the immutable version
     */
    // Intentionally not implemented - no burn function
    
    /**
     * @notice This contract has NO mint or burn functions
     * @dev Total supply is fixed at deployment and cannot be changed
     * @return Always returns true (supply is immutable)
     */
    function hasImmutableSupply() external pure returns (bool) {
        return true;
    }
}
