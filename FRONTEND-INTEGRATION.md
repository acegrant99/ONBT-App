# ONBT Frontend Integration Guide

**Last Updated:** February 21, 2026  
**Status:** Production Ready  
**Target:** Web3 dApps, wallets, and integrations

---

## Integration Overview

This guide provides everything needed to integrate the ONBT omnichain ecosystem into a frontend application.

### What You Get

- ✅ Cross-chain token (OFT) on Base + Arbitrum
- ✅ Staking protocol with achievement NFTs
- ✅ Multi-destination revenue distribution
- ✅ LayerZero V2 cross-chain messaging
- ✅ Governance system with timelock
- ✅ DeFi ecosystem (vault, insurance, rewards)

### Network Details

| Network | Chain ID | ONBT Address | Staking Address |
|---------|----------|--------------|-----------------|
| **Base** | 8453 | `0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5` | `0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe` |
| **Arbitrum** | 42161 | `0x169aC761Ebb210B5A93B68B44DA394776a7B230C` | `0x4E8cF6632fdFD031019c748B041e1c2dC447fa44` |

---

## Quick Start

### 1. Install Dependencies

```bash
npm install ethers@5.7.2 wagmi viem
```

**Or use pre-built providers:**
```javascript
import { ethers } from 'ethers';

// Connect to Base
const baseProvider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.base.org'
);

// Connect to Arbitrum
const arbProvider = new ethers.providers.JsonRpcProvider(
  'https://arb1.arbitrum.io/rpc'
);
```

### 2. Load Contract ABIs

All ABIs are available in `artifacts/contracts/` (frontend copies live under `frontend/src/contracts/abi`):

```javascript
import ONBT_ABI from './artifacts/contracts/token/ONBTToken.sol/ONBTToken.json';
import STAKING_ABI from './artifacts/contracts/defi/ONBTOmnichainStaking.sol/ONBTOmnichainStaking.json';
import NFTS_ABI from './artifacts/contracts/token/AchievementNFT.sol/AchievementNFT.json';
```

### 3. Initialize Contracts

```javascript
const { ethers } = require('ethers');

// Connect wallet (user's injected provider)
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Base network contracts
const onbtBase = new ethers.Contract(
  '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5',
  ONBT_ABI,
  signer
);

const stakingBase = new ethers.Contract(
  '0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe',
  STAKING_ABI,
  signer
);

const nftBase = new ethers.Contract(
  '0x11EEEB62b2b2B66475642f82502989D671fC5855',
  NFT_ABI,
  signer
);
```

---

## Core Features

### 1. Token Operations (OFT)

#### Get Token Info

```javascript
// Decimals
const decimals = await onbtBase.decimals(); // 18

// Total supply
const totalSupply = await onbtBase.totalSupply(); // BigNumber

// User balance
const userAddress = await signer.getAddress();
const balance = await onbtBase.balanceOf(userAddress); // BigNumber

// Convert to readable
const readable = ethers.utils.formatUnits(balance, 18);
```

#### Approve Token Transfer

```javascript
// Approve staking contract to spend ONBT
const approveTx = await onbtBase.approve(
  '0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe',
  ethers.utils.parseUnits('1000', 18) // 1000 ONBT
);

await approveTx.wait();
```

#### Transfer ONBT

```javascript
// On-chain transfer
const transferTx = await onbtBase.transfer(
  recipientAddress,
  ethers.utils.parseUnits('100', 18) // 100 ONBT
);

await transferTx.wait();
```

#### Cross-Chain Transfer

```javascript
// Send ONBT from Base to Arbitrum
const amount = ethers.utils.parseUnits('100', 18);
const arbEID = 30110; // Arbitrum LayerZero EID

// Get quote for cross-chain fee
const quote = await onbtBase.quoteSend(
  {
    dstEid: arbEID,
    to: userAddress,
    amountLD: amount,
    minAmountLD: amount, // Accept any amount (unsafe in production)
    extraOptions: '0x',
    composeMsg: '0x',
    oftCmd: '0x'
  },
  false
);

console.log('Cross-chain fee:', ethers.utils.formatEther(quote.nativeFee));

// Execute cross-chain transfer
const sendTx = await onbtBase.send(
  {
    dstEid: arbEID,
    to: userAddress,
    amountLD: amount,
    minAmountLD: amount,
    extraOptions: '0x',
    composeMsg: '0x',
    oftCmd: '0x'
  },
  {
    nativeFee: quote.nativeFee,
    lzTokenFee: 0
  },
  userAddress,
  { value: quote.nativeFee } // Include LZ fee in transaction
);

await sendTx.wait();
```

---

### 2. Staking Operations

#### Stake ONBT

