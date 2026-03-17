// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

// Token interface
interface IOmnichainNabatOFT is IERC20 {
    function getPeerAddress(uint32 eid) external view returns (bytes32);
    function getRegisteredChains() external view returns (uint32[] memory);
}

// Governor interface for governance-controlled operations
interface IONBTGovernor {
    function isProposalApproved(bytes32 proposalId) external view returns (bool);
    function getProposalData(bytes32 proposalId) external view returns (bytes memory);
}

// Rewards pool interface for fund coordination
interface IONBTRewardsPool {
    function withdrawRewards(uint256 amount) external returns (bool);
    function allocateRewards(uint32 destEid, uint256 amount) external;
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

/**
 * @title ONBTOmnichainVault (OVault)
 * @dev Omnichain treasury vault with cross-chain fund management
 * 
 * Hub Chain: Base (main treasury, aggregates funds from all chains)
 * Destination Chains: Receive allocations and send reports back to hub
 * 
 * Features:
 * - Multi-asset support (native + ERC20)
 * - Cross-chain fund transfers
 * - Governance-controlled withdrawals
 * - Budget allocation system
 * - Revenue tracking across chains
 * - Emergency withdrawal mechanism
 * - Transparent fund tracking
 * 
 * Message Types:
 * - TRANSFER_FUNDS: Send funds to destination chain
 * - REPORT_BALANCE: Report balance back to hub
 * - ALLOCATE_BUDGET: Set budget allocation for destination
 * - REQUEST_FUNDS: Destination requests funds from hub
 */
contract ONBTOmnichainVault is OApp, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;
    
    // ============ Message Types ============
    
    uint16 public constant MSG_TRANSFER_FUNDS = 1;
    uint16 public constant MSG_REPORT_BALANCE = 2;
    uint16 public constant MSG_ALLOCATE_BUDGET = 3;
    uint16 public constant MSG_REQUEST_FUNDS = 4;
    uint16 public constant MSG_EMERGENCY_WITHDRAW = 5;
    
    // ============ State Variables ============
    
    /// @notice Local chain LayerZero EID
    uint32 public immutable localEid;

    /// @notice Hub chain LayerZero EID (Base)
    uint32 public immutable hubChainEid;
    
    /// @notice Whether this deployment is on the hub chain
    bool public immutable isHub;
    
    /// @notice Governance address (can execute actions)
    address public governance;
    
    /// @notice Treasury manager (can allocate budgets)
    address public treasuryManager;

    /// @notice Liquidity manager module
    address public liquidityManager;

    /// @notice Insurance fund module
    address public insuranceFund;

    /// @notice Market stabilizer module
    address public stabilizer;

    /// @notice Revenue router module
    address public revenueRouter;
    
    /// @notice Whitelisted tokens for vault
    mapping(address => bool) public whitelistedTokens;
    
    /// @notice Token balance tracking: token => amount
    mapping(address => uint256) public tokenBalances;
    
    /// @notice Budget allocations: eid => token => amount
    mapping(uint32 => mapping(address => uint256)) public budgetAllocations;
    
    /// @notice Spent amounts: eid => token => amount
    mapping(uint32 => mapping(address => uint256)) public spentAmounts;
    
    /// @notice Revenue collected: eid => token => amount
    mapping(uint32 => mapping(address => uint256)) public revenueCollected;

    /// @notice Reserved funds for cross-chain transfers: eid => token => amount
    mapping(uint32 => mapping(address => uint256)) public reservedForChain;

    /// @notice Total reserved per token (for available balance checks)
    mapping(address => uint256) public totalReserved;
    
    /// @notice Withdrawal requests: requestId => WithdrawalRequest
    mapping(uint256 => WithdrawalRequest) public withdrawalRequests;
    
    /// @notice Next withdrawal request ID
    uint256 public nextRequestId;
    
    // ============ Structs ============
    
    struct WithdrawalRequest {
        uint16 destinationChain;
        address token;
        uint256 amount;
        address recipient;
        bool executed;
        uint256 timestamp;
    }
    
    // ============ Events ============
    
