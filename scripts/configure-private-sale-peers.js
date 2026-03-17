const hre = require('hardhat');
const { ethers } = hre;

async function main() {
  const [signer] = await ethers.getSigners();
  const network = hre.network.name;

  const defaults = {
    baseSaleAddress: '0xEA52c0c5Cb4962490d1132d9c255aa044296576e',
    arbitrumSaleAddress: '0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE',
  };
  const allowNonDefault = process.env.ALLOW_NON_DEFAULT_SALE === '1';

  // Base sale details
  let baseSaleAddress = process.env.BASE_PRIVATE_SALE_ADDRESS || defaults.baseSaleAddress;
  const baseLzEid = 30184; // LayerZero EID for Base

  // Arbitrum sale details
  let arbitrumSaleAddress = process.env.ARBITRUM_PRIVATE_SALE_ADDRESS || defaults.arbitrumSaleAddress;
  const arbitrumLzEid = 30110; // LayerZero EID for Arbitrum

  if (baseSaleAddress.toLowerCase() !== defaults.baseSaleAddress.toLowerCase() && !allowNonDefault) {
    console.warn(
      `[configure-private-sale-peers] Ignoring BASE_PRIVATE_SALE_ADDRESS=${baseSaleAddress}; using default ${defaults.baseSaleAddress}. Set ALLOW_NON_DEFAULT_SALE=1 to override.`
    );
    baseSaleAddress = defaults.baseSaleAddress;
  }
  if (arbitrumSaleAddress.toLowerCase() !== defaults.arbitrumSaleAddress.toLowerCase() && !allowNonDefault) {
    console.warn(
      `[configure-private-sale-peers] Ignoring ARBITRUM_PRIVATE_SALE_ADDRESS=${arbitrumSaleAddress}; using default ${defaults.arbitrumSaleAddress}. Set ALLOW_NON_DEFAULT_SALE=1 to override.`
    );
    arbitrumSaleAddress = defaults.arbitrumSaleAddress;
  }

  if (network !== 'base' && network !== 'arbitrum') {
    throw new Error(`Unsupported network: ${network}`);
  }

  const saleAddress = network === 'base' ? baseSaleAddress : arbitrumSaleAddress;
  const remoteSaleAddress = network === 'base' ? arbitrumSaleAddress : baseSaleAddress;
  const remoteLzEid = network === 'base' ? arbitrumLzEid : baseLzEid;

  const saleAbi = [
    'function setPeer(uint32 _eid, bytes32 _peer) public',
  ];

  const sale = new ethers.Contract(saleAddress, saleAbi, signer);

  console.log(`\n🔗 Setting OApp Peers for Private Sale on ${network.toUpperCase()}`);
  console.log('='.repeat(60));
  console.log(`Local Sale: ${saleAddress}`);
  console.log(`Remote Sale: ${remoteSaleAddress}`);
  console.log(`Remote LZ EID: ${remoteLzEid}`);

  // Convert Ethereum address to bytes32 for OApp peer
  const peerBytes32 = '0x' + remoteSaleAddress.slice(2).padStart(64, '0');
  console.log(`Remote Peer (bytes32): ${peerBytes32}`);

  console.log('\nCalling setPeer on local contract...');
  const tx = await sale.setPeer(remoteLzEid, peerBytes32);
  console.log(`Transaction hash: ${tx.hash}`);

  const receipt = await tx.wait();
  console.log(`\n✅ Peer configured successfully!`);
  console.log(`Block: ${receipt.blockNumber}`);
  console.log(`Gas used: ${receipt.gasUsed.toString()}`);

  console.log('\n📋 Configuration Summary:');
  console.log(`  Network: ${network.toUpperCase()}`);
  console.log(`  Local Sale: ${saleAddress}`);
  console.log(`  Remote LZ EID: ${remoteLzEid}`);
  console.log(`  Remote Peer (bytes32): ${peerBytes32}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
