# 📋 ONBT Deployment Checklist

Use this checklist to track your deployment progress. Check off items as you complete them.

---

## 🧪 Phase 1: Testnet Deployment

### Environment Setup
- [ ] Created `.env` file from `.env.example`
- [ ] Added Base Sepolia RPC URL (get from Alchemy/Infura/Base)
- [ ] Added Ethereum Sepolia RPC URL (get from Alchemy/Infura)
- [ ] Created testnet-only wallet (NEW address, not mainnet wallet)
- [ ] Added private key to `.env` file
- [ ] Verified `.env` is in `.gitignore` (should NOT be committed)
- [ ] Got Base Sepolia ETH from faucet: https://www.coinbase.com/faucets
- [ ] Got Ethereum Sepolia ETH from faucet: https://sepoliafaucet.com
- [ ] Tested connection: `npx hardhat console --network baseSepolia`

### Hub Chain Deployment (Base Sepolia)
- [ ] Set deployment type: `export DEPLOYMENT_TYPE=hub`
- [ ] Ran deployment: `npm run deploy:onbt:baseSepolia`
- [ ] Deployment successful ✅
- [ ] Contract address saved: `_______________________________________`
- [ ] Verified on BaseScan testnet: https://sepolia.basescan.org/
- [ ] Confirmed 1,000,000,000 ONBT minted to deployer
- [ ] Tested basic transfer (sent 1000 ONBT to another address)
- [ ] Updated `.env` with: `ONBT_BASE_SEPOLIA=<contract_address>`

### Destination Chain Deployment (Ethereum Sepolia)
- [ ] Set deployment type: `export DEPLOYMENT_TYPE=destination`
- [ ] Ran deployment: `npm run deploy:onbt:ethereum`
- [ ] Deployment successful ✅
- [ ] Contract address saved: `_______________________________________`
- [ ] Verified on Etherscan testnet: https://sepolia.etherscan.io/
- [ ] Confirmed 0 ONBT minted (empty contract)
- [ ] Updated `.env` with: `ONBT_ETHEREUM_SEPOLIA=<contract_address>`

### Cross-Chain Configuration
- [ ] Updated `scripts/setTrustedRemotes.mjs` with contract addresses
- [ ] Ran on Base Sepolia: `npm run setup:remotes:base`
- [ ] Ran on Ethereum Sepolia: `npm run setup:remotes:ethereum`
- [ ] Verified trusted remotes set on both chains
- [ ] Checked LayerZero endpoints configured correctly

### Cross-Chain Testing
- [ ] Prepared test transfer (1000 ONBT from Base to Ethereum)
- [ ] Estimated fees: `node scripts/sendOFT.mjs --estimate`
- [ ] Executed transfer: `node scripts/sendOFT.mjs`
- [ ] Transaction hash: `_______________________________________`
- [ ] Monitored on LayerZero Scan: https://testnet.layerzeroscan.com/
- [ ] Confirmed tokens burned on Base Sepolia
- [ ] Waited for LayerZero relay (5-10 minutes)
- [ ] Confirmed tokens minted on Ethereum Sepolia
- [ ] Verified total supply still 1B (conservation check)
- [ ] Tested reverse transfer (Ethereum → Base)
- [ ] All cross-chain tests passed ✅

### Additional Testnet Chains (Optional)
- [ ] Deployed to Polygon Mumbai
- [ ] Deployed to Arbitrum Sepolia
- [ ] Deployed to Optimism Sepolia
- [ ] Set up trusted remotes for additional chains
- [ ] Tested cross-chain transfers to/from additional chains

### Testnet Issues Log
Record any issues encountered:
```
Issue 1: _______________________________________________________________
Solution: ______________________________________________________________

Issue 2: _______________________________________________________________
Solution: ______________________________________________________________

Issue 3: _______________________________________________________________
Solution: ______________________________________________________________
```

---

## 💻 Phase 2: Frontend Development

### Project Setup
- [ ] Created Next.js project: `npx create-next-app@latest nabat-dapp`
- [ ] Installed OnchainKit: `npm install @coinbase/onchainkit`
- [ ] Installed wagmi: `npm install wagmi viem`
- [ ] Installed ethers: `npm install ethers`
- [ ] Set up environment variables for frontend
- [ ] Configured OnchainKit with API key

