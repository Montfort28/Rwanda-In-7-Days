// API Configuration
// For development: use localhost with project path
// For production: use relative path
const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost/Rwanda-In-7-Days/api'
  : 'https://rwanda-in-7-days.iforeveryoungtours.com/api';

let csrfToken = null;

/**
 * Fetch CSRF token from backend
 */
const getCSRFToken = async () => {
  if (csrfToken) return csrfToken;
  
  try {
    console.log('Fetching CSRF token from:', `${API_BASE_URL}/get-csrf-token.php`);
    
    const response = await fetch(`${API_BASE_URL}/get-csrf-token.php`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log('CSRF response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('CSRF token fetch failed:', errorText);
      throw new Error('Failed to get security token');
    }
    
    const data = await response.json();
    console.log('CSRF token received:', data.success);
    
    if (!data.success || !data.csrfToken) {
      throw new Error('Invalid security token response');
    }
    
    csrfToken = data.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error('CSRF token error:', error);
    throw new Error('Security initialization failed. Please refresh the page.');
  }
};

/**
 * Submit booking to backend API (which then submits to Baserow)
 */
export const submitBookingToBaserow = async (formData) => {
  try {
    // Get CSRF token
    const token = await getCSRFToken();
    
    // Prepare submission data
    const submissionData = {
      ...formData,
      csrfToken: token
    };
    
    // Submit to backend API
    const response = await fetch(`${API_BASE_URL}/submit-booking.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(submissionData)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 429) {
        throw new Error(result.error || 'Too many attempts. Please try again later.');
      }
      
      if (response.status === 409) {
        throw new Error(result.error || 'Duplicate submission detected.');
      }
      
      if (result.errors) {
        // Field-specific errors
        const errorMessages = Object.values(result.errors).join('. ');
        throw new Error(errorMessages);
      }
      
      throw new Error(result.error || 'Failed to submit booking. Please try again.');
    }
    
    return {
      success: true,
      reference: result.reference,
      message: result.message
    };
  } catch (error) {
    console.error('Booking submission error:', error);
    return {
      success: false,
      error: error.message || 'Failed to submit booking. Please try again.'
    };
  }
};
