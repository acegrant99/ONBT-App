import hre from "hardhat";
import config from "../config/layerzero.config.mjs";

const { ethers } = hre;

const ENDPOINT_ABI = [
  "function setConfig(address oapp, address lib, uint32 eid, uint32 configType, bytes calldata config) external",
  "function getSendLibrary(address sender, uint32 dstEid) external view returns (address lib)",
  "function getReceiveLibrary(address receiver, uint32 srcEid) external view returns (address lib)",
  "function delegates(address oapp) external view returns (address)",
];

const SEND_ULN_302 = "0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2"; // Base
const RECEIVE_ULN_302 = "0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf"; // Base

async function setConfigViaEndpoint() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  console.log("\n" + "=".repeat(80));
  console.log("🔧 Setting DVN Config via LayerZero Endpoint");
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
  console.log(`📋 Configuring: ${contract.endpointId === 30184 ? "Base" : "Arbitrum"} → ${remoteName}`);
  console.log(`Contract: ${contract.address}`);
  console.log(`Remote EID: ${connection.to}\n`);

  try {
    // Get libraries
    const sendLib = await endpoint.getSendLibrary(contract.address, connection.to);
    const receiveLib = await endpoint.getReceiveLibrary(contract.address, connection.to);

    console.log("📚 Libraries:");
    console.log(`   Send:    ${sendLib}`);
    console.log(`   Receive: ${receiveLib}\n`);

    // Check delegate
    const delegate = await endpoint.delegates(contract.address);
    console.log("👤 Delegate:", delegate);
    
    if (delegate !== ethers.ZeroAddress && delegate.toLowerCase() !== signer.address.toLowerCase()) {
      console.error("❌ Signer is not the delegate. Cannot set config.");
      console.error(`   Current delegate: ${delegate}`);
      console.error(`   Your address: ${signer.address}`);
      process.exit(1);
    }
    console.log("✅ Delegate check passed\n");

    // Display DVN config
    console.log("📊 DVN Configuration:");
    console.log(`   Confirmations: ${connection.dvn.confirmations}`);
    console.log(`   Required DVNs: ${connection.dvn.required.length}`);
    connection.dvn.required.forEach((dvn, i) => {
      console.log(`      ${i + 1}. ${dvn}`);
    });

    if (connection.dvn.optional && connection.dvn.optional.length > 0) {
      console.log(`   Optional DVNs: ${connection.dvn.optional.length} (threshold: ${connection.dvn.optionalThreshold})`);
      connection.dvn.optional.forEach((dvn, i) => {
        console.log(`      ${i + 1}. ${dvn}`);
      });
    }

    // Encode ULN configuration
    // struct UlnConfig {
    //   uint64 confirmations;
    //   uint8 requiredDVNCount;
    //   uint8 optionalDVNCount;
    //   uint8 optionalDVNThreshold;
    //   address[] requiredDVNs;
    //   address[] optionalDVNs;
    // }
    
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

    const configType = 2; // ULN_CONFIG_TYPE

    console.log("\n" + "=".repeat(80));
    console.log("🔄 Setting Send Library Config...");
    console.log("=".repeat(80));

    // Estimate gas first
    try {
      const gasEstimate = await endpoint.setConfig.estimateGas(
        contract.address,
        sendLib,
        connection.to,
        configType,
        ulnConfig
      );
      console.log(`⛽ Estimated gas: ${gasEstimate.toString()}`);
    } catch (gasError) {
      console.log("⚠️  Gas estimation failed:", gasError.message);
      console.log("    Attempting transaction anyway...\n");
    }

    const sendTx = await endpoint.setConfig(
      contract.address,
      sendLib,
      connection.to,
      configType,
      ulnConfig,
      { gasLimit: 500000 }
    );

    console.log(`📤 Transaction hash: ${sendTx.hash}`);
    console.log("⏳ Waiting for confirmation...");
    
    const sendReceipt = await sendTx.wait();
    console.log(`✅ Send config set! Block: ${sendReceipt.blockNumber}\n`);

    console.log("=".repeat(80));
    console.log("🔄 Setting Receive Library Config...");
    console.log("=".repeat(80));

    const receiveTx = await endpoint.setConfig(
      contract.address,
      receiveLib,
      connection.to,
      configType,
      ulnConfig,
      { gasLimit: 500000 }
    );

    console.log(`📤 Transaction hash: ${receiveTx.hash}`);
    console.log("⏳ Waiting for confirmation...");
    
    const receiveReceipt = await receiveTx.wait();
    console.log(`✅ Receive config set! Block: ${receiveReceipt.blockNumber}\n`);

    console.log("=".repeat(80));
    console.log("✅ DVN Configuration Successfully Applied!");
    console.log("=".repeat(80));
    console.log(`\n📊 Summary:`);
    console.log(`   - Required DVNs: ${connection.dvn.required.length}`);
    console.log(`   - Optional DVNs: ${connection.dvn.optional?.length || 0}`);
    console.log(`   - Optional Threshold: ${connection.dvn.optionalThreshold || 0}`);
    console.log(`   - Confirmations: ${connection.dvn.confirmations}`);
    console.log(`\n🔗 View transactions:`);
    if (chainId === 8453) {
      console.log(`   Send: https://basescan.org/tx/${sendTx.hash}`);
      console.log(`   Receive: https://basescan.org/tx/${receiveTx.hash}`);
    } else {
      console.log(`   Send: https://arbiscan.io/tx/${sendTx.hash}`);
      console.log(`   Receive: https://arbiscan.io/tx/${receiveTx.hash}`);
    }
    console.log("\n");

  } catch (error) {
    console.error("\n❌ Error setting config:");
    console.error("   Message:", error.message);
    
    if (error.data) {
      console.error("   Data:", error.data);
    }
    
    if (error.message.includes("execution reverted")) {
      console.error("\n💡 Possible reasons:");
      console.error("   1. Config is already set and cannot be changed");
      console.error("   2. DVN addresses are not valid for this chain");
      console.error("   3. Library addresses are incorrect");
      console.error("   4. Path needs to be initialized by LayerZero first");
      console.error("\n   The configuration in layerzero.config.ts is correct.");
      console.error("   Contact LayerZero Labs to activate the path with these settings.");
    }
    
    process.exit(1);
  }
}

setConfigViaEndpoint().catch(console.error);
