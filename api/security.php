<?php
/**
 * Rate Limiting and Duplicate Prevention
 */

class SecurityHelper {
    
    private static $storageFile = __DIR__ . '/submissions.json';
    
    /**
     * Check rate limiting for IP address
     */
    public static function checkRateLimit($ip) {
        $data = self::loadData();
        $now = time();
        
        // Clean old entries
        if (isset($data['rate_limits'])) {
            foreach ($data['rate_limits'] as $storedIp => $timestamps) {
                $data['rate_limits'][$storedIp] = array_filter($timestamps, function($ts) use ($now) {
                    return ($now - $ts) < RATE_LIMIT_WINDOW;
                });
                
                if (empty($data['rate_limits'][$storedIp])) {
                    unset($data['rate_limits'][$storedIp]);
                }
            }
        } else {
            $data['rate_limits'] = [];
        }
        
        // Check current IP
        if (!isset($data['rate_limits'][$ip])) {
            $data['rate_limits'][$ip] = [];
        }
        
        $attempts = count($data['rate_limits'][$ip]);
        
        if ($attempts >= RATE_LIMIT_MAX_ATTEMPTS) {
            return [
                'allowed' => false,
                'error' => 'Too many submission attempts. Please try again in 1 hour.',
                'attempts' => $attempts
            ];
        }
        
        // Add current attempt
        $data['rate_limits'][$ip][] = $now;
        self::saveData($data);
        
        return [
            'allowed' => true,
            'attempts' => $attempts + 1
        ];
    }
    
    /**
     * Check for duplicate submission by email
     */
    public static function checkDuplicate($email) {
        $data = self::loadData();
        $now = time();
        
        // Clean old entries
        if (isset($data['submissions'])) {
            foreach ($data['submissions'] as $storedEmail => $timestamp) {
                if (($now - $timestamp) > DUPLICATE_CHECK_WINDOW) {
                    unset($data['submissions'][$storedEmail]);
                }
            }
        } else {
            $data['submissions'] = [];
        }
        
        // Check if email exists
        $emailLower = strtolower(trim($email));
        
        if (isset($data['submissions'][$emailLower])) {
            $timeLeft = DUPLICATE_CHECK_WINDOW - ($now - $data['submissions'][$emailLower]);
            $hoursLeft = ceil($timeLeft / 3600);
            
            return [
                'isDuplicate' => true,
                'error' => 'A booking with this email was already submitted. Please wait ' . $hoursLeft . ' hours before submitting again or contact us directly.',
                'lastSubmission' => $data['submissions'][$emailLower]
            ];
        }
        
        // Record this submission
        $data['submissions'][$emailLower] = $now;
        self::saveData($data);
        
        return ['isDuplicate' => false];
    }
    
    /**
     * Generate CSRF token
     */
    public static function generateCSRFToken() {
        if (!isset($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }
    
    /**
     * Validate CSRF token
     */
    public static function validateCSRFToken($token) {
        if (!isset($_SESSION['csrf_token'])) {
            return false;
        }
        
        return hash_equals($_SESSION['csrf_token'], $token);
    }
    
    /**
     * Get client IP address
     */
    public static function getClientIP() {
        $ip = '';
        
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        
        return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '0.0.0.0';
    }
    
    /**
     * Load data from storage
     */
    private static function loadData() {
        if (!file_exists(self::$storageFile)) {
            return ['rate_limits' => [], 'submissions' => []];
        }
        
        $content = file_get_contents(self::$storageFile);
        $data = json_decode($content, true);
        
        return $data ?: ['rate_limits' => [], 'submissions' => []];
    }
    
    /**
     * Save data to storage
     */
    private static function saveData($data) {
        file_put_contents(self::$storageFile, json_encode($data, JSON_PRETTY_PRINT));
    }
}
