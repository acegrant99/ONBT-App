import fs from "fs";
import path from "path";
import ethersPkg from "ethers";

const id = ethersPkg.id || ethersPkg.utils?.id;

const target = (process.argv[2] || "0x6780cfaf").toLowerCase();
const root = process.cwd();
let found = false;

const skipDirs = new Set([
  "node_modules",
  ".git",
  "artifacts",
  "cache",
  "coverage",
  "dist",
  "build",
]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (skipDirs.has(entry.name)) continue;
      walk(fullPath);
      if (found) return;
    } else if (entry.isFile() && fullPath.endsWith(".sol")) {
      const text = fs.readFileSync(fullPath, "utf8");
      const re = /error\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)/g;
      let match;
      while ((match = re.exec(text))) {
        const signature = `${match[1]}(${match[2].replace(/\s+/g, "")})`;
        const selector = id(signature).slice(0, 10);
        if (selector.toLowerCase() === target) {
          console.log("MATCH", signature, "in", fullPath);
          found = true;
          return;
        }
      }
    }
  }
}

walk(root);
if (!found) {
  console.log("No match in workspace sources");
}
