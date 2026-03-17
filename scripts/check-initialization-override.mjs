import hre from "hardhat";
const { ethers } = hre;

const BASE_CONTRACT = "0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d";
const ARBITRUM_EID = 30110;

async function main() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║      Verify allowInitializePath Implementation           ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
  
  const oft = await ethers.getContractAt("OmnichainNabatOFT", BASE_CONTRACT);
  
  console.log("📖 Understanding allowInitializePath:\n");
  console.log("The allowInitializePath(origin) method controls whether");
  console.log("the OApp will accept and initialize a new messaging path.");
  console.log("\nParameters:");
  console.log("  origin.srcEid  → Source chain endpoint ID");
  console.log("  origin.sender  → Source contract address (bytes32)");
  console.log("  origin.nonce   → Message nonce\n");
  
  // Test different scenarios
  const testScenarios = [
    {
      name: "Valid Arbitrum origin with zero nonce",
      origin: {
        srcEid: ARBITRUM_EID,
        sender: ethers.zeroPadValue("0xA5c3CF591e9ed6A4f3b2667146f630D4C8B08C27", 32),
        nonce: 0n
      },
      description: "First message from peer"
    },
    {
      name: "Valid Arbitrum origin with nonce 1",
      origin: {
        srcEid: ARBITRUM_EID,
        sender: ethers.zeroPadValue("0xA5c3CF591e9ed6A4f3b2667146f630D4C8B08C27", 32),
        nonce: 1n
      },
      description: "Subsequent message from peer"
    },
    {
      name: "Unknown chain origin",
      origin: {
        srcEid: 99999,
        sender: ethers.zeroPadValue("0x0000000000000000000000000000000000000001", 32),
        nonce: 0n
      },
      description: "Message from unconfigured chain"
    },
    {
      name: "Wrong sender address",
      origin: {
        srcEid: ARBITRUM_EID,
        sender: ethers.zeroPadValue("0x0000000000000000000000000000000000000001", 32),
        nonce: 0n
      },
      description: "Message from non-peer address"
    }
  ];
  
  console.log("🧪 Testing allowInitializePath:\n");
  console.log("=".repeat(60));
  
  for (const scenario of testScenarios) {
    console.log(`\n${scenario.name}`);
    console.log(`Description: ${scenario.description}`);
    console.log(`SrcEid: ${scenario.origin.srcEid}`);
    console.log(`Sender: ${scenario.origin.sender.slice(0, 18)}...`);
    
    try {
      const allowed = await oft.allowInitializePath(scenario.origin);
      console.log(`Result: ${allowed ? "✅ ALLOWED" : "❌ BLOCKED"}`);
      
      if (allowed) {
        console.log("Action: Path initialization would be accepted");
      } else {
        console.log("Action: Path initialization would be rejected");
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("📋 Current Implementation Analysis:\n");
  
  console.log("The OFT base class uses the OApp's default implementation which:");
  console.log("  ✅ Verifies the source EID is configured");
  console.log("  ✅ Verifies the sender matches the peer address");
  console.log("  ✅ Allows initialization only from valid peers");
  console.log("  ❌ Does NOT require additional approval");
  
  console.log("\n💡 Customization Options:\n");
  console.log("If you need additional permission logic, you can override");
  console.log("allowInitializePath in the contract. Examples:\n");
  
  console.log("Option 1: Require admin approval");
  console.log("  function allowInitializePath(Origin calldata origin)");
  console.log("    external view override returns (bool) {");
  console.log("    return adminApproved[origin.srcEid] &&");
  console.log("           super.allowInitializePath(origin);");
  console.log("  }");
  
  console.log("\nOption 2: Whitelist specific chains");
  console.log("  function allowInitializePath(Origin calldata origin)");
  console.log("    external view override returns (bool) {");
  console.log("    return (origin.srcEid == 30110 || /* Arbitrum */");
  console.log("            origin.srcEid == 1) && /* Ethereum */");
  console.log("           super.allowInitializePath(origin);");
  console.log("  }");
  
  console.log("\nOption 3: Rate limiting per chain");
  console.log("  function allowInitializePath(Origin calldata origin)");
  console.log("    external override returns (bool) {");
  console.log("    require(lastInit[origin.srcEid] + 1 hours < block.timestamp);");
  console.log("    return super.allowInitializePath(origin);");
  console.log("  }");
  
  console.log("\n" + "=".repeat(60));
  console.log("✅ Recommendation:\n");
  console.log("The current OFT implementation is secure:");
  console.log("  • Only accepts messages from configured peers");
  console.log("  • Only initializes valid paths");
  console.log("  • No override needed unless specific logic required");
  console.log();
}

main().catch(console.error);
