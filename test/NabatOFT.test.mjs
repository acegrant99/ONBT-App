import { expect } from "chai";
import hre from "hardhat";
const { ethers } = hre;

describe("NabatOFT", function () {
  let nabatOFT;
  let owner;
  let addr1;
  let addr2;
  const mockEndpoint = "0x1234567890123456789012345678901234567890";

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const NabatOFT = await ethers.getContractFactory("NabatOFT");
    nabatOFT = await NabatOFT.deploy(
      "Nabat Token",
      "NABT",
      8,
      mockEndpoint
    );
    await nabatOFT.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await nabatOFT.owner()).to.equal(owner.address);
    });

    it("Should have correct name and symbol", async function () {
      expect(await nabatOFT.name()).to.equal("Nabat Token");
      expect(await nabatOFT.symbol()).to.equal("NABT");
    });

    it("Should have correct decimals", async function () {
      expect(await nabatOFT.decimals()).to.equal(18); // ERC20 decimals, not shared decimals
    });

    it("Should have zero total supply initially", async function () {
      expect(await nabatOFT.totalSupply()).to.equal(0);
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint tokens", async function () {
      const amount = ethers.parseEther("1000");
      await nabatOFT.mint(addr1.address, amount);
      expect(await nabatOFT.balanceOf(addr1.address)).to.equal(amount);
    });

    it("Should increase total supply when minting", async function () {
      const amount = ethers.parseEther("1000");
      await nabatOFT.mint(addr1.address, amount);
      expect(await nabatOFT.totalSupply()).to.equal(amount);
    });

    it("Should revert when non-owner tries to mint", async function () {
      const amount = ethers.parseEther("1000");
      await expect(
        nabatOFT.connect(addr1).mint(addr2.address, amount)
      ).to.be.reverted;
    });

    it("Should mint multiple times", async function () {
      const amount1 = ethers.parseEther("1000");
      const amount2 = ethers.parseEther("500");
      
      await nabatOFT.mint(addr1.address, amount1);
      await nabatOFT.mint(addr1.address, amount2);
      
      expect(await nabatOFT.balanceOf(addr1.address)).to.equal(amount1 + amount2);
    });
  });

  describe("Burning", function () {
    beforeEach(async function () {
      const amount = ethers.parseEther("1000");
      await nabatOFT.mint(addr1.address, amount);
    });

    it("Should allow owner to burn tokens", async function () {
      const burnAmount = ethers.parseEther("500");
      await nabatOFT.burn(addr1.address, burnAmount);
      expect(await nabatOFT.balanceOf(addr1.address)).to.equal(
        ethers.parseEther("500")
      );
    });

    it("Should decrease total supply when burning", async function () {
      const burnAmount = ethers.parseEther("500");
      const initialSupply = await nabatOFT.totalSupply();
      await nabatOFT.burn(addr1.address, burnAmount);
      expect(await nabatOFT.totalSupply()).to.equal(initialSupply - burnAmount);
    });

    it("Should revert when non-owner tries to burn", async function () {
      const burnAmount = ethers.parseEther("500");
      await expect(
        nabatOFT.connect(addr1).burn(addr1.address, burnAmount)
      ).to.be.reverted;
    });

    it("Should revert when burning more than balance", async function () {
      const burnAmount = ethers.parseEther("2000");
      await expect(
        nabatOFT.burn(addr1.address, burnAmount)
      ).to.be.reverted;
    });
  });

  describe("Transfers", function () {
    beforeEach(async function () {
      const amount = ethers.parseEther("1000");
      await nabatOFT.mint(addr1.address, amount);
    });

    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseEther("100");
      await nabatOFT.connect(addr1).transfer(addr2.address, transferAmount);
      expect(await nabatOFT.balanceOf(addr2.address)).to.equal(transferAmount);
    });

    it("Should update balances after transfer", async function () {
      const transferAmount = ethers.parseEther("100");
      await nabatOFT.connect(addr1).transfer(addr2.address, transferAmount);
      expect(await nabatOFT.balanceOf(addr1.address)).to.equal(
        ethers.parseEther("900")
      );
    });

    it("Should revert when transferring more than balance", async function () {
      const transferAmount = ethers.parseEther("2000");
      await expect(
        nabatOFT.connect(addr1).transfer(addr2.address, transferAmount)
      ).to.be.reverted;
    });
  });

  describe("Allowances", function () {
    beforeEach(async function () {
      const amount = ethers.parseEther("1000");
      await nabatOFT.mint(addr1.address, amount);
    });

    it("Should approve tokens for transfer", async function () {
      const approveAmount = ethers.parseEther("100");
      await nabatOFT.connect(addr1).approve(addr2.address, approveAmount);
      expect(await nabatOFT.allowance(addr1.address, addr2.address)).to.equal(
        approveAmount
      );
    });

    it("Should transfer tokens using allowance", async function () {
      const approveAmount = ethers.parseEther("100");
      await nabatOFT.connect(addr1).approve(addr2.address, approveAmount);
      await nabatOFT.connect(addr2).transferFrom(
        addr1.address,
        addr2.address,
        approveAmount
      );
      expect(await nabatOFT.balanceOf(addr2.address)).to.equal(approveAmount);
    });
  });
});
