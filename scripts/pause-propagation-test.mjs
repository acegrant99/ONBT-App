import hre from "hardhat";
import fs from "fs";
import path from "path";

const { ethers } = hre;

const DEFAULT_DEPLOYMENTS = {
  base: "deploy/deployment-lzv2-resume-base-routerfix-1771470032703.json",
  arbitrum: "deploy/deployment-lzv2-resume-arbitrum-routerfix-1771470062468.json",
};

const parseUnits = (value, decimals) =>
  ethers.parseUnits ? ethers.parseUnits(value, decimals) : ethers.utils.parseUnits(value, decimals);
const formatUnits = (value, decimals) =>
  ethers.formatUnits ? ethers.formatUnits(value, decimals) : ethers.utils.formatUnits(value, decimals);
const zeroPadValue = (value, length) =>
  ethers.zeroPadValue ? ethers.zeroPadValue(value, length) : ethers.utils.hexZeroPad(value, length);
const solidityPacked = (types, values) =>
  ethers.solidityPacked ? ethers.solidityPacked(types, values) : ethers.utils.solidityPack(types, values);
const getBytes = (value) =>
  ethers.getBytes ? ethers.getBytes(value) : ethers.utils.arrayify(value);

const buildLzReceiveOptions = (gas, value = 0n) => {
  const option = value === 0n
    ? solidityPacked(["uint128"], [gas])
    : solidityPacked(["uint128", "uint128"], [gas, value]);
  const optionSize = getBytes(option).length + 1;
  return solidityPacked(
    ["uint16", "uint8", "uint16", "uint8", "bytes"],
    [3, 1, optionSize, 1, option]
  );
};

function readJson(relativePath) {
  const fullPath = path.isAbsolute(relativePath)
    ? relativePath
    : path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  if (chainId !== 8453) {
    throw new Error("Run this on Base (chainId 8453)");
  }

  const baseDeploymentPath = process.env.DEPLOYMENT_FILE_BASE || DEFAULT_DEPLOYMENTS.base;
  const arbDeploymentPath = process.env.DEPLOYMENT_FILE_ARB || DEFAULT_DEPLOYMENTS.arbitrum;
  const baseDeployment = readJson(baseDeploymentPath);
  const arbDeployment = readJson(arbDeploymentPath);

  const baseOft = baseDeployment.contracts.onbtToken;
  const arbitrumEid = baseDeployment.layerZero.peerEid || 30110;

  const OFT_ABI = [
    "function pause() external payable",
    "function unpause() external payable",
    "function paused() external view returns (bool)",
    "function quoteSend((uint32 dstEid, bytes32 to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd) _sendParam, bool _payInLzToken) external view returns ((uint256 nativeFee, uint256 lzTokenFee) fee)",
    "function send((uint32 dstEid, bytes32 to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd) _sendParam, (uint256 nativeFee, uint256 lzTokenFee) _fee, address _refundAddress) external payable returns ((uint64 msgType, uint64 nonce) msgReceipt)"
  ];

  const oft = new ethers.Contract(baseOft, OFT_ABI, signer);

  console.log("\nPausing Base ONBT...");
  const txPause = await oft.pause();
  console.log(`Pause tx: ${txPause.hash}`);
  await txPause.wait();

  const isPaused = await oft.paused();
  console.log(`Base paused: ${isPaused}`);

  const amount = parseUnits("0.01", 18);
  const toBytes32 = zeroPadValue(signer.address, 32);
  const extraOptions = buildLzReceiveOptions(200000n, 0n);

  const sendParam = {
    dstEid: arbitrumEid,
    to: toBytes32,
    amountLD: amount,
    minAmountLD: amount,
    extraOptions,
    composeMsg: "0x",
    oftCmd: "0x"
  };

  console.log("\nAttempting cross-chain send while paused (should fail)...");
  try {
    const fee = await oft.quoteSend(sendParam, false);
    const tx = await oft.send(sendParam, fee, signer.address, { value: fee.nativeFee });
    await tx.wait();
    console.log("❌ Unexpected success: send should have failed while paused");
  } catch (error) {
    const msg = error.reason || error.message;
    console.log(`✅ Expected failure: ${msg}`);
  }

  console.log("\nUnpausing Base ONBT...");
  const txUnpause = await oft.unpause();
  console.log(`Unpause tx: ${txUnpause.hash}`);
  await txUnpause.wait();

  console.log("✅ Pause propagation test complete.");
  console.log("Note: This verifies local pause. For full propagation, run pauseRemoteChain on Base and verify Arbitrum pause state.");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("❌ Pause test failed:", error);
  process.exit(1);
});
