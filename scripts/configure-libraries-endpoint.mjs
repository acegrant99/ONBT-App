import hre from "hardhat";
import chalk from "chalk";
import fs from "fs";

const { ethers } = hre;

// Load configuration
const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

// ============ Configuration ============

const ONBT_ADDRESSES = config.oft;
const CHAINS = config.networks;
const MESSAGE_LIBS = config.messageLibraries;

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

// LayerZero SDK types and encoding
class SetConfigParam {
  constructor(eid, configType, config) {
    this.eid = eid;
    this.configType = configType;
    this.config = config;
  }
}

// ============ Configuration via Endpoint.setConfig ============

async function configureLibrariesViaEndpointV2(chainId, otherChainId) {
  const chain = CHAINS[chainId > 10000 ? "base" : "arbitrum"]; // Assuming chainId is the key
  const chainKey = chainId === 8453 ? "base" : "arbitrum";
  const otherChainKey = chainId === 8453 ? "arbitrum" : "base";

  log(
    `Configuring message libraries on ${chainKey} via Endpoint.setConfig`,
    "title"
  );

  const network = await ethers.provider.getNetwork();
  if (Number(network.chainId) !== chainId) {
    log(
      `Not connected to ${chainKey} (chain ${chainId}), skipping`,
      "warning"
    );
    return false;
  }

  const [signer] = await ethers.getSigners();
  log(`Using signer: ${signer.address}`);

  const oappAddress = ONBT_ADDRESSES[chainKey].address;
  const endpointAddress = CHAINS[chainKey].endpoint;
  const remoteEid = CHAINS[otherChainKey].lzEid;
  const sendUln = MESSAGE_LIBS[otherChainKey].sendUln;
  const receiveUln = MESSAGE_LIBS[otherChainKey].receiveUln;

  log(`Endpoint: ${endpointAddress}`);
  log(`OApp: ${oappAddress}`);
  log(`Remote EID: ${remoteEid}`);
  log(`Send ULN: ${sendUln}`);
  log(`Receive ULN: ${receiveUln}\n`);

  // Endpoint interface
  const ENDPOINT_ABI = [
    "function setConfig(address oapp, tuple(uint32 eid, uint32 configType, bytes config)[] calldata params) external",
  ];

  const endpoint = new ethers.Contract(endpointAddress, ENDPOINT_ABI, signer);

  try {
    // Create SetConfigParam array with library addresses
    // For ULN, we need to encode the library address in the config
    const setConfigParams = [
      {
        eid: remoteEid,
        configType: 1, // CONFIG_TYPE_SEND_LIB = 1
        config: ethers.AbiCoder.defaultAbiCoder().encode(
          ["address"],
          [sendUln]
        ),
      },
      {
        eid: remoteEid,
        configType: 2, // CONFIG_TYPE_RECEIVE_LIB = 2
        config: ethers.AbiCoder.defaultAbiCoder().encode(
          ["address"],
          [receiveUln]
        ),
      },
    ];

    log(
      `Calling Endpoint.setConfig with ${setConfigParams.length} parameters...`
    );

    // Attempt to set config
    const tx = await endpoint.setConfig(oappAddress, setConfigParams, {
      gasLimit: 1000000,
    });

    log(`Transaction: ${tx.hash}`);
    const receipt = await tx.wait();

    if (receipt.status === 1) {
      log(`Libraries configured successfully on ${chainKey}`, "success");
      log(`Block: ${receipt.blockNumber}`);
      return true;
    } else {
      log(`Library configuration reverted on ${chainKey}`, "error");
      return false;
    }
  } catch (error) {
    log(
      `Configuration error: ${error.reason || error.message}`,
      "error"
    );
    log(`This error is expected if:`, "warning");
    log(`  1. The OFT contract is not fully initialized`);
    log(`  2. Endpoint permissions restrict library configuration`);
    log(`  3. The config encoding doesn't match Endpoint expectations`);
    return false;
  }
}

// ============ Alternative: Raw Endpoint Call ============

