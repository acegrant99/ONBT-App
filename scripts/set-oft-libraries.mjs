import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const BASE_OFT = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";
const BASE_RPC = process.env.BASE_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const ARBITRUM_SEND_LIB = "0x8E60b7b64b63cD56b18ebcECADcb79B04919286e";
const ARBITRUM_RECEIVE_LIB = "0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf";
const ARBITRUM_EID = 30110;

const OFT_ABI = [
  "function setSendLibrary(uint32 _eid, address _newLib) external",
  "function setReceiveLibrary(uint32 _eid, address _newLib, uint256 _gracePeriod) external",
  "function owner() external view returns (address)",
  "function endpoint() external view returns (address)",
];

async function setSendLib() {
  const provider = new ethers.JsonRpcProvider(BASE_RPC);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const oft = new ethers.Contract(BASE_OFT, OFT_ABI, signer);

  console.log("Setting Send Library via OFT contract:");
  console.log("======================================");
  console.log("OFT:", BASE_OFT);
  console.log("Remote EID:", ARBITRUM_EID);
  console.log("Send Lib:", ARBITRUM_SEND_LIB);
  console.log("Signer:", signer.address);
  console.log();

  try {
    console.log("📝 Submitting setSendLibrary transaction...");
    const tx = await oft.setSendLibrary(ARBITRUM_EID, ARBITRUM_SEND_LIB, {
      gasLimit: 300000,
    });
    console.log("Transaction hash:", tx.hash);
    console.log("Waiting for confirmation...");
    const receipt = await tx.wait();

    if (receipt.status === 1) {
      console.log("✅ setSendLibrary succeeded!");
      console.log("Block:", receipt.blockNumber);

      // Now set receive library
      console.log("\nSetting Receive Library via OFT contract...");
      console.log("Remote EID:", ARBITRUM_EID);
      console.log("Receive Lib:", ARBITRUM_RECEIVE_LIB);
      console.log("Grace Period: 0");
      console.log();

      console.log("📝 Submitting setReceiveLibrary transaction...");
      const tx2 = await oft.setReceiveLibrary(ARBITRUM_EID, ARBITRUM_RECEIVE_LIB, 0, {
        gasLimit: 300000,
      });
      console.log("Transaction hash:", tx2.hash);
      console.log("Waiting for confirmation...");
      const receipt2 = await tx2.wait();

      if (receipt2.status === 1) {
        console.log("✅ setReceiveLibrary succeeded!");
        console.log("Block:", receipt2.blockNumber);
      } else {
        console.log("❌ setReceiveLibrary reverted");
      }
    } else {
      console.log("❌ setSendLibrary reverted");
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

setSendLib();