```javascript
const amountToStake = ethers.utils.parseUnits('1000', 18); // 1000 ONBT

// 1. First approve token transfer
await onbtBase.approve(stakingAddress, amountToStake);

// 2. Then call stake
const stakeTx = await stakingBase.stake(amountToStake, {
  gasLimit: 300000
});

await stakeTx.wait();
```

#### Get Stake Info

```javascript
// Get staker details
const staker = await stakingBase.stakers(userAddress);
console.log({
  stakedAmount: ethers.utils.formatUnits(staker.amount, 18),
  startTime: new Date(staker.startTime * 1000),
  lastRewardTime: new Date(staker.lastRewardTime * 1000),
  rewards: ethers.utils.formatUnits(staker.rewards, 18)
});

// Get total staked across all users
const totalStaked = await stakingBase.totalStaked({
  from: '0x44497B9FF645A995b18967b34eFeFDe82AeC8144' // Owner can call
});
```

#### Claim Rewards

```javascript
const claimTx = await stakingBase.claimRewards();
await claimTx.wait();

// Get pending rewards
const pending = await stakingBase.stakers(userAddress);
console.log('Claimed:', ethers.utils.formatUnits(pending.rewards, 18));
```

#### Unstake ONBT

```javascript
const amountToUnstake = ethers.utils.parseUnits('500', 18);

const unstakeTx = await stakingBase.unstake(amountToUnstake);
await unstakeTx.wait();
```

---

### 3. Achievement NFT System

#### Check NFT Balance

```javascript
const nftBalance = await nftBase.balanceOf(userAddress);
console.log('Achievements earned:', nftBalance.toNumber());
```

#### Get NFT Metadata

```javascript
// Get tokenURI for IPFS/metadata
if (nftBalance > 0) {
  const tokenId = 1; // First achievement
  const uri = await nftBase.tokenURI(tokenId);
  
  // Fetch metadata
  const metadata = await fetch(uri).then(r => r.json());
  console.log(metadata);
}
```

#### View Achievement Details

```javascript
// Get NFT details
const owner = await nftBase.ownerOf(tokenId);
const totalSupply = await nftBase.totalSupply();

console.log({
  owner,
  totalNFTsMinted: totalSupply.toNumber()
});
```

---

### 4. Cross-Chain Functionality

#### Check Network

```javascript
// Detect current network
const network = await provider.getNetwork();

if (network.chainId === 8453) {
  console.log('Connected to Base');
} else if (network.chainId === 42161) {
  console.log('Connected to Arbitrum');
}
```

#### Switch Network (Wallet)

```javascript
async function switchNetwork(chainId) {
  try {
    await provider.send('wallet_switchEthereumChain', [
      { chainId: '0x' + chainId.toString(16) }
    ]);
  } catch (err) {
    if (err.code === 4902) {
      // Chain not added, add it
      await provider.send('wallet_addEthereumChain', [{
        chainId: '0x' + chainId.toString(16),
        chainName: chainId === 8453 ? 'Base' : 'Arbitrum',
        rpcUrls: chainId === 8453 
          ? ['https://mainnet.base.org']
          : ['https://arb1.arbitrum.io/rpc'],
        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 }
      }]);
    }
  }
}

// Switch to Arbitrum
await switchNetwork(42161);
```

#### Bridge ONBT Between Chains

```javascript
async function bridgeONBT(fromChain, toChain, amount) {
  // Gets provider for source chain
  const sourceProvider = fromChain === 'base' ? baseProvider : arbProvider;
  const sourceSigner = sourceProvider.getSigner();
  
  // Source OFT contract
  const sourceAddress = fromChain === 'base' 
    ? '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5'
    : '0x169aC761Ebb210B5A93B68B44DA394776a7B230C';
    
  const oft = new ethers.Contract(sourceAddress, ONBT_ABI, sourceSigner);
  
  // Get destination EID
  const destEID = toChain === 'arbitrum' ? 30110 : 30184;
  const userAddr = await sourceSigner.getAddress();
  
  // Get quote
  const amountLD = ethers.utils.parseUnits(amount, 18);
  const quote = await oft.quoteSend(
    {
      dstEid: destEID,
      to: userAddr,
      amountLD,
      minAmountLD: amountLD.mul(99).div(100), // 1% slippage
      extraOptions: '0x',
      composeMsg: '0x',
      oftCmd: '0x'
    },
    false
  );
  
  // Send
  const tx = await oft.send(
    {
      dstEid: destEID,
      to: userAddr,
      amountLD,
      minAmountLD: amountLD.mul(99).div(100),
      extraOptions: '0x',
      composeMsg: '0x',
      oftCmd: '0x'
    },
    {
      nativeFee: quote.nativeFee,
      lzTokenFee: 0
    },
    userAddr,
    { value: quote.nativeFee }
  );
  
  return tx.hash;
}
```

---

### 5. Event Monitoring

#### Listen to Staking Events

