import chalk from "chalk";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

// Arbitrum registered libraries provided by user
const ARBITRUM_SEND_LIB = "0x1ccBf0db9C192d969de57E25B3fF09A25bb1D862";
const ARBITRUM_RECEIVE_LIB = "0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6"; // Try this one
const ARBITRUM_OFT = "0x42bB5FD891c070A64d31752855E94A01edDd766E";
const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";
const BASE_EID = 30184;
const ARBITRUM_RPC = "https://arb-mainnet.g.alchemy.com/v2/af7OrK1axwUgV0ss91Vgd";
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

  console.log(chalk.cyan.bold(`Setting Receive Library on Arbitrum`));
  console.log(chalk.cyan.bold(`${"=".repeat(70)}\n`));

  console.log(chalk.yellow(`OFT: ${ARBITRUM_OFT}`));
  console.log(chalk.yellow(`Base EID: ${BASE_EID}`));
  console.log(chalk.yellow(`Receive Library: ${ARBITRUM_RECEIVE_LIB}\n`));

  try {
    console.log(chalk.blue("⏳ Submitting setReceiveLibrary transaction..."));
    const tx = await endpoint.setReceiveLibrary(ARBITRUM_OFT, BASE_EID, ARBITRUM_RECEIVE_LIB, 0, {
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
