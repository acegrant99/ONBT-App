import { ethers } from "ethers";

const ENDPOINT_ADDRESS = "0x1a44076050125825900e736c501f859c50fE728c";
const BASE_RPC = "https://base-mainnet.g.alchemy.com/v2/af7OrK1axwUgV0ss91Vgd";

// Try various possible function signatures
const FUNCTION_SIGS = [
  "setSendLibrary(address,uint32,address)",
  "setReceiveLibrary(address,uint32,address,uint256)",
  "setConfig(address,(uint32,uint32,bytes)[])",
  "setDelegate(address,address)",
  "delegates(address,uint32)",
];

async function checkEndpointMethods() {
  const provider = new ethers.JsonRpcProvider(BASE_RPC);
  
  console.log("Checking Endpoint Methods");
  console.log("========================\n");
  console.log(`Endpoint: ${ENDPOINT_ADDRESS}\n`);

  // Try to call an ABI encoder with actual payloads to see what works
  for (const sig of FUNCTION_SIGS) {
    const fragment = ethers.FunctionFragment.from(`function ${sig}`);
    const selector = ethers.id(sig).slice(0, 10);
    
    console.log(`Function: ${sig}`);
    console.log(`Selector: ${selector}`);
    console.log();
  }

  // Try to get actual contract code
  const code = await provider.getCode(ENDPOINT_ADDRESS);
  console.log("\nEndpoint contract code length:", code.length);
  console.log("Is contract deployed:", code !== "0x");
}

checkEndpointMethods();
