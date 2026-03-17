// NOTE: This module reads server-only env vars (VERCEL_URL) and contains the
// Farcaster account association signature. It must only be imported from
// Server Components (layout.tsx) and API route handlers (route.ts).
const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  "http://localhost:3000";

export const BASE_APP_BUILDER_CODE =
  process.env.NEXT_PUBLIC_BASE_APP_BUILDER_CODE || "";

export const FARCASTER_FID =
  Number(process.env.NEXT_PUBLIC_FARCASTER_FID || "0");

// Base Build app ID: https://www.base.dev/apps/69a3aa8e4036d91576063bba
// Owner key derived from Farcaster account association header JWT (fid 2702510)
export const BASE_APP_ID = "69a3aa8e4036d91576063bba";
export const BASE_APP_OWNER = "0x360c4dDF3761F87af04e4FEa14E53487c770a058";

export const minikitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjI3MDI1MTAsInR5cGUiOiJhdXRoIiwia2V5IjoiMHgzNjBjNGRERjM3NjFGODdhZjA0ZTRGRWExNEU1MzQ4N2M3NzBhMDU4In0",
    payload: "eyJkb21haW4iOiJ3d3cubmFiYXQuZmluYW5jZSJ9",
    signature: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEHh0V-343VbnEHrE0beDPfXSZeDg5SfS463wa6f71xPyTjqDGhytJshq9ePbYgTFkZSIcLh5TrKoSuKkYqnkzXUGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  },
  baseBuilder: {
    // Wallet that owns the Base Build registration (fid 2702510, key from Farcaster JFS header)
    ownerAddress: BASE_APP_OWNER,
  },
  miniapp: {
    version: "1",
    name: "ONabat",
    subtitle: "ONBT Omnichain DeFi — Base & Arbitrum",
    description: "Trade, bridge, and stake ONBT across Base and Arbitrum using LayerZero V2 omnichain messaging. Earn staking rewards, participate in on-chain governance, and access the ONBT private sale — all in one miniapp.",
    screenshotUrls: [`${ROOT_URL}/branding/onabat-logo-dark.png`],
    iconUrl: `${ROOT_URL}/branding/onabat-logo-dark.png`,
    splashImageUrl: `${ROOT_URL}/branding/onabat-logo-dark.png`,
    splashBackgroundColor: "#0f1f1c",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "finance",
    tags: ["onbt", "defi", "base", "arbitrum", "layerzero", "staking", "bridge", "omnichain", "yield", "governance", "oft"],
    longDescription: "ONabat is the omnichain DeFi hub for the ONBT token on Base and Arbitrum. Stake ONBT to earn rewards, bridge across chains using LayerZero V2, participate in on-chain governance, access the private sale, and interact directly with DeFi Factory, Yield Distributor, and Vault contracts — all inside a single Base miniapp.",
    heroImageUrl: `${ROOT_URL}/branding/onabat-logo-dark.png`,
    tagline: "The ONBT DeFi Hub on Base",
    ogTitle: "ONabat — Omnichain ONBT",
    ogDescription: "Trade, bridge, and stake ONBT across Base and Arbitrum. Powered by LayerZero V2.",
    ogImageUrl: `${ROOT_URL}/branding/onabat-logo-dark.png`,
  },
} as const;
