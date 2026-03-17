# Destination Chain Deployment Helper
# Windows PowerShell script to deploy ONBT ecosystem to a destination chain
#
# Usage:
#   .\scripts\Deploy-Destination.ps1 -Network <network> [-Testnet]
#
# Supported networks: ethereum, polygon, arbitrum, optimism, bsc, avalanche
#
# Examples:
#   .\scripts\Deploy-Destination.ps1 -Network ethereum      # Deploy to Ethereum mainnet
#   .\scripts\Deploy-Destination.ps1 -Network polygon       # Deploy to Polygon mainnet
#   .\scripts\Deploy-Destination.ps1 -Network ethereum -Testnet  # Deploy to Ethereum Sepolia

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("ethereum", "polygon", "arbitrum", "optimism", "bsc", "avalanche")]
    [string]$Network,
    
    [switch]$Testnet
)

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     ONBT Destination Chain Deployment (Non-Hub Chain)     ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Get current directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = Split-Path -Parent $scriptDir

# Load .env file
$envFile = Join-Path $rootDir ".env"
if (-not (Test-Path $envFile)) {
    Write-Host "❌ Error: .env file not found at $envFile" -ForegroundColor Red
    Write-Host "Please create .env from .env.example" -ForegroundColor Yellow
    exit 1
}

# Parse .env file
$env_vars = @{}
Get-Content $envFile | Where-Object { $_ -match "^[^#]" -and $_ -match "=" } | ForEach-Object {
    $key, $value = $_ -split "=", 2
    $env_vars[$key.Trim()] = $value.Trim().Trim('"')
}

# Validate required variables
if (-not $env_vars["PRIVATE_KEY"]) {
    Write-Host "❌ Error: PRIVATE_KEY not set in .env file" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Configuration:" -ForegroundColor Green
Write-Host "   Network: $Network ($(if ($Testnet) { 'Testnet' } else { 'Mainnet' }))"
Write-Host "   Deployment Type: destination"
Write-Host "   Hub Chain: false`n"

# Set environment variables for the deployment
$env:PRIVATE_KEY = $env_vars["PRIVATE_KEY"]
$env:IS_HUB_CHAIN = "false"

# Set additional env vars from .env if present
if ($env_vars["BASE_RPC_URL"]) {
    $env:BASE_RPC_URL = $env_vars["BASE_RPC_URL"]
}
if ($env_vars["BASE_SEPOLIA_RPC_URL"]) {
    $env:BASE_SEPOLIA_RPC_URL = $env_vars["BASE_SEPOLIA_RPC_URL"]
}
if ($env_vars["ONBT_LOGO_URI"]) {
    $env:ONBT_LOGO_URI = $env_vars["ONBT_LOGO_URI"]
}

Write-Host "📜 Running deployment..." -ForegroundColor Cyan
Write-Host "   npx hardhat run scripts/deployFullEcosystem.mjs --network $Network`n"

# Run hardhat deployment
try {
    Push-Location $rootDir
    & npx hardhat run scripts/deployFullEcosystem.mjs --network $Network
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✨ Deployment completed successfully!" -ForegroundColor Green
        Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
        Write-Host "   1. Save the contract addresses displayed above"
        Write-Host "   2. Update scripts/configurePeers.mjs with all deployed addresses"
        Write-Host "   3. Run peer configuration on all chains"
    } else {
        Write-Host "`n❌ Deployment failed!" -ForegroundColor Red
        exit 1
    }
} finally {
    Pop-Location
}
