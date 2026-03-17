import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-routerfix-1771470032703.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-routerfix-1771470062468.json",
};

const LZ_ENDPOINT = "0x1a44076050125825900e736c501f859c50fE728c";
const CONFIG_TYPE_ENFORCED_OPTIONS = 3;

const solidityPacked = (types, values) =>
  ethers.solidityPacked ? ethers.solidityPacked(types, values) : ethers.utils.solidityPack(types, values);
const getBytes = (value) =>
  ethers.getBytes ? ethers.getBytes(value) : ethers.utils.arrayify(value);
const AbiCoder = ethers.AbiCoder ? ethers.AbiCoder.defaultAbiCoder() : ethers.utils.defaultAbiCoder;

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

  const peerEid = deployment.layerZero.peerEid;
  const gas = BigInt(process.env.LZ_GAS || "200000");

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║   Configure Enforced Options via SendUln302 (Option 2)   ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);
  console.log(`Network: ${networkKey.toUpperCase()}`);
  console.log(`Signer: ${signer.address}`);
  console.log(`Peer EID: ${peerEid}`);
  console.log(`Gas Limit: ${gas}\n`);

  const options = buildLzReceiveOptions(gas, 0n);

  // Endpoint ABI
  const endpointAbi = [
    "function getSendLibrary(address sender, uint32 dstEid) external view returns (address)",
    "function getReceiveLibrary(address receiver, uint32 srcEid) external view returns (address)",
  ];

  // SendUln302 ABI
  const ulnAbi = [
    "function getConfig(uint32 eid, address oapp, uint32 configType) external view returns (bytes)",
    "function setConfig(uint32 eid, address oapp, uint32 configType, bytes calldata config) external",
  ];

  const endpoint = new ethers.Contract(LZ_ENDPOINT, endpointAbi, signer);

  // Contracts to configure
  const contractsToConfig = [
    { name: "YieldDistributor", address: deployment.contracts.yieldDistributor, msgTypes: [1, 2, 3] },
    { name: "AchievementNFT", address: deployment.contracts.achievementNFT, msgTypes: [1] },
    { name: "Staking", address: deployment.contracts.staking, msgTypes: [1, 2, 3, 4, 5] },
  ];

  console.log("═══════════════════════════════════════════════════════════");
  console.log("Configuring Enforced Options via SendUln302");
  console.log("═══════════════════════════════════════════════════════════\n");

  for (const contract of contractsToConfig) {
    try {
      console.log(`${contract.name}: ${contract.address}`);

      // Get Send Library
      const sendLib = await endpoint.getSendLibrary(contract.address, peerEid);
      console.log(`  Send Library: ${sendLib}`);

      const sendUln = new ethers.Contract(sendLib, ulnAbi, signer);

      // Check current config
      try {
        const currentConfig = await sendUln.getConfig(peerEid, contract.address, CONFIG_TYPE_ENFORCED_OPTIONS);
        if (currentConfig && currentConfig !== "0x") {
          console.log(`  Current enforced options: ${currentConfig.slice(0, 66)}...`);
        }
      } catch (e) {
        console.log(`  No current enforced options set`);
      }

      // Encode enforced options for all message types
      // Format: abi.encode(EnforcedOptionParam[]) where EnforcedOptionParam = (eid, msgType, options)
      const enforcedOptionParams = contract.msgTypes.map(msgType => [peerEid, msgType, options]);
      const encodedConfig = AbiCoder.encode(
        ["tuple(uint32 eid, uint16 msgType, bytes options)[]"],
        [enforcedOptionParams]
      );

      console.log(`  Setting enforced options for ${contract.msgTypes.length} message types...`);
      console.log(`  Message types: [${contract.msgTypes.join(", ")}]`);
      console.log(`  Options: ${options}`);

      const tx = await sendUln.setConfig(peerEid, contract.address, CONFIG_TYPE_ENFORCED_OPTIONS, encodedConfig, {
        gasLimit: 1000000
      });
      console.log(`  Tx: ${tx.hash}`);
      await tx.wait();
      console.log(`  ✅ Enforced options configured\n`);

    } catch (error) {
      console.log(`  ❌ Failed: ${error.message}\n`);
    }
  }

  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║            Enforced Options Configuration                 ║");
  console.log("║                      Complete! 🎉                          ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Failed:", error);
  process.exit(1);
});