```javascript
// Stake event
stakingBase.on('Staked', (user, amount, event) => {
  console.log(`User staked: ${ethers.utils.formatUnits(amount, 18)} ONBT`);
});

// Unstake event
stakingBase.on('Unstaked', (user, amount, event) => {
  console.log(`User unstaked: ${ethers.utils.formatUnits(amount, 18)} ONBT`);
});

// Reward claim event
stakingBase.on('RewardsClaimed', (user, amount, event) => {
  console.log(`Rewards claimed: ${ethers.utils.formatUnits(amount, 18)} ONBT`);
});
```

#### Listen to Token Transfer Events

```javascript
// Token transfer
onbtBase.on('Transfer', (from, to, amount, event) => {
  console.log(`${amount} ONBT transferred from ${from} to ${to}`);
});

// Approval
onbtBase.on('Approval', (owner, spender, amount, event) => {
  console.log(`${owner} approved ${spender} to spend ${amount} ONBT`);
});
```

#### Listen to NFT Minting

```javascript
// NFT mint
nftBase.on('Transfer', (from, to, tokenId, event) => {
  if (from === ethers.constants.AddressZero) {
    console.log(`New achievement minted to ${to}: #${tokenId}`);
  }
});
```

---

## React Integration Example

```javascript
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount, useSigner, useNetwork } from 'wagmi';

