const { task } = require("hardhat/config");
const chalk = require("chalk");

// Helper function to log with colors
function log(message, type = "info") {
  if (type === "success") console.log(chalk.green(`✅ ${message}`));
  else if (type === "error") console.log(chalk.red(`❌ ${message}`));
  else if (type === "warning") console.log(chalk.yellow(`⚠️  ${message}`));
  else if (type === "title") console.log(chalk.cyan.bold(`\n${"=".repeat(60)}\n${message}\n${"=".repeat(60)}\n`));
  else console.log(chalk.blue(`ℹ️  ${message}`));
}

// Helper to convert address to bytes32
// (Not needed for V1, keeping for reference)
function addressToBytes32(address) {
  return "0x" + address.toLowerCase().replace("0x", "").padStart(64, "0");
}

// Chain configuration (LayerZero V1 chain IDs - different from V2!)
const CHAINS = {
  8453: {
    name: "Base",
    lzChainId: 184, // LayerZero V1 chain ID for Base
    remoteChainId: 42161,
    remoteChainName: "Arbitrum",
    remoteLzChainId: 110, // LayerZero V1 chain ID for Arbitrum
    minGas: 200000,
  },
  42161: {
    name: "Arbitrum",
    lzChainId: 110, // LayerZero V1 chain ID for Arbitrum
    remoteChainId: 8453,
    remoteChainName: "Base",
    remoteLzChainId: 184, // LayerZero V1 chain ID for Base
    minGas: 200000,
  },
};

// OFT ABI (LayerZero V1 functions)
const OFT_ABI = [
  "function setTrustedRemoteAddress(uint16 _remoteChainId, bytes calldata _remoteAddress) external",
  "function setMinDstGas(uint16 _dstChainId, uint16 _packetType, uint _minGas) external",
  "function trustedRemoteLookup(uint16 _remoteChainId) external view returns (bytes memory)",
  "function minDstGasLookup(uint16 _dstChainId, uint16 _packetType) external view returns (uint)",
  "function setConfig(uint16 _version, uint16 _chainId, uint _configType, bytes calldata _config) external",
  "function setSendVersion(uint16 _version) external",
  "function setReceiveVersion(uint16 _version) external",
];

// Load contract address from deployment file
function loadContractAddress(chainId) {
  const fs = require("fs");
  const path = require("path");
  const deploymentFile = path.join(process.cwd(), `deployment-onbt-${chainId}.json`);
  
  if (fs.existsSync(deploymentFile)) {
    const deployment = JSON.parse(fs.readFileSync(deploymentFile, "utf8"));
    return deployment.address;
  }
  
  log(`Deployment file not found: ${deploymentFile}`, "error");
  log(`Please deploy ONBT first using: npx hardhat run scripts/redeploy-onbt.mjs --network <network>`, "warning");
  return null;
}

