import chalk from "chalk";
import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

const CHAINS = config.networks;
const MESSAGE_LIBS = config.messageLibraries;
const ONBT_ADDRESSES = config.oft;

// Correct Endpoint ABI - these are the actual methods
const ENDPOINT_ABI = [
  {
    inputs: [
      { name: "oapp", type: "address" },
      { name: "eid", type: "uint32" },
      { name: "newLib", type: "address" },
    ],
    name: "setSendLibrary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "oapp", type: "address" },
      { name: "eid", type: "uint32" },
      { name: "newLib", type: "address" },
      { name: "gracePeriod", type: "uint256" },
    ],
    name: "setReceiveLibrary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function setLibrariesOnEndpoint(networkName) {
  const networkConfig = CHAINS[networkName];
  const oftAddress = ONBT_ADDRESSES[networkName].address;
  const endpointAddress = networkConfig.endpoint;
  const remoteEid = networkName === "base" ? CHAINS.arbitrum.lzEid : CHAINS.base.lzEid;
  const sendLib = networkName === "base" ? MESSAGE_LIBS.arbitrum.sendUln : MESSAGE_LIBS.base.sendUln;
  const receiveLib = networkName === "base" ? MESSAGE_LIBS.arbitrum.receiveUln : MESSAGE_LIBS.base.receiveUln;

  console.log(chalk.cyan.bold(`\n${"=".repeat(70)}`));
  console.log(chalk.cyan.bold(`Setting Registered Libraries on ${networkName.toUpperCase()}`));
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
    // Set send library on Endpoint for remote chain
    console.log(chalk.blue("⏳ Setting Send Library on Endpoint..."));
    const sendTx = await endpoint.setSendLibrary(oftAddress, remoteEid, sendLib, {
      gasLimit: 500000,
    });
    console.log(chalk.cyan(`Transaction: ${sendTx.hash}`));
    const sendReceipt = await sendTx.wait();

    if (sendReceipt.status === 1) {
      console.log(chalk.green(`✅ Send Library set successfully!`));
      console.log(chalk.cyan(`Block: ${sendReceipt.blockNumber}`));
    } else {
      console.log(chalk.red(`❌ Send Library transaction reverted!`));
      return false;
    }

    // Set receive library on Endpoint from remote chain
    console.log(chalk.blue("\n⏳ Setting Receive Library on Endpoint..."));
    const receiveTx = await endpoint.setReceiveLibrary(oftAddress, remoteEid, receiveLib, 0, {
      gasLimit: 500000,
    });
    console.log(chalk.cyan(`Transaction: ${receiveTx.hash}`));
    const receiveReceipt = await receiveTx.wait();

    if (receiveReceipt.status === 1) {
      console.log(chalk.green(`✅ Receive Library set successfully!`));
      console.log(chalk.cyan(`Block: ${receiveReceipt.blockNumber}\n`));
      return true;
    } else {
      console.log(chalk.red(`❌ Receive Library transaction reverted!`));
      return false;
    }
  } catch (err) {
    console.log(chalk.red(`\n❌ Error: ${err.message}`));
    return false;
  }
}

async function main() {
  if (!process.env.PRIVATE_KEY) {
    console.log(chalk.red("❌ PRIVATE_KEY not set"));
    process.exit(1);
  }

  const network = process.argv[2] || "base";
  if (!["base", "arbitrum"].includes(network)) {
    console.log(chalk.red("❌ Invalid network"));
    process.exit(1);
  }

  const success = await setLibrariesOnEndpoint(network);
  if (!success) process.exit(1);
}

main().catch(console.error);