    event FundsDeposited(address indexed token, uint256 amount, address indexed from);
    event FundsTransferred(uint32 indexed destinationEid, address indexed token, uint256 amount);
    event BalanceReported(uint32 indexed sourceEid, address indexed token, uint256 balance);
    event BudgetAllocated(uint32 indexed eid, address indexed token, uint256 amount);
    event FundsRequested(uint32 indexed sourceEid, address indexed token, uint256 amount);
    event TransferMessageReceived(uint32 indexed sourceEid, address indexed token, uint256 amount);
    event WithdrawalExecuted(uint256 indexed requestId, address indexed token, uint256 amount, address indexed recipient);
    event TokenWhitelisted(address indexed token, bool whitelisted);
    event GovernanceUpdated(address indexed oldGovernance, address indexed newGovernance);
    event TreasuryManagerUpdated(address indexed oldManager, address indexed newManager);
    event LiquidityManagerUpdated(address indexed oldManager, address indexed newManager);
    event InsuranceFundUpdated(address indexed oldFund, address indexed newFund);
    event StabilizerUpdated(address indexed oldStabilizer, address indexed newStabilizer);
    event RevenueRouterUpdated(address indexed oldRouter, address indexed newRouter);
    event MessageReceived(uint32 srcEid, uint16 msgType, bytes payload);
    
    // ============ Modifiers ============
    
    modifier onlyHub() {
        require(isHub, "Only hub chain can call");
        _;
    }
    
    modifier onlyGovernance() {
        require(msg.sender == governance || msg.sender == owner(), "Only governance");
        _;
    }
    
    modifier onlyTreasuryManager() {
        require(msg.sender == treasuryManager || msg.sender == governance || msg.sender == owner(), "Only treasury manager");
        _;
    }
    
    // ============ Constructor ============
    
    /**
     * @param _lzEndpoint LayerZero endpoint address
     * @param _localEid Local LayerZero endpoint ID
     * @param _hubChainEid Hub chain endpoint ID (Base)
     * @param _isHub Whether this deployment is on hub chain
     * @param _governance Governance address
     */
    constructor(
        address _lzEndpoint,
        uint32 _localEid,
        uint32 _hubChainEid,
        bool _isHub,
        address _governance
    ) OApp(_lzEndpoint, msg.sender) Ownable() {
        localEid = _localEid;
        hubChainEid = _hubChainEid;
        isHub = _isHub;
        governance = _governance;
        treasuryManager = msg.sender;
        
        // Whitelist native token (address(0) represents native)
        whitelistedTokens[address(0)] = true;
    }
    
    // ============ Deposit Functions ============
    
    /**
     * @notice Deposit native tokens to vault
     */
    function depositNative() external payable whenNotPaused {
        require(msg.value > 0, "No value sent");
        tokenBalances[address(0)] += msg.value;
        emit FundsDeposited(address(0), msg.value, msg.sender);
    }
    
    /**
     * @notice Deposit ERC20 tokens to vault
     * @param token Token address
     * @param amount Amount to deposit
     */
    function depositToken(address token, uint256 amount) external whenNotPaused {
        require(whitelistedTokens[token], "Token not whitelisted");
        require(amount > 0, "Amount must be > 0");
        
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        tokenBalances[token] += amount;
        
        emit FundsDeposited(token, amount, msg.sender);
    }
    
    // ============ Hub Functions (Base Chain) ============
    
    /**
     * @notice Transfer funds to destination chain
     * @param destinationEid Destination chain EID
     * @param token Token address (address(0) for native)
     * @param amount Amount to transfer
     */
    function transferFundsToChain(
        uint32 destinationEid,
        address token,
        uint256 amount
    ) external payable onlyHub onlyGovernance whenNotPaused nonReentrant {
        require(tokenBalances[token] >= totalReserved[token] + amount, "Insufficient balance");
        require(
            budgetAllocations[destinationEid][token] >= spentAmounts[destinationEid][token] + amount,
            "Exceeds budget"
        );
        
        reservedForChain[destinationEid][token] += amount;
        totalReserved[token] += amount;
        spentAmounts[destinationEid][token] += amount;
        
        bytes memory payload = abi.encode(MSG_TRANSFER_FUNDS, token, amount, address(this));
        bytes memory options = "";
        MessagingFee memory fee = MessagingFee(msg.value, 0);
        
        _lzSend(
            destinationEid,
            payload,
            options,
            fee,
            payable(msg.sender)
        );
        
        emit FundsTransferred(destinationEid, token, amount);
    }
    
    /**
     * @notice Allocate budget to destination chain
     * @param destinationEid Destination chain EID
     * @param token Token address
     * @param amount Budget amount
     */
    function allocateBudget(
        uint32 destinationEid,
        address token,
        uint256 amount
    ) external payable onlyHub onlyTreasuryManager {
        budgetAllocations[destinationEid][token] = amount;
        
        bytes memory payload = abi.encode(MSG_ALLOCATE_BUDGET, token, amount);
        bytes memory options = "";
        MessagingFee memory fee = MessagingFee(msg.value, 0);
        
        _lzSend(
            destinationEid,
            payload,
            options,
            fee,
            payable(msg.sender)
        );
        
        emit BudgetAllocated(destinationEid, token, amount);
    }
    
