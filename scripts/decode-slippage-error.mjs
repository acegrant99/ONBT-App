import hre from "hardhat";
const { ethers } = hre;

const CONTRACT_ADDRESS = "0xf7dc0593D982dA36827763AA1cB4b9B6F2d2201d";
const ARBITRUM_EID = 30110;

async function main() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║     Decoding SlippageExceeded Error from quoteSend      ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
  
  const [signer] = await ethers.getSigners();
  
  const oft = await ethers.getContractAt("OmnichainNabatOFT", CONTRACT_ADDRESS);
  
  // Get contract details
  const decimals = await oft.decimals();
  const sharedDecimals = await oft.sharedDecimals();
  const decimalConversionRate = await oft.decimalConversionRate();
  
  console.log("📊 Token Configuration:");
  console.log(`  Local Decimals: ${decimals}`);
  console.log(`  Shared Decimals: ${sharedDecimals}`);
  console.log(`  Conversion Rate: ${decimalConversionRate}`);
  console.log();
  
  // Test progressively smaller amounts
  const testAmounts = [
    { name: "1000 ONBT", value: ethers.parseUnits("1000", 18) },
    { name: "100 ONBT", value: ethers.parseUnits("100", 18) },
    { name: "10 ONBT", value: ethers.parseUnits("10", 18) },
    { name: "1 ONBT", value: ethers.parseUnits("1", 18) },
    { name: "0.1 ONBT", value: ethers.parseUnits("0.1", 18) },
    { name: "0.01 ONBT", value: ethers.parseUnits("0.01", 18) },
    { name: "0.001 ONBT", value: ethers.parseUnits("0.001", 18) },
    { name: "0.0001 ONBT", value: ethers.parseUnits("0.0001", 18) },
    { name: "0.00001 ONBT", value: ethers.parseUnits("0.00001", 18) },
    { name: "0.000001 ONBT (1 shared decimal)", value: ethers.parseUnits("0.000001", 18) },
    { name: "0.0000001 ONBT (below shared)", value: ethers.parseUnits("0.0000001", 18) },
  ];
  
  console.log("Testing quoteSend with different amounts:\n");
  
  for (const test of testAmounts) {
    const amountLD = test.value;
    const minAmountLD = amountLD; // No slippage tolerance
    
    // Remove dust manually to see what amount would actually be sent
    const amountAfterDust = (amountLD / decimalConversionRate) * decimalConversionRate;
    
    // Convert to shared decimals
    const amountSD = amountAfterDust / decimalConversionRate;
    
    console.log(`\n🔍 Testing: ${test.name}`);
    console.log(`  Input amount: ${ethers.formatUnits(amountLD, 18)} ONBT`);
    console.log(`  After dust removal: ${ethers.formatUnits(amountAfterDust, 18)} ONBT`);
    console.log(`  In shared decimals: ${amountSD}`);
    console.log(`  Min amount: ${ethers.formatUnits(minAmountLD, 18)} ONBT`);
    
    // Check if dust removal would cause slippage
    if (amountAfterDust < minAmountLD) {
      console.log(`  ❌ Would fail: dust removed (${ethers.formatUnits(amountAfterDust, 18)}) < min (${ethers.formatUnits(minAmountLD, 18)})`);
      console.log(`  💡 Lost in dust: ${ethers.formatUnits(amountLD - amountAfterDust, 18)} ONBT`);
      continue;
    }
    
    const sendParam = {
      dstEid: ARBITRUM_EID,
      to: ethers.zeroPadValue(signer.address, 32),
      amountLD: amountLD,
      minAmountLD: minAmountLD,
      extraOptions: "0x",
      composeMsg: "0x",
      oftCmd: "0x"
    };
    
    try {
      const quote = await oft.quoteSend(sendParam, false);
      console.log(`  ✅ Quote succeeded!`);
      console.log(`  Native fee: ${ethers.formatEther(quote.nativeFee)} ETH`);
      console.log(`  LZ token fee: ${quote.lzTokenFee}`);
      break; // If one succeeds, we found the minimum
    } catch (error) {
      if (error.data) {
        const errorSelector = error.data.slice(0, 10);
        console.log(`  ❌ Error selector: ${errorSelector}`);
        
        if (errorSelector === "0x6780cfaf") {
          // SlippageExceeded(uint256,uint256)
          try {
            const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
              ['uint256', 'uint256'],
              '0x' + error.data.slice(10)
            );
            console.log(`  📉 SlippageExceeded decoded:`);
            console.log(`    amountReceivedLD: ${ethers.formatUnits(decoded[0], 18)} ONBT (${decoded[0]})`);
            console.log(`    minAmountLD: ${ethers.formatUnits(decoded[1], 18)} ONBT (${decoded[1]})`);
            console.log(`    Difference: ${ethers.formatUnits(decoded[1] - decoded[0], 18)} ONBT`);
          } catch (e) {
            console.log(`  Could not decode error data`);
          }
        } else {
          console.log(`  Unknown error: ${error.message}`);
        }
      } else {
        console.log(`  ❌ Error: ${error.message}`);
      }
    }
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("💡 FINDINGS:");
  console.log("=".repeat(60));
  console.log("\nThe slippage error occurs because amounts below the");
  console.log("decimal conversion rate lose precision during dust removal.");
  console.log("\nWith conversion rate 1e12:");
  console.log("  - Minimum transferable: 0.000001 ONBT (1 shared decimal)");
  console.log("  - Amounts below this are rounded to 0");
  console.log("\nSolution: Use amounts >= 0.000001 ONBT or adjust minAmountLD");
  console.log("to account for dust removal.\n");
}

main().catch(console.error);
