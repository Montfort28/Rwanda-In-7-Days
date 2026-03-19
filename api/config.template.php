<?php
/**
 * API Configuration Template
 * Copy this file to config.php and update with your credentials
 */

// Prevent direct access
if (!defined('API_ACCESS')) {
    http_response_code(403);
    die('Direct access not permitted');
}

// Baserow Configuration
define('BASEROW_API_URL', 'https://baserow.odiecloud.org/api');
define('BASEROW_TOKEN', 'YOUR_BASEROW_TOKEN_HERE');
define('BASEROW_DATABASE_ID', 'YOUR_DATABASE_ID');
define('BASEROW_TABLE_ID', 'YOUR_TABLE_ID');

// Rate Limiting Configuration
define('RATE_LIMIT_MAX_ATTEMPTS', 3);
define('RATE_LIMIT_WINDOW', 3600); // 1 hour in seconds

// Duplicate Prevention Configuration
define('DUPLICATE_CHECK_WINDOW', 86400); // 24 hours in seconds

// CORS Configuration
define('ALLOWED_ORIGINS', [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost',
    'http://127.0.0.1',
    // Add your production domain here
    // 'https://yourdomain.com'
]);

// Validation Rules
define('MIN_AGE_YEARS', 15); // Minimum age for gorilla trekking
define('MIN_DAYS_ADVANCE', 30); // Minimum days in advance for booking

// Session Configuration
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Error Reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
