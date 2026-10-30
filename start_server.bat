@echo off
title Manya Tour & Travels - Local Server
echo ========================================================
echo   Starting Manya Tour & Travels Website Server...
echo   Open in your browser: http://localhost:8080
echo ========================================================
start "" "http://localhost:8080"
python -m http.server 8080
pause
