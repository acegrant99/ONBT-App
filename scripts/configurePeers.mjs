import hre from "hardhat";
const { ethers } = hre;
import { LayerZeroChainIds } from "../constants/layerzero.mjs";

const zeroPadValue = (value, length) => (
  ethers.zeroPadValue ? ethers.zeroPadValue(value, length) : ethers.utils.hexZeroPad(value, length)
);

/**
 * Configure Cross-Chain Peers for OFTV2 Architecture
 * 
 * This script sets up trusted remotes (peers) for:
 * - ONBT Token (OFTV2)
 * - Governance OApp
 * - Omnichain Vault
 * 
 * Configuration:
 * 1. Update CONTRACT_ADDRESSES with deployed addresses
 * 2. Run on each chain to establish bidirectional trust
 */

// ============ Configuration ============

const CONTRACT_ADDRESSES = {
  // Base (Hub Chain)
  base: {
    onbt: "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5",
    governanceOApp: "0x0000000000000000000000000000000000000000",
    vault: "0xFd06Ecbd22b208f398E4d822904F7114642eF9b9"
  },
  
  // Ethereum (Destination)
  ethereum: {
    onbt: "0x0000000000000000000000000000000000000000",
    governanceOApp: "0x0000000000000000000000000000000000000000",
    vault: "0x0000000000000000000000000000000000000000"
  },
  
  // Polygon (Destination)
  polygon: {
    onbt: "0x0000000000000000000000000000000000000000",
    governanceOApp: "0x0000000000000000000000000000000000000000",
    vault: "0x0000000000000000000000000000000000000000"
  },
  
  // Arbitrum (Destination)
  arbitrum: {
    onbt: "0x169aC761Ebb210B5A93B68B44DA394776a7B230C",
    governanceOApp: "0x0000000000000000000000000000000000000000",
    vault: "0x85fE97c69350Be8B9A6bC026006907E34324CD6A"
  },
  
  // Optimism (Destination)
  optimism: {
    onbt: "0x0000000000000000000000000000000000000000",
    governanceOApp: "0x0000000000000000000000000000000000000000",
    vault: "0x0000000000000000000000000000000000000000"
  },
  
  // BSC (Destination)
  bsc: {
    onbt: "0x0000000000000000000000000000000000000000",
    governanceOApp: "0x0000000000000000000000000000000000000000",
    vault: "0x0000000000000000000000000000000000000000"
  },
  
  // Avalanche (Destination)
  avalanche: {
    onbt: "0x0000000000000000000000000000000000000000",
    governanceOApp: "0x0000000000000000000000000000000000000000",
    vault: "0x0000000000000000000000000000000000000000"
  }
};

