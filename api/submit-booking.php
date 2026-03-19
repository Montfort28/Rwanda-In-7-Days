<?php
/**
 * Booking Submission API Endpoint
 * Handles form submissions with validation, rate limiting, and Baserow integration
 */

// Enable API access
define('API_ACCESS', true);

// Load dependencies
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/validator.php';
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/baserow.php';

// Set headers
header('Content-Type: application/json');

// Handle CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
}

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON data']);
    exit;
}

// Validate CSRF token
if (!isset($data['csrfToken']) || !SecurityHelper::validateCSRFToken($data['csrfToken'])) {
    http_response_code(403);
    echo json_encode(['success' => false, 'error' => 'Invalid security token. Please refresh the page and try again.']);
    exit;
}

// Check rate limiting
$clientIP = SecurityHelper::getClientIP();
$rateLimitCheck = SecurityHelper::checkRateLimit($clientIP);

if (!$rateLimitCheck['allowed']) {
    http_response_code(429);
    echo json_encode(['success' => false, 'error' => $rateLimitCheck['error']]);
    exit;
}

// Validate all fields
$errors = [];

// Full Name
$fullNameCheck = Validator::validateRequired($data['fullName'] ?? '', 'Full name');
if (!$fullNameCheck['valid']) {
    $errors['fullName'] = $fullNameCheck['error'];
}

// Email
$emailCheck = Validator::validateEmail($data['email'] ?? '');
if (!$emailCheck['valid']) {
    $errors['email'] = $emailCheck['error'];
}

// Check for duplicate email
if ($emailCheck['valid']) {
    $duplicateCheck = SecurityHelper::checkDuplicate($data['email']);
    if ($duplicateCheck['isDuplicate']) {
        http_response_code(409);
        echo json_encode(['success' => false, 'error' => $duplicateCheck['error']]);
        exit;
    }
}

// WhatsApp
$phoneCheck = Validator::validatePhone($data['whatsapp'] ?? '');
if (!$phoneCheck['valid']) {
    $errors['whatsapp'] = $phoneCheck['error'];
}

// Nationality
$nationalityCheck = Validator::validateRequired($data['nationality'] ?? '', 'Nationality');
if (!$nationalityCheck['valid']) {
    $errors['nationality'] = $nationalityCheck['error'];
}

// Departure Date
$departureDateCheck = Validator::validateDepartureDate($data['departureDate'] ?? '');
if (!$departureDateCheck['valid']) {
    $errors['departureDate'] = $departureDateCheck['error'];
}

// Date of Birth
$dobCheck = Validator::validateDateOfBirth($data['dateOfBirth'] ?? '');
if (!$dobCheck['valid']) {
    $errors['dateOfBirth'] = $dobCheck['error'];
}

// Group Size
$groupSizeCheck = Validator::validateSelect(
    $data['groupSize'] ?? '',
    ['1', '2', '3', '4', '5', '6+'],
    'Group size'
);
if (!$groupSizeCheck['valid']) {
    $errors['groupSize'] = $groupSizeCheck['error'];
}

// Tier
$tierCheck = Validator::validateSelect(
    $data['tier'] ?? '',
    ['Premium', 'Luxury'],
    'Tier'
);
if (!$tierCheck['valid']) {
    $errors['tier'] = $tierCheck['error'];
}

// Rooming
$roomingCheck = Validator::validateSelect(
    $data['rooming'] ?? '',
    ['King', 'Queen', 'Full / Double', 'Twin (or Single)'],
    'Rooming'
);
if (!$roomingCheck['valid']) {
    $errors['rooming'] = $roomingCheck['error'];
}

// Language
$languageCheck = Validator::validateSelect(
    $data['language'] ?? '',
    ['English', 'French', 'Spanish', 'Chinese'],
    'Language'
);
if (!$languageCheck['valid']) {
    $errors['language'] = $languageCheck['error'];
}

// Source
$sourceCheck = Validator::validateSelect(
    $data['source'] ?? '',
    ['Google', 'Facebook', 'Instagram', 'Referral', 'Other'],
    'Source'
);
if (!$sourceCheck['valid']) {
    $errors['source'] = $sourceCheck['error'];
}

// Passport Confirmed
if (!isset($data['passportConfirmed']) || $data['passportConfirmed'] !== true) {
    $errors['passportConfirmed'] = 'You must confirm your passport name matches exactly';
}

// If there are validation errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Please correct the following errors',
        'errors' => $errors
    ]);
    exit;
}

// Sanitize data
$sanitizedData = [
    'fullName' => Validator::sanitizeText($data['fullName']),
    'email' => strtolower(trim($data['email'])),
    'whatsapp' => $phoneCheck['cleaned'],
    'nationality' => Validator::sanitizeText($data['nationality']),
    'departureDate' => $data['departureDate'],
    'dateOfBirth' => $data['dateOfBirth'],
    'groupSize' => $data['groupSize'],
    'tier' => $data['tier'],
    'rooming' => $data['rooming'],
    'language' => $data['language'],
    'source' => $data['source'],
    'dietary' => Validator::sanitizeText($data['dietary'] ?? ''),
    'notes' => Validator::sanitizeText($data['notes'] ?? ''),
    'passportConfirmed' => true
];

// Submit to Baserow
$result = BaserowService::submitBooking($sanitizedData);

if (!$result['success']) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $result['error']
    ]);
    exit;
}

// Success response
http_response_code(200);
echo json_encode([
    'success' => true,
    'reference' => $result['reference'],
    'message' => 'Booking submitted successfully'
]);
