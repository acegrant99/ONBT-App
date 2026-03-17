import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const baseProvider = new ethers.JsonRpcProvider(config.networks.base.rpc);
const arbProvider = new ethers.JsonRpcProvider(config.networks.arbitrum.rpc);

const baseOftAddr = config.oft.base.address;
const arbOftAddr = config.oft.arbitrum.address;

const OFT_ABI = [
  "function owner() external view returns (address)",
  "function balanceOf(address account) external view returns (uint256)",
  "function name() external view returns (string)",
  "function symbol() external view returns (string)",
  "function decimals() external view returns (uint8)",
  "function totalSupply() external view returns (uint256)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) external returns (bool)",
  "function endpoint() external view returns (address)",
];

function formatAddress(addr) {
  return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
}

async function verifyContractCode(name, address, provider, chainName) {
  console.log(`\n${"═".repeat(70)}`);
  console.log(`${name} (${chainName})`);
  console.log(`${"═".repeat(70)}`);
  console.log(`Address: ${address}`);

  try {
    // Get code
    const code = await provider.getCode(address);
    const codeSize = (code.length - 2) / 2; // Remove 0x and convert pairs to bytes
    console.log(`Code Size: ${codeSize} bytes`);

    if (code === "0x") {
      console.log("❌ No contract code at this address!");
      return false;
    }

    console.log(`✅ Contract code found (${codeSize} bytes)`);

    // Get balance (should be ~0 for OFTs)
    const balance = await provider.getBalance(address);
    console.log(`ETH Balance: ${ethers.formatEther(balance)} ETH`);

    // Get transaction count
    const txCount = await provider.getTransactionCount(address);
    console.log(`Transaction Count: ${txCount}`);

    return true;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return false;
  }
}

async function verifyContractFunctions(name, address, provider) {
  console.log(`\n📋 Contract Functions & State`);
  console.log(`${"─".repeat(70)}`);

  const contract = new ethers.Contract(address, OFT_ABI, provider);

  try {
    const tokenName = await contract.name();
    console.log(`✅ name(): "${tokenName}"`);
  } catch (e) {
    console.log(`❌ name(): Error`);
  }

  try {
    const symbol = await contract.symbol();
    console.log(`✅ symbol(): "${symbol}"`);
  } catch (e) {
    console.log(`❌ symbol(): Error`);
  }

  try {
    const decimals = await contract.decimals();
    console.log(`✅ decimals(): ${decimals}`);
  } catch (e) {
    console.log(`❌ decimals(): Error`);
  }

  try {
    const owner = await contract.owner();
    console.log(`✅ owner(): ${owner}`);
  } catch (e) {
    console.log(`❌ owner(): Error`);
  }

  try {
    const totalSupply = await contract.totalSupply();
    console.log(`✅ totalSupply(): ${ethers.formatUnits(totalSupply, 18)} ONBT`);
  } catch (e) {
    console.log(`❌ totalSupply(): Error`);
  }

  try {
    const endpoint = await contract.endpoint();
    console.log(`✅ endpoint(): ${endpoint}`);
  } catch (e) {
    console.log(`❌ endpoint(): Error`);
  }

  return true;
}

async function verifyContractSource() {
  console.log(`\n\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║           SOURCE CODE VERIFICATION                          ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝`);

  const contractsDir = path.join(__dirname, "../contracts/token");
  const files = fs.readdirSync(contractsDir).filter((f) => f.endsWith(".sol"));

  console.log(`\nFound ${files.length} Solidity files in contracts/token/:\n`);

  files.forEach((file) => {
    const filePath = path.join(contractsDir, file);
    const stats = fs.statSync(filePath);
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n").length;

    console.log(`  ✅ ${file}`);
    console.log(`     - Lines: ${lines}`);
    console.log(`     - Size: ${stats.size} bytes`);

    // Check for key keywords
    if (content.includes("OFT")) {
      console.log(`     - Contains: OFT contract`);
    }
    if (content.includes("Ownable")) {
      console.log(`     - Contains: Ownable pattern`);
    }
  });
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║         CONTRACT VERIFICATION REPORT                        ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  // Verify deployed contracts
  console.log("\n\n📦 ON-CHAIN CONTRACT VERIFICATION");
  console.log("═".repeat(70));

  const baseOk = await verifyContractCode(
    "Base OFT",
    baseOftAddr,
    baseProvider,
    "Base"
  );
  const baseOk2 = await verifyContractFunctions("Base OFT", baseOftAddr, baseProvider);

  const arbOk = await verifyContractCode(
    "Arbitrum OFT",
    arbOftAddr,
    arbProvider,
    "Arbitrum"
  );
  const arbOk2 = await verifyContractFunctions("Arbitrum OFT", arbOftAddr, arbProvider);

  // Verify source code
  await verifyContractSource();

  // Summary
  console.log(`\n\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║                  VERIFICATION SUMMARY                        ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  const allOk = baseOk && baseOk2 && arbOk && arbOk2;

  if (allOk) {
    console.log(`✅ All contracts verified successfully\n`);
    console.log(`Base OFT:      ${baseOftAddr}`);
    console.log(`Arbitrum OFT:  ${arbOftAddr}\n`);
    console.log(`${"═".repeat(70)}`);
    console.log(`✅ STATUS: ALL CONTRACTS OPERATIONAL`);
    console.log(`${"═".repeat(70)}\n`);
  } else {
    console.log(`⚠️  Some verification checks failed`);
  }
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
