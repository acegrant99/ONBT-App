import hre from "hardhat";

const { ethers } = hre;

/**
 * Deploy RAYAY OApp (ONBTPrivateSaleOApp) on Base mainnet.
 *
 * Required env:
 * - ONBT_TOKEN_BASE: ONBT token address on Base
 *
 * Optional env:
 * - LZ_ENDPOINT_BASE (defaults to Base LZ V2 endpoint)
 * - RAYAY_SALE_ALLOCATION (defaults to 50_000_000 ONBT)
 * - RAYAY_OWNER (defaults to deployer)
 * - RAYAY_FUNDS_RECIPIENT (defaults to deployer)
 * - RAYAY_SALE_START (unix seconds; defaults to now + 1 hour)
 * - RAYAY_SALE_END (unix seconds; defaults to now + 90 days)
 * - RAYAY_PAYMENT_TOKENS (comma-separated addresses)
 * - RAYAY_PAYMENT_RATES_WAD (comma-separated 1e18 rates)
 */

const BASE_CHAIN_ID = 8453;
const BASE_LZ_ENDPOINT_V2 = "0x1a44076050125825900e736c501f859c50fE728c";

function splitCsv(value) {
  if (!value || !String(value).trim()) return [];
  return String(value)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseUint(value, fallback) {
  if (value === undefined || value === null || value === "") return fallback;
  try {
    return BigInt(String(value));
  } catch {
    return fallback;
  }
}

function parseUnixSeconds(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  if (Number.isFinite(parsed) && parsed > 0) return parsed;
  return fallback;
}

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  if (chainId !== BASE_CHAIN_ID) {
    throw new Error(`This script is for Base mainnet (${BASE_CHAIN_ID}), but current chain is ${chainId}.`);
  }

  const endpoint = process.env.LZ_ENDPOINT_BASE?.trim() || BASE_LZ_ENDPOINT_V2;
  const onbtToken = process.env.ONBT_TOKEN_BASE?.trim() || "";

  if (!onbtToken) {
    throw new Error("Missing ONBT_TOKEN_BASE. Set ONBT token address on Base before deploying.");
  }

  const now = Math.floor(Date.now() / 1000);
  const defaultStart = now + 3600;
  const defaultEnd = now + 90 * 24 * 3600;

  const saleAllocation = parseUint(
    process.env.RAYAY_SALE_ALLOCATION,
    ethers.parseUnits("50000000", 18)
  );

  const owner = process.env.RAYAY_OWNER?.trim() || deployer.address;
  const fundsRecipient = process.env.RAYAY_FUNDS_RECIPIENT?.trim() || deployer.address;
  const saleStart = parseUnixSeconds(process.env.RAYAY_SALE_START, defaultStart);
  const saleEnd = parseUnixSeconds(process.env.RAYAY_SALE_END, defaultEnd);

  if (saleStart >= saleEnd) {
    throw new Error(`Invalid sale window: start=${saleStart} must be < end=${saleEnd}`);
  }

  const paymentTokens = splitCsv(process.env.RAYAY_PAYMENT_TOKENS);
  const paymentRates = splitCsv(process.env.RAYAY_PAYMENT_RATES_WAD).map((item) => BigInt(item));

  if (paymentTokens.length !== paymentRates.length) {
    throw new Error("RAYAY_PAYMENT_TOKENS and RAYAY_PAYMENT_RATES_WAD length mismatch.");
  }

  console.log("\n=== RAYAY OApp Deploy (Base) ===");
  console.log("deployer:", deployer.address);
  console.log("chainId:", chainId);
  console.log("endpoint:", endpoint);
  console.log("onbtToken:", onbtToken);
  console.log("saleAllocation:", saleAllocation.toString());
  console.log("owner:", owner);
  console.log("fundsRecipient:", fundsRecipient);
  console.log("saleStart:", saleStart);
  console.log("saleEnd:", saleEnd);
  console.log("paymentTokens:", paymentTokens.length);

  const Factory = await ethers.getContractFactory("ONBTPrivateSaleOApp");

  const oapp = await Factory.deploy(endpoint, onbtToken, saleAllocation);
  await oapp.waitForDeployment();
  const oappAddress = await oapp.getAddress();

  console.log("deployed ONBTPrivateSaleOApp:", oappAddress);

  const initTx = await oapp.initialize(
    owner,
    fundsRecipient,
    saleStart,
    saleEnd,
    paymentTokens,
    paymentRates
  );
  await initTx.wait();

  console.log("initialized tx:", initTx.hash);

  const ownerOnChain = await oapp.owner();
  console.log("owner(onchain):", ownerOnChain);

  console.log("\nRAYAY OApp deployed and initialized on Base.");
  console.log("next: fund ONBT inventory into OApp and wire peers with setPeer for remote EIDs.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("RAYAY OApp deploy failed:", error);
    process.exit(1);
  });
