import fs from "fs";

const artifactPath = "./artifacts/contracts/token/OmnichainNabatOFT.sol/OmnichainNabatOFT.json";

try {
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const abi = artifact.abi;

  console.log("=== OFT Contract ABI Analysis ===\n");

  // Find library-related methods
  const libraryMethods = abi.filter(
    (item) =>
      item.type === "function" &&
      (item.name?.toLowerCase().includes("library") ||
        item.name?.toLowerCase().includes("sendlib") ||
        item.name?.toLowerCase().includes("receivelib"))
  );

  console.log("Library-related methods:");
  libraryMethods.forEach((method) => {
    console.log(`  - ${method.name}`);
    console.log(`    Inputs: ${JSON.stringify(method.inputs)}`);
    console.log(`    State mutability: ${method.stateMutability}`);
  });

  // Find ownership/permission methods
  const ownerMethods = abi.filter(
    (item) =>
      item.type === "function" &&
      (item.name?.toLowerCase().includes("owner") ||
        item.name?.toLowerCase().includes("manager") ||
        item.name?.toLowerCase().includes("admin"))
  );

  console.log("\nOwner/Manager methods:");
  ownerMethods.forEach((method) => {
    console.log(`  - ${method.name}`);
  });

  // Check for initialize or setup methods
  const setupMethods = abi.filter(
    (item) =>
      item.type === "function" &&
      (item.name?.toLowerCase().includes("init") ||
        item.name?.toLowerCase().includes("setup"))
  );

  console.log("\nInitialize/Setup methods:");
  setupMethods.forEach((method) => {
    console.log(`  - ${method.name}`);
  });
} catch (error) {
  console.error("Error reading artifact:", error.message);
}
