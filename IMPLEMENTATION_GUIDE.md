# Implementation Guide: Getting Started with ONBT DeFi Contracts

## Quick Start Checklist

This guide provides step-by-step instructions to begin implementing the missing DeFi contracts identified in the analysis.

---

## Step 1: Project Initialization

### Install Node.js Dependencies
```bash
# Initialize npm project
npm init -y

# Install Hardhat
npm install --save-dev hardhat

# Initialize Hardhat project
npx hardhat init
# Choose: "Create a TypeScript project"

# Install OpenZeppelin contracts
npm install @openzeppelin/contracts @openzeppelin/contracts-upgradeable

# Install LayerZero for omnichain
npm install @layerzerolabs/lz-evm-oapp-v2 @layerzerolabs/lz-evm-protocol-v2

# Install development dependencies
npm install --save-dev @nomicfoundation/hardhat-toolbox @typechain/hardhat hardhat-gas-reporter solidity-coverage dotenv
```

### Create Directory Structure
```bash
mkdir -p contracts/{governance,treasury,staking,bridge,nft,rewards,access,utils,interfaces}
mkdir -p test/{governance,treasury,staking,bridge}
mkdir -p scripts/{deploy,verify}
mkdir -p docs
```

---

## Step 2: Configure Hardhat

### hardhat.config.ts
```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import "solidity-coverage";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    mainnet: {
      url: process.env.MAINNET_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
```

### .env.example
```bash
# RPC URLs
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Private Keys (NEVER commit actual private keys)
PRIVATE_KEY=your_private_key_here

# Etherscan
ETHERSCAN_API_KEY=your_etherscan_api_key

# Gas Reporting
REPORT_GAS=true
```

### .gitignore
```
node_modules/
.env
coverage/
coverage.json
typechain-types/
cache/
artifacts/
dist/
.DS_Store
*.log
```

---

## Step 3: Implement Core Governance Contracts

### 3.1 Governance Token (contracts/governance/GovernanceToken.sol)
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GovernanceToken
 * @notice ERC20 token with voting capabilities for ONBT governance
 */
contract GovernanceToken is ERC20, ERC20Burnable, ERC20Permit, ERC20Votes, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens

    constructor(
        string memory name,
        string memory symbol,
        address initialOwner
    ) ERC20(name, symbol) ERC20Permit(name) Ownable(initialOwner) {
        // Mint initial supply to owner
        _mint(initialOwner, 100_000_000 * 10**18); // 100 million initial
    }

    /**
     * @notice Mint new tokens (only owner can mint)
     * @param to Address to receive tokens
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }

    // Required overrides
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
```

### 3.2 Timelock Controller
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/TimelockController.sol";

/**
 * @title ONBTTimelock
 * @notice Timelock for ONBT governance proposals
 */
contract ONBTTimelock is TimelockController {
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}
```

### 3.3 Governor Contract
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

/**
 * @title ONBTGovernor
 * @notice Governor contract for ONBT DAO
 */
contract ONBTGovernor is
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    constructor(
        IVotes _token,
        TimelockController _timelock
    )
        Governor("ONBT Governor")
        GovernorSettings(
            7200, // 1 day voting delay
            50400, // 1 week voting period
            1000000e18 // 1M tokens proposal threshold
        )
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4) // 4% quorum
        GovernorTimelockControl(_timelock)
    {}

    // Required overrides
    function votingDelay()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(uint256 blockNumber)
        public
        view
        override(Governor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function state(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    function proposalNeedsQueuing(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (bool)
    {
        return super.proposalNeedsQueuing(proposalId);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    function _queueOperations(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint48) {
        return super._queueOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _executeOperations(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        super._executeOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }
}
```

---

## Step 4: Write Tests

### test/governance/GovernanceToken.test.ts
```typescript
import { expect } from "chai";
import { ethers } from "hardhat";
import { GovernanceToken } from "../../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("GovernanceToken", function () {
  let token: GovernanceToken;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
    token = await GovernanceToken.deploy("ONBT Token", "ONBT", owner.address);
    await token.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });

    it("Should assign initial supply to owner", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(ethers.parseEther("100000000"));
    });

    it("Should have correct name and symbol", async function () {
      expect(await token.name()).to.equal("ONBT Token");
      expect(await token.symbol()).to.equal("ONBT");
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint", async function () {
      await token.mint(addr1.address, ethers.parseEther("1000"));
      expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseEther("1000"));
    });

    it("Should not allow non-owner to mint", async function () {
      await expect(
        token.connect(addr1).mint(addr2.address, ethers.parseEther("1000"))
      ).to.be.reverted;
    });

    it("Should respect max supply", async function () {
      const maxSupply = await token.MAX_SUPPLY();
      const currentSupply = await token.totalSupply();
      const mintAmount = maxSupply - currentSupply + BigInt(1);
      
      await expect(
        token.mint(addr1.address, mintAmount)
      ).to.be.revertedWith("Exceeds max supply");
    });
  });

  describe("Voting", function () {
    it("Should allow delegation", async function () {
      await token.delegate(owner.address);
      const votes = await token.getVotes(owner.address);
      expect(votes).to.equal(ethers.parseEther("100000000"));
    });

    it("Should track votes after transfer", async function () {
      await token.delegate(owner.address);
      await token.transfer(addr1.address, ethers.parseEther("1000"));
      await token.connect(addr1).delegate(addr1.address);
      
      const votes = await token.getVotes(addr1.address);
      expect(votes).to.equal(ethers.parseEther("1000"));
    });
  });
});
```

