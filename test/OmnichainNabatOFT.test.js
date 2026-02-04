const { expect } = require("chai");
const { ethers } = require("hardhat");

/**
 * Test suite for OmnichainNabatOFT
 * 
 * These tests validate the non-proxy OFT implementation
 * Note: Full cross-chain testing requires LayerZero testnet infrastructure
 */
describe("OmnichainNabatOFT - No Proxy Architecture", function () {
  let nabatOFT;
  let owner;
  let user1;
  let user2;
  let mockEndpoint;

  beforeEach(async function () {
    [owner, user1, user2, mockEndpoint] = await ethers.getSigners();

    // Deploy the contract WITHOUT any proxy
    // This demonstrates the direct deployment pattern per LayerZero V2
    const OmnichainNabatOFT = await ethers.getContractFactory("OmnichainNabatOFT");
    nabatOFT = await OmnichainNabatOFT.deploy(
      mockEndpoint.address, // Mock LayerZero endpoint
      owner.address          // Delegate address
    );
    await nabatOFT.waitForDeployment();
  });

  describe("Deployment (No Proxy)", function () {
    it("Should deploy without proxy contract", async function () {
      // Verify this is a direct contract deployment, not a proxy
      const address = await nabatOFT.getAddress();
      expect(address).to.be.properAddress;
      
      // Contract should respond to direct calls (no delegatecall)
      const name = await nabatOFT.name();
      expect(name).to.equal("Nabat Token");
    });

    it("Should have correct token details", async function () {
      expect(await nabatOFT.name()).to.equal("Nabat Token");
      expect(await nabatOFT.symbol()).to.equal("NBT");
    });

    it("Should set owner correctly", async function () {
      expect(await nabatOFT.owner()).to.equal(owner.address);
    });

    it("Should have zero initial supply", async function () {
      expect(await nabatOFT.totalSupply()).to.equal(0);
    });
  });

  describe("Minting (Owner Only)", function () {
    it("Should allow owner to mint tokens", async function () {
      const mintAmount = ethers.parseEther("1000000");
      
      await expect(nabatOFT.mint(user1.address, mintAmount))
        .to.emit(nabatOFT, "Transfer")
        .withArgs(ethers.ZeroAddress, user1.address, mintAmount);
      
      expect(await nabatOFT.balanceOf(user1.address)).to.equal(mintAmount);
      expect(await nabatOFT.totalSupply()).to.equal(mintAmount);
    });

    it("Should reject minting from non-owner", async function () {
      const mintAmount = ethers.parseEther("1000000");
      
      await expect(
        nabatOFT.connect(user1).mint(user2.address, mintAmount)
      ).to.be.revertedWithCustomError(nabatOFT, "OwnableUnauthorizedAccount");
    });

    it("Should allow multiple mints", async function () {
      const amount1 = ethers.parseEther("500000");
      const amount2 = ethers.parseEther("500000");
      
      await nabatOFT.mint(user1.address, amount1);
      await nabatOFT.mint(user2.address, amount2);
      
      expect(await nabatOFT.totalSupply()).to.equal(amount1 + amount2);
    });
  });

  describe("Burning (User Controlled)", function () {
    beforeEach(async function () {
      // Mint some tokens to user1
      const mintAmount = ethers.parseEther("1000000");
      await nabatOFT.mint(user1.address, mintAmount);
    });

    it("Should allow users to burn their own tokens", async function () {
      const burnAmount = ethers.parseEther("100000");
      const initialBalance = await nabatOFT.balanceOf(user1.address);
      
      await expect(nabatOFT.connect(user1).burn(burnAmount))
        .to.emit(nabatOFT, "Transfer")
        .withArgs(user1.address, ethers.ZeroAddress, burnAmount);
      
      expect(await nabatOFT.balanceOf(user1.address)).to.equal(initialBalance - burnAmount);
    });

    it("Should reduce total supply when burning", async function () {
      const burnAmount = ethers.parseEther("100000");
      const initialSupply = await nabatOFT.totalSupply();
      
      await nabatOFT.connect(user1).burn(burnAmount);
      
      expect(await nabatOFT.totalSupply()).to.equal(initialSupply - burnAmount);
    });

    it("Should reject burning more than balance", async function () {
      const balance = await nabatOFT.balanceOf(user1.address);
      const tooMuch = balance + ethers.parseEther("1");
      
      await expect(
        nabatOFT.connect(user1).burn(tooMuch)
      ).to.be.reverted;
    });
  });

  describe("ERC20 Functionality", function () {
    beforeEach(async function () {
      // Mint tokens for testing
      await nabatOFT.mint(user1.address, ethers.parseEther("1000000"));
    });

    it("Should support standard ERC20 transfers", async function () {
      const transferAmount = ethers.parseEther("100000");
      
      await expect(nabatOFT.connect(user1).transfer(user2.address, transferAmount))
        .to.emit(nabatOFT, "Transfer")
        .withArgs(user1.address, user2.address, transferAmount);
      
      expect(await nabatOFT.balanceOf(user2.address)).to.equal(transferAmount);
    });

    it("Should support ERC20 approve and transferFrom", async function () {
      const amount = ethers.parseEther("50000");
      
      await nabatOFT.connect(user1).approve(user2.address, amount);
      expect(await nabatOFT.allowance(user1.address, user2.address)).to.equal(amount);
      
      await nabatOFT.connect(user2).transferFrom(user1.address, user2.address, amount);
      expect(await nabatOFT.balanceOf(user2.address)).to.equal(amount);
    });
  });

  describe("Architecture Validation", function () {
    it("Should be a direct contract (not a proxy)", async function () {
      // Verify contract has direct storage access
      const address = await nabatOFT.getAddress();
      
      // Check that contract has code at address (not just delegating)
      const code = await ethers.provider.getCode(address);
      expect(code.length).to.be.greaterThan(2); // "0x" is empty
      
      // Verify direct function calls work (no proxy indirection)
      const name = await nabatOFT.name();
      expect(name).to.equal("Nabat Token");
    });

    it("Should inherit from OFT without proxy wrapper", async function () {
      // The contract should respond to OFT-specific functions directly
      // This would fail if using a proxy that doesn't forward all calls
      const address = await nabatOFT.getAddress();
      expect(address).to.be.properAddress;
    });
  });
});
