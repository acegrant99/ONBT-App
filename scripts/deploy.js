const hre = require("hardhat");

/**
 * Deployment script for OmnichainNabatOFT
 * 
 * This script deploys the OmnichainNabatOFT contract WITHOUT proxies,
 * following LayerZero V2 OFT standard.
 * 
 * The same contract should be deployed on each chain with the appropriate
 * LayerZero endpoint address for that chain.
 * 
 * LayerZero V2 Endpoints (examples):
 * - Ethereum Mainnet: 0x1a44076050125825900e736c501f859c50fE728c
 * - Polygon: 0x1a44076050125825900e736c501f859c50fE728c
 * - Arbitrum: 0x1a44076050125825900e736c501f859c50fE728c
 * - Optimism: 0x1a44076050125825900e736c501f859c50fE728c
 * - BSC: 0x1a44076050125825900e736c501f859c50fE728c
 * - Avalanche: 0x1a44076050125825900e736c501f859c50fE728c
 * - Base: 0x1a44076050125825900e736c501f859c50fE728c
 * 
 * Note: Verify the correct endpoint address for your target chain
 * at https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts
 */
async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying OmnichainNabatOFT with the account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Configure these values before deployment
  const LAYERZERO_ENDPOINT = process.env.LAYERZERO_ENDPOINT || "0x1a44076050125825900e736c501f859c50fE728c";
  const DELEGATE_ADDRESS = process.env.DELEGATE_ADDRESS || deployer.address;

  console.log("\nDeployment Configuration:");
  console.log("- LayerZero Endpoint:", LAYERZERO_ENDPOINT);
  console.log("- Delegate Address:", DELEGATE_ADDRESS);

  // Deploy OmnichainNabatOFT (NO PROXY - Direct deployment)
  const OmnichainNabatOFT = await hre.ethers.getContractFactory("OmnichainNabatOFT");
  const nabatOFT = await OmnichainNabatOFT.deploy(LAYERZERO_ENDPOINT, DELEGATE_ADDRESS);

  await nabatOFT.waitForDeployment();
  const contractAddress = await nabatOFT.getAddress();

  console.log("\n✅ OmnichainNabatOFT deployed to:", contractAddress);
  console.log("\n📝 IMPORTANT: No proxy contract was deployed (per LayerZero V2 standard)");
  console.log("   - This is the actual implementation contract");
  console.log("   - Deploy the same contract on other chains with their respective endpoints");
  console.log("   - Configure peer addresses after deployment to enable cross-chain transfers");
  
  console.log("\n🔗 Next Steps:");
  console.log("1. Verify the contract on block explorer");
  console.log("2. Deploy on other chains with respective LayerZero endpoints");
  console.log("3. Set peer addresses using setPeer() function");
  console.log("4. Mint initial supply if needed using mint() function");

  return contractAddress;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
