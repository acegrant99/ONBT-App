/**
 * Example: Using Coinbase AgentKit to deploy and manage OFT tokens
 * This demonstrates how to use AI agents to automate blockchain operations
 */

import { initializeAgentKit, deployTokenWithAgent, transferWithAgent, getAgentWalletInfo } from "../integrations/coinbase/agentkit.mjs";
import hre from "hardhat";
const { ethers } = hre;

async function main() {
  console.log("🤖 Coinbase AgentKit Example - OFT Token Management\n");

  // Step 1: Initialize AgentKit
  console.log("Step 1: Initializing AgentKit...");
  const agentkit = await initializeAgentKit({
    networkId: "base-sepolia", // Use Base Sepolia testnet
  });

  // Step 2: Get wallet info
  console.log("\nStep 2: Getting agent wallet info...");
  const walletInfo = await getAgentWalletInfo(agentkit);
  console.log("Agent Wallet Address:", walletInfo.address);
  console.log("Current Balance:", walletInfo.balance, "ETH");
  console.log("Network:", walletInfo.networkId);

  // Step 3: Deploy OFT token using agent
  console.log("\nStep 3: Deploying OFT token with agent...");
  
  // Get the OFT contract bytecode
  const NabatOFT = await ethers.getContractFactory("NabatOFT");
  const bytecode = NabatOFT.bytecode;
  
  // Deploy using AgentKit
  const deployment = await deployTokenWithAgent(agentkit, {
    name: "Nabat Agent Token",
    symbol: "NABT-AI",
    initialSupply: ethers.parseEther("1000000").toString(),
  });
  
  console.log("✅ Token deployed at:", deployment.contractAddress);
  console.log("Transaction hash:", deployment.transactionHash);

  // Step 4: Transfer tokens using agent
  console.log("\nStep 4: Transferring tokens with agent...");
  
  const recipientAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"; // Example
  const transferAmount = ethers.parseEther("100").toString();
  
  const transfer = await transferWithAgent(
    agentkit,
    transferAmount,
    deployment.contractAddress,
    recipientAddress
  );
  
  console.log("✅ Transfer completed!");
  console.log("Transaction hash:", transfer.transactionHash);

  // Step 5: Agent can automate recurring tasks
  console.log("\nStep 5: Setting up automated actions...");
  console.log("AgentKit can be configured to:");
  console.log("- Automatically distribute tokens on schedule");
  console.log("- React to on-chain events");
  console.log("- Execute complex multi-step operations");
  console.log("- Integrate with AI models for decision making");

  console.log("\n🎉 AgentKit example completed!");
  console.log("\n💡 Next steps:");
  console.log("1. Integrate with AI models (OpenAI, Anthropic, etc.)");
  console.log("2. Set up automated workflows");
  console.log("3. Create custom agent actions");
  console.log("4. Monitor and log agent activities");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
