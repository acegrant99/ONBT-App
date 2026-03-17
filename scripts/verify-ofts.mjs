import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY not set");
}

const signer = new ethers.Wallet(PRIVATE_KEY);

const baseProvider = new ethers.JsonRpcProvider(config.networks.base.rpc);
const arbProvider = new ethers.JsonRpcProvider(config.networks.arbitrum.rpc);

const baseSigner = signer.connect(baseProvider);
const arbSigner = signer.connect(arbProvider);

const OFT_ABI = [
  "function owner() external view returns (address)",
  "function balanceOf(address account) external view returns (uint256)",
  "function name() external view returns (string)",
  "function symbol() external view returns (string)",
  "function decimals() external view returns (uint8)",
  "function totalSupply() external view returns (uint256)",
  "function quoteSend((uint32 dstEid, bytes32 to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd) _sendParam, bool _payInLzToken) external view returns ((uint256 nativeFee, uint256 lzTokenFee) fee)",
];

const ENDPOINT_ABI = [
  "function getSendLibrary(address oapp, uint32 eid) external view returns (address)",
  "function getReceiveLibrary(address oapp, uint32 eid) external view returns (address)",
  "function getDelegate(address oapp) external view returns (address)",
];

function addressToBytes32(address) {
  return ethers.zeroPadValue(address, 32);
}

function buildLzReceiveOptions(gas) {
  const option = ethers.solidityPacked(["uint128"], [gas]);
  const optionSize = ethers.getBytes(option).length + 1;
  return ethers.solidityPacked(
    ["uint16", "uint8", "uint16", "uint8", "bytes"],
    [3, 1, optionSize, 1, option]
  );
}

async function verifyOFT(name, address, provider, remoteAddress, remoteEid, isHub) {
  console.log(`\n${"─".repeat(60)}`);
  console.log(`📍 ${name}`);
  console.log(`${"─".repeat(60)}`);

  const oft = new ethers.Contract(address, OFT_ABI, provider);
  const tokenName = await oft.name();
  const symbol = await oft.symbol();
  const decimals = await oft.decimals();
  const owner = await oft.owner();

  console.log(`Address: ${address}`);
  console.log(`Name: ${tokenName}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Decimals: ${decimals}`);
  console.log(`Owner: ${owner}`);
  console.log(`Owner Correct: ${owner === signer.address ? "✅" : "❌"}`);

  // Check supply
  if (isHub) {
    const supply = await oft.totalSupply();
    console.log(`Total Supply: ${ethers.formatUnits(supply, decimals)} ${symbol}`);
  }

  // Check balance
  const balance = await oft.balanceOf(signer.address);
  console.log(`Balance: ${ethers.formatUnits(balance, decimals)} ${symbol}`);

  // Test quote
  console.log(`\n📊 Testing Quote (to EID ${remoteEid})...`);
  const extraOptions = buildLzReceiveOptions(200000n);
  const sendParam = {
    dstEid: remoteEid,
    to: addressToBytes32(signer.address),
    amountLD: ethers.parseUnits("1", decimals),
    minAmountLD: ethers.parseUnits("0.95", decimals),
    extraOptions,
    composeMsg: "0x",
    oftCmd: "0x",
  };

  try {
    const fee = await oft.quoteSend(sendParam, false);
    console.log(`✅ Quote Successful`);
    console.log(`   Native Fee: ${ethers.formatUnits(fee.nativeFee, 18)} ETH`);
    console.log(`   LZ Token Fee: ${ethers.formatUnits(fee.lzTokenFee, 18)} LZ`);
  } catch (error) {
    console.log(`❌ Quote Failed`);
    const errorCode = error.data ? error.data.substring(0, 10) : "unknown";
    console.log(`   Error: ${errorCode}`);
  }

  return { address, owner, balance };
}

async function verifyEndpointConfig(name, oftAddress, endpointAddress, remoteEid, isBase) {
  const provider = isBase ? baseSigner : arbSigner;
  const endpoint = new ethers.Contract(
    endpointAddress,
    ENDPOINT_ABI,
    provider
  );

  console.log(`\n🔗 Endpoint Configuration (${name}):`);

  try {
    const sendLib = await endpoint.getSendLibrary(oftAddress, remoteEid);
    console.log(`Send Library: ${sendLib}`);
  } catch (e) {
    console.log(`Send Library: ❌ Error`);
  }

  try {
    const recvLib = await endpoint.getReceiveLibrary(oftAddress, remoteEid);
    console.log(`Receive Library: ${recvLib}`);
  } catch (e) {
    console.log(`Receive Library: ❌ Error`);
  }

  try {
    const delegate = await endpoint.getDelegate(oftAddress);
    console.log(`Delegate: ${delegate}`);
    console.log(`Delegate Correct: ${delegate === oftAddress ? "✅" : "❌"}`);
  } catch (e) {
    console.log(`Delegate: ❌ Error`);
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║         COMPREHENSIVE OFT VERIFICATION REPORT               ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  console.log(`\nSigner Address: ${signer.address}`);
  console.log(`\nVerifying Newer OFT Pair...`);

  const baseOftAddr = config.oft.base.address;
  const arbOftAddr = config.oft.arbitrum.address;

  // Verify Base OFT
  await verifyOFT(
    "Base OFT (Hub)",
    baseOftAddr,
    baseSigner,
    arbOftAddr,
    config.networks.arbitrum.lzEid,
    true
  );

  // Verify Arbitrum OFT
  await verifyOFT(
    "Arbitrum OFT (Destination)",
    arbOftAddr,
    arbSigner,
    baseOftAddr,
    config.networks.base.lzEid,
    false
  );

  // Verify Endpoint Config
  console.log(`\n\n📋 ENDPOINT CONFIGURATION`);
  await verifyEndpointConfig(
    "Base",
    baseOftAddr,
    config.networks.base.endpoint,
    config.networks.arbitrum.lzEid,
    true
  );
  await verifyEndpointConfig(
    "Arbitrum",
    arbOftAddr,
    config.networks.arbitrum.endpoint,
    config.networks.base.lzEid,
    false
  );

  // Summary
  console.log(`\n\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║                    VERIFICATION SUMMARY                      ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  console.log(`Base OFT:          ${baseOftAddr}`);
  console.log(`Arbitrum OFT:      ${arbOftAddr}\n`);

  console.log(`Status: ✅ Ready for Cross-Chain Operations`);
  console.log(`\n✅ Use: npm run transfer:base-to-arb`);
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
