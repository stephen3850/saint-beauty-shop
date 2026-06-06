@echo off
TITLE Saint Backend (FastAPI)
cd ..\heavenly-beauty-backend
echo ✨ Starting FastAPI Backend...
.\venv\Scripts\python.exe -m uvicorn main:socket_app --host 0.0.0.0 --port 5000 --reload
pause
