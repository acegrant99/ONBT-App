/**
 * Multi-Chain SDK Example
 * Demonstrates using SDKs from multiple chains
 */

import { getEthereumProvider, getENSName, getETHBalance, EthereumDeFi } from "../integrations/ethereum/eth-sdk.mjs";
import { getPolygonProvider, getMATICBalance, PolygonDeFi } from "../integrations/polygon/polygon-sdk.mjs";
import { getArbitrumProvider, getArbitrumETHBalance, ArbitrumDeFi } from "../integrations/arbitrum/arbitrum-sdk.mjs";
import { getOptimismProvider, getOptimismETHBalance, OptimismSuperchain } from "../integrations/optimism/optimism-sdk.mjs";
import { getAvalancheProvider, getAVAXBalance, AvalancheDeFi } from "../integrations/avalanche/avalanche-sdk.mjs";
import { getBSCProvider, getBNBBalance, BSCDeFi } from "../integrations/bsc/bsc-sdk.mjs";

async function main() {
  console.log("🌐 Multi-Chain SDK Integration Example\n");

  // Example address (Vitalik's address)
  const exampleAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

  console.log("=".repeat(60));
  console.log("📊 Checking Balances Across All Chains");
  console.log("=".repeat(60));
  console.log(`Address: ${exampleAddress}\n`);

  try {
    // 1. Ethereum
    console.log("1️⃣  Ethereum Mainnet");
    const ethProvider = getEthereumProvider("mainnet");
    const ethBalance = await getETHBalance(exampleAddress, ethProvider);
    const ensName = await getENSName(exampleAddress, ethProvider);
    console.log(`   ENS: ${ensName || "No ENS name"}`);
    console.log(`   Balance: ${ethBalance} ETH`);
    console.log(`   Uniswap V3: ${EthereumDeFi.uniswapV3Router}`);
    console.log();

    // 2. Polygon
    console.log("2️⃣  Polygon");
    const polygonProvider = getPolygonProvider("mainnet");
    const maticBalance = await getMATICBalance(exampleAddress, polygonProvider);
    console.log(`   Balance: ${maticBalance} MATIC`);
    console.log(`   QuickSwap: ${PolygonDeFi.quickswapRouter}`);
    console.log();

    // 3. Arbitrum
    console.log("3️⃣  Arbitrum One");
    const arbitrumProvider = getArbitrumProvider("one");
    const arbBalance = await getArbitrumETHBalance(exampleAddress, arbitrumProvider);
    console.log(`   Balance: ${arbBalance} ETH`);
    console.log(`   Camelot DEX: ${ArbitrumDeFi.camelotRouter}`);
    console.log(`   GMX: ${ArbitrumDeFi.gmxRouter}`);
    console.log();

    // 4. Optimism
    console.log("4️⃣  Optimism");
    const optimismProvider = getOptimismProvider("mainnet");
    const opBalance = await getOptimismETHBalance(exampleAddress, optimismProvider);
    console.log(`   Balance: ${opBalance} ETH`);
    console.log(`   Part of Superchain: ${OptimismSuperchain.networks.length} networks`);
    console.log(`   Velodrome: ${PolygonDeFi.quickswapRouter}`);
    console.log();

    // 5. Avalanche
    console.log("5️⃣  Avalanche C-Chain");
    const avalancheProvider = getAvalancheProvider("mainnet");
    const avaxBalance = await getAVAXBalance(exampleAddress, avalancheProvider);
    console.log(`   Balance: ${avaxBalance} AVAX`);
    console.log(`   Trader Joe: ${AvalancheDeFi.traderJoeRouter}`);
    console.log();

    // 6. BSC
    console.log("6️⃣  BNB Smart Chain");
    const bscProvider = getBSCProvider("mainnet");
    const bnbBalance = await getBNBBalance(exampleAddress, bscProvider);
    console.log(`   Balance: ${bnbBalance} BNB`);
    console.log(`   PancakeSwap: ${BSCDeFi.pancakeSwapRouter}`);
    console.log();

  } catch (error) {
    console.error("Error:", error.message);
  }

  console.log("=".repeat(60));
  console.log("📈 Network Comparison");
  console.log("=".repeat(60));
  console.log();

  const networkComparison = [
    { name: "Ethereum", blockTime: "~12s", finality: "~15 min", consensus: "PoS" },
    { name: "Polygon", blockTime: "~2s", finality: "~4 min", consensus: "PoS" },
    { name: "Arbitrum", blockTime: "~0.25s", finality: "Instant", consensus: "Rollup" },
    { name: "Optimism", blockTime: "~2s", finality: "Instant", consensus: "Rollup" },
    { name: "Avalanche", blockTime: "~2s", finality: "<1s", consensus: "Avalanche" },
    { name: "BSC", blockTime: "~3s", finality: "~15s", consensus: "PoSA" },
  ];

  networkComparison.forEach(network => {
    console.log(`${network.name.padEnd(12)} | Block: ${network.blockTime.padEnd(8)} | Finality: ${network.finality.padEnd(10)} | ${network.consensus}`);
  });

  console.log();
  console.log("=".repeat(60));
  console.log("🎯 Use Cases by Chain");
  console.log("=".repeat(60));
  console.log();

  console.log("Ethereum:  ✅ Highest security, Blue-chip DeFi, NFTs");
  console.log("Polygon:   ✅ Low fees, Gaming, Enterprise");
  console.log("Arbitrum:  ✅ L2 scaling, DeFi derivatives, Nitro tech");
  console.log("Optimism:  ✅ L2 scaling, Superchain, Public goods");
  console.log("Avalanche: ✅ Sub-second finality, Subnets, GameFi");
  console.log("BSC:       ✅ High throughput, Large user base, GameFi");
  console.log();

  console.log("=".repeat(60));
  console.log("💡 Next Steps");
  console.log("=".repeat(60));
  console.log();
  console.log("1. Deploy OFT/ONFT contracts on multiple chains");
  console.log("2. Use chain-specific SDKs for native features");
  console.log("3. Leverage LayerZero for cross-chain messaging");
  console.log("4. Integrate with chain-specific DeFi protocols");
  console.log("5. Build multi-chain dApps with unified UX");
  console.log();

  console.log("✅ Multi-chain example complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
