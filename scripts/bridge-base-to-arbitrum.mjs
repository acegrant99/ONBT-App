import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findLatestDeployment(network) {
  const deployDir = path.join(__dirname, "..", "deploy");
  const files = fs.readdirSync(deployDir);
  const deploymentFiles = files
    .filter(f => f.startsWith("deployment-lzv2-") && f.includes(network) && f.endsWith(".json"))
    .sort()
    .reverse();

  if (deploymentFiles.length === 0) {
    throw new Error(`No deployment files found for ${network}`);
  }

  const latestFile = path.join(deployDir, deploymentFiles[0]);
  return JSON.parse(fs.readFileSync(latestFile, "utf8"));
}

const ARBITRUM_EID = 30110; // LayerZero V2 endpoint ID for Arbitrum
const AMOUNT = ethers.utils.parseEther(process.env.BRIDGE_AMOUNT || "1000000");

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const recipient = signer.address; // Send to self on Arbitrum
  
  console.log("\n╔═══════════════════════════════════════════════════════════════════╗");
  console.log("║         Bridge ONBT: Base → Arbitrum (LayerZero V2)             ║");
  console.log("╚═══════════════════════════════════════════════════════════════════╝\n");
  
  // Verify we're on Base
  if (Number(network.chainId) !== 8453) {
    console.error("❌ ERROR: This script must be run on Base network");
    console.error("   Current network:", network.name, `(${network.chainId})`);
    console.error("\n   Run: npx hardhat run scripts/bridge-base-to-arbitrum.mjs --network base");
    return;
  }
  
  console.log("📍 Source Chain: Base (8453)");
  console.log("📍 Destination: Arbitrum (42161)");
  console.log("📝 Sender:", signer.address);
  console.log("📝 Recipient:", recipient);
  const baseDeployment = findLatestDeployment("base");
  const arbDeployment = findLatestDeployment("arbitrum");
  const BASE_CONTRACT = baseDeployment.contracts.onbtToken;
  const ARBITRUM_CONTRACT = arbDeployment.contracts.onbtToken;

  console.log("💰 Amount:", ethers.utils.formatEther(AMOUNT), "ONBT");
  console.log("🔗 Base Contract:", BASE_CONTRACT);
  console.log("🔗 Arbitrum Contract:", ARBITRUM_CONTRACT);
  console.log("");
  
  // Get OFT contract on Base
  const oft = await ethers.getContractAt("OmnichainNabatOFT", BASE_CONTRACT);
  
  // Check balance
  const balanceBefore = await oft.balanceOf(signer.address);
  console.log("💼 Current Balance:", ethers.utils.formatEther(balanceBefore), "ONBT");
  
  if (balanceBefore.lt(AMOUNT)) {
    console.error("\n❌ ERROR: Insufficient balance");
    console.error(`   Required: ${ethers.utils.formatEther(AMOUNT)} ONBT`);
    console.error(`   Available: ${ethers.utils.formatEther(balanceBefore)} ONBT`);
    return;
  }
  
  // Verify peer is configured
  console.log("\n🔍 Verifying peer configuration...");
  try {
    const peerBytes = await oft.peers(ARBITRUM_EID);
    const peerAddress = ethers.utils.getAddress("0x" + peerBytes.slice(26));
    
    if (peerAddress.toLowerCase() !== ARBITRUM_CONTRACT.toLowerCase()) {
      console.error("❌ ERROR: Peer mismatch!");
      console.error(`   Expected: ${ARBITRUM_CONTRACT}`);
      console.error(`   Configured: ${peerAddress}`);
      return;
    }
    console.log("✅ Peer verified:", peerAddress);
  } catch (e) {
    console.error("❌ ERROR: Peer not configured for Arbitrum EID", ARBITRUM_EID);
    console.error("   Run peer configuration first");
    return;
  }
  
  // Prepare send parameters (LayerZero V2 API)
  console.log("\n📊 Preparing LayerZero V2 message...");
  
  const sendParam = {
    dstEid: ARBITRUM_EID,
    to: ethers.utils.hexZeroPad(recipient, 32), // bytes32 recipient address
    amountLD: AMOUNT,
    minAmountLD: AMOUNT, // No slippage for same token
    extraOptions: "0x", // Use default enforced options
    composeMsg: "0x",   // No composed message
    oftCmd: "0x"        // No OFT command
  };
  
  // Quote the LayerZero fee
  console.log("\n💸 Quoting LayerZero messaging fee...");
  
  let messagingFee;
  try {
    const feeResult = await oft.quoteSend(sendParam, false);
    messagingFee = feeResult;
    console.log("✅ Fee quote successful");
    console.log("   Native Fee:", ethers.utils.formatEther(messagingFee.nativeFee), "ETH");
    console.log("   LZ Token Fee:", messagingFee.lzTokenFee.toString());
  } catch (quoteError) {
    console.log("⚠️  Fee quote failed, using estimated fee (0.005 ETH)...");
    console.log("   Error:", quoteError.message);
    messagingFee = {
      nativeFee: ethers.utils.parseEther("0.005"),
      lzTokenFee: 0n
    };
  }
  
  // Check ETH balance for fee
  const ethBalance = await ethers.provider.getBalance(signer.address);
  console.log("\n💰 ETH Balance:", ethers.utils.formatEther(ethBalance), "ETH");
  
  if (ethBalance.lt(messagingFee.nativeFee)) {
    console.error("\n❌ ERROR: Insufficient ETH for LayerZero fee");
    console.error(`   Required: ${ethers.utils.formatEther(messagingFee.nativeFee)} ETH`);
    console.error(`   Available: ${ethers.utils.formatEther(ethBalance)} ETH`);
    return;
  }
  
  // Confirm before sending
  console.log("\n⚠️  READY TO BRIDGE:");
  console.log(`   ${ethers.utils.formatEther(AMOUNT)} ONBT from Base to Arbitrum`);
  console.log(`   Fee: ${ethers.utils.formatEther(messagingFee.nativeFee)} ETH`);
  console.log("");
  
  // Send the cross-chain transaction
  console.log("🚀 Sending cross-chain transaction...");
  
  try {
    const tx = await oft.send(
      sendParam,
      messagingFee,
      signer.address, // refund address for excess fee
      { value: messagingFee.nativeFee }
    );
    
    console.log("\n✅ Transaction submitted!");
    console.log("📤 TX Hash:", tx.hash);
    console.log("⏳ Waiting for confirmation...");
    
    const receipt = await tx.wait();
    
    if (receipt.status === 1) {
      console.log("\n✅ TRANSACTION CONFIRMED!");
      console.log("⛽ Gas Used:", receipt.gasUsed.toString());
      console.log("🧾 Block:", receipt.blockNumber);
      
      // Check updated balance
      const balanceAfter = await oft.balanceOf(signer.address);
      const sent = balanceBefore - balanceAfter;
      
      console.log("\n💼 Balance Update:");
      console.log("   Before:", ethers.utils.formatEther(balanceBefore), "ONBT");
      console.log("   After:", ethers.utils.formatEther(balanceAfter), "ONBT");
      console.log("   Sent:", ethers.utils.formatEther(sent), "ONBT");
      
      console.log("\n⏳ LAYERZERO RELAYING MESSAGE...");
      console.log("   ⏰ Typical delivery time: 1-5 minutes");
      console.log("   📍 Tokens will appear on Arbitrum at:", ARBITRUM_CONTRACT);
      console.log("");
      console.log("🔍 TRACK YOUR TRANSACTION:");
      console.log(`   https://layerzeroscan.com/tx/${tx.hash}`);
      console.log("");
      console.log("📊 CHECK ARBITRUM BALANCE:");
      console.log(`   npx hardhat run scripts/check-balance.mjs --network arbitrum`);
      
    } else {
      console.log("\n❌ TRANSACTION FAILED");
    }
    
  } catch (error) {
    console.error("\n❌ ERROR during transaction:");
    console.error("   Message:", error.message);
    if (error.reason) console.error("   Reason:", error.reason);
    if (error.data) console.error("   Data:", error.data);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ FATAL ERROR:");
    console.error(error);
    process.exit(1);
  });
