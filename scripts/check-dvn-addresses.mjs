import hre from "hardhat";

const { ethers } = hre;

async function main() {
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);
  
  console.log(`\nChecking DVN addresses on chain ${chainId} (${network.name})\n`);

  // DVNs from config
  const dvns = [
    {
      name: "Required DVN 1",
      address: "0x9e059a54699a285714207b43B055483E78FAac25"
    },
    {
      name: "Required DVN 2",
      address: "0xa7b5189bca84cd304d8553977c7c614329750d99"
    },
    {
      name: "Optional DVN 1",
      address: "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5"
    },
    {
      name: "Optional DVN 2 (Google Cloud)",
      address: "0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc"
    },
    {
      name: "Optional DVN 3",
      address: "0x129ee430cb2ff2a3664c3cad0e8e0a95d09bd04a"
    }
  ];

  for (const dvn of dvns) {
    try {
      const code = await ethers.provider.getCode(dvn.address);
      const isContract = code !== "0x";
      console.log(`${dvn.name}:`);
      console.log(`  Address: ${dvn.address}`);
      console.log(`  Status: ${isContract ? "✅ Contract deployed" : "❌ NO CODE"}`);
    } catch (err) {
      console.log(`${dvn.name}: Error checking - ${err.message}`);
    }
  }
  
  console.log("\n");
}

main().catch(console.error);
