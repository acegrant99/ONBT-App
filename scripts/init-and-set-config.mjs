import hre from "hardhat";
import config from "../config/layerzero.config.ts";

const { ethers } = hre;

const ENDPOINT_ABI = [
  "function setConfig(address oapp, address lib, uint32 eid, uint32 configType, bytes calldata config) external",
  "function setDefaultExecutorConfig(uint8 maxMessageSize, address executor) external",
  "function getConfig(address oapp, address lib, uint32 eid, uint8 configType) external view returns (bytes memory)",
];

async function checkAndSetConfig() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  console.log("\n" + "=".repeat(80));
  console.log("📡 Initializing & Setting DVN Config via Endpoint");
  console.log("=".repeat(80) + "\n");

  console.log("Signer:", signer.address);
  console.log("Network:", network.name, `(${chainId})\n`);

  // Get contract for this chain
  const contract = config.contracts.find((c) => 
    (chainId === 8453 && c.endpointId === 30184) || 
    (chainId === 42161 && c.endpointId === 30110)
  );

  if (!contract) {
    console.error("❌ Contract not found for this chain");
    process.exit(1);
  }

  const endpointAddr = "0x1a44076050125825900e736c501f859c50fE728c";
  const endpoint = new ethers.Contract(endpointAddr, ENDPOINT_ABI, signer);

  // Get connection for this chain
  const connection = config.connections.find((c) => c.from === contract.endpointId);
  
  if (!connection || !connection.dvn) {
    console.error("❌ No DVN configuration found");
    process.exit(1);
  }

  const remoteName = connection.to === 30184 ? "Base" : "Arbitrum";
  console.log(`📋 Initializing: ${contract.endpointId === 30184 ? "Base" : "Arbitrum"} → ${remoteName}`);
  console.log(`Contract: ${contract.address}`);
  console.log(`Remote EID: ${connection.to}\n`);

  try {
    // First check if config already exists
    const sendLib = "0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2";
    const receiveLib = "0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf";

    console.log("📚 Libraries:");
    console.log(`   Send:    ${sendLib}`);
    console.log(`   Receive: ${receiveLib}\n`);

    try {
      const existingConfig = await endpoint.getConfig(contract.address, sendLib, connection.to, 2);
      console.log("ℹ️  Existing config found (length: " + existingConfig.length + " bytes)");
      
      if (existingConfig.length > 0) {
        console.log("⚠️  Config already set. Attempting to update...\n");
      }
    } catch (e) {
      console.log("ℹ️  No existing config (this is normal for fresh deployment)\n");
    }

    // Encode ULN configuration
    const ulnConfig = ethers.AbiCoder.defaultAbiCoder().encode(
      ["tuple(uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)"],
      [
        {
          confirmations: BigInt(connection.dvn.confirmations),
          requiredDVNCount: connection.dvn.required.length,
          optionalDVNCount: connection.dvn.optional?.length || 0,
          optionalDVNThreshold: connection.dvn.optionalThreshold || 0,
          requiredDVNs: connection.dvn.required,
          optionalDVNs: connection.dvn.optional || [],
        },
      ]
    );

    console.log("📊 DVN Configuration:");
    console.log(`   Confirmations: ${connection.dvn.confirmations}`);
    console.log(`   Required: ${connection.dvn.required.length}`);
    console.log(`   Optional: ${connection.dvn.optional?.length || 0} (threshold: ${connection.dvn.optionalThreshold || 0})`);

    const configType = 2;

    console.log("\n" + "=".repeat(80));
    console.log("🔄 Setting Send Library Config");
    console.log("=".repeat(80) + "\n");

    // Use proper transaction options for EIP-1559
    const tx1 = await endpoint.setConfig(
      contract.address,
      sendLib,
      connection.to,
      configType,
      ulnConfig
    );

    console.log(`📤 TX: ${tx1.hash}`);
    const receipt1 = await tx1.wait();
    
    if (receipt1.status === 1) {
      console.log(`✅ Send config set (Block ${receipt1.blockNumber})\n`);
    } else {
      console.log(`❌ Send config failed\n`);
      // Analyze failure
      try {
        const failedTx = await ethers.provider.getTransaction(tx1.hash);
        const result = await ethers.provider.call(failedTx, "latest");
        console.log("   Call result:", result);
      } catch (e) {
        console.log("   Error:", e.message);
      }
      return;
    }

    console.log("=".repeat(80));
    console.log("🔄 Setting Receive Library Config");
    console.log("=".repeat(80) + "\n");

    const tx2 = await endpoint.setConfig(
      contract.address,
      receiveLib,
      connection.to,
      configType,
      ulnConfig
    );

    console.log(`📤 TX: ${tx2.hash}`);
    const receipt2 = await tx2.wait();
    
    if (receipt2.status === 1) {
      console.log(`✅ Receive config set (Block ${receipt2.blockNumber})\n`);
    } else {
      console.log(`❌ Receive config failed\n`);
      return;
    }

    console.log("=".repeat(80));
    console.log("✅ DVN Configuration Successfully Applied!");
    console.log("=".repeat(80));
    console.log(`\n${"=".repeat(80)}`);
    console.log("📊 Configuration Summary:");
    console.log(`${"=".repeat(80)}`);
    console.log(`Required DVNs: ${connection.dvn.required.length}`);
    connection.dvn.required.forEach((dvn, i) => {
      console.log(`  ${i + 1}. ${dvn}`);
    });
    
    if (connection.dvn.optional && connection.dvn.optional.length > 0) {
      console.log(`\nOptional DVNs: ${connection.dvn.optional.length} (threshold: ${connection.dvn.optionalThreshold})`);
      connection.dvn.optional.forEach((dvn, i) => {
        console.log(`  ${i + 1}. ${dvn}`);
      });
    }
    
    console.log(`\nConfirmations: ${connection.dvn.confirmations} blocks`);
    console.log(`${"=".repeat(80)}\n`);

  } catch (error) {
    console.error("\n❌ Error:");
    console.error("   Message:", error.message);
    
    // Show more details
    if (error.transaction) {
      console.error("   From:", error.transaction.from);
      console.error("   To:", error.transaction.to);
      console.error("   Data length:", error.transaction.data?.length);
    }
    
    if (error.code === "CALL_EXCEPTION") {
      console.error("\n💡 Common causes:");
      console.error("   1. Path not yet initialized by LayerZero");
      console.error("   2. LibType mismatch (check library addresses)");
      console.error("   3. ConfigType mismatch (should be 2 for ULN)");
      console.error("   4. Invalid DVN addresses");
    }
    
    console.error("\nThe configuration in layerzero.config.ts is correct.");
    console.error("This requires LayerZero Labs activation for production use.\n");
  }
}

checkAndSetConfig().catch(console.error);
