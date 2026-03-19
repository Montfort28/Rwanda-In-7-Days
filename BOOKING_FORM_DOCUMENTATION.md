# BOOKING FORM - SECURITY & VALIDATION IMPLEMENTATION

## IMPLEMENTATION SUMMARY

### ✅ COMPLETED FEATURES

#### 1. SECURITY FIXES
- ✅ API credentials moved to PHP backend (not exposed to client)
- ✅ CSRF token protection implemented
- ✅ Rate limiting (3 attempts per hour per IP)
- ✅ Duplicate prevention (24-hour window per email)
- ✅ CORS protection with whitelist
- ✅ Input sanitization
- ✅ SQL injection prevention (using prepared statements via Baserow API)

#### 2. ENHANCED VALIDATION
- ✅ Email format validation
- ✅ Phone number validation (international format: +[country][number])
- ✅ Departure date validation (minimum 30 days advance)
- ✅ Age validation (minimum 15 years for gorilla trekking)
- ✅ Required field validation
- ✅ Select field option validation
- ✅ Date range validation

#### 3. DUPLICATE PREVENTION
- ✅ Email-based duplicate detection
- ✅ 24-hour cooldown period
- ✅ Persistent storage (JSON file)
- ✅ Automatic cleanup of old entries

#### 4. BASEROW INTEGRATION
- ✅ All 26 fields mapped correctly
- ✅ Reference generation (RW7D-YYYYMMDD-XXX)
- ✅ Timestamp in ISO 8601 format
- ✅ Error handling for API failures
- ✅ Proper HTTP status codes

#### 5. UX IMPROVEMENTS
- ✅ Success message display time increased to 10 seconds
- ✅ Copy booking reference button added
- ✅ Field-level validation hints
- ✅ Better error messages
- ✅ Loading states

---

## FILE STRUCTURE

```
Rwanda-In-7-Days/
├── api/
│   ├── config.php              # Configuration (credentials, settings)
│   ├── validator.php           # Validation functions
│   ├── security.php            # Rate limiting, CSRF, duplicate check
│   ├── baserow.php             # Baserow API integration
│   ├── submit-booking.php      # Main API endpoint
│   ├── get-csrf-token.php      # CSRF token endpoint
│   ├── .htaccess               # Security rules
│   └── submissions.json        # Rate limit & duplicate tracking (auto-created)
├── src/
│   ├── services/
│   │   └── baserowService.js   # Updated to use PHP backend
│   └── components/
│       └── Contact.jsx         # Enhanced form with validation
```

---

## API ENDPOINTS

### 1. GET /api/get-csrf-token.php
**Purpose:** Get CSRF token for form submission

**Response:**
```json
{
  "success": true,
  "csrfToken": "abc123..."
}
```

### 2. POST /api/submit-booking.php
**Purpose:** Submit booking form

**Request Body:**
```json
{
  "fullName": "Jane Marie Doe",
  "email": "jane@example.com",
  "whatsapp": "+250123456789",
  "nationality": "American",
  "departureDate": "2024-03-15",
  "dateOfBirth": "1990-01-15",
  "groupSize": "2",
  "tier": "Premium",
  "rooming": "King",
  "language": "English",
  "source": "Google",
  "dietary": "Vegetarian",
  "notes": "First time in Africa",
  "passportConfirmed": true,
  "csrfToken": "abc123..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "reference": "RW7D-20240115-042",
  "message": "Booking submitted successfully"
}
```

**Error Responses:**

**400 - Validation Error:**
```json
{
  "success": false,
  "error": "Please correct the following errors",
  "errors": {
    "whatsapp": "WhatsApp number must be in international format",
    "departureDate": "Departure date must be at least 30 days in advance"
  }
}
```

**409 - Duplicate:**
```json
{
  "success": false,
  "error": "A booking with this email was already submitted. Please wait 24 hours..."
}
```

**429 - Rate Limit:**
```json
{
  "success": false,
  "error": "Too many submission attempts. Please try again in 1 hour."
}
```

---

## VALIDATION RULES

### Field Validations

| Field | Rules |
|-------|-------|
| **fullName** | Required, sanitized |
| **email** | Required, valid email format, lowercase |
| **whatsapp** | Required, international format (+[country][10-15 digits]) |
| **nationality** | Required, sanitized |
| **departureDate** | Required, future date, minimum 30 days advance |
| **dateOfBirth** | Required, past date, minimum age 15 years |
| **groupSize** | Required, one of: 1, 2, 3, 4, 5, 6+ |
| **tier** | Required, one of: Premium, Luxury |
| **rooming** | Required, one of: King, Queen, Full / Double, Twin (or Single) |
| **language** | Required, one of: English, French, Spanish, Chinese |
| **source** | Required, one of: Google, Facebook, Instagram, Referral, Other |
| **dietary** | Optional, sanitized |
| **notes** | Optional, sanitized |
| **passportConfirmed** | Required, must be true |

### Security Rules

- **Rate Limiting:** 3 submissions per IP per hour
- **Duplicate Prevention:** 1 submission per email per 24 hours
- **CSRF Protection:** Valid token required for all submissions
- **Input Sanitization:** All text fields sanitized to prevent XSS

---

## TESTING GUIDE

### 1. Test Normal Submission

**Steps:**
1. Open http://localhost:5173
2. Scroll to booking form
3. Fill all required fields with valid data
4. Submit form
5. Verify success message with booking reference
6. Check Baserow table for new record

**Expected Result:**
- ✅ Success message displayed
- ✅ Booking reference shown (format: RW7D-YYYYMMDD-XXX)
- ✅ Copy button works
- ✅ Record created in Baserow

### 2. Test Phone Validation

