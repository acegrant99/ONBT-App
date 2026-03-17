import "dotenv/config";
import fs from "fs";
import path from "path";
import { ethers } from "ethers";

const ROOT = process.cwd();
const DEPLOY_DIR = path.join(ROOT, "deploy");
const OFT_CONFIG_PATH = path.join(ROOT, "config", "oft-configuration.json");

const CONTRACT_ARTIFACTS = {
  onbtToken: "artifacts/contracts/token/OmnichainNabatOFT.sol/OmnichainNabatOFT.json",
  vault: "artifacts/contracts/treasury/ONBTOmnichainVault.sol/ONBTOmnichainVault.json",
  staking: "artifacts/contracts/defi/ONBTOmnichainStaking.sol/ONBTOmnichainStaking.json",
  rewardsPool: "artifacts/contracts/defi/ONBTRewardsPool.sol/ONBTRewardsPool.json",
  yieldDistributor: "artifacts/contracts/defi/ONBTYieldDistributor.sol/ONBTYieldDistributor.json",
  achievementNFT: "artifacts/contracts/defi/ONBTAchievementNFT.sol/ONBTAchievementNFT.json",
  stakingRouter: "artifacts/contracts/defi/ONBTStakingRouter.sol/ONBTStakingRouter.json",
  governor: "artifacts/contracts/defi/ONBTGovernor.sol/ONBTGovernor.json",
  liquidityManager: "artifacts/contracts/defi/ONBTLiquidityManager.sol/ONBTLiquidityManager.json",
  insuranceFund: "artifacts/contracts/treasury/ONBTInsuranceFund.sol/ONBTInsuranceFund.json",
  stabilizer: "artifacts/contracts/defi/ONBTStabilizer.sol/ONBTStabilizer.json",
  incentiveController: "artifacts/contracts/defi/ONBTIncentiveController.sol/ONBTIncentiveController.json",
  revenueRouter: "artifacts/contracts/defi/ONBTRevenueRouter.sol/ONBTRevenueRouter.json",
};

const CONTRACT_MSG_TYPES = {
  onbtToken: [1],
  staking: [1, 2, 3, 4, 5],
  rewardsPool: [1, 2, 3, 4],
  yieldDistributor: [1, 2, 3],
  stakingRouter: [1, 2, 3, 4],
  vault: [1, 2, 3, 4, 5],
  governor: [1, 2, 3, 4],
  achievementNFT: [1],
};

const FIX_FLAG = process.argv.includes("--fix");
const REPORT_ARG_INDEX = process.argv.findIndex((arg) => arg === "--report");
const REPORT_PATH =
  REPORT_ARG_INDEX !== -1 && process.argv[REPORT_ARG_INDEX + 1]
    ? path.resolve(process.argv[REPORT_ARG_INDEX + 1])
    : path.join(ROOT, "reports", `audit-${new Date().toISOString().replace(/[:.]/g, "-")}.md`);

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function findLatestDeployment(network) {
  const files = fs.readdirSync(DEPLOY_DIR);
  const regex = new RegExp(`deployment-lzv2-resume-${network}-contractfix-(\\d+)\\.json$`);
  const matches = files
    .map((file) => ({ file, match: file.match(regex) }))
    .filter((entry) => entry.match);

  if (matches.length === 0) {
    throw new Error(`No contractfix deployment found for ${network}.`);
  }

  matches.sort((a, b) => Number(b.match[1]) - Number(a.match[1]));
  const latest = matches[0].file;
  const data = loadJson(path.join(DEPLOY_DIR, latest));
  return { file: latest, data };
}

function loadAbiForKey(contractKey) {
  const artifactRel = CONTRACT_ARTIFACTS[contractKey];
  if (!artifactRel) {
    throw new Error(`No artifact mapping for ${contractKey}.`);
  }
  const artifactPath = path.join(ROOT, artifactRel);
  const artifact = loadJson(artifactPath);
  return artifact.abi;
}

function hasFunction(abi, name, inputsLength) {
  return abi.some(
    (fragment) =>
      fragment.type === "function" &&
      fragment.name === name &&
      (inputsLength === undefined || fragment.inputs.length === inputsLength)
  );
}

function bytes32Address(address) {
  return ethers.utils.hexZeroPad(address, 32);
}