task("wire-oft", "Wire ONBT for cross-chain messaging (peers, libraries, enforced options)")
  .addOptionalParam("contract", "ONBT contract address (auto-detected from deployment)")
  .setAction(async (taskArgs, hre) => {
    const { ethers } = hre;
    const network = await ethers.provider.getNetwork();
    const chainId = Number(network.chainId);
    
    const chainConfig = CHAINS[chainId];
    if (!chainConfig) {
      log(`Network chain ID ${chainId} is not supported`, "error");
      log(`Supported networks: Base (8453), Arbitrum (42161)`, "warning");
      return;
    }

    // Auto-detect contract address from deployment file
    const contractAddress = taskArgs.contract || loadContractAddress(chainId);
    if (!contractAddress) {
      log(`No contract address found`, "error");
      log(`Deploy first: npx hardhat run scripts/redeploy-onbt.mjs --network ${network.name}`, "warning");
      return;
    }

    // Load remote contract address too
    const remoteContractAddress = loadContractAddress(chainConfig.remoteChainId);
    if (!remoteContractAddress) {
      log(`Remote contract on ${chainConfig.remoteChainName} not deployed yet`, "error");
      log(`Deploy to ${chainConfig.remoteChainName} first`, "warning");
      return;
    }

    log(`ONBT Cross-Chain Wiring on ${chainConfig.name}`, "title");
    
    const [signer] = await ethers.getSigners();
    log(`Signer: ${signer.address}`);
    log(`Contract: ${contractAddress}`);
    log(`Remote Contract: ${remoteContractAddress}`);
    log(`Network: ${chainConfig.name} (${chainId})`);
    log(`Remote: ${chainConfig.remoteChainName} (${chainConfig.remoteChainId})\n`);

    const oft = new ethers.Contract(contractAddress, OFT_ABI, signer);
    
    // Convert remote address to bytes (20 bytes for EVM address)
    const remoteAddressBytes = ethers.getBytes(remoteContractAddress);

    let success = true;

    // 1. Set Trusted Remote (peer)
    try {
      log(`Setting trusted remote to ${chainConfig.remoteChainName}...`);
      const tx = await oft.setTrustedRemoteAddress(chainConfig.remoteLzChainId, remoteAddressBytes, { gasLimit: 200000 });
      log(`  Tx: ${tx.hash}`);
      const receipt = await tx.wait();
      log(`Trusted remote set on ${chainConfig.name}`, "success");
    } catch (error) {
      log(`Failed to set trusted remote: ${error.message}`, "error");
      success = false;
    }

    // 2. Set Minimum Destination Gas (for send = packet type 0)
    try {
      log(`Setting minimum destination gas (${chainConfig.minGas})...`);
      const packetType = 0; // 0 = PT_SEND in OFT
      const tx = await oft.setMinDstGas(chainConfig.remoteLzChainId, packetType, chainConfig.minGas, { gasLimit: 200000 });
      log(`  Tx: ${tx.hash}`);
      const receipt = await tx.wait();
      log(`Min destination gas configured on ${chainConfig.name}`, "success");
    } catch (error) {
      log(`Failed to set min dst gas: ${error.message}`, "error");
      success = false;
    }

    // 3. Set Send Library Version (ULN v2)
    try {
      log(`Setting send library version to 2 (ULN v2)...`);
      const tx = await oft.setSendVersion(2, { gasLimit: 200000 });
      log(`  Tx: ${tx.hash}`);
      const receipt = await tx.wait();
      log(`Send version configured on ${chainConfig.name}`, "success");
    } catch (error) {
      log(`Failed to set send version: ${error.message}`, "error");
      success = false;
    }

    // 4. Set Receive Library Version (ULN v2)
    try {
      log(`Setting receive library version to 2 (ULN v2)...`);
      const tx = await oft.setReceiveVersion(2, { gasLimit: 200000 });
      log(`  Tx: ${tx.hash}`);
      const receipt = await tx.wait();
      log(`Receive version configured on ${chainConfig.name}`, "success");
    } catch (error) {
      log(`Failed to set receive version: ${error.message}`, "error");
      success = false;
    }

    // 5. Set Inbound Block Confirmations (for security)
    try {
      log(`Setting inbound block confirmations (15 blocks)...`);
      const CONFIG_TYPE_INBOUND_BLOCK_CONFIRMATIONS = 2;
      const confirmations = ethers.AbiCoder.defaultAbiCoder().encode(["uint16"], [15]);
      const tx = await oft.setConfig(
        2, // ULN version 2
        chainConfig.remoteLzChainId,
        CONFIG_TYPE_INBOUND_BLOCK_CONFIRMATIONS,
        confirmations,
        { gasLimit: 300000 }
      );
      log(`  Tx: ${tx.hash}`);
      const receipt = await tx.wait();
      log(`Inbound confirmations configured on ${chainConfig.name}`, "success");
    } catch (error) {
      log(`Failed to set inbound confirmations: ${error.message}`, "error");
      success = false;
    }

    // 6. Set Outbound Block Confirmations
    try {
      log(`Setting outbound block confirmations (15 blocks)...`);
      const CONFIG_TYPE_OUTBOUND_BLOCK_CONFIRMATIONS = 5;
      const confirmations = ethers.AbiCoder.defaultAbiCoder().encode(["uint16"], [15]);
      const tx = await oft.setConfig(
        2, // ULN version 2
        chainConfig.remoteLzChainId,
        CONFIG_TYPE_OUTBOUND_BLOCK_CONFIRMATIONS,
        confirmations,
        { gasLimit: 300000 }
      );
      log(`  Tx: ${tx.hash}`);
      const receipt = await tx.wait();
      log(`Outbound confirmations configured on ${chainConfig.name}`, "success");
    } catch (error) {
      log(`Failed to set outbound confirmations: ${error.message}`, "error");
      success = false;
    }

    // Summary
    log(``, "info");
    if (success) {
      log(`✅ All configurations completed on ${chainConfig.name}!`, "success");
      log(`Now run on ${chainConfig.remoteChainName}: npx hardhat wire-oft --network ${chainConfig.remoteChainName.toLowerCase()}`);
    } else {
      log(`⚠️  Some configurations failed. Check the logs above.`, "warning");
    }
  });
