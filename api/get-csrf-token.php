<?php
/**
 * CSRF Token Endpoint
 * Provides CSRF token for form submission
 */

// Enable API access
define('API_ACCESS', true);

// Load dependencies
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/security.php';

// Set headers
header('Content-Type: application/json');

// Handle CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Generate and return CSRF token
$token = SecurityHelper::generateCSRFToken();

echo json_encode([
    'success' => true,
    'csrfToken' => $token
]);
