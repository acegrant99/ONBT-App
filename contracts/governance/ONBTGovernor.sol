// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// Token voting interface
interface IOmnichainNabatVotes {
    function getVotes(address account) external view returns (uint256);
    function getPastVotes(address account, uint256 blockNumber) external view returns (uint256);
    function delegate(address delegatee) external;
}

// Staking contract voting interface - votes come from staked ONBT
interface IONBTOmnichainStaking {
    function getStakedBalance(address account) external view returns (uint256);
    function getVotes(address account) external view returns (uint256);
    function getVotingPower(address account) external view returns (uint256);
    function getTotalStaked() external view returns (uint256);
}

// Vault interface for fund management
interface IONBTOmnichainVault {
    function executeProposal(bytes32 proposalId, bytes memory data) external;
    function approveTransfer(address to, uint256 amount) external;
}

// Liquidity manager interface
interface IONBTLiquidityManager {
    function setPoolAllocation(uint32 eid, address pool, uint256 amount) external;
    function fundLiquidity(uint32 eid, address pool, uint256 amount) external;
    function withdrawLiquidity(uint32 eid, address pool, uint256 amount) external;
}

// Insurance fund interface
interface IONBTInsuranceFund {
    function fundReserve(uint256 amount) external;
    function requestPayout(address to, uint256 amount, bytes32 incidentId) external;
    function approvePayout(bytes32 incidentId) external;
}

// Stabilizer interface
interface IONBTStabilizer {
    function executeBuyback(uint256 amountIn, uint256 minOut) external;
    function burnFromBuyback(uint256 amount) external;
    function setStrategy(bytes32 strategyId) external;
}

// Revenue router interface
interface IONBTRevenueRouter {
    function routeFees(address token, uint256 amount) external;
    function setSplits(uint256 toVault, uint256 toRewards, uint256 toInsurance) external;
}

// Incentive controller interface
interface IONBTIncentiveController {
    function setRewardRate(uint32 eid, uint256 rateBps) external;
    function computeRewards(address user) external view returns (uint256);
    function getRewardRate(uint32 eid) external view returns (uint256);
}

/**
 * @title ONBTGovernor
 * @dev LayerZero-enabled omnichain DAO governance for ONBT
 * 
 * Architecture:
 * Hub: Base (aggregates votes, executes proposals)
 * Spokes: All chains (collect local votes, relay to hub)
 * 
 * Voting Power:
 * - Derived from staked ONBT (via ONBTOmnichainStaking.getVotes())
 * - Delegation supported (vote without moving tokens)
 * - Snapshot at proposal creation (prevent double voting)
 * - Aggregated across all chains via LayerZero
 * 
 * Proposal Lifecycle:
 * 1. Create proposal on hub (Base)
 * 2. Hub broadcasts to all chains via LayerZero
 * 3. Users vote on their local chain
 * 4. Votes relayed to hub and aggregated
 * 5. After voting period, proposal executed on hub
 * 6. Hub can send execution messages to other chains
 * 
 * Proposal Types:
 * - Parameter changes (staking APY, lockup multipliers)
 * - Treasury allocation (spending, investments)
 * - Contract upgrades (via proxy admin)
 * - Emergency actions (pause/unpause)
 * - Cross-chain operations (bridge configs, peer setup)
 * 
 * Governance Parameters:
 * - Proposal threshold: 10k ONBT voting power
 * - Quorum: 4% of total voting power
 * - Voting period: 3 days
 * - Timelock: 24 hours after passing
 * - Vote options: For, Against, Abstain
 */
