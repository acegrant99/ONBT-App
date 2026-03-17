# Base Mainnet Deployment Helper
# Windows PowerShell script to deploy ONBT ecosystem to Base mainnet (hub chain)
#
# Usage:
#   .\scripts\Deploy-BaseHub.ps1 [-Testnet]
#
# Examples:
#   .\scripts\Deploy-BaseHub.ps1              # Deploy to Base mainnet
#   .\scripts\Deploy-BaseHub.ps1 -Testnet     # Deploy to Base Sepolia testnet

param(
    [switch]$Testnet
)

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║       ONBT Base Mainnet Deployment (Hub Chain)             ║" -ForegroundColor Cyan
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
$requiredVars = @("PRIVATE_KEY", "BASE_RPC_URL")
foreach ($var in $requiredVars) {
    if (-not $env_vars[$var]) {
        Write-Host "❌ Error: $var not set in .env file" -ForegroundColor Red
        exit 1
    }
}

$network = $Testnet ? "baseSepolia" : "base"
$baseRpcUrl = $Testnet ? $env_vars["BASE_SEPOLIA_RPC_URL"] : $env_vars["BASE_RPC_URL"]

if (-not $baseRpcUrl) {
    Write-Host "❌ Error: $(($Testnet ? 'BASE_SEPOLIA_RPC_URL' : 'BASE_RPC_URL')) not set in .env" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Environment Validation:" -ForegroundColor Green
Write-Host "   Network: $network ($(if ($Testnet) { 'Testnet' } else { 'Mainnet' }))"
Write-Host "   RPC URL: $($baseRpcUrl.Substring(0, 40))..."
Write-Host "   Deployer: $($env_vars['PRIVATE_KEY'].Substring(0, 3))...$($env_vars['PRIVATE_KEY'].Substring(-3))"
Write-Host "   Hub Chain: true`n"

# Set environment variables for the deployment
$env:PRIVATE_KEY = $env_vars["PRIVATE_KEY"]
$env:BASE_RPC_URL = $env_vars["BASE_RPC_URL"]
if ($env_vars["BASE_SEPOLIA_RPC_URL"]) {
    $env:BASE_SEPOLIA_RPC_URL = $env_vars["BASE_SEPOLIA_RPC_URL"]
}
$env:IS_HUB_CHAIN = "true"

# Additional branding (optional)
if ($env_vars["ONBT_LOGO_URI"]) {
    $env:ONBT_LOGO_URI = $env_vars["ONBT_LOGO_URI"]
}
if ($env_vars["ONBT_WEBSITE"]) {
    $env:ONBT_WEBSITE = $env_vars["ONBT_WEBSITE"]
}

Write-Host "📜 Running deployment..." -ForegroundColor Cyan
Write-Host "   npx hardhat run scripts/deployFullEcosystem.mjs --network $network`n"

# Run hardhat deployment
try {
    Push-Location $rootDir
    & npx hardhat run scripts/deployFullEcosystem.mjs --network $network
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✨ Deployment completed successfully!" -ForegroundColor Green
        Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
        Write-Host "   1. Save the contract addresses displayed above"
        Write-Host "   2. Update scripts/configurePeers.mjs with deployed addresses"
        Write-Host "   3. Deploy to destination chains using Deploy-Destination.ps1"
        Write-Host "   4. Configure peers on all chains"
    } else {
        Write-Host "`n❌ Deployment failed!" -ForegroundColor Red
        exit 1
    }
} finally {
    Pop-Location
}
