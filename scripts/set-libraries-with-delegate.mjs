import chalk from "chalk";
import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

const CHAINS = config.networks;
const MESSAGE_LIBS = config.messageLibraries;
const ONBT_ADDRESSES = config.oft;

// Endpoint ABI for delegate and library management
const ENDPOINT_ABI = [
  {
    inputs: [
      { name: "oapp", type: "address", internalType: "address" },
      { name: "delegate", type: "address", internalType: "address" }
    ],
    name: "setDelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "oapp", type: "address", internalType: "address" },
      { name: "eid", type: "uint32", internalType: "uint32" }
    ],
    name: "getDelegate",
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "oapp", type: "address", internalType: "address" },
      { name: "eid", type: "uint32", internalType: "uint32" },
      { name: "newLib", type: "address", internalType: "address" }
    ],
    name: "setSendLibrary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "oapp", type: "address", internalType: "address" },
      { name: "eid", type: "uint32", internalType: "uint32" },
      { name: "newLib", type: "address", internalType: "address" },
      { name: "gracePeriod", type: "uint256", internalType: "uint256" }
    ],
    name: "setReceiveLibrary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function configureLibrariesWithDelegate(networkName) {
  const networkConfig = CHAINS[networkName];
  const oftAddress = ONBT_ADDRESSES[networkName].address;
  const endpointAddress = networkConfig.endpoint;
  const remoteEid = networkName === "base" ? CHAINS.arbitrum.lzEid : CHAINS.base.lzEid;
  const sendLib = networkName === "base" ? MESSAGE_LIBS.arbitrum.sendUln : MESSAGE_LIBS.base.sendUln;
  const receiveLib = networkName === "base" ? MESSAGE_LIBS.arbitrum.receiveUln : MESSAGE_LIBS.base.receiveUln;

  console.log(chalk.cyan.bold(`\n${"=".repeat(70)}`));
  console.log(chalk.cyan.bold(`Configuring ${networkName.toUpperCase()} with Delegate & Libraries`));
  console.log(chalk.cyan.bold(`${"=".repeat(70)}\n`));

  // Get RPC provider and signer
  const provider = new ethers.JsonRpcProvider(networkConfig.rpc);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log(chalk.yellow(`Signer: ${signer.address}`));
  console.log(chalk.yellow(`Endpoint: ${endpointAddress}`));
  console.log(chalk.yellow(`OFT: ${oftAddress}`));
  console.log(chalk.yellow(`Remote EID: ${remoteEid}`));
  console.log(chalk.yellow(`Send Library: ${sendLib}`));
  console.log(chalk.yellow(`Receive Library: ${receiveLib}\n`));

  const endpoint = new ethers.Contract(endpointAddress, ENDPOINT_ABI, signer);

  try {
    // Step 1: Check and set delegate
    console.log(chalk.blue("Step 1️⃣  Checking/Setting Delegate..."));
    try {
      const currentDelegate = await endpoint.getDelegate(oftAddress);
      console.log(chalk.yellow(`Current Delegate: ${currentDelegate}`));
      
      if (currentDelegate.toLowerCase() === signer.address.toLowerCase()) {
        console.log(chalk.green(`✅ Signer is already set as delegate`));
      } else {
        console.log(chalk.yellow(`⏳ Setting signer as delegate...`));
        const delegateTx = await endpoint.setDelegate(oftAddress, signer.address, {
          gasLimit: 300000,
        });
        console.log(chalk.cyan(`Delegate TX: ${delegateTx.hash}`));
        const delegateReceipt = await delegateTx.wait();
        
        if (delegateReceipt.status === 1) {
          console.log(chalk.green(`✅ Delegate set successfully!`));
          console.log(chalk.cyan(`Block: ${delegateReceipt.blockNumber}\n`));
        } else {
          console.log(chalk.red(`❌ Delegate transaction reverted!`));
          return false;
        }
      }
    } catch (err) {
      console.log(chalk.red(`⚠️  Error checking delegate: ${err.message}`));
    }

    // Step 2: Set send library
    console.log(chalk.blue("Step 2️⃣  Setting Send Library..."));
    const sendTx = await endpoint.setSendLibrary(oftAddress, remoteEid, sendLib, {
      gasLimit: 300000,
    });
    console.log(chalk.cyan(`Send Lib TX: ${sendTx.hash}`));
    const sendReceipt = await sendTx.wait();

    if (sendReceipt.status === 1) {
      console.log(chalk.green(`✅ Send library set successfully!`));
      console.log(chalk.cyan(`Block: ${sendReceipt.blockNumber}\n`));
    } else {
      console.log(chalk.red(`❌ Send library transaction reverted!`));
      return false;
    }

    // Step 3: Set receive library
    console.log(chalk.blue("Step 3️⃣  Setting Receive Library..."));
    const receiveTx = await endpoint.setReceiveLibrary(oftAddress, remoteEid, receiveLib, 0, {
      gasLimit: 300000,
    });
    console.log(chalk.cyan(`Receive Lib TX: ${receiveTx.hash}`));
    const receiveReceipt = await receiveTx.wait();

    if (receiveReceipt.status === 1) {
      console.log(chalk.green(`✅ Receive library set successfully!`));
      console.log(chalk.cyan(`Block: ${receiveReceipt.blockNumber}\n`));
      return true;
    } else {
      console.log(chalk.red(`❌ Receive library transaction reverted!`));
      return false;
    }
  } catch (err) {
    console.log(chalk.red(`\n❌ Error: ${err.message}`));
    if (err.reason) {
      console.log(chalk.red(`Reason: ${err.reason}`));
    }
    return false;
  }
}

async function main() {
  if (!process.env.PRIVATE_KEY) {
    console.log(chalk.red("❌ PRIVATE_KEY environment variable not set"));
    process.exit(1);
  }

  const network = process.argv[2] || "base";
  if (!["base", "arbitrum"].includes(network)) {
    console.log(chalk.red("❌ Invalid network. Use 'base' or 'arbitrum'"));
    process.exit(1);
  }

  const success = await configureLibrariesWithDelegate(network);
  if (!success) {
    process.exit(1);
  }
}

main().catch(console.error);
