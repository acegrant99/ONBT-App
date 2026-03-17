import hre from "hardhat";
const { ethers } = hre;

const BASE_OFT = "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5";
const ARBITRUM_OFT = "0x169aC761Ebb210B5A93B68B44DA394776a7B230C";

const BASE_EID = 30184;
const ARBITRUM_EID = 30110;

const LZ_ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

const MESSAGE_LIB_ABI = [
  "function messageLibType() external view returns (uint8)",
  "function version() external view returns (uint64,uint8,uint8)",
  "function isSupportedEid(uint32 eid) external view returns (bool)"
];

async function printLibInfo(label, lib, eid) {
  console.log(`${label}: ${lib}`);
  if (lib === "0x0000000000000000000000000000000000000000") {
    console.log("  (zero address)");
    return;
  }
  const contract = new ethers.Contract(lib, MESSAGE_LIB_ABI, ethers.provider);
  try {
    const [major, minor, endpointVersion] = await contract.version();
    const libType = await contract.messageLibType();
    const supported = await contract.isSupportedEid(eid);
    console.log(`  version: ${major}.${minor} (endpoint v${endpointVersion})`);
    console.log(`  type: ${libType} (0=SendAndReceive,1=Send,2=Receive)`);
    console.log(`  supportsEid(${eid}): ${supported}`);
  } catch (error) {
    console.log(`  error calling lib: ${error.message}`);
  }
}

async function main() {
  const network = await ethers.provider.getNetwork();
  const endpoint = await ethers.getContractAt(
    "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/IMessageLibManager.sol:IMessageLibManager",
    LZ_ENDPOINT
  );

  let localOFT, localName, remoteEid, remoteName;

  if (network.chainId === 8453n) {
    localOFT = BASE_OFT;
    localName = "Base";
    remoteEid = ARBITRUM_EID;
    remoteName = "Arbitrum";
  } else if (network.chainId === 42161n) {
    localOFT = ARBITRUM_OFT;
    localName = "Arbitrum";
    remoteEid = BASE_EID;
    remoteName = "Base";
  } else {
    throw new Error(`Unsupported network: ${network.chainId}`);
  }

  console.log(`\nLibrary checks on ${localName} for ${remoteName} (EID ${remoteEid})\n`);

  const defaultSend = await endpoint.defaultSendLibrary(remoteEid);
  const defaultReceive = await endpoint.defaultReceiveLibrary(remoteEid);

  const sendLib = await endpoint.getSendLibrary(localOFT, remoteEid);
  const receiveLib = await endpoint.getReceiveLibrary(localOFT, remoteEid);

  await printLibInfo("Default Send Library", defaultSend, remoteEid);
  await printLibInfo("Default Receive Library", defaultReceive, remoteEid);
  console.log();
  await printLibInfo("OFT Send Library", sendLib, remoteEid);
  await printLibInfo("OFT Receive Library", receiveLib[0], remoteEid);
}

main().catch((error) => {
  console.error("\n❌ Check failed:", error.message || error);
  process.exit(1);
});