    /**
     * @notice Execute withdrawal request
     * @param requestId Request ID
     */
    function executeWithdrawal(uint256 requestId) external onlyGovernance nonReentrant {
        WithdrawalRequest storage request = withdrawalRequests[requestId];
        require(!request.executed, "Already executed");
        require(tokenBalances[request.token] >= totalReserved[request.token] + request.amount, "Insufficient balance");
        
        request.executed = true;
        tokenBalances[request.token] -= request.amount;
        
        if (request.token == address(0)) {
            (bool success, ) = request.recipient.call{value: request.amount}("");
            require(success, "Native transfer failed");
        } else {
            IERC20(request.token).safeTransfer(request.recipient, request.amount);
        }
        
        emit WithdrawalExecuted(requestId, request.token, request.amount, request.recipient);
    }
    
    // ============ Destination Functions ============
    
    /**
     * @notice Request funds from hub chain
     * @param token Token address
     * @param amount Amount to request
     */
    function requestFunds(
        address token,
        uint256 amount
    ) external payable onlyTreasuryManager whenNotPaused {
        require(!isHub, "Hub doesn't request from itself");
        
        bytes memory payload = abi.encode(MSG_REQUEST_FUNDS, token, amount);
        bytes memory options = "";
        MessagingFee memory fee = MessagingFee(msg.value, 0);
        
        _lzSend(
            hubChainEid,
            payload,
            options,
            fee,
            payable(msg.sender)
        );
        
        emit FundsRequested(localEid, token, amount);
    }
    
    /**
     * @notice Report balance back to hub chain
     * @param token Token address
     */
    function reportBalance(address token) external payable whenNotPaused {
        require(!isHub, "Hub doesn't report to itself");
        
        uint256 balance = token == address(0) 
            ? address(this).balance 
            : IERC20(token).balanceOf(address(this));
        
        bytes memory payload = abi.encode(MSG_REPORT_BALANCE, token, balance);
        bytes memory options = "";
        MessagingFee memory fee = MessagingFee(msg.value, 0);
        
        _lzSend(
            hubChainEid,
            payload,
            options,
            fee,
            payable(msg.sender)
        );
    }
    
    /**
     * @notice Withdraw funds on destination chain
     * @param token Token address
     * @param amount Amount to withdraw
     * @param recipient Recipient address
     */
    function withdraw(
        address token,
        uint256 amount,
        address recipient
    ) external onlyGovernance nonReentrant {
        require(tokenBalances[token] >= totalReserved[token] + amount, "Insufficient balance");
        
        tokenBalances[token] -= amount;
        
        if (token == address(0)) {
            (bool success, ) = recipient.call{value: amount}("");
            require(success, "Native transfer failed");
        } else {
            IERC20(token).safeTransfer(recipient, amount);
        }
    }
    
    // ============ LayerZero Receive Function ============
    
    function _lzReceive(
        Origin calldata _origin,
        bytes32 /*_guid*/,
        bytes calldata _payload,
        address /*_executor*/,
        bytes calldata /*_extraData*/
    ) internal override {
        uint16 msgType = abi.decode(_payload, (uint16));
        uint32 srcEid = _origin.srcEid;
        
        emit MessageReceived(srcEid, msgType, _payload);
        
        if (msgType == MSG_TRANSFER_FUNDS) {
            _handleTransferFunds(srcEid, _payload);
        } else if (msgType == MSG_REPORT_BALANCE) {
            _handleReportBalance(srcEid, _payload);
        } else if (msgType == MSG_ALLOCATE_BUDGET) {
            _handleAllocateBudget(_payload);
        } else if (msgType == MSG_REQUEST_FUNDS) {
            _handleRequestFunds(srcEid, _payload);
        }
    }
    
    // ============ Internal Handlers ============
    
    function _handleTransferFunds(uint32 _srcEid, bytes calldata _payload) internal {
        (, address token, uint256 amount, ) = abi.decode(_payload, (uint16, address, uint256, address));
        emit TransferMessageReceived(_srcEid, token, amount);
    }
    
    function _handleReportBalance(uint32 _srcEid, bytes calldata _payload) internal {
        require(isHub, "Only hub receives balance reports");
        (, address token, uint256 balance) = abi.decode(_payload, (uint16, address, uint256));
        emit BalanceReported(_srcEid, token, balance);
    }
    
    function _handleAllocateBudget(bytes calldata _payload) internal {
        (, address token, uint256 amount) = abi.decode(_payload, (uint16, address, uint256));
        budgetAllocations[localEid][token] = amount;
    }
    
