# 🚀 QUICK REFERENCE CARD

## ⚡ INSTANT START

```bash
# 1. Start Apache
Open XAMPP → Start Apache

# 2. Test API
http://localhost/Rwanda-In-7-Days/test-api.html

# 3. Start React
cd c:\xampp\htdocs\Rwanda-In-7-Days
npm run dev

# 4. Open App
http://localhost:5173
```

---

## 📍 KEY ENDPOINTS

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/get-csrf-token.php` | GET | Get CSRF token |
| `/api/submit-booking.php` | POST | Submit booking |

---

## 🔑 VALIDATION QUICK REFERENCE

| Field | Rule | Example |
|-------|------|---------|
| **Phone** | `+[country][10-15 digits]` | `+250123456789` |
| **Departure** | `30+ days advance` | `2024-03-15` |
| **Age** | `15+ years old` | `1990-01-15` |
| **Email** | `valid format` | `user@example.com` |

---

## 🛡️ SECURITY FEATURES

- ✅ CSRF Protection
- ✅ Rate Limiting (3/hour)
- ✅ Duplicate Prevention (24h)
- ✅ Input Sanitization
- ✅ API Credentials Hidden

---

## 📊 HTTP STATUS CODES

| Code | Meaning |
|------|---------|
| `200` | Success |
| `400` | Validation Error |
| `403` | CSRF Error |
| `409` | Duplicate Email |
| `429` | Rate Limit |
| `500` | Server Error |

---

## 🧪 QUICK TEST

```javascript
// 1. Get CSRF Token
fetch('/api/get-csrf-token.php', { credentials: 'include' })

// 2. Submit Booking
fetch('/api/submit-booking.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ ...data, csrfToken })
})
```

---

## 📁 FILE LOCATIONS

```
api/
├── config.php ............... Configuration
├── submit-booking.php ....... Main endpoint
└── get-csrf-token.php ....... CSRF endpoint

src/
├── services/baserowService.js ... API calls
└── components/Contact.jsx ....... Form UI
```

---

## 🔧 TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| CORS Error | Check `ALLOWED_ORIGINS` in config.php |
| CSRF Error | Clear cookies, refresh page |
| Rate Limit | Wait 1 hour or clear `submissions.json` |
| Baserow Error | Check token, table ID, internet |

---

## 📝 BASEROW MAPPING

```
Form Field → Baserow Field ID
─────────────────────────────
fullName → field_4795
email → field_4796
whatsapp → field_4797
departureDate → field_4790
dateOfBirth → field_4799
groupSize → field_4791
tier → field_4792
rooming → field_4793
language → field_4794
nationality → field_4798
source → field_4803
dietary → field_4801
notes → field_4802
passportConfirmed → field_4800
reference → field_4816 (auto-generated)
```

---

## 🎯 SUCCESS RESPONSE

```json
{
  "success": true,
  "reference": "RW7D-20240115-042",
  "message": "Booking submitted successfully"
}
```

---

## ❌ ERROR RESPONSE

```json
{
  "success": false,
  "error": "Error message here",
  "errors": {
    "field": "Field-specific error"
  }
}
```

---

## 🔍 DEBUG CHECKLIST

- [ ] Apache running?
- [ ] PHP errors in `xampp/apache/logs/error.log`?
- [ ] Browser console errors?
- [ ] Network tab shows request?
- [ ] CSRF token present?
- [ ] Baserow token valid?
- [ ] Table ID correct (1103)?

---

## 📞 SUPPORT FILES

- `SETUP_GUIDE.md` - Setup instructions
- `BOOKING_FORM_DOCUMENTATION.md` - Full docs
- `IMPLEMENTATION_SUMMARY.md` - What was built
- `SYSTEM_FLOW.md` - Flow diagrams
- `test-api.html` - Test suite

---

## ⚙️ CONFIGURATION

```php
// api/config.php

BASEROW_API_URL = 'https://baserow.odiecloud.org/api'
BASEROW_TABLE_ID = '1103'
RATE_LIMIT_MAX_ATTEMPTS = 3
RATE_LIMIT_WINDOW = 3600 (1 hour)
DUPLICATE_CHECK_WINDOW = 86400 (24 hours)
MIN_AGE_YEARS = 15
MIN_DAYS_ADVANCE = 30
```

---

## 🎨 FORM FIELDS (13)

1. Full Name *
2. Email *
3. WhatsApp *
4. Nationality *
5. Departure Date *
6. Date of Birth *
7. Group Size *
8. Tier *
9. Rooming *
10. Language *
11. Source *
12. Dietary
13. Notes
14. Passport Confirmed * (checkbox)

---

## 🔄 REFERENCE FORMAT

```
Pattern: RW7D-YYYYMMDD-XXX
Example: RW7D-20240115-042

RW7D = Rwanda 7 Days
YYYYMMDD = Date
XXX = Random 3 digits
```

---

## 💾 DATA STORAGE

```
submissions.json
{
  "rate_limits": {
    "IP_ADDRESS": [timestamp1, timestamp2, ...]
  },
  "submissions": {
    "email@example.com": timestamp
  }
}
```

---

## 🚀 DEPLOYMENT

```bash
# Production Checklist
1. Update ALLOWED_ORIGINS
2. Enable HTTPS
3. Disable error display
4. Test all features
5. Monitor logs
6. Backup submissions.json
```

---

**Quick Help:** Open `test-api.html` for interactive testing!

**Status:** ✅ READY TO USE