function formatValue(value) {
  if (value === null || value === undefined) return "<empty>";
  if (ethers.BigNumber.isBigNumber(value)) return value.toString();
  if (Array.isArray(value)) return `[${value.map(formatValue).join(", ")}]`;
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

async function auditNetwork({ name, deployment, provider, signer, fixMode, expectedOwner, report }) {
  report.push(`## Network: ${name}`);
  report.push(`- Deployment file: ${deployment.file}`);
  report.push("");

  const contracts = deployment.data.contracts;
  const remoteEid = deployment.data.layerZero.peerEid;

  for (const [contractKey, address] of Object.entries(contracts)) {
    if (contractKey === "onbtToken") {
      report.push(`### Contract: ${contractKey}`);
      report.push(`- Address: ${address}`);
      report.push("- Skipped: OFT audit and fixes disabled by user request");
      report.push("");
      continue;
    }
    report.push(`### Contract: ${contractKey}`);
    report.push(`- Address: ${address}`);

    let abi;
    try {
      abi = loadAbiForKey(contractKey);
    } catch (err) {
      report.push(`- Error: ${err.message}`);
      report.push("");
      continue;
    }

    const readContract = new ethers.Contract(address, abi, provider);
    const writeContract = signer ? readContract.connect(signer) : null;

    const issues = [];
    const fixes = [];

    if (expectedOwner && hasFunction(abi, "owner", 0)) {
      try {
        const owner = await readContract.owner();
        if (owner.toLowerCase() !== expectedOwner.toLowerCase()) {
          issues.push(`Owner mismatch: ${owner} != ${expectedOwner}`);
          if (fixMode && writeContract && hasFunction(abi, "transferOwnership", 1)) {
            try {
              const tx = await writeContract.transferOwnership(expectedOwner);
              fixes.push(`transferOwnership tx: ${tx.hash}`);
              await tx.wait();
            } catch (err) {
              issues.push(`Owner fix failed: ${err.message}`);
            }
          }
        }
      } catch (err) {
        issues.push(`owner() failed: ${err.message}`);
      }
    }

    if (hasFunction(abi, "paused", 0)) {
      try {
        const paused = await readContract.paused();
        if (paused) {
          issues.push("Contract is paused");
          if (fixMode && writeContract && hasFunction(abi, "unpause", 0)) {
            try {
              const tx = await writeContract.unpause();
              fixes.push(`unpause tx: ${tx.hash}`);
              await tx.wait();
            } catch (err) {
              issues.push(`Unpause failed: ${err.message}`);
            }
          }
        }
      } catch (err) {
        issues.push(`paused() failed: ${err.message}`);
      }
    }

    if (hasFunction(abi, "peers", 1)) {
      const remoteAddress = deployment.peerContracts?.[contractKey];
      if (remoteAddress) {
        try {
          const peer = await readContract.peers(remoteEid);
          const expectedPeer = bytes32Address(remoteAddress);
          if (peer.toLowerCase() !== expectedPeer.toLowerCase()) {
            issues.push(`Peer mismatch: ${peer} != ${expectedPeer}`);
            if (fixMode && writeContract && hasFunction(abi, "setPeer", 2)) {
              try {
                const tx = await writeContract.setPeer(remoteEid, expectedPeer);
                fixes.push(`setPeer tx: ${tx.hash}`);
                await tx.wait();
              } catch (err) {
                issues.push(`setPeer failed: ${err.message}`);
              }
            }
          }
        } catch (err) {
          issues.push(`peers(${remoteEid}) failed: ${err.message}`);
        }
      }
    }

    const msgTypes = CONTRACT_MSG_TYPES[contractKey] || [1];
    const hasEnforcedOptions = hasFunction(abi, "enforcedOptions", 2) || hasFunction(abi, "getEnforcedOptions", 2);

    if (hasEnforcedOptions) {
      let needsEnforcedFix = false;

      for (const msgType of msgTypes) {
        try {
          let current;
          if (hasFunction(abi, "enforcedOptions", 2)) {
            current = await readContract.enforcedOptions(remoteEid, msgType);
          } else {
            current = await readContract.getEnforcedOptions(remoteEid, msgType);
          }

          if (!current || current === "0x") {
            issues.push(`Missing enforcedOptions for msgType ${msgType}`);
            needsEnforcedFix = true;
          } else if (deployment.enforcedOptions && current.toLowerCase() !== deployment.enforcedOptions.toLowerCase()) {
            issues.push(`Enforced options mismatch for msgType ${msgType}`);
            needsEnforcedFix = true;
          }
        } catch (err) {
          issues.push(`enforcedOptions msgType ${msgType} failed: ${err.message}`);
        }
      }

      if (needsEnforcedFix && fixMode && writeContract && hasFunction(abi, "setEnforcedOptions", 1)) {
        try {
          const params = msgTypes.map((type) => ({
            eid: remoteEid,
            msgType: type,
            options: deployment.enforcedOptions,
          }));
          const tx = await writeContract.setEnforcedOptions(params);
          fixes.push(`setEnforcedOptions tx: ${tx.hash}`);
          await tx.wait();
        } catch (err) {
          issues.push(`setEnforcedOptions failed: ${err.message}`);
        }
      }
    }

    if (issues.length === 0) {
      report.push("- Issues: none");
    } else {
      report.push("- Issues:");
      for (const issue of issues) {
        report.push(`  - ${issue}`);
      }
    }

    if (fixes.length > 0) {
      report.push("- Fixes:");
      for (const fix of fixes) {
        report.push(`  - ${fix}`);
      }
    }

    const viewFunctions = abi.filter(
      (fragment) =>
        fragment.type === "function" &&
        (fragment.stateMutability === "view" || fragment.stateMutability === "pure") &&
        fragment.inputs.length === 0
    );

    report.push("- Zero-arg view/pure calls:");
    for (const fragment of viewFunctions) {
      try {
        const result = await readContract[fragment.name]();
        report.push(`  - ${fragment.name}(): ${formatValue(result)}`);
      } catch (err) {
        report.push(`  - ${fragment.name}(): error ${err.message}`);
      }
    }

    const allFunctions = abi.filter((fragment) => fragment.type === "function");
    report.push("- ABI functions:");
    for (const fragment of allFunctions) {
      const inputs = fragment.inputs.map((input) => `${input.type} ${input.name || "arg"}`).join(", ");
      report.push(`  - ${fragment.name}(${inputs}) [${fragment.stateMutability}]`);
    }

    report.push("");
  }
}

async function main() {
  const oftConfig = loadJson(OFT_CONFIG_PATH);

  const baseDeployment = findLatestDeployment("base");
  const arbDeployment = findLatestDeployment("arbitrum");

  const expectedOwnerBase = baseDeployment.data.deployer || "";
  const expectedOwnerArb = arbDeployment.data.deployer || "";

  const baseRpc = process.env.BASE_RPC_URL || oftConfig.networks.base.rpc;
  const arbRpc = process.env.ARBITRUM_RPC_URL || oftConfig.networks.arbitrum.rpc;

  const baseProvider = new ethers.providers.JsonRpcProvider(baseRpc);
  const arbProvider = new ethers.providers.JsonRpcProvider(arbRpc);

  const signerBase = FIX_FLAG && PRIVATE_KEY ? new ethers.Wallet(PRIVATE_KEY, baseProvider) : null;
  const signerArb = FIX_FLAG && PRIVATE_KEY ? new ethers.Wallet(PRIVATE_KEY, arbProvider) : null;

  if (FIX_FLAG && !PRIVATE_KEY) {
    throw new Error("--fix provided but PRIVATE_KEY is not set");
  }

  baseDeployment.peerContracts = arbDeployment.data.contracts;
  arbDeployment.peerContracts = baseDeployment.data.contracts;
  baseDeployment.enforcedOptions = oftConfig.configuration.enforcedOptions.encodedLzReceiveOptions;
  arbDeployment.enforcedOptions = oftConfig.configuration.enforcedOptions.encodedLzReceiveOptions;

  const report = [];
  report.push("# Deployment Audit Report");
  report.push("");
  report.push(`- Timestamp: ${new Date().toISOString()}`);
  report.push(`- Fix mode: ${FIX_FLAG ? "enabled" : "disabled"}`);
  report.push(`- Expected owner (base): ${expectedOwnerBase || "<unset>"}`);
  report.push(`- Expected owner (arbitrum): ${expectedOwnerArb || "<unset>"}`);
  report.push("");

  await auditNetwork({
    name: "base",
    deployment: baseDeployment,
    provider: baseProvider,
    signer: signerBase,
    fixMode: FIX_FLAG,
    expectedOwner: expectedOwnerBase,
    report,
  });

  await auditNetwork({
    name: "arbitrum",
    deployment: arbDeployment,
    provider: arbProvider,
    signer: signerArb,
    fixMode: FIX_FLAG,
    expectedOwner: expectedOwnerArb,
    report,
  });

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, report.join("\n"), "utf8");

  console.log(`Report written to ${REPORT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
