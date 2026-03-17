import hre from "hardhat";
const { ethers } = hre;

const BASE_CONTRACT = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
const BASE_ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║         Check New OFT Deployment on Base                 ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  const [signer] = await ethers.getSigners();
  console.log("📝 Checking as:", signer.address);
  console.log("📍 Contract:", BASE_CONTRACT);
  console.log("🔗 Endpoint:", BASE_ENDPOINT, "\n");

  // Get OFT contract
  const oft = await ethers.getContractAt("OmnichainNabatOFT", BASE_CONTRACT);

  // Check basic info
  console.log("📋 Token Information:");
  try {
    const name = await oft.name();
    const symbol = await oft.symbol();
    const decimals = await oft.decimals();
    const totalSupply = await oft.totalSupply();
    const owner = await oft.owner();
    
    console.log("  Name:", name);
    console.log("  Symbol:", symbol);
    console.log("  Decimals:", decimals.toString());
    console.log("  Total Supply:", ethers.formatEther(totalSupply), "ONBT");
    console.log("  Owner:", owner);
  } catch (e) {
    console.log("  ❌ Error reading token info:", e.message);
  }

  // Check branding
  console.log("\n🎨 Branding Information:");
  try {
    const logoURI = await oft.logoURI();
    const website = await oft.website();
    
    console.log("  Logo URI:", logoURI.substring(0, 50) + "...");
    console.log("  Website:", website);
  } catch (e) {
    console.log("  ❌ Error reading branding:", e.message);
  }

  // Check endpoint
  console.log("\n🔗 LayerZero Configuration:");
  try {
    const endpoint = await oft.endpoint();
    console.log("  Endpoint:", endpoint);
    console.log("  Expected:", BASE_ENDPOINT);
    console.log("  Status:", endpoint === BASE_ENDPOINT ? "✅ Match" : "❌ Mismatch");
  } catch (e) {
    console.log("  ❌ Error reading endpoint:", e.message);
  }

  // Check peers (if Arbitrum is set)
  console.log("\n👥 Peer Configuration:");
  const ARBITRUM_EID = 30110;
  try {
    const peerBytes = await oft.peers(ARBITRUM_EID);
    if (peerBytes === "0x" || peerBytes === "0x0000000000000000000000000000000000000000000000000000000000000000") {
      console.log("  Arbitrum Peer: ❌ Not configured");
    } else {
      console.log("  Arbitrum Peer: ✅ Configured");
      console.log("  Peer bytes32:", peerBytes);
    }
  } catch (e) {
    console.log("  ❌ Error reading peers:", e.message);
  }

  console.log("\n\n✨ Next Steps:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log("1. ⏳ Wait for BaseScan verification to complete");
  console.log("2. 🚀 Deploy to Arbitrum");
  console.log("3. 🔗 Configure peers bidirectionally");
  console.log("4. ⚙️  Set enforced options (200k gas)");
  console.log("5. 🔐 Configure DVN settings");
  console.log("6. 🧪 Test cross-chain transfer\n");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("\n❌ Error:", e.message);
    process.exit(1);
  });
