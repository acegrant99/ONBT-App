$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$qpandaScript = Join-Path $PSScriptRoot "run-qpanda-smoke.ps1"
$vqnetScript = Join-Path $PSScriptRoot "run-vqnet-smoke.ps1"

Write-Host "[1/2] Running QPanda smoke test..."
& $qpandaScript
if ($LASTEXITCODE -ne 0) {
    Write-Error "QPanda smoke test failed."
}

Write-Host "[2/2] Running VQNet smoke test..."
& $vqnetScript
if ($LASTEXITCODE -ne 0) {
    Write-Error "VQNet smoke test failed."
}

Write-Host "All quantum smoke tests passed."
exit 0
