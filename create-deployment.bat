@echo off
echo ========================================
echo Rwanda Tours - Deployment Package
echo ========================================
echo.

echo Creating deployment package...
echo.

REM Create deployment folder
if not exist "deployment" mkdir deployment

REM Copy dist files
echo [1/3] Copying built files from dist...
xcopy /E /I /Y dist deployment\

REM Copy API files
echo [2/3] Copying API files...
xcopy /E /I /Y api deployment\api\

REM Copy PDF to root (if not already there)
echo [3/3] Ensuring PDF is in root...
copy /Y public\FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf deployment\

echo.
echo ========================================
echo DEPLOYMENT PACKAGE READY!
echo ========================================
echo.
echo Location: %CD%\deployment\
echo.
echo NEXT STEPS:
echo 1. Upload all files from 'deployment' folder to your web server
echo 2. Update api/config.php with your production domain
echo 3. Test the PDF link: https://yourdomain.com/FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf
echo 4. Test the booking form
echo.
echo FILES TO UPLOAD:
echo - index.html
echo - FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf
echo - assets/ (folder)
echo - images/ (folder)
echo - api/ (folder)
echo.
pause
