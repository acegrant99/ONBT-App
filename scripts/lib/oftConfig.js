import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");

export function loadOFTConfig() {
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  return {
    base: {
      address: config.oft.base.address,
      chainId: config.oft.base.chainId,
      lzEid: config.oft.base.lzEid,
      endpoint: config.networks.base.endpoint,
      rpc: config.networks.base.rpc,
    },
    arbitrum: {
      address: config.oft.arbitrum.address,
      chainId: config.oft.arbitrum.chainId,
      lzEid: config.oft.arbitrum.lzEid,
      endpoint: config.networks.arbitrum.endpoint,
      rpc: config.networks.arbitrum.rpc,
    },
  };
}

export function getBaseOFT() {
  const config = loadOFTConfig();
  return config.base.address;
}

export function getArbitrumOFT() {
  const config = loadOFTConfig();
  return config.arbitrum.address;
}

export function getOFTByChain(chainId) {
  const config = loadOFTConfig();
  if (chainId === 8453) return config.base.address;
  if (chainId === 42161) return config.arbitrum.address;
  throw new Error(`Unknown chain ID: ${chainId}`);
}

export default loadOFTConfig;
