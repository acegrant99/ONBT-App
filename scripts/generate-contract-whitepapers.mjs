#!/usr/bin/env node
import fs from "fs";
import path from "path";

const root = process.cwd();
const args = new Set(process.argv.slice(2));

const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const limit = limitArg ? Math.max(1, Number(limitArg.split("=")[1] || "10")) : 10;
const dryRun = args.has("--dry-run");
const includeAll = args.has("--all");
const force = args.has("--force");
const clean = args.has("--clean");

const DEPLOY_DIR = path.join(root, "deploy");
const OUTPUT_DIR = path.join(root, "docs", "whitepapers", "contracts");
const SUMMARY_FILE = path.join(root, "docs", "whitepapers", "THE_OMNICHAIN_NABAT_ECOSYSTEM.md");

const explorerByChainId = {
  8453: "https://basescan.org",
  42161: "https://arbiscan.io",
  1: "https://etherscan.io",
  10: "https://optimistic.etherscan.io",
  137: "https://polygonscan.com"
};

const RUNBOOK_REFERENCES = [
  { title: "Operations Guide", path: "OPERATIONS-GUIDE.md" },
  { title: "Monitoring Guide", path: "MONITORING-GUIDE.md" },
  { title: "Deployment Guide", path: "DEPLOYMENT_GUIDE.md" },
  { title: "Deployment Checklist", path: "DEPLOYMENT_CHECKLIST.md" }
];

const INCIDENT_CONTACT_REFERENCES = [
  "Primary on-call: See OPERATIONS-GUIDE.md escalation section",
  "Security response: See MONITORING-GUIDE.md and repository security workflows",
  "Deployment owner: Address listed as `deployer` in each deployment artifact"
];

function safeMkdir(dir) {
  if (!dryRun) fs.mkdirSync(dir, { recursive: true });
}

function exists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function writeText(filePath, content) {
  const existedBefore = exists(filePath);

  if (!force && existedBefore) {
    return { action: "skipped", filePath };
  }

  safeMkdir(path.dirname(filePath));
  if (!dryRun) {
    fs.writeFileSync(filePath, content, "utf8");
  }

  return { action: existedBefore ? "overwritten" : "created", filePath };
}

