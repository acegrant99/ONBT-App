import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const configPath = path.join(process.cwd(), "config", "oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const EXPECTED_BASE = {
  sendLibrary: "0xb5320b0b3a13cc860893e2bd79fcd7e13484dda2",
  receiveLibrary: "0xc70ab6f32772f59bfbc23889caf4ba3376c84baf",
  executor: "0x2cca08ae69e0c44b18a57ab2a87644234daebaE4".toLowerCase(),
  confirmations: 10,
  requiredDvns: [
    "0x9e059a54699a285714207b43b055483e78faac25",
    "0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc"
  ]
};

const abiCoder = ethers.AbiCoder ? ethers.AbiCoder.defaultAbiCoder() : ethers.utils.defaultAbiCoder;

const ENDPOINT_ABI = [
  "function getSendLibrary(address sender, uint32 dstEid) external view returns (address lib)",
  "function getReceiveLibrary(address receiver, uint32 srcEid) external view returns (address lib, bool isDefault)",
  "function getConfig(address oapp, address lib, uint32 eid, uint32 configType) external view returns (bytes memory)"
];

async function main() {
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  const isBase = chainId === 8453;
  const isArb = chainId === 42161;

  if (!isBase && !isArb) {
    throw new Error(`Unsupported chainId: ${chainId}`);
  }

  const local = isBase ? config.oft.base : config.oft.arbitrum;
  const remote = isBase ? config.oft.arbitrum : config.oft.base;
  const endpointAddress = isBase ? config.networks.base.endpoint : config.networks.arbitrum.endpoint;
  const remoteEid = isBase ? config.networks.arbitrum.lzEid : config.networks.base.lzEid;

  console.log(`\nCompare config on ${isBase ? "BASE" : "ARBITRUM"}`);
  console.log("Local OFT:", local.address);
  console.log("Remote OFT:", remote.address);
  console.log("Endpoint:", endpointAddress);
  console.log("Remote EID:", remoteEid);

  const endpoint = await ethers.getContractAt(ENDPOINT_ABI, endpointAddress);

  const sendLib = (await endpoint.getSendLibrary(local.address, remoteEid)).toLowerCase();
  const receiveLibInfo = await endpoint.getReceiveLibrary(local.address, remoteEid);
  const receiveLib = receiveLibInfo[0].toLowerCase();

  console.log("\nSend Library:", sendLib);
  console.log("Receive Library:", receiveLib);

  try {
    const ulnConfigRaw = await endpoint.getConfig(local.address, sendLib, remoteEid, 2);
    if (ulnConfigRaw && ulnConfigRaw !== "0x") {
      const decoded = abiCoder.decode(
        ["tuple(uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)"],
        ulnConfigRaw
      );
      const cfg = decoded[0];
      const confirmations = Number(cfg.confirmations.toString());
      const requiredDvns = cfg.requiredDVNs.map((d) => d.toLowerCase());

      console.log("\nULN Confirmations:", confirmations);
      console.log("Required DVNs:", requiredDvns);

      if (isBase) {
        const expectedDvns = EXPECTED_BASE.requiredDvns;
        const dvnsMatch = expectedDvns.every((d) => requiredDvns.includes(d));
        console.log(dvnsMatch ? "✅ Required DVNs match expected" : "❌ Required DVNs mismatch");
        console.log(
          confirmations === EXPECTED_BASE.confirmations
            ? "✅ Confirmations match expected"
            : "❌ Confirmations mismatch"
        );
      }
    } else {
      console.log("\nULN Config: empty");
    }
  } catch (err) {
    console.log("\nULN Config read failed:", err.reason || err.message);
  }

  try {
    const execRaw = await endpoint.getConfig(local.address, sendLib, remoteEid, 1);
    if (execRaw && execRaw !== "0x") {
      const decoded = abiCoder.decode(["uint32", "address"], execRaw);
      const execAddress = decoded[1].toLowerCase();
      console.log("\nExecutor Address:", execAddress);
      if (isBase) {
        console.log(
          execAddress === EXPECTED_BASE.executor
            ? "✅ Executor matches expected"
            : "❌ Executor mismatch"
        );
      }
    } else {
      console.log("\nExecutor Config: empty");
    }
  } catch (err) {
    console.log("\nExecutor config read failed:", err.reason || err.message);
  }

  if (isBase) {
    console.log("\nExpected (Base) from successful tx:");
    console.log("  Send Library:", EXPECTED_BASE.sendLibrary);
    console.log("  Receive Library:", EXPECTED_BASE.receiveLibrary);
    console.log("  Executor:", EXPECTED_BASE.executor);
    console.log("  Confirmations:", EXPECTED_BASE.confirmations);
    console.log("  Required DVNs:", EXPECTED_BASE.requiredDvns);
  }
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Compare failed:", error);
  process.exit(1);
});
