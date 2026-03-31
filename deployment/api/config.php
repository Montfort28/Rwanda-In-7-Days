<?php
/**
 * API Configuration
 * Production configuration for Rwanda In 7 Days booking system
 */

// Prevent direct access
if (!defined('API_ACCESS')) {
    http_response_code(403);
    die('Direct access not permitted');
}

// Detect environment
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1', 'localhost:80', '127.0.0.1:80']);

// Baserow Configuration
define('BASEROW_API_URL', 'https://baserow.odiecloud.org/api');
define('BASEROW_TOKEN', 'e9auwsf47aYBRi70wMy5ptzDbTfHGwWs'); // ⚠️ UPDATE THIS
define('BASEROW_DATABASE_ID', '301'); // ⚠️ UPDATE THIS
define('BASEROW_TABLE_ID', '1103'); // ⚠️ UPDATE THIS

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
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    // Add your production domain here
    'https://rwanda-in-7-days.iforeveryoungtours.com'
]);

// Validation Rules
define('MIN_AGE_YEARS', 15); // Minimum age for gorilla trekking
define('MIN_DAYS_ADVANCE', 30); // Minimum days in advance for booking

// Session Configuration - Auto-detect environment
if (session_status() === PHP_SESSION_NONE) {
    if ($isLocalhost) {
        // Localhost settings (HTTP)
        session_start([
            'cookie_httponly' => true,
            'cookie_samesite' => 'Lax',
            'cookie_secure' => false
        ]);
    } else {
        // Production settings (HTTPS)
        session_start([
            'cookie_httponly' => true,
            'cookie_samesite' => 'None',
            'cookie_secure' => true
        ]);
    }
}

// Error Reporting
if ($isLocalhost) {
    // Development: Show errors
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    ini_set('log_errors', 1);
    ini_set('error_log', __DIR__ . '/logs/php_errors.log');
} else {
    // Production: Hide errors
    error_reporting(0);
    ini_set('display_errors', 0);
    ini_set('log_errors', 1);
    ini_set('error_log', __DIR__ . '/logs/php_errors.log');
}
