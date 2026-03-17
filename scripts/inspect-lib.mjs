import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

const LIB_ABI = [
  "function version() external view returns (uint64 major, uint8 minor, uint8 endpointVersion)",
  "function messageLibType() external view returns (uint8)",
  "function isSupportedEid(uint32) external view returns (bool)",
];

async function main() {
  const network = await ethers.provider.getNetwork();

  let sendLib;
  let receiveLib;
  let remoteEid;

  if (network.chainId === 8453n) {
    sendLib = config.messageLibraries.base.sendUln;
    receiveLib = config.messageLibraries.base.receiveUln;
    remoteEid = config.oft.arbitrum.lzEid;
  } else if (network.chainId === 42161n) {
    sendLib = config.messageLibraries.arbitrum.sendUln;
    receiveLib = config.messageLibraries.arbitrum.receiveUln;
    remoteEid = config.oft.base.lzEid;
  } else {
    throw new Error(`Unsupported network: ${network.chainId}`);
  }

  console.log("Network:", network.chainId.toString());
  console.log("Send lib:", sendLib);
  console.log("Receive lib:", receiveLib);
  console.log("Remote EID:", remoteEid);

  const send = new ethers.Contract(sendLib, LIB_ABI, ethers.provider);
  const recv = new ethers.Contract(receiveLib, LIB_ABI, ethers.provider);

  try {
    const version = await send.version();
    const libType = await send.messageLibType();
    const supported = await send.isSupportedEid(remoteEid);
    console.log("\nSend lib version:", version);
    console.log("Send lib type:", libType.toString());
    console.log("Send lib supports eid:", supported);
  } catch (error) {
    console.log("\nSend lib call failed:", error.message);
  }

  try {
    const version = await recv.version();
    const libType = await recv.messageLibType();
    const supported = await recv.isSupportedEid(remoteEid);
    console.log("\nReceive lib version:", version);
    console.log("Receive lib type:", libType.toString());
    console.log("Receive lib supports eid:", supported);
  } catch (error) {
    console.log("\nReceive lib call failed:", error.message);
  }
}

main().catch((error) => {
  console.error("\n❌ Inspect lib failed:", error.message || error);
  process.exit(1);
});
