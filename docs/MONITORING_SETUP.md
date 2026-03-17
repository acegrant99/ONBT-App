# Monitoring Setup

This document describes a lightweight monitoring workflow for ONBT staking and reward pools.

## Quick Start

Run a health check per chain:

```bash
npx hardhat run scripts/monitoring-health.mjs --network base
npx hardhat run scripts/monitoring-health.mjs --network arbitrum
```

## Environment Options

- `MONITOR_ADDRESS` (optional): address to check pending rewards for. Defaults to deployer.
- `MIN_RUNWAY_DAYS` (optional): alert threshold for reward pool runway. Default: 30.

Example:

```bash
MONITOR_ADDRESS=0xYourAddress MIN_RUNWAY_DAYS=45 npx hardhat run scripts/monitoring-health.mjs --network base
```

## What It Checks

- Reward pool balance (staking contract token balance)
- Local total staked
- Pending rewards for a target address
- Base reward rate
- Estimated daily reward burn
- Estimated runway in days
- Global total staked on Base

## Recommended Cadence

- Run manually daily while active testing is ongoing.
- After launch, schedule a cron job every 6 hours.

Example cron (Linux/Mac):

```bash
0 */6 * * * cd /path/to/ONBT-App && npx hardhat run scripts/monitoring-health.mjs --network base >> logs/monitoring-base.log 2>&1
0 */6 * * * cd /path/to/ONBT-App && npx hardhat run scripts/monitoring-health.mjs --network arbitrum >> logs/monitoring-arbitrum.log 2>&1
```

## Alerting

For real-time alerts, integrate with:
- Tenderly alerts (free tier)
- OpenZeppelin Defender (paid)
- Custom webhook (Slack/Discord) using a wrapper script

## Next Enhancements

- Add alert thresholds for large stake/unstake events
- Track reward pool drops below 7/14/30 days
- Monitor LayerZero message delivery status
