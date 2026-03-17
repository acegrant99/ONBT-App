import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./config/oft-configuration.json", "utf8"));

const OFT_ADDRESS = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
const ARBITRUM_EID = 30110;

const OFT_ABI = [
  "function send(tuple(uint32 dstEid, bytes32 to, uint256 amountToSendLD, uint256 minAmountToDelegateLD) _sendParam, tuple(uint256 nativeFee, uint256 lzTokenFee) _fee, address _refundAddress) external payable",
  "function quoteSend(tuple(uint32 dstEid, bytes32 to, uint256 amountToSendLD, uint256 minAmountToDelegateLD) _sendParam, bool _payInLzToken) external view returns (tuple(uint256 nativeFee, uint256 lzTokenFee) fee)",
  "function balanceOf(address) view returns (uint256)",
  "function peers(uint32) view returns (bytes32)",
  "function allowanceSD(address,address) view returns (uint64)",
  "function _getEnforcedOptions(uint32 _dstEid) view returns (bytes enforcedOptions)",
];

async function diagnose() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log(`\n╔${"═".repeat(78)}╗`);
  console.log(`║ ${"Diagnosing Cross-Chain Transfer Revert".padEnd(76)} ║`);
  console.log(`╚${"═".repeat(78)}╝\n`);

  const oft = new ethers.Contract(OFT_ADDRESS, OFT_ABI, signer);

  // 1. Check peer
  console.log(`🔍 1. CHECKING PEER CONFIGURATION`);
  console.log(`${"─".repeat(80)}`);
  try {
    const peer = await oft.peers(ARBITRUM_EID);
    console.log(`✅ Peer for EID ${ARBITRUM_EID}: ${peer}`);
    if (peer === ethers.ZeroHash) {
      console.log(`   ⚠️  ISSUE: Peer is zero/not set!`);
    }
  } catch (e) {
    console.log(`❌ Error reading peer:`, e.message);
  }

  // 2. Check balance
  console.log(`\n🔍 2. CHECKING SIGNER BALANCE`);
  console.log(`${"─".repeat(80)}`);
  try {
    const balance = await oft.balanceOf(signer.address);
    console.log(`✅ Balance: ${ethers.formatEther(balance)} ONBT`);
    if (balance === 0n) {
      console.log(`   ⚠️  ISSUE: Balance is zero!`);
    }
  } catch (e) {
    console.log(`❌ Error reading balance:`, e.message);
  }

  // 3. Check ETH balance
  console.log(`\n🔍 3. CHECKING ETH BALANCE FOR GAS`);
  console.log(`${"─".repeat(80)}`);
  try {
    const ethBalance = await ethers.provider.getBalance(signer.address);
    console.log(`✅ ETH Balance: ${ethers.formatEther(ethBalance)} ETH`);
    if (ethBalance < ethers.parseEther("0.001")) {
      console.log(`   ⚠️  ISSUE: Low ETH balance, may not be enough for gas!`);
    }
  } catch (e) {
    console.log(`❌ Error reading ETH balance:`, e.message);
  }

  // 4. Check enforced options
  console.log(`\n🔍 4. CHECKING ENFORCED OPTIONS`);
  console.log(`${"─".repeat(80)}`);
  try {
    const enforcedOptions = await oft._getEnforcedOptions(ARBITRUM_EID);
    console.log(`✅ Enforced Options: ${enforcedOptions}`);
    if (enforcedOptions === "0x") {
      console.log(`   ℹ️  No enforced options configured (default)`);
    } else {
      console.log(`   ℹ️  Custom enforced options found`);
    }
  } catch (e) {
    console.log(`❌ Error reading enforced options:`, e.message);
    console.log(`   ℹ️  Method may not exist or not public`);
  }

  // 5. Try quoteSend with detailed error capture
  console.log(`\n🔍 5. TESTING quoteSend FUNCTION`);
  console.log(`${"─".repeat(80)}`);

  const recipient = signer.address;
  const amount = ethers.parseEther("1");

  const sendParam = {
    dstEid: ARBITRUM_EID,
    to: ethers.zeroPadValue(recipient, 32),
    amountToSendLD: amount,
    minAmountToDelegateLD: amount,
  };

  try {
    console.log(`📝 SendParam:`, JSON.stringify(sendParam, (k, v) => 
      typeof v === "bigint" ? v.toString() : v, 2
    ));
    
    const fee = await oft.quoteSend(sendParam, false);
    console.log(`✅ quoteSend SUCCESSFUL`);
    console.log(`   Native Fee: ${ethers.formatEther(fee.nativeFee)} ETH`);
    console.log(`   LZ Token Fee: ${fee.lzTokenFee.toString()}`);
  } catch (e) {
    console.log(`❌ quoteSend FAILED`);
    console.log(`   Error: ${e.message}`);
    console.log(`   Reason: ${e.reason || "unknown"}`);
    if (e.data) {
      console.log(`   Data: ${e.data}`);
    }
  }

  // 6. Summary
  console.log(`\n${"═".repeat(80)}`);
  console.log(`📋 DIAGNOSIS SUMMARY`);
  console.log(`${"═".repeat(80)}`);
  console.log(`
Possible causes of send() revert:
1. ❓ Peer not configured (check result above)
2. ❓ Enforced options not set (may need DVN configuration)
3. ❓ Message library path not initialized
4. ❓ Send library not properly configured on Endpoint
5. ❓ Receive library not properly configured on Endpoint
6. ❓ Insufficient balance or ETH for gas

Next steps:
- If quoteSend fails: Need to configure enforced options or DVN
- If peer not set: Need to run peer configuration script
- If send succeeds but send() fails: May need path initialization

Check docs/DEPLOYMENT_GUIDE.md for configuration steps.
`);

  console.log(`${"═".repeat(80)}\n`);
}

diagnose()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
