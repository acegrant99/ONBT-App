import hre from "hardhat";
import chalk from "chalk";

const { ethers } = hre;

// ============ Configuration ============
const ONBT_ADDRESSES = {
  8453: "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c", // Base
  42161: "0x42bB5FD891c070A64d31752855E94A01edDd766E", // Arbitrum
};

const CHAINS = {
  8453: {
    name: "Base",
    lzEid: 184,
    endpointAddress: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
  },
  42161: {
    name: "Arbitrum",
    lzEid: 110,
    endpointAddress: "0x3c2269811836af69497E5F486A85D7316753cf62",
  },
};

const REMOTE_CHAINS = {
  8453: 42161,
  42161: 8453,
};

// ============ Helper Functions ============

function log(message, type = "info") {
  if (type === "success") console.log(chalk.green(`✅ ${message}`));
  else if (type === "error") console.log(chalk.red(`❌ ${message}`));
  else if (type === "warning") console.log(chalk.yellow(`⚠️  ${message}`));
  else if (type === "title") console.log(chalk.cyan.bold(`\n${"=".repeat(60)}\n${message}\n${"=".repeat(60)}\n`));
  else console.log(chalk.blue(`ℹ️  ${message}`));
}

function addressToBytes32(address) {
  return "0x" + address.toLowerCase().replace("0x", "").padStart(64, "0");
}

// ============ Configuration Functions ============

async function configurePeers(chainId, otherChainId) {
  const chain = CHAINS[chainId];
  const otherChain = CHAINS[otherChainId];

  log(`Setting peer on ${chain.name} to ${otherChain.name}`, "title");

  const network = await ethers.provider.getNetwork();
  if (Number(network.chainId) !== chainId) {
    log(`Not connected to ${chain.name} (chain ${chainId}), skipping`, "warning");
    return false;
  }

  const [signer] = await ethers.getSigners();
  log(`Using signer: ${signer.address}`);

  const localAddress = ONBT_ADDRESSES[chainId];
  const remoteAddress = ONBT_ADDRESSES[otherChainId];
  if (!localAddress || !remoteAddress) {
    log(`Missing ONBT address for chain ${chainId} or ${otherChainId}`, "error");
    return false;
  }

  log(`Target contract: ${localAddress}`);
  log(`Remote OFT address: ${remoteAddress}`);
  log(`Remote chain: ${otherChain.name} (EID: ${otherChain.lzEid})`);

  const OFT_ABI = [
    "function setPeer(uint32 remoteChainId, bytes32 peerAddress) external",
    "function getPeer(uint32 remoteChainId) public view returns (bytes32)",
  ];

  const oft = new ethers.Contract(localAddress, OFT_ABI, signer);

  const peerBytes32 = addressToBytes32(remoteAddress);
  log(`Peer address (bytes32): ${peerBytes32}`);

  // Check current peer
  try {
    const currentPeer = await oft.getPeer(otherChain.lzEid);
    if (currentPeer === peerBytes32) {
      log(`Peer already set correctly on ${chain.name}`, "success");
      return true;
    } else if (currentPeer !== ethers.ZeroHash) {
      log(`Current peer: ${currentPeer}`, "warning");
      log(`This peer differs from the expected address. Updating...`);
    }
  } catch (e) {
    log(`Could not read current peer (may not be set yet)`);
  }

  // Set peer
  log(`Setting peer...`);
  try {
    const tx = await oft.setPeer(otherChain.lzEid, peerBytes32, {
      gasLimit: 200000,
    });

    log(`Transaction: ${tx.hash}`);
    const receipt = await tx.wait();

    if (receipt.status === 1) {
      log(`Peer configured successfully on ${chain.name}`, "success");
      log(`Block: ${receipt.blockNumber}`);
      return true;
    } else {
      log(`Peer configuration failed on ${chain.name}`, "error");
      return false;
    }
  } catch (error) {
    log(`Error setting peer: ${error.message}`, "error");
    return false;
  }
}

