import { expect } from "chai";
import hre from "hardhat";
const { ethers } = hre;

describe("OmnichainNabatOFT (ONBT)", function () {
  let onbt;
  let owner;
  let addr1;
  let addr2;
  let lzEndpoint;
  
  const TOTAL_SUPPLY = ethers.parseEther("1000000000"); // 1 billion
  const SHARED_DECIMALS = 8;
  const LOGO_URI = "ipfs://QmTest123";
  const WEBSITE = "https://nabat.finance";
  const DESCRIPTION = "Immutable omnichain token with 1B supply";
  const SOCIAL_LINKS = JSON.stringify({
    twitter: "https://twitter.com/nabatfinance",
    telegram: "https://t.me/nabatfinance"
  });

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    // Mock LayerZero endpoint (for testing)
    lzEndpoint = "0x0000000000000000000000000000000000000001";
    
    // Deploy OmnichainNabatOFT
    const OmnichainNabatOFT = await ethers.getContractFactory("OmnichainNabatOFT");
    onbt = await OmnichainNabatOFT.deploy(
      SHARED_DECIMALS,
      lzEndpoint,
      TOTAL_SUPPLY,
      LOGO_URI,
      WEBSITE,
      DESCRIPTION,
      SOCIAL_LINKS
    );
    await onbt.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await onbt.name()).to.equal("ONabat");
      expect(await onbt.symbol()).to.equal("ONBT");
    });

    it("Should mint total supply to deployer", async function () {
      const ownerBalance = await onbt.balanceOf(owner.address);
      expect(ownerBalance).to.equal(TOTAL_SUPPLY);
    });

    it("Should set correct total supply", async function () {
      expect(await onbt.totalSupply()).to.equal(TOTAL_SUPPLY);
      expect(await onbt.TOTAL_SUPPLY()).to.equal(TOTAL_SUPPLY);
    });

    it("Should set correct owner", async function () {
      expect(await onbt.owner()).to.equal(owner.address);
    });

    it("Should have 18 decimals", async function () {
      expect(await onbt.decimals()).to.equal(18);
    });

    it("Should record deployment time", async function () {
      const deploymentTime = await onbt.DEPLOYMENT_TIME();
      expect(deploymentTime).to.be.gt(0);
    });
  });

  describe("Branding", function () {
    it("Should set initial branding correctly", async function () {
      expect(await onbt.logoURI()).to.equal(LOGO_URI);
      expect(await onbt.website()).to.equal(WEBSITE);
      expect(await onbt.description()).to.equal(DESCRIPTION);
      expect(await onbt.socialLinks()).to.equal(SOCIAL_LINKS);
    });

    it("Should return branding info", async function () {
      const branding = await onbt.getBrandingInfo();
      expect(branding.logo).to.equal(LOGO_URI);
      expect(branding.site).to.equal(WEBSITE);
      expect(branding.desc).to.equal(DESCRIPTION);
      expect(branding.social).to.equal(SOCIAL_LINKS);
    });

    it("Should allow owner to update branding", async function () {
      const newLogoURI = "ipfs://QmNewLogo";
      const newWebsite = "https://newsite.com";
      const newDescription = "Updated description";
      const newSocialLinks = JSON.stringify({ twitter: "https://twitter.com/new" });

      await onbt.updateBranding(newLogoURI, newWebsite, newDescription, newSocialLinks);

      expect(await onbt.logoURI()).to.equal(newLogoURI);
      expect(await onbt.website()).to.equal(newWebsite);
      expect(await onbt.description()).to.equal(newDescription);
      expect(await onbt.socialLinks()).to.equal(newSocialLinks);
    });

    it("Should emit BrandingUpdated event", async function () {
      const newLogoURI = "ipfs://QmNewLogo";
      const newWebsite = "https://newsite.com";
      const newDescription = "Updated description";
      const newSocialLinks = JSON.stringify({ twitter: "https://twitter.com/new" });

      await expect(onbt.updateBranding(newLogoURI, newWebsite, newDescription, newSocialLinks))
        .to.emit(onbt, "BrandingUpdated")
        .withArgs(newLogoURI, newWebsite, newDescription, newSocialLinks);
    });

    it("Should not allow non-owner to update branding", async function () {
      const newLogoURI = "ipfs://QmNewLogo";
      const newWebsite = "https://newsite.com";
      const newDescription = "Updated description";
      const newSocialLinks = JSON.stringify({ twitter: "https://twitter.com/new" });

      await expect(
        onbt.connect(addr1).updateBranding(newLogoURI, newWebsite, newDescription, newSocialLinks)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should return tokenURI with metadata", async function () {
      const uri = await onbt.tokenURI();
      expect(uri).to.include("Omnichain Nabat");
      expect(uri).to.include("ONBT");
      expect(uri).to.include(LOGO_URI);
      expect(uri).to.include(WEBSITE);
      expect(uri).to.include(DESCRIPTION);
    });
  });

  describe("Immutability", function () {
    it("Should confirm immutable supply", async function () {
      expect(await onbt.hasImmutableSupply()).to.equal(true);
    });

    it("Should not have mint function", async function () {
      // Trying to call mint should fail because it doesn't exist
      expect(onbt.mint).to.be.undefined;
    });

    it("Should not have burn function", async function () {
      // Trying to call burn should fail because it doesn't exist
      expect(onbt.burn).to.be.undefined;
    });

    it("Should maintain constant total supply", async function () {
      const initialSupply = await onbt.totalSupply();
      
      // Transfer some tokens
      await onbt.transfer(addr1.address, ethers.parseEther("1000"));
      
      // Total supply should remain the same
      expect(await onbt.totalSupply()).to.equal(initialSupply);
    });
  });

  describe("Token Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseEther("1000");
      
      // Transfer from owner to addr1
      await onbt.transfer(addr1.address, transferAmount);
      expect(await onbt.balanceOf(addr1.address)).to.equal(transferAmount);
      
      // Transfer from addr1 to addr2
      await onbt.connect(addr1).transfer(addr2.address, transferAmount);
      expect(await onbt.balanceOf(addr2.address)).to.equal(transferAmount);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialBalance = await onbt.balanceOf(addr1.address);
      
      await expect(
        onbt.connect(addr1).transfer(owner.address, ethers.parseEther("1"))
      ).to.be.reverted;
    });

    it("Should update balances after transfers", async function () {
      const transferAmount = ethers.parseEther("1000");
      const initialOwnerBalance = await onbt.balanceOf(owner.address);
      
      await onbt.transfer(addr1.address, transferAmount);
      
      expect(await onbt.balanceOf(owner.address)).to.equal(
        initialOwnerBalance - transferAmount
      );
      expect(await onbt.balanceOf(addr1.address)).to.equal(transferAmount);
    });
  });

  describe("Utility Functions", function () {
    it("Should identify source chain", async function () {
      // On deployment chain, all supply is present
      expect(await onbt.isSourceChain()).to.equal(true);
    });

    it("Should calculate age correctly", async function () {
      const age = await onbt.getAge();
      expect(age).to.be.gte(0);
      
      // Wait a bit and check age increased
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newAge = await onbt.getAge();
      expect(newAge).to.be.gt(age);
    });
  });

  describe("ERC20 Compliance", function () {
    it("Should support approve and transferFrom", async function () {
      const transferAmount = ethers.parseEther("1000");
      
      // Owner approves addr1 to spend tokens
      await onbt.approve(addr1.address, transferAmount);
      expect(await onbt.allowance(owner.address, addr1.address)).to.equal(transferAmount);
      
      // addr1 transfers from owner to addr2
      await onbt.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount);
      expect(await onbt.balanceOf(addr2.address)).to.equal(transferAmount);
    });

    it("Should emit Transfer events", async function () {
      const transferAmount = ethers.parseEther("1000");
      
      await expect(onbt.transfer(addr1.address, transferAmount))
        .to.emit(onbt, "Transfer")
        .withArgs(owner.address, addr1.address, transferAmount);
    });

    it("Should emit Approval events", async function () {
      const approvalAmount = ethers.parseEther("1000");
      
      await expect(onbt.approve(addr1.address, approvalAmount))
        .to.emit(onbt, "Approval")
        .withArgs(owner.address, addr1.address, approvalAmount);
    });
  });
});
