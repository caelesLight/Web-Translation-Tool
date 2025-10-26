@echo off
echo.
echo ========================================
echo   Sprach-Lern-Reader Starter
echo ========================================
echo.

REM Prüfe ob node_modules existiert
if not exist "node_modules\" (
    echo [*] Installiere Dependencies...
    call npm install
    echo.
)

echo [*] Starte Backend auf Port 3001...
start "Backend Server" cmd /k "node server.js"

timeout /t 2 /nobreak >nul

echo [*] Starte Frontend...
start "Frontend Server" cmd /k "npx serve"

echo.
echo ========================================
echo   Beide Server laufen jetzt!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:3001
echo.
echo Schliesse die beiden neuen Fenster um zu stoppen.
echo.
pause
