# HOSTINGER DEPLOYMENT GUIDE - COMPLETE
## Rwanda In 7 Days - Production Deployment

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### ✅ What's Working
- [x] Booking form with 4-step wizard
- [x] CSRF security tokens
- [x] Rate limiting (3 attempts per hour)
- [x] Duplicate email prevention (24 hours)
- [x] Baserow integration
- [x] Success message with booking reference
- [x] Multi-language support
- [x] Responsive design
- [x] Session management (auto-detects localhost vs production)

### ✅ Files Ready
- [x] React frontend (Vite)
- [x] PHP backend API
- [x] Security system
- [x] Validation system
- [x] Configuration files

---

## 🚀 DEPLOYMENT STEPS

### STEP 1: Build the React Application

1. **Open Command Prompt/Terminal** in project folder:
   ```bash
   cd c:\xampp\htdocs\Rwanda-In-7-Days
   ```

2. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Verify build**:
   - Check that `dist` folder was created
   - Should contain: `index.html`, `assets/` folder with JS and CSS files

---

### STEP 2: Prepare Files for Upload

Create a folder structure like this:

```
rwanda-deployment/
├── index.html (from dist/)
├── assets/ (from dist/)
│   ├── index-[hash].js
│   └── index-[hash].css
├── api/
│   ├── .htaccess
│   ├── baserow.php
│   ├── config.php
│   ├── get-csrf-token.php
│   ├── security.php
│   ├── submit-booking.php
│   ├── validator.php
│   ├── submissions.json (empty: {})
│   └── logs/
│       └── php_errors.log (empty file)
├── public/
│   └── images/ (all your images)
└── .htaccess (root)
```

---

### STEP 3: Update Configuration Files

#### A. Update `api/config.php`

**IMPORTANT:** Update these values:

```php
// Baserow Configuration
define('BASEROW_API_URL', 'https://baserow.odiecloud.org/api');
define('BASEROW_TOKEN', 'YOUR_ACTUAL_BASEROW_TOKEN'); // ⚠️ UPDATE THIS
define('BASEROW_DATABASE_ID', 'YOUR_DATABASE_ID'); // ⚠️ UPDATE THIS
define('BASEROW_TABLE_ID', 'YOUR_TABLE_ID'); // ⚠️ UPDATE THIS

// CORS Configuration
define('ALLOWED_ORIGINS', [
    'https://rwanda-in-7-days.iforeveryoungtours.com',
    'https://www.rwanda-in-7-days.iforeveryoungtours.com',
    // Add your actual domain here
]);
```

#### B. Create Root `.htaccess`

Create this file in the root directory:

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Enable CORS
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, X-CSRF-Token"
</IfModule>

# Prevent directory listing
Options -Indexes

# Protect sensitive files
<FilesMatch "\.(json|log|md)$">
    Order allow,deny
    Deny from all
</FilesMatch>
```

---

### STEP 4: Upload to Hostinger

#### Using File Manager:

1. **Login to Hostinger**
   - Go to hPanel
   - Select your domain
   - Click "File Manager"

2. **Navigate to public_html**
   - Delete default files (index.html, etc.)

3. **Upload Files**:
   - Upload `index.html` to root
   - Upload `assets/` folder
   - Upload `api/` folder
   - Upload `public/` folder
   - Upload root `.htaccess`

4. **Set Permissions**:
   ```
   api/logs/ → 755 (writable)
   api/submissions.json → 644 (writable)
   api/logs/php_errors.log → 644 (writable)
   ```

#### Using FTP (Alternative):

1. **Get FTP Credentials** from Hostinger hPanel
2. **Use FileZilla** or similar FTP client
3. **Upload all files** to `public_html/`

---

### STEP 5: Configure Hostinger Settings

#### A. PHP Settings

1. Go to **hPanel → Advanced → PHP Configuration**
2. Set PHP version: **8.0 or higher**
3. Enable these extensions:
   - `curl`
   - `json`
   - `session`
   - `mbstring`

#### B. Create Subdomain (if needed)

1. Go to **hPanel → Domains**
2. Click **Create Subdomain**
3. Enter: `rwanda-in-7-days`
4. Point to: `public_html/`

---

### STEP 6: Test the Deployment

#### A. Test Homepage
```
https://rwanda-in-7-days.iforeveryoungtours.com
```
- Should load without errors
- Check browser console (F12) for errors

#### B. Test API Endpoints

**Test Session:**
```
https://rwanda-in-7-days.iforeveryoungtours.com/api/test-session.php
```
Expected response:
```json
{
  "success": true,
  "sessionStatus": 2,
  "sessionStatusText": "ACTIVE",
  "sessionId": "...",
  "testValue": "Session is working!"
}
```

**Test CSRF Token:**
```
https://rwanda-in-7-days.iforeveryoungtours.com/api/get-csrf-token.php
```
Expected response:
```json
{
  "success": true,
  "csrfToken": "abc123..."
}
```

#### C. Test Booking Form

1. Go to the contact section
2. Fill out all fields
3. Submit the form
4. Should see success message with booking reference
5. Check Baserow to confirm submission

---

## 🔧 TROUBLESHOOTING

### Issue 1: "Security initialization failed"

**Solution:**
1. Check `api/config.php` - verify ALLOWED_ORIGINS includes your domain
2. Test: `https://yourdomain.com/api/test-session.php`
3. Check PHP session is enabled in Hostinger

