@echo off
echo ========================================
echo Rwanda In 7 Days - Build for Hostinger
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [1/5] Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
) else (
    echo [1/5] Dependencies already installed
)

echo.
echo [2/5] Building React application...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo [3/5] Creating deployment folder...
if exist "deployment\" rmdir /s /q "deployment"
mkdir "deployment"

echo.
echo [4/5] Copying files to deployment folder...

REM Copy built React files
xcopy "dist\*" "deployment\" /E /I /Y

REM Copy API files
mkdir "deployment\api"
mkdir "deployment\api\logs"
xcopy "api\*.php" "deployment\api\" /Y
xcopy "api\.htaccess" "deployment\api\" /Y

REM Create empty log file
type nul > "deployment\api\logs\php_errors.log"

REM Create empty submissions.json
echo {} > "deployment\api\submissions.json"

REM Copy public images
mkdir "deployment\public"
mkdir "deployment\public\images"
xcopy "public\images\*" "deployment\public\images\" /E /I /Y
xcopy "public\*.jpg" "deployment\public\" /Y
xcopy "public\*.jpeg" "deployment\public\" /Y
xcopy "public\*.png" "deployment\public\" /Y
xcopy "public\*.pdf" "deployment\public\" /Y

REM Copy root .htaccess
xcopy ".htaccess" "deployment\" /Y

echo.
echo [5/5] Creating deployment package...
echo.
echo ========================================
echo BUILD COMPLETE!
echo ========================================
echo.
echo Deployment files are in: deployment\
echo.
echo NEXT STEPS:
echo 1. Review api\config.php and update:
echo    - BASEROW_TOKEN
echo    - BASEROW_DATABASE_ID
echo    - BASEROW_TABLE_ID
echo    - ALLOWED_ORIGINS (add your domain)
echo.
echo 2. Upload the contents of 'deployment\' folder to Hostinger public_html\
echo.
echo 3. Set permissions on Hostinger:
echo    - api/logs/ = 755
echo    - api/submissions.json = 666
echo    - api/logs/php_errors.log = 666
echo.
echo 4. Test your site:
echo    - https://your-domain.com
echo    - https://your-domain.com/api/test-session.php
echo    - https://your-domain.com/api/get-csrf-token.php
echo.
echo ========================================
echo.
pause