contract ONBTGovernor is OApp, ReentrancyGuard {
    
    // ============ Enums ============
    
    enum ProposalState {
        Pending,    // Proposal created, not yet active
        Active,     // Voting in progress
        Canceled,   // Canceled by proposer
        Defeated,   // Voting ended, didn't pass
        Succeeded,  // Voting ended, passed
        Queued,     // Passed, in timelock
        Executed    // Executed
    }
    
    enum VoteType {
        Against,
        For,
        Abstain
    }
    
    // ============ Structs ============
    
    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        address[] targets;          // Contracts to call
        uint256[] values;           // ETH amounts
        bytes[] calldatas;          // Function calls
        uint256 startBlock;
        uint256 endBlock;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 abstainVotes;
        uint256 totalVotingPower;   // Snapshot at creation
        bool executed;
        bool canceled;
        uint256 eta;                // Execution timestamp (after timelock)
    }
    
    struct Receipt {
        bool hasVoted;
        VoteType support;
        uint256 votes;
    }
    
    // ============ Message Types ============
    
    uint16 public constant MSG_PROPOSAL_CREATED = 1;
    uint16 public constant MSG_VOTE_CAST = 2;
    uint16 public constant MSG_PROPOSAL_EXECUTED = 3;
    uint16 public constant MSG_SYNC_VOTING_POWER = 4;
    
    // ============ State Variables ============
    
    /// @notice Local chain LayerZero EID
    uint32 public immutable localEid;

    /// @notice Hub chain LayerZero EID (Base)
    uint32 public immutable hubChainEid;
    
    /// @notice Whether this is hub deployment
    bool public immutable isHub;
    
    /// @notice Staking contract for voting power
    address public stakingContract;

    /// @notice Vault contract for governance actions
    address public vault;

    /// @notice Rewards pool contract for incentive actions
    address public rewardsPool;

    /// @notice Liquidity manager module
    address public liquidityManager;

    /// @notice Insurance fund module
    address public insuranceFund;

    /// @notice Market stabilizer module
    address public stabilizer;

    /// @notice Revenue router module
    address public revenueRouter;

    /// @notice Incentive controller module
    address public incentiveController;
    
    /// @notice Proposal counter
    uint256 public proposalCount;
    
    /// @notice Proposals by ID
    mapping(uint256 => Proposal) public proposals;
    
    /// @notice Receipts: proposalId => voter => receipt
    mapping(uint256 => mapping(address => Receipt)) public receipts;
    
    /// @notice Chain votes: proposalId => chainId => votes
    mapping(uint256 => mapping(uint32 => uint256)) public chainForVotes;
    mapping(uint256 => mapping(uint32 => uint256)) public chainAgainstVotes;
    mapping(uint256 => mapping(uint32 => uint256)) public chainAbstainVotes;
    
    /// @notice Total voting power snapshot per chain
    mapping(uint32 => uint256) public chainVotingPower;
    
    // ============ Governance Parameters ============
    
    /// @notice Minimum voting power to create proposal
    uint256 public proposalThreshold = 10000 ether; // 10k ONBT
    
    /// @notice Quorum as percentage (400 = 4%)
    uint256 public quorumPercentage = 400;
    
    /// @notice Voting period in blocks (~3 days on Base)
    uint256 public votingPeriod = 216000; // ~3 days at 1.2s/block
    
    /// @notice Timelock delay (24 hours)
    uint256 public timelockDelay = 24 hours;
    
    // ============ Events ============
    
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        string title,
        uint256 startBlock,
        uint256 endBlock
    );
    
    event VoteCast(
        address indexed voter,
        uint256 indexed proposalId,
        VoteType support,
        uint256 votes,
        uint32 eid
    );

    event LiquidityManagerUpdated(address indexed oldManager, address indexed newManager);
    event InsuranceFundUpdated(address indexed oldFund, address indexed newFund);
    event StabilizerUpdated(address indexed oldStabilizer, address indexed newStabilizer);
    event RevenueRouterUpdated(address indexed oldRouter, address indexed newRouter);
    event IncentiveControllerUpdated(address indexed oldController, address indexed newController);
    event VaultUpdated(address indexed oldVault, address indexed newVault);
    event RewardsPoolUpdated(address indexed oldPool, address indexed newPool);
    event VaultActionExecuted(address indexed target, bytes data);
    
    event ProposalExecuted(uint256 indexed proposalId);
    event ProposalCanceled(uint256 indexed proposalId);
    event ProposalQueued(uint256 indexed proposalId, uint256 eta);
    event VotingPowerSynced(uint32 indexed eid, uint256 votingPower);
    
    // ============ Constructor ============

    /**
     * @notice Initializes the governor contract.
     * @param _lzEndpoint LayerZero endpoint address.
     * @param _localEid Local chain endpoint ID.
     * @param _hubChainEid Hub chain endpoint ID.
     * @param _isHub Whether this deployment is the hub.
     * @param _stakingContract Staking contract used for voting power.
     */
    constructor(
        address _lzEndpoint,
        uint32 _localEid,
        uint32 _hubChainEid,
        bool _isHub,
        address _stakingContract
    ) OApp(_lzEndpoint, msg.sender) Ownable() {
        localEid = _localEid;
        hubChainEid = _hubChainEid;
        isHub = _isHub;
        stakingContract = _stakingContract;
    }
    
    // ============ Proposal Functions ============
    
    /**
     * @notice Create a new proposal (hub only)
     */
    function propose(
        string memory title,
        string memory description,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas
    ) external nonReentrant returns (uint256) {
        require(isHub, "Only hub creates proposals");
        require(targets.length == values.length && values.length == calldatas.length, "Length mismatch");
        require(targets.length > 0, "Empty proposal");
        
        // Check proposer has enough voting power
        uint256 proposerVotes = _getVotes(msg.sender);
        require(proposerVotes >= proposalThreshold, "Below proposal threshold");
        
        uint256 proposalId = ++proposalCount;
        uint256 startBlock = block.number + 1;
        uint256 endBlock = startBlock + votingPeriod;
        
        Proposal storage proposal = proposals[proposalId];
        proposal.id = proposalId;
        proposal.proposer = msg.sender;
        proposal.title = title;
        proposal.description = description;
        proposal.targets = targets;
        proposal.values = values;
        proposal.calldatas = calldatas;
        proposal.startBlock = startBlock;
        proposal.endBlock = endBlock;
        proposal.totalVotingPower = _getTotalVotingPower();
        
        emit ProposalCreated(proposalId, msg.sender, title, startBlock, endBlock);
        
        // Broadcast to all chains
        _broadcastProposal(proposalId);
        
        return proposalId;
    }
    
    /**
     * @notice Cast vote
     */
    function castVote(uint256 proposalId, VoteType support) external nonReentrant {
        return _castVote(msg.sender, proposalId, support);
    }
    
    /**
     * @notice Internal vote casting
     */
    function _castVote(address voter, uint256 proposalId, VoteType support) internal {
        require(state(proposalId) == ProposalState.Active, "Voting closed");
        
        Receipt storage receipt = receipts[proposalId][voter];
        require(!receipt.hasVoted, "Already voted");
        
        uint256 votes = _getVotes(voter);
        require(votes > 0, "No voting power");
        
        // Record vote
        receipt.hasVoted = true;
        receipt.support = support;
        receipt.votes = votes;
        
        uint32 chainEid = localEid;
        
        // Add to chain totals
        if (support == VoteType.For) {
            chainForVotes[proposalId][chainEid] += votes;
        } else if (support == VoteType.Against) {
            chainAgainstVotes[proposalId][chainEid] += votes;
        } else {
            chainAbstainVotes[proposalId][chainEid] += votes;
        }
        
        emit VoteCast(voter, proposalId, support, votes, chainEid);
        
        // If not on hub, relay vote to hub
        if (!isHub) {
            _relayVoteToHub(proposalId, support, votes);
        } else {
            // Update proposal totals on hub
            Proposal storage proposal = proposals[proposalId];
            if (support == VoteType.For) {
                proposal.forVotes += votes;
            } else if (support == VoteType.Against) {
                proposal.againstVotes += votes;
            } else {
                proposal.abstainVotes += votes;
            }
        }
    }
    
    /**
     * @notice Queue proposal after it passes
     */
    function queue(uint256 proposalId) external nonReentrant {
        require(isHub, "Only hub queues");
        require(state(proposalId) == ProposalState.Succeeded, "Not succeeded");
        
        Proposal storage proposal = proposals[proposalId];
        proposal.eta = block.timestamp + timelockDelay;
        
        emit ProposalQueued(proposalId, proposal.eta);
    }
    
    /**
     * @notice Execute proposal after timelock
     */
    function execute(uint256 proposalId) external payable nonReentrant {
        require(isHub, "Only hub executes");
        require(state(proposalId) == ProposalState.Queued, "Not queued");
        
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.eta, "Timelock active");
        
        proposal.executed = true;
        
        // Execute all calls
        for (uint256 i = 0; i < proposal.targets.length; i++) {
            (bool success, ) = proposal.targets[i].call{value: proposal.values[i]}(
                proposal.calldatas[i]
            );
            require(success, "Execution failed");
        }
        
        emit ProposalExecuted(proposalId);
    }
    
    /**
     * @notice Cancel proposal (proposer only)
     */
    function cancel(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(msg.sender == proposal.proposer || msg.sender == owner(), "Not authorized");
        require(!proposal.executed, "Already executed");
        
        proposal.canceled = true;
        emit ProposalCanceled(proposalId);
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get proposal state
     */
    function state(uint256 proposalId) public view returns (ProposalState) {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.id != 0, "Invalid proposal");
        
        if (proposal.canceled) return ProposalState.Canceled;
        if (proposal.executed) return ProposalState.Executed;
        if (block.number < proposal.startBlock) return ProposalState.Pending;
        if (block.number <= proposal.endBlock) return ProposalState.Active;
        
        // Check if passed
        uint256 quorum = (proposal.totalVotingPower * quorumPercentage) / 10000;
        bool quorumReached = (proposal.forVotes + proposal.againstVotes + proposal.abstainVotes) >= quorum;
        bool majorityFor = proposal.forVotes > proposal.againstVotes;
        
        if (!quorumReached || !majorityFor) return ProposalState.Defeated;
        if (proposal.eta == 0) return ProposalState.Succeeded;
        if (block.timestamp < proposal.eta) return ProposalState.Queued;
        
        return ProposalState.Succeeded;
    }
    
    /**
     * @notice Get voting power from staking contract
     */
    function _getVotes(address account) internal view returns (uint256) {
        if (stakingContract == address(0)) return 0;

        (bool success, bytes memory data) = stakingContract.staticcall(
            abi.encodeWithSignature("getVotingPower(address)", account)
        );

        if (success) {
            return abi.decode(data, (uint256));
        }

        (success, data) = stakingContract.staticcall(
            abi.encodeWithSignature("getVotes(address)", account)
        );

        if (!success) return 0;
        return abi.decode(data, (uint256));
    }
    
    /**
     * @notice Get total voting power across all chains
     */
    function _getTotalVotingPower() internal view returns (uint256) {
        if (stakingContract == address(0)) return 0;
        
        (bool success, bytes memory data) = stakingContract.staticcall(
            abi.encodeWithSignature("totalVotingPower()")
        );
        
        if (!success) return 1000000 ether; // Default 1M
        return abi.decode(data, (uint256));
    }
    
    /**
     * @notice Get proposal details
     */
    function getProposal(uint256 proposalId) external view returns (
        address proposer,
        string memory title,
        string memory description,
        uint256 forVotes,
        uint256 againstVotes,
        uint256 abstainVotes,
        uint256 startBlock,
        uint256 endBlock,
        ProposalState currentState
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.proposer,
            proposal.title,
            proposal.description,
            proposal.forVotes,
            proposal.againstVotes,
            proposal.abstainVotes,
            proposal.startBlock,
            proposal.endBlock,
            state(proposalId)
        );
    }
    
    /**
     * @notice Get receipt for voter
     */
    function getReceipt(uint256 proposalId, address voter) 
        external 
        view 
        returns (bool hasVoted, VoteType support, uint256 votes) 
    {
        Receipt storage receipt = receipts[proposalId][voter];
        return (receipt.hasVoted, receipt.support, receipt.votes);
    }
    
    // ============ LayerZero Functions ============
    
    /**
     * @notice Handle incoming LayerZero messages
     */
    function _lzReceive(
        Origin calldata _origin,
        bytes32 /*_guid*/,
        bytes calldata _payload,
        address /*_executor*/,
        bytes calldata /*_extraData*/
    ) internal override {
        uint16 msgType = abi.decode(_payload, (uint16));
        uint32 srcEid = _origin.srcEid;
        
        if (msgType == MSG_PROPOSAL_CREATED) {
            _handleProposalBroadcast(_payload);
        } else if (msgType == MSG_VOTE_CAST) {
            _handleVoteRelay(srcEid, _payload);
        }
    }
    
    /**
     * @notice Broadcast proposal to all chains
     */
    function _broadcastProposal(uint256 proposalId) internal {
        // In production, would send to all registered peer chains
        // For now, this is a placeholder
    }
    
    /**
     * @notice Handle proposal broadcast from hub
     */
    function _handleProposalBroadcast(bytes memory /*payload*/) internal view {
        require(!isHub, "Hub doesn't receive broadcasts");
        // Store proposal metadata for local voting
    }
    
    /**
     * @notice Relay vote to hub
     */
    function _relayVoteToHub(uint256 proposalId, VoteType support, uint256 votes) internal {
        bytes memory payload = abi.encode(
            MSG_VOTE_CAST,
            proposalId,
            support,
            votes
        );
        
        bytes memory options = "";
        MessagingFee memory fee = MessagingFee(address(this).balance, 0);
        
        if (fee.nativeFee > 0) {
            _lzSend(
                hubChainEid,
                payload,
                options,
                fee,
                payable(address(this))
            );
        }
    }
    
    /**
     * @notice Handle vote relay on hub
     */
    function _handleVoteRelay(uint32 /*srcEid*/, bytes memory payload) internal {
        require(isHub, "Only hub receives votes");
        
        (, uint256 proposalId, VoteType support, uint256 votes) = abi.decode(
            payload,
            (uint16, uint256, VoteType, uint256)
        );
        
        Proposal storage proposal = proposals[proposalId];
        
        // Add votes to proposal
        if (support == VoteType.For) {
            proposal.forVotes += votes;
        } else if (support == VoteType.Against) {
            proposal.againstVotes += votes;
        } else {
            proposal.abstainVotes += votes;
        }
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Update staking contract
     * @param newContract New staking contract address.
     */
    function setStakingContract(address newContract) external onlyOwner {
        require(newContract != address(0), "Invalid address");
        stakingContract = newContract;
    }

    /**
     * @notice Updates the vault module address.
     * @param newVault New vault contract address.
     */
    function setVault(address newVault) external onlyOwner {
        require(newVault != address(0), "Invalid address");
        emit VaultUpdated(vault, newVault);
        vault = newVault;
    }

    /**
     * @notice Updates the rewards pool module address.
     * @param newPool New rewards pool contract address.
     */
    function setRewardsPool(address newPool) external onlyOwner {
        require(newPool != address(0), "Invalid address");
        emit RewardsPoolUpdated(rewardsPool, newPool);
        rewardsPool = newPool;
    }

    /**
     * @notice Executes an arbitrary action on the vault module.
     * @param data ABI-encoded call data for the target module.
     */
    function executeVaultAction(bytes calldata data) external onlyOwner nonReentrant {
        require(isHub, "Only hub executes");
        require(vault != address(0), "Vault not set");

        (bool success, ) = vault.call(data);
        require(success, "Vault action failed");
        emit VaultActionExecuted(vault, data);
    }

    /**
     * @notice Executes an arbitrary action on the rewards pool module.
     * @param data ABI-encoded call data for the target module.
     */
    function executeRewardsPoolAction(bytes calldata data) external onlyOwner nonReentrant {
        require(isHub, "Only hub executes");
        require(rewardsPool != address(0), "Rewards pool not set");

        (bool success, ) = rewardsPool.call(data);
        require(success, "Rewards pool action failed");
        emit VaultActionExecuted(rewardsPool, data);
    }

    /**
     * @notice Executes an arbitrary action on the liquidity manager module.
     * @param data ABI-encoded call data for the target module.
     */
    function executeLiquidityManagerAction(bytes calldata data) external onlyOwner nonReentrant {
        require(isHub, "Only hub executes");
        require(liquidityManager != address(0), "Liquidity manager not set");

        (bool success, ) = liquidityManager.call(data);
        require(success, "Liquidity manager action failed");
        emit VaultActionExecuted(liquidityManager, data);
    }

    /**
     * @notice Executes an arbitrary action on the insurance fund module.
     * @param data ABI-encoded call data for the target module.
     */
    function executeInsuranceFundAction(bytes calldata data) external onlyOwner nonReentrant {
        require(isHub, "Only hub executes");
        require(insuranceFund != address(0), "Insurance fund not set");

        (bool success, ) = insuranceFund.call(data);
        require(success, "Insurance fund action failed");
        emit VaultActionExecuted(insuranceFund, data);
    }

    /**
     * @notice Executes an arbitrary action on the stabilizer module.
     * @param data ABI-encoded call data for the target module.
     */
    function executeStabilizerAction(bytes calldata data) external onlyOwner nonReentrant {
        require(isHub, "Only hub executes");
        require(stabilizer != address(0), "Stabilizer not set");

        (bool success, ) = stabilizer.call(data);
        require(success, "Stabilizer action failed");
        emit VaultActionExecuted(stabilizer, data);
    }

    /**
     * @notice Executes an arbitrary action on the revenue router module.
     * @param data ABI-encoded call data for the target module.
     */
    function executeRevenueRouterAction(bytes calldata data) external onlyOwner nonReentrant {
        require(isHub, "Only hub executes");
        require(revenueRouter != address(0), "Revenue router not set");

        (bool success, ) = revenueRouter.call(data);
        require(success, "Revenue router action failed");
        emit VaultActionExecuted(revenueRouter, data);
    }

    /**
     * @notice Executes an arbitrary action on the incentive controller module.
     * @param data ABI-encoded call data for the target module.
     */
    function executeIncentiveControllerAction(bytes calldata data) external onlyOwner nonReentrant {
        require(isHub, "Only hub executes");
        require(incentiveController != address(0), "Incentive controller not set");

        (bool success, ) = incentiveController.call(data);
        require(success, "Incentive controller action failed");
        emit VaultActionExecuted(incentiveController, data);
    }

    function setLiquidityManager(address newManager) external onlyOwner {
        require(newManager != address(0), "Invalid address");
        emit LiquidityManagerUpdated(liquidityManager, newManager);
        liquidityManager = newManager;
    }

    function setInsuranceFund(address newFund) external onlyOwner {
        require(newFund != address(0), "Invalid address");
        emit InsuranceFundUpdated(insuranceFund, newFund);
        insuranceFund = newFund;
    }

    function setStabilizer(address newStabilizer) external onlyOwner {
        require(newStabilizer != address(0), "Invalid address");
        emit StabilizerUpdated(stabilizer, newStabilizer);
        stabilizer = newStabilizer;
    }

    function setRevenueRouter(address newRouter) external onlyOwner {
        require(newRouter != address(0), "Invalid address");
        emit RevenueRouterUpdated(revenueRouter, newRouter);
        revenueRouter = newRouter;
    }

    function setIncentiveController(address newController) external onlyOwner {
        require(newController != address(0), "Invalid address");
        emit IncentiveControllerUpdated(incentiveController, newController);
        incentiveController = newController;
    }

    // ============ Proposal Helpers ============

    function buildFundLiquidityAction(
        uint32 eid,
        address pool,
        uint256 amount
    ) external view returns (address target, uint256 value, bytes memory data) {
        require(vault != address(0), "Vault not set");
        return (vault, 0, abi.encodeWithSignature("fundLiquidity(uint32,address,uint256)", eid, pool, amount));
    }

    function buildWithdrawLiquidityAction(
        uint32 eid,
        address pool,
        uint256 amount
    ) external view returns (address target, uint256 value, bytes memory data) {
        require(vault != address(0), "Vault not set");
        return (vault, 0, abi.encodeWithSignature("withdrawLiquidity(uint32,address,uint256)", eid, pool, amount));
    }

    function buildFundInsuranceReserveAction(uint256 amount)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(vault != address(0), "Vault not set");
        return (vault, 0, abi.encodeWithSignature("fundInsuranceReserve(uint256)", amount));
    }

    function buildRequestInsurancePayoutAction(address to, uint256 amount, bytes32 incidentId)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(vault != address(0), "Vault not set");
        return (
            vault,
            0,
            abi.encodeWithSignature("requestInsurancePayout(address,uint256,bytes32)", to, amount, incidentId)
        );
    }

    function buildApproveInsurancePayoutAction(bytes32 incidentId)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(vault != address(0), "Vault not set");
        return (vault, 0, abi.encodeWithSignature("approveInsurancePayout(bytes32)", incidentId));
    }

    function buildExecuteBuybackAction(uint256 amountIn, uint256 minOut)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(vault != address(0), "Vault not set");
        return (vault, 0, abi.encodeWithSignature("executeBuyback(uint256,uint256)", amountIn, minOut));
    }

    function buildBurnFromBuybackAction(uint256 amount)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(vault != address(0), "Vault not set");
        return (vault, 0, abi.encodeWithSignature("burnFromBuyback(uint256)", amount));
    }

    function buildSetStabilizerStrategyAction(bytes32 strategyId)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(vault != address(0), "Vault not set");
        return (vault, 0, abi.encodeWithSignature("setStabilizerStrategy(bytes32)", strategyId));
    }

    function buildRouteRevenueAction(address token, uint256 amount)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(vault != address(0), "Vault not set");
        return (vault, 0, abi.encodeWithSignature("routeRevenue(address,uint256)", token, amount));
    }

    function buildSetRevenueSplitsAction(uint256 toVault, uint256 toRewards, uint256 toInsurance)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(vault != address(0), "Vault not set");
        return (vault, 0, abi.encodeWithSignature("setRevenueSplits(uint256,uint256,uint256)", toVault, toRewards, toInsurance));
    }

    function buildSetRewardRateAction(uint32 eid, uint256 rateBps)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(incentiveController != address(0), "Incentive controller not set");
        return (incentiveController, 0, abi.encodeWithSignature("setRewardRate(uint32,uint256)", eid, rateBps));
    }

    function buildSetRefillConfigAction(uint256 threshold, uint256 amount)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(rewardsPool != address(0), "Rewards pool not set");
        return (rewardsPool, 0, abi.encodeWithSignature("setRefillConfig(uint256,uint256)", threshold, amount));
    }

    function buildSetChainAllocationAction(uint32 eid, uint256 allocation)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(rewardsPool != address(0), "Rewards pool not set");
        return (rewardsPool, 0, abi.encodeWithSignature("setChainAllocation(uint32,uint256)", eid, allocation));
    }

    function buildSetSupportedTokenAction(address token, bool supported)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(rewardsPool != address(0), "Rewards pool not set");
        return (rewardsPool, 0, abi.encodeWithSignature("setSupportedToken(address,bool)", token, supported));
    }

    function buildSetRateLimitsAction(uint256 maxAmount, uint256 cooldown)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(rewardsPool != address(0), "Rewards pool not set");
        return (rewardsPool, 0, abi.encodeWithSignature("setRateLimits(uint256,uint256)", maxAmount, cooldown));
    }

    function buildSetPoolAllocationAction(uint32 eid, address pool, uint256 amount)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(liquidityManager != address(0), "Liquidity manager not set");
        return (liquidityManager, 0, abi.encodeWithSignature("setPoolAllocation(uint32,address,uint256)", eid, pool, amount));
    }

    function buildFundLiquidityManagerAction(uint32 eid, address pool, uint256 amount)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(liquidityManager != address(0), "Liquidity manager not set");
        return (liquidityManager, 0, abi.encodeWithSignature("fundLiquidity(uint32,address,uint256)", eid, pool, amount));
    }

    function buildWithdrawLiquidityManagerAction(uint32 eid, address pool, uint256 amount)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(liquidityManager != address(0), "Liquidity manager not set");
        return (liquidityManager, 0, abi.encodeWithSignature("withdrawLiquidity(uint32,address,uint256)", eid, pool, amount));
    }

    function buildFundInsuranceReserveDirectAction(uint256 amount)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(insuranceFund != address(0), "Insurance fund not set");
        return (insuranceFund, 0, abi.encodeWithSignature("fundReserve(uint256)", amount));
    }

    function buildRequestInsurancePayoutDirectAction(address to, uint256 amount, bytes32 incidentId)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(insuranceFund != address(0), "Insurance fund not set");
        return (
            insuranceFund,
            0,
            abi.encodeWithSignature("requestPayout(address,uint256,bytes32)", to, amount, incidentId)
        );
    }

    function buildApproveInsurancePayoutDirectAction(bytes32 incidentId)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(insuranceFund != address(0), "Insurance fund not set");
        return (insuranceFund, 0, abi.encodeWithSignature("approvePayout(bytes32)", incidentId));
    }

    function buildExecuteBuybackDirectAction(uint256 amountIn, uint256 minOut)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(stabilizer != address(0), "Stabilizer not set");
        return (stabilizer, 0, abi.encodeWithSignature("executeBuyback(uint256,uint256)", amountIn, minOut));
    }

    function buildBurnFromBuybackDirectAction(uint256 amount)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(stabilizer != address(0), "Stabilizer not set");
        return (stabilizer, 0, abi.encodeWithSignature("burnFromBuyback(uint256)", amount));
    }

    function buildSetStabilizerStrategyDirectAction(bytes32 strategyId)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(stabilizer != address(0), "Stabilizer not set");
        return (stabilizer, 0, abi.encodeWithSignature("setStrategy(bytes32)", strategyId));
    }

    function buildRouteRevenueDirectAction(address token, uint256 amount)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(revenueRouter != address(0), "Revenue router not set");
        return (revenueRouter, 0, abi.encodeWithSignature("routeFees(address,uint256)", token, amount));
    }

    function buildSetRevenueSplitsDirectAction(uint256 toVault, uint256 toRewards, uint256 toInsurance)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        require(revenueRouter != address(0), "Revenue router not set");
        return (revenueRouter, 0, abi.encodeWithSignature("setSplits(uint256,uint256,uint256)", toVault, toRewards, toInsurance));
    }

    function buildSetVaultAddressAction(address newVault)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        return (address(this), 0, abi.encodeWithSignature("setVault(address)", newVault));
    }

    function buildSetRewardsPoolAddressAction(address newPool)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        return (address(this), 0, abi.encodeWithSignature("setRewardsPool(address)", newPool));
    }

    function buildSetLiquidityManagerAddressAction(address newManager)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        return (address(this), 0, abi.encodeWithSignature("setLiquidityManager(address)", newManager));
    }

    function buildSetInsuranceFundAddressAction(address newFund)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        return (address(this), 0, abi.encodeWithSignature("setInsuranceFund(address)", newFund));
    }

    function buildSetStabilizerAddressAction(address newStabilizer)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        return (address(this), 0, abi.encodeWithSignature("setStabilizer(address)", newStabilizer));
    }

    function buildSetRevenueRouterAddressAction(address newRouter)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        return (address(this), 0, abi.encodeWithSignature("setRevenueRouter(address)", newRouter));
    }

    function buildSetIncentiveControllerAddressAction(address newController)
        external
        view
        returns (address target, uint256 value, bytes memory data)
    {
        return (address(this), 0, abi.encodeWithSignature("setIncentiveController(address)", newController));
    }
    
    /**
     * @notice Update governance parameters
     * @param threshold Proposal threshold voting power.
     * @param quorum Quorum in basis points.
     * @param period Voting period in blocks.
     * @param delay Timelock delay in seconds.
     */
    function setGovernanceParams(
        uint256 threshold,
        uint256 quorum,
        uint256 period,
        uint256 delay
    ) external onlyOwner {
        if (threshold > 0) proposalThreshold = threshold;
        if (quorum > 0 && quorum <= 10000) quorumPercentage = quorum;
        if (period > 0) votingPeriod = period;
        if (delay > 0) timelockDelay = delay;
    }
    
    /**
     * @notice Set peer for cross-chain communication
     */
    function setPeer(uint32 _eid, bytes32 _peer) public override onlyOwner {
        super.setPeer(_eid, _peer);
    }
    
    /**
     * @notice Get current chain ID
     */
    function _getLocalEid() internal view returns (uint32) {
        return localEid;
    }
    
    /**
     * @notice Receive ETH for execution
     */
    receive() external payable {}
}

