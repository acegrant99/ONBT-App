import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";

function addressToBytes32(address) {
  return ethers.zeroPadValue(address, 32);
}

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  let remoteEid;
  let remoteOft;
  let localName;
  let remoteName;

  if (network.chainId === 8453n) {
    remoteEid = config.oft.arbitrum.lzEid;
    remoteOft = config.oft.arbitrum.address;
    localName = "Base";
    remoteName = "Arbitrum";
  } else if (network.chainId === 42161n) {
    remoteEid = config.oft.base.lzEid;
    remoteOft = config.oft.base.address;
    localName = "Arbitrum";
    remoteName = "Base";
  } else {
    throw new Error(`Unsupported network: ${network.chainId}`);
  }

  console.log(`\nEndpoint quote test (${localName} -> ${remoteName})`);
  console.log("Endpoint:", ENDPOINT);
  console.log("Remote EID:", remoteEid);
  console.log("Remote OFT:", remoteOft);

  const endpoint = await ethers.getContractAt(
    "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol:ILayerZeroEndpointV2",
    ENDPOINT
  );

  const params = {
    dstEid: remoteEid,
    receiver: addressToBytes32(remoteOft),
    message: "0x01",
    options: "0x",
    payInLzToken: false
  };

  try {
    const fee = await endpoint.quote(params, signer.address);
    console.log("✅ Endpoint quote ok");
    console.log("Native Fee:", ethers.formatEther(fee.nativeFee));
    console.log("LZ Token Fee:", ethers.formatEther(fee.lzTokenFee));
  } catch (error) {
    console.log("❌ Endpoint quote failed");
    console.log("Message:", error.message);
    if (error.data) {
      console.log("Error data:", error.data);
    }
  }
}

main().catch((error) => {
  console.error("\n❌ Endpoint quote script failed:", error.message || error);
  process.exit(1);
});
