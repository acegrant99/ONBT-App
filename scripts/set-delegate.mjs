import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  let localOFT;
  if (network.chainId === 8453n) {
    localOFT = config.oft.base.address;
  } else if (network.chainId === 42161n) {
    localOFT = config.oft.arbitrum.address;
  } else {
    throw new Error(`Unsupported network: ${network.chainId}`);
  }

  console.log("Setting delegate for OFT:", localOFT);
  console.log("Delegate:", signer.address);

  const oft = await ethers.getContractAt("OmnichainNabatOFT", localOFT);
  const tx = await oft.setDelegate(signer.address);
  console.log("Tx:", tx.hash);
  const receipt = await tx.wait();
  console.log("Confirmed in block:", receipt.blockNumber);
}

main().catch((error) => {
  console.error("\n❌ Set delegate failed:", error.message || error);
  process.exit(1);
});
