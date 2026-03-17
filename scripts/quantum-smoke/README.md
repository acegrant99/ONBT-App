# Quantum Smoke Tests

This folder provides quick validation for the two supported OriginQ environments in this workspace.

## Environments

- `.venv` (Python 3.13): `pyqpanda3` + `pyqpanda_alg`
- `.venv312` (Python 3.12): `pyvqnet`

## Run Commands

From `c:\ONBT-App`:

```powershell
./scripts/quantum-smoke/run-all.ps1
./scripts/quantum-smoke/run-qpanda-smoke.ps1
./scripts/quantum-smoke/run-vqnet-smoke.ps1
```

Windows Command Prompt (`cmd.exe`) alternatives:

```bat
scripts\quantum-smoke\run-all.cmd
scripts\quantum-smoke\run-qpanda-smoke.cmd
scripts\quantum-smoke\run-vqnet-smoke.cmd
```

Using npm scripts:

```powershell
npm run quantum:smoke
npm run quantum:smoke:qpanda
npm run quantum:smoke:vqnet
```

If your PowerShell execution policy blocks local scripts, use:

```powershell
powershell -ExecutionPolicy Bypass -File ./scripts/quantum-smoke/run-qpanda-smoke.ps1
powershell -ExecutionPolicy Bypass -File ./scripts/quantum-smoke/run-vqnet-smoke.ps1
```

## Direct Python Invocation

```powershell
./.venv/Scripts/python.exe ./scripts/quantum-smoke/qpanda_smoke.py
./.venv312/Scripts/python.exe ./scripts/quantum-smoke/vqnet_smoke.py
```
