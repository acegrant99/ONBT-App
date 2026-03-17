import hre from "hardhat";

const { ethers } = hre;

const CONTRACTS = {
  8453: "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c",
  42161: "0x42bB5FD891c070A64d31752855E94A01edDd766E",
};

const OFT_ABI = [
  "function balanceOf(address) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function approve(address spender, uint256 amount) external returns (bool)",
];

async function checkGasAndFees() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  const chainName = chainId === 8453 ? "Base" : "Arbitrum";
  const contractAddr = CONTRACTS[chainId];

  console.log("\n" + "=".repeat(80));
  console.log("⛽ Gas & Fee Analysis");
  console.log("=".repeat(80) + "\n");

  console.log(`Network: ${chainName} (${chainId})`);
  console.log(`Signer: ${signer.address}`);
  console.log(`Contract: ${contractAddr}\n`);

  try {
    // Get gas price and network data
    const feeData = await ethers.provider.getFeeData();
    const block = await ethers.provider.getBlock("latest");
    const balance = await signer.provider.getBalance(signer.address);

    const gasPrice = feeData.gasPrice || feeData.maxFeePerGas;

    console.log("💰 Current Network Fees:");
    console.log(`   Gas Price: ${ethers.formatUnits(gasPrice, "gwei")} gwei`);
    console.log(`   Balance: ${ethers.formatEther(balance)} ETH`);

    if (chainId === 8453) {
      // Base uses EIP-1559
      console.log(`   Max Priority Fee: ${ethers.formatUnits(feeData.maxPriorityFeePerGas || 0n, "gwei")} gwei`);
      console.log(`   Max Fee Per Gas: ${ethers.formatUnits(feeData.maxFeePerGas || 0n, "gwei")} gwei`);
    } else {
      console.log(`   Max Priority Fee: ${ethers.formatUnits(feeData.maxPriorityFeePerGas || 0n, "gwei")} gwei`);
      console.log(`   Max Fee Per Gas: ${ethers.formatUnits(feeData.maxFeePerGas || 0n, "gwei")} gwei`);
    }

    // Contract interaction estimation
    const oft = new ethers.Contract(contractAddr, OFT_ABI, signer);

    console.log("\n📊 Estimated Gas Usage by Operation:");
    console.log("-".repeat(80));

    // Estimate balanceOf (read-only, no gas cost on call)
    try {
      const balanceOfGas = await oft.balanceOf.estimateGas(signer.address);
      console.log(`   balanceOf(): ~${balanceOfGas.toString()} gas (read-only, no cost)`);
    } catch (e) {
      console.log(`   balanceOf(): Unable to estimate (read-only)`);
    }

    // Estimate approve
    try {
      const approveGas = await oft.approve.estimateGas(contractAddr, ethers.parseUnits("1", 18));
      const approveCost = (approveGas * gasPrice / BigInt(1e18));
      console.log(`   approve(): ~${approveGas.toString()} gas`);
      console.log(`              ≈ ${ethers.formatEther(approveCost)} ETH`);
    } catch (e) {
      console.log(`   approve(): Unable to estimate (${e.message.slice(0, 40)}...)`);
    }

    // Estimate transfer
    try {
      const transferGas = await oft.transfer.estimateGas(signer.address, ethers.parseUnits("1", 18));
      const transferCost = (transferGas * gasPrice / BigInt(1e18));
      console.log(`   transfer(): ~${transferGas.toString()} gas`);
      console.log(`               ≈ ${ethers.formatEther(transferCost)} ETH`);
    } catch (e) {
      console.log(`   transfer(): Unable to estimate (${e.message.slice(0, 40)}...)`);
    }

    // LayerZero specific costs
    console.log("\n🌉 LayerZero Cross-Chain Operations (Estimated):");
    console.log("-".repeat(80));
    console.log(`   sendFrom() (OFT bridge): ~500,000-800,000 gas`);
    console.log(`                            ≈ ${ethers.formatEther(BigInt(600000) * gasPrice / BigInt(1e18))} ETH (Base)`);
    console.log(`   \n   Message delivery: 200,000 gas enforced option (configured)`);

    // Calculate transaction cost examples
    console.log("\n💸 Estimated Transaction Costs:");
    console.log("-".repeat(80));

    const exampleGasAmounts = [
      { name: "Simple transfer", gas: 65000n },
      { name: "Approve + Transfer", gas: 130000n },
      { name: "Bridge transfer", gas: 600000n },
    ];

    exampleGasAmounts.forEach(({ name, gas }) => {
      const cost = (gas * gasPrice) / BigInt(1e18);
      console.log(`   ${name.padEnd(25)}: ~${ethers.formatEther(cost)} ETH`);
    });

    // Calculate how much ETH is needed
    console.log("\n📋 Gas Requirements:");
    console.log("-".repeat(80));
    const needFor10Tx = (600000n * gasPrice * 10n) / BigInt(1e18);
    const needFor100Tx = (600000n * gasPrice * 100n) / BigInt(1e18);
    
    console.log(`   10 bridge transfers: ${ethers.formatEther(needFor10Tx)} ETH`);
    console.log(`   100 bridge transfers: ${ethers.formatEther(needFor100Tx)} ETH`);

    if (balance < BigInt(ethers.parseEther("0.1"))) {
      console.log(`\n⚠️  WARNING: Low balance (${ethers.formatEther(balance)} ETH)`);
      console.log(`   Recommended minimum: 0.1-0.5 ETH for testing`);
    } else {
      console.log(`\n✅ Sufficient balance for operations`);
    }

    console.log("\n" + "=".repeat(80) + "\n");

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

checkGasAndFees().catch(console.error);
