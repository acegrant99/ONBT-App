const hre = require('hardhat');
const { ethers } = hre;

const isV6 = typeof ethers.parseUnits === 'function';
const lt = (left, right) => (isV6 ? left < right : left.lt(right));

async function main() {
  const network = hre.network.name;
  const defaults = {
    base: {
      saleAddress: '0xEA52c0c5Cb4962490d1132d9c255aa044296576e',
      onbtAddress: '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5',
    },
    arbitrum: {
      saleAddress: '0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE',
      onbtAddress: '0x169aC761Ebb210B5A93B68B44DA394776a7B230C',
    },
  };

  if (!defaults[network]) {
    throw new Error(`Unsupported network: ${network}`);
  }

  const allowNonDefault = process.env.ALLOW_NON_DEFAULT_SALE === '1';
  let saleAddress = process.env.PRIVATE_SALE_ADDRESS || defaults[network].saleAddress;
  let onbtAddress = process.env.ONBT_TOKEN_ADDRESS || defaults[network].onbtAddress;

  if (saleAddress.toLowerCase() !== defaults[network].saleAddress.toLowerCase() && !allowNonDefault) {
    console.warn(
      `[fund-private-sale] Ignoring PRIVATE_SALE_ADDRESS=${saleAddress} for network=${network}; using default ${defaults[network].saleAddress}. Set ALLOW_NON_DEFAULT_SALE=1 to override.`
    );
    saleAddress = defaults[network].saleAddress;
  }

  if (onbtAddress.toLowerCase() !== defaults[network].onbtAddress.toLowerCase() && !allowNonDefault) {
    console.warn(
      `[fund-private-sale] Ignoring ONBT_TOKEN_ADDRESS=${onbtAddress} for network=${network}; using default ${defaults[network].onbtAddress}. Set ALLOW_NON_DEFAULT_SALE=1 to override.`
    );
    onbtAddress = defaults[network].onbtAddress;
  }

  const amount = process.env.PRIVATE_SALE_FUND_AMOUNT || '100000000000000000000000000'; // 100M ONBT

  const [signer] = await ethers.getSigners();
  const abi = ['function balanceOf(address) view returns (uint256)', 'function transfer(address,uint256) returns (bool)'];
  const token = new ethers.Contract(onbtAddress, abi, signer);

  const beforeSigner = await token.balanceOf(signer.address);
  const beforeSale = await token.balanceOf(saleAddress);

  console.log('Funding private sale contract...');
  console.log('Signer:', signer.address);
  console.log('Sale:', saleAddress);
  console.log('Amount:', amount);
  console.log('Signer balance before:', beforeSigner.toString());
  console.log('Sale balance before:', beforeSale.toString());

  if (lt(beforeSigner, amount)) {
    throw new Error(`Insufficient ONBT balance. Need ${amount}, have ${beforeSigner.toString()}`);
  }

  const tx = await token.transfer(saleAddress, amount);
  console.log('Transfer tx:', tx.hash);
  await tx.wait();

  const afterSigner = await token.balanceOf(signer.address);
  const afterSale = await token.balanceOf(saleAddress);

  console.log('Signer balance after:', afterSigner.toString());
  console.log('Sale balance after:', afterSale.toString());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
