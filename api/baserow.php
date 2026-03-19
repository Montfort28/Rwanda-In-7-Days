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
        
        // Prepare data for Baserow
        $bookingData = [
            'field_4789' => 'Rwanda In 7 Days – Signature Circuit (Premium)',
            'field_4790' => $formData['departureDate'],
            'field_4791' => $formData['groupSize'],
            'field_4792' => $formData['tier'],
            'field_4793' => $formData['rooming'],
            'field_4794' => $formData['language'],
            'field_4795' => $formData['fullName'],
            'field_4796' => $formData['email'],
            'field_4797' => $formData['whatsapp'],
            'field_4798' => $formData['nationality'],
            'field_4799' => $formData['dateOfBirth'],
            'field_4800' => $formData['passportConfirmed'],
            'field_4801' => $formData['dietary'] ?? '',
            'field_4802' => $formData['notes'] ?? '',
            'field_4803' => $formData['source'],
            'field_4804' => 'Unassigned',
            'field_4805' => 'New',
            'field_4806' => '0',
            'field_4807' => '0',
            'field_4808' => '0',
            'field_4809' => '0',
            'field_4810' => '0',
            'field_4811' => '0',
            'field_4812' => '0',
            'field_4813' => date('c'), // ISO 8601 format
            'field_4814' => 'Pending',
            'field_4815' => 'Not Issued',
            'field_4816' => $reference
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
            
            if (isset($errorData['error'])) {
                $errorMessage = $errorData['error'];
            } elseif (isset($errorData['detail'])) {
                $errorMessage = $errorData['detail'];
            }
            
            return [
                'success' => false,
                'error' => $errorMessage,
                'httpCode' => $httpCode
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
