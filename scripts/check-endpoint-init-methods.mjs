import hre from "hardhat";

const { ethers } = hre;

// Comprehensive Endpoint V2 ABI
const ENDPOINT_ABI = [
  // View functions
  "function getSendLibrary(address sender, uint32 dstEid) external view returns (address lib)",
  "function getReceiveLibrary(address receiver, uint32 srcEid) external view returns (address lib)",
  "function delegates(address oapp) external view returns (address)",
  "function lzToken() external view returns (address)",
  
  // Path initialization
  "function setConfig(address oapp, address lib, uint32 eid, uint32 configType, bytes calldata config) external",
  "function initializePathWithinMinGas(address _oapp, uint32 _remoteEid, address _receiveLibrary, uint128 _minGasLimit) external payable",
  "function setNativeCapabilities(address _oapp, uint32 _eid, uint8 _msgType, uint32 _maxBatchSize) external",
  
  // Admin functions
  "function setDefaultSendLibrary(address _library) external",
  "function setDefaultReceiveLibrary(address _library) external",
];

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("\n" + "=".repeat(80));
  console.log("🔍 Endpoint Contract Methods");
  console.log("=".repeat(80) + "\n");

  const endpointAddr = "0x1a44076050125825900e736c501f859c50fE728c";
  const endpoint = new ethers.Contract(endpointAddr, ENDPOINT_ABI, signer);

  let oftAddress, remoteEid;

  if (network.chainId === 8453n) {
    oftAddress = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
    remoteEid = 30110;
    console.log("🔗 Base → Arbitrum");
  } else {
    oftAddress = "0x42bB5FD891c070A64d31752855E94A01edDd766E";
    remoteEid = 30184;
    console.log("🔗 Arbitrum → Base");
  }

  console.log(`OFT: ${oftAddress}`);
  console.log(`Remote EID: ${remoteEid}\n`);

  const sendLib = await endpoint.getSendLibrary(oftAddress, remoteEid);
  const receiveLib = await endpoint.getReceiveLibrary(oftAddress, remoteEid);

  console.log("📚 Libraries:");
  console.log(`   Send:    ${sendLib}`);
  console.log(`   Receive: ${receiveLib}\n`);

  // Try initializePathWithinMinGas
  console.log("🚀 Attempting initializePathWithinMinGas...");
  try {
    const gasEstimate = await endpoint.initializePathWithinMinGas.estimateGas(
      oftAddress,
      remoteEid,
      receiveLib,
      BigInt(1000000) // min gas limit
    );
    console.log(`   ⛽ Gas estimate: ${gasEstimate.toString()}`);

    const tx = await endpoint.initializePathWithinMinGas(
      oftAddress,
      remoteEid,
      receiveLib,
      BigInt(1000000),
      { gasLimit: BigInt(5000000) }
    );

    console.log(`   📤 TX: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`   ✅ Success! Block: ${receipt.blockNumber}\n`);
  } catch (err) {
    console.log(`   ❌ Failed: ${err.message}\n`);
  }

  // Check which method is available
  console.log("💡 Endpoint methods for path initialization:");
  console.log("   1. initializePathWithinMinGas() - new V2 method");
  console.log("   2. setConfig() - for ULN config");
  console.log("   3. setDefaultSendLibrary() - global default\n");
}

main().catch(console.error);
