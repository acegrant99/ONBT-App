# Nabat Quantum AI Starter

This folder contains a starter script to bootstrap a first quantum AI workflow for the Nabat ecosystem.

## Script

- `nabat_quantum_ai.py`

## What It Does

- `--init`: creates a template dataset + config for ecosystem signal modeling.
- `--ingest-overview`: fetches live data from `miniapp` backend overview and appends mapped rows to your dataset.
- `--train`: trains a first quantum-enhanced binary classifier using `pyvqnet` + `pyqpanda3`.
- `--synthetic`: trains from generated synthetic samples when you do not yet have live metrics.
- `--predict`: classifies the latest ecosystem state and writes a prediction report.
- If the current local `pyvqnet`/`pyqpanda` binary combo cannot initialize `QuantumLayer`,
  the script automatically falls back to a NumPy trainer so your workflow still completes.

## Feature Schema

The training data expects:

- `liquidity_health` (0 to 1)
- `bridge_reliability` (0 to 1)
- `governance_participation` (0 to 1)
- `label` (`0` = caution, `1` = healthy/risk-on)

## Quick Commands

From `c:\ONBT-App`:

```powershell
# Build template dataset/config
npm.cmd run quantum:ai:init

# Ingest live overview samples into dataset
npm.cmd run quantum:ai:ingest

# Train using synthetic data first
npm.cmd run quantum:ai:train:synthetic

# Train on live-ingested dataset
npm.cmd run quantum:ai:train:live

# Predict from current endpoint state
npm.cmd run quantum:ai:predict

# Ingest + train + predict (timestamped outputs)
npm.cmd run quantum:ai:retrain:live
```

Direct execution:

```powershell
./.venv312/Scripts/python.exe ./scripts/quantum-ai/nabat_quantum_ai.py --init
./.venv312/Scripts/python.exe ./scripts/quantum-ai/nabat_quantum_ai.py --ingest-overview --endpoint http://localhost:3000/api/chains/overview --samples 3 --ingest-interval 5
./.venv312/Scripts/python.exe ./scripts/quantum-ai/nabat_quantum_ai.py --train --synthetic --epochs 10 --samples 120
./.venv312/Scripts/python.exe ./scripts/quantum-ai/nabat_quantum_ai.py --predict --from-endpoint --endpoint http://localhost:3000/api/chains/overview
```

## Train With Your Own Data

```powershell
./.venv312/Scripts/python.exe ./scripts/quantum-ai/nabat_quantum_ai.py --train --dataset data/nabat_quantum_ai_signals.csv --epochs 20 --batch-size 16 --lr 0.2
```

A metrics report is written to:

- `reports/quantum-ai/nabat_quantum_ai_report.json`

Prediction output is written to:

- `reports/quantum-ai/nabat_quantum_ai_prediction.json`

Fallback numpy model artifact is written to:

- `reports/quantum-ai/nabat_quantum_ai_model.npz`

For scheduled runs, use:

- `scripts/quantum-ai/retrain-live.cmd`
- `scripts/quantum-ai/retrain-live.ps1`
