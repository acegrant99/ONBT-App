import hre from "hardhat";

const { ethers } = hre;

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("\n" + "=".repeat(80));
  console.log("🚀 Initialize Path Through OFT - Send Minimal Transfer");
  console.log("=".repeat(80));

  let oftAddress, remoteEid, label;

  if (network.chainId === 8453n) {
    oftAddress = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
    remoteEid = 30110;
    label = "Base → Arbitrum";
  } else if (network.chainId === 42161n) {
    oftAddress = "0x42bB5FD891c070A64d31752855E94A01edDd766E";
    remoteEid = 30184;
    label = "Arbitrum → Base";
  } else {
    console.error("❌ Unsupported network");
    process.exit(1);
  }

  console.log(`\n📍 Path: ${label}`);
  console.log(`🧭 Remote EID: ${remoteEid}`);
  console.log(`💼 OFT: ${oftAddress}`);
  console.log(`👤 Signer: ${signer.address}\n`);

  const oft = await ethers.getContractAt("OmnichainNabatOFT", oftAddress);

  // Minimal amount to transfer (1 wei for initialization)
  const minAmount = BigInt(1);

  const sendParam = {
    dstEid: remoteEid,
    to: ethers.zeroPadValue(signer.address, 32),
    amountLD: minAmount,
    minAmountLD: minAmount,
    extraOptions: "0x",
    composeMsg: "0x",
    oftCmd: "0x",
  };

  console.log("📊 Step 1: Trying to quote fee...");
  let messagingFee;

  try {
    messagingFee = await oft.quoteSend(sendParam, false);
    console.log(`✅ Quote successful:`);
    console.log(`   Native fee: ${ethers.formatEther(messagingFee.nativeFee)} ETH`);
    console.log(`   LZ token fee: ${messagingFee.lzTokenFee.toString()}\n`);
  } catch (err) {
    console.log(`⚠️ Quote failed (expected if path not initialized): ${err.message}\n`);
    console.log(`📊 Step 2: Using minimal estimated native fee...\n`);

    // Use a minimal reasonable estimate - try 0.002 ETH first
    messagingFee = {
      nativeFee: ethers.parseEther("0.002"),
      lzTokenFee: 0n,
    };
    console.log(`💰 Estimated fee: ${ethers.formatEther(messagingFee.nativeFee)} ETH`);
  }

  console.log(`\n🚀 Step 3: Sending minimal transfer to initialize path...`);
  console.log(`   Amount: ${minAmount.toString()} wei`);
  console.log(`   Fee: ${ethers.formatEther(messagingFee.nativeFee)} ETH\n`);

  try {
    // Check balance first
    const balance = await oft.balanceOf(signer.address);
    console.log(`   Signer balance: ${ethers.formatUnits(balance, 18)} ONBT`);

    // Approve if needed
    const allowance = await oft.allowance(signer.address, oftAddress);
    if (allowance < minAmount) {
      console.log("\n💳 Approving OFT to spend tokens...");
      const approveTx = await oft.approve(
        oftAddress,
        ethers.parseUnits("1000000", 18)
      );
      const approveReceipt = await approveTx.wait();
      console.log(`   ✅ Approved. Block: ${approveReceipt.blockNumber}`);
    }

    console.log("\n📤 Sending transaction...");
    const tx = await oft.send(
      sendParam,
      messagingFee,
      signer.address,
      { value: messagingFee.nativeFee, gasLimit: 500000 }
    );

    console.log(`   TX Hash: ${tx.hash}`);
    console.log(`   ⏳ Waiting for confirmation...\n`);

    const receipt = await tx.wait();

    if (receipt.status === 1) {
      console.log(`✅ Path Initialization Successful!`);
      console.log(`   Block: ${receipt.blockNumber}`);
      console.log(`   Gas used: ${receipt.gasUsed.toString()}`);

      console.log("\n" + "=".repeat(80));
      console.log("✅ Path is now initialized!");
      console.log("=".repeat(80));
      console.log(`\n🔗 View transaction:`);
      if (network.chainId === 8453n) {
        console.log(`   https://basescan.org/tx/${tx.hash}`);
      } else {
        console.log(`   https://arbiscan.io/tx/${tx.hash}`);
      }
      console.log(`\n💡 Next: Run set-config-via-endpoint.mjs to set DVN configuration\n`);
    } else {
      console.log(`❌ Transaction failed. Status: ${receipt.status}`);
    }
  } catch (err) {
    console.error(`\n❌ Error:`);
    console.error(`   Message: ${err.message}`);
    if (err.data) console.error(`   Data: ${err.data}`);
    process.exit(1);
  }
}

main().catch(console.error);
