# 📊 BOOKING FORM - SYSTEM FLOW DIAGRAM

## 🔄 COMPLETE DATA FLOW

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERACTION                             │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND (Contact.jsx)                      │
│  • Form with 13 fields                                               │
│  • Client-side validation (HTML5)                                    │
│  • Date constraints (min/max)                                        │
│  • Phone pattern validation                                          │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│              BASEROW SERVICE (baserowService.js)                     │
│  1. Fetch CSRF token from backend                                    │
│  2. Prepare submission data                                          │
│  3. POST to PHP backend API                                          │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  PHP BACKEND (submit-booking.php)                    │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ STEP 1: Security Checks                                        │  │
│  │  ✓ Validate CSRF token                                         │  │
│  │  ✓ Check rate limiting (3/hour per IP)                         │  │
│  │  ✓ Check duplicate email (24h window)                          │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                  │                                   │
│                                  ▼                                   │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ STEP 2: Validation (validator.php)                            │  │
│  │  ✓ Email format                                                │  │
│  │  ✓ Phone format (+[country][10-15 digits])                    │  │
│  │  ✓ Departure date (30+ days advance)                          │  │
│  │  ✓ Date of birth (15+ years old)                              │  │
│  │  ✓ Required fields                                             │  │
│  │  ✓ Select field options                                        │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                  │                                   │
│                                  ▼                                   │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ STEP 3: Sanitization                                           │  │
│  │  ✓ Strip HTML tags                                             │  │
│  │  ✓ Escape special characters                                   │  │
│  │  ✓ Trim whitespace                                             │  │
│  │  ✓ Lowercase email                                             │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                  │                                   │
│                                  ▼                                   │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ STEP 4: Baserow Submission (baserow.php)                      │  │
│  │  • Generate reference (RW7D-YYYYMMDD-XXX)                     │  │
│  │  • Map 26 fields to Baserow schema                            │  │
│  │  • POST to Baserow API                                         │  │
│  │  • Handle errors                                                │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BASEROW API (External Service)                    │
│  • Receives POST request                                             │
│  • Validates authentication token                                    │
│  • Creates new row in table 1103                                     │
│  • Returns success/error response                                    │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         RESPONSE FLOW                                │
│  Success: 200 OK                                                     │
│  {                                                                    │
│    "success": true,                                                  │
│    "reference": "RW7D-20240115-042",                                 │
│    "message": "Booking submitted successfully"                       │
│  }                                                                    │
│                                                                       │
│  Error: 400/409/429/500                                              │
│  {                                                                    │
│    "success": false,                                                 │
│    "error": "Error message"                                          │
│  }                                                                    │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    FRONTEND RESPONSE HANDLING                        │
│  Success:                                                            │
│  • Display success message                                           │
│  • Show booking reference                                            │
│  • Enable copy button                                                │
│  • Auto-reset form after 10 seconds                                  │
│                                                                       │
│  Error:                                                              │
│  • Display error message                                             │
│  • Keep form data                                                    │
│  • Allow retry                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔒 SECURITY LAYERS

```
┌─────────────────────────────────────────────────────────────────────┐
│                         SECURITY STACK                               │
├─────────────────────────────────────────────────────────────────────┤
│ Layer 1: CORS Protection                                             │
│  • Whitelist allowed origins                                         │
│  • Reject unauthorized domains                                       │
├─────────────────────────────────────────────────────────────────────┤
│ Layer 2: CSRF Protection                                             │
│  • Token generation on page load                                     │
│  • Token validation on submission                                    │
│  • Session-based storage                                             │
├─────────────────────────────────────────────────────────────────────┤
│ Layer 3: Rate Limiting                                               │
│  • 3 attempts per hour per IP                                        │
│  • Persistent tracking                                               │
│  • Auto-cleanup old entries                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Layer 4: Duplicate Prevention                                        │
│  • Email-based tracking                                              │
│  • 24-hour cooldown                                                  │
│  • Persistent storage                                                │
├─────────────────────────────────────────────────────────────────────┤
│ Layer 5: Input Sanitization                                          │
│  • HTML tag stripping                                                │
│  • Special character escaping                                        │
│  • XSS prevention                                                    │
├─────────────────────────────────────────────────────────────────────┤
│ Layer 6: Validation                                                  │
│  • Server-side validation                                            │
│  • Type checking                                                     │
│  • Format validation                                                 │
├─────────────────────────────────────────────────────────────────────┤
│ Layer 7: API Credential Protection                                   │
│  • Credentials in PHP backend                                        │
│  • Not exposed to client                                             │
│  • Protected by .htaccess                                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 VALIDATION FLOW

```
┌─────────────────────────────────────────────────────────────────────┐
│                      VALIDATION PIPELINE                             │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
        ┌───────────────────┐       ┌───────────────────┐
        │ CLIENT-SIDE       │       │ SERVER-SIDE       │
        │ VALIDATION        │       │ VALIDATION        │
        │ (HTML5)           │       │ (PHP)             │
        └───────────────────┘       └───────────────────┘
                    │                           │
                    │                           │
        ┌───────────┴───────────┐   ┌───────────┴───────────┐
        │                       │   │                       │
        ▼                       ▼   ▼                       ▼
    Required              Pattern   Type                Format
    Attributes            Matching  Checking            Validation
        │                       │   │                       │
        │                       │   │                       │
        └───────────┬───────────┘   └───────────┬───────────┘
                    │                           │
                    ▼                           ▼
            ┌───────────────┐         ┌───────────────┐
            │ Basic Check   │         │ Deep Check    │
            │ • Not empty   │         │ • Email valid │
            │ • Format OK   │         │ • Phone valid │
            │               │         │ • Date valid  │
            │               │         │ • Age valid   │
            └───────────────┘         └───────────────┘
                    │                           │
                    └───────────┬───────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │ SANITIZATION          │
                    │ • Strip HTML          │
                    │ • Escape chars        │
                    │ • Trim spaces         │
                    └───────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │ READY FOR SUBMISSION  │
                    └───────────────────────┘
