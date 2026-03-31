<?php
/**
 * Baserow Service
 * Handles communication with Baserow API
 */

class BaserowService {
    
    /**
     * Generate internal booking reference
     */
    public static function generateReference() {
        $date = date('Ymd');
        $random = str_pad(rand(0, 999), 3, '0', STR_PAD_LEFT);
        return "RW7D-{$date}-{$random}";
    }
    
    /**
     * Submit booking to Baserow
     */
    public static function submitBooking($formData) {
        $reference = self::generateReference();
        
        // Dates must be in YYYY-MM-DD format for Baserow
        // formData already has dates in YYYY-MM-DD from HTML date inputs
        
        // Prepare data for Baserow with CORRECT field IDs and formats
        $bookingData = [
            'field_10913' => 4566, // Tour - Rwanda in 7 Days (option ID)
            'field_10914' => $formData['departureDate'], // Departure Date (YYYY-MM-DD)
            'field_10915' => (int)$formData['groupSize'] <= 12 ? 4559 : 4560, // Group Size (option ID: 4559=12, 4560=15)
            'field_10916' => $formData['tier'] === 'Premium' ? 4567 : 4568, // Tier (option ID: 4567=Premium, 4568=Luxury)
            'field_10917' => match($formData['rooming']) {
                'King' => 4569,
                'Queen' => 4570,
                'Full / Double' => 4571,
                'Twin (or Single)' => 4572,
                default => 4572
            }, // Rooming (option IDs)
            'field_10918' => [$formData['language']], // Language (multiple_select - array of text values)
            'field_10919' => $formData['fullName'], // Full Name (text)
            'field_10920' => $formData['email'], // Email
            'field_10921' => $formData['whatsapp'], // WhatsApp (text)
            // field_10922 is link_row (Nationality) - skip for now
            'field_10923' => $formData['dateOfBirth'], // Date of Birth (YYYY-MM-DD)
            'field_10924' => $formData['passportConfirmed'] ? 'True' : 'False', // Passport Confirmed (text)
            'field_10925' => $formData['dietary'] ?? '', // Dietary (text)
            'field_10926' => $formData['notes'] ?? '', // Notes (long_text)
            'field_10927' => match($formData['source']) {
                'Google' => 4578, // Map to 'Social Media'
                'Facebook' => 4578, // Map to 'Social Media'
                'Instagram' => 4578, // Map to 'Social Media'
                'Referral' => 4577, // Map to 'Affiliate'
                'Other' => 4580, // Map to 'Ad'
                'Affiliate' => 4577,
                'Social Media' => 4578,
                'Email' => 4579,
                'Ad' => 4580,
                default => 4578 // Default to Social Media
            }, // Source (option IDs)
            'field_10928' => 'Unassigned', // Assigned To (text)
            'field_10929' => 'New', // Lead Status (text)
            'field_10930' => '0', // Deposit Due (text)
            'field_10931' => 'False', // Deposit Paid (text)
            'field_10932' => '0', // Balance Due (text)
            'field_10933' => 'False', // Balance Paid (text)
            'field_10934' => '0', // Total Package Price (text)
            'field_10935' => '0', // Single Supplement (text)
            'field_10936' => '100', // Emergency Evacuation (text)
            'field_10937' => date('Y-m-d'), // Created At (YYYY-MM-DD)
            'field_10938' => 'Pending', // Permit Mode (text)
            'field_10939' => 'Not Issued', // Permit Status (text)
            'field_10940' => $reference, // Internal Reference (text)
            'field_10941' => '' // Follow-Up Date (text)
        ];
        
        // Make API request to Baserow
        $url = BASEROW_API_URL . '/database/rows/table/' . BASEROW_TABLE_ID . '/';
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Token ' . BASEROW_TOKEN,
            'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($bookingData));
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);
        
        // Handle errors
        if ($curlError) {
            return [
                'success' => false,
                'error' => 'Network error: Unable to connect to booking system. Please try again.'
            ];
        }
        
        if ($httpCode !== 200 && $httpCode !== 201) {
            $errorData = json_decode($response, true);
            $errorMessage = 'Failed to submit booking. Please try again.';
            
            // Log the full error for debugging
            error_log('Baserow API Error: ' . print_r($errorData, true));
            error_log('Sent data: ' . json_encode($bookingData));
            
            if (isset($errorData['error'])) {
                $errorMessage = $errorData['error'];
            } elseif (isset($errorData['detail'])) {
                $errorMessage = $errorData['detail'];
            }
            
            return [
                'success' => false,
                'error' => $errorMessage,
                'httpCode' => $httpCode,
                'debug' => $errorData // Include full error details
            ];
        }
        
        // Success
        $result = json_decode($response, true);
        
        return [
            'success' => true,
            'reference' => $reference,
            'data' => $result
        ];
    }
}
