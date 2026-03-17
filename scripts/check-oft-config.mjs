import hre from "hardhat";

const { ethers } = hre;

// Configuration - Updated for V3 deployment
const CONTRACTS = {
  8453: "0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD", // Base
  42161: "0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da", // Arbitrum
};

const LZ_CHAIN_IDS = {
  base: 184,
  arbitrum: 110,
};

const OFT_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "function trustedRemoteLookup(uint16 _remoteChainId) external view returns (bytes memory)",
  "function minDstGasLookup(uint16 _dstChainId, uint16 _packetType) external view returns (uint)",
  "function lzEndpoint() external view returns (address)",
];

async function checkConfiguration() {
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  console.log("\n" + "=".repeat(60));
  console.log("🔍 ONBT Configuration Check");
  console.log("=".repeat(60) + "\n");

  const [signer] = await ethers.getSigners();
  console.log(`Network: ${network.name} (${chainId})`);
  console.log(`Signer: ${signer.address}\n`);

  // Determine remote chain
  let sourceChain, destChain, destChainId, remoteContract;
  if (chainId === 8453) {
    sourceChain = "Base";
    destChain = "Arbitrum";
    destChainId = LZ_CHAIN_IDS.arbitrum;
    remoteContract = CONTRACTS[42161];
  } else if (chainId === 42161) {
    sourceChain = "Arbitrum";
    destChain = "Base";
    destChainId = LZ_CHAIN_IDS.base;
    remoteContract = CONTRACTS[8453];
  } else {
    throw new Error(`Unsupported chain: ${chainId}`);
  }

  const sourceContract = CONTRACTS[chainId];
  console.log(`Source: ${sourceChain} - ${sourceContract}`);
  console.log(`Remote: ${destChain} - ${remoteContract}\n`);

  // Connect to OFT
  const oft = new ethers.Contract(sourceContract, OFT_ABI, signer);

  // Check balance
  const balance = await oft.balanceOf(signer.address);
  console.log(`Balance: ${ethers.formatEther(balance)} ONBT\n`);

  // Check LayerZero endpoint
  const endpoint = await oft.lzEndpoint();
  console.log(`LayerZero Endpoint: ${endpoint}`);

  // Check trusted remote
  const trustedRemote = await oft.trustedRemoteLookup(destChainId);
  console.log(`Trusted Remote (${destChain}): ${trustedRemote}`);
  
  // In LayerZero V1, trustedRemoteLookup returns: remoteAddress + localAddress (84 chars after 0x)
  // We need to extract the first 40 chars (20 bytes) which is the remote address
  const expectedRemote = remoteContract.toLowerCase().replace("0x", "");
  const trustedRemoteAddress = trustedRemote.slice(2, 42).toLowerCase(); // Skip 0x, take first 20 bytes (40 chars)
  
  if (trustedRemoteAddress === expectedRemote) {
    console.log("✅ Trusted remote is correctly configured");
  } else {
    console.log("❌ Trusted remote mismatch!");
    console.log(`  Expected: ${expectedRemote}`);
    console.log(`  Got: ${trustedRemoteAddress}`);
  }

  // Check min destination gas
  const minGas = await oft.minDstGasLookup(destChainId, 0); // packet type 0 = send
  console.log(`\nMin Destination Gas: ${minGas}`);
  
  if (minGas >= 200000n) {
    console.log("✅ Min gas is correctly configured");
  } else {
    console.log("❌ Min gas is too low!");
  }

  console.log("\n" + "=".repeat(60));
  console.log("Configuration Summary");
  console.log("=".repeat(60));
  console.log(`Source Chain: ${sourceChain}`);
  console.log(`Destination Chain: ${destChain}`);
  console.log(`Balance: ${ethers.formatEther(balance)} ONBT`);
  console.log(`Trusted Remote: ${trustedRemote.length === 0 ? "❌ NOT SET" : "✅ SET"}`);
  console.log(`Min Gas: ${minGas} (${minGas >= 200000n ? "✅" : "❌"})`);
  console.log("=".repeat(60) + "\n");
}

checkConfiguration()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Check failed:", error);
    process.exit(1);
  });
