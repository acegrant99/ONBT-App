#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const asJson = args.has("--json");
const softMode = args.has("--soft");

const errors = [];
const warnings = [];
const info = [];
let demotedErrorCount = 0;

function addError(check, message) {
  if (softMode) {
    demotedErrorCount += 1;
    warnings.push({ check, message: `[soft] ${message}` });
    return;
  }

  errors.push({ check, message });
}

function addWarning(check, message) {
  warnings.push({ check, message });
}

function addInfo(check, message) {
  info.push({ check, message });
}

function abs(rel) {
  return path.join(root, rel);
}

function exists(rel) {
  return fs.existsSync(abs(rel));
}

function readText(rel) {
  try {
    return fs.readFileSync(abs(rel), "utf8");
  } catch {
    return "";
  }
}

function readJson(rel, checkName) {
  if (!exists(rel)) {
    addError(checkName, `Missing file: ${rel}`);
    return null;
  }

  try {
    return JSON.parse(readText(rel));
  } catch (error) {
    addError(checkName, `Invalid JSON in ${rel}: ${error.message}`);
    return null;
  }
}

function walkFiles(startRel, collector = []) {
  const start = abs(startRel);
  if (!fs.existsSync(start)) return collector;

  const entries = fs.readdirSync(start, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(start, entry.name);
    const rel = path.relative(root, full).replace(/\\/g, "/");
    if (entry.isDirectory()) {
      walkFiles(rel, collector);
    } else {
      collector.push(rel);
    }
  }
  return collector;
}

