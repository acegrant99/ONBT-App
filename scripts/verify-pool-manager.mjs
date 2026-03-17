#!/usr/bin/env node

import { exec } from "child_process";
import { promisify } from "util";
import dotenv from "dotenv";
import https from "https";

dotenv.config();

const execAsync = promisify(exec);

const API_BASE = "https://api.etherscan.io/v2/api";

const deployments = [
  {
    name: "base",
    chainId: "8453",
    network: "base",
    address: process.env.BASE_POOL_MANAGER_ADDRESS,
    args: [
      process.env.BASE_LZ_ENDPOINT,
      process.env.BASE_UNISWAP_V3_SWAP_ROUTER,
      process.env.BASE_UNISWAP_V3_POSITION_MANAGER,
      process.env.BASE_ONBT_TOKEN,
      process.env.BASE_FEE_COLLECTOR,
      process.env.BASE_REWARDS_COLLECTOR,
      process.env.BASE_REWARDS_BPS || "7000",
    ],
  },
  {
    name: "arbitrum",
    chainId: "42161",
    network: "arbitrum",
    address: process.env.ARBITRUM_POOL_MANAGER_ADDRESS,
    args: [
      process.env.ARBITRUM_LZ_ENDPOINT,
      process.env.ARBITRUM_UNISWAP_V3_SWAP_ROUTER,
      process.env.ARBITRUM_UNISWAP_V3_POSITION_MANAGER,
      process.env.ARBITRUM_ONBT_TOKEN,
      process.env.ARBITRUM_FEE_COLLECTOR,
      process.env.ARBITRUM_REWARDS_COLLECTOR,
      process.env.ARBITRUM_REWARDS_BPS || "7000",
    ],
  },
];

function getJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", reject);
  });
}

function requireEnv(value, name) {
  if (!value || String(value).trim() === "") {
    throw new Error(`Missing required env: ${name}`);
  }
  return value;
}

async function isVerified(chainId, address, apiKey) {
  const url = `${API_BASE}?chainid=${chainId}&module=contract&action=getsourcecode&address=${address}&apikey=${apiKey}`;
  const result = await getJson(url);
  const row = result?.result?.[0] || {};
  const hasSource = !!(row.SourceCode && String(row.SourceCode).trim() !== "");
  return {
    verified: hasSource,
    contractName: row.ContractName || "",
    status: result?.status,
    message: result?.message,
  };
}

async function verifyOnNetwork(dep) {
  const apiKey = requireEnv(process.env.ETHERSCAN_API_KEY, "ETHERSCAN_API_KEY");
  requireEnv(dep.address, `${dep.name.toUpperCase()}_POOL_MANAGER_ADDRESS`);

  for (let i = 0; i < dep.args.length; i += 1) {
    requireEnv(dep.args[i], `${dep.name.toUpperCase()} constructor arg #${i + 1}`);
  }

  const precheck = await isVerified(dep.chainId, dep.address, apiKey);
  if (precheck.verified) {
    console.log(`✅ ${dep.name}: already verified (${precheck.contractName || "unknown contract"})`);
    return true;
  }

  const cmd = `npx hardhat verify --network ${dep.network} ${dep.address} ${dep.args.join(" ")}`;
  console.log(`\n🔍 Verifying ONBTPoolManager on ${dep.name}...`);
  console.log(cmd);

  try {
    const { stdout, stderr } = await execAsync(cmd, {
      cwd: process.cwd(),
      maxBuffer: 10 * 1024 * 1024,
      timeout: 240000,
    });

    if (stdout) console.log(stdout.trim());
    if (stderr && !stderr.includes("Already Verified")) console.log(stderr.trim());
  } catch (error) {
    const out = `${error.stdout || ""}\n${error.stderr || ""}`;
    if (out.includes("Already Verified")) {
      console.log(`✅ ${dep.name}: already verified`);
      return true;
    }

    console.log(`❌ ${dep.name}: verification command failed`);
    if (out.trim()) console.log(out.trim());
    return false;
  }

  const postcheck = await isVerified(dep.chainId, dep.address, apiKey);
  if (postcheck.verified) {
    console.log(`✅ ${dep.name}: verification confirmed`);
    return true;
  }

  console.log(`❌ ${dep.name}: still not verified after submission`);
  return false;
}

async function main() {
  console.log("\n=== ONBTPoolManager Verification (Base + Arbitrum) ===\n");

  const results = [];
  for (const dep of deployments) {
    const ok = await verifyOnNetwork(dep);
    results.push({ network: dep.name, ok });
  }

  console.log("\n=== Summary ===");
  for (const result of results) {
    console.log(`${result.ok ? "✅" : "❌"} ${result.network}`);
  }

  if (results.every((result) => result.ok)) {
    process.exit(0);
  }

  process.exit(1);
}

main().catch((error) => {
  console.error("Fatal error:", error.message || error);
  process.exit(1);
});
