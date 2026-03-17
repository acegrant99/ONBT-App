import hre from "hardhat";
const { ethers } = hre;

const BASE_OFT = "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5";
const ARBITRUM_OFT = "0x169aC761Ebb210B5A93B68B44DA394776a7B230C";

const BASE_EID = 30184;
const ARBITRUM_EID = 30110;

const LZ_ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

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

  console.log(`\nSetting default libraries on ${localName} for ${remoteName} (EID ${remoteEid})`);
  console.log("Signer:", signer.address);
  console.log("OFT:", localOFT);

  const endpoint = await ethers.getContractAt(
    "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/IMessageLibManager.sol:IMessageLibManager",
    LZ_ENDPOINT
  );

  const defaultSend = await endpoint.defaultSendLibrary(remoteEid);
  const defaultReceive = await endpoint.defaultReceiveLibrary(remoteEid);

  const currentSend = await endpoint.getSendLibrary(localOFT, remoteEid);
  const currentReceive = await endpoint.getReceiveLibrary(localOFT, remoteEid);

  console.log("Default send:", defaultSend);
  console.log("Current send:", currentSend);
  console.log("Default receive:", defaultReceive);
  console.log("Current receive:", currentReceive[0]);

  if (currentSend.toLowerCase() !== defaultSend.toLowerCase()) {
    console.log("\nUpdating send library to default...");
    const tx = await endpoint.setSendLibrary(localOFT, remoteEid, defaultSend);
    console.log("Tx:", tx.hash);
    await tx.wait();
    console.log("✅ Send library updated.");
  } else {
    console.log("\n✅ Send library already default.");
  }

  if (currentReceive[0].toLowerCase() !== defaultReceive.toLowerCase()) {
    console.log("\nUpdating receive library to default...");
    const tx = await endpoint.setReceiveLibrary(localOFT, remoteEid, defaultReceive, 0);
    console.log("Tx:", tx.hash);
    await tx.wait();
    console.log("✅ Receive library updated.");
  } else {
    console.log("\n✅ Receive library already default.");
  }
}

main().catch((error) => {
  console.error("\n❌ Failed:", error.message || error);
  process.exit(1);
});
