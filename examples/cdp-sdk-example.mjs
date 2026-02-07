/**
 * Example: Using Coinbase CDP SDK for wallet and contract management
 */

import { 
  initializeCDP, 
  createWallet, 
  getBalance, 
  transferAssets,
  deployContract,
  invokeContract,
  requestFaucetFunds 
} from "../integrations/coinbase/cdp-sdk.mjs";
import hre from "hardhat";
const { ethers } = hre;

async function main() {
  console.log("🏦 Coinbase CDP SDK Example - Wallet & Contract Management\n");

  // Step 1: Initialize CDP
  console.log("Step 1: Initializing CDP SDK...");
  const coinbase = initializeCDP();
  console.log("✅ CDP initialized");

  // Step 2: Create a new wallet
  console.log("\nStep 2: Creating new wallet on Base Sepolia...");
  const wallet = await createWallet(coinbase, "base-sepolia");
  const walletAddress = await wallet.getDefaultAddress();
  console.log("✅ Wallet created!");
  console.log("Address:", walletAddress.toString());

  // Step 3: Request testnet funds
  console.log("\nStep 3: Requesting testnet funds from faucet...");
  const faucet = await requestFaucetFunds(wallet);
  console.log("✅ Faucet request completed!");
  console.log("Transaction:", faucet.transactionHash);
  console.log("Amount received:", faucet.amount);

  // Step 4: Check balance
  console.log("\nStep 4: Checking wallet balance...");
  const balance = await getBalance(wallet, "eth");
  console.log("Current ETH balance:", ethers.formatEther(balance));

  // Step 5: Deploy OFT contract
  console.log("\nStep 5: Deploying OFT contract...");
  
  const NabatOFT = await ethers.getContractFactory("NabatOFT");
  const bytecode = NabatOFT.bytecode;
  
  // Constructor args: name, symbol, sharedDecimals, lzEndpoint
  const constructorArgs = [
    "Nabat CDP Token",
    "NABT-CDP",
    8,
    "0x6EDCE65403992e310A62460808c4b910D972f10f" // Base Sepolia LZ endpoint
  ];
  
  const deployment = await deployContract(wallet, bytecode, constructorArgs);
  console.log("✅ Contract deployed!");
  console.log("Contract address:", deployment.contractAddress);
  console.log("Transaction:", deployment.transactionHash);

  // Step 6: Invoke contract method (mint tokens)
  console.log("\nStep 6: Minting tokens...");
  
  const mintAmount = ethers.parseEther("10000").toString();
  const invocation = await invokeContract(
    wallet,
    deployment.contractAddress,
    "mint",
    [walletAddress.toString(), mintAmount]
  );
  
  console.log("✅ Tokens minted!");
  console.log("Transaction:", invocation.transactionHash);

  // Step 7: Transfer ETH to another address
  console.log("\nStep 7: Transferring ETH...");
  
  const recipientAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"; // Example
  const transferAmount = "0.001"; // 0.001 ETH
  
  const transfer = await transferAssets(
    wallet,
    recipientAddress,
    transferAmount,
    "eth"
  );
  
  console.log("✅ Transfer completed!");
  console.log("Transaction:", transfer.transactionHash);
  console.log("Status:", transfer.status);

  // Step 8: Export wallet for backup
  console.log("\nStep 8: Wallet management...");
  console.log("💾 Export wallet data for backup (seed phrase, private keys)");
  console.log("⚠️  Store securely - never commit to version control!");
  
  const walletData = wallet.export();
  console.log("Wallet ID:", walletData.walletId);
  console.log("Network:", walletData.networkId);

  console.log("\n🎉 CDP SDK example completed!");
  console.log("\n💡 CDP SDK Features:");
  console.log("- Programmatic wallet creation and management");
  console.log("- Smart contract deployment and interaction");
  console.log("- Asset transfers (ETH, ERC20, ERC721)");
  console.log("- Testnet faucet integration");
  console.log("- Multi-chain support");
  console.log("- Transaction monitoring");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
