import chalk from "chalk";
import { ethers } from "ethers";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

const CHAINS = config.networks;
const MESSAGE_LIBS = config.messageLibraries;
const ONBT_ADDRESSES = config.oft;

// Encode parameters for manual Etherscan submission

console.log(chalk.cyan.bold("\n" + "=".repeat(80)));
console.log(chalk.cyan.bold("LayerZero OFT Configuration - Etherscan Parameters"));
console.log(chalk.cyan.bold("=".repeat(80) + "\n"));

// Function to encode SetConfigParam
function encodeSetConfigParam(eid, configType, libraryAddress) {
  const encoded = ethers.AbiCoder.defaultAbiCoder().encode(
    ["address"],
    [libraryAddress]
  );

  return {
    eid,
    configType,
    config: encoded,
  };
}

// BASE CONFIGURATION
console.log(chalk.green.bold("\n📍 BASE NETWORK CONFIGURATION\n"));
console.log(`Contract Address: ${chalk.yellow(CHAINS.base.endpoint)}`);
console.log(`Method: ${chalk.yellow("setConfig")}`);
console.log(`\nParameter 1 - oapp (address):`);
console.log(`  ${chalk.cyan(ONBT_ADDRESSES.base.address)}`);

const baseParams = [
  encodeSetConfigParam(
    CHAINS.arbitrum.lzEid,
    1,
    MESSAGE_LIBS.arbitrum.sendUln
  ),
  encodeSetConfigParam(
    CHAINS.arbitrum.lzEid,
    2,
    MESSAGE_LIBS.arbitrum.receiveUln
  ),
];

console.log(`\nParameter 2 - params (SetConfigParam[]):`);
console.log(chalk.gray(JSON.stringify(baseParams, null, 2)));

// ARBITRUM CONFIGURATION
console.log(chalk.green.bold("\n📍 ARBITRUM NETWORK CONFIGURATION\n"));
console.log(`Contract Address: ${chalk.yellow(CHAINS.arbitrum.endpoint)}`);
console.log(`Method: ${chalk.yellow("setConfig")}`);
console.log(`\nParameter 1 - oapp (address):`);
console.log(`  ${chalk.cyan(ONBT_ADDRESSES.arbitrum.address)}`);

const arbParams = [
  encodeSetConfigParam(CHAINS.base.lzEid, 1, MESSAGE_LIBS.base.sendUln),
  encodeSetConfigParam(CHAINS.base.lzEid, 2, MESSAGE_LIBS.base.receiveUln),
];

console.log(`\nParameter 2 - params (SetConfigParam[]):`);
console.log(chalk.gray(JSON.stringify(arbParams, null, 2)));

// ABI FOR ETHERSCAN
const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "oapp",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint32",
            name: "eid",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "configType",
            type: "uint32",
          },
          {
            internalType: "bytes",
            name: "config",
            type: "bytes",
          },
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

console.log(chalk.green.bold("\n📋 ENDPOINT ABI (for Etherscan)\n"));
console.log(chalk.gray(JSON.stringify(abi, null, 2)));

// STEP-BY-STEP INSTRUCTIONS
console.log(chalk.cyan.bold("\n" + "=".repeat(80)));
console.log(chalk.cyan.bold("How to Submit via Etherscan"));
console.log(chalk.cyan.bold("=".repeat(80) + "\n"));

console.log(chalk.yellow("STEP 1: Go to Base Endpoint on Basescan"));
console.log(`  URL: https://basescan.org/address/${CHAINS.base.endpoint}#writeContract`);
console.log(`  \n  1.1 Click "Connect to Web3" and sign in with your wallet`);
console.log(`  1.2 Click "setConfig" function`);
console.log(`  1.3 Copy the ABI above and paste it into Etherscan's Contract ABI field`);
console.log(`  1.4 Enter the parameters:`);
console.log(
  `      - oapp: ${ONBT_ADDRESSES.base.address}`
);
console.log(`      - params: `);
console.log(
  chalk.gray(
    `        ${JSON.stringify(baseParams)}`
  )
);
console.log(`  1.5 Click "Write" and confirm the transaction`);

console.log(chalk.yellow("\n\nSTEP 2: Go to Arbitrum Endpoint on Arbiscan"));
console.log(
  `  URL: https://arbiscan.io/address/${CHAINS.arbitrum.endpoint}#writeContract`
);
console.log(`  \n  (Repeat the same process with Arbitrum parameters)`);
console.log(`  - oapp: ${ONBT_ADDRESSES.arbitrum.address}`);
console.log(`  - params: `);
console.log(chalk.gray(`    ${JSON.stringify(arbParams)}`));

// ENCODED PARAMETERS FOR DIRECT SUBMISSION
console.log(chalk.cyan.bold("\n" + "=".repeat(80)));
console.log(chalk.cyan.bold("Alternative: Pre-Encoded Parameters"));
console.log(chalk.cyan.bold("=".repeat(80) + "\n"));

// Encode the full function call for Raw transaction submission if needed
const iface = new ethers.Interface(abi);
const baseTxData = iface.encodeFunctionData("setConfig", [
  ONBT_ADDRESSES.base.address,
  baseParams,
]);

const arbTxData = iface.encodeFunctionData("setConfig", [
  ONBT_ADDRESSES.arbitrum.address,
  arbParams,
]);

console.log(chalk.yellow("BASE - Full encoded transaction data:\n"));
console.log(chalk.gray(baseTxData));

console.log(chalk.yellow("\n\nARBITRUM - Full encoded transaction data:\n"));
console.log(chalk.gray(arbTxData));

console.log(chalk.cyan.bold("\n" + "=".repeat(80)));
console.log(
  chalk.cyan.bold(
    "After configuration, peers and libraries will be properly set!"
  )
);
console.log(chalk.cyan.bold("=".repeat(80) + "\n"));
