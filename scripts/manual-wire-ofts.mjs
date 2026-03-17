import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "../config/oft-configuration.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY not set");
}

const baseConfig = config.networks.base;
const arbitrumConfig = config.networks.arbitrum;
const oftConfig = config.oft;

const baseProvider = new ethers.JsonRpcProvider(baseConfig.rpc);
const arbitrumProvider = new ethers.JsonRpcProvider(arbitrumConfig.rpc);

const baseSigner = new ethers.Wallet(PRIVATE_KEY, baseProvider);
const arbitrumSigner = new ethers.Wallet(PRIVATE_KEY, arbitrumProvider);

const SEND_ULN_302 = "0x1ccBf0db9C192d969de57E25B3fF09A25bb1D862";

// OFT interface for setting peers and config
const OFT_ABI = [
  "function setPeer(uint32 _eid, bytes32 _peer) external",
  "function peers(uint32 eid) external view returns (bytes32)",
  "function owner() external view returns (address)",
];

async function wireOFTs() {
  try {
    console.log("\n=== Manual LayerZero OFT Wiring ===\n");

    // 1. Set peers on Base OFT
    console.log("1. Setting peer on Base OFT (→ Arbitrum)");
    const baseOft = new ethers.Contract(
      oftConfig.base.address,
      OFT_ABI,
      baseSigner
    );

    const baseOwner = await baseOft.owner();
    if (baseOwner.toLowerCase() !== baseSigner.address.toLowerCase()) {
      console.error(`   ERROR: Not owner (${baseOwner})`);
      return;
    }

    const arbPeerBytes32 = ethers.zeroPadValue(oftConfig.arbitrum.address, 32);
    console.log(`   Setting Arbitrum peer: ${oftConfig.arbitrum.address}`);

    try {
      const basePeerTx = await baseOft.setPeer(
        arbitrumConfig.lzEid,
        arbPeerBytes32,
        { gasLimit: 200000 }
      );
      console.log(`   Tx: ${basePeerTx.hash}`);
      const basePeerReceipt = await basePeerTx.wait();
      if (basePeerReceipt?.status === 1) {
        console.log(`   ✓ Peer set on Base`);
      } else {
        console.error(`   ✗ Failed`);
        return;
      }
    } catch (err) {
      console.error(`   ✗ Error: ${err.reason || err.message}`);
      return;
    }

    // 2. Set peers on Arbitrum OFT
    console.log("\n2. Setting peer on Arbitrum OFT (→ Base)");
    const arbOft = new ethers.Contract(
      oftConfig.arbitrum.address,
      OFT_ABI,
      arbitrumSigner
    );

    const arbOwner = await arbOft.owner();
    if (arbOwner.toLowerCase() !== arbitrumSigner.address.toLowerCase()) {
      console.error(`   ERROR: Not owner (${arbOwner})`);
      return;
    }

    const basePeerBytes32 = ethers.zeroPadValue(oftConfig.base.address, 32);
    console.log(`   Setting Base peer: ${oftConfig.base.address}`);

    try {
      const arbPeerTx = await arbOft.setPeer(
        baseConfig.lzEid,
        basePeerBytes32,
        { gasLimit: 200000 }
      );
      console.log(`   Tx: ${arbPeerTx.hash}`);
      const arbPeerReceipt = await arbPeerTx.wait();
      if (arbPeerReceipt?.status === 1) {
        console.log(`   ✓ Peer set on Arbitrum`);
      } else {
        console.error(`   ✗ Failed`);
        return;
      }
    } catch (err) {
      console.error(`   ✗ Error: ${err.reason || err.message}`);
      return;
    }

    // 3. Verify peers
    console.log("\n3. Verifying peers were set...");
    const basePeer = await baseOft.peers(arbitrumConfig.lzEid);
    const arbPeer = await arbOft.peers(baseConfig.lzEid);

    if (basePeer === arbPeerBytes32) {
      console.log(`   ✓ Base → Arbitrum peer correct`);
    } else {
      console.log(`   ✗ Base peer mismatch: ${basePeer}`);
    }

    if (arbPeer === basePeerBytes32) {
      console.log(`   ✓ Arbitrum → Base peer correct`);
    } else {
      console.log(`   ✗ Arbitrum peer mismatch: ${arbPeer}`);
    }

    console.log("\n✓ OFT wiring complete!");
    console.log("\nNote: ULN/DVN config requires endpoint authorization.");
    console.log("      For full setup, use: npx hardhat lz:oapp:wire");
    console.log("      (Requires Node 20 LTS with zksync-web3 dependency fixed)\n");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

wireOFTs();
