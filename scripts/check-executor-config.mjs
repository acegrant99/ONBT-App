import hre from "hardhat";
const { ethers } = hre;

const CONTRACTS = {
  base: "0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d",
  arbitrum: "0xA5c3CF591e9ed6A4f3b2667146f630D4C8B08C27",
};

const ENDPOINT_IDS = {
  base: 30184,
  arbitrum: 30110,
};

// LayerZero V2 Config Types
const CONFIG_TYPE_EXECUTOR = 1;
const CONFIG_TYPE_ULN = 2;

async function checkExecutor(chainName, rpcUrl, contractAddr, remoteEid) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`🔍 ${chainName} Executor Configuration`);
  console.log("=".repeat(60));
  
  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    
    const oft = new ethers.Contract(
      contractAddr,
      ["function endpoint() view returns (address)"],
      provider
    );
    
    const endpointAddr = await oft.endpoint();
    console.log("Endpoint:", endpointAddr);
    
    const endpoint = new ethers.Contract(
      endpointAddr,
      [
        "function getSendLibrary(address, uint32) view returns (address)",
        "function getReceiveLibrary(address, uint32) view returns (address)",
        "function getConfig(address, address, uint32, uint32) view returns (bytes)"
      ],
      provider
    );
    
    // Get send and receive libraries
    const sendLib = await endpoint.getSendLibrary(contractAddr, remoteEid);
    const receiveLib = await endpoint.getReceiveLibrary(contractAddr, remoteEid);
    
    console.log("\n📚 Message Libraries:");
    console.log("  Send Library:", sendLib);
    console.log("  Receive Library:", receiveLib);
    
    // Try to get executor config from send library
    console.log("\n⚙️  Checking Executor Config...");
    
    try {
      // Get executor config (type 1) from the send library
      const executorConfigBytes = await endpoint.getConfig(
        contractAddr,
        sendLib,
        remoteEid,
        CONFIG_TYPE_EXECUTOR
      );
      
      console.log("  Raw config:", executorConfigBytes);
      
      if (executorConfigBytes === "0x" || executorConfigBytes.length <= 2) {
        console.log("  ❌ EXECUTOR NOT CONFIGURED");
        console.log("  💡 This may be why transfers are failing!");
        return false;
      } else {
        console.log("  ✅ Executor config present");
        
        // Try to decode executor config
        // Format: maxMessageSize (uint32) + executor address (address)
        if (executorConfigBytes.length >= 66) {
          const maxMessageSize = parseInt(executorConfigBytes.slice(2, 10), 16);
          const executorAddr = "0x" + executorConfigBytes.slice(executorConfigBytes.length - 40);
          
          console.log("  Max Message Size:", maxMessageSize);
          console.log("  Executor Address:", executorAddr);
        }
        return true;
      }
    } catch (e) {
      console.log("  ⚠️  Could not read executor config");
      console.log("  Error:", e.message);
      return false;
    }
    
    // Try to get ULN config as well
    console.log("\n📡 Checking ULN Config...");
    try {
      const ulnConfigBytes = await endpoint.getConfig(
        contractAddr,
        sendLib,
        remoteEid,
        CONFIG_TYPE_ULN
      );
      
      if (ulnConfigBytes === "0x" || ulnConfigBytes.length <= 2) {
        console.log("  ❌ ULN NOT CONFIGURED");
        return false;
      } else {
        console.log("  ✅ ULN config present");
        console.log("  Config bytes:", ulnConfigBytes.slice(0, 66) + "...");
      }
    } catch (e) {
      console.log("  ⚠️  Could not read ULN config");
    }
    
  } catch (e) {
    console.error("❌ Error:", e.message);
    return false;
  }
}

async function main() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║         LayerZero V2 Executor Configuration Check       ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  
  const baseRpc = process.env.BASE_RPC_URL || "https://mainnet.base.org";
  const arbitrumRpc = process.env.ARBITRUM_RPC_URL || "https://arb1.arbitrum.io/rpc";
  
  const baseHasExecutor = await checkExecutor(
    "Base → Arbitrum",
    baseRpc,
    CONTRACTS.base,
    ENDPOINT_IDS.arbitrum
  );
  
  const arbitrumHasExecutor = await checkExecutor(
    "Arbitrum → Base",
    arbitrumRpc,
    CONTRACTS.arbitrum,
    ENDPOINT_IDS.base
  );
  
  console.log(`\n${"=".repeat(60)}`);
  console.log("📊 Summary");
  console.log("=".repeat(60));
  console.log(`Base Executor: ${baseHasExecutor ? "✅ Configured" : "❌ Missing"}`);
  console.log(`Arbitrum Executor: ${arbitrumHasExecutor ? "✅ Configured" : "❌ Missing"}`);
  
  if (!baseHasExecutor || !arbitrumHasExecutor) {
    console.log("\n⚠️  EXECUTOR CONFIGURATION MISSING!");
    console.log("\nThis is likely the root cause of transfer failures.");
    console.log("\n💡 Solution:");
    console.log("  LayerZero V2 uses default executor configuration managed by LayerZero Labs.");
    console.log("  The path may not be initialized yet for Base ↔ Arbitrum mainnet.");
    console.log("\n📝 Next Steps:");
    console.log("  1. Verify path is live: https://layerzeroscan.com/");
    console.log("  2. Contact LayerZero: https://discord.gg/layerzero");
    console.log("  3. Request path initialization for Base (30184) ↔ Arbitrum (30110)");
  } else {
    console.log("\n✅ Executor configuration looks good!");
    console.log("The issue may be elsewhere (slippage, rate limits, etc.)");
  }
  console.log("");
}

main().catch(console.error);
