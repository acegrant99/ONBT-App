import hre from "hardhat";
const { ethers } = hre;

const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";
const OFT_BASE = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";

const ENDPOINT_ABI = [
  "function delegates(address oapp) external view returns (address)",
  "function setDelegate(address _delegate) external",
];

const OFT_ABI = [
  "function owner() view returns (address)",
];

async function checkDelegate() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log(`\n╔${"═".repeat(80)}╗`);
  console.log(`║ ${"Check Delegate Configuration".padEnd(78)} ║`);
  console.log(`╚${"═".repeat(80)}╝\n`);

  if (network.chainId !== 8453n) {
    console.error(`❌ Not on Base`);
    process.exit(1);
  }

  console.log(`📍 OFT: ${OFT_BASE}`);
  console.log(`📍 Endpoint: ${ENDPOINT}`);
  console.log(`👤 Signer: ${signer.address}\n`);

  const oft = new ethers.Contract(OFT_BASE, OFT_ABI, signer);
  const endpoint = new ethers.Contract(ENDPOINT, ENDPOINT_ABI, signer);

  // Check OFT owner
  try {
    const owner = await oft.owner();
    console.log(`✅ OFT Owner: ${owner}`);
    console.log(`   Is signer owner: ${owner.toLowerCase() === signer.address.toLowerCase() ? "YES ✓" : "NO ✗"}`);
  } catch (e) {
    console.log(`❌ Could not get OFT owner: ${e.message}`);
  }

  // Check endpoint delegate for OFT
  console.log(`\n${"─".repeat(80)}`);
  try {
    const delegate = await endpoint.delegates(OFT_BASE);
    console.log(`✅ Endpoint Delegate for OFT: ${delegate}`);
    console.log(`   Is signer delegate: ${delegate.toLowerCase() === signer.address.toLowerCase() ? "YES ✓" : "NO ✗"}`);
    
    if (delegate === ethers.ZeroAddress) {
      console.log(`\n⚠️  No delegate set! This might be why setConfig is failing.`);
      console.log(`\n   To fix this, run:`);
      console.log(`   endpoint.setDelegate(signerAddress)`);
    }
  } catch (e) {
    console.log(`❌ Could not get endpoint delegate: ${e.message}`);
  }

  // Try to set delegate
  console.log(`\n${"─".repeat(80)}`);
  console.log(`📝 Attempting to set delegate...\n`);

  try {
    const tx = await endpoint.setDelegate(signer.address, {
      gasLimit: 200000,
    });

    console.log(`⏳ TX: ${tx.hash}`);
    const receipt = await tx.wait();

    if (receipt.status === 1) {
      console.log(`✅ Delegate set successfully!`);
      console.log(`   Block: ${receipt.blockNumber}`);
    } else {
      console.log(`❌ Setting delegate failed`);
    }
  } catch (e) {
    console.log(`⚠️  Error setting delegate: ${e.message.substring(0, 100)}`);
  }

  console.log(`\n${"═".repeat(80)}\n`);
}

checkDelegate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
