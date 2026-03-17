param(
    [string]$BaseOnbtAddress = "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5",

    [string]$ArbitrumOnbtAddress = "0x169aC761Ebb210B5A93B68B44DA394776a7B230C",

    [string]$BaseNetwork = "base",
    [string]$ArbitrumNetwork = "arbitrum",

    [switch]$SkipDeploy,
    [switch]$SkipPeers,
    [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Test-Address {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Address,
        [Parameter(Mandatory = $true)]
        [string]$Name
    )

    if ($Address -notmatch '^0x[a-fA-F0-9]{40}$') {
        throw "$Name must be a valid 20-byte hex address (0x...). Received: $Address"
    }
}

function Invoke-HardhatRun {
    param(
        [Parameter(Mandatory = $true)]
        [string]$ScriptPath,
        [Parameter(Mandatory = $true)]
        [string]$Network
    )

    $cmd = "npx hardhat run $ScriptPath --network $Network"
    Write-Host "`n> $cmd" -ForegroundColor Cyan

    if ($DryRun) {
        return
    }

    & npx hardhat run $ScriptPath --network $Network
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed with exit code ${LASTEXITCODE}: $cmd"
    }
}

$originalEnv = @{
    IS_HUB_CHAIN      = $env:IS_HUB_CHAIN
    ONBT_TOKEN_ADDRESS = $env:ONBT_TOKEN_ADDRESS
    NETWORK           = $env:NETWORK
}

try {
    Test-Address -Address $BaseOnbtAddress -Name "BaseOnbtAddress"
    Test-Address -Address $ArbitrumOnbtAddress -Name "ArbitrumOnbtAddress"

    Write-Host "============================================================" -ForegroundColor Yellow
    Write-Host "ONBT Unified Base + Arbitrum Deployment" -ForegroundColor Yellow
    Write-Host "============================================================`n" -ForegroundColor Yellow

    Write-Host "Configuration:" -ForegroundColor Green
    Write-Host "- Base Network: $BaseNetwork"
    Write-Host "- Arbitrum Network: $ArbitrumNetwork"
    Write-Host "- Base ONBT: $BaseOnbtAddress"
    Write-Host "- Arbitrum ONBT: $ArbitrumOnbtAddress"
    Write-Host "- Skip Deploy: $SkipDeploy"
    Write-Host "- Skip Peers: $SkipPeers"
    Write-Host "- Dry Run: $DryRun`n"

    if (-not $SkipDeploy) {
        Write-Host "[1/4] Deploying hub contracts on Base..." -ForegroundColor Green
        $env:IS_HUB_CHAIN = "true"
        $env:ONBT_TOKEN_ADDRESS = $BaseOnbtAddress
        Invoke-HardhatRun -ScriptPath "scripts/deploy-lzv2-ecosystem.mjs" -Network $BaseNetwork

        Write-Host "[2/4] Deploying spoke contracts on Arbitrum..." -ForegroundColor Green
        $env:IS_HUB_CHAIN = "false"
        $env:ONBT_TOKEN_ADDRESS = $ArbitrumOnbtAddress
        Invoke-HardhatRun -ScriptPath "scripts/deploy-lzv2-ecosystem.mjs" -Network $ArbitrumNetwork
    } else {
        Write-Host "Skipping deployment steps." -ForegroundColor DarkYellow
    }

    if (-not $SkipPeers) {
        Write-Host "`n[3/4] Configuring peers on Base..." -ForegroundColor Green
        Write-Host "Ensure scripts/configurePeers.mjs CONTRACT_ADDRESSES are filled before this step." -ForegroundColor DarkYellow
        $env:NETWORK = $BaseNetwork
        Invoke-HardhatRun -ScriptPath "scripts/configurePeers.mjs" -Network $BaseNetwork

        Write-Host "[4/4] Configuring peers on Arbitrum..." -ForegroundColor Green
        $env:NETWORK = $ArbitrumNetwork
        Invoke-HardhatRun -ScriptPath "scripts/configurePeers.mjs" -Network $ArbitrumNetwork
    } else {
        Write-Host "Skipping peer configuration steps." -ForegroundColor DarkYellow
    }

    Write-Host "`nCompleted unified flow." -ForegroundColor Green
} finally {
    $env:IS_HUB_CHAIN = $originalEnv.IS_HUB_CHAIN
    $env:ONBT_TOKEN_ADDRESS = $originalEnv.ONBT_TOKEN_ADDRESS
    $env:NETWORK = $originalEnv.NETWORK
}
