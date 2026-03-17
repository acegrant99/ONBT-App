import hre from "hardhat";
const { ethers } = hre;

const BASE_OFT = "0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD";
const ARBITRUM_OFT = "0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da";
const ARBITRUM_EID = 30110;
const BASE_EID = 30184;

async function main() {
  const network = await ethers.provider.getNetwork();
  const [signer] = await ethers.getSigners();
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║        LayerZero Transfer Error Diagnostics              ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  if (network.chainId !== 8453n) {
    console.error("❌ Must run on Base mainnet");
    process.exit(1);
  }

  const oft = await ethers.getContractAt("OmnichainNabatOFT", BASE_OFT);
  console.log("Contract:", BASE_OFT);
  console.log("Signer:", signer.address);
  
  // Get the OFT address on the destination
  const peerBytes = await oft.peers(ARBITRUM_EID);
  const peer = ethers.getAddress(ethers.toBeHex(peerBytes, 20));
  console.log("\n✅ Peer configured (Arbitrum):", peer);
  
  // Get balance
  const balance = await oft.balanceOf(signer.address);
  console.log("Balance:", ethers.formatUnits(balance, 18), "ONBT");
  
  // Try to build send params
  const amount = ethers.parseUnits("1", 18);
  const recipient = ethers.zeroPadValue(signer.address, 32);
  
  console.log("\n📋 Building send params:");
  console.log("  Amount:", ethers.formatUnits(amount, 18), "ONBT");
  console.log("  Recipient (bytes32):", recipient);
  console.log("  Destination EID:", ARBITRUM_EID);
  
  const sendParam = {
    dstEid: ARBITRUM_EID,
    to: recipient,
    amountLD: amount,
    minAmountLD: amount,
    extraOptions: "0x",
    composeMsg: "0x",
    oftCmd: "0x"
  };
  
  console.log("\n🔍 Checking contract state:");
  
  // Check if endpoint is set
  const endpoint = await oft.endpoint();
  console.log("Endpoint:", endpoint);
  
  // Try quote with detailed error
  console.log("\n📊 Attempting quoteSend...");
  try {
    const quote = await oft.quoteSend(sendParam, false);
    console.log("✅ Quote succeeded!");
    console.log("  Native Fee:", ethers.formatEther(quote.nativeFee), "ETH");
  } catch (e) {
    console.log("❌ Quote failed");
    console.log("  Error:", e.message);
    
    // Try to decode the error
    if (e.data) {
      const selector = e.data.slice(0, 10);
      console.log("  Error selector:", selector);
      
      // Common LayerZero error selectors
      const errors = {
        "0x01760aa9": "PayloadSizeExceeded",
        "0x23d31c89": "InvalidPayloadSize",
        "0x59e61dd0": "UnsupportedOptionType",
        "0x6780cfaf": "SlippageExceeded",
        "0xb98b0f87": "NotInitialized",
        "0xc0ba8001": "PathNotInitialized",
        "0x04475f8c": "ZeroValueAmount"
      };
      
      const errorName = errors[selector] || "Unknown";
      console.log("  Error type:", errorName);
      
      if (selector === "0x6780cfaf") {
        console.log("\n⚠️  SlippageExceeded suggests:");
        console.log("  - Path not initialized by LayerZero Labs");
        console.log("  - Or: Quote amount exceeds available liquidity");
      } else if (selector === "0xc0ba8001" || selector === "0xb98b0f87") {
        console.log("\n⚠️  Path Not Initialized:");
        console.log("  - LayerZero Labs has not initialized this path");
        console.log("  - Contact LayerZero support to initialize");
      }
    }
  }
  
  // Check if we can at least approve
  console.log("\n💳 Checking token approval:");
  const ROUTER = "0x00000000009726632537f433506b348430cdff25"; // LayerZero Router
  const approvalAmount = ethers.parseUnits("100", 18);
  
  try {
    // First, let's check current allowance
    const allowance = await oft.allowance(signer.address, BASE_OFT);
    console.log("Current allowance:", ethers.formatUnits(allowance, 18), "ONBT");
    
    // Try to approve the contract itself (not needed for OFT but for testing)
    console.log("(Skipping approval test - OFT doesn't require approval)");
  } catch (e) {
    console.log("Error checking allowance:", e.message);
  }
  
  console.log("\n📝 Next Steps:");
  console.log("1. Verify peer configuration on both chains:");
  console.log("   npx hardhat run scripts/check-oft-config.mjs --network base");
  console.log("\n2. Check if LayerZero Labs has initialized the path:");
  console.log("   https://layerzeroscan.com/");
  console.log("\n3. Contact LayerZero support if path not initialized");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("\n❌ Error:", e.message);
    process.exit(1);
  });
