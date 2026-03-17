const hre = require('hardhat');
const { ethers } = hre;

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
    throw new Error(`Unsupported network: ${network}`);
  }

  const allowNonDefault = process.env.ALLOW_NON_DEFAULT_SALE === '1';
  let saleAddress = process.env.PRIVATE_SALE_ADDRESS || defaults[network].saleAddress;
  if (saleAddress.toLowerCase() !== defaults[network].saleAddress.toLowerCase() && !allowNonDefault) {
    console.warn(
      `[enable-private-sale-payments] Ignoring PRIVATE_SALE_ADDRESS=${saleAddress} for network=${network}; using default ${defaults[network].saleAddress}. Set ALLOW_NON_DEFAULT_SALE=1 to override.`
    );
    saleAddress = defaults[network].saleAddress;
  }

  const tokenConfig = {
    base: {
      usdc: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      usdt: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
    },
    arbitrum: {
      usdc: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
      usdt: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    },
  };

  const tokens = tokenConfig[network];

  const rateWad = process.env.PRIVATE_SALE_STABLE_RATE_WAD || '10000000000000000000'; // $0.10 => 10 ONBT per $1

  const saleAbi = [
    'function setPaymentToken(address token, bool enabled, uint256 rateWad) external',
  ];

  const sale = new ethers.Contract(saleAddress, saleAbi, signer);

  console.log(`\nConfiguring payment tokens on ${network.toUpperCase()}`);
  console.log(`Sale: ${saleAddress}`);
  console.log(`USDC: ${tokens.usdc}`);
  console.log(`USDT: ${tokens.usdt}`);
  console.log(`Rate WAD: ${rateWad}`);

  const usdcTx = await sale.setPaymentToken(tokens.usdc, true, rateWad);
  console.log(`USDC tx: ${usdcTx.hash}`);
  await usdcTx.wait();

  const usdtTx = await sale.setPaymentToken(tokens.usdt, true, rateWad);
  console.log(`USDT tx: ${usdtTx.hash}`);
  await usdtTx.wait();

  console.log('\n✅ USDC/USDT enabled successfully');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