### Core Components Built
- [ ] Wallet connection component (MetaMask, Coinbase Wallet)
- [ ] Network switcher (Base, Ethereum, Polygon, etc.)
- [ ] Balance display (current chain)
- [ ] Multi-chain balance view (all chains)
- [ ] Transfer form (amount, recipient, destination)
- [ ] Fee estimator (shows LayerZero fee)
- [ ] Send button with transaction handling
- [ ] Transaction status display (pending/confirmed)
- [ ] Transaction history viewer
- [ ] Error handling for all components

### Testing
- [ ] Tested wallet connection on testnet
- [ ] Tested balance display with testnet tokens
- [ ] Tested fee estimation
- [ ] Tested cross-chain transfer from UI
- [ ] Tested error scenarios (insufficient balance, wrong network, etc.)
- [ ] Tested on mobile devices
- [ ] Tested on different browsers

### Deployment
- [ ] Deployed to Vercel: `vercel`
- [ ] Verified testnet deployment works
- [ ] URL: `_______________________________________`
- [ ] Configured custom domain (if ready)
- [ ] nabat.finance domain connected (if ready)

---

## 🔒 Phase 3: Security Review

### Code Review
- [ ] Reviewed all smart contract code
- [ ] Reviewed deployment scripts
- [ ] Reviewed cross-chain configuration
- [ ] Checked for common vulnerabilities
- [ ] Verified immutability (no mint/burn after deployment)
- [ ] Verified supply conservation logic
- [ ] Verified access controls (owner functions)

### Testing
- [ ] Ran all unit tests: `npm test`
- [ ] All tests passing ✅
- [ ] Tested edge cases
- [ ] Tested with large amounts
- [ ] Tested with minimum amounts
- [ ] Tested failed transactions
- [ ] Tested network congestion scenarios

### Security Audit (Recommended)
- [ ] Contacted audit firms for quotes
- [ ] Selected audit firm: `_______________________________________`
- [ ] Budget approved: `$_______________________________________`
- [ ] Audit scheduled: `_______________________________________`
- [ ] Audit completed: `_______________________________________`
- [ ] All critical issues fixed
- [ ] All high issues fixed
- [ ] Medium/low issues addressed or acknowledged
- [ ] Audit report published

---

## 🚀 Phase 4: Mainnet Deployment

### Pre-Deployment
- [ ] **CRITICAL**: Testnet deployment successful ✅
- [ ] **CRITICAL**: Security audit completed (strongly recommended) ✅
- [ ] **CRITICAL**: All issues from audit resolved ✅
- [ ] Created NEW mainnet wallet (separate from testnet)
- [ ] Secured private key (hardware wallet recommended)
- [ ] Added mainnet RPC endpoints to `.env`
- [ ] Got mainnet ETH on Base (for gas fees)
- [ ] Got mainnet ETH on other destination chains
- [ ] Prepared branding assets (logo on IPFS)
- [ ] Updated website/social media links
- [ ] Block explorer API keys ready (for verification)

### Hub Chain Deployment (Base Mainnet)
- [ ] **DOUBLE-CHECK**: `DEPLOYMENT_TYPE=hub` ✅
- [ ] **DOUBLE-CHECK**: Network is Base mainnet ✅
- [ ] **DOUBLE-CHECK**: Branding metadata correct ✅
- [ ] Ran deployment: `npm run deploy:onbt:base`
- [ ] Deployment successful ✅
- [ ] **CONTRACT ADDRESS**: `_______________________________________`
- [ ] **SAVE THIS IMMEDIATELY** - This is your main token contract!
- [ ] Verified on BaseScan: https://basescan.org/
- [ ] Confirmed 1,000,000,000 ONBT minted
- [ ] Announced contract address publicly
- [ ] Added to token tracking sites

### Destination Chain Deployments
- [ ] **DOUBLE-CHECK**: `DEPLOYMENT_TYPE=destination` for ALL destinations ✅

#### Ethereum Mainnet
- [ ] Deployed with 0 supply
- [ ] Contract address: `_______________________________________`
- [ ] Verified on Etherscan
- [ ] Updated `.env`

#### Polygon Mainnet
- [ ] Deployed with 0 supply
- [ ] Contract address: `_______________________________________`
- [ ] Verified on Polygonscan
- [ ] Updated `.env`

#### Arbitrum Mainnet
- [ ] Deployed with 0 supply
- [ ] Contract address: `_______________________________________`
- [ ] Verified on Arbiscan
- [ ] Updated `.env`

