import hre from "hardhat";
const { ethers } = hre;

// Configuration - Updated for V3 deployment
const CONTRACTS = {
  base: "0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD",
  arbitrum: "0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da",
};

const ENDPOINT_IDS = {
  base: 30184,
  arbitrum: 30110,
};

// Enforced options: gas limit for destination execution
// Type 1 = LZ Receive, Type 2 = LZ Compose
const GAS_LIMIT = 200000; // Gas for lzReceive on destination

function encodeEnforcedOptions(gasLimit) {
  // Options Type 3 encoding: [type(1)][gas(uint128)][value(uint128)]
  // We only set gas, not native value
  const TYPE_3 = 3;
  
  // Encode: 0x0003 (type 3) + gas as uint128 + 0 value
  // Format: 0x0003 + hex(gasLimit, 16 bytes) + hex(0, 16 bytes)
  const encoded = ethers.solidityPacked(
    ["uint16", "uint128", "uint128"],
    [TYPE_3, gasLimit, 0]
  );
  
  return encoded;
}

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║        LayerZero Enforced Options Configuration          ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("📝 Deployer:", signer.address);
  console.log("🌐 Network:", network.name, `(Chain ${network.chainId})\n`);
  
  let localContract, remoteEid;
  
  if (network.chainId === 8453n) {
    localContract = CONTRACTS.base;
    remoteEid = ENDPOINT_IDS.arbitrum;
    console.log("🔧 Configuring Base → Arbitrum enforced options");
  } else if (network.chainId === 42161n) {
    localContract = CONTRACTS.arbitrum;
    remoteEid = ENDPOINT_IDS.base;
    console.log("🔧 Configuring Arbitrum → Base enforced options");
  } else {
    console.error("❌ Unsupported network");
    process.exit(1);
  }
  
  console.log("Local contract:", localContract);
  console.log("Remote EID:", remoteEid);
  console.log("Gas limit:", GAS_LIMIT, "\n");
  
  const oft = await ethers.getContractAt("OmnichainNabatOFT", localContract);
  
  // Encode enforced options
  const enforcedOptions = encodeEnforcedOptions(GAS_LIMIT);
  console.log("Encoded options:", enforcedOptions);
  
  // Create enforced options array for the destination
  // EnforcedOptionParam struct: { eid: uint32, msgType: uint16, options: bytes }
  const enforcedOptionParams = [
    {
      eid: remoteEid,
      msgType: 1, // SEND message type
      options: enforcedOptions
    }
  ];
  
  console.log("\n🔄 Setting enforced options...");
  
  try {
    const tx = await oft.setEnforcedOptions(enforcedOptionParams);
    console.log("📤 Transaction sent:", tx.hash);
    console.log("⏳ Waiting for confirmation...");
    
    const receipt = await tx.wait();
    
    if (receipt.status === 1) {
      console.log("\n✅ SUCCESS!");
      console.log("Gas used:", receipt.gasUsed.toString());
      console.log("\nEnforced options configured!");
      console.log("- Destination will always use", GAS_LIMIT, "gas for lzReceive");
      console.log("- Prevents insufficient gas errors on destination");
    } else {
      console.log("\n❌ Transaction failed");
      process.exit(1);
    }
  } catch (e) {
    console.error("\n❌ Error:", e.message);
    if (e.reason) console.error("Reason:", e.reason);
    process.exit(1);
  }
}

main().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