---

## Step 5: Deployment Script

### scripts/deploy/01-deploy-governance.ts
```typescript
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // 1. Deploy Governance Token
  console.log("\n1. Deploying Governance Token...");
  const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
  const token = await GovernanceToken.deploy(
    "ONBT Token",
    "ONBT",
    deployer.address
  );
  await token.waitForDeployment();
  console.log("GovernanceToken deployed to:", await token.getAddress());

  // 2. Deploy Timelock
  console.log("\n2. Deploying Timelock...");
  const minDelay = 2 * 24 * 60 * 60; // 2 days
  const ONBTTimelock = await ethers.getContractFactory("ONBTTimelock");
  const timelock = await ONBTTimelock.deploy(
    minDelay,
    [], // proposers (will be set to governor)
    [], // executors (anyone can execute)
    deployer.address // admin
  );
  await timelock.waitForDeployment();
  console.log("Timelock deployed to:", await timelock.getAddress());

  // 3. Deploy Governor
  console.log("\n3. Deploying Governor...");
  const ONBTGovernor = await ethers.getContractFactory("ONBTGovernor");
  const governor = await ONBTGovernor.deploy(
    await token.getAddress(),
    await timelock.getAddress()
  );
  await governor.waitForDeployment();
  console.log("Governor deployed to:", await governor.getAddress());

  // 4. Setup roles
  console.log("\n4. Setting up roles...");
  const proposerRole = await timelock.PROPOSER_ROLE();
  const executorRole = await timelock.EXECUTOR_ROLE();
  const adminRole = await timelock.DEFAULT_ADMIN_ROLE();

  await timelock.grantRole(proposerRole, await governor.getAddress());
  await timelock.grantRole(executorRole, ethers.ZeroAddress); // Anyone can execute
  await timelock.revokeRole(adminRole, deployer.address); // Renounce admin

  console.log("\n✅ Governance system deployed successfully!");
  console.log("\nDeployment Summary:");
  console.log("===================");
  console.log("Token:", await token.getAddress());
  console.log("Timelock:", await timelock.getAddress());
  console.log("Governor:", await governor.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

---

## Step 6: Testing and Validation

### Run Tests
```bash
# Run all tests
npx hardhat test

# Run with gas reporting
REPORT_GAS=true npx hardhat test

# Run coverage
npx hardhat coverage
```

### Deploy to Local Network
```bash
# Start local node
npx hardhat node

# Deploy (in another terminal)
npx hardhat run scripts/deploy/01-deploy-governance.ts --network localhost
```

### Deploy to Testnet
```bash
# Deploy to Sepolia
npx hardhat run scripts/deploy/01-deploy-governance.ts --network sepolia

# Verify contracts
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

---

## Step 7: Security Checklist

Before mainnet deployment:
- [ ] Run Slither static analysis
- [ ] Run Mythril security scanner
- [ ] Achieve >90% test coverage
- [ ] Complete external security audit
- [ ] Set up monitoring and alerts
- [ ] Prepare emergency response plan
- [ ] Test on multiple testnets
- [ ] Conduct internal code review
- [ ] Document all admin keys and procedures
- [ ] Set up multi-sig for admin operations

---

## Next Contract Implementations

After governance is complete:
1. **Treasury Contract** - See `contracts/treasury/`
2. **Staking Contract** - See `contracts/staking/`
3. **Omnichain Bridge** - See `contracts/bridge/`
4. **Membership NFT** - See `contracts/nft/`

---

## Resources

- OpenZeppelin Contracts: https://docs.openzeppelin.com/contracts/
- Hardhat Documentation: https://hardhat.org/docs
- LayerZero Docs: https://docs.layerzero.network/
- Ethereum Security Best Practices: https://consensys.github.io/smart-contract-best-practices/

---

## Support

For questions or issues:
1. Check the `/docs` folder for detailed documentation
2. Review test files for usage examples
3. Consult OpenZeppelin documentation
4. Join the development Discord/Telegram

---

*Guide Version*: 1.0  
*Last Updated*: 2026-02-07