#### Optimism Mainnet
- [ ] Deployed with 0 supply
- [ ] Contract address: `_______________________________________`
- [ ] Verified on Optimistic Etherscan
- [ ] Updated `.env`

#### Avalanche C-Chain
- [ ] Deployed with 0 supply
- [ ] Contract address: `_______________________________________`
- [ ] Verified on Snowtrace
- [ ] Updated `.env`

#### BNB Smart Chain
- [ ] Deployed with 0 supply
- [ ] Contract address: `_______________________________________`
- [ ] Verified on BscScan
- [ ] Updated `.env`

### Cross-Chain Configuration (Mainnet)
- [ ] Set trusted remotes on Base (hub)
- [ ] Set trusted remotes on Ethereum
- [ ] Set trusted remotes on Polygon
- [ ] Set trusted remotes on Arbitrum
- [ ] Set trusted remotes on Optimism
- [ ] Set trusted remotes on Avalanche
- [ ] Set trusted remotes on BSC
- [ ] All bidirectional trusts verified ✅

### Initial Testing (Mainnet)
- [ ] **CRITICAL**: Test with SMALL amounts first!
- [ ] Sent 100 ONBT from Base to Ethereum
- [ ] Confirmed successful transfer
- [ ] Sent 100 ONBT from Ethereum back to Base
- [ ] Confirmed successful transfer
- [ ] Tested transfer to each destination chain
- [ ] All cross-chain routes working ✅
- [ ] Monitored on LayerZero Scan: https://layerzeroscan.com/

### Token Distribution
- [ ] Planned distribution strategy:
  - Base: `____________` ONBT (hub liquidity)
  - Ethereum: `____________` ONBT (large market)
  - Polygon: `____________` ONBT (low fees)
  - Arbitrum: `____________` ONBT (L2 ecosystem)
  - Others: `____________` ONBT each
- [ ] Executed initial distribution
- [ ] Verified supply conservation (total = 1B)
- [ ] All tokens distributed as planned ✅

---

## 📈 Phase 5: Launch & Growth

### DEX Liquidity
#### Base (Uniswap V3)
- [ ] Created ONBT/ETH pool
- [ ] Added initial liquidity: `____________` ONBT + `____________` ETH
- [ ] Pool address: `_______________________________________`
- [ ] Set fee tier: `____________`%

#### Ethereum (Uniswap V3)
- [ ] Created ONBT/ETH pool
- [ ] Added initial liquidity: `____________` ONBT + `____________` ETH
- [ ] Pool address: `_______________________________________`
- [ ] Set fee tier: `____________`%

#### Other Chains
- [ ] Polygon (QuickSwap) - Pool created and funded
- [ ] Arbitrum (Camelot) - Pool created and funded
- [ ] Optimism (Velodrome) - Pool created and funded

### Token Listings
- [ ] Submitted to CoinGecko
- [ ] CoinGecko listing approved: `_______________________________________`
- [ ] Submitted to CoinMarketCap
- [ ] CoinMarketCap listing approved: `_______________________________________`
- [ ] Submitted to DeFiLlama
- [ ] DeFiLlama listing approved
- [ ] Added to Trust Wallet token list
- [ ] Added to MetaMask token list

### Website & Marketing
- [ ] Production website deployed to nabat.finance
- [ ] SSL certificate active (HTTPS)
- [ ] Analytics installed (Google Analytics, etc.)
- [ ] Documentation portal live
- [ ] Blog/news section created
- [ ] Social media accounts created:
  - [ ] Twitter: `_______________________________________`
  - [ ] Discord: `_______________________________________`
  - [ ] Telegram: `_______________________________________`
  - [ ] Medium: `_______________________________________`
- [ ] Launch announcement published
- [ ] Community engagement started

### Monitoring & Maintenance
- [ ] Set up Tenderly monitoring
- [ ] Set up The Graph subgraph
- [ ] Set up LayerZero Scan alerts
- [ ] Set up Dune Analytics dashboard
- [ ] Created monitoring scripts for supply verification
- [ ] Set up error alerting (PagerDuty, etc.)
- [ ] Documented operational procedures
- [ ] Created incident response plan

### Legal & Compliance (Consult lawyer)
- [ ] Consulted with legal team
- [ ] Terms of Service published
- [ ] Privacy Policy published
- [ ] Disclaimers added to website
- [ ] Regulatory considerations addressed
- [ ] Tax implications documented

---

## 📊 Deployment Summary

### Contract Addresses (MAINNET)

