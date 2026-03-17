import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-routerfix-1771470032703.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-routerfix-1771470062468.json",
};

const solidityPacked = (types, values) =>
  ethers.solidityPacked ? ethers.solidityPacked(types, values) : ethers.utils.solidityPack(types, values);
const getBytes = (value) =>
  ethers.getBytes ? ethers.getBytes(value) : ethers.utils.arrayify(value);

const buildLzReceiveOptions = (gas, value = 0n) => {
  const option = value === 0n
    ? solidityPacked(["uint128"], [gas])
    : solidityPacked(["uint128", "uint128"], [gas, value]);
  const optionSize = getBytes(option).length + 1;
  return solidityPacked(
    ["uint16", "uint8", "uint16", "uint8", "bytes"],
    [3, 1, optionSize, 1, option]
  );
};

function readJson(relativePath) {
  const fullPath = path.isAbsolute(relativePath)
    ? relativePath
    : path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  let networkKey;
  if (chainId === 8453) networkKey = "base";
  else if (chainId === 42161) networkKey = "arbitrum";
  else throw new Error(`Unsupported chainId: ${chainId}`);

  const deploymentPath = process.env.DEPLOYMENT_FILE || DEFAULT_DEPLOYMENTS[networkKey];
  const deployment = readJson(deploymentPath);

  const contracts = {
    yieldDistributor: deployment.contracts.yieldDistributor,
    achievementNFT: deployment.contracts.achievementNFT,
    staking: deployment.contracts.staking,
  };

  const peerEid = deployment.layerZero.peerEid;
  const gas = BigInt(process.env.LZ_GAS || "200000");

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║     Configure Enforced Options (LayerZero V2)            ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);
  console.log(`Network: ${networkKey.toUpperCase()}`);
  console.log(`Signer: ${signer.address}`);
  console.log(`Peer EID: ${peerEid}`);
  console.log(`Gas Limit: ${gas}\n`);

  const options = buildLzReceiveOptions(gas, 0n);

  // YieldDistributor enforced options
  console.log("═══════════════════════════════════════════════════════════");
  console.log("Setting YieldDistributor Enforced Options");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  try {
    const yd = await ethers.getContractAt("ONBTYieldDistributor", contracts.yieldDistributor, signer);
    const owner = await yd.owner();
    
    if (owner.toLowerCase() !== signer.address.toLowerCase()) {
      console.log(`⚠️  Signer is not owner. Owner: ${owner}`);
    } else {
      console.log(`YieldDistributor: ${contracts.yieldDistributor}`);
      
      // Set enforced options for each message type
      const msgTypes = [1, 2, 3]; // MSG_SYNC_SHARES, MSG_DISTRIBUTE_YIELD, MSG_REPORT_CLAIMS
      const enforcedOptions = msgTypes.map(msgType => ({
        eid: peerEid,
        msgType: msgType,
        options: options
      }));

      console.log(`Setting enforced options for ${msgTypes.length} message types...`);
      const tx = await yd.setEnforcedOptions(enforcedOptions, { gasLimit: 500000 });
      console.log(`Tx: ${tx.hash}`);
      await tx.wait();
      console.log("✅ YieldDistributor enforced options set\n");
    }
  } catch (error) {
    console.log(`⚠️  YieldDistributor: ${error.message}\n`);
  }

  // AchievementNFT enforced options
  console.log("═══════════════════════════════════════════════════════════");
  console.log("Setting AchievementNFT Enforced Options");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  try {
    const nft = await ethers.getContractAt("ONBTAchievementNFT", contracts.achievementNFT, signer);
    const owner = await nft.owner();
    
    if (owner.toLowerCase() !== signer.address.toLowerCase()) {
      console.log(`⚠️  Signer is not owner. Owner: ${owner}`);
    } else {
      console.log(`AchievementNFT: ${contracts.achievementNFT}`);
      
      // Set enforced options for ONFT send
      const enforcedOptions = [{
        eid: peerEid,
        msgType: 1, // Standard ONFT send
        options: options
      }];

      console.log("Setting enforced options for cross-chain NFT transfers...");
      const tx = await nft.setEnforcedOptions(enforcedOptions, { gasLimit: 500000 });
      console.log(`Tx: ${tx.hash}`);
      await tx.wait();
      console.log("✅ AchievementNFT enforced options set\n");
    }
  } catch (error) {
    console.log(`⚠️  AchievementNFT: ${error.message}\n`);
  }

  // Staking enforced options
  console.log("═══════════════════════════════════════════════════════════");
  console.log("Setting Staking Enforced Options");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  try {
    const staking = await ethers.getContractAt("ONBTOmnichainStaking", contracts.staking, signer);
    const owner = await staking.owner();
    
    if (owner.toLowerCase() !== signer.address.toLowerCase()) {
      console.log(`⚠️  Signer is not owner. Owner: ${owner}`);
    } else {
      console.log(`Staking: ${contracts.staking}`);
      
      // Set enforced options for all message types
      const msgTypes = [1, 2, 3, 4, 5]; // MSG_STAKE, MSG_UNSTAKE, MSG_SYNC_REWARDS, MSG_CLAIM_REWARDS, MSG_COMPOUND
      const enforcedOptions = msgTypes.map(msgType => ({
        eid: peerEid,
        msgType: msgType,
        options: options
      }));

      console.log(`Setting enforced options for ${msgTypes.length} message types...`);
      const tx = await staking.setEnforcedOptions(enforcedOptions, { gasLimit: 500000 });
      console.log(`Tx: ${tx.hash}`);
      await tx.wait();
      console.log("✅ Staking enforced options set\n");
    }
  } catch (error) {
    console.log(`⚠️  Staking: ${error.message}\n`);
  }

  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║              Enforced Options Configuration               ║");
  console.log("║                      Complete! 🎉                          ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Failed:", error);
  process.exit(1);
});
