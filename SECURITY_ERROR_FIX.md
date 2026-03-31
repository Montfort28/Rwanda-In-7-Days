# Security Initialization Error - Troubleshooting Guide

## Error Message
"Security initialization failed. Please refresh the page."

## Root Cause
The frontend cannot fetch the CSRF token from the backend API endpoint.

## Quick Fixes (Try in Order)

### 1. Verify XAMPP is Running
- Apache must be running
- Check: http://localhost/Rwanda-In-7-Days/api/test-session.php
- Should return JSON with session info

### 2. Test CSRF Endpoint Directly
Open in browser:
```
http://localhost/Rwanda-In-7-Days/api/get-csrf-token.php
```

Expected response:
```json
{
  "success": true,
  "csrfToken": "abc123..."
}
```

### 3. Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for errors when submitting form
4. Check Network tab for failed requests

### 4. Clear Browser Data
- Clear cookies for localhost
- Clear localStorage
- Hard refresh (Ctrl+Shift+R)

### 5. Verify Session Configuration
Check `api/config.php`:
```php
session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'None',
    'cookie_secure' => true
]);
```

For localhost development, you may need:
```php
session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Lax',
    'cookie_secure' => false  // Set to false for localhost
]);
```

### 6. Check CORS Configuration
In `api/config.php`, verify your origin is listed:
```php
define('ALLOWED_ORIGINS', [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    // ... your development URL
]);
```

### 7. Verify PHP Session Directory
Check if PHP can write sessions:
```php
<?php
echo session_save_path();
?>
```

Ensure the directory exists and is writable.

## Common Issues

### Issue 1: HTTPS Required for SameSite=None
**Symptom:** Cookies not being set in browser
**Solution:** For localhost, use `SameSite=Lax` and `Secure=false`

### Issue 2: Wrong API URL
**Symptom:** 404 errors in console
**Solution:** Check `src/services/baserowService.js` API_BASE_URL

### Issue 3: CORS Blocked
**Symptom:** "CORS policy" error in console
**Solution:** Add your origin to ALLOWED_ORIGINS in config.php

### Issue 4: Session Not Starting
**Symptom:** Session status shows "NONE" or "DISABLED"
**Solution:** Check php.ini session configuration

## Testing Steps

1. **Test Session Endpoint:**
   ```
   http://localhost/Rwanda-In-7-Days/api/test-session.php
   ```

2. **Test CSRF Endpoint:**
   ```
   http://localhost/Rwanda-In-7-Days/api/get-csrf-token.php
   ```

3. **Check Browser Console:**
   - Open form
   - Try to submit
   - Check console for detailed error logs

4. **Verify Cookies:**
   - DevTools → Application → Cookies
   - Look for PHPSESSID cookie
   - Check SameSite and Secure attributes

## Production Deployment Notes

For production (HTTPS), use:
```php
session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'None',
    'cookie_secure' => true
]);
```

For development (HTTP), use:
```php
session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Lax',
    'cookie_secure' => false
]);
```

## Files Modified

1. `api/config.php` - Session configuration
2. `api/get-csrf-token.php` - Added error handling and CORS fallback
3. `api/submit-booking.php` - Added CORS fallback
4. `src/services/baserowService.js` - Added detailed logging
5. `api/test-session.php` - New diagnostic endpoint

## Next Steps

If issue persists:
1. Check `api/logs/php_errors.log` for PHP errors
2. Verify Apache mod_headers is enabled
3. Check if sessions directory is writable
4. Test with different browser
5. Disable browser extensions that might block cookies
