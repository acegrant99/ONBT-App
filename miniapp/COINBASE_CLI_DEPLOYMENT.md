# Coinbase CLI Deployment Runbook (ONBT Private Sale Miniapp)

This runbook deploys the ONBT miniapp to Base-facing Coinbase Mini App infrastructure using Coinbase CLI.

## Scope

- Chain: Base Mainnet (`8453`)
- Private sale mode: time-window only
- Payment assets: ETH, USDC, USDT
- Existing contracts are reused (no redeploy required)

## 1) Prerequisites

- Node.js 20.19+
- npm
- Coinbase CLI installed and authenticated
- Miniapp dependencies installed
- Private sale contract deployed (UUPS proxy)

```bash
cd miniapp
npm install
```

## 2) Environment

Use `miniapp/.env`:

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_ONBT_PRIVATE_SALE_BASE_ADDRESS=0xEA52c0c5Cb4962490d1132d9c255aa044296576e
NEXT_PUBLIC_ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS=0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE
```

Private sale contract deployment defaults now target:
- ONBT price: `$0.10` (USDC/USDT rate defaults to `10 ONBT` per `$1`)
- Sale allocation cap: `100,000,000 ONBT`

Deploy command (Base):

```bash
cd ..
ONBT_PRIVATE_SALE_START=<unix_start>
ONBT_PRIVATE_SALE_END=<unix_end>
ONBT_PRIVATE_SALE_OWNER=<owner_address>
ONBT_PRIVATE_SALE_FUNDS_RECIPIENT=<treasury_address>
ONBT_PRIVATE_SALE_ETH_RATE_WAD=<set_for_live_eth_usd>
npm run deploy:private-sale:base
```

Optional overrides:
- `ONBT_PRIVATE_SALE_ALLOCATION` (default: `100000000000000000000000000` = 100M ONBT)
- `ONBT_PRIVATE_SALE_USDC_RATE_WAD` (default: `10000000000000000000`)
- `ONBT_PRIVATE_SALE_USDT_RATE_WAD` (default: `10000000000000000000`)

Notes:
- USDC/USDT Base token addresses are already set in `config/contracts.ts`.
- The private sale contract must expose `saleStart`, `saleEnd`, `remainingTokens`, `purchased`, `quotePurchase`, `buyWithETH`, `buyWithToken`.

## 3) Local Validation

```bash
npm run dev
```

Validate in the app:
- `Private Sale` tab is visible.
- Wallet is on Base.
- Sale status/countdown appears.
- Quote updates for ETH/USDC/USDT.
- For USDC/USDT: approval then purchase flow works.
- For ETH: direct payable purchase works.

## 4) Build

```bash
npm run build
```

## 5) Coinbase CLI Deploy

Use your Coinbase CLI project workflow to deploy the built miniapp.

Typical flow:

```bash
# from miniapp/
coinbase --version
coinbase login
coinbase miniapp deploy
```

If your CLI variant uses project/environment flags, include:
- Production target environment
- Base chain/network configuration
- Required env vars from Step 2

## 6) Post-Deploy Checks

- Open deployed miniapp URL in Coinbase wallet/client.
- Confirm wallet connect works on Base.
- Execute one test quote for each asset (ETH/USDC/USDT).
- Execute a low-value buy test per allowed token.
- Confirm transaction links resolve on Basescan.

## 7) Rollback

- Redeploy previous miniapp version from your Coinbase CLI release history.
- Keep contract addresses unchanged unless contract upgrade is intentional.
