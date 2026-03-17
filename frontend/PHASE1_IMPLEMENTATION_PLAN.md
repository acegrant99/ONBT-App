# Phase 1 Implementation Roadmap

**Status:** Starting Implementation  
**Target Completion:** 2-3 weeks  
**Team Capacity:** Full focus  

---

## 🎯 Feature Overview

### **Feature 1: Governance Dashboard**
**Unlock:** DAO participation, proposal voting, voting power delegation  
**Contracts:** `OmnichainNabatGovernor.sol`, `OmnichainNabatVotes.sol`

#### Components to Build (8 components)
1. `Governance.tsx` - Main governance page
2. `ProposalList.tsx` - Active & past proposals
3. `ProposalDetail.tsx` - Individual proposal view
4. `VotingPanel.tsx` - Cast vote interface
5. `VotingPowerDisplay.tsx` - Show voting power
6. `DelegatePanel.tsx` - Delegate voting power
7. `ProposalCreator.tsx` - Create new proposal (advanced)
8. `VoteHistory.tsx` - User's voting history

#### Hooks to Build (5 hooks)
1. `useGovernanceProposals()` - Fetch proposals
2. `useVotingPower()` - Get user's voting power
3. `useCastVote()` - Vote on proposal
4. `useDelegateVotes()` - Delegate voting power
5. `useCreateProposal()` - Create proposal

**Estimated Effort:** 40-50 hours

---

### **Feature 2: Advanced Rewards/Yield Dashboard**
**Unlock:** Reward details, APY visibility, historical tracking, claims  
**Contracts:** `ONBTRewardsPool.sol`, `ONBTYieldDistributor.sol`, `ONBTStakingRouter.sol`

#### Components to Build (6 components)
1. `RewardsDashboard.tsx` - Main rewards page
2. `RewardsBreakdown.tsx` - Reward sources breakdown
3. `APYCalculator.tsx` - Show APY/APR projections
4. `HistoricalRewards.tsx` - Chart of earned rewards
5. `RewardsClaimPanel.tsx` - Multi-tier reward claiming
6. `RewardSources.tsx` - Details on each reward source

#### Hooks to Build (4 hooks)
1. `useRewardBreakdown()` - Get reward sources
2. `useHistoricalRewards()` - Fetch reward history
3. `useAPYProjection()` - Calculate projected APY
4. `useClaimRewards()` - Claim multiple reward tiers

**Estimated Effort:** 20-25 hours

---

### **Feature 3: Liquidity Manager**
**Unlock:** Token utility, swap functionality, LP rewards  
**Contracts:** `ONBTLiquidityManager.sol`

#### Components to Build (8 components)
1. `Liquidity.tsx` - Main liquidity page
2. `PoolSelector.tsx` - Choose trading pair
3. `AddLiquidity.tsx` - Provide liquidity form
4. `RemoveLiquidity.tsx` - Withdraw liquidity
5. `LiquidityPositions.tsx` - View active positions
6. `SwapInterface.tsx` - Token swap interface
7. `PoolStats.tsx` - Pool statistics (TVL, APY, volume)
8. `LiquidityHistory.tsx` - Transaction history

#### Hooks to Build (6 hooks)
1. `usePools()` - Get available pools
2. `useAddLiquidity()` - Add liquidity transaction
3. `useRemoveLiquidity()` - Remove liquidity
4. `useLiquidityPositions()` - Get user positions
5. `useSwapTokens()` - Execute swap
6. `usePoolStats()` - Get pool metrics

**Estimated Effort:** 35-40 hours

---

### **Feature 4: Revenue Sharing Dashboard**
**Unlock:** Passive income, protocol profit participation  
**Contracts:** `ONBTRevenueRouter.sol`

#### Components to Build (5 components)
1. `RevenueShare.tsx` - Main revenue page
2. `RevenueSources.tsx` - Revenue source breakdown
3. `ClaimRevenue.tsx` - Claim revenue share
4. `RevenueHistory.tsx` - Historical earnings chart
5. `AllocationDisplay.tsx` - Show allocation percentages

#### Hooks to Build (4 hooks)
1. `useRevenueSources()` - Get revenue breakdown
2. `useClaimableRevenue()` - Calculate claimable amount
3. `useClaimRevenue()` - Execute revenue claim
4. `useRevenueHistory()` - Fetch historical data

