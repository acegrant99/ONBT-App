import hre from "hardhat";
import config from "../config/layerzero.config.ts";

const { ethers } = hre;

// Endpoint ABI for setConfig
const ENDPOINT_ABI = [
  "function setConfig(address oapp, address lib, uint32 eid, uint8 configType, bytes calldata config) external",
  "function getSendLibrary(address sender, uint32 dstEid) external view returns (address lib)",
  "function getReceiveLibrary(address receiver, uint32 srcEid) external view returns (address lib)",
  "function delegates(address oapp) external view returns (address)",
];

async function configureFromConfigFile() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  console.log("\n" + "=".repeat(80));
  console.log("🚀 Applying DVN Configuration from layerzero.config.ts");
  console.log("=".repeat(80) + "\n");

  console.log("Signer:", signer.address);
  console.log("Network:", network.name, `(${chainId})\n`);

  // Get contract for this chain
  const contract = config.contracts.find((c) => c.endpointId === (chainId === 8453 ? 30184 : 30110));
  if (!contract) {
    console.error("❌ Contract not found for this chain");
    process.exit(1);
  }

  // Get connections starting from this chain
  const connections = config.connections.filter((c) => c.from === contract.endpointId);
  if (connections.length === 0) {
    console.error("❌ No connections found for this chain");
    process.exit(1);
  }

  console.log(`📋 Found ${connections.length} connection(s) from this chain\n`);

  const endpoint = new ethers.Contract(
    chainId === 8453 ? "0x1a44076050125825900e736c501f859c50fE728c" : "0x1a44076050125825900e736c501f859c50fE728c",
    ENDPOINT_ABI,
    signer
  );

  for (const connection of connections) {
    if (!connection.dvn) {
      console.log(`⏭️  Skipping: No DVN config for EID ${connection.to}`);
      continue;
    }

    const remoteName = connection.to === 30184 ? "Base" : "Arbitrum";
    console.log(`\n${"=".repeat(80)}`);
    console.log(`🔗 Configuring DVNs → ${remoteName} (EID ${connection.to})`);
    console.log(`${"=".repeat(80)}`);

    try {
      // Get send and receive libraries
      const sendLib = await endpoint.getSendLibrary(contract.address, connection.to);
      const receiveLib = await endpoint.getReceiveLibrary(contract.address, connection.to);

      console.log(`\n📚 Libraries:`);
      console.log(`   Send:    ${sendLib}`);
      console.log(`   Receive: ${receiveLib}`);

      // Display configuration
      console.log(`\n📊 DVN Configuration:`);
      console.log(`   Confirmations: ${connection.dvn.confirmations}`);
      console.log(`   Required DVNs: ${connection.dvn.required.length}`);
      connection.dvn.required.forEach((dvn, i) => {
        const names = ["LayerZero Labs", "Nethermind", "Other"];
        console.log(`      ${i + 1}. ${dvn}`);
      });

      if (connection.dvn.optional && connection.dvn.optional.length > 0) {
        console.log(`   Optional DVNs: ${connection.dvn.optional.length} (threshold: ${connection.dvn.optionalThreshold})`);
        connection.dvn.optional.forEach((dvn, i) => {
          const names = {
            "0x8DDf0B8B88F1ADba6E3E3c7d546AE06f1B55F5D5": "Polyhedra",
            "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5": "Polyhedra",
            "0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc": "Horizen",
            "0x129Ee430Cb2Ff2A3664C3caD0E8e0a95D09bd04a": "Animoca",
            "0x7863451183e3d3bf6e0fc0a6fb4e99d0e33f51fc": "Animoca",
          };
          const name = names[dvn.toLowerCase()] || "Unknown";
          console.log(`      ${i + 1}. ${name} (${dvn})`);
        });
      }

      // Encode ULN configuration
      const ulnConfig = ethers.AbiCoder.defaultAbiCoder().encode(
        ["tuple(uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)"],
        [
          {
            confirmations: connection.dvn.confirmations,
            requiredDVNCount: connection.dvn.required.length,
            optionalDVNCount: connection.dvn.optional?.length || 0,
            optionalDVNThreshold: connection.dvn.optionalThreshold || 0,
            requiredDVNs: connection.dvn.required,
            optionalDVNs: connection.dvn.optional || [],
          },
        ]
      );

      console.log(`\n⏳ Setting send library config...`);
      const sendTx = await endpoint.setConfig(contract.address, sendLib, connection.to, 2, ulnConfig);
      console.log(`   TX: ${sendTx.hash}`);
      await sendTx.wait();
      console.log(`   ✅ Send config set`);

      console.log(`\n⏳ Setting receive library config...`);
      const receiveTx = await endpoint.setConfig(contract.address, receiveLib, connection.to, 2, ulnConfig);
      console.log(`   TX: ${receiveTx.hash}`);
      await receiveTx.wait();
      console.log(`   ✅ Receive config set`);

      console.log(`\n✅ DVN configuration complete for ${remoteName}`);
    } catch (error) {
      console.error(`\n❌ Error configuring DVNs:`, error.message);
    }
  }

  console.log("\n" + "=".repeat(80));
  console.log("✅ All DVN configurations applied from layerzero.config.ts");
  console.log("=".repeat(80) + "\n");
}

configureFromConfigFile().catch(console.error);
