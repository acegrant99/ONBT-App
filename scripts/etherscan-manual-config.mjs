import { ethers } from "ethers";

// Configuration
const ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";
const OFT_BASE = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
const OFT_ARBITRUM = "0x42bB5FD891c070A64d31752855E94A01edDd766E";

const ARBITRUM_EID = 30110;
const BASE_EID = 30184;

// Libraries
const BASE_SEND_ULN = "0x7e07A9148E9149e430C6412b79A675028595Ff1f";
const BASE_RECEIVE_ULN = "0x60FccB9b58d5E806ca5Cb8BFCe721c2274609dE4";
const ARB_SEND_ULN = "0x8E60b7b64b63cD56b18ebcECADcb79B04919286e";
const ARB_RECEIVE_ULN = "0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf";

// Create Endpoint ABI for encoding
const ENDPOINT_ABI = [
  "function setSendLibrary(address oapp, uint32 eid, address newLib)",
  "function setReceiveLibrary(address oapp, uint32 eid, address newLib, uint256 gracePeriod)"
];

const iface = new ethers.Interface(ENDPOINT_ABI);

console.log("╔════════════════════════════════════════════════════════════╗");
console.log("║         ETHERSCAN WRITE CONTRACT INSTRUCTIONS              ║");
console.log("╚════════════════════════════════════════════════════════════╝\n");

console.log("📍 ENDPOINT ADDRESS:");
console.log(`   ${ENDPOINT}\n`);

console.log("═══════════════════════════════════════════════════════════════\n");
console.log("STEP 1: Set Send Library - Base → Arbitrum");
console.log("═══════════════════════════════════════════════════════════════\n");

const setBaseSendData = iface.encodeFunctionData(
  "setSendLibrary",
  [OFT_BASE, ARBITRUM_EID, ARB_SEND_ULN]
);

console.log("Function: setSendLibrary");
console.log(`Parameters:`);
console.log(`  1. oapp: ${OFT_BASE}`);
console.log(`  2. eid: ${ARBITRUM_EID} (Arbitrum)`);
console.log(`  3. newLib: ${ARB_SEND_ULN} (Arbitrum SendUln)`);
console.log(`\n✅ Steps:`);
console.log("   1. Go to: https://basescan.org/address/" + ENDPOINT + "#writeContract");
console.log("   2. Click 'Connect to Web3' and connect your wallet");
console.log("   3. Find setSendLibrary function");
console.log("   4. Enter the parameters above");
console.log("   5. Click 'Write' button\n");

console.log("═══════════════════════════════════════════════════════════════\n");
console.log("STEP 2: Set Receive Library - Base ← Arbitrum");
console.log("═══════════════════════════════════════════════════════════════\n");

const setBaseReceiveData = iface.encodeFunctionData(
  "setReceiveLibrary",
  [OFT_BASE, ARBITRUM_EID, ARB_RECEIVE_ULN, 0]
);

console.log("Function: setReceiveLibrary");
console.log(`Parameters:`);
console.log(`  1. oapp: ${OFT_BASE}`);
console.log(`  2. eid: ${ARBITRUM_EID} (Arbitrum)`);
console.log(`  3. newLib: ${ARB_RECEIVE_ULN} (Arbitrum ReceiveUln)`);
console.log(`  4. gracePeriod: 0`);
console.log(`\n✅ Steps:`);
console.log("   1. Go to: https://basescan.org/address/" + ENDPOINT + "#writeContract");
console.log("   2. Find setReceiveLibrary function");
console.log("   3. Enter the parameters above");
console.log("   4. Click 'Write' button\n");

console.log("═══════════════════════════════════════════════════════════════\n");
console.log("STEP 3: Set Send Library - Arbitrum → Base");
console.log("═══════════════════════════════════════════════════════════════\n");

const setArbSendData = iface.encodeFunctionData(
  "setSendLibrary",
  [OFT_ARBITRUM, BASE_EID, BASE_SEND_ULN]
);

console.log("Function: setSendLibrary");
console.log(`Parameters:`);
console.log(`  1. oapp: ${OFT_ARBITRUM}`);
console.log(`  2. eid: ${BASE_EID} (Base)`);
console.log(`  3. newLib: ${BASE_SEND_ULN} (Base SendUln)`);
console.log(`\n✅ Steps:`);
console.log("   1. Go to: https://arbiscan.io/address/" + ENDPOINT + "#writeContract");
console.log("   2. Click 'Connect to Web3' and connect your wallet");
console.log("   3. Find setSendLibrary function");
console.log("   4. Enter the parameters above");
console.log("   5. Click 'Write' button\n");

console.log("═══════════════════════════════════════════════════════════════\n");
console.log("STEP 4: Set Receive Library - Arbitrum ← Base");
console.log("═══════════════════════════════════════════════════════════════\n");

const setArbReceiveData = iface.encodeFunctionData(
  "setReceiveLibrary",
  [OFT_ARBITRUM, BASE_EID, BASE_RECEIVE_ULN, 0]
);

console.log("Function: setReceiveLibrary");
console.log(`Parameters:`);
console.log(`  1. oapp: ${OFT_ARBITRUM}`);
console.log(`  2. eid: ${BASE_EID} (Base)`);
console.log(`  3. newLib: ${BASE_RECEIVE_ULN} (Base ReceiveUln)`);
console.log(`  4. gracePeriod: 0`);
console.log(`\n✅ Steps:`);
console.log("   1. Go to: https://arbiscan.io/address/" + ENDPOINT + "#writeContract");
console.log("   2. Find setReceiveLibrary function");
console.log("   3. Enter the parameters above");
console.log("   4. Click 'Write' button\n");

console.log("═══════════════════════════════════════════════════════════════\n");
console.log("CONFIGURATION SUMMARY");
console.log("═══════════════════════════════════════════════════════════════\n");

console.log("Base Configuration:");
console.log(`  Send Lib (to Arbitrum): ${ARB_SEND_ULN}`);
console.log(`  Receive Lib (from Arbitrum): ${ARB_RECEIVE_ULN}`);
console.log(`  Remote EID: ${ARBITRUM_EID}\n`);

console.log("Arbitrum Configuration:");
console.log(`  Send Lib (to Base): ${BASE_SEND_ULN}`);
console.log(`  Receive Lib (from Base): ${BASE_RECEIVE_ULN}`);
console.log(`  Remote EID: ${BASE_EID}\n`);

console.log("═══════════════════════════════════════════════════════════════\n");
console.log("Advanced: Raw Transaction Data (if needed)");
console.log("═══════════════════════════════════════════════════════════════\n");

console.log("Base - Set Send Library:");
console.log(`  Data: ${setBaseSendData}\n`);

console.log("Base - Set Receive Library:");
console.log(`  Data: ${setBaseReceiveData}\n`);

console.log("Arbitrum - Set Send Library:");
console.log(`  Data: ${setArbSendData}\n`);

console.log("Arbitrum - Set Receive Library:");
console.log(`  Data: ${setArbReceiveData}\n`);
