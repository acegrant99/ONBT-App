# Known Issues & Notes

This document tracks known quirks, unused variables, and non-critical issues in the deployed contracts.

## Non-Critical Issues

### totalVotingPower Not Updated

**Location:** `ONBTOmnichainStaking.sol` (line 99)

**Description:** The `totalVotingPower` state variable is declared but never updated. It remains at 0.

**Impact:** None. Per-user voting power is correctly calculated and cached via `getVotingPower(address)` which returns `stakes[user].amount + delegatedVotes[user]`.

**Status:** No fix required. Individual voting power works correctly; only the unused global aggregation variable is 0.

**Workaround:** Use `getVotingPower(address)` or the cached `stakes[user].votingPower` for per-user lookups. To compute total voting power across all users, sum `localTotalStaked + sum(delegatedVotes)`.

---

## Version

Last updated: 2026-02-20  
Applies to: deployment-lzv2-resume-base-stakingfix-1771584423316, deployment-lzv2-resume-arbitrum-stakingfix-1771584790862