function StakingDashboard() {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  
  const [balance, setBalance] = useState('0');
  const [staked, setStaked] = useState('0');
  const [rewards, setRewards] = useState('0');
  const [loading, setLoading] = useState(false);

  const onbtAddress = chain?.id === 8453 
    ? '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5'
    : '0x169aC761Ebb210B5A93B68B44DA394776a7B230C';

  const stakingAddress = chain?.id === 8453
    ? '0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe'
    : '0x4E8cF6632fdFD031019c748B041e1c2dC447fa44';

  useEffect(() => {
    if (!address || !signer) return;

    const loadData = async () => {
      try {
        const onbt = new ethers.Contract(onbtAddress, ONBT_ABI, signer);
        const staking = new ethers.Contract(stakingAddress, STAKING_ABI, signer);

        // Load balance
        const bal = await onbt.balanceOf(address);
        setBalance(ethers.utils.formatUnits(bal, 18));

        // Load stake info
        const stakerInfo = await staking.stakers(address);
        setStaked(ethers.utils.formatUnits(stakerInfo.amount, 18));
        setRewards(ethers.utils.formatUnits(stakerInfo.rewards, 18));
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [address, signer, chain]);

  const handleStake = async (amount) => {
    if (!signer) return;
    setLoading(true);
    try {
      const onbt = new ethers.Contract(onbtAddress, ONBT_ABI, signer);
      const staking = new ethers.Contract(stakingAddress, STAKING_ABI, signer);
      
      const amountWei = ethers.utils.parseUnits(amount, 18);
      
      // Approve
      const approveTx = await onbt.approve(stakingAddress, amountWei);
      await approveTx.wait();
      
      // Stake
      const stakeTx = await staking.stake(amountWei);
      await stakeTx.wait();
      
      // Reload
      const bal = await onbt.balanceOf(address);
      setBalance(ethers.utils.formatUnits(bal, 18));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>ONBT Staking</h2>
      <div>Balance: {balance} ONBT</div>
      <div>Staked: {staked} ONBT</div>
      <div>Rewards: {rewards} ONBT</div>
      <button onClick={() => handleStake('100')} disabled={loading}>
        {loading ? 'Staking...' : 'Stake 100 ONBT'}
      </button>
    </div>
  );
}

export default StakingDashboard;
```

---

## Contract Addresses Reference

**Source of truth:** deployment JSONs under [deploy/](deploy/). Latest stakingfix files are:
- [deploy/deployment-lzv2-resume-base-stakingfix-1771584423316.json](deploy/deployment-lzv2-resume-base-stakingfix-1771584423316.json)
- [deploy/deployment-lzv2-resume-arbitrum-stakingfix-1771584790862.json](deploy/deployment-lzv2-resume-arbitrum-stakingfix-1771584790862.json)

### Base Mainnet (8453)

| Contract | Address |
|----------|---------|
| ONBT Token | `0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5` |
| Governor | `0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9` |
| Staking | `0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe` |
| Staking Router | `0x7b1E4982755A17bfBbD2d249BC1079C2d31E959B` |
| Achievement NFT | `0x11EEEB62b2b2B66475642f82502989D671fC5855` |
| Rewards Pool | `0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85` |
| Liquidity Manager | `0xb362Af3da1497A551C08F79bC03CbA12D2b7e908` |
| Yield Distributor | `0x8c91384EbF767C1C434d127c82020380F4A8afC7` |
| Incentive Controller | `0x7b06795D31482fef0213b24E8ad5f348692A73BD` |
| Vault | `0xFd06Ecbd22b208f398E4d822904F7114642eF9b9` |
| Insurance Fund | `0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE` |
| Stabilizer | `0x26D75024c2491636a1A1145a3d6966788EF54667` |
| Revenue Router | `0xCBFFd3F88d5C97D06F6306181493D56f70E7fBb0` |

### Arbitrum Mainnet (42161)

| Contract | Address |
|----------|---------|
| ONBT Token | `0x169aC761Ebb210B5A93B68B44DA394776a7B230C` |
| Governor | `0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854` |
| Staking | `0x4E8cF6632fdFD031019c748B041e1c2dC447fa44` |
| Staking Router | `0xd731eAA2c32d85B55cdf8c9cEba114350ba46c64` |
| Achievement NFT | `0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb` |
| Rewards Pool | `0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1` |
| Liquidity Manager | `0x5889E566a2175C2d504d8e4D1Ad0A979dCa854a3` |
| Yield Distributor | `0x2085ca5081480e8634eF4295ef477fe8cE97B892` |
| Incentive Controller | `0xc19273A6F0BBC4Fe6B9B8717FeAa0980448dDA50` |
| Vault | `0x85fE97c69350Be8B9A6bC026006907E34324CD6A` |
| Insurance Fund | `0x85BB4B6268446a71110db6f296885AA1EE36c695` |
| Stabilizer | `0x6e6C6d7Fc80bD1d52c291Fad3425dEC43f464587` |
| Revenue Router | `0xa66CA14df740B142d8E2DE515A8743ad1eE25850` |

---

## Common Patterns

### Error Handling

```javascript
try {
  const tx = await contract.functionName(params);
  const receipt = await tx.wait();
  
  if (receipt.status === 0) {
    throw new Error('Transaction reverted');
  }
  
  return receipt;
} catch (err) {
  if (err.code === 'CALL_EXCEPTION') {
    console.error('View function failed:', err);
  } else if (err.code === 'TRANSACTION_REPLACED') {
    console.error('Transaction was replaced:', err);
  } else if (err.code === 4001) {
    console.error('User rejected transaction');
  } else {
    console.error('Unexpected error:', err);
  }
}
```

### Gas Estimation

```javascript
// Estimate gas for stake
const amountWei = ethers.utils.parseUnits('1000', 18);

// First approve
const approveTx = await onbt.approve(stakingAddress, amountWei);
const approveGas = approveTx.gasLimit || 100000;

// Then estimate stake
let estimatedGas = 300000; // Conservative estimate
try {
  const estimate = await staking.estimateGas.stake(amountWei);
  estimatedGas = estimate.toNumber();
} catch (err) {
  console.error('Gas estimation failed, using default');
}

console.log(`Estimated gas: ${estimatedGas}`);
```

### Batching Transactions

```javascript
async function stakeAndBridge(stakeAmount, bridgeAmount) {
  // 1. Approve total amount
  const totalAmount = ethers.utils.parseUnits(
    (parseFloat(stakeAmount) + parseFloat(bridgeAmount)).toString(),
    18
  );
  
  const approveTx = await onbt.approve(stakingAddress, totalAmount);
  await approveTx.wait();
  
  // 2. Stake
  const stakeTx = await staking.stake(
    ethers.utils.parseUnits(stakeAmount, 18)
  );
  await stakeTx.wait();
  
  // 3. Bridge
  const bridgeTx = await onbt.send(
    {
      dstEid: 30110,
      to: userAddress,
      amountLD: ethers.utils.parseUnits(bridgeAmount, 18),
      minAmountLD: ethers.utils.parseUnits(bridgeAmount, 18).mul(99).div(100),
      extraOptions: '0x',
      composeMsg: '0x',
      oftCmd: '0x'
    },
    { nativeFee: quote.nativeFee, lzTokenFee: 0 },
    userAddress,
    { value: quote.nativeFee }
  );
  
  return { stakeTx: stakeTx.hash, bridgeTx: bridgeTx.hash };
}
```

---

## Best Practices

1. **Always specify gas limits** for write operations
2. **Verify network** before executing transactions
3. **Use minimal slippage** for cross-chain transfers
4. **Cache RPC calls** when possible
5. **Monitor gas prices** before large transactions
6. **Set reasonable timeouts** for cross-chain operations (2-5 minutes)
7. **Validate user input** before contract calls
8. **Use event listeners** for real-time updates

---

## Support

- **Contract Verification:** https://basescan.org & https://arbiscan.io
- **LayerZero Scan:** https://layerzeroscan.com/
- **Full Deployment Docs:** See `DEPLOYMENT-STATUS.md`
- **Operations Guide:** See `OPERATIONS-GUIDE.md`

---

**Integration Ready:** ✅  
**Last Updated:** February 21, 2026