async function attemptRawEndpointCall(chainId, otherChainId) {
  const chainKey = chainId === 8453 ? "base" : "arbitrum";
  const otherChainKey = chainId === 8453 ? "arbitrum" : "base";

  log(
    `Attempting raw Endpoint call for debugging on ${chainKey}`,
    "title"
  );

  const network = await ethers.provider.getNetwork();
  if (Number(network.chainId) !== chainId) {
    log(`Not connected to ${chainKey}, skipping`, "warning");
    return;
  }

  const [signer] = await ethers.getSigners();

  const oappAddress = ONBT_ADDRESSES[chainKey].address;
  const endpointAddress = CHAINS[chainKey].endpoint;
  const remoteEid = CHAINS[otherChainKey].lzEid;

  const ENDPOINT_ABI = [
    "function getConfig(address _oapp, address _lib, uint32 _eid) external view returns (bytes memory)",
  ];

  const endpoint = new ethers.Contract(
    endpointAddress,
    ENDPOINT_ABI,
    ethers.provider
  );

  try {
    // Try to read config to understand current state
    const sendLibAddr = MESSAGE_LIBS[otherChainKey].sendUln;
    const config = await endpoint.getConfig(oappAddress, sendLibAddr, remoteEid);
    log(`Endpoint config for send library: ${config}`, "info");
  } catch (e) {
    log(
      `Could not read config from endpoint (may not be set): ${e.message}`,
      "warning"
    );
  }
}

// ============ Instruction Summary ============

async function printManualInstructions() {
  log(`\n${"=".repeat(60)}\n MANUAL CONFIGURATION VIA ETHERSCAN\n${"=".repeat(60)}\n`);

  log(`Since Endpoint.setConfig may require special permissions, you can manually submit transactions via Etherscan:`, "warning");

  log(`\n1. ON BASE NETWORK:`);
  log(`   Contract: 0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7 (Endpoint)`);
  log(`   Method: setConfig`);
  log(`   Parameters:`);
  log(`     - oapp: 0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c`);
  log(`     - params: SetConfigParam[] with:`);
  log(`       { eid: 110, configType: 1, config: (encoded sendUln address) }`);
  log(`       { eid: 110, configType: 2, config: (encoded receiveUln address) }`);

  log(`\n2. ON ARBITRUM NETWORK:`);
  log(`   Contract: 0x3c2269811836af69497E5F486A85D7316753cf62 (Endpoint)`);
  log(`   Method: setConfig`);
  log(`   Parameters:`);
  log(`     - oapp: 0x42bB5FD891c070A64d31752855E94A01edDd766E`);
  log(`     - params: SetConfigParam[] with:`);
  log(`       { eid: 184, configType: 1, config: (encoded sendUln address) }`);
  log(`       { eid: 184, configType: 2, config: (encoded receiveUln address) }`);

  log(`\n3. ABI for Etherscan interaction:`);
  const abi = [
    {
      inputs: [
        { internalType: "address", name: "oapp", type: "address" },
        {
          components: [
            { internalType: "uint32", name: "eid", type: "uint32" },
            { internalType: "uint32", name: "configType", type: "uint32" },
            { internalType: "bytes", name: "config", type: "bytes" },
          ],
          internalType: "struct SetConfigParam[]",
          name: "params",
          type: "tuple[]",
        },
      ],
      name: "setConfig",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  log(
    `   Copy this ABI to Etherscan's Write Contract interface: ${JSON.stringify(abi)}`
  );

  log(`\nAlternatively, use Web3 library to encode the call and submit it yourself.`);
}

// ============ Main Execution ============

async function main() {
  console.log(chalk.cyan.bold("\n============================================================"));
  console.log(
    chalk.cyan.bold("ONBT OFT - Message Libraries Configuration (Endpoint)")
  );
  console.log(chalk.cyan.bold("============================================================\n"));

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

  log(`Network: ${network.name} (Chain ${currentChainId})`);
  log(`Remote Chain ID: ${remoteChainId}\n`);

  // Attempt Endpoint configuration
  const configured = await configureLibrariesViaEndpointV2(currentChainId, remoteChainId);

  // Show raw endpoint call for debugging
  await attemptRawEndpointCall(currentChainId, remoteChainId);

  // Print manual instructions if automated approach fails
  if (!configured) {
    await printManualInstructions();
  }

  // Summary
  log(
    `\nConfiguration Status: ${configured ? "✅ COMPLETE" : "⏳ REQUIRES MANUAL SETUP"}`
  );
}

main().catch((error) => {
  console.error(chalk.red("Fatal error:"), error.message);
  process.exit(1);
});
