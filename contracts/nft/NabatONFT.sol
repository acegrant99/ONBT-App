// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@layerzerolabs/solidity-examples/contracts/token/onft721/ONFT721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title NabatONFT
 * @dev Omnichain Non-Fungible Token for the Nabat Ecosystem
 * NFTs can be transferred across multiple chains using LayerZero
 */
contract NabatONFT is ONFT721 {
    using Strings for uint256;

    // Base URI for token metadata
    string private _baseTokenURI;

    // Counter for token IDs
    uint256 private _nextTokenId;

    // Maximum supply
    uint256 public maxSupply;

    /**
     * @dev Constructor to initialize the ONFT
     * @param _name NFT name
     * @param _symbol NFT symbol
     * @param _minGasToStore Minimum gas to store the payload on the destination chain
     * @param _lzEndpoint LayerZero endpoint address for the current chain
     * @param _maxSupply Maximum number of NFTs that can be minted
     * @param _baseUri Base URI for token metadata
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _minGasToStore,
        address _lzEndpoint,
        uint256 _maxSupply,
        string memory _baseUri
    ) ONFT721(_name, _symbol, _minGasToStore, _lzEndpoint) {
        maxSupply = _maxSupply;
        _baseTokenURI = _baseUri;
        _nextTokenId = 1;
    }

    /**
     * @dev Mint a new NFT
     * @param _to Address to mint the NFT to
     */
    function mint(address _to) external onlyOwner {
        require(_nextTokenId <= maxSupply, "Max supply reached");
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _safeMint(_to, tokenId);
    }

    /**
     * @dev Batch mint NFTs
     * @param _to Address to mint the NFTs to
     * @param _amount Number of NFTs to mint
     */
    function batchMint(address _to, uint256 _amount) external onlyOwner {
        require(_nextTokenId + _amount - 1 <= maxSupply, "Exceeds max supply");
        for (uint256 i = 0; i < _amount; i++) {
            uint256 tokenId = _nextTokenId;
            _nextTokenId++;
            _safeMint(_to, tokenId);
        }
    }

    /**
     * @dev Set the base URI for token metadata
     * @param _baseUri New base URI
     */
    function setBaseURI(string memory _baseUri) external onlyOwner {
        _baseTokenURI = _baseUri;
    }

    /**
     * @dev Get the base URI
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    /**
     * @dev Get the token URI for a specific token
     * @param tokenId Token ID
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 
            ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
            : "";
    }

    /**
     * @dev Get the next token ID to be minted
     */
    function getNextTokenId() external view returns (uint256) {
        return _nextTokenId;
    }

    /**
     * @dev Get the total supply of minted tokens
     */
    function totalSupply() external view returns (uint256) {
        return _nextTokenId - 1;
    }
}