function isAddress(value) {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

function hasTodo(value) {
  if (typeof value === "string") {
    return /TODO_/i.test(value) || value.includes("TODO");
  }
  if (Array.isArray(value)) return value.some(hasTodo);
  if (value && typeof value === "object") return Object.values(value).some(hasTodo);
  return false;
}

function findPackageInLock(name) {
  const lockPath = abs("package-lock.json");
  if (!fs.existsSync(lockPath)) return false;
  const lockText = fs.readFileSync(lockPath, "utf8");
  return lockText.includes(`"node_modules/${name}"`) || lockText.includes(`"${name}"`);
}

async function loadLayerZeroMjs() {
  const rel = "config/layerzero.config.mjs";
  if (!exists(rel)) return null;
  try {
    const mod = await import(`${pathToFileURL(abs(rel)).href}?ts=${Date.now()}`);
    return mod?.default ?? null;
  } catch (error) {
    addWarning("layerzero-config", `Unable to import ${rel}: ${error.message}`);
    return null;
  }
}

function validateTemplatesPresent() {
  const required = [
    "config/integrity/layerzero.interop.template.json",
    "config/integrity/chainbase.backend.template.json",
    "config/integrity/frontend.advancement.template.json",
    "config/integrity/dependency-integrity.template.json"
  ];

  for (const rel of required) {
    if (!exists(rel)) {
      addError("template-files", `Missing required template: ${rel}`);
    } else {
      addInfo("template-files", `Found template: ${rel}`);
    }
  }
}

function validateLayerZeroTemplate(layerzeroTemplate, layerzeroConfigMjs) {
  const check = "layerzero-template";
  if (!layerzeroTemplate) return;

  if (hasTodo(layerzeroTemplate)) {
    addWarning(check, "Template still contains TODO placeholders.");
  }

  const chains = Array.isArray(layerzeroTemplate.chains) ? layerzeroTemplate.chains : [];
  if (!chains.length) {
    addError(check, "chains[] is missing or empty.");
    return;
  }

  const chainNames = new Set(chains.map((c) => String(c.name || "").toLowerCase()));
  for (const required of ["base", "arbitrum"]) {
    if (!chainNames.has(required)) {
      addError(check, `Missing required chain in template: ${required}`);
    }
  }

  for (const chain of chains) {
    if (typeof chain.eid !== "number") {
      addError(check, `Chain ${chain.name || "<unknown>"} has invalid eid.`);
    }

    if (!chain.endpoint || /^0x0{40}$/i.test(chain.endpoint)) {
      addWarning(check, `Chain ${chain.name || "<unknown>"} endpoint is placeholder/zero.`);
    } else if (!isAddress(chain.endpoint)) {
      addError(check, `Chain ${chain.name || "<unknown>"} endpoint is not a valid address.`);
    }

    if (!Array.isArray(chain.requiredDVNs) || chain.requiredDVNs.length < 2) {
      addWarning(check, `Chain ${chain.name || "<unknown>"} should define at least 2 requiredDVNs.`);
    }

    if (Array.isArray(chain.requiredDVNs)) {
      for (const dvn of chain.requiredDVNs) {
        if (String(dvn).startsWith("TODO")) continue;
        if (!isAddress(String(dvn))) {
          addError(check, `Chain ${chain.name || "<unknown>"} has invalid DVN address: ${dvn}`);
        }
      }
    }

    if (typeof chain.confirmations !== "number" || chain.confirmations <= 0) {
      addError(check, `Chain ${chain.name || "<unknown>"} confirmations must be a positive number.`);
    }
  }

  if (!layerzeroConfigMjs) {
    addWarning(check, "config/layerzero.config.mjs not available for cross-check.");
    return;
  }

  const contractEids = new Set((layerzeroConfigMjs.contracts || []).map((c) => c.endpointId));
  for (const chain of chains) {
    if (typeof chain.eid === "number" && !contractEids.has(chain.eid)) {
      addError(check, `No contract entry for EID ${chain.eid} in config/layerzero.config.mjs`);
    }
  }

  const connectionPairs = new Set((layerzeroConfigMjs.connections || []).map((c) => `${c.from}->${c.to}`));
  if (chains.length >= 2) {
    for (let i = 0; i < chains.length; i += 1) {
      for (let j = 0; j < chains.length; j += 1) {
        if (i === j) continue;
        const from = chains[i].eid;
        const to = chains[j].eid;
        if (typeof from === "number" && typeof to === "number") {
          const pair = `${from}->${to}`;
          if (!connectionPairs.has(pair)) {
            addError(check, `Missing LayerZero connection in config/layerzero.config.mjs: ${pair}`);
          }
        }
      }
    }
  }
}

function validateChainbaseTemplate(chainbaseTemplate, layerzeroTemplate) {
  const check = "chainbase-template";
  if (!chainbaseTemplate) return;

  if (hasTodo(chainbaseTemplate)) {
    addWarning(check, "Template still contains TODO placeholders.");
  }

  const sdk = chainbaseTemplate.sdk || {};
  if (sdk.package !== "@chainbase/sdk") {
    addError(check, `sdk.package must be @chainbase/sdk (found: ${sdk.package || "<empty>"})`);
  }

  if (typeof sdk.endpoint !== "string" || !sdk.endpoint.startsWith("https://")) {
    addError(check, "sdk.endpoint must be an https URL.");
  }

  const datasets = Array.isArray(chainbaseTemplate.datasets) ? chainbaseTemplate.datasets : [];
  if (!datasets.length) {
    addError(check, "datasets[] is missing or empty.");
  }

  const lzChains = new Set((layerzeroTemplate?.chains || []).map((c) => String(c.name || "").toLowerCase()));
  for (const row of datasets) {
    const chain = String(row.chain || "").toLowerCase();
    if (!chain) {
      addError(check, "Dataset entry missing chain.");
      continue;
    }
    if (lzChains.size && !lzChains.has(chain)) {
      addError(check, `Dataset chain ${chain} is not present in layerzero template chains[]`);
    }

    const contractAddress = String(row.contractAddress || "");
    if (!contractAddress.startsWith("TODO") && !isAddress(contractAddress)) {
      addError(check, `Dataset contractAddress invalid for chain ${chain}: ${contractAddress}`);
    }

    if (!Array.isArray(row.eventSignatures) || row.eventSignatures.length === 0) {
      addError(check, `Dataset eventSignatures[] missing for chain ${chain}`);
    }
  }
}

function validateFrontendTemplate(frontendTemplate) {
  const check = "frontend-template";
  if (!frontendTemplate) return;

  if (hasTodo(frontendTemplate)) {
    addWarning(check, "Template still contains TODO placeholders.");
  }

  const contractsConfigPath = "frontend/src/config/contracts.ts";
  if (!exists(contractsConfigPath)) {
    addError(check, `Missing ${contractsConfigPath}`);
    return;
  }

  const contractsConfigText = readText(contractsConfigPath);
  const requiredChains = frontendTemplate?.walletSupport?.requiredChains || [];
  for (const chainName of requiredChains) {
    const low = String(chainName).toLowerCase();
    if (low === "base" && !/BASE\s*:\s*8453/.test(contractsConfigText)) {
      addError(check, "Base chain mapping missing in frontend/src/config/contracts.ts");
    }
    if (low === "arbitrum" && !/ARBITRUM\s*:\s*42161/.test(contractsConfigText)) {
      addError(check, "Arbitrum chain mapping missing in frontend/src/config/contracts.ts");
    }
  }

  if (frontendTemplate?.uiIntegrity?.requireAbiDecodingChecks) {
    if (!exists("frontend/src/lib/abiParser.ts")) {
      addError(check, "ABI parser expected but frontend/src/lib/abiParser.ts is missing.");
    }
  }
}

function validateDependencies(depTemplate) {
  const check = "dependency-template";
  if (!depTemplate) return;

  const frontendPkg = readJson("frontend/package.json", check);

  let rootPkg = null;
  try {
    rootPkg = JSON.parse(readText("package.json"));
  } catch {
    addWarning(check, "Root package.json is not valid JSON; falling back to package-lock.json scan.");
  }

  const rootDependencies = {
    ...(rootPkg?.dependencies || {}),
    ...(rootPkg?.devDependencies || {})
  };

  const frontendDependencies = {
    ...(frontendPkg?.dependencies || {}),
    ...(frontendPkg?.devDependencies || {})
  };

  const requiredRoot = depTemplate?.requiredPackages?.root || [];
  for (const pkg of requiredRoot) {
    const inRootPkg = Boolean(rootDependencies[pkg]);
    const inRootLock = findPackageInLock(pkg);

    if (!inRootPkg && !inRootLock) {
      addError(check, `Missing required root package: ${pkg}`);
    }
  }

  const requiredFrontend = depTemplate?.requiredPackages?.frontend || [];
  for (const pkg of requiredFrontend) {
    if (!frontendDependencies[pkg]) {
      addError(check, `Missing required frontend package: ${pkg}`);
    }
  }

  if (!exists("package-lock.json")) {
    addWarning(check, "Root package-lock.json missing (lockfileRequired policy).");
  }
}

function validateDeploymentsAndAbis() {
  const check = "deployments-abi";

  const deployFiles = exists("deploy")
    ? fs.readdirSync(abs("deploy"), { withFileTypes: true }).filter((d) => d.isFile()).map((f) => f.name)
    : [];

  const hasBaseDeployment = deployFiles.some((name) => /deployment-.*base/i.test(name));
  const hasArbitrumDeployment = deployFiles.some((name) => /deployment-.*arbitrum/i.test(name));

  if (!hasBaseDeployment) {
    addError(check, "No base deployment file found in deploy/.");
  }
  if (!hasArbitrumDeployment) {
    addError(check, "No arbitrum deployment file found in deploy/.");
  }

  const artifactFiles = walkFiles("artifacts/contracts").filter((f) => f.endsWith(".json"));
  if (!artifactFiles.length) {
    addError(check, "No contract artifact JSON files found in artifacts/contracts.");
    return;
  }

  let abiFileCount = 0;
  for (const rel of artifactFiles.slice(0, 3000)) {
    const text = readText(rel);
    if (text.includes('"abi"')) {
      abiFileCount += 1;
    }
  }

  if (!abiFileCount) {
    addError(check, "No ABI-bearing artifact files detected in artifacts/contracts.");
  } else {
    addInfo(check, `Detected ${abiFileCount} artifact file(s) containing ABI data.`);
  }
}

function printHuman() {
  console.log("Integrity Foundation Validator");
  console.log(`Mode: ${softMode ? "soft" : "strict"}`);

  console.log("\n=== Info ===");
  if (info.length === 0) {
    console.log("No info messages.");
  } else {
    for (const item of info) {
      console.log(`- [${item.check}] ${item.message}`);
    }
  }

  console.log("\n=== Warnings ===");
  if (warnings.length === 0) {
    console.log("No warnings.");
  } else {
    for (const item of warnings) {
      console.log(`- [${item.check}] ${item.message}`);
    }
  }

  console.log("\n=== Errors ===");
  if (errors.length === 0) {
    console.log("No errors.");
  } else {
    for (const item of errors) {
      console.log(`- [${item.check}] ${item.message}`);
    }
  }

  console.log("\n=== Summary ===");
  console.log(`errors: ${errors.length}`);
  console.log(`warnings: ${warnings.length}`);
  console.log(`info: ${info.length}`);
  if (softMode) {
    console.log(`demoted-errors: ${demotedErrorCount}`);
  }
}

async function main() {
  validateTemplatesPresent();

  const layerzeroTemplate = readJson("config/integrity/layerzero.interop.template.json", "layerzero-template");
  const chainbaseTemplate = readJson("config/integrity/chainbase.backend.template.json", "chainbase-template");
  const frontendTemplate = readJson("config/integrity/frontend.advancement.template.json", "frontend-template");
  const dependencyTemplate = readJson("config/integrity/dependency-integrity.template.json", "dependency-template");

  const layerzeroConfigMjs = await loadLayerZeroMjs();

  validateLayerZeroTemplate(layerzeroTemplate, layerzeroConfigMjs);
  validateChainbaseTemplate(chainbaseTemplate, layerzeroTemplate);
  validateFrontendTemplate(frontendTemplate);
  validateDependencies(dependencyTemplate);
  validateDeploymentsAndAbis();

  const output = {
    ok: errors.length === 0,
    errors,
    warnings,
    info,
    summary: {
      errors: errors.length,
      warnings: warnings.length,
      info: info.length,
      demotedErrors: demotedErrorCount,
      mode: softMode ? "soft" : "strict"
    }
  };

  if (asJson) {
    console.log(JSON.stringify(output, null, 2));
  } else {
    printHuman();
  }

  process.exitCode = output.ok ? 0 : 1;
}

main();
