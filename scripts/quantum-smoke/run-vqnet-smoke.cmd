@echo off
setlocal
set "ROOT=%~dp0..\.."
set "PYTHON=%ROOT%\.venv312\Scripts\python.exe"
set "SCRIPT=%~dp0vqnet_smoke.py"

if not exist "%PYTHON%" (
  echo Missing Python interpreter: %PYTHON%
  exit /b 1
)

"%PYTHON%" "%SCRIPT%"
exit /b %ERRORLEVEL%
