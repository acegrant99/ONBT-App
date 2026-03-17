#!/usr/bin/env node

import dotenv from "dotenv";
import hre from "hardhat";
import fs from "fs";
import path from "path";
import { EventEmitter } from "events";

dotenv.config();

const { ethers } = hre;

function loadDeployment(networkName) {
  const filename = networkName === "base"
    ? "deploy/deployment-lzv2-resume-base-stakingfix-1771584423316.json"
    : "deploy/deployment-lzv2-resume-arbitrum-stakingfix-1771584790862.json";
  const fullPath = path.join(process.cwd(), filename);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

const baseDeployment = loadDeployment("base");
const arbitrumDeployment = loadDeployment("arbitrum");

const CONTRACTS = {
  base: {
    onbt: baseDeployment.contracts.onbtToken,
    staking: baseDeployment.contracts.staking,
    nft: baseDeployment.contracts.achievementNFT,
    rewards: baseDeployment.contracts.rewardsPool,
    router: baseDeployment.contracts.stakingRouter
  },
  arbitrum: {
    onbt: arbitrumDeployment.contracts.onbtToken,
    staking: arbitrumDeployment.contracts.staking,
    nft: arbitrumDeployment.contracts.achievementNFT,
    rewards: arbitrumDeployment.contracts.rewardsPool,
    router: arbitrumDeployment.contracts.stakingRouter
  }
};

const ABIS = {
  token: [
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
    "event Send(address indexed from, address indexed to, uint256 amountSent)"
  ],
  staking: [
    "event Staked(address indexed user, uint256 amount, uint256 timestamp)",
    "event Unstaked(address indexed user, uint256 amount, uint256 timestamp)",
    "event RewardsClaimed(address indexed user, uint256 amount)",
    "event RewardRateUpdated(uint256 newRate)"
  ],
  nft: [
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
    "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
    "event AchievementMinted(address indexed to, uint256 indexed tokenId, string achievement)"
  ]
};

class EventMonitor extends EventEmitter {
  constructor(networkName, rpcUrl) {
    super();
    this.networkName = networkName;
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.contracts = CONTRACTS[networkName];
    this.isRunning = false;
    this.listeners = {};
  }

  async start() {
    if (this.isRunning) {
      console.log(`Monitor already running for ${this.networkName}`);
      return;
    }

    this.isRunning = true;
    console.log(`\n${"=".repeat(70)}`);
    console.log(`EVENT MONITOR: ${this.networkName.toUpperCase()}`);
    console.log(`${"=".repeat(70)}\n`);

    // Listen to token transfers
    this.setupTokenMonitoring();
    
    // Listen to staking events
    this.setupStakingMonitoring();
    
    // Listen to NFT events
    this.setupNFTMonitoring();

    console.log("Monitor started. Listening for events...\n");
  }

  setupTokenMonitoring() {
    const iface = new ethers.utils.Interface(ABIS.token);
    const token = new ethers.Contract(this.contracts.onbt, iface, this.provider);

    token.on("Transfer", (from, to, value, event) => {
      const isSwap = from !== ethers.constants.AddressZero && 
                     to !== ethers.constants.AddressZero;
      const isMint = from === ethers.constants.AddressZero;
      const isBurn = to === ethers.constants.AddressZero;

      const amount = ethers.utils.formatUnits(value, 18);
      const timestamp = new Date().toLocaleTimeString();

      if (isMint) {
        console.log(`[${timestamp}] 💰 MINT: ${amount} ONBT to ${to.slice(0, 10)}...`);
      } else if (isBurn) {
        console.log(`[${timestamp}] 🔥 BURN: ${amount} ONBT from ${from.slice(0, 10)}...`);
      } else {
        console.log(`[${timestamp}] ↔️  TRANSFER: ${amount} ONBT (${from.slice(0, 10)}... → ${to.slice(0, 10)}...)`);
      }

      this.emit("token:transfer", { from, to, amount, event });
    });

    token.on("Approval", (owner, spender, amount, event) => {
      const timestamp = new Date().toLocaleTimeString();
      const approvedAmount = ethers.utils.formatUnits(amount, 18);
      console.log(`[${timestamp}] ✅ APPROVAL: ${owner.slice(0, 10)}... approved ${spender.slice(0, 10)}... for ${approvedAmount} ONBT`);
      this.emit("token:approval", { owner, spender, amount, event });
    });

    this.listeners.token = token;
  }

  setupStakingMonitoring() {
    const iface = new ethers.utils.Interface(ABIS.staking);
    const staking = new ethers.Contract(this.contracts.staking, iface, this.provider);

    staking.on("Staked", (user, amount, timestamp, event) => {
      const time = new Date().toLocaleTimeString();
      const stakedAmount = ethers.utils.formatUnits(amount, 18);
      console.log(`[${time}] 📌 STAKE: ${user.slice(0, 10)}... staked ${stakedAmount} ONBT`);
      this.emit("staking:stake", { user, amount, timestamp, event });
    });

    staking.on("Unstaked", (user, amount, timestamp, event) => {
      const time = new Date().toLocaleTimeString();
      const unstakedAmount = ethers.utils.formatUnits(amount, 18);
      console.log(`[${time}] 📌 UNSTAKE: ${user.slice(0, 10)}... unstaked ${unstakedAmount} ONBT`);
      this.emit("staking:unstake", { user, amount, timestamp, event });
    });

    staking.on("RewardsClaimed", (user, amount, event) => {
      const time = new Date().toLocaleTimeString();
      const rewardsAmount = ethers.utils.formatUnits(amount, 18);
      console.log(`[${time}] 🏆 REWARDS CLAIMED: ${user.slice(0, 10)}... claimed ${rewardsAmount} ONBT`);
      this.emit("staking:rewards", { user, amount, event });
    });

    staking.on("RewardRateUpdated", (newRate, event) => {
      const time = new Date().toLocaleTimeString();
      console.log(`[${time}] ⚙️  RATE UPDATE: New reward rate = ${newRate.toString()}`);
      this.emit("staking:rateupdate", { newRate, event });
    });

    this.listeners.staking = staking;
  }

  setupNFTMonitoring() {
    const iface = new ethers.utils.Interface(ABIS.nft);
    const nft = new ethers.Contract(this.contracts.nft, iface, this.provider);

    nft.on("Transfer", (from, to, tokenId, event) => {
      const time = new Date().toLocaleTimeString();
      const isMint = from === ethers.constants.AddressZero;

      if (isMint) {
        console.log(`[${time}] 🎖️  ACHIEVEMENT MINT: Token #${tokenId} minted to ${to.slice(0, 10)}...`);
        this.emit("nft:mint", { to, tokenId, event });
      } else {
        console.log(`[${time}] 🎖️  ACHIEVEMENT TRANSFER: #${tokenId} (${from.slice(0, 10)}... → ${to.slice(0, 10)}...)`);
        this.emit("nft:transfer", { from, to, tokenId, event });
      }
    });

    this.listeners.nft = nft;
  }

  stop() {
    if (!this.isRunning) return;

    Object.values(this.listeners).forEach(contract => {
      contract.removeAllListeners();
    });

    this.isRunning = false;
    console.log("\nMonitor stopped");
  }
}

class DualNetworkMonitor {
  constructor() {
    const baseRpc = process.env.BASE_RPC_URL || "https://base-mainnet.g.alchemy.com/v2/YOUR_KEY";
    const arbRpc = process.env.ARBITRUM_RPC_URL || "https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY";
    
    this.monitors = {
      base: new EventMonitor("base", baseRpc),
      arbitrum: new EventMonitor("arbitrum", arbRpc)
    };
    this.eventLog = [];
    this.setupAggregation();
  }

  setupAggregation() {
    // Aggregate events from both networks
    Object.values(this.monitors).forEach(monitor => {
      monitor.on("token:transfer", (data) => {
        this.logEvent("Token Transfer", data);
      });
      monitor.on("staking:stake", (data) => {
        this.logEvent("Staking: Stake", data);
      });
      monitor.on("staking:unstake", (data) => {
        this.logEvent("Staking: Unstake", data);
      });
      monitor.on("staking:rewards", (data) => {
        this.logEvent("Staking: Rewards", data);
      });
      monitor.on("nft:mint", (data) => {
        this.logEvent("NFT: Mint", data);
      });
    });
  }

  logEvent(type, data) {
    const event = {
      timestamp: new Date().toISOString(),
      type,
      data: {
        user: data.user || data.from || data.to || "N/A",
        amount: data.amount ? ethers.utils.formatUnits(data.amount, 18) : "N/A",
        tokenId: data.tokenId?.toString() || "N/A"
      }
    };
    this.eventLog.push(event);
  }

  async start() {
    console.log("\n" + "=".repeat(70));
    console.log("DUAL NETWORK EVENT MONITOR");
    console.log("Monitoring: Base and Arbitrum");
    console.log("=".repeat(70));

    await Promise.all([
      this.monitors.base.start(),
      this.monitors.arbitrum.start()
    ]);

    console.log("Both networks are being monitored. Press Ctrl+C to stop.\n");
  }

  stop() {
    this.monitors.base.stop();
    this.monitors.arbitrum.stop();
  }

  async saveLog(filename = "event-monitor-log.json") {
    const filepath = path.join(process.cwd(), filename);
    fs.writeFileSync(filepath, JSON.stringify(this.eventLog, null, 2));
    console.log(`Event log saved to ${filename} (${this.eventLog.length} events)`);
  }
}

// Main execution
async function main() {
  const dualMonitor = new DualNetworkMonitor();

  // Handle graceful shutdown
  process.on("SIGINT", async () => {
    console.log("\n\nShutting down...");
    dualMonitor.stop();
    
    if (dualMonitor.eventLog.length > 0) {
      await dualMonitor.saveLog();
    }
    
    process.exit(0);
  });

  // Start monitoring
  await dualMonitor.start();

  // Keep process alive until interrupted
  await new Promise(() => {});
}

main().catch(console.error);