| Chain | Network | Contract Address | Explorer |
|-------|---------|-----------------|----------|
| Base | Mainnet | | https://basescan.org/ |
| Ethereum | Mainnet | | https://etherscan.io/ |
| Polygon | Mainnet | | https://polygonscan.com/ |
| Arbitrum | Mainnet | | https://arbiscan.io/ |
| Optimism | Mainnet | | https://optimistic.etherscan.io/ |
| Avalanche | C-Chain | | https://snowtrace.io/ |
| BSC | Mainnet | | https://bscscan.com/ |

### Important Links

| Resource | URL |
|----------|-----|
| Official Website | https://nabat.finance |
| dApp (Bridge) | https://app.nabat.finance |
| Documentation | https://docs.nabat.finance |
| Twitter | https://twitter.com/_____ |
| Discord | https://discord.gg/_____ |
| Telegram | https://t.me/_____ |
| GitHub | https://github.com/acegrant99/ONBT-App |
| CoinGecko | https://coingecko.com/coins/_____ |
| CoinMarketCap | https://coinmarketcap.com/currencies/_____ |

### Team Contacts

| Role | Name | Contact |
|------|------|---------|
| Lead Developer | | |
| Smart Contract Dev | | |
| Frontend Dev | | |
| Community Manager | | |
| Marketing | | |

---

## 🎯 Success Metrics

Track these metrics after launch:

### Week 1
- [ ] Total holders: `____________`
- [ ] Total transactions: `____________`
- [ ] Cross-chain volume: `____________` ONBT
- [ ] DEX volume: `$____________`
- [ ] Website visitors: `____________`

### Month 1
- [ ] Total holders: `____________`
- [ ] Total transactions: `____________`
- [ ] Cross-chain volume: `____________` ONBT
- [ ] DEX volume: `$____________`
- [ ] Market cap: `$____________`
- [ ] Community size: `____________` members

### Month 3
- [ ] Total holders: `____________`
- [ ] Partnerships: `____________`
- [ ] Exchange listings: `____________`
- [ ] Active chains: `____________`
- [ ] TVL in pools: `$____________`

---

## ⚠️ Critical Reminders

### DO ✅
- ✅ Test EVERYTHING on testnet first
- ✅ Use a NEW wallet for mainnet (separate from testnet)
- ✅ Deploy hub chain ONLY ONCE (on Base)
- ✅ Deploy destination chains with 0 supply
- ✅ Set up trusted remotes on ALL chains
- ✅ Test with small amounts on mainnet first
- ✅ Verify total supply = 1B always
- ✅ Get security audit before mainnet
- ✅ Save all contract addresses immediately
- ✅ Verify contracts on block explorers

### DON'T ❌
- ❌ Don't deploy hub chain (DEPLOYMENT_TYPE=hub) more than once
- ❌ Don't use your mainnet wallet for testnet
- ❌ Don't commit .env file to git
- ❌ Don't share your private key with anyone
- ❌ Don't skip testnet testing
- ❌ Don't skip security audit (if handling user funds)
- ❌ Don't change contracts after deployment (immutable)
- ❌ Don't forget to set trusted remotes
- ❌ Don't send large amounts before testing
- ❌ Don't forget to backup all addresses and keys

---

## 📝 Notes

Use this space for additional notes, issues, or observations:

```
____________________________________________________________________________

____________________________________________________________________________

____________________________________________________________________________

____________________________________________________________________________

____________________________________________________________________________

____________________________________________________________________________

____________________________________________________________________________

____________________________________________________________________________

____________________________________________________________________________

____________________________________________________________________________
```

---

## ✅ Final Checklist Before Public Launch

- [ ] All testnet deployments successful
- [ ] Security audit completed and issues resolved
- [ ] All mainnet contracts deployed
- [ ] All cross-chain routes tested
- [ ] DEX liquidity added
- [ ] Website live at nabat.finance
- [ ] Social media accounts active
- [ ] Documentation complete
- [ ] Legal review completed
- [ ] Community support ready
- [ ] Monitoring systems active
- [ ] Backup and recovery procedures documented
- [ ] Team trained on operations
- [ ] Launch announcement ready
- [ ] Press release ready (if applicable)

**Date ready for launch**: `_______________________________________`

**Launch date**: `_______________________________________`

---

**🎊 Congratulations on your ONBT deployment!**

Remember: This is a living document. Update it as you progress through deployment, and use it as a reference for future deployments or updates.
