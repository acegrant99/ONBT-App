const hre = require('hardhat');
const { ethers } = hre;

const toStringSafe = (value) => {
  if (typeof value === 'bigint') return value.toString();
  if (value && typeof value.toString === 'function') return value.toString();
  return String(value);
};

async function main() {
  const network = hre.network.name;
  const defaults = {
    base: '0xEA52c0c5Cb4962490d1132d9c255aa044296576e',
    arbitrum: '0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE',
  };

  if (!defaults[network]) throw new Error(`Unsupported network: ${network}`);

  const allowNonDefault = process.env.ALLOW_NON_DEFAULT_SALE === '1';
  const envSaleAddress = process.env.PRIVATE_SALE_ADDRESS;
  let saleAddress = envSaleAddress || defaults[network];

  if (
    envSaleAddress &&
    envSaleAddress.toLowerCase() !== defaults[network].toLowerCase() &&
    !allowNonDefault
  ) {
    console.warn(
      `[check-private-sale-payment-rails] Ignoring PRIVATE_SALE_ADDRESS=${envSaleAddress} for network=${network}; using default ${defaults[network]}. Set ALLOW_NON_DEFAULT_SALE=1 to override.`
    );
    saleAddress = defaults[network];
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
  if (!tokens) throw new Error(`Unsupported network: ${network}`);

  const abi = [
    'function paymentTokenEnabled(address) view returns (bool)',
    'function tokenRateWad(address) view returns (uint256)',
    'function remainingTokens() view returns (uint256)',
  ];

  const sale = new ethers.Contract(saleAddress, abi, ethers.provider);

  const [usdcEnabled, usdtEnabled, usdcRate, usdtRate, remaining] = await Promise.all([
    sale.paymentTokenEnabled(tokens.usdc),
    sale.paymentTokenEnabled(tokens.usdt),
    sale.tokenRateWad(tokens.usdc),
    sale.tokenRateWad(tokens.usdt),
    sale.remainingTokens(),
  ]);

  console.log(JSON.stringify({
    network,
    saleAddress,
    usdc: { address: tokens.usdc, enabled: usdcEnabled, rateWad: toStringSafe(usdcRate) },
    usdt: { address: tokens.usdt, enabled: usdtEnabled, rateWad: toStringSafe(usdtRate) },
    remainingTokens: toStringSafe(remaining),
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
