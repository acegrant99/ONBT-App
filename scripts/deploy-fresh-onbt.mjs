import hre from "hardhat";
const { ethers } = hre;

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║         Fresh ONBT Deployment (Current Contract)          ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("📝 Deployer:", deployer.address);
  console.log("📝 Network:", network.name);
  console.log("📝 Chain ID:", network.chainId.toString());
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Balance:", ethers.formatEther(balance), "ETH\n");

  const lzEndpoint = "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7";
  const totalSupply = ethers.parseEther("1000000000");
  
  console.log("🚀 Deploying new OmnichainNabatOFT instance...\n");
  
  const OmnichainNabatOFT = await ethers.getContractFactory("OmnichainNabatOFT");
  
  const onbt = await OmnichainNabatOFT.deploy(
    lzEndpoint,
    deployer.address,
    totalSupply,
    "ipfs://bafybeiathkcuucabxdrikkk7ew5hryc7bapldu2winwelohc3n6nuuwdwy",
    "https://nabat.finance",
    "ONabat (ONBT) is an immutable omnichain fungible token built on LayerZero. It enables seamless cross-chain transfers across multiple blockchains with a fixed supply of 1 billion tokens and professional branding. Deployed via peer configuration, no proxies needed.",
    JSON.stringify({
      twitter: "https://twitter.com/nabatfinance",
      telegram: "https://t.me/nabatfinance",
      discord: "https://discord.gg/nabatfinance",
      github: "https://github.com/acegrant99/ONBT-App",
      medium: "https://medium.com/@nabatfinance"
    }),
    { gasLimit: 5000000 }
  );

  console.log("⏳ Waiting for deployment transaction...");
  
  // Get deployment transaction
  const deployTx = onbt.deploymentTransaction();
  console.log("📤 TX Hash:", deployTx.hash);
  console.log("🔢 Nonce:", deployTx.nonce);
  
  // Wait for deployment
  await onbt.waitForDeployment();
  const address = await onbt.getAddress();
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                  ✅ DEPLOYMENT SUCCESS!                    ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("📍 NEW Contract Address:", address);
  console.log("🔗 TX Hash:", deployTx.hash);
  console.log("⛽ Gas Used:", deployTx.gasLimit?.toString());
  
  // Verify deployment
  const name = await onbt.name();
  const symbol = await onbt.symbol();
  const supply = await onbt.totalSupply();
  const owner = await onbt.owner();
  
  console.log("\n--- Contract Verification ---");
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Total Supply:", ethers.formatEther(supply), "ONBT");
  console.log("Owner:", owner);
  console.log("Deployer Balance:", ethers.formatEther(await onbt.balanceOf(deployer.address)), "ONBT");
  
  const deploymentInfo = {
    network: network.name,
    chainId: network.chainId.toString(),
    address: address,
    txHash: deployTx.hash,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    gasLimit: deployTx.gasLimit?.toString(),
    supply: ethers.formatEther(supply) + " ONBT"
  };
  
  console.log("\n📋 Deployment Info:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
  
  return deploymentInfo;
}

main()
  .then((info) => {
    console.log("\n✅ Deployment completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Deployment failed!");
    console.error(error);
    process.exit(1);
  });