// Current network configuration
const CURRENT_NETWORK = process.env.NETWORK || "base";
const CURRENT_ADDRESSES = CONTRACT_ADDRESSES[CURRENT_NETWORK];

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║        Configure Cross-Chain Peers (OFTV2)                ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  const [deployer] = await ethers.getSigners();
  let nextNonce = await deployer.getTransactionCount("pending");
  
  console.log("📝 Configuration:");
  console.log("   Deployer:", deployer.address);
  console.log("   Current Network:", CURRENT_NETWORK);
  console.log("   Current Addresses:");
  console.log("     ONBT:", CURRENT_ADDRESSES.onbt);
  console.log("     Governance OApp:", CURRENT_ADDRESSES.governanceOApp);
  console.log("     Vault:", CURRENT_ADDRESSES.vault, "\n");
  
  // Validate addresses
  const allZero = Object.values(CURRENT_ADDRESSES).every(addr => addr === "0x0000000000000000000000000000000000000000");
  if (allZero) {
    throw new Error("❌ Please update CONTRACT_ADDRESSES in script with deployed addresses");
  }
  
  // ============================================================================
  // STEP 1: Configure ONBT Token Peers
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 1: Configuring ONBT Token Peers");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const OmnichainNabatOFT = await ethers.getContractFactory("OmnichainNabatOFT");
  const onbt = OmnichainNabatOFT.attach(CURRENT_ADDRESSES.onbt);
  
  for (const [chainName, addresses] of Object.entries(CONTRACT_ADDRESSES)) {
    if (chainName === CURRENT_NETWORK) continue;
    if (addresses.onbt === "0x0000000000000000000000000000000000000000") continue;
    
    const eid = LayerZeroChainIds[chainName];
    if (!eid) {
      console.log(`   ⚠️  Skipping ${chainName}: No EID configured`);
      continue;
    }
    
    console.log(`   Setting peer for ${chainName} (${eid})...`);
    try {
      const tx = await onbt.setPeer(eid, zeroPadValue(addresses.onbt, 32), {
        nonce: nextNonce++
      });
      await tx.wait();
      console.log(`   ✅ ${chainName}: ${addresses.onbt}\n`);
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}\n`);
    }
  }
  
  // ============================================================================
  // STEP 2: Configure Governance OApp Peers
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 2: Configuring Governance OApp Peers");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  if (CURRENT_ADDRESSES.governanceOApp === "0x0000000000000000000000000000000000000000") {
    console.log("   ⏭️  Skipping Governance OApp: current network governance address not configured\n");
  } else {
    let governanceOApp;
    try {
      const ONBTGovernanceOApp = await ethers.getContractFactory("ONBTGovernanceOApp");
      governanceOApp = ONBTGovernanceOApp.attach(CURRENT_ADDRESSES.governanceOApp);
    } catch {
      console.log("   ⏭️  Skipping Governance OApp: artifact not found in this workspace\n");
    }

    if (governanceOApp) {
      for (const [chainName, addresses] of Object.entries(CONTRACT_ADDRESSES)) {
        if (chainName === CURRENT_NETWORK) continue;
        if (addresses.governanceOApp === "0x0000000000000000000000000000000000000000") continue;

        const eid = LayerZeroChainIds[chainName];
        if (!eid) continue;

        console.log(`   Setting peer for ${chainName} (${eid})...`);
        try {
          const tx = await governanceOApp.setPeer(eid, zeroPadValue(addresses.governanceOApp, 32), {
            nonce: nextNonce++
          });
          await tx.wait();
          console.log(`   ✅ ${chainName}: ${addresses.governanceOApp}\n`);
        } catch (error) {
          console.log(`   ❌ Failed: ${error.message}\n`);
        }
      }
    }
  }
  
  // ============================================================================
  // STEP 3: Configure Omnichain Vault Peers
  // ============================================================================
  
  console.log("═══════════════════════════════════════════════════════════");
  console.log("STEP 3: Configuring Omnichain Vault Peers");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  const ONBTOmnichainVault = await ethers.getContractFactory("ONBTOmnichainVault");
  const vault = ONBTOmnichainVault.attach(CURRENT_ADDRESSES.vault);
  
  for (const [chainName, addresses] of Object.entries(CONTRACT_ADDRESSES)) {
    if (chainName === CURRENT_NETWORK) continue;
    if (addresses.vault === "0x0000000000000000000000000000000000000000") continue;
    
    const eid = LayerZeroChainIds[chainName];
    if (!eid) continue;
    
    console.log(`   Setting peer for ${chainName} (${eid})...`);
    try {
      const tx = await vault.setPeer(eid, zeroPadValue(addresses.vault, 32), {
        nonce: nextNonce++
      });
      await tx.wait();
      console.log(`   ✅ ${chainName}: ${addresses.vault}\n`);
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}\n`);
    }
  }
  
  // ============================================================================
  // SUMMARY
  // ============================================================================
  
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║              PEER CONFIGURATION COMPLETE                   ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  console.log("✅ Peers configured on", CURRENT_NETWORK, "\n");
  
  console.log("📋 Next Steps:\n");
  console.log("1. Run this script on ALL OTHER chains to establish bidirectional trust");
  console.log("2. Verify peer configuration with contract view functions");
  console.log("3. Test cross-chain token transfers");
  console.log("4. Test governance message broadcasting");
  console.log("5. Test vault fund transfers");
  console.log("6. Configure ULN/DVN settings for security\n");
  
  console.log("🔍 Verification Commands:\n");
  console.log(`   ONBT.peers(eid)`);
  console.log(`   GovernanceOApp.peers(eid)`);
  console.log(`   Vault.peers(eid)\n`);
  
  console.log("🎉 Configuration successful!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Configuration failed:", error);
    process.exit(1);
  });