### Issue 2: "Failed to submit booking"

**Solution:**
1. Verify Baserow credentials in `api/config.php`
2. Check `api/logs/php_errors.log` for errors
3. Test Baserow connection directly

### Issue 3: 404 Errors on API

**Solution:**
1. Verify `.htaccess` files are uploaded
2. Check file permissions (644 for files, 755 for folders)
3. Ensure mod_rewrite is enabled

### Issue 4: CORS Errors

**Solution:**
1. Add your domain to ALLOWED_ORIGINS in `api/config.php`
2. Check root `.htaccess` has CORS headers
3. Clear browser cache

### Issue 5: Images Not Loading

**Solution:**
1. Verify `public/images/` folder uploaded correctly
2. Check image paths in code
3. Ensure images are referenced correctly

---

## 📁 FILE PERMISSIONS

Set these permissions on Hostinger:

```
Folders: 755
Files: 644
Writable folders/files:
  - api/logs/ → 755
  - api/submissions.json → 666
  - api/logs/php_errors.log → 666
```

---

## 🔐 SECURITY CHECKLIST

- [x] HTTPS enabled (forced via .htaccess)
- [x] CSRF tokens implemented
- [x] Rate limiting active
- [x] Duplicate prevention enabled
- [x] Session security configured
- [x] Input validation on all fields
- [x] SQL injection prevention (using Baserow API)
- [x] XSS prevention (sanitization)
- [x] Error logging enabled
- [x] Sensitive files protected

---

## 📊 POST-DEPLOYMENT VERIFICATION

### 1. Functionality Tests
- [ ] Homepage loads correctly
- [ ] All sections display properly
- [ ] Images load
- [ ] Navigation works
- [ ] Language switcher works
- [ ] Booking form displays
- [ ] Form validation works
- [ ] Form submission succeeds
- [ ] Success message displays
- [ ] Booking reference shows
- [ ] Copy button works

### 2. API Tests
- [ ] Session endpoint works
- [ ] CSRF token endpoint works
- [ ] Booking submission works
- [ ] Data appears in Baserow
- [ ] Rate limiting works
- [ ] Duplicate prevention works

### 3. Browser Tests
Test on:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Chrome
- [ ] Mobile Safari

### 4. Performance Tests
- [ ] Page loads in < 3 seconds
- [ ] Images optimized
- [ ] No console errors
- [ ] No 404 errors

---

## 🎯 QUICK DEPLOYMENT COMMANDS

```bash
# 1. Build the project
npm run build

# 2. The dist/ folder contains everything you need
# Upload these files to Hostinger:
# - dist/index.html → public_html/index.html
# - dist/assets/ → public_html/assets/
# - api/ → public_html/api/
# - public/ → public_html/public/
```

---

## 📞 SUPPORT CONTACTS

**Hostinger Support:**
- Live Chat: Available 24/7 in hPanel
- Email: support@hostinger.com

**Baserow Support:**
- Documentation: https://baserow.io/docs
- Community: https://community.baserow.io

---

## 🔄 UPDATING THE SITE

To update after deployment:

1. Make changes locally
2. Test locally: `npm run dev`
3. Build: `npm run build`
4. Upload only changed files to Hostinger
5. Clear browser cache
6. Test live site

---

## ✅ DEPLOYMENT COMPLETE!

Your site should now be live at:
**https://rwanda-in-7-days.iforeveryoungtours.com**

Test everything thoroughly before announcing!

---

## 📝 NOTES

- Keep a backup of your files
- Monitor `api/logs/php_errors.log` for issues
- Check Baserow regularly for submissions
- Update Baserow credentials if they change
- Keep this guide for future reference
