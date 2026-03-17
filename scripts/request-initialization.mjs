import hre from "hardhat";
const { ethers } = hre;

const CONTRACTS = {
  base: "0x7047e54EA5E23Ee8d2693382Ec4500f3426fF3fD",
  arbitrum: "0xb7b38d4E869b55B6E879d8dCF80362d1Fc0939Da",
};

const ENDPOINT_IDS = {
  base: 30184,
  arbitrum: 30110,
};

const MIN_TRANSFER = ethers.parseUnits("0.000001", 18); // 1e12, minimum SD step

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║     Request Path Initialization (OFT send)              ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  let localContract, remoteEid, label;
  if (network.chainId === 8453n) {
    localContract = CONTRACTS.base;
    remoteEid = ENDPOINT_IDS.arbitrum;
    label = "Base → Arbitrum";
  } else if (network.chainId === 42161n) {
    localContract = CONTRACTS.arbitrum;
    remoteEid = ENDPOINT_IDS.base;
    label = "Arbitrum → Base";
  } else {
    console.error("❌ Unsupported network");
    process.exit(1);
  }

  console.log("📍 Path:", label);
  console.log("👤 Sender:", signer.address);
  console.log("📦 Local OFT:", localContract);
  console.log("🧭 Remote EID:", remoteEid);
  console.log("💰 Amount:", ethers.formatUnits(MIN_TRANSFER, 18), "ONBT\n");

  const oft = await ethers.getContractAt("OmnichainNabatOFT", localContract);

  const sendParam = {
    dstEid: remoteEid,
    to: ethers.zeroPadValue(signer.address, 32),
    amountLD: MIN_TRANSFER,
    minAmountLD: MIN_TRANSFER,
    extraOptions: "0x",
    composeMsg: "0x",
    oftCmd: "0x",
  };

  console.log("📊 Quoting fee...");
  let messagingFee;
  try {
    messagingFee = await oft.quoteSend(sendParam, false);
    console.log("✅ Quote ok");
  } catch (e) {
    console.log("⚠️ Quote failed:", e.message);
    const forceFee = process.env.FORCE_NATIVE_FEE;
    if (!forceFee) {
      console.log("\nSet FORCE_NATIVE_FEE to attempt send anyway, for example:");
      console.log("  FORCE_NATIVE_FEE=0.005 npx hardhat run scripts/request-initialization.mjs --network base");
      process.exit(1);
    }
    messagingFee = {
      nativeFee: ethers.parseEther(forceFee),
      lzTokenFee: 0n,
    };
    console.log("⚠️ Using forced native fee:", forceFee, "ETH");
  }

  if (process.env.DRY_RUN === "1") {
    console.log("\nDRY_RUN=1 set. Not sending transaction.");
    process.exit(0);
  }

  console.log("\n🚀 Sending minimal transfer to trigger path initialization...");
  try {
    const tx = await oft.send(sendParam, messagingFee, signer.address, {
      value: messagingFee.nativeFee,
    });
    console.log("📤 Tx sent:", tx.hash);
    console.log("⏳ Waiting for confirmation...");
    const receipt = await tx.wait();
    console.log("✅ Tx status:", receipt.status === 1 ? "SUCCESS" : "FAILED");
  } catch (e) {
    console.error("\n❌ Send failed:", e.message);
    if (e.data) console.error("Data:", e.data);
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("\n❌ Error:", e.message);
    process.exit(1);
  });