**Estimated Effort:** 20-25 hours

---

## 📊 Implementation Timeline

### **Week 1: Governance**
```
Day 1-2: Hooks & contract integration
Day 3-4: List & detail components
Day 5: Voting & delegation panels
```

### **Week 2: Rewards + Begin Liquidity**
```
Day 1-2: Rewards hooks & components
Day 3-4: Liquidity hooks & add/remove components
Day 5: Pool stats & swap interface
```

### **Week 3: Liquidity + Revenue + Polish**
```
Day 1-2: Complete liquidity features
Day 3-4: Revenue dashboard
Day 5: Testing, bug fixes, integration
```

---

## 🔧 Technical Stack & Dependencies

### **Already Available:**
- ✅ Wagmi v2 (contract interactions)
- ✅ Viem v2 (low-level Ethereum)
- ✅ React Query (caching & fetching)
- ✅ Framer Motion (animations)
- ✅ Tailwind CSS (styling)
- ✅ Recharts (data visualization)
- ✅ Zod (validation)
- ✅ React Hook Form (forms)

### **May Need to Add:**
- Chart components (Recharts already installed)
- Decimal handling (decimal.js)
- Date formatting (date-fns already installed)
- Token amount formatting utilities

### **Already in Components:**
- Custom Button, Card, Input components
- Custom hooks library
- Animation utilities
- Toast notifications

---

## 🏗️ Architecture Decisions

### **Folder Structure**
```
src/
├── components/
│   ├── governance/
│   │   ├── Governance.tsx
│   │   ├── ProposalList.tsx
│   │   ├── ProposalDetail.tsx
│   │   └── ...
│   ├── rewards/
│   │   ├── RewardsDashboard.tsx
│   │   ├── RewardsBreakdown.tsx
│   │   └── ...
│   ├── liquidity/
│   │   ├── Liquidity.tsx
│   │   ├── AddLiquidity.tsx
│   │   └── ...
│   ├── revenue/
│   │   ├── RevenueShare.tsx
│   │   ├── RevenueSources.tsx
│   │   └── ...
│   └── (existing shared components)
├── hooks/
│   ├── governance/
│   │   ├── useGovernanceProposals.ts
│   │   ├── useVotingPower.ts
│   │   └── ...
│   ├── rewards/
│   │   ├── useRewardBreakdown.ts
│   │   └── ...
│   ├── liquidity/
│   │   ├── usePools.ts
│   │   └── ...
│   ├── revenue/
│   │   ├── useRevenueSources.ts
│   │   └── ...
│   └── (existing shared hooks)
└── (existing structure)
```

### **Contract Interaction Pattern**
```typescript
// Example pattern for all hooks
export function useGovernanceProposals() {
  const { address } = useAccount()
  
  const { data: proposals, isLoading } = useContractReads({
    contracts: [
      // Governor contract reads
    ],
    enabled: !!address,
  })

  return { proposals, isLoading }
}
```

### **Component Pattern**
```typescript
// Example component structure
export function ProposalList() {
  const { proposals, isLoading } = useGovernanceProposals()
  
  return (
    <div className="space-y-4">
      {isLoading && <LoadingSkeleton />}
      {proposals?.map((proposal) => (
        <Card key={proposal.id}>
          {/* Proposal UI */}
        </Card>
      ))}
    </div>
  )
}
```

---

## 📋 Feature Checklist

### **Governance Dashboard**
- [ ] Display list of active/past proposals
- [ ] Show proposal details (description, timeline, votes)
- [ ] Vote on proposals (for/against/abstain)
- [ ] Show voting power (balance + delegated)
- [ ] Delegate voting power to address
- [ ] View user's voting history
- [ ] Display vote breakdown by option
- [ ] Show proposal execution status

### **Rewards Dashboard**
- [ ] Show breakdown of reward sources
- [ ] Calculate and display projected APY
- [ ] Show historical rewards earned (chart)
- [ ] Display claimable rewards by tier
- [ ] Claim single or multiple reward tiers
- [ ] Show reward pool statistics
- [ ] Display next claim timeline
- [ ] Show total rewards earned lifetime

