// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

/**
 * @title SimpleTimelock
 * @dev Simple timelock for admin actions with transparency
 * 
 * Usage:
 * 1. Admin queues transaction with queueTransaction()
 * 2. Wait for delay period (default 48 hours)
 * 3. Anyone can execute with executeTransaction()
 * 4. Community can see pending actions on-chain
 */
contract SimpleTimelock {
    
    uint256 public constant MINIMUM_DELAY = 1 hours;
    uint256 public constant MAXIMUM_DELAY = 30 days;
    
    address public admin;
    uint256 public delay;
    
    mapping(bytes32 => bool) public queuedTransactions;
    mapping(bytes32 => uint256) public transactionTimestamps;
    
    event TransactionQueued(
        bytes32 indexed txHash,
        address indexed target,
        uint256 value,
        bytes data,
        uint256 eta
    );
    
    event TransactionExecuted(
        bytes32 indexed txHash,
        address indexed target,
        uint256 value,
        bytes data
    );
    
    event TransactionCanceled(bytes32 indexed txHash);
    event DelayUpdated(uint256 oldDelay, uint256 newDelay);
    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }
    
    constructor(address _admin, uint256 _delay) {
        require(_delay >= MINIMUM_DELAY, "Delay too short");
        require(_delay <= MAXIMUM_DELAY, "Delay too long");
        require(_admin != address(0), "Invalid admin");
        
        admin = _admin;
        delay = _delay;
    }
    
    /**
     * @notice Queue a transaction for execution after delay
     */
    function queueTransaction(
        address target,
        uint256 value,
        bytes memory data
    ) public onlyAdmin returns (bytes32) {
        uint256 eta = block.timestamp + delay;
        bytes32 txHash = keccak256(abi.encode(target, value, data, eta));
        
        require(!queuedTransactions[txHash], "Already queued");
        
        queuedTransactions[txHash] = true;
        transactionTimestamps[txHash] = eta;
        
        emit TransactionQueued(txHash, target, value, data, eta);
        return txHash;
    }
    
    /**
     * @notice Execute a queued transaction (anyone can call after delay)
     */
    function executeTransaction(
        address target,
        uint256 value,
        bytes memory data,
        uint256 eta
    ) public payable returns (bytes memory) {
        bytes32 txHash = keccak256(abi.encode(target, value, data, eta));
        
        require(queuedTransactions[txHash], "Not queued");
        require(block.timestamp >= eta, "Timelock active");
        require(block.timestamp <= eta + 7 days, "Stale transaction");
        
        queuedTransactions[txHash] = false;
        delete transactionTimestamps[txHash];
        
        (bool success, bytes memory returnData) = target.call{value: value}(data);
        require(success, "Execution failed");
        
        emit TransactionExecuted(txHash, target, value, data);
        return returnData;
    }
    
    /**
     * @notice Cancel a queued transaction
     */
    function cancelTransaction(
        address target,
        uint256 value,
        bytes memory data,
        uint256 eta
    ) public onlyAdmin {
        bytes32 txHash = keccak256(abi.encode(target, value, data, eta));
        require(queuedTransactions[txHash], "Not queued");
        
        queuedTransactions[txHash] = false;
        delete transactionTimestamps[txHash];
        
        emit TransactionCanceled(txHash);
    }
    
    /**
     * @notice Update delay (requires timelock itself)
     */
    function setDelay(uint256 newDelay) external {
        require(msg.sender == address(this), "Must go through timelock");
        require(newDelay >= MINIMUM_DELAY, "Delay too short");
        require(newDelay <= MAXIMUM_DELAY, "Delay too long");
        
        uint256 oldDelay = delay;
        delay = newDelay;
        
        emit DelayUpdated(oldDelay, newDelay);
    }
    
    /**
     * @notice Change admin (requires timelock itself)
     */
    function changeAdmin(address newAdmin) external {
        require(msg.sender == address(this), "Must go through timelock");
        require(newAdmin != address(0), "Invalid admin");
        
        address oldAdmin = admin;
        admin = newAdmin;
        
        emit AdminChanged(oldAdmin, newAdmin);
    }
    
    /**
     * @notice Get transaction hash
     */
    function getTransactionHash(
        address target,
        uint256 value,
        bytes memory data,
        uint256 eta
    ) public pure returns (bytes32) {
        return keccak256(abi.encode(target, value, data, eta));
    }
    
    receive() external payable {}
}
