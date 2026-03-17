import hre from "hardhat";

const { ethers } = hre;

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("\n" + "=".repeat(80));
  console.log("🔧 Check V3 OFT vs Current OFT Configuration");
  console.log("=".repeat(80) + "\n");

  // V3 addresses (older version)
  const v3Base = "0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD";
  const currentBase = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";

  const softABI = [
    "function quoteSend((uint32 dstEid, bytes32 to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd) sendParam, bool payInLzToken) external view returns ((uint256 nativeFee, uint256 lzTokenFee) fee)",
    "function endpoint() external view returns (address)",
  ];

  const endpointABI = [
    "function getSendLibrary(address sender, uint32 dstEid) external view returns (address lib)",
    "function getReceiveLibrary(address receiver, uint32 srcEid) external view returns (address lib)",
  ];

  const endpoint = new ethers.Contract("0x1a44076050125825900e736c501f859c50fE728c", endpointABI, signer);

  console.log("🔍 Comparing V3 and Current ONBT on Base:\n");

  const remoteEid = 30110; // Arbitrum

  try {
    console.log("📊 V3 OFT (0x7047...3fD):");
    const v3SendLib = await endpoint.getSendLibrary(v3Base, remoteEid);
    const v3ReceiveLib = await endpoint.getReceiveLibrary(v3Base, remoteEid);
    console.log(`   Send Lib:    ${v3SendLib}`);
    console.log(`   Receive Lib: ${v3ReceiveLib}`);
    
    // Try quoteSend on v3
    try {
      const v3oft = new ethers.Contract(v3Base, softABI, signer);
      const sendParam = {
        dstEid: remoteEid,
        to: ethers.zeroPadValue(signer.address, 32),
        amountLD: BigInt(1),
        minAmountLD: BigInt(1),
        extraOptions: "0x",
        composeMsg: "0x",
        oftCmd: "0x",
      };
      const fee = await v3oft.quoteSend(sendParam, false);
      console.log(`   quoteSend:   ✅ WORKS - ${ethers.formatEther(fee.nativeFee)} ETH`);
    } catch (err) {
      console.log(`   quoteSend:   ❌ FAILS - ${err.message.slice(0, 50)}`);
    }
  } catch (err) {
    console.log(`   Error: ${err.message}`);
  }

  console.log();

  try {
    console.log("📊 Current OFT (0x49CC...f406c):");
    const currentSendLib = await endpoint.getSendLibrary(currentBase, remoteEid);
    const currentReceiveLib = await endpoint.getReceiveLibrary(currentBase, remoteEid);
    console.log(`   Send Lib:    ${currentSendLib}`);
    console.log(`   Receive Lib: ${currentReceiveLib}`);
    
    // Try quoteSend on current
    try {
      const currentOft = new ethers.Contract(currentBase, softABI, signer);
      const sendParam = {
        dstEid: remoteEid,
        to: ethers.zeroPadValue(signer.address, 32),
        amountLD: BigInt(1),
        minAmountLD: BigInt(1),
        extraOptions: "0x",
        composeMsg: "0x",
        oftCmd: "0x",
      };
      const fee = await currentOft.quoteSend(sendParam, false);
      console.log(`   quoteSend:   ✅ WORKS - ${ethers.formatEther(fee.nativeFee)} ETH`);
    } catch (err) {
      console.log(`   quoteSend:   ❌ FAILS - ${err.message.slice(0, 50)}`);
    }
  } catch (err) {
    console.log(`   Error: ${err.message}`);
  }

  console.log("\n💡 If V3 works and current doesn't:");
  console.log("   → V3 has an activated path on LayerZero");
  console.log("   → Current needs to be deployed fresh OR use V3's path\n");
}

main().catch(console.error);