### **Liquidity Manager**
- [ ] List available trading pairs/pools
- [ ] Show pool statistics (TVL, APY, volume)
- [ ] Add liquidity (single-sided, dual)
- [ ] View active liquidity positions
- [ ] Remove liquidity from positions
- [ ] Swap tokens interface
- [ ] Show LP rewards accrual
- [ ] Transaction history for LP activity

### **Revenue Sharing**
- [ ] Display revenue source breakdown
- [ ] Show allocation percentages
- [ ] Calculate claimable revenue
- [ ] Claim revenue share
- [ ] Show historical revenue received (chart)
- [ ] Display total revenue earned
- [ ] Show revenue distribution schedule

---

## 🎨 UI/UX Design Principles

### **Consistency**
- Use existing Button, Card, Input components
- Follow existing color scheme (purple/blue gradient)
- Match typography and spacing

### **Information Architecture**
- Progressive disclosure (basic → detailed)
- Summary cards at top, detailed info below
- Charts for time-series data
- Tables for comparative data

### **Interaction Patterns**
- Forms with Zod validation
- Confirmation modals for transactions
- Toast notifications for feedback
- Loading states with skeletons
- Error states with actionable messages

### **Mobile Responsiveness**
- Responsive grid layouts
- Stacked on mobile
- Scrollable tables
- Accessible touch targets (44px minimum)

---

## 🔗 Integration Points

### **Routing**
Add to App.tsx routes:
```typescript
// In App.tsx navigation
<Route path="/governance" element={<Governance />} />
<Route path="/governance/:proposalId" element={<ProposalDetail />} />
<Route path="/rewards" element={<RewardsDashboard />} />
<Route path="/liquidity" element={<Liquidity />} />
<Route path="/revenue" element={<RevenueShare />} />
```

### **Navigation Menu Update**
Add to header/sidebar:
- Governance
- Rewards
- Liquidity
- Revenue Share

### **Dashboard Links**
Link from Dashboard.tsx to relevant features

---

## 📱 Mobile Considerations

- Governance: Cards stack vertically
- Rewards: Charts responsive with recharts
- Liquidity: Forms adapt to mobile, swap simplified
- Revenue: Key metrics prominently displayed

---

## 🧪 Testing Strategy

### **Unit Tests**
- Hook logic (data fetching, calculations)
- Utility functions (formatting, calculations)

### **Component Tests**
- Rendering without data
- Rendering with data
- User interactions (clicks, form input)
- Error states

### **Integration Tests**
- End-to-end feature workflows
- Payment flows
- Data consistency across pages

### **Manual Testing Checklist**
- [ ] Connect wallet
- [ ] Navigate to each feature
- [ ] Interact with read-only elements
- [ ] Submit transactions
- [ ] Verify contract calls
- [ ] Check MetaMask interactions

---

## 🚀 Deployment Strategy

### **Stage 1: Development**
- Hardhat local blockchain
- Mock contract data (if needed)
- Manual testing

### **Stage 2: Testnet**
- Deploy to Base Sepolia / Arbitrum Sepolia
- Real contract interaction
- Team testing

### **Stage 3: Production**
- Deploy to Base / Arbitrum mainnet
- Full feature testing
- Public release

---

## 📊 Success Metrics

### **Feature Completion**
- All 27 components built ✓
- All 19 hooks built ✓
- 0 TypeScript errors ✓
- 100% contract integration ✓

### **Quality Metrics**
- Accessibility: WCAG 2.1 AA ✓
- Performance: Lighthouse >90 ✓
- Type Safety: Strict mode ✓
- Test Coverage: >80% ✓

### **User Experience**
- Smooth animations ✓
- Clear error messages ✓
- Fast load times ✓
- Mobile responsive ✓

---

## 🎯 Next Steps

1. **Start Week 1**: Create governance hooks
2. **Build governance components** 
3. **Create sample contract interactions**
4. **Test against devnet**
5. **Iterate and refine**

---

## 📚 Reference Documents

- [FEATURE_GAP_ANALYSIS.md](./FEATURE_GAP_ANALYSIS.md) - Feature details
- [PREMIUM-FEATURES.md](./PREMIUM-FEATURES.md) - Available tech
- [AUDIT_DEBUG_ENHANCEMENT_REPORT.md](./AUDIT_DEBUG_ENHANCEMENT_REPORT.md) - Current state

---

**Status:** Ready to start implementation ✅
