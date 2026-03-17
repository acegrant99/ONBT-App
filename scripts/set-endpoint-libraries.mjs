import chalk from "chalk";
import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

const CHAINS = config.networks;
const MESSAGE_LIBS = config.messageLibraries;
const ONBT_ADDRESSES = config.oft;

// Endpoint ABI - only setSendLibrary and setReceiveLibrary
const ENDPOINT_ABI = [
  {
    inputs: [
      { name: "_oapp", type: "address", internalType: "address" },
      { name: "_eid", type: "uint32", internalType: "uint32" },
      { name: "_newLib", type: "address", internalType: "address" },
    ],
    name: "setSendLibrary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "_oapp", type: "address", internalType: "address" },
      { name: "_eid", type: "uint32", internalType: "uint32" },
      { name: "_lib", type: "address", internalType: "address" },
      { name: "_gracePeriod", type: "uint256", internalType: "uint256" },
    ],
    name: "setReceiveLibrary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function setEndpointLibraries(networkName) {
  const networkConfig = CHAINS[networkName];
  const oftAddress = ONBT_ADDRESSES[networkName].address;
  const endpointAddress = networkConfig.endpoint;
  const remoteEid = networkName === "base" ? CHAINS.arbitrum.lzEid : CHAINS.base.lzEid;
  const sendLib = networkName === "base" ? MESSAGE_LIBS.arbitrum.sendUln : MESSAGE_LIBS.base.sendUln;
  const receiveLib = networkName === "base" ? MESSAGE_LIBS.arbitrum.receiveUln : MESSAGE_LIBS.base.receiveUln;

  console.log(chalk.cyan.bold(`\n${"=".repeat(70)}`));
  console.log(chalk.cyan.bold(`Setting Libraries on ${networkName.toUpperCase()} via Endpoint`));
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
    // Set send library
    console.log(chalk.yellow("⏳ Setting send library..."));
    const sendTx = await endpoint.setSendLibrary(oftAddress, remoteEid, sendLib, {
      gasLimit: 300000,
    });
    console.log(chalk.cyan(`Send Lib Tx: ${sendTx.hash}`));
    const sendReceipt = await sendTx.wait();

    if (sendReceipt.status === 1) {
      console.log(chalk.green(`✅ Send library set successfully!`));
      console.log(chalk.cyan(`Block: ${sendReceipt.blockNumber}`));
    } else {
      console.log(chalk.red(`❌ Send library transaction reverted!`));
      return false;
    }

    // Set receive library
    console.log(chalk.yellow("\n⏳ Setting receive library..."));
    const receiveTx = await endpoint.setReceiveLibrary(oftAddress, remoteEid, receiveLib, 0, {
      gasLimit: 300000,
    });
    console.log(chalk.cyan(`Receive Lib Tx: ${receiveTx.hash}`));
    const receiveReceipt = await receiveTx.wait();

    if (receiveReceipt.status === 1) {
      console.log(chalk.green(`✅ Receive library set successfully!`));
      console.log(chalk.cyan(`Block: ${receiveReceipt.blockNumber}`));
    } else {
      console.log(chalk.red(`❌ Receive library transaction reverted!`));
      return false;
    }

    return true;
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

  const success = await setEndpointLibraries(network);
  if (!success) {
    process.exit(1);
  }
}

main().catch(console.error);
