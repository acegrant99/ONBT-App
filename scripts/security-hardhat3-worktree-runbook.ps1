$ErrorActionPreference = 'Stop'

$Root = 'C:\ONBT-App'
$Worktree = 'C:\ONBT-App-hh3'
$Branch = 'copilot/hh3-migration-worktree'

Write-Host "[HH3] Ensuring isolated worktree exists..."
Push-Location $Root
try {
    $existing = git worktree list
    if ($existing -notmatch [regex]::Escape($Worktree)) {
        git worktree add $Worktree -b $Branch
    }
} finally {
    Pop-Location
}

Write-Host "[HH3] Repairing worktree package.json from root copy..."
Copy-Item "$Root\package.json" "$Worktree\package.json" -Force

Push-Location $Worktree
try {
    Write-Host "[HH3] Switching worktree package to ESM..."
    npm pkg set type=module

    Write-Host "[HH3] Installing HH3 toolchain..."
    npm install --legacy-peer-deps hardhat@^3.1.9 @nomicfoundation/hardhat-ethers@^4.0.4 @nomicfoundation/hardhat-verify@^3.0.10

    Write-Host "[HH3] Installing LayerZero solidity examples..."
    npm install --legacy-peer-deps @layerzerolabs/solidity-examples@latest

    Write-Host "[HH3] Running strict HH3 compile..."
    npx hardhat compile --config hardhat3.strict.config.cjs
}
finally {
    Pop-Location
}

Write-Host "[HH3] Runbook complete."
