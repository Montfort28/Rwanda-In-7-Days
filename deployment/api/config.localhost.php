<?php
/**
 * Localhost Development Configuration
 * Use this for local XAMPP development
 * 
 * To use: Rename this file to config.php (backup the original first)
 */

// Prevent direct access
if (!defined('API_ACCESS')) {
    http_response_code(403);
    die('Direct access not permitted');
}

// Baserow Configuration
define('BASEROW_API_URL', 'https://baserow.odiecloud.org/api');
define('BASEROW_TOKEN', 'e9auwsf47aYBRi70wMy5ptzDbTfHGwWs');
define('BASEROW_DATABASE_ID', '301');
define('BASEROW_TABLE_ID', '1103');

// Rate Limiting Configuration
define('RATE_LIMIT_MAX_ATTEMPTS', 3);
define('RATE_LIMIT_WINDOW', 3600); // 1 hour in seconds

// Duplicate Prevention Configuration
define('DUPLICATE_CHECK_WINDOW', 86400); // 24 hours in seconds

// CORS Configuration - Allow all localhost origins
define('ALLOWED_ORIGINS', [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost',
    'http://127.0.0.1',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8080',
    'http://127.0.0.1:8080',
]);

// Validation Rules
define('MIN_AGE_YEARS', 15);
define('MIN_DAYS_ADVANCE', 30);

// Session Configuration - LOCALHOST SETTINGS
if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_httponly' => true,
        'cookie_samesite' => 'Lax',  // Changed from 'None' for localhost
        'cookie_secure' => false      // Changed from true for localhost (HTTP)
    ]);
}

// Error Reporting - Enable for development
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/logs/php_errors.log');
