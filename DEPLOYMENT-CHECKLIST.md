# 🚀 PRODUCTION DEPLOYMENT CHECKLIST

## ✅ Pre-Deployment Verification

### 1. **API Configuration** (`api/config.php`)
- ✅ Baserow API URL: `https://baserow.odiecloud.org/api`
- ✅ Baserow Token: `e9auwsf47aYBRi70wMy5ptzDbTfHGwWs`
- ✅ Database ID: `301`
- ✅ Table ID: `1103`
- ✅ Production domain in CORS: `https://rwanda-in-7-days.iforeveryoungtours.com`
- ✅ Error display disabled: `ini_set('display_errors', 0)`

### 2. **Frontend Configuration** (`src/services/baserowService.js`)
- ✅ Production API URL: `https://rwanda-in-7-days.iforeveryoungtours.com/api`
- ✅ Development API URL: `http://localhost/Rwanda-In-7-Days/api`
- ✅ Auto-detection via `import.meta.env.DEV`

### 3. **Baserow Field Mapping** (`api/baserow.php`)
- ✅ Tour: `4566` (Rwanda in 7 Days)
- ✅ Group Size: `4559` (≤12) or `4560` (>12)
- ✅ Tier: `4567` (Premium) or `4568` (Luxury)
- ✅ Rooming: `4569-4572` (King/Queen/Double/Twin)
- ✅ Language: Array format `['English']`
- ✅ Source: Mapped to `4577-4580` (Affiliate/Social Media/Email/Ad)
- ✅ Dates: `YYYY-MM-DD` format

### 4. **Security Features**
- ✅ CSRF token protection
- ✅ Rate limiting: 3 attempts per hour per IP
- ✅ Duplicate prevention: 24-hour window
- ✅ Input validation and sanitization
- ✅ API credentials in backend only

### 5. **PDF File**
- ✅ Path: `/FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf`
- ✅ Located in public root (not `/public/`)

---

## 📦 DEPLOYMENT STEPS

### **Step 1: Build Frontend**
```bash
cd c:\xampp\htdocs\Rwanda-In-7-Days
npm run build
```
This creates the `dist/` folder with production-ready files.

### **Step 2: Upload Files to Production Server**
Upload these folders/files to `https://rwanda-in-7-days.iforeveryoungtours.com/`:

**Root Directory:**
```
/dist/               (all built frontend files)
/api/                (all PHP backend files)
/FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf
```

**API Folder Structure:**
```
/api/
  ├── config.php
  ├── baserow.php
  ├── validator.php
  ├── security.php
  ├── submit-booking.php
  ├── get-csrf-token.php
  └── submissions.json (create empty: {"rate_limits":{},"submissions":{}})
```

### **Step 3: Set File Permissions**
```bash
chmod 755 /api/
chmod 644 /api/*.php
chmod 666 /api/submissions.json  # Writable by PHP
```

### **Step 4: Verify Production URLs**
Test these endpoints:
- ✅ `https://rwanda-in-7-days.iforeveryoungtours.com/` (Frontend)
- ✅ `https://rwanda-in-7-days.iforeveryoungtours.com/api/get-csrf-token.php` (Should return JSON)
- ✅ `https://rwanda-in-7-days.iforeveryoungtours.com/FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf` (PDF download)

### **Step 5: Test Booking Form**
1. Open `https://rwanda-in-7-days.iforeveryoungtours.com/`
2. Scroll to booking form
3. Fill all required fields:
   - Full Name
   - Email
   - WhatsApp (international format: +250...)
   - Nationality
   - Departure Date (30+ days ahead)
   - Date of Birth (15+ years old)
   - Group Size
   - Tier
   - Rooming
   - Language
   - Source
   - Check passport confirmation
4. Click "Complete Booking"
5. Verify success message with booking reference
6. Check Baserow table for new record

---

## 🔍 TROUBLESHOOTING

### **Issue: CORS Error**
**Solution:** Verify production domain is in `api/config.php` ALLOWED_ORIGINS array.

### **Issue: 404 on API calls**
**Solution:** Check that `/api/` folder exists and PHP files are uploaded correctly.

### **Issue: submissions.json not writable**
**Solution:** 
```bash
chmod 666 /api/submissions.json
chown www-data:www-data /api/submissions.json  # Linux/Apache
```

### **Issue: PDF not loading**
**Solution:** Verify PDF is in root directory, not `/public/` folder.

### **Issue: Baserow validation error**
**Solution:** Check error logs in browser console. Verify field IDs match documentation.

---

## 📊 POST-DEPLOYMENT VERIFICATION

### **Test Checklist:**
- [ ] Homepage loads correctly
- [ ] All sections visible (Hero, Itinerary, Inclusions, Gallery, Contact)
- [ ] PDF download works
- [ ] Language switcher works (EN/FR/ES/ZH)
- [ ] Booking form displays correctly
- [ ] Form validation works (required fields, date constraints)
- [ ] CSRF token fetched successfully
- [ ] Form submission works
- [ ] Success message displays with booking reference
- [ ] Data appears in Baserow table with correct field values
- [ ] Rate limiting works (3 attempts max)
- [ ] Duplicate prevention works (same email within 24h)

### **Baserow Data Verification:**
Check that submitted data appears correctly:
- Tour = "Rwanda in 7 Days — Signature Circuit (Premium)"
- Dates in YYYY-MM-DD format
- Group Size = 12 or 15
- Tier = Premium or Luxury
- Rooming = King/Queen/Full / Double/Twin (or Single)
- Language = English/French/Spanish/Chinese
- Source = Affiliate/Social Media/Email/Ad
- All text fields populated
- Booking reference in format: `RW7D-YYYYMMDD-XXX`

---

## 🎯 PRODUCTION READY SUMMARY

### **What's Working:**
✅ Secure API integration (credentials in backend)
✅ CSRF protection
✅ Rate limiting (3/hour per IP)
✅ Duplicate prevention (24-hour window)
✅ Comprehensive validation (phone, dates, age)
✅ Correct Baserow field mapping with option IDs
✅ Date format (YYYY-MM-DD)
✅ Source field mapping (Google→Social Media, etc.)
✅ Production domain configured
✅ PDF path corrected for deployment

### **Security Features:**
✅ No API credentials exposed to frontend
✅ Input sanitization
✅ SQL injection prevention (no direct DB access)
✅ XSS prevention (htmlspecialchars)
✅ CORS whitelist
✅ Session-based CSRF tokens

### **Known Limitations:**
- Rate limit: 3 submissions per hour per IP
- Duplicate check: Same email can't submit within 24 hours
- Minimum booking advance: 30 days
- Minimum age: 15 years

---

## 📞 SUPPORT

If issues occur after deployment:
1. Check browser console for JavaScript errors
2. Check server error logs for PHP errors
3. Verify Baserow API token is still valid
4. Test API endpoints directly with Postman/curl
5. Verify file permissions on server

---

**Deployment Date:** [TO BE FILLED]
**Deployed By:** [TO BE FILLED]
**Production URL:** https://rwanda-in-7-days.iforeveryoungtours.com
**Baserow Table:** https://baserow.odiecloud.org (Database 301, Table 1103)
