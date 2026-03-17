$ErrorActionPreference = 'Stop'

$python = '.venv312\Scripts\python.exe'
$script = 'scripts\quantum-ai\nabat_quantum_ai.py'
$endpoint = 'http://localhost:3000/api/chains/overview'

& $python $script --ingest-overview --endpoint $endpoint --samples 3 --ingest-interval 5 --dataset data\nabat_quantum_ai_signals.csv
& $python $script --train --dataset data\nabat_quantum_ai_signals.csv --epochs 20 --batch-size 16 --lr 0.2 --timestamped-report --report reports\quantum-ai\runs\nabat_quantum_ai_report.json --model reports\quantum-ai\runs\nabat_quantum_ai_model.npz
& $python $script --predict --from-endpoint --endpoint $endpoint --model reports\quantum-ai\runs\nabat_quantum_ai_model.npz --timestamped-report --prediction-report reports\quantum-ai\runs\nabat_quantum_ai_prediction.json

Write-Host 'Live retraining run complete.'
