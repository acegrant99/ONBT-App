@echo off
setlocal

echo [1/2] Running QPanda smoke test...
call "%~dp0run-qpanda-smoke.cmd"
if errorlevel 1 (
  echo QPanda smoke test failed.
  exit /b 1
)

echo [2/2] Running VQNet smoke test...
call "%~dp0run-vqnet-smoke.cmd"
if errorlevel 1 (
  echo VQNet smoke test failed.
  exit /b 1
)

echo All quantum smoke tests passed.
exit /b 0
