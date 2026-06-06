@echo off
TITLE Saint Beauty Shop - Launcher

echo ---------------------------------------------------
echo ✨ SAINT BEAUTY SHOP - FULL STACK LAUNCHER ✨
echo ---------------------------------------------------
echo.

:: 1. Launch Backend
echo [1/2] Starting FastAPI Backend on port 5000...
start "Saint Backend (FastAPI)" cmd /k "cd ..\heavenly-beauty-backend && (if exist venv\Scripts\python.exe (echo Using Virtual Environment... && venv\Scripts\python.exe -m uvicorn main:socket_app --host 0.0.0.0 --port 5000 --reload) else (echo Virtual environment not found. Trying global python... && python -m uvicorn main:socket_app --host 0.0.0.0 --port 5000 --reload)) || (echo CRITICAL ERROR: Backend failed to start. Please check if Python and FastAPI are installed. && pause)"

:: 2. Wait a few seconds for backend to initialize
timeout /t 5 /nobreak > nul

:: 3. Launch Frontend
echo [2/2] Starting React Frontend on port 5173...
start "Saint Frontend (Vite)" cmd /k "cd .. && npm.cmd run dev"

echo.
echo 🚀 Launch sequence complete!
echo.
echo 📡 Backend: http://localhost:5000/docs (Swagger UI)
echo 📡 Frontend: http://localhost:5173
echo.
echo Keep the terminal windows open while using the app.
echo ---------------------------------------------------
pause
