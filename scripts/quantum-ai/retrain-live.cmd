@echo off
setlocal

set "PY=.venv312\Scripts\python.exe"
set "SCRIPT=scripts\quantum-ai\nabat_quantum_ai.py"
set "ENDPOINT=http://localhost:3000/api/chains/overview"

%PY% %SCRIPT% --ingest-overview --endpoint %ENDPOINT% --samples 3 --ingest-interval 5 --dataset data\nabat_quantum_ai_signals.csv
if errorlevel 1 exit /b 1

%PY% %SCRIPT% --train --dataset data\nabat_quantum_ai_signals.csv --epochs 20 --batch-size 16 --lr 0.2 --timestamped-report --report reports\quantum-ai\runs\nabat_quantum_ai_report.json --model reports\quantum-ai\runs\nabat_quantum_ai_model.npz
if errorlevel 1 exit /b 1

%PY% %SCRIPT% --predict --from-endpoint --endpoint %ENDPOINT% --model reports\quantum-ai\runs\nabat_quantum_ai_model.npz --timestamped-report --prediction-report reports\quantum-ai\runs\nabat_quantum_ai_prediction.json
if errorlevel 1 exit /b 1

echo Live retraining run complete.
endlocal
