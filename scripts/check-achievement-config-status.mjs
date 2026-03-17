import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEPLOYMENTS = {
  base: {
    file: "deploy/deployment-lzv2-resume-base-stakingfix-1771584423316.json",
    explorer: "https://basescan.org"
  },
  arbitrum: {
    file: "deploy/deployment-lzv2-resume-arbitrum-stakingfix-1771584790862.json",
    explorer: "https://arbiscan.io"
  }
};

async function checkNetwork(networkName, config) {
  const deployment = JSON.parse(fs.readFileSync(config.file, "utf8"));
  
  const provider = new ethers.providers.JsonRpcProvider(
    networkName === "base" ? "https://mainnet.base.org" : "https://arb1.arbitrum.io/rpc"
  );
  
  const iface = new ethers.utils.Interface(["function achievementNFT() view returns (address)"]);
  const staking = new ethers.Contract(deployment.contracts.staking, iface, provider);
  
  const nftAddr = await staking.achievementNFT();
  const isConfigured = nftAddr.toLowerCase() === deployment.contracts.achievementNFT.toLowerCase();
  const isZero = nftAddr === ethers.constants.AddressZero;
  
  return {
    network: networkName,
    staking: deployment.contracts.staking,
    expected: deployment.contracts.achievementNFT,
    actual: nftAddr,
    isConfigured,
    isZero,
    explorer: config.explorer
  };
}

async function main() {
  console.log("\n" + "═".repeat(88));
  console.log("ACHIEVEMENT NFT CONFIGURATION STATUS");
  console.log("═".repeat(88) + "\n");

  const baseResult = await checkNetwork("base", DEPLOYMENTS.base);
  const arbResult = await checkNetwork("arbitrum", DEPLOYMENTS.arbitrum);

  for (const result of [baseResult, arbResult]) {
    const status = result.isConfigured ? "✅ CONFIGURED" : (result.isZero ? "❌ NOT SET" : "⚠️  MISMATCH");
    console.log(`${result.network.toUpperCase().padEnd(10)} ${status}`);
    console.log(`  Staking:  ${result.staking}`);
    console.log(`  Expected: ${result.expected}`);
    console.log(`  Actual:   ${result.actual}`);
    console.log();
  }

  const allConfigured = baseResult.isConfigured && arbResult.isConfigured;
  
  console.log("═".repeat(88));
  if (allConfigured) {
    console.log("✅ SUCCESS: Both networks properly configured!");
    console.log("   Achievement NFT minting is now enabled on Base and Arbitrum.");
  } else {
    console.log("⚠️  INCOMPLETE: Some networks still need configuration.");
    if (!baseResult.isConfigured) console.log("   - Base needs configuration");
    if (!arbResult.isConfigured) console.log("   - Arbitrum needs configuration");
  }
  console.log("═".repeat(88) + "\n");
}

main().catch(console.error);
