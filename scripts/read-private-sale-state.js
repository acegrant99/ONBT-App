const hre = require('hardhat');
const { ethers } = hre;

const isV6 = typeof ethers.parseUnits === 'function';
const ZERO_ADDRESS = isV6 ? ethers.ZeroAddress : ethers.constants.AddressZero;
const toStringSafe = (value) => {
  if (typeof value === 'bigint') return value.toString();
  if (value && typeof value.toString === 'function') return value.toString();
  return String(value);
};

async function main() {
  const network = hre.network.name;
  const defaults = {
    base: {
      saleAddress: '0xEA52c0c5Cb4962490d1132d9c255aa044296576e',
      usdc: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      usdt: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
    },
    arbitrum: {
      saleAddress: '0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE',
      usdc: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
      usdt: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    },
  };

  if (!defaults[network] && !process.env.PRIVATE_SALE_ADDRESS) {
    throw new Error(`Unsupported network: ${network}. Provide PRIVATE_SALE_ADDRESS env var.`);
  }

  const configuredDefaultSale = defaults[network]?.saleAddress;
  const envSaleAddress = process.env.PRIVATE_SALE_ADDRESS;
  const allowNonDefaultSale = process.env.ALLOW_NON_DEFAULT_SALE === '1';

  let saleAddress = envSaleAddress || configuredDefaultSale;
  if (
    envSaleAddress &&
    configuredDefaultSale &&
    envSaleAddress.toLowerCase() !== configuredDefaultSale.toLowerCase() &&
    !allowNonDefaultSale
  ) {
    console.warn(
      `[read-private-sale-state] Ignoring PRIVATE_SALE_ADDRESS=${envSaleAddress} for network=${network}; using default ${configuredDefaultSale}. Set ALLOW_NON_DEFAULT_SALE=1 to override.`
    );
    saleAddress = configuredDefaultSale;
  }

  const usdc = process.env.PRIVATE_SALE_USDC || defaults[network].usdc;
  const usdt = process.env.PRIVATE_SALE_USDT || defaults[network].usdt;

  const saleAbi = [
    'function saleStart() view returns (uint256)',
    'function saleEnd() view returns (uint256)',
    'function saleAllocation() view returns (uint256)',
    'function totalSold() view returns (uint256)',
    'function remainingTokens() view returns (uint256)',
    'function tokenRateWad(address) view returns (uint256)',
    'function paymentTokenEnabled(address) view returns (bool)',
    'function fundsRecipient() view returns (address)',
    'function onbtToken() view returns (address)'
  ];

  const erc20Abi = ['function balanceOf(address) view returns (uint256)'];

  const sale = new ethers.Contract(saleAddress, saleAbi, ethers.provider);
  const onbtToken = await sale.onbtToken();
  const token = new ethers.Contract(onbtToken, erc20Abi, ethers.provider);

  const [saleStart, saleEnd, saleAllocation, totalSold, remainingTokens, ethRateWad, usdcRateWad, usdtRateWad, ethEnabled, usdcEnabled, usdtEnabled, fundsRecipient, onbtBalance] = await Promise.all([
    sale.saleStart(),
    sale.saleEnd(),
    sale.saleAllocation(),
    sale.totalSold(),
    sale.remainingTokens(),
    sale.tokenRateWad(ZERO_ADDRESS),
    sale.tokenRateWad(usdc),
    sale.tokenRateWad(usdt),
    sale.paymentTokenEnabled(ZERO_ADDRESS),
    sale.paymentTokenEnabled(usdc),
    sale.paymentTokenEnabled(usdt),
    sale.fundsRecipient(),
    token.balanceOf(saleAddress)
  ]);

  console.log(JSON.stringify({
    network,
    saleAddress,
    onbtToken,
    fundsRecipient,
    saleStart: toStringSafe(saleStart),
    saleEnd: toStringSafe(saleEnd),
    saleAllocation: toStringSafe(saleAllocation),
    totalSold: toStringSafe(totalSold),
    remainingTokens: toStringSafe(remainingTokens),
    onbtBalanceInContract: toStringSafe(onbtBalance),
    rates: {
      ethRateWad: toStringSafe(ethRateWad),
      usdcRateWad: toStringSafe(usdcRateWad),
      usdtRateWad: toStringSafe(usdtRateWad)
    },
    paymentEnabled: {
      eth: ethEnabled,
      usdc: usdcEnabled,
      usdt: usdtEnabled
    }
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
