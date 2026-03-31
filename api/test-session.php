<?php
/**
 * Session Test Endpoint
 * Tests if sessions are working properly
 */

// Enable API access
define('API_ACCESS', true);

// Load config
require_once __DIR__ . '/config.php';

header('Content-Type: application/json');

// Handle CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
} else {
    if (strpos($origin, 'localhost') !== false || strpos($origin, '127.0.0.1') !== false) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Test session
$sessionStatus = session_status();
$sessionId = session_id();

// Set a test value
if (!isset($_SESSION['test'])) {
    $_SESSION['test'] = 'Session is working!';
}

echo json_encode([
    'success' => true,
    'sessionStatus' => $sessionStatus,
    'sessionStatusText' => [
        PHP_SESSION_DISABLED => 'DISABLED',
        PHP_SESSION_NONE => 'NONE',
        PHP_SESSION_ACTIVE => 'ACTIVE'
    ][$sessionStatus],
    'sessionId' => $sessionId,
    'testValue' => $_SESSION['test'] ?? 'Not set',
    'origin' => $origin,
    'corsAllowed' => in_array($origin, ALLOWED_ORIGINS),
    'phpVersion' => phpversion()
]);
