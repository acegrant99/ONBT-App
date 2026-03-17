import hre from "hardhat";

const { ethers } = hre;

// Configuration
const CONTRACTS = {
  8453: "0xD1669D6801D5883999BD0544D9e1b8722eA6F219", // Base
  42161: "0x026beFb7808458FD5dFc77EA8E152c16FD169FF8", // Arbitrum
};

const LZ_ENDPOINTS = {
  8453: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
  42161: "0x3c2269811836af69497E5F486A85D7316753cf62",
};

const LZ_CHAIN_IDS = {
  base: 184,
  arbitrum: 110,
};

const ENDPOINT_ABI = [
  "function getConfig(uint16 _version, uint16 _chainId, address _userApplication, uint _configType) external view returns (bytes memory)",
  "function defaultSendLibrary() external view returns (address)",
  "function defaultReceiveLibraryAddress() external view returns (address)",
];

async function checkExecutorConfig() {
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  console.log("\n" + "=".repeat(70));
  console.log("🔍 LayerZero V1 Relayer & Oracle Configuration Check");
  console.log("=".repeat(70) + "\n");

  const [signer] = await ethers.getSigners();
  console.log(`Network: ${network.name} (${chainId})`);
  console.log(`Signer: ${signer.address}\n`);

  // Determine chains
  let sourceChain, destChainId;
  if (chainId === 8453) {
    sourceChain = "Base";
    destChainId = LZ_CHAIN_IDS.arbitrum;
  } else if (chainId === 42161) {
    sourceChain = "Arbitrum";
    destChainId = LZ_CHAIN_IDS.base;
  } else {
    throw new Error(`Unsupported chain: ${chainId}`);
  }

  const sourceContract = CONTRACTS[chainId];
  const endpointAddress = LZ_ENDPOINTS[chainId];

  console.log(`Source Chain: ${sourceChain}`);
  console.log(`Contract: ${sourceContract}`);
  console.log(`Endpoint: ${endpointAddress}\n`);

  const endpoint = new ethers.Contract(endpointAddress, ENDPOINT_ABI, signer);

  // LayerZero V1 Config Types:
  // Type 1: Inbound Proof Library Version
  // Type 2: Inbound Block Confirmations
  // Type 3: Relayer
  // Type 4: Outbound Proof Type
  // Type 5: Outbound Block Confirmations
  // Type 6: Oracle

  console.log("📡 Relayer Configuration (Config Type 3)");
  console.log("-".repeat(70));
  try {
    const relayerConfig = await endpoint.getConfig(2, destChainId, sourceContract, 3);
    if (relayerConfig && relayerConfig !== "0x" && relayerConfig.length > 2) {
      // Extract address from bytes (last 20 bytes)
      const relayerAddress = "0x" + relayerConfig.slice(-40);
      console.log(`✅ Custom Relayer: ${relayerAddress}`);
    } else {
      console.log("⚠️  Using default relayer (no custom config set)");
    }
  } catch (error) {
    console.log("❌ Could not read relayer config:", error.message);
  }

  console.log("\n🔮 Oracle Configuration (Config Type 6)");
  console.log("-".repeat(70));
  try {
    const oracleConfig = await endpoint.getConfig(2, destChainId, sourceContract, 6);
    if (oracleConfig && oracleConfig !== "0x" && oracleConfig.length > 2) {
      // Extract address from bytes (last 20 bytes)
      const oracleAddress = "0x" + oracleConfig.slice(-40);
      console.log(`✅ Custom Oracle: ${oracleAddress}`);
    } else {
      console.log("⚠️  Using default oracle (no custom config set)");
    }
  } catch (error) {
    console.log("❌ Could not read oracle config:", error.message);
  }

  console.log("\n📚 Default Libraries");
  console.log("-".repeat(70));
  try {
    const defaultSendLib = await endpoint.defaultSendLibrary();
    const defaultReceiveLib = await endpoint.defaultReceiveLibraryAddress();
    console.log(`Default Send Library: ${defaultSendLib}`);
    console.log(`Default Receive Library: ${defaultReceiveLib}`);
  } catch (error) {
    console.log("Could not read default libraries:", error.message);
  }

  console.log("\n" + "=".repeat(70));
  console.log("ℹ️  Note: LayerZero V1 uses Relayers and Oracles");
  console.log("LayerZero V2 uses Executors and DVNs (different architecture)");
  console.log("Your contracts are using V1, so Relayer/Oracle config applies.");
  console.log("=".repeat(70) + "\n");
}

checkExecutorConfig()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Check failed:", error);
    process.exit(1);
  });
