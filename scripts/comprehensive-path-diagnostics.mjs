import hre from "hardhat";
const { ethers } = hre;

const BASE_CONTRACT = "0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d";
const ARBITRUM_CONTRACT = "0xA5c3CF591e9ed6A4f3b2667146f630D4C8B08C27";
const BASE_ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";
const ARBITRUM_ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";
const BASE_EID = 30184;
const ARBITRUM_EID = 30110;

// Config types
const CONFIG_TYPE_EXECUTOR = 1;
const CONFIG_TYPE_ULN = 2;

async function checkChain(chainName, rpcUrl, contractAddr, endpoint, localEid, remoteEid, provider) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`📍 ${chainName.toUpperCase()}`);
  console.log("=".repeat(60));
  
  try {
    const p = new ethers.JsonRpcProvider(rpcUrl);
    const oft = new ethers.Contract(
      contractAddr,
      [
        "function endpoint() view returns (address)",
        "function peers(uint32 eid) view returns (bytes32)",
        "function allowInitializePath(tuple(uint32 srcEid, bytes32 sender, uint64 nonce) origin) view returns (bool)"
      ],
      p
    );
    
    const endpointContract = new ethers.Contract(
      endpoint,
      [
        "function eid() view returns (uint32)",
        "function delegates(address oapp) view returns (address)",
        "function getSendLibrary(address oapp, uint32 dstEid) view returns (address)",
        "function getReceiveLibrary(address oapp, uint32 srcEid) view returns (address)",
        "function getConfig(address oapp, address lib, uint32 eid, uint32 configType) view returns (bytes)",
        "function initializable(tuple(uint32 srcEid, bytes32 sender, uint64 nonce) origin, address receiver) view returns (bool)"
      ],
      p
    );
    
    // 1. Verify endpoint
    console.log("\n1️⃣  Endpoint Configuration:");
    const endpointEid = await endpointContract.eid();
    console.log(`   Endpoint Address: ${endpoint}`);
    console.log(`   Endpoint EID: ${endpointEid}`);
    console.log(`   Expected EID: ${localEid}`);
    console.log(`   Match: ${endpointEid === localEid ? "✅" : "❌"}`);
    
    // 2. Check delegate
    console.log("\n2️⃣  Delegate Configuration:");
    const delegate = await endpointContract.delegates(contractAddr);
    console.log(`   Delegate: ${delegate}`);
    if (delegate === ethers.ZeroAddress) {
      console.log(`   Status: ❌ No delegate set!`);
    } else {
      console.log(`   Status: ✅ Delegate configured`);
    }
    
    // 3. Check send library (if source chain)
    if (chainName.toLowerCase() === "base") {
      console.log("\n3️⃣  Send Library Configuration:");
      const sendLib = await endpointContract.getSendLibrary(contractAddr, remoteEid);
      console.log(`   Library: ${sendLib}`);
      if (sendLib === ethers.ZeroAddress) {
        console.log(`   Status: ❌ No send library configured!`);
      } else {
        console.log(`   Status: ✅ Send library set`);
        
        // Get executor config
        try {
          const executorConfig = await endpointContract.getConfig(
            contractAddr,
            sendLib,
            remoteEid,
            CONFIG_TYPE_EXECUTOR
          );
          console.log(`   Executor Config: ${executorConfig}`);
          if (executorConfig && executorConfig !== "0x") {
            console.log(`   Executor Status: ✅ Configured`);
          } else {
            console.log(`   Executor Status: ❌ Not configured`);
          }
        } catch (e) {
          console.log(`   Executor Config: ⚠️ Cannot read (${e.reason || e.message})`);
        }
        
        // Get ULN/DVN config
        try {
          const ulnConfig = await endpointContract.getConfig(
            contractAddr,
            sendLib,
            remoteEid,
            CONFIG_TYPE_ULN
          );
          console.log(`   ULN/DVN Config: ${ulnConfig.slice(0, 66)}...`);
          if (ulnConfig && ulnConfig !== "0x") {
            console.log(`   ULN/DVN Status: ✅ Configured`);
          } else {
            console.log(`   ULN/DVN Status: ❌ Not configured`);
          }
        } catch (e) {
          console.log(`   ULN/DVN Config: ⚠️ Cannot read (${e.reason || e.message})`);
        }
      }
    }
    
    // 4. Check receive library (if destination chain)
    if (chainName.toLowerCase() === "arbitrum") {
      console.log("\n3️⃣  Receive Library Configuration:");
      const receiveLib = await endpointContract.getReceiveLibrary(contractAddr, remoteEid);
      console.log(`   Library: ${receiveLib}`);
      if (receiveLib === ethers.ZeroAddress) {
        console.log(`   Status: ❌ No receive library configured!`);
      } else {
        console.log(`   Status: ✅ Receive library set`);
        
        // Get ULN/DVN config
        try {
          const ulnConfig = await endpointContract.getConfig(
            contractAddr,
            receiveLib,
            remoteEid,
            CONFIG_TYPE_ULN
          );
          console.log(`   ULN/DVN Config: ${ulnConfig.slice(0, 66)}...`);
          if (ulnConfig && ulnConfig !== "0x") {
            console.log(`   ULN/DVN Status: ✅ Configured`);
          } else {
            console.log(`   ULN/DVN Status: ❌ Not configured`);
          }
        } catch (e) {
          console.log(`   ULN/DVN Config: ⚠️ Cannot read (${e.reason || e.message})`);
        }
      }
    }
    
    // 5. Check peer mapping
    console.log("\n4️⃣  Peer Configuration:");
    const peer = await oft.peers(remoteEid);
    console.log(`   Remote EID: ${remoteEid}`);
    console.log(`   Peer Address: ${peer}`);
    if (peer === ethers.ZeroHash) {
      console.log(`   Status: ❌ No peer set!`);
    } else {
      console.log(`   Status: ✅ Peer configured`);
    }
    
    // 6. Check initialization gate
    if (chainName.toLowerCase() === "arbitrum") {
      console.log("\n5️⃣  Initialization Gate:");
      try {
        const origin = {
          srcEid: remoteEid,
          sender: ethers.zeroPadValue(BASE_CONTRACT, 32),
          nonce: 0n
        };
        
        const canInit = await endpointContract.initializable(origin, contractAddr);
        console.log(`   Can Initialize: ${canInit ? "✅ Yes" : "❌ No"}`);
      } catch (e) {
        console.log(`   Can Initialize: ⚠️ Cannot determine (${e.reason || e.message})`);
      }
      
      // Check allowInitializePath
      try {
        const origin = {
          srcEid: remoteEid,
          sender: ethers.zeroPadValue(BASE_CONTRACT, 32),
          nonce: 0n
        };
        
        const allowed = await oft.allowInitializePath(origin);
        console.log(`   OApp Allows: ${allowed ? "✅ Yes" : "❌ No"}`);
      } catch (e) {
        console.log(`   OApp Allows: ⚠️ Cannot determine (${e.reason || e.message})`);
      }
    }
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

async function main() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║      Comprehensive LayerZero V2 Path Diagnostics         ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
  
  // Check Base (Source)
  await checkChain(
    "Base",
    process.env.BASE_RPC_URL || "https://mainnet.base.org",
    BASE_CONTRACT,
    BASE_ENDPOINT,
    BASE_EID,
    ARBITRUM_EID
  );
  
  // Check Arbitrum (Destination)
  await checkChain(
    "Arbitrum",
    process.env.ARBITRUM_RPC_URL || "https://arb1.arbitrum.io/rpc",
    ARBITRUM_CONTRACT,
    ARBITRUM_ENDPOINT,
    ARBITRUM_EID,
    BASE_EID
  );
  
  console.log("\n" + "=".repeat(60));
  console.log("📊 DIAGNOSIS SUMMARY");
  console.log("=".repeat(60));
  console.log("\n✅ = Configured correctly");
  console.log("❌ = Missing or not configured");
  console.log("⚠️  = Cannot determine (may need special access)");
  console.log("\n💡 If all checks pass but transfers still fail:");
  console.log("   → Path exists but is not operational");
  console.log("   → Contact LayerZero: https://discord.gg/layerzero");
  console.log();
}

main().catch(console.error);
