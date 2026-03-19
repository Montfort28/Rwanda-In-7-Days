<?php
/**
 * Validation Helper Functions
 */

class Validator {
    
    /**
     * Validate email format
     */
    public static function validateEmail($email) {
        if (empty($email)) {
            return ['valid' => false, 'error' => 'Email is required'];
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['valid' => false, 'error' => 'Invalid email format'];
        }
        
        return ['valid' => true];
    }
    
    /**
     * Validate phone number (international format)
     */
    public static function validatePhone($phone) {
        if (empty($phone)) {
            return ['valid' => false, 'error' => 'WhatsApp number is required'];
        }
        
        // Remove spaces, dashes, parentheses
        $cleaned = preg_replace('/[\s\-\(\)]/', '', $phone);
        
        // Must start with + and have 10-15 digits
        if (!preg_match('/^\+[0-9]{10,15}$/', $cleaned)) {
            return ['valid' => false, 'error' => 'WhatsApp number must be in international format (e.g., +250123456789)'];
        }
        
        return ['valid' => true, 'cleaned' => $cleaned];
    }
    
    /**
     * Validate departure date (must be future and at least MIN_DAYS_ADVANCE)
     */
    public static function validateDepartureDate($date) {
        if (empty($date)) {
            return ['valid' => false, 'error' => 'Departure date is required'];
        }
        
        $departureTimestamp = strtotime($date);
        $today = strtotime('today');
        $minDate = strtotime('+' . MIN_DAYS_ADVANCE . ' days');
        
        if ($departureTimestamp === false) {
            return ['valid' => false, 'error' => 'Invalid date format'];
        }
        
        if ($departureTimestamp < $today) {
            return ['valid' => false, 'error' => 'Departure date cannot be in the past'];
        }
        
        if ($departureTimestamp < $minDate) {
            return ['valid' => false, 'error' => 'Departure date must be at least ' . MIN_DAYS_ADVANCE . ' days in advance'];
        }
        
        return ['valid' => true];
    }
    
    /**
     * Validate date of birth and check minimum age
     */
    public static function validateDateOfBirth($dob) {
        if (empty($dob)) {
            return ['valid' => false, 'error' => 'Date of birth is required'];
        }
        
        $dobTimestamp = strtotime($dob);
        $today = strtotime('today');
        
        if ($dobTimestamp === false) {
            return ['valid' => false, 'error' => 'Invalid date of birth format'];
        }
        
        if ($dobTimestamp >= $today) {
            return ['valid' => false, 'error' => 'Date of birth cannot be in the future'];
        }
        
        // Calculate age
        $age = floor(($today - $dobTimestamp) / (365.25 * 24 * 60 * 60));
        
        if ($age < MIN_AGE_YEARS) {
            return ['valid' => false, 'error' => 'Participants must be at least ' . MIN_AGE_YEARS . ' years old for gorilla trekking'];
        }
        
        if ($age > 120) {
            return ['valid' => false, 'error' => 'Invalid date of birth'];
        }
        
        return ['valid' => true, 'age' => $age];
    }
    
    /**
     * Validate required text field
     */
    public static function validateRequired($value, $fieldName) {
        if (empty(trim($value))) {
            return ['valid' => false, 'error' => $fieldName . ' is required'];
        }
        
        return ['valid' => true];
    }
    
    /**
     * Sanitize text input
     */
    public static function sanitizeText($text) {
        return htmlspecialchars(trim($text), ENT_QUOTES, 'UTF-8');
    }
    
    /**
     * Validate select field options
     */
    public static function validateSelect($value, $allowedValues, $fieldName) {
        if (empty($value)) {
            return ['valid' => false, 'error' => $fieldName . ' is required'];
        }
        
        if (!in_array($value, $allowedValues)) {
            return ['valid' => false, 'error' => 'Invalid ' . $fieldName . ' selected'];
        }
        
        return ['valid' => true];
    }
}