**Test Cases:**
- ❌ "1234567890" → Error: "must be in international format"
- ❌ "250123456789" → Error: "must be in international format"
- ✅ "+250123456789" → Valid
- ✅ "+1 (555) 123-4567" → Valid (cleaned to +15551234567)

### 3. Test Date Validation

**Departure Date:**
- ❌ Past date → Error: "cannot be in the past"
- ❌ Today → Error: "must be at least 30 days in advance"
- ❌ 15 days from now → Error: "must be at least 30 days in advance"
- ✅ 30+ days from now → Valid

**Date of Birth:**
- ❌ Future date → Error: "cannot be in the future"
- ❌ 10 years ago → Error: "must be at least 15 years old"
- ✅ 20 years ago → Valid

### 4. Test Duplicate Prevention

**Steps:**
1. Submit form with email: test@example.com
2. Wait for success
3. Try to submit again with same email
4. Verify error message

**Expected Result:**
- ❌ Second submission blocked
- Error: "A booking with this email was already submitted. Please wait X hours..."

### 5. Test Rate Limiting

**Steps:**
1. Submit form 3 times quickly (use different emails)
2. Try 4th submission
3. Verify rate limit error

**Expected Result:**
- ✅ First 3 submissions succeed
- ❌ 4th submission blocked
- Error: "Too many submission attempts. Please try again in 1 hour."

### 6. Test CSRF Protection

**Steps:**
1. Open browser DevTools
2. Try to submit form without CSRF token
3. Verify error

**Expected Result:**
- ❌ Submission blocked
- Error: "Invalid security token"

---

## BASEROW FIELD MAPPING

| Form Field | Baserow Field ID | Type | Example |
|------------|------------------|------|---------|
| Tour Name (hardcoded) | field_4789 | Text | "Rwanda In 7 Days – Signature Circuit (Premium)" |
| departureDate | field_4790 | Date | "2024-03-15" |
| groupSize | field_4791 | Text | "2" |
| tier | field_4792 | Text | "Premium" |
| rooming | field_4793 | Text | "King" |
| language | field_4794 | Text | "English" |
| fullName | field_4795 | Text | "Jane Marie Doe" |
| email | field_4796 | Email | "jane@example.com" |
| whatsapp | field_4797 | Phone | "+250123456789" |
| nationality | field_4798 | Text | "American" |
| dateOfBirth | field_4799 | Date | "1990-01-15" |
| passportConfirmed | field_4800 | Boolean | true |
| dietary | field_4801 | Text | "Vegetarian" |
| notes | field_4802 | Text | "First time in Africa" |
| source | field_4803 | Text | "Google" |
| Agent (hardcoded) | field_4804 | Text | "Unassigned" |
| Status (hardcoded) | field_4805 | Text | "New" |
| Payment Fields | field_4806-4812 | Number | "0" (7 fields) |
| Timestamp | field_4813 | DateTime | "2024-01-15T10:30:00Z" |
| Payment Status | field_4814 | Text | "Pending" |
| Permit Status | field_4815 | Text | "Not Issued" |
| Reference | field_4816 | Text | "RW7D-20240115-042" |

---

## TROUBLESHOOTING

### Issue: CORS Error

**Symptom:** "Access to fetch has been blocked by CORS policy"

**Solution:**
1. Check that XAMPP Apache is running
2. Verify `ALLOWED_ORIGINS` in `api/config.php` includes your frontend URL
3. Clear browser cache
4. Check browser console for exact error

### Issue: CSRF Token Error

**Symptom:** "Invalid security token"

**Solution:**
1. Ensure cookies are enabled in browser
2. Check that `session_start()` is working in PHP
3. Verify frontend is sending `credentials: 'include'`
4. Clear browser cookies and try again

### Issue: Baserow API Error

**Symptom:** "Failed to submit booking"

**Solution:**
1. Verify Baserow token is valid
2. Check Baserow table ID is correct
3. Verify all field IDs match Baserow schema
4. Check PHP error logs: `xampp/apache/logs/error.log`

### Issue: Rate Limit Not Working

**Symptom:** Can submit more than 3 times

**Solution:**
1. Check `api/submissions.json` file exists and is writable
2. Verify file permissions (should be writable by Apache)
3. Check PHP error logs for file write errors

---

## SECURITY NOTES

### ⚠️ IMPORTANT FOR PRODUCTION

1. **Update ALLOWED_ORIGINS** in `api/config.php` with your production domain
2. **Disable error display** in `api/config.php`:
   ```php
   ini_set('display_errors', 0);
   ```
3. **Enable HTTPS** - Never run in production without SSL
4. **Rotate Baserow token** regularly
5. **Monitor `submissions.json`** file size (clean up periodically)
6. **Set up proper logging** for security events
7. **Add backup** for submissions.json file

### 🔒 Security Features Implemented

- ✅ API credentials hidden from client
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Input sanitization
- ✅ SQL injection prevention
- ✅ XSS prevention
- ✅ CORS whitelist
- ✅ Duplicate prevention

---

## MAINTENANCE

### Clean Up Old Submissions

The system automatically cleans up old entries, but you can manually clean:

```php
// Run this periodically (e.g., weekly cron job)
<?php
require_once 'api/security.php';
// Cleanup happens automatically on each request
?>
```

### Monitor Submission Rate

Check `api/submissions.json` to see submission patterns:

```json
{
  "rate_limits": {
    "192.168.1.100": [1705320000, 1705320100]
  },
  "submissions": {
    "test@example.com": 1705320000
  }
}
```

---

## SUPPORT

For issues or questions:
1. Check PHP error logs: `xampp/apache/logs/error.log`
2. Check browser console for JavaScript errors
3. Verify Baserow API is accessible
4. Test API endpoints directly with Postman/curl

---

**Implementation Date:** January 2024
**Version:** 1.0.0
**Status:** ✅ Production Ready
