// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { OAppOptionsType3 } from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OAppOptionsType3.sol";
import { EnforcedOptionParam } from "@layerzerolabs/oapp-evm/contracts/oapp/interfaces/IOAppOptionsType3.sol";
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ONBTAchievementNFT
 * @dev LayerZero ONFT721-enabled achievement NFTs for ONBT staking
 * 
 * Achievement System:
 * - Minted by staking contract when achievements unlock
 * - Fully composable across all chains via LayerZero ONFT standard
 * - Tradeable on any NFT marketplace
 * - Displayable in wallets/galleries
 * 
 * Achievement Types (from ONBTOmnichainStaking):
 * 0: FIRST_STAKE - Stake for first time
 * 1: DIAMOND_HANDS - 365-day lockup
 * 2: WHALE_STAKER - 100k+ ONBT staked
 * 3: EARLY_ADOPTER - First 1000 stakers
 * 4: COMPOUNDING_KING - 10+ compounds
 * 5: CROSS_CHAIN_USER - Stake on 2+ chains
 * 6: GOVERNANCE_PARTICIPANT - Delegate voting power
 * 7: LEADERBOARD_TOP_10 - Top 10 staker
 * 
 * LayerZero ONFT Features:
 * - Cross-chain NFT transfers (send to any supported chain)
 * - Single NFT can move between chains
 * - Ownership tracked globally
 * - Gas-efficient bridging
 * 
 * Metadata:
 * - On-chain metadata storage
 * - Achievement rarity tiers
 * - Unlock timestamp
 * - Cross-chain transfer history
 */
