import hre from "hardhat";

const { ethers } = hre;

const CONTRACTS = {
  8453: "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c",
  42161: "0x42bB5FD891c070A64d31752855E94A01edDd766E",
};

const ENDPOINTS = {
  8453: "0x1a44076050125825900e736c501f859c50fE728c",
  42161: "0x1a44076050125825900e736c501f859c50fE728c",
};

async function checkDelegate() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  console.log("\n" + "=".repeat(70));
  console.log("🔍 Checking Delegate Status");
  console.log("=".repeat(70) + "\n");

  const contractAddr = CONTRACTS[chainId];
  const endpointAddr = ENDPOINTS[chainId];

  if (!contractAddr || !endpointAddr) {
    console.error("❌ Unsupported network");
    return;
  }

  const chainName = chainId === 8453 ? "Base" : "Arbitrum";
  console.log(`Network: ${chainName}`);
  console.log(`Contract: ${contractAddr}`);
  console.log(`Endpoint: ${endpointAddr}`);
  console.log(`Signer: ${signer.address}\n`);

  const endpoint = await ethers.getContractAt(
    ["function delegates(address oapp) external view returns (address)"],
    endpointAddr
  );

  const delegate = await endpoint.delegates(contractAddr);
  console.log("Current delegate:", delegate);

  if (delegate === ethers.ZeroAddress) {
    console.log("\n✅ No delegate set - owner can configure directly");
  } else if (delegate.toLowerCase() === signer.address.toLowerCase()) {
    console.log("\n✅ Signer is the delegate - can configure");
  } else {
    console.log("\n⚠️  Different delegate set");
    console.log("    Only the delegate can call endpoint.setConfig()");
    console.log("    To configure, either:");
    console.log("      1. Use the delegate address");
    console.log("      2. Clear the delegate (set to zero address)");
  }

  console.log("\n" + "=".repeat(70) + "\n");
}

checkDelegate().catch(console.error);
