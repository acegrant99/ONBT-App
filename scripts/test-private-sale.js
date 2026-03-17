const hre = require('hardhat');
const { ethers } = hre;

const isV6 = typeof ethers.parseUnits === 'function';
const ZERO_ADDRESS = isV6 ? ethers.ZeroAddress : ethers.constants.AddressZero;
const parseUnits = (value, decimals) => (isV6 ? ethers.parseUnits(value, decimals) : ethers.utils.parseUnits(value, decimals));
const parseEther = (value) => (isV6 ? ethers.parseEther(value) : ethers.utils.parseEther(value));
const formatUnits = (value, decimals) => (isV6 ? ethers.formatUnits(value, decimals) : ethers.utils.formatUnits(value, decimals));
const formatEther = (value) => (isV6 ? ethers.formatEther(value) : ethers.utils.formatEther(value));
const zeroValue = () => (isV6 ? 0n : ethers.BigNumber.from(0));
const toNumber = (value) => {
  if (typeof value === 'bigint') return Number(value);
  if (value && typeof value.toString === 'function') return Number(value.toString());
  return Number(value);
};
const gte = (left, right) => (isV6 ? left >= right : left.gte(right));

async function main() {
  const [signer] = await ethers.getSigners();
  const saleAddress = '0xEA52c0c5Cb4962490d1132d9c255aa044296576e';
  const onbtAddress = '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5';
  const usdcAddress = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

  const saleAbi = [
    'function quotePurchase(address paymentToken, uint256 amountIn) view returns (uint256 amountOut)',
    'function owner() view returns (address)',
    'function saleStart() view returns (uint256)',
    'function saleEnd() view returns (uint256)',
    'function onbtToken() view returns (address)',
    'function remainingTokens() view returns (uint256)',
    'function tokenRateWad(address) view returns (uint256)',
    'function paymentTokenEnabled(address) view returns (bool)',
    'function purchase(address paymentToken, uint256 amountIn, uint256 minOut)',
  ];

  const tokenAbi = [
    'function balanceOf(address) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function transfer(address to, uint256 amount) returns (bool)',
    'function decimals() view returns (uint8)',
  ];

  const sale = new ethers.Contract(saleAddress, saleAbi, signer);
  const onbt = new ethers.Contract(onbtAddress, tokenAbi, signer);
  const usdc = new ethers.Contract(usdcAddress, tokenAbi, signer);

  console.log('\n========== PRIVATE SALE CONTRACT STATE ==========\n');

  const owner = await sale.owner();
  console.log('Owner:', owner);
  
  const saleStart = await sale.saleStart();
  const saleEnd = await sale.saleEnd();
  const now = Math.floor(Date.now() / 1000);
  const saleStartTs = toNumber(saleStart);
  const saleEndTs = toNumber(saleEnd);
  console.log('Sale Active:', now >= saleStartTs && now <= saleEndTs ? '✓ YES' : '✗ NO');
  console.log('Sale Start:', new Date(saleStartTs * 1000).toISOString());
  console.log('Sale End:', new Date(saleEndTs * 1000).toISOString());

  const storedOnbt = await sale.onbtToken();
  console.log('ONBT Token:', storedOnbt);
  console.log('ONBT Correct:', storedOnbt.toLowerCase() === onbtAddress.toLowerCase() ? '✓ YES' : '✗ NO');

  const remaining = await sale.remainingTokens();
  console.log('Remaining Inventory:', formatUnits(remaining, 18), 'ONBT');

  // Check payment tokens (ETH, USDC, USDT from hardcoded Base addresses)
  const usdtAddress = '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2';
  const paymentTokens = [
    { name: 'ETH', address: ZERO_ADDRESS },
    { name: 'USDC', address: usdcAddress },
    { name: 'USDT', address: usdtAddress }
  ];

  console.log('Payment Tokens Enabled:');
  for (const token of paymentTokens) {
    const enabled = await sale.paymentTokenEnabled(token.address);
    const rate = enabled ? await sale.tokenRateWad(token.address) : zeroValue();
    console.log(`  - ${token.name} (${token.address}): ${enabled ? '✓ Enabled' : '✗ Disabled'} | Rate: ${formatUnits(rate, 18)}`);
  }

  console.log('\n========== PRICING VALIDATION ($0.10 per ONBT) ==========\n');

  // Test ETH pricing: 1 ETH at ~$3000/ETH should give ~30,000 ONBT
  // Adjust based on actual rate
  const ethTestAmount = parseEther('0.01'); // 0.01 ETH for smaller test
  try {
    const ethQuote = await sale.quotePurchase(ZERO_ADDRESS, ethTestAmount);
    const ethOnbtAmount = formatUnits(ethQuote, 18);
    const ethPrice = Number(formatEther(ethTestAmount)) / Number(formatUnits(ethQuote, 18));
    console.log('ETH Test (0.01 ETH):');
    console.log('  Output ONBT:', ethOnbtAmount);
    console.log('  Price per ONBT (ETH):', ethPrice.toFixed(18));
  } catch (e) {
    console.log('ETH Quote Error:', e.message);
  }

  // Test USDC pricing: 10 USDC should give 100 ONBT (10 USDC / $0.10 per ONBT)
  const usdcTestAmount = parseUnits('10', 6); // 10 USDC (6 decimals)
  try {
    const usdcQuote = await sale.quotePurchase(usdcAddress, usdcTestAmount);
    const usdcOnbtAmount = formatUnits(usdcQuote, 18);
    console.log('\nUSDC Test (10 USDC):');
    console.log('  Output ONBT:', usdcOnbtAmount);
    console.log('  Expected: 100 ONBT (@ $0.10 per ONBT)');
    console.log('  Match:', Math.abs(parseFloat(usdcOnbtAmount) - 100) < 0.01 ? '✓ PASS' : '✗ FAIL');
  } catch (e) {
    console.log('USDC Quote Error:', e.message);
  }

  console.log('\n========== SIGNER BALANCE CHECK ==========\n');

  const signerEthBalance = await ethers.provider.getBalance(signer.address);
  const signerOnbtBalance = await onbt.balanceOf(signer.address);
  const signerUsdcBalance = await usdc.balanceOf(signer.address);

  console.log('Signer Address:', signer.address);
  console.log('ETH Balance:', formatEther(signerEthBalance));
  console.log('ONBT Balance:', formatUnits(signerOnbtBalance, 18));
  console.log('USDC Balance:', formatUnits(signerUsdcBalance, 6));

  console.log('\n========== SIMULATED PURCHASE TEST ==========\n');

  // Test USDC purchase only (safest for simulation)
  try {
    console.log('Testing USDC purchase simulation...');
    const purchaseAmount = parseUnits('100', 6); // 100 USDC
    const expectedOnbt = await sale.quotePurchase(usdcAddress, purchaseAmount);
    const expectedOnbtAmount = formatUnits(expectedOnbt, 18);

    console.log('Purchase Amount: 100 USDC');
    console.log('Expected ONBT: ' + expectedOnbtAmount);
    console.log('Min Output (slippage 1%): ' + (parseFloat(expectedOnbtAmount) * 0.99).toFixed(0));

    // Check if signer has enough USDC
    if (gte(signerUsdcBalance, purchaseAmount)) {
      console.log('✓ Signer has sufficient USDC for test purchase');
      console.log('\nTo execute actual purchase, run:');
      console.log(`  npx hardhat run scripts/execute-purchase.js --network base`);
    } else {
      console.log('✗ Signer USDC balance insufficient for test purchase');
      console.log('   Need:', formatUnits(purchaseAmount, 6), 'USDC');
      console.log('   Have:', formatUnits(signerUsdcBalance, 6), 'USDC');
    }
  } catch (e) {
    console.log('Purchase Simulation Error:', e.message);
  }

  console.log('\n========== TEST COMPLETE ==========\n');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