```

---

## 🎯 ERROR HANDLING FLOW

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ERROR SCENARIOS                              │
└─────────────────────────────────────────────────────────────────────┘

Scenario 1: VALIDATION ERROR (400)
    User Input → Validation Fails → Return Field Errors → Display to User

Scenario 2: DUPLICATE EMAIL (409)
    Email Check → Found in Last 24h → Return Error → Show Cooldown Time

Scenario 3: RATE LIMIT (429)
    IP Check → 3+ Attempts in 1h → Return Error → Show Wait Time

Scenario 4: CSRF ERROR (403)
    Token Check → Invalid/Missing → Return Error → Refresh Page

Scenario 5: BASEROW ERROR (500)
    API Call → Network/Auth Error → Return Error → Retry Option

Scenario 6: SUCCESS (200)
    All Checks Pass → Baserow Success → Return Reference → Show Success
```

---

## 📁 FILE ARCHITECTURE

```
Rwanda-In-7-Days/
│
├── 🌐 FRONTEND (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   └── Contact.jsx ..................... Form UI + Validation
│   │   └── services/
│   │       └── baserowService.js ............... API Communication
│   │
│   └── public/
│       └── images/ ............................. Static assets
│
├── 🔧 BACKEND (PHP)
│   └── api/
│       ├── config.php .......................... Configuration
│       ├── validator.php ....................... Validation Logic
│       ├── security.php ........................ Security Features
│       ├── baserow.php ......................... Baserow Integration
│       ├── submit-booking.php .................. Main Endpoint
│       ├── get-csrf-token.php .................. CSRF Endpoint
│       ├── .htaccess ........................... Security Rules
│       └── submissions.json .................... Tracking Data
│
├── 🧪 TESTING
│   └── test-api.html ........................... Test Suite
│
└── 📚 DOCUMENTATION
    ├── SETUP_GUIDE.md .......................... Quick Start
    ├── BOOKING_FORM_DOCUMENTATION.md ........... Full Docs
    ├── IMPLEMENTATION_SUMMARY.md ............... This Summary
    └── SYSTEM_FLOW.md .......................... This File
```

---

## 🔄 REQUEST/RESPONSE EXAMPLES

### Example 1: Successful Submission

**Request:**
```http
POST /api/submit-booking.php HTTP/1.1
Content-Type: application/json

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

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "reference": "RW7D-20240115-042",
  "message": "Booking submitted successfully"
}
```

### Example 2: Validation Error

**Request:**
```http
POST /api/submit-booking.php HTTP/1.1
Content-Type: application/json

{
  "fullName": "Jane Doe",
  "email": "invalid-email",
  "whatsapp": "1234567890",
  "departureDate": "2024-01-01",
  ...
}
```

**Response:**
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "success": false,
  "error": "Please correct the following errors",
  "errors": {
    "email": "Invalid email format",
    "whatsapp": "WhatsApp number must be in international format",
    "departureDate": "Departure date cannot be in the past"
  }
}
```

### Example 3: Duplicate Email

**Response:**
```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "success": false,
  "error": "A booking with this email was already submitted. Please wait 18 hours before submitting again or contact us directly."
}
```

### Example 4: Rate Limit

**Response:**
```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json

{
  "success": false,
  "error": "Too many submission attempts. Please try again in 1 hour."
}
```

---

## 🎯 TESTING FLOW

```
┌─────────────────────────────────────────────────────────────────────┐
│                         TESTING SEQUENCE                             │
└─────────────────────────────────────────────────────────────────────┘

Step 1: Start XAMPP Apache
    ↓
Step 2: Open test-api.html
    ↓
Step 3: Run Test 1 (CSRF Token)
    ✓ Should return token
    ↓
Step 4: Run Test 2 (Valid Submission)
    ✓ Should succeed with reference
    ↓
Step 5: Run Test 3 (Invalid Phone)
    ✗ Should fail with validation error
    ↓
Step 6: Run Test 4 (Past Date)
    ✗ Should fail with date error
    ↓
Step 7: Run Test 5 (Duplicate)
    ✗ Should fail with duplicate error
    ↓
Step 8: Check Baserow
    ✓ Verify record exists
    ↓
Step 9: Test Live Form
    ✓ Submit via React app
    ↓
Step 10: Verify Complete Flow
    ✓ All features working
```

---

**Status:** ✅ PRODUCTION READY
**Version:** 1.0.0
**Last Updated:** January 2024