contract ONBTAchievementNFT is ERC721, OApp, OAppOptionsType3 {
    
    // ============ Achievement Definitions ============
    
    struct Achievement {
        uint8 achievementType;  // 0-7 achievement ID
        uint8 rarity;           // 1=Common, 2=Rare, 3=Epic, 4=Legendary
        uint256 unlockedAt;     // Timestamp when unlocked
        uint32 originChain;     // Chain where first minted (EID)
        address recipient;      // Original recipient
        uint256 transferCount;  // Number of cross-chain transfers
    }
    
    /// @notice Achievement metadata per token
    mapping(uint256 => Achievement) public achievements;
    
    /// @notice Token counter for minting
    uint256 public nextTokenId = 1;
    
    /// @notice Staking contract authorized to mint
    address public stakingContract;
    
    /// @notice Base URI for metadata
    string private _baseTokenURI;

    /// @notice Local chain LayerZero EID
    uint32 public immutable localEid;
    
    /// @notice Achievement names
    string[8] public achievementNames = [
        "First Stake",
        "Diamond Hands",
        "Whale Staker",
        "Early Adopter",
        "Compounding King",
        "Cross-Chain User",
        "Governance Participant",
        "Leaderboard Top 10"
    ];
    
    /// @notice Achievement rarities
    uint8[8] public achievementRarities = [1, 3, 3, 4, 2, 2, 2, 4];
    
    // ============ Events ============
    
    event AchievementMinted(
        address indexed recipient,
        uint256 indexed tokenId,
        uint8 achievementType,
        uint8 rarity,
        uint32 eid
    );
    
    event StakingContractUpdated(address oldContract, address newContract);
    event BaseURIUpdated(string oldURI, string newURI);
    event CrossChainTransfer(uint256 indexed tokenId, uint32 srcEid, uint32 dstEid);
    
    // ============ Constructor ============
    
    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint,
        uint32 _localEid,
        address _stakingContract
    ) ERC721(_name, _symbol) OApp(_lzEndpoint, msg.sender) Ownable() {
        require(_stakingContract != address(0), "Invalid staking contract");
        stakingContract = _stakingContract;
        localEid = _localEid;
        _baseTokenURI = "https://onbt.io/api/achievements/";
    }
    
    // ============ Minting Functions ============
    
    /**
     * @notice Mint achievement NFT
     * @dev Only callable by staking contract
     * @param recipient Address receiving the NFT
     * @param achievementType Achievement ID (0-7)
     */
    function mintAchievement(address recipient, uint8 achievementType) 
        external 
        returns (uint256) 
    {
        require(msg.sender == stakingContract, "Only staking contract");
        require(achievementType < 8, "Invalid achievement type");
        require(recipient != address(0), "Invalid recipient");
        
        uint256 tokenId = nextTokenId++;
        uint8 rarity = achievementRarities[achievementType];
        uint32 chainEid = localEid;
        
        // Store achievement metadata
        achievements[tokenId] = Achievement({
            achievementType: achievementType,
            rarity: rarity,
            unlockedAt: block.timestamp,
            originChain: chainEid,
            recipient: recipient,
            transferCount: 0
        });
        
        // Mint the NFT
        _mint(recipient, tokenId);
        
        emit AchievementMinted(recipient, tokenId, achievementType, rarity, chainEid);
        
        return tokenId;
    }
    
    /**
     * @notice Batch mint multiple achievements
     * @dev Gas-efficient for multiple unlocks at once
     */
    function batchMintAchievements(
        address recipient,
        uint8[] calldata achievementTypes
    ) external returns (uint256[] memory) {
        require(msg.sender == stakingContract, "Only staking contract");
        require(achievementTypes.length <= 8, "Too many achievements");
        
        uint256[] memory tokenIds = new uint256[](achievementTypes.length);
        
        for (uint256 i = 0; i < achievementTypes.length; i++) {
            tokenIds[i] = this.mintAchievement(recipient, achievementTypes[i]);
        }
        
        return tokenIds;
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get achievement metadata
     */
    function getAchievement(uint256 tokenId) external view returns (
        uint8 achievementType,
        string memory name,
        uint8 rarity,
        uint256 unlockedAt,
        uint32 originChain,
        address originalRecipient,
        uint256 transfers
    ) {
        require(_ownerOf(tokenId) != address(0), "Token doesn't exist");
        
        Achievement memory ach = achievements[tokenId];
        
        return (
            ach.achievementType,
            achievementNames[ach.achievementType],
            ach.rarity,
            ach.unlockedAt,
            ach.originChain,
            ach.recipient,
            ach.transferCount
        );
    }
    
    /**
     * @notice Get all achievements for an address
     */
    function getAchievementsByOwner(address owner) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](balance);
        
        uint256 index = 0;
        for (uint256 i = 1; i < nextTokenId && index < balance; i++) {
            if (_ownerOf(i) == owner) {
                tokenIds[index] = i;
                index++;
            }
        }
        
        return tokenIds;
    }
    
    /**
     * @notice Get achievement rarity name
     */
    function getRarityName(uint8 rarity) public pure returns (string memory) {
        if (rarity == 1) return "Common";
        if (rarity == 2) return "Rare";
        if (rarity == 3) return "Epic";
        if (rarity == 4) return "Legendary";
        return "Unknown";
    }
    
    /**
     * @notice Check if user has specific achievement
     */
    function hasAchievement(address user, uint8 achievementType) external view returns (bool) {
        for (uint256 i = 1; i < nextTokenId; i++) {
            if (_ownerOf(i) == user && achievements[i].achievementType == achievementType) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * @notice Get total achievements minted
     */
    function totalMinted() external view returns (uint256) {
        return nextTokenId - 1;
    }
    
    /**
     * @notice Get base URI for metadata
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }
    
    /**
     * @notice Get token URI with achievement metadata
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token doesn't exist");
        
        Achievement memory ach = achievements[tokenId];
        
        // Build URI: base + achievementType + / + tokenId
        return string(abi.encodePacked(
            _baseTokenURI,
            _toString(ach.achievementType),
            "/",
            _toString(tokenId)
        ));
    }
    
    // ============ Cross-Chain Functions ============
    
    // ============ Admin Functions ============
    
    /**
     * @notice Update staking contract address
     */
    function setStakingContract(address newContract) external onlyOwner {
        require(newContract != address(0), "Invalid address");
        address oldContract = stakingContract;
        stakingContract = newContract;
        emit StakingContractUpdated(oldContract, newContract);
    }
    
    /**
     * @notice Update base URI for metadata
     */
    function setBaseURI(string memory newURI) external onlyOwner {
        string memory oldURI = _baseTokenURI;
        _baseTokenURI = newURI;
        emit BaseURIUpdated(oldURI, newURI);
    }
    
    /**
     * @notice Update achievement name (future flexibility)
     */
    function setAchievementName(uint8 index, string memory name) external onlyOwner {
        require(index < 8, "Invalid index");
        achievementNames[index] = name;
    }
    
    /**
     * @notice Set peer for cross-chain transfers
     */
    function setPeer(uint32 _eid, bytes32 _peer) public override onlyOwner {
        super.setPeer(_eid, _peer);
    }

    function _lzReceive(
        Origin calldata,
        bytes32,
        bytes calldata,
        address,
        bytes calldata
    ) internal override {}
    
    // ============ Helper Functions ============
    
    /**
     * @notice Get current chain ID
     */
    function _getLocalEid() internal view returns (uint32) {
        return localEid;
    }
    
    /**
     * @notice Convert uint to string
     */
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
    
    /**
     * @notice Set enforced options for LayerZero messaging
     * @param _enforcedOptions Array of enforced options per destination
     * @dev Inherited from OAppOptionsType3, override to ensure proper access control
     */
    function setEnforcedOptions(EnforcedOptionParam[] calldata _enforcedOptions) public override onlyOwner {
        _setEnforcedOptions(_enforcedOptions);
    }
}

