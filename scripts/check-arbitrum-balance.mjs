import { ethers } from "ethers";

const ARBITRUM_CONTRACT = "0xA5c3CF591e9ed6A4f3b2667146f630D4C8B08C27";
const ARBITRUM_RPC = process.env.ARBITRUM_RPC_URL || "https://arb1.arbitrum.io/rpc";

async function main() {
  const provider = new ethers.JsonRpcProvider(ARBITRUM_RPC);
  
  const oft = new ethers.Contract(
    ARBITRUM_CONTRACT,
    [
      "function name() view returns (string)",
      "function symbol() view returns (string)",
      "function totalSupply() view returns (uint256)",
      "function balanceOf(address) view returns (uint256)"
    ],
    provider
  );
  
  const address = process.argv[2] || "0x44497B9FF645A995b18967b34eFeFDe82AeC8144";
  
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║          Arbitrum ONBT Balance Check                   ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
  
  const [name, symbol, totalSupply, balance] = await Promise.all([
    oft.name(),
    oft.symbol(),
    oft.totalSupply(),
    oft.balanceOf(address)
  ]);
  
  console.log("Token:", name, `(${symbol})`);
  console.log("Contract:", ARBITRUM_CONTRACT);
  console.log("Total Supply:", ethers.formatEther(totalSupply), "ONBT");
  console.log("\nAddress:", address);
  console.log("Balance:", ethers.formatEther(balance), "ONBT\n");
}

main().catch(console.error);
