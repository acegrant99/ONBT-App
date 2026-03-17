# Routerfix Deployments (2026-02-18)

## Purpose

- Update ONBTStakingRouter to use v2 LZ receive options internally.

## Deployment Files

- Base: deploy/deployment-lzv2-resume-base-routerfix-1771470032703.json
- Arbitrum: deploy/deployment-lzv2-resume-arbitrum-routerfix-1771470062468.json

## Router Addresses

- Base staking router: 0x7b1E4982755A17bfBbD2d249BC1079C2d31E959B
- Arbitrum staking router: 0xd731eAA2c32d85B55cdf8c9cEba114350ba46c64

## Peer Wiring

- Base router peer (EID 30110): 0xd731eAA2c32d85B55cdf8c9cEba114350ba46c64
- Arbitrum router peer (EID 30184): 0x7b1E4982755A17bfBbD2d249BC1079C2d31E959B

## Notes

- syncToHub from Arbitrum -> Base succeeded after routerfix.
