import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const BASE_OFT = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
const BASE_RPC = process.env.BASE_RPC_URL;

const OFT_ABI = [
  "function endpoint() external view returns (address)",
  "function owner() external view returns (address)",
];

async function checkOFT() {
  const provider = new ethers.JsonRpcProvider(BASE_RPC);
  const oft = new ethers.Contract(BASE_OFT, OFT_ABI, provider);

  try {
    const endpoint = await oft.endpoint();
    const owner = await oft.owner();

    console.log("OFT Base Contract Info:");
    console.log("========================");
    console.log("Address:", BASE_OFT);
    console.log("Endpoint:", endpoint);
    console.log("Owner:", owner);
  } catch (err) {
    console.error("Error reading OFT:", err.message);
  }
}

checkOFT();
