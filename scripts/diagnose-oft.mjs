import hre from "hardhat";
import chalk from "chalk";

const { ethers } = hre;

const OFT_ADDRESS_ARBITRUM = "0x42bB5FD891c070A64d31752855E94A01edDd766E";
const OFT_ADDRESS_BASE = "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c";

async function main() {
  const network = await ethers.provider.getNetwork();
  console.log(`\nConnected to: ${network.name} (Chain ${network.chainId})\n`);

  // Extended OFT ABI to check various methods
  const EXTENDED_OFT_ABI = [
    "function owner() external view returns (address)",
    "function peer(uint32 eid) external view returns (bytes32)",
    "function sendLibrary(uint32 eid) external view returns (address)",
    "function receiveLibrary(uint32 eid) external view returns (address)",
    "function setSendLibrary(uint32 eid, address sendLibrary) external",
    "function setReceiveLibrary(uint32 eid, address receiveLibrary, uint128 gracePeriod) external",
    "function allowInitializePath(bytes32 peer) external view returns (bool)",
    "function isComposeMsgSender(address _from, bytes calldata _message) external view returns (bool)",
  ];

  let targetAddress, targetName;
  
  if (Number(network.chainId) === 42161) {
    targetAddress = OFT_ADDRESS_ARBITRUM;
    targetName = "Arbitrum OFT";
  } else if (Number(network.chainId) === 8453) {
    targetAddress = OFT_ADDRESS_BASE;
    targetName = "Base OFT";
  } else {
    console.error("Please run on Base or Arbitrum network");
    return;
  }

  console.log(`Checking ${targetName} at ${targetAddress}\n`);

  const oft = new ethers.Contract(targetAddress, EXTENDED_OFT_ABI, ethers.provider);
  const [signer] = await ethers.getSigners();

  try {
    // Check owner
    const owner = await oft.owner();
    console.log(chalk.blue(`Owner: ${owner}`));
    console.log(chalk.blue(`Current signer: ${signer.address}`));
    console.log(chalk.blue(`Is owner: ${owner.toLowerCase() === signer.address.toLowerCase() ? "YES" : "NO"}\n`));

    // Check peer
    const BASE_EID = 184;
    const ARB_EID = 110;
    const remoteEid = Number(network.chainId) === 42161 ? BASE_EID : ARB_EID;

    try {
      const peerBytes32 = await oft.peer(remoteEid);
      console.log(chalk.yellow(`Peer (EID ${remoteEid}): ${peerBytes32}`));
    } catch (e) {
      console.log(chalk.red(`Could not read peer: ${e.message}`));
    }

    // Check libraries
    try {
      const sendLib = await oft.sendLibrary(remoteEid);
      console.log(chalk.yellow(`Current Send Library: ${sendLib}`));
    } catch (e) {
      console.log(chalk.red(`Could not read send library: ${e.message}`));
    }

    try {
      const receiveLib = await oft.receiveLibrary(remoteEid);
      console.log(chalk.yellow(`Current Receive Library: ${receiveLib}\n`));
    } catch (e) {
      console.log(chalk.red(`Could not read receive library: ${e.message}\n`));
    }

    // Check allowInitializePath
    const peerAddress32 = await oft.peer(remoteEid);
    try {
      const isAllowed = await oft.allowInitializePath(peerAddress32);
      console.log(chalk.cyan(`allowInitializePath(${peerAddress32.slice(0, 10)}...): ${isAllowed}\n`));
    } catch (e) {
      console.log(chalk.red(`Could not check allowInitializePath: ${e.message}\n`));
    }

    // Attempt to call setSendLibrary to see the actual error
    const NEW_SEND_ULN = "0x7e07A9148E9149e430C6412b79A675028595Ff1f";
    console.log(chalk.magenta("Attempting setSendLibrary call to get detailed error...\n"));
    try {
      const tx = await oft.connect(signer).setSendLibrary(remoteEid, NEW_SEND_ULN, { 
        gasLimit: 500000 
      });
      console.log(chalk.green(`Transaction sent: ${tx.hash}`));
      const receipt = await tx.wait();
      console.log(chalk.green(`Transaction succeeded! Block: ${receipt.blockNumber}`));
    } catch (error) {
      console.log(chalk.red(`Error: ${error.message}`));
      
      // Parse revert reason if available
      if (error.data) {
        console.log(chalk.red(`Revert data: ${error.data}`));
      }
      if (error.reason) {
        console.log(chalk.red(`Revert reason: ${error.reason}`));
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main().catch(console.error);
