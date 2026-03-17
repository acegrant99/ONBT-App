# Unified Base + Arbitrum Deployment Runbook

This runbook provides one end-to-end flow for deploying and wiring the current ONBT LayerZero V2 core ecosystem on Base (hub) and Arbitrum (spoke).

## One-Command Option (PowerShell)

Use the wrapper script to run deploy + peer setup in sequence:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/deploy-unified-base-arbitrum.ps1 `
  -BaseOnbtAddress "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5" `
  -ArbitrumOnbtAddress "0x169aC761Ebb210B5A93B68B44DA394776a7B230C"
```

Useful flags:
- `-DryRun` prints commands without executing
- `-SkipDeploy` runs only peer setup
- `-SkipPeers` runs only deployments

## Scope

This uses:
- `scripts/deploy-lzv2-ecosystem.mjs`
- `scripts/configurePeers.mjs`

It matches the current contracts that use `uint32` EIDs and LayerZero V2 `setPeer(...)`.

## 1) Prerequisites

- `.env` is configured with:
  - `PRIVATE_KEY`
  - `ONBT_TOKEN_ADDRESS` (set per network when deploying)
- Optional fallback: `config/oft-configuration.json` with `oft.base.address` and `oft.arbitrum.address`
- Hardhat networks for `base` and `arbitrum` are configured.
- Deployer account has native gas on both chains.
- Core contracts compile:

```bash
npx hardhat compile
```

## 2) Deploy on Base (Hub)

Use Base ONBT token address and mark deployment as hub.

If `ONBT_TOKEN_ADDRESS` is omitted, the script falls back to `config/oft-configuration.json` for the current network.

```bash
$env:IS_HUB_CHAIN="true"
$env:ONBT_TOKEN_ADDRESS="<BASE_ONBT_ADDRESS>"
npx hardhat run scripts/deploy-lzv2-ecosystem.mjs --network base
```

Save output addresses for:
- `vault`
- `staking`
- `rewardsPool`
- `yieldDistributor`
- `achievementNFT`
- `stakingRouter`
- `governor`

## 3) Deploy on Arbitrum (Spoke)

Use Arbitrum ONBT token address and mark deployment as spoke.

```bash
$env:IS_HUB_CHAIN="false"
$env:ONBT_TOKEN_ADDRESS="<ARBITRUM_ONBT_ADDRESS>"
npx hardhat run scripts/deploy-lzv2-ecosystem.mjs --network arbitrum
```

Save the same contract addresses from this deployment output.

## 4) Fill Peer Address Map

Open `scripts/configurePeers.mjs` and fill `CONTRACT_ADDRESSES` for at least:
- `base.onbt`
- `base.vault`
- `arbitrum.onbt`
- `arbitrum.vault`

If governance is not deployed in your environment, keep `governanceOApp` as zero address; the script now skips governance peer setup automatically.

## 5) Configure Peers on Base

Run peer setup on Base and target the `base` address set.

```bash
$env:NETWORK="base"
npx hardhat run scripts/configurePeers.mjs --network base
```

## 6) Configure Peers on Arbitrum

Run peer setup on Arbitrum and target the `arbitrum` address set.

```bash
$env:NETWORK="arbitrum"
npx hardhat run scripts/configurePeers.mjs --network arbitrum
```

## 7) Post-Deploy Validation Checklist

- `ONBT` peers are set both ways (`base ↔ arbitrum`).
- `Vault` peers are set both ways (`base ↔ arbitrum`).
- `governanceOApp` peers are set only if governance contract is actually deployed.
- Base deployment has `IS_HUB_CHAIN=true`; Arbitrum has `IS_HUB_CHAIN=false`.
- Vault token whitelist includes ONBT on each chain.

## 8) Common Operator Notes

- Use one shell/session per network to avoid stale env vars.
- Always set both `--network` and `$env:NETWORK` to the same value when running `configurePeers.mjs`.
- Re-running `configurePeers.mjs` is safe for already-set peers (it overwrites with the same value).

## 9) Quick Command Block

```bash
# Base deploy
$env:IS_HUB_CHAIN="true"
$env:ONBT_TOKEN_ADDRESS="<BASE_ONBT_ADDRESS>"
npx hardhat run scripts/deploy-lzv2-ecosystem.mjs --network base

# Arbitrum deploy
$env:IS_HUB_CHAIN="false"
$env:ONBT_TOKEN_ADDRESS="<ARBITRUM_ONBT_ADDRESS>"
npx hardhat run scripts/deploy-lzv2-ecosystem.mjs --network arbitrum

# Base peers
$env:NETWORK="base"
npx hardhat run scripts/configurePeers.mjs --network base

# Arbitrum peers
$env:NETWORK="arbitrum"
npx hardhat run scripts/configurePeers.mjs --network arbitrum
```
