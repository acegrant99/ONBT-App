import hre from "hardhat";

const { ethers } = hre;

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("\n" + "=".repeat(80));
  console.log("🔍 Diagnose Path Issue");
  console.log("=".repeat(80) + "\n");

  let oftAddress, remoteEid;

  if (network.chainId === 8453n) {
    oftAddress = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
    remoteEid = 30110;
  } else {
    oftAddress = "0x42bB5FD891c070A64d31752855E94A01edDd766E";
    remoteEid = 30184;
  }

  const endpointAddr = "0x1a44076050125825900e736c501f859c50fE728c";
  
  const endpointABI = [
    "function getSendLibrary(address sender, uint32 dstEid) external view returns (address lib)",
    "function getReceiveLibrary(address receiver, uint32 srcEid) external view returns (address lib)",
    "function delegates(address oapp) external view returns (address)",
    "function getDefaultSendLibrary() external view returns (address)",
    "function getDefaultReceiveLibrary() external view returns (address)",
  ];

  const endpoint = new ethers.Contract(endpointAddr, endpointABI, signer);

  console.log("📋 OFT:", oftAddress);
  console.log("🧭 Remote EID:", remoteEid);
  console.log("🔗 Endpoint:", endpointAddr + "\n");

  console.log("✅ Step 1: Check Library Setup");
  try {
    const sendLib = await endpoint.getSendLibrary(oftAddress, remoteEid);
    const receiveLib = await endpoint.getReceiveLibrary(oftAddress, remoteEid);
    console.log(`   Send Library:    ${sendLib}`);
    console.log(`   Receive Library: ${receiveLib}\n`);
  } catch (err) {
    console.log(`   ❌ Error: ${err.message}\n`);
  }

  console.log("✅ Step 2: Check Default Libraries");
  try {
    const defaultSend = await endpoint.getDefaultSendLibrary();
    const defaultReceive = await endpoint.getDefaultReceiveLibrary();
    console.log(`   Default Send:    ${defaultSend}`);
    console.log(`   Default Receive: ${defaultReceive}\n`);
  } catch (err) {
    console.log(`   ⚠️  Not available: ${err.message}\n`);
  }

  console.log("✅ Step 3: Check Delegate");
  try {
    const delegate = await endpoint.delegates(oftAddress);
    console.log(`   Delegate: ${delegate}`);
    console.log(`   Signer:   ${signer.address}`);
    console.log(`   Match:    ${delegate === signer.address ? "✅ YES" : "❌ NO"}\n`);
  } catch (err) {
    console.log(`   ❌ Error: ${err.message}\n`);
  }

  console.log("📊 Step 4: Check OFT Status");
  const oftABI = [
    "function owner() external view returns (address)",
    "function balanceOf(address) external view returns (uint256)",
  ];
  const oft = new ethers.Contract(oftAddress, oftABI, signer);

  try {
    const owner = await oft.owner();
    const balance = await oft.balanceOf(signer.address);
    console.log(`   Owner:         ${owner}`);
    console.log(`   Signer:        ${signer.address}`);
    console.log(`   Is Owner:      ${owner === signer.address ? "✅ YES" : "❌ NO"}`);
    console.log(`   Signer Balance: ${ethers.formatUnits(balance, 18)} ONBT\n`);
  } catch (err) {
    console.log(`   ❌ Error: ${err.message}\n`);
  }

  console.log("🆘 Analysis:");
  console.log("   The path appears to be blocked at the Endpoint level.");
  console.log("   All initialization attempts (send, setConfig) are reverting.");
  console.log("   This typically means LayerZero Labs needs to manually activate the path.\n");

  console.log("💡 Next Steps:");
  console.log("   1. Contact LayerZero Labs via their support portal");
  console.log("   2. Request path activation for:");
  console.log(`      - OFT: ${oftAddress}`);
  console.log(`      - Chain: ${network.name} (ID: ${network.chainId})`);
  console.log(`      - Remote EID: ${remoteEid}`);
  console.log(`      - Send Library: 0x1ccBf0db9C192d969de57E25B3fF09A25bb1D862`);
  console.log(`      - Config: ${network.chainId === 8453 ? "Base → Arbitrum (10 confirmations)" : "Arbitrum → Base (20 confirmations)"}`);
  console.log("\n");
}

main().catch(console.error);
