// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Context } from "@openzeppelin/contracts/utils/Context.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IERC20Metadata } from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { ContextUpgradeable } from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { PausableUpgradeable } from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

contract ONBTPrivateSaleOApp is OApp, Initializable, UUPSUpgradeable, ReentrancyGuard, PausableUpgradeable {
    using SafeERC20 for IERC20;

    IERC20 public immutable onbtToken;
    uint256 public immutable saleAllocation;
    uint256 public totalSold;

    uint256 public saleStart;
    uint256 public saleEnd;

    address public fundsRecipient;

    mapping(address => bool) public paymentTokenEnabled;
    mapping(address => uint256) public tokenRateWad;

    mapping(address => uint256) public purchased;

    event SaleWindowUpdated(uint256 start, uint256 end);
    event FundsRecipientUpdated(address indexed oldRecipient, address indexed newRecipient);
    event PaymentTokenUpdated(address indexed token, bool enabled, uint256 rateWad);
    event TokensPurchased(
        address indexed buyer,
        address indexed recipient,
        address indexed paymentToken,
        uint256 amountIn,
        uint256 onbtOut
    );
    event UnsoldWithdrawn(address indexed to, uint256 amount);
    event PaymentWithdrawn(address indexed token, address indexed to, uint256 amount);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor(
        address _lzEndpoint,
        address _onbtToken,
        uint256 _saleAllocation
    ) OApp(_lzEndpoint, msg.sender) Ownable() {
        require(_lzEndpoint != address(0), "Invalid endpoint");
        require(_onbtToken != address(0), "Invalid ONBT token");
        require(_saleAllocation > 0, "Invalid sale allocation");
        onbtToken = IERC20(_onbtToken);
        saleAllocation = _saleAllocation;

        _disableInitializers();
    }

    function initialize(
        address _owner,
        address _fundsRecipient,
        uint256 _saleStart,
        uint256 _saleEnd,
        address[] calldata _paymentTokens,
        uint256[] calldata _rateWads
    ) external initializer {
        require(_owner != address(0), "Invalid owner");
        require(_fundsRecipient != address(0), "Invalid funds recipient");
        require(_saleStart < _saleEnd, "Invalid sale window");
        require(_paymentTokens.length == _rateWads.length, "Token/rate length mismatch");

        __UUPSUpgradeable_init();
        __Pausable_init();

        _transferOwnership(_owner);
        endpoint.setDelegate(_owner);

        fundsRecipient = _fundsRecipient;
        saleStart = _saleStart;
        saleEnd = _saleEnd;

        for (uint256 index = 0; index < _paymentTokens.length; index++) {
            _setPaymentToken(_paymentTokens[index], true, _rateWads[index]);
        }
    }

    function remainingTokens() external view returns (uint256) {
        uint256 unsold = saleAllocation > totalSold ? saleAllocation - totalSold : 0;
        uint256 balance = onbtToken.balanceOf(address(this));
        return balance < unsold ? balance : unsold;
    }

    function quotePurchase(address paymentToken, uint256 amountIn) public view returns (uint256 onbtOut) {
        if (amountIn == 0 || !paymentTokenEnabled[paymentToken]) {
            return 0;
        }

        uint256 rateWad = tokenRateWad[paymentToken];
        if (rateWad == 0) {
            return 0;
        }

        uint256 normalizedIn = paymentToken == address(0)
            ? amountIn
            : _normalizeTo18(paymentToken, amountIn);

        onbtOut = (normalizedIn * rateWad) / 1e18;

        uint256 unsold = saleAllocation > totalSold ? saleAllocation - totalSold : 0;
        uint256 balance = onbtToken.balanceOf(address(this));
        uint256 available = balance < unsold ? balance : unsold;
        if (onbtOut > available) {
            onbtOut = available;
        }
    }

    function buyWithETH(address recipient) external payable nonReentrant whenNotPaused {
        require(paymentTokenEnabled[address(0)], "ETH payment disabled");
        _assertSaleActive();

        uint256 amountIn = msg.value;
        require(amountIn > 0, "Zero ETH amount");

        uint256 onbtOut = quotePurchase(address(0), amountIn);
        require(onbtOut > 0, "Zero ONBT output");

        address resolvedRecipient = recipient == address(0) ? msg.sender : recipient;

        totalSold += onbtOut;
        purchased[resolvedRecipient] += onbtOut;
        onbtToken.safeTransfer(resolvedRecipient, onbtOut);

        (bool sent, ) = fundsRecipient.call{ value: amountIn }("");
        require(sent, "ETH transfer failed");

        emit TokensPurchased(msg.sender, resolvedRecipient, address(0), amountIn, onbtOut);
    }

    function buyWithToken(address paymentToken, uint256 amountIn, address recipient) external nonReentrant whenNotPaused {
        require(paymentToken != address(0), "Use buyWithETH");
        require(paymentTokenEnabled[paymentToken], "Payment token disabled");
        _assertSaleActive();
        require(amountIn > 0, "Zero token amount");

        uint256 onbtOut = quotePurchase(paymentToken, amountIn);
        require(onbtOut > 0, "Zero ONBT output");

        address resolvedRecipient = recipient == address(0) ? msg.sender : recipient;

        IERC20(paymentToken).safeTransferFrom(msg.sender, fundsRecipient, amountIn);

        totalSold += onbtOut;
        purchased[resolvedRecipient] += onbtOut;
        onbtToken.safeTransfer(resolvedRecipient, onbtOut);

        emit TokensPurchased(msg.sender, resolvedRecipient, paymentToken, amountIn, onbtOut);
    }

    function setSaleWindow(uint256 _saleStart, uint256 _saleEnd) external onlyOwner {
        require(_saleStart < _saleEnd, "Invalid sale window");
        saleStart = _saleStart;
        saleEnd = _saleEnd;
        emit SaleWindowUpdated(_saleStart, _saleEnd);
    }

    function setFundsRecipient(address _fundsRecipient) external onlyOwner {
        require(_fundsRecipient != address(0), "Invalid funds recipient");
        address oldRecipient = fundsRecipient;
        fundsRecipient = _fundsRecipient;
        emit FundsRecipientUpdated(oldRecipient, _fundsRecipient);
    }

    function setPaymentToken(address token, bool enabled, uint256 rateWad) external onlyOwner {
        _setPaymentToken(token, enabled, rateWad);
    }

    function setPaymentTokensBatch(
        address[] calldata tokens,
        bool[] calldata enabledFlags,
        uint256[] calldata rateWads
    ) external onlyOwner {
        require(tokens.length == enabledFlags.length && tokens.length == rateWads.length, "Batch length mismatch");
        for (uint256 index = 0; index < tokens.length; index++) {
            _setPaymentToken(tokens[index], enabledFlags[index], rateWads[index]);
        }
    }

    function withdrawUnsoldONBT(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid recipient");
        onbtToken.safeTransfer(to, amount);
        emit UnsoldWithdrawn(to, amount);
    }

    function withdrawPaymentToken(address token, address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid recipient");
        require(token != address(0), "Token must be ERC20");
        IERC20(token).safeTransfer(to, amount);
        emit PaymentWithdrawn(token, to, amount);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function setPeer(uint32 _eid, bytes32 _peer) public override onlyOwner {
        super.setPeer(_eid, _peer);
    }

    function _setPaymentToken(address token, bool enabled, uint256 rateWad) internal {
        require(enabled ? rateWad > 0 : true, "Rate required when enabled");
        paymentTokenEnabled[token] = enabled;
        tokenRateWad[token] = rateWad;
        emit PaymentTokenUpdated(token, enabled, rateWad);
    }

    function _normalizeTo18(address token, uint256 amount) internal view returns (uint256) {
        uint8 decimals = IERC20Metadata(token).decimals();
        require(decimals <= 18, "Unsupported token decimals");

        if (decimals == 18) {
            return amount;
        }

        return amount * (10 ** (18 - decimals));
    }

    function _assertSaleActive() internal view {
        require(block.timestamp >= saleStart, "Sale not started");
        require(block.timestamp <= saleEnd, "Sale ended");
    }

    function _lzReceive(
        Origin calldata,
        bytes32,
        bytes calldata,
        address,
        bytes calldata
    ) internal override {}

    function _msgSender() internal view override(Context, ContextUpgradeable) returns (address) {
        return Context._msgSender();
    }

    function _msgData() internal view override(Context, ContextUpgradeable) returns (bytes calldata) {
        return Context._msgData();
    }

    function _contextSuffixLength() internal view override(Context, ContextUpgradeable) returns (uint256) {
        return Context._contextSuffixLength();
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}

