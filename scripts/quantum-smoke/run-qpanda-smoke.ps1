$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$python = Join-Path $root ".venv\Scripts\python.exe"
$script = Join-Path $PSScriptRoot "qpanda_smoke.py"

if (-not (Test-Path $python)) {
    Write-Error "Missing Python interpreter: $python"
}

& $python $script
exit $LASTEXITCODE
