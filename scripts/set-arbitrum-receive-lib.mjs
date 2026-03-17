import chalk from "chalk";
import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));
const CHAINS = config.networks;
const MESSAGE_LIBS = config.messageLibraries;
const ARBITRUM_OFT = config.oft.arbitrum.address;
const ENDPOINT = CHAINS.arbitrum.endpoint;
const BASE_EID = CHAINS.base.lzEid;
const BASE_RECEIVE_LIB = MESSAGE_LIBS.base.receiveUln;
const ARBITRUM_RPC = CHAINS.arbitrum.rpc;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const ENDPOINT_ABI = [
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

async function main() {
  const provider = new ethers.JsonRpcProvider(ARBITRUM_RPC);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const endpoint = new ethers.Contract(ENDPOINT, ENDPOINT_ABI, signer);

  console.log(chalk.cyan.bold(`\nSetting Receive Library on Arbitrum`));
  console.log(chalk.cyan.bold(`${"=".repeat(70)}\n`));

  console.log(chalk.yellow(`Blockchain: Arbitrum (EID: ${BASE_EID})`));
  console.log(chalk.yellow(`OFT: ${ARBITRUM_OFT}`));
  console.log(chalk.yellow(`Endpoint: ${ENDPOINT}`));
  console.log(chalk.yellow(`Receive Library: ${BASE_RECEIVE_LIB}\n`));

  try {
    console.log(chalk.blue("⏳ Submitting setReceiveLibrary transaction..."));
    const tx = await endpoint.setReceiveLibrary(ARBITRUM_OFT, BASE_EID, BASE_RECEIVE_LIB, 0, {
      gasLimit: 500000,
    });
    console.log(chalk.cyan(`Transaction: ${tx.hash}`));
    
    const receipt = await tx.wait();
    if (receipt.status === 1) {
      console.log(chalk.green(`✅ Successfully set receive library!`));
      console.log(chalk.cyan(`Block: ${receipt.blockNumber}`));
    } else {
      console.log(chalk.red(`❌ Transaction reverted`));
    }
  } catch (err) {
    console.log(chalk.red(`❌ Error: ${err.message}`));
  }
}

main();
