import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";
const ENDPOINT_ABI = [
  "function setSendLibrary(address oapp, uint32 eid, address lib) external",
];

const ERRORS_ABI = [
  "error LZ_Unauthorized()",
  "error LZ_OnlyRegisteredLib()",
  "error LZ_OnlyRegisteredOrDefaultLib()",
  "error LZ_OnlySendLib()",
  "error LZ_OnlyReceiveLib()",
  "error LZ_UnsupportedEid()",
  "error LZ_SameValue()",
];

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  let localOFT;
  let remoteEid;
  let sendLib;

  if (network.chainId === 8453n) {
    localOFT = config.oft.base.address;
    remoteEid = config.oft.arbitrum.lzEid;
    sendLib = config.messageLibraries.base.sendUln;
  } else if (network.chainId === 42161n) {
    localOFT = config.oft.arbitrum.address;
    remoteEid = config.oft.base.lzEid;
    sendLib = config.messageLibraries.arbitrum.sendUln;
  } else {
    throw new Error(`Unsupported network: ${network.chainId}`);
  }

  console.log("Setting send library");
  console.log("OFT:", localOFT);
  console.log("Remote EID:", remoteEid);
  console.log("SendLib:", sendLib);

  const endpoint = new ethers.Contract(ENDPOINT, ENDPOINT_ABI, signer);

  try {
    const tx = await endpoint.setSendLibrary(localOFT, remoteEid, sendLib, {
      gasLimit: 300000,
    });
    console.log("Tx:", tx.hash);
    const receipt = await tx.wait();
    console.log("Confirmed in block:", receipt.blockNumber);
  } catch (error) {
    const iface = new ethers.Interface(ERRORS_ABI);
    console.log("\n❌ setSendLibrary failed");
    console.log("Message:", error.message);
    if (error.data) {
      try {
        const decoded = iface.parseError(error.data);
        console.log("Error:", decoded.name);
      } catch {
        console.log("Error data:", error.data);
      }
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("\n❌ Script failed:", error.message || error);
  process.exit(1);
});