async function checkLibraryConfiguration(chainId, otherChainId) {
  const chain = CHAINS[chainId];
  const otherChain = CHAINS[otherChainId];

  log(`Checking library configuration status on ${chain.name}`, "title");

  const network = await ethers.provider.getNetwork();
  if (Number(network.chainId) !== chainId) {
    log(`Not connected to ${chain.name}, skipping`, "warning");
    return;
  }

  const localAddress = ONBT_ADDRESSES[chainId];

  log(`\n⚠️  LIBRARY CONFIGURATION STATUS:\n`);
  log(
    `The OFT contract methods for configuring send/receive libraries are not`,
    "warning"
  );
  log(
    `accessible through standard contract calls (setSendLibrary/setReceiveLibrary revert).`,
    "warning"
  );

  log(`\nPOSSIBLE SOLUTIONS:\n`);

  log(
    `1. CONFIGURE VIA ENDPOINT (if access granted):`
  );
  log(
    `   Use Endpoint.setConfig() with the OFT address and library config params`
  );
  log(
    `   Reference: https://docs.layerzero.network/v2/developers/evm/oapp/overview`
  );

  log(
    `\n2. USE LAYERZERO CLI:`
  );
  log(
    `   LayerZero provides a CLI tool for configuration: lz-oapp-cli`
  );
  log(
    `   This may handle authentication and encoding automatically`
  );

  log(
    `\n3. CHECK OFT DEPLOYMENT STATUS:`
  );
  log(
    `   Verify the OFT was deployed with proper initialization on both chains`
  );
  log(
    `   Check if the contract needs explicit library registration`
  );

  log(
    `\n4. MANUAL TRANSACTION via Etherscan:`
  );
  log(
    `   If owner permissions are restricted, use Etherscan to submit transactions`
  );
  log(
    `   Endpoint address: ${chain.endpointAddress}`
  );
}

async function printDeploymentInfo(chainId) {
  const chain = CHAINS[chainId];
  const localAddress = ONBT_ADDRESSES[chainId];

  log(`\nDeployment Information for ${chain.name}:`, "title");
  log(`OFT Contract: ${localAddress}`);
  log(`LayerZero Endpoint: ${chain.endpointAddress}`);
  log(`Chain ID: ${chainId}`);
  log(`LayerZero EID: ${chain.lzEid}`);

  // Provide block explorer links
  const explorers = {
    8453: "https://basescan.org",
    42161: "https://arbiscan.io",
  };

  log(`\nExplorer Links:`);
  log(`  OFT: ${explorers[chainId]}/address/${localAddress}`);
  log(`  Endpoint: ${explorers[chainId]}/address/${chain.endpointAddress}\n`);
}

// ============ Main Execution ============

async function main() {
  console.log(chalk.cyan.bold("\n============================================================"));
  console.log(chalk.cyan.bold("ONBT Cross-Chain Configuration"));
  console.log(chalk.cyan.bold("============================================================\n"));

  log(`ONBT Contract Addresses:`);
  log(`  Base: ${ONBT_ADDRESSES[8453]}`);
  log(`  Arbitrum: ${ONBT_ADDRESSES[42161]}`);

  const network = await ethers.provider.getNetwork();
  const currentChainId = Number(network.chainId);
  const remoteChainId = REMOTE_CHAINS[currentChainId];

  if (!remoteChainId) {
    log(
      `Unsupported network: ${network.name}. Please run on Base or Arbitrum.`,
      "error"
    );
    return;
  }

  // Step 1: Configure peers
  const peersConfigured = await configurePeers(currentChainId, remoteChainId);

  // Step 2: Check library configuration status
  await checkLibraryConfiguration(currentChainId, remoteChainId);

  // Step 3: Print deployment info
  await printDeploymentInfo(currentChainId);

  // Summary
  console.log(chalk.cyan.bold("=".repeat(60)));
  console.log(chalk.cyan.bold(" CONFIGURATION SUMMARY"));
  console.log(chalk.cyan.bold("=".repeat(60)) + "\n");

  const chainName = CHAINS[currentChainId].name;
  log(`${chainName} Peer Configuration: ${peersConfigured ? "✅ COMPLETE" : "❌ FAILED"}`);

  if (peersConfigured) {
    log(
      `\nPeers have been successfully configured on ${chainName}.`,
      "success"
    );
    log(
      `\nTo complete the configuration, you need to:`,
      "warning"
    );
    log(`  1. Configure send/receive libraries (see instructions above)`);
    log(`  2. Run this script on the ${CHAINS[remoteChainId].name} network to set the reciprocal peer`);
    log(`  3. Test cross-chain functionality`);
  } else {
    log(`\nPeer configuration failed on ${chainName}.`, "error");
    log(`Please check the error messages above.`);
  }

  log(`\nFor detailed LayerZero documentation, visit:`);
  log(`  https://docs.layerzero.network/v2/developers/evm/oapp/overview\n`);
}

main().catch((error) => {
  console.error(chalk.red("Fatal error:"), error.message);
  process.exit(1);
});