function resolveContractName(record, fileName) {
  if (record?.contractName) return String(record.contractName);

  const contractsObj = record?.contracts;
  if (contractsObj && typeof contractsObj === "object" && !Array.isArray(contractsObj)) {
    const count = Object.keys(contractsObj).length;
    if (count >= 6) {
      if (String(record?.deploymentType || "").toLowerCase() === "hub") {
        return "ONBT Hub Contract Suite";
      }
      if (String(record?.deploymentType || "").toLowerCase() === "spoke") {
        return "ONBT Spoke Contract Suite";
      }
      return "ONBT Contract Suite";
    }
  }

  const base = fileName.replace(/^deployment-/i, "").replace(/\.json$/i, "");
  const noTs = base.replace(/-\d{10,}$/i, "");
  return noTs
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function slugify(value) {
  return String(value || "unknown")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function detectTimestamp(record, stats) {
  if (record?.timestamp) {
    const d = new Date(record.timestamp);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return stats.mtime;
}

function shorten(address) {
  if (typeof address !== "string") return "N/A";
  if (address.length < 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function toOnbtTokens(rawAmountWeiLike) {
  const asString = String(rawAmountWeiLike || "");
  if (!/^\d+$/.test(asString)) return null;

  try {
    if (asString.length <= 18) {
      return Number(asString) / 1e18;
    }

    const whole = asString.slice(0, -18);
    const frac = asString.slice(-18, -14);
    return Number(`${whole}.${frac}`);
  } catch {
    return null;
  }
}

function toTxLink(chainId, txHash) {
  const base = explorerByChainId[Number(chainId)];
  if (!base || !txHash) return null;
  return `${base}/tx/${txHash}`;
}

function toAddressLink(chainId, address) {
  const base = explorerByChainId[Number(chainId)];
  if (!base || !address) return null;
  return `${base}/address/${address}`;
}

function toCodeLink(chainId, address) {
  const base = explorerByChainId[Number(chainId)];
  if (!base || !address) return null;
  return `${base}/address/${address}#code`;
}

function findAbiCandidates(contractName) {
  if (!contractName) return [];
  const artifactsContractsDir = path.join(root, "artifacts", "contracts");
  if (!exists(artifactsContractsDir)) return [];

  const matches = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && entry.name.toLowerCase() === `${contractName.toLowerCase()}.json`) {
        matches.push(path.relative(root, full).replace(/\\/g, "/"));
      }
    }
  }

  walk(artifactsContractsDir);
  return matches.slice(0, 8);
}

function computeRisk(record) {
  const network = String(record?.network || "").toLowerCase();
  const deploymentMode = String(record?.deploymentMode || "").toLowerCase();
  const deploymentType = String(record?.deploymentType || "").toLowerCase();

  const hasLayerZero = Boolean(record?.initializeArgs?.lzEndpoint || record?.layerZero?.endpoint);
  const hasProxy = deploymentMode.includes("proxy") || Boolean(record?.proxyAddress);
  const hasStablePaymentTokens = Array.isArray(record?.initializeArgs?.paymentTokens) && record.initializeArgs.paymentTokens.length >= 2;
  const isSuiteDeployment = record?.contracts && typeof record.contracts === "object";

  const liquidity = hasStablePaymentTokens ? 3 : 2;
  const oracle = isSuiteDeployment ? 3 : 2;
  const messaging = hasLayerZero ? 4 : 2;
  const upgradeability = hasProxy ? 4 : 2;

  let networkModifier = 0;
  if (network === "arbitrum") networkModifier = 0.2;
  if (network === "base") networkModifier = 0.1;

  const weighted = (liquidity + oracle + messaging + upgradeability) / 4 + networkModifier;
  const total = Math.max(1, Math.min(5, Number(weighted.toFixed(1))));

  let posture = "Moderate";
  if (total >= 4.0) posture = "Elevated";
  else if (total <= 2.4) posture = "Low";

  return {
    liquidity,
    oracle,
    messaging,
    upgradeability,
    total,
    posture,
    deploymentType
  };
}

function formatRunbookLinks() {
  return RUNBOOK_REFERENCES.map((r) => `- ${r.title}: ../../${r.path}`).join("\n");
}

function formatIncidentContacts() {
  return INCIDENT_CONTACT_REFERENCES.map((line) => `- ${line}`).join("\n");
}

function formatObjectLines(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return ["- N/A"];

  return Object.entries(obj).map(([k, v]) => {
    if (Array.isArray(v)) {
      return `- ${k}: ${v.join(", ")}`;
    }
    return `- ${k}: ${v}`;
  });
}

function composePerDeploymentWhitepaper(entry) {
  const record = entry.record;
  const chainId = Number(record.chainId || 0);
  const network = record.network || "unknown";
  const contractName = resolveContractName(record, entry.fileName);
  const title = `${contractName} White Paper (${network})`;
  const risk = computeRisk(record);
  const abiCandidates = findAbiCandidates(record.contractName || "");

  const deploymentTxLink = toTxLink(chainId, record.deploymentTx);
  const implementationTxLink = toTxLink(chainId, record.implementationDeploymentTx);
  const proxyLink = toAddressLink(chainId, record.proxyAddress);
  const implLink = toAddressLink(chainId, record.implementationAddress);
  const proxyCodeLink = toCodeLink(chainId, record.proxyAddress);
  const implCodeLink = toCodeLink(chainId, record.implementationAddress);

  const saleAllocation = record?.constructorArgs?.saleAllocation;
  const allocationOnbt = toOnbtTokens(saleAllocation);

  return `# ${title}

## Abstract

This white paper documents a recent deployment of ${contractName} on ${network} (chainId: ${chainId || "N/A"}) in the Omnichain Nabat ecosystem. It provides deployment provenance, configuration inputs, and operational integrity references for audit and governance workflows.

## Deployment Profile

- Source file: ${entry.fileName}
- Deployment timestamp: ${entry.deployedAt.toISOString()}
- Deployment mode: ${record.deploymentMode || "N/A"}
- Deployer: ${record.deployer || "N/A"}
- Proxy address: ${record.proxyAddress || "N/A"}${proxyLink ? ` (${proxyLink})` : ""}
- Implementation address: ${record.implementationAddress || "N/A"}${implLink ? ` (${implLink})` : ""}

## Contract Scope

${allocationOnbt ? `- Sale allocation target: ${allocationOnbt.toLocaleString()} ONBT` : "- Sale allocation target: N/A"}
- LayerZero endpoint in initializer: ${record?.initializeArgs?.lzEndpoint || "N/A"}
- Owner authority: ${record?.initializeArgs?.owner || "N/A"}
- Funds recipient: ${record?.initializeArgs?.fundsRecipient || "N/A"}

## Constructor Arguments

${formatObjectLines(record.constructorArgs).join("\n")}

## Initializer Arguments

${formatObjectLines(record.initializeArgs).join("\n")}

## Deployed Contract Map

${formatObjectLines(record.contracts).join("\n")}

## Transaction Provenance

- Deployment transaction: ${record.deploymentTx || "N/A"}${deploymentTxLink ? ` (${deploymentTxLink})` : ""}
- Implementation deployment transaction: ${record.implementationDeploymentTx || "N/A"}${implementationTxLink ? ` (${implementationTxLink})` : ""}

## ABI & Proxy Verification References

- Proxy contract explorer page: ${proxyLink || "N/A"}
- Proxy contract code tab: ${proxyCodeLink || "N/A"}
- Implementation explorer page: ${implLink || "N/A"}
- Implementation code tab: ${implCodeLink || "N/A"}
${abiCandidates.length ? abiCandidates.map((rel) => `- ABI artifact candidate: ../../${rel}`).join("\n") : "- ABI artifact candidate: N/A"}

## Operational Runbooks & Incident Response

${formatRunbookLinks()}

### Incident Response Contacts

${formatIncidentContacts()}

## Chain-Level Risk Scoring

- Liquidity Risk: ${risk.liquidity}/5
- Oracle Risk: ${risk.oracle}/5
- Messaging Risk: ${risk.messaging}/5
- Upgradeability Risk: ${risk.upgradeability}/5
- Composite Risk Score: ${risk.total}/5 (${risk.posture})

## Integrity Notes

- Validate proxy and implementation bytecode against verified source.
- Confirm initializer values match intended sale window and payment token policy.
- Confirm LayerZero endpoint aligns with chain-specific endpoint for ${network}.
- Confirm cross-chain sale controls are synchronized with treasury and governance policies.

---

Generated by scripts/generate-contract-whitepapers.mjs
`;
}

function composeSystemSummary(entries) {
  const now = new Date().toISOString();
  const byNetwork = new Map();
  const byContract = new Map();
  const riskRows = [];

  for (const e of entries) {
    const net = e.record.network || "unknown";
    const name = e.resolvedName || resolveContractName(e.record, e.fileName);

    if (!byNetwork.has(net)) byNetwork.set(net, []);
    byNetwork.get(net).push(e);

    if (!byContract.has(name)) byContract.set(name, []);
    byContract.get(name).push(e);

    const risk = computeRisk(e.record);
    riskRows.push({
      contract: name,
      network: e.record.network || "unknown",
      total: risk.total,
      posture: risk.posture,
      liquidity: risk.liquidity,
      oracle: risk.oracle,
      messaging: risk.messaging,
      upgradeability: risk.upgradeability
    });
  }

  const networkLines = [...byNetwork.entries()].map(([net, list]) => `- ${net}: ${list.length} deployment(s)`);
  const contractLines = [...byContract.entries()].map(([name, list]) => `- ${name}: ${list.length} deployment(s)`);

  const latest = entries[0];

  const whitepaperLinks = entries.map((e) => {
    const file = `contracts/${e.outFileName}`;
    return `- [${e.resolvedName || resolveContractName(e.record, e.fileName)} (${e.record.network || "unknown"})](${file})`;
  });

  const riskMatrixLines = riskRows.map((r) =>
    `- ${r.contract} (${r.network}) | composite ${r.total}/5 ${r.posture} | liquidity ${r.liquidity}/5 | oracle ${r.oracle}/5 | messaging ${r.messaging}/5 | upgradeability ${r.upgradeability}/5`
  );

  return `# The Omnichain Nabat Ecosystem

## Executive Summary

This summary white paper consolidates recent smart-contract deployment activity for The Omnichain Nabat Ecosystem across supported chains. It captures deployment recency, contract coverage, and integrity posture derived from deployment artifacts.

- Generated at: ${now}
- Deployment files analyzed: ${entries.length}
- Most recent deployment: ${latest ? `${latest.fileName} (${latest.deployedAt.toISOString()})` : "N/A"}

## Network Footprint

${networkLines.length ? networkLines.join("\n") : "- N/A"}

## Contract Coverage

${contractLines.length ? contractLines.join("\n") : "- N/A"}

## Recent Contract White Papers

${whitepaperLinks.length ? whitepaperLinks.join("\n") : "- N/A"}

## Chain-Level Risk Matrix

${riskMatrixLines.length ? riskMatrixLines.join("\n") : "- N/A"}

## Runbooks & Incident Response

${RUNBOOK_REFERENCES.map((r) => `- ${r.title}: ../${r.path}`).join("\n")}

### Incident Contacts

${INCIDENT_CONTACT_REFERENCES.map((line) => `- ${line}`).join("\n")}

## Integrity Positioning

- Each deployment white paper documents deployment mode, addresses, constructor and initializer parameters, and transaction provenance.
- Cross-chain integrity should verify LayerZero endpoint correctness and sale/control policy parity between Base and Arbitrum.
- Governance and operations teams should use this artifact set during release sign-off and post-deployment audits.

## Recommended Next Controls

1. Add automated ABI/proxy verification references per deployment white paper.
2. Link each white paper to operational runbooks and incident response contacts.
3. Add chain-level risk scoring (liquidity, oracle, messaging, and upgradeability risk domains).

---

Generated by scripts/generate-contract-whitepapers.mjs
`;
}

function main() {
  if (!exists(DEPLOY_DIR)) {
    console.error("deploy directory not found.");
    process.exit(1);
  }

  const deploymentFiles = fs
    .readdirSync(DEPLOY_DIR, { withFileTypes: true })
    .filter((d) => d.isFile() && /^deployment-.*\.json$/i.test(d.name))
    .map((d) => path.join(DEPLOY_DIR, d.name));

  const parsed = [];

  for (const filePath of deploymentFiles) {
    const record = readJson(filePath);
    if (!record) continue;

    const stats = fs.statSync(filePath);
    parsed.push({
      filePath,
      fileName: path.basename(filePath),
      record,
      deployedAt: detectTimestamp(record, stats)
    });
  }

  parsed.sort((a, b) => b.deployedAt - a.deployedAt);

  const selected = includeAll ? parsed : parsed.slice(0, limit);

  if (!selected.length) {
    console.error("No deployment JSON files could be parsed.");
    process.exit(1);
  }

  safeMkdir(OUTPUT_DIR);

  if (clean && exists(OUTPUT_DIR)) {
    const existing = fs.readdirSync(OUTPUT_DIR, { withFileTypes: true })
      .filter((d) => d.isFile() && d.name.toLowerCase().endsWith(".md"));

    for (const file of existing) {
      const full = path.join(OUTPUT_DIR, file.name);
      if (!dryRun) fs.unlinkSync(full);
    }
  }

  const writeResults = [];
  const enriched = [];

  for (const item of selected) {
    const resolvedName = resolveContractName(item.record, item.fileName);
    const sourceStem = slugify(item.fileName.replace(/^deployment-/i, "").replace(/\.json$/i, ""));
    const outFileName = `${slugify(resolvedName)}-${slugify(item.record.network)}-${item.deployedAt.getTime()}-${sourceStem}.md`;
    const outFilePath = path.join(OUTPUT_DIR, outFileName);
    const body = composePerDeploymentWhitepaper(item);

    const res = writeText(outFilePath, body);
    writeResults.push(res);

    enriched.push({ ...item, outFileName, resolvedName });
  }

  const summaryContent = composeSystemSummary(enriched);
  writeResults.push(writeText(SUMMARY_FILE, summaryContent));

  const created = writeResults.filter((r) => r.action === "created").length;
  const overwritten = writeResults.filter((r) => r.action === "overwritten").length;
  const skipped = writeResults.filter((r) => r.action === "skipped").length;

  console.log("Contract White Paper Generator");
  console.log(`Mode: ${dryRun ? "dry-run" : "write"}`);
  console.log(`Selection: ${includeAll ? "all deployments" : `latest ${limit}`}`);
  console.log(`Overwrite existing: ${force ? "yes" : "no"}`);
  console.log(`Clean existing generated files: ${clean ? "yes" : "no"}`);
  console.log("\nOutputs:");

  for (const r of writeResults) {
    console.log(`- ${r.action}: ${path.relative(root, r.filePath).replace(/\\/g, "/")}`);
  }

  console.log("\nSummary:");
  console.log(`- deployment files parsed: ${parsed.length}`);
  console.log(`- white papers targeted: ${selected.length}`);
  console.log(`- created: ${created}`);
  console.log(`- overwritten: ${overwritten}`);
  console.log(`- skipped: ${skipped}`);

  console.log("\nCommands:");
  console.log("- node scripts/generate-contract-whitepapers.mjs");
  console.log("- node scripts/generate-contract-whitepapers.mjs --limit=20");
  console.log("- node scripts/generate-contract-whitepapers.mjs --all");
  console.log("- node scripts/generate-contract-whitepapers.mjs --dry-run");
  console.log("- node scripts/generate-contract-whitepapers.mjs --force");
  console.log("- node scripts/generate-contract-whitepapers.mjs --all --force --clean");
}

main();
