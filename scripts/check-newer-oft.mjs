import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const baseConfig = config.networks.base;
const arbitrumConfig = config.networks.arbitrum;
const oftConfig = config.oft;

const baseProvider = new ethers.JsonRpcProvider(baseConfig.rpc);
const arbitrumProvider = new ethers.JsonRpcProvider(arbitrumConfig.rpc);

const endpointAbi = [
  "function isDefaultSendLibrary(address oapp, uint32 eid) external view returns (bool)",
  "function isDefaultReceiveLibrary(address oapp, uint32 eid) external view returns (bool)",
  "function getSendLibrary(address oapp, uint32 eid) external view returns (address)",
  "function getReceiveLibrary(address oapp, uint32 eid) external view returns ((address lib, bool isDefault) config)",
  "function getConfig(address oapp, address lib, uint32 eid, uint32 configType) external view returns (bytes)",
];

const endpointAddr = baseConfig.endpoint;

async function checkChain(chainName, provider, eid, remoteEid, oftAddr) {
  console.log(`\n=== ${chainName} ===`);
  const endpoint = new ethers.Contract(endpointAddr, endpointAbi, provider);

  try {
    // Check send lib
    const sendLib = await endpoint.getSendLibrary(oftAddr, remoteEid);
    console.log(`Send Library (to ${remoteEid}): ${sendLib}`);

    // Check receive lib
    const receiveLib = await endpoint.getReceiveLibrary(oftAddr, eid);
    console.log(`Receive Library (from local): ${receiveLib[0]}`);

    // Check for ULN config (configType 0 = ULN send, 1 = ULN receive)
    try {
      const ulnSendConfig = await endpoint.getConfig(
        oftAddr,
        sendLib,
        remoteEid,
        0
      );
      console.log(`ULN Send Config length: ${ulnSendConfig.length}`);
      if (ulnSendConfig.length > 0) {
        console.log(`  Data: ${ulnSendConfig.slice(0, 130)}...`);
      } else {
        console.log(`  (empty or not set)`);
      }
    } catch (e) {
      console.log(`ULN Send Config: not set or error`);
    }

    try {
      const ulnRecvConfig = await endpoint.getConfig(
        oftAddr,
        receiveLib[0],
        remoteEid,
        1
      );
      console.log(`ULN Receive Config length: ${ulnRecvConfig.length}`);
      if (ulnRecvConfig.length > 0) {
        console.log(`  Data: ${ulnRecvConfig.slice(0, 130)}...`);
      } else {
        console.log(`  (empty or not set)`);
      }
    } catch (e) {
      console.log(`ULN Receive Config: not set or error`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function main() {
  console.log("Checking newer OFT pair configuration...\n");
  console.log(`Base OFT: ${oftConfig.base.address}`);
  console.log(`Arbitrum OFT: ${oftConfig.arbitrum.address}`);
  console.log(`Endpoint: ${endpointAddr}`);

  await checkChain(
    "Base",
    baseProvider,
    oftConfig.base.lzEid,
    oftConfig.arbitrum.lzEid,
    oftConfig.base.address
  );

  await checkChain(
    "Arbitrum",
    arbitrumProvider,
    oftConfig.arbitrum.lzEid,
    oftConfig.base.lzEid,
    oftConfig.arbitrum.address
  );
}

main().catch(console.error);
