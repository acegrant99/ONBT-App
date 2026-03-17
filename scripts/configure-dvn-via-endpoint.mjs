import hre from "hardhat";
const { ethers } = hre;

// Mainnet configuration
const CONTRACTS = {
  base: "0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD",
  arbitrum: "0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da",
};

const ENDPOINTS = {
  base: "0x1a44076050125825900e736c501f859c50fE728c",
  arbitrum: "0x1a44076050125825900e736c501f859c50fE728c",
};

const ENDPOINT_IDS = {
  base: 30184,
  arbitrum: 30110,
};

// Message libraries (ULN send/receive)
const LIBRARIES = {
  base: {
    sendULN: "0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2",
    receiveULN: "0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf",
  },
  arbitrum: {
    sendULN: "0x975bcD720be66659e3EB3C0e4F1866a3020E493A",
    receiveULN: "0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6",
  },
};

// Updated DVN configuration (LayerZero + Nethermind)
const DVN_CONFIG = {
  base: {
    confirmations: 10,
    required: [
      "0x9e059a54699a285714207b43B055483E78FAac25", // LayerZero Labs
      "0xa7b5189bca84cd304d8553977c7c614329750d99", // Nethermind
    ],
    optional: [],
  },
  arbitrum: {
    confirmations: 20,
    required: [
      "0x2f55C492897526677C5B68fb199ea31E2c126416", // LayerZero Labs
      "0xa7b5189bca84cd304d8553977c7c614329750d99", // Nethermind
    ],
    optional: [],
  },
};

const CONFIG_TYPE_ULN = 2; // ULN config type

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║     Configure DVN via LayerZero Endpoint                 ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  let localNetwork, remoteEid, localContract, endpoint, lib, dvnCfg;

  if (network.chainId === 8453n) {
    localNetwork = "base";
    remoteEid = ENDPOINT_IDS.arbitrum;
    localContract = CONTRACTS.base;
    endpoint = ENDPOINTS.base;
    lib = LIBRARIES.base;
    dvnCfg = DVN_CONFIG.base;
    console.log("🌐 Network: Base");
  } else if (network.chainId === 42161n) {
    localNetwork = "arbitrum";
    remoteEid = ENDPOINT_IDS.base;
    localContract = CONTRACTS.arbitrum;
    endpoint = ENDPOINTS.arbitrum;
    lib = LIBRARIES.arbitrum;
    dvnCfg = DVN_CONFIG.arbitrum;
    console.log("🌐 Network: Arbitrum");
  } else {
    console.error("❌ Unsupported network");
    process.exit(1);
  }

  console.log("👤 Delegate (Signer):", signer.address);
  console.log("📍 OFT Contract:", localContract);
  console.log("🔗 Endpoint:", endpoint);
  console.log("📡 Remote EID:", remoteEid);
  console.log("📚 Send Library:", lib.sendULN);
  console.log("📚 Receive Library:", lib.receiveULN);

  // Get endpoint instance
  const endpointABI = [
    "function setConfig(address oapp, address lib, uint32 eid, uint8 configType, bytes calldata config) external",
    "function delegates(address oapp) external view returns (address)",
  ];

  const endpointContract = await ethers.getContractAt(endpointABI, endpoint);

  // Verify caller is delegate
  console.log("\n🔍 Checking delegate status...");
  const delegate = await endpointContract.delegates(localContract);
  console.log("   Current delegate:", delegate);

  if (delegate !== signer.address && delegate !== ethers.ZeroAddress) {
    console.error("❌ Error: You are not the delegate for this OFT");
    console.error("   Delegate is:", delegate);
    console.error("   You are:", signer.address);
    process.exit(1);
  }

  // Encode ULN config
  console.log("\n📋 ULN Configuration:");
  console.log("   Confirmations:", dvnCfg.confirmations);
  console.log("   Required DVNs:", dvnCfg.required.length);
  console.log("   - DVN #1:", dvnCfg.required[0]);
  console.log("   - DVN #2:", dvnCfg.required[1]);
  console.log("   Optional DVNs:", dvnCfg.optional.length);

  // Encode as: (uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)
  const ulnConfig = ethers.AbiCoder.defaultAbiCoder().encode(
    [
      "tuple(uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)",
    ],
    [
      {
        confirmations: dvnCfg.confirmations,
        requiredDVNCount: dvnCfg.required.length,
        optionalDVNCount: 0,
        optionalDVNThreshold: 0,
        requiredDVNs: dvnCfg.required,
        optionalDVNs: [],
      },
    ]
  );

  console.log("\n🔄 Setting config via endpoint...");

  try {
    // Set config for Send Library
    console.log("   Setting Send Library config...");
    const tx1 = await endpointContract.setConfig(
      localContract,
      lib.sendULN,
      remoteEid,
      CONFIG_TYPE_ULN,
      ulnConfig
    );
    console.log("   📤 Tx sent:", tx1.hash);
    const receipt1 = await tx1.wait();
    console.log("   ✅ Send config confirmed");

    // Set config for Receive Library
    console.log("   Setting Receive Library config...");
    const tx2 = await endpointContract.setConfig(
      localContract,
      lib.receiveULN,
      remoteEid,
      CONFIG_TYPE_ULN,
      ulnConfig
    );
    console.log("   📤 Tx sent:", tx2.hash);
    const receipt2 = await tx2.wait();
    console.log("   ✅ Receive config confirmed");

    console.log("\n✅ SUCCESS! DVN configuration updated:");
    console.log("   - Required DVNs: 2 (LayerZero Labs + Nethermind)");
    console.log("   - Confirmations: " + dvnCfg.confirmations);
    console.log("   - Applied to both Send and Receive libraries");
  } catch (e) {
    console.error("\n❌ Error:", e.message);
    if (e.data) console.error("Data:", e.data);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("\n❌ Fatal error:", e.message);
    process.exit(1);
  });
