import hre from "hardhat";

const { ethers } = hre;

// Deployed staking contracts
const CONTRACTS = {
  8453: "0x8353D0Dfe7958D9300a43f1785Fd7240A8B8Ff0f", // Base
  42161: "0x51f497515b1398FF8e9C0358Bc6D0b3A51eDd532", // Arbitrum
};

// LayerZero Endpoint IDs
const EID = {
  base: 30184,
  arbitrum: 30110,
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);
  const chainName = chainId === 8453 ? "Base" : "Arbitrum";
  
  console.log("\n" + "=".repeat(80));
  console.log(`⚙️  Configuring Staking Peers on ${chainName}`);
  console.log("=".repeat(80) + "\n");

  const stakingAddr = CONTRACTS[chainId];
  const staking = await ethers.getContractAt("ONBTStakingOApp", stakingAddr);

  console.log(`Local Staking: ${stakingAddr}`);
  console.log(`Deployer: ${deployer.address}\n`);

  try {
    if (chainId === 8453) {
      // Configure Base -> Arbitrum
      const peerAddr = CONTRACTS[42161];
      const peerBytes32 = ethers.zeroPadValue(peerAddr, 32);
      
      console.log(`📡 Setting Arbitrum peer (EID ${EID.arbitrum}):`);
      console.log(`   Address: ${peerAddr}`);
      console.log(`   Bytes32: ${peerBytes32}\n`);
      
      const tx = await staking.setPeer(EID.arbitrum, peerBytes32);
      console.log(`⏳ Transaction: ${tx.hash}`);
      await tx.wait();
      console.log(`✅ Peer configured!\n`);

      // Verify
      const setPeer = await staking.peers(EID.arbitrum);
      console.log(`✓ Verification: ${setPeer === peerBytes32 ? "SUCCESS" : "FAILED"}\n`);

    } else if (chainId === 42161) {
      // Configure Arbitrum -> Base
      const peerAddr = CONTRACTS[8453];
      const peerBytes32 = ethers.zeroPadValue(peerAddr, 32);
      
      console.log(`📡 Setting Base peer (EID ${EID.base}):`);
      console.log(`   Address: ${peerAddr}`);
      console.log(`   Bytes32: ${peerBytes32}\n`);
      
      const tx = await staking.setPeer(EID.base, peerBytes32);
      console.log(`⏳ Transaction: ${tx.hash}`);
      await tx.wait();
      console.log(`✅ Peer configured!\n`);

      // Verify
      const setPeer = await staking.peers(EID.base);
      console.log(`✓ Verification: ${setPeer === peerBytes32 ? "SUCCESS" : "FAILED"}\n`);
    }

    console.log("=".repeat(80));
    console.log("✅ Configuration Complete!");
    console.log("=".repeat(80) + "\n");

  } catch (error) {
    console.error("\n❌ Configuration Error:");
    console.error(error.message);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
