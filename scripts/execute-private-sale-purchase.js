const hre = require('hardhat');
const { ethers } = hre;

const isV6 = typeof ethers.parseUnits === 'function';
const ZERO_ADDRESS = isV6 ? ethers.ZeroAddress : ethers.constants.AddressZero;
const parseUnits = (value, decimals) => (isV6 ? ethers.parseUnits(value, decimals) : ethers.utils.parseUnits(value, decimals));
const formatUnits = (value, decimals) => (isV6 ? ethers.formatUnits(value, decimals) : ethers.utils.formatUnits(value, decimals));
const bnFrom = (value) => (isV6 ? BigInt(value) : ethers.BigNumber.from(value));
const toNumber = (value) => {
  if (typeof value === 'bigint') return Number(value);
  if (value && typeof value.toString === 'function') return Number(value.toString());
  return Number(value);
};
const lt = (left, right) => (isV6 ? left < right : left.lt(right));
const mulDivByPercent = (amount, percentage) => {
  if (isV6) {
    return (amount * BigInt(percentage)) / 100n;
  }
  return amount.mul(ethers.BigNumber.from(percentage)).div(ethers.BigNumber.from(100));
};

async function main() {
  const [signer] = await ethers.getSigners();
  const network = hre.network.name;

  const defaults = {
    base: {
      saleAddress: '0xEA52c0c5Cb4962490d1132d9c255aa044296576e',
    },
    arbitrum: {
      saleAddress: '0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE',
    },
  };

  if (!defaults[network]) {
    throw new Error(`Unsupported network: ${network}. Only base and arbitrum supported.`);
  }

  const allowNonDefault = process.env.ALLOW_NON_DEFAULT_SALE === '1';

  // Configuration
  let SALE_ADDRESS = process.env.PRIVATE_SALE_ADDRESS || defaults[network].saleAddress;
  if (SALE_ADDRESS.toLowerCase() !== defaults[network].saleAddress.toLowerCase() && !allowNonDefault) {
    console.warn(
      `[execute-private-sale-purchase] Ignoring PRIVATE_SALE_ADDRESS=${SALE_ADDRESS} for network=${network}; using default ${defaults[network].saleAddress}. Set ALLOW_NON_DEFAULT_SALE=1 to override.`
    );
    SALE_ADDRESS = defaults[network].saleAddress;
  }
  const PAYMENT_TOKEN = process.env.PAYMENT_TOKEN || 'ETH'; // ETH, USDC, or USDT
  const AMOUNT_IN = process.env.AMOUNT_IN; // Amount in payment token (e.g., "1" for 1 ETH or "100" for 100 USDC)
  const RECIPIENT = process.env.RECIPIENT || signer.address; // Optional recipient address
  const MIN_OUT_PERCENTAGE = process.env.MIN_OUT_PERCENTAGE || '95'; // 95% slippage protection

  if (!AMOUNT_IN) {
    throw new Error('AMOUNT_IN env var required (e.g., AMOUNT_IN=1 for 1 ETH or 100 for 100 USDC)');
  }

  // Token config by chain
  const tokenConfig = {
    base: {
      ETH: { address: ZERO_ADDRESS, decimals: 18 },
      USDC: { address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', decimals: 6 },
      USDT: { address: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2', decimals: 6 },
    },
    arbitrum: {
      ETH: { address: ZERO_ADDRESS, decimals: 18 },
      USDC: { address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', decimals: 6 },
      USDT: { address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', decimals: 6 },
    },
  };

  const tokens = tokenConfig[network];

  const tokenInfo = tokens[PAYMENT_TOKEN];
  if (!tokenInfo) {
    throw new Error(`Unsupported token: ${PAYMENT_TOKEN}. Choose ETH, USDC, or USDT.`);
  }

  const saleAbi = [
    'function quotePurchase(address paymentToken, uint256 amountIn) view returns (uint256 onbtOut)',
    'function buyWithETH(address recipient) payable',
    'function buyWithToken(address paymentToken, uint256 amountIn, address recipient)',
    'function saleStart() view returns (uint256)',
    'function saleEnd() view returns (uint256)',
    'function remainingTokens() view returns (uint256)',
  ];

  const tokenAbi = [
    'function decimals() view returns (uint8)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function balanceOf(address) view returns (uint256)',
  ];

  const sale = new ethers.Contract(SALE_ADDRESS, saleAbi, signer);
  
  console.log('\n🎯 ONBT Private Sale - Purchase Execution');
  console.log('='.repeat(60));
  console.log(`Network: ${network.toUpperCase()}`);
  console.log(`Sale Contract: ${SALE_ADDRESS}`);
  console.log(`Buyer: ${signer.address}`);
  console.log(`Recipient: ${RECIPIENT}`);
  console.log(`Payment Token: ${PAYMENT_TOKEN}`);
  console.log(`Amount In: ${AMOUNT_IN} ${PAYMENT_TOKEN}`);

  // Validate sale is active
  const saleStart = await sale.saleStart();
  const saleEnd = await sale.saleEnd();
  const now = Math.floor(Date.now() / 1000);
  const saleStartTs = toNumber(saleStart);
  const saleEndTs = toNumber(saleEnd);

  if (now < saleStartTs) {
    throw new Error(`Sale not started. Starts at ${new Date(saleStartTs * 1000).toISOString()}`);
  }
  if (now > saleEndTs) {
    throw new Error(`Sale ended. Ended at ${new Date(saleEndTs * 1000).toISOString()}`);
  }

  const remaining = await sale.remainingTokens();
  console.log(`\n📊 Sale Status:`);
  console.log(`  Active: ✓ YES`);
  console.log(`  Remaining ONBT: ${formatUnits(remaining, 18)}`);

  // Quote the purchase
  const amountInBigNumber = parseUnits(AMOUNT_IN, tokenInfo.decimals);
  const quotedOutput = await sale.quotePurchase(tokenInfo.address, amountInBigNumber);
  const onbtOut = formatUnits(quotedOutput, 18);
  const slippagePercent = Math.floor(parseFloat(MIN_OUT_PERCENTAGE));
  const minOutAmount = mulDivByPercent(quotedOutput, slippagePercent);

  console.log(`\n💱 Quote:`);
  console.log(`  Payment: ${AMOUNT_IN} ${PAYMENT_TOKEN}`);
  console.log(`  ONBT Output: ${onbtOut}`);
  console.log(`  Min Output (${MIN_OUT_PERCENTAGE}% slippage): ${formatUnits(minOutAmount, 18)}`);

  // Handle ETH vs Token purchases
  if (PAYMENT_TOKEN === 'ETH') {
    console.log(`\n🔐 Executing ETH Purchase...`);
    const tx = await sale.buyWithETH(RECIPIENT, { value: amountInBigNumber });
    console.log(`Transaction hash: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`\n✅ Purchase confirmed!`);
    console.log(`Block: ${receipt.blockNumber}`);
    console.log(`Gas used: ${receipt.gasUsed.toString()}`);
  } else {
    // Need to approve token first
    const token = new ethers.Contract(tokenInfo.address, tokenAbi, signer);
    
    // Check balance
    const balance = await token.balanceOf(signer.address);
    if (lt(balance, amountInBigNumber)) {
      throw new Error(
        `Insufficient ${PAYMENT_TOKEN} balance. Need ${AMOUNT_IN}, have ${formatUnits(balance, tokenInfo.decimals)}`
      );
    }

    // Approve
    console.log(`\n🔐 Approving ${PAYMENT_TOKEN} transfer...`);
    const approveTx = await token.approve(SALE_ADDRESS, amountInBigNumber);
    console.log(`Approval tx: ${approveTx.hash}`);
    await approveTx.wait();
    console.log(`✓ Approval confirmed`);

    // Purchase
    console.log(`\n🛒 Executing ${PAYMENT_TOKEN} Purchase...`);
    const tx = await sale.buyWithToken(tokenInfo.address, amountInBigNumber, RECIPIENT);
    console.log(`Transaction hash: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`\n✅ Purchase confirmed!`);
    console.log(`Block: ${receipt.blockNumber}`);
    console.log(`Gas used: ${receipt.gasUsed.toString()}`);
  }

  console.log(`\n📋 Purchase Summary:`);
  console.log(`  Paid: ${AMOUNT_IN} ${PAYMENT_TOKEN}`);
  console.log(`  Received: ${onbtOut} ONBT`);
  console.log(`  Price: $${(parseFloat(AMOUNT_IN) / parseFloat(onbtOut) * (PAYMENT_TOKEN === 'ETH' ? 1 : 1)).toFixed(6)} per ONBT`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
