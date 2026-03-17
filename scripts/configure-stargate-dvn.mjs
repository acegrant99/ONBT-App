import hre from "hardhat";
const { ethers } = hre;

const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";
const CONTRACTS = {
  base: "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c",
  arbitrum: "0x42bB5FD891c070A64d31752855E94A01edDd766E",
};

const DVNS = {
  stargateBase: "0xcdF31d62140204C08853b547E64707110fBC6680",
  stargateArbitrum: "0x5756a74e8e18d8392605ba667171962b2b2826b5",
};

const ENDPOINT_ABI = [
  "function setConfig(address oapp, tuple(uint32 eid, uint32 configType, bytes config)[] calldata params) external",
];

async function configureStargateDVN(networkName) {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log(`\n${"═".repeat(80)}`);
  console.log(`⚙️  CONFIGURE STARGATE DVN FOR ${networkName.toUpperCase()}`);
  console.log(`${"═".repeat(80)}\n`);

  let localOFT, remoteEid, stargateDVN;

  if (networkName === "base") {
    localOFT = CONTRACTS.base;
    remoteEid = 30110;
    stargateDVN = DVNS.stargateBase;

    if (network.chainId !== 8453n) {
      console.error(`❌ Not connected to Base`);
      return false;
    }
  } else {
    localOFT = CONTRACTS.arbitrum;
    remoteEid = 30184;
    stargateDVN = DVNS.stargateArbitrum;

    if (network.chainId !== 42161n) {
      console.error(`❌ Not connected to Arbitrum`);
      return false;
    }
  }

  console.log(`📍 OFT: ${localOFT}`);
  console.log(`📍 Remote EID: ${remoteEid}`);
  console.log(`📍 Stargate DVN: ${stargateDVN}`);
  console.log(`👤 Signer: ${signer.address}\n`);

  const endpoint = new ethers.Contract(ENDPOINT, ENDPOINT_ABI, signer);

  // Try with minimal config - just Stargate DVN
  console.log(`📝 Configuring with Stargate DVN only (no Google Cloud)...`);

  try {
    // Simplifed ULN config with just Stargate
    const sendConfigBytes = ethers.AbiCoder.defaultAbiCoder().encode(
      ["uint64", "uint8", "address[]", "address[]"],
      [
        1, // 1 confirmation
        0, // 0 optional DVNs
        [stargateDVN], // Just Stargate
        [] // No optional DVNs
      ]
    );

    const receiveConfigBytes = ethers.AbiCoder.defaultAbiCoder().encode(
      ["uint64", "uint8", "address[]", "address[]"],
      [
        1, // 1 confirmation
        0, // 0 optional DVNs
        [stargateDVN], // Just Stargate
        [] // No optional DVNs
      ]
    );

    const setConfigParams = [
      {
        eid: remoteEid,
        configType: 1, // ULN_SEND_CONFIG
        config: sendConfigBytes,
      },
      {
        eid: remoteEid,
        configType: 2, // ULN_RECEIVE_CONFIG
        config: receiveConfigBytes,
      },
    ];

    console.log(`⏳ Submitting setConfig transaction...`);
    const tx = await endpoint.setConfig(localOFT, setConfigParams, {
      gasLimit: 500000,
    });

    console.log(`\n✅ TX Hash: ${tx.hash}`);
    console.log(`⏳ Waiting for confirmation...`);

    const receipt = await tx.wait();
    
    if (receipt.status === 1) {
      console.log(`✅ SUCCESS! Stargate DVN configured`);
      console.log(`   Block: ${receipt.blockNumber}`);
      console.log(`   Gas: ${receipt.gasUsed.toString()}`);
      return true;
    } else {
      console.log(`❌ Transaction reverted`);
      return false;
    }
  } catch (e) {
    console.error(`❌ Error: ${e.message}`);
    if (e.data) console.error(`   Data: ${e.data}`);
    return false;
  }
}

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log(`\n╔${"═".repeat(80)}╗`);
  console.log(`║ ${"CONFIGURE STARGATE DVN (MINIMAL)".padEnd(78)} ║`);
  console.log(`╚${"═".repeat(80)}╝`);

  let networkName;
  if (network.chainId === 8453n) {
    networkName = "base";
  } else if (network.chainId === 42161n) {
    networkName = "arbitrum";
  } else {
    console.error(`❌ Unsupported network: ${network.chainId}`);
    process.exit(1);
  }

  const result = await configureStargateDVN(networkName);

  console.log(`\n${"═".repeat(80)}`);
  if (result) {
    console.log(`✅ Run this on the ${networkName === "base" ? "Arbitrum" : "Base"} chain next`);
  } else {
    console.log(`❌ Configuration failed`);
  }
  console.log(`${"═".repeat(80)}\n`);

  process.exit(result ? 0 : 1);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
