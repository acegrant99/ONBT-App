import fs from "fs";

const artifactPath = "artifacts/contracts/token/OmnichainNabatOFT.sol/OmnichainNabatOFT.json";
const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

const deployedSize = (artifact.deployedBytecode.length - 2) / 2;

console.log("Deployed Size:", deployedSize, "bytes");
console.log("Max Allowed:  ", 24576, "bytes");
console.log("Over Limit:   ", deployedSize - 24576, "bytes");
console.log("\nStatus:", deployedSize <= 24576 ? "✅ OK" : "❌ TOO LARGE");