    function _handleRequestFunds(uint32 _srcEid, bytes calldata _payload) internal {
        require(isHub, "Only hub receives fund requests");
        (, address token, uint256 amount) = abi.decode(_payload, (uint16, address, uint256));
        emit FundsRequested(_srcEid, token, amount);
    }
    
    // ============ LayerZero V2 Admin Functions ============
    
    /**
     * @notice Set peer for cross-chain communication
     */
    function setPeer(uint32 _eid, bytes32 _peer) public override onlyOwner {
        super.setPeer(_eid, _peer);
    }
    
    /**
     * @notice Estimate LayerZero fees
     */
    function quote(
        uint32 _dstEid,
        bytes calldata _message,
        bytes calldata _options,
        bool _payInLzToken
    ) external view returns (MessagingFee memory fee) {
        return _quote(_dstEid, _message, _options, _payInLzToken);
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Updates the governance executor address.
     * @param _governance New governance address.
     */
    function setGovernance(address _governance) external onlyOwner {
        emit GovernanceUpdated(governance, _governance);
        governance = _governance;
    }
    
    /**
     * @notice Updates the treasury manager.
     * @param _manager New treasury manager address.
     */
    function setTreasuryManager(address _manager) external onlyGovernance {
        emit TreasuryManagerUpdated(treasuryManager, _manager);
        treasuryManager = _manager;
    }

    /**
     * @notice Sets the liquidity manager module.
     * @param _manager Liquidity manager contract address.
     */
    function setLiquidityManager(address _manager) external onlyGovernance {
        emit LiquidityManagerUpdated(liquidityManager, _manager);
        liquidityManager = _manager;
    }

    /**
     * @notice Sets the insurance fund module.
     * @param _fund Insurance fund contract address.
     */
    function setInsuranceFund(address _fund) external onlyGovernance {
        emit InsuranceFundUpdated(insuranceFund, _fund);
        insuranceFund = _fund;
    }

    /**
     * @notice Sets the stabilizer module.
     * @param _stabilizer Stabilizer contract address.
     */
    function setStabilizer(address _stabilizer) external onlyGovernance {
        emit StabilizerUpdated(stabilizer, _stabilizer);
        stabilizer = _stabilizer;
    }

    /**
     * @notice Sets the revenue router module.
     * @param _router Revenue router contract address.
     */
    function setRevenueRouter(address _router) external onlyGovernance {
        emit RevenueRouterUpdated(revenueRouter, _router);
        revenueRouter = _router;
    }

    // ============ Module Action Wrappers ============

    /**
     * @notice Funds liquidity via the configured liquidity manager.
     * @param eid Destination chain EID.
     * @param pool Pool address to fund.
     * @param amount Amount of funds to allocate.
     */
    function fundLiquidity(uint32 eid, address pool, uint256 amount) external onlyGovernance {
        require(liquidityManager != address(0), "Liquidity manager not set");
        IONBTLiquidityManager(liquidityManager).fundLiquidity(eid, pool, amount);
    }

    /**
     * @notice Withdraws liquidity via the configured liquidity manager.
     * @param eid Destination chain EID.
     * @param pool Pool address to withdraw from.
     * @param amount Amount to withdraw.
     */
    function withdrawLiquidity(uint32 eid, address pool, uint256 amount) external onlyGovernance {
        require(liquidityManager != address(0), "Liquidity manager not set");
        IONBTLiquidityManager(liquidityManager).withdrawLiquidity(eid, pool, amount);
    }

    /**
     * @notice Funds the insurance reserve module.
     * @param amount Amount to fund.
     */
    function fundInsuranceReserve(uint256 amount) external onlyGovernance {
        require(insuranceFund != address(0), "Insurance fund not set");
        IONBTInsuranceFund(insuranceFund).fundReserve(amount);
    }

    /**
     * @notice Requests an insurance payout.
     * @param to Recipient address.
     * @param amount Payout amount.
     * @param incidentId Incident identifier.
     */
    function requestInsurancePayout(address to, uint256 amount, bytes32 incidentId) external onlyGovernance {
        require(insuranceFund != address(0), "Insurance fund not set");
        IONBTInsuranceFund(insuranceFund).requestPayout(to, amount, incidentId);
    }

    /**
     * @notice Approves a pending insurance payout.
     * @param incidentId Incident identifier.
     */
    function approveInsurancePayout(bytes32 incidentId) external onlyGovernance {
        require(insuranceFund != address(0), "Insurance fund not set");
        IONBTInsuranceFund(insuranceFund).approvePayout(incidentId);
    }

    /**
     * @notice Executes a buyback strategy.
     * @param amountIn Input amount.
     * @param minOut Minimum expected output.
     */
    function executeBuyback(uint256 amountIn, uint256 minOut) external onlyGovernance {
        require(stabilizer != address(0), "Stabilizer not set");
        IONBTStabilizer(stabilizer).executeBuyback(amountIn, minOut);
    }

    /**
     * @notice Burns tokens acquired from buybacks.
     * @param amount Amount to burn.
     */
    function burnFromBuyback(uint256 amount) external onlyGovernance {
        require(stabilizer != address(0), "Stabilizer not set");
        IONBTStabilizer(stabilizer).burnFromBuyback(amount);
    }

    /**
     * @notice Updates stabilizer strategy.
     * @param strategyId Strategy identifier.
     */
    function setStabilizerStrategy(bytes32 strategyId) external onlyGovernance {
        require(stabilizer != address(0), "Stabilizer not set");
        IONBTStabilizer(stabilizer).setStrategy(strategyId);
    }

    /**
     * @notice Routes collected revenue through configured router.
     * @param token Revenue token address.
     * @param amount Amount to route.
     */
    function routeRevenue(address token, uint256 amount) external onlyGovernance {
        require(revenueRouter != address(0), "Revenue router not set");
        IONBTRevenueRouter(revenueRouter).routeFees(token, amount);
    }

    /**
     * @notice Updates revenue split configuration.
     * @param toVault Allocation to vault.
     * @param toRewards Allocation to rewards.
     * @param toInsurance Allocation to insurance.
     */
    function setRevenueSplits(uint256 toVault, uint256 toRewards, uint256 toInsurance) external onlyGovernance {
        require(revenueRouter != address(0), "Revenue router not set");
        IONBTRevenueRouter(revenueRouter).setSplits(toVault, toRewards, toInsurance);
    }
    
    /**
     * @notice Adds or removes a token from the whitelist.
     * @param token Token address.
     * @param whitelisted Whether token is whitelisted.
     */
    function whitelistToken(address token, bool whitelisted) external onlyGovernance {
        whitelistedTokens[token] = whitelisted;
        emit TokenWhitelisted(token, whitelisted);
    }

    /**
     * @notice Releases reserved funds after cross-chain settlement.
     * @param destinationEid Destination chain EID.
     * @param token Token address.
     * @param amount Amount to release.
     */
    function releaseReserved(
        uint32 destinationEid,
        address token,
        uint256 amount
    ) external onlyGovernance {
        require(reservedForChain[destinationEid][token] >= amount, "Insufficient reserved");
        reservedForChain[destinationEid][token] -= amount;
        totalReserved[token] -= amount;
    }
    
    /**
     * @notice Pauses vault operations.
     */
    function pause() external onlyGovernance {
        _pause();
    }
    
    /**
     * @notice Unpauses vault operations.
     */
    function unpause() external onlyGovernance {
        _unpause();
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Returns tracked token balance for the vault.
     * @param token Token address.
     * @return Current tracked balance.
     */
    function getBalance(address token) external view returns (uint256) {
        return tokenBalances[token];
    }
    
    /**
     * @notice Returns budget allocation for a chain and token.
     * @param eid Chain EID.
     * @param token Token address.
     * @return Allocated amount.
     */
    function getBudgetAllocation(uint32 eid, address token) external view returns (uint256) {
        return budgetAllocations[eid][token];
    }
    
    /**
     * @notice Returns spent amount for a chain and token.
     * @param eid Chain EID.
     * @param token Token address.
     * @return Spent amount.
     */
    function getSpentAmount(uint32 eid, address token) external view returns (uint256) {
        return spentAmounts[eid][token];
    }
    
    /**
     * @notice Returns remaining budget for a chain and token.
     * @param eid Chain EID.
     * @param token Token address.
     * @return Remaining budget.
     */
    function getRemainingBudget(uint32 eid, address token) external view returns (uint256) {
        uint256 allocated = budgetAllocations[eid][token];
        uint256 spent = spentAmounts[eid][token];
        return allocated > spent ? allocated - spent : 0;
    }

    /**
     * @notice Returns spendable balance excluding reserved funds.
     * @param token Token address.
     * @return Available balance.
     */
    function getAvailableBalance(address token) external view returns (uint256) {
        uint256 reserved = totalReserved[token];
        uint256 balance = tokenBalances[token];
        return balance > reserved ? balance - reserved : 0;
    }
    
    // ============ Receive Native Token ============
    
    receive() external payable {
        tokenBalances[address(0)] += msg.value;
        emit FundsDeposited(address(0), msg.value, msg.sender);
    }
}

