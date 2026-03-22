# HOSTINGER PRODUCTION DEPLOYMENT GUIDE
## Rwanda in 7 Days - Complete Setup

---

## 📋 IMAGE PATHS VERIFICATION

All images are correctly configured for production. Here's the complete list:

### ✅ Logo & Branding
- **Header Logo**: `images/logo.png`
- **Footer Logo**: `images/logo.png`

### ✅ Hero Section
- **Background**: `images/placeholder.png`

### ✅ CTA Section
- **Newsletter Image**: `images/news letter 2.jpg`

### ✅ Itinerary Section (8 Days)
1. **Sunday Arrival**: `kigali-nightfall.jpg`
2. **Day 1 (Monday)**: `Kigali-Genocide-Memorial.jpg`
3. **Day 2 (Tuesday)**: `images/Akagera-Safari1.jpg`
4. **Day 3 (Wednesday)**: `gorilla-village-dance7.jpg`
5. **Day 4 (Thursday)**: `images/gorilla-trekking-volcanoes.jpg`
6. **Day 5 (Friday)**: `Lake-Kivu-Kayaking.jpg`
7. **Day 6 (Saturday)**: `nyungwe-canopy-walk.jpg`
8. **Day 7 (Sunday)**: `Kings-palace-museum.jpg`

### ✅ Highlights Section (4 Cards)
1. **Gorilla & Chimpanzee**: `images/chimpanzee.jpg`
2. **Akagera Safari**: `images/Akagera-Safari4.jpg`
3. **Kigali Culture**: `images/Kigali & Cultural Moments.jpg`
4. **Premium Lodging**: `images/lodging.jpg`

### ✅ Reviews Section
- **QR Code**: `images/QR code.png`

### ✅ PDF Document
- **Tour Brochure**: `FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf`

---

## 🚀 HOSTINGER DEPLOYMENT STEPS

### STEP 1: Build Production Files

On your local machine:
```bash
cd c:\xampp\htdocs\Rwanda-In-7-Days
npm run build
```

This creates a `dist/` folder with optimized production files.

---

### STEP 2: Prepare Files for Upload

Create this exact folder structure for upload:

```
rwanda-in-7-days/
├── index.html (from dist/)
├── assets/ (entire folder from dist/)
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── images/ (from public/images/)
│   ├── logo.png ⭐
│   ├── placeholder.png ⭐
│   ├── QR code.png ⭐
│   ├── news letter 2.jpg
│   ├── chimpanzee.jpg
│   ├── Akagera-Safari1.jpg
│   ├── Akagera-Safari4.jpg
│   ├── gorilla-trekking-volcanoes.jpg
│   ├── lodging.jpg
│   ├── Kigali & Cultural Moments.jpg
│   └── ... (all other images)
├── kigali-nightfall.jpg (from public/)
├── Kigali-Genocide-Memorial.jpg (from public/)
├── gorilla-village-dance7.jpg (from public/)
├── Lake-Kivu-Kayaking.jpg (from public/)
├── nyungwe-canopy-walk.jpg (from public/)
├── Kings-palace-museum.jpg (from public/)
├── api/
│   ├── config.php
│   ├── baserow.php
│   ├── submissions.json
│   └── .htaccess
└── FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf (from public/)
```

⭐ = Critical images that MUST be present

---

### STEP 3: Upload to Hostinger

#### Option A: Using File Manager (Recommended)

1. **Login to Hostinger**
   - Go to: https://hpanel.hostinger.com
   - Login with your credentials

2. **Navigate to File Manager**
   - Click on your domain: `rwanda-in-7-days.iforeveryoungtours.com`
   - Click "File Manager"

3. **Navigate to public_html**
   - Go to: `/domains/rwanda-in-7-days.iforeveryoungtours.com/public_html/`
   - Delete any existing files (if this is first deployment)

4. **Upload Files**
   - Upload `index.html` to root
   - Upload `assets/` folder (entire folder)
   - Upload `images/` folder (entire folder)
   - Upload individual image files (kigali-nightfall.jpg, etc.)
   - Upload `api/` folder (entire folder)
   - Upload PDF file

#### Option B: Using FTP (Alternative)

1. **Get FTP Credentials from Hostinger**
   - Host: `ftp.rwanda-in-7-days.iforeveryoungtours.com`
   - Username: (from Hostinger panel)
   - Password: (from Hostinger panel)
   - Port: 21

2. **Use FileZilla or Similar**
   - Connect to FTP
   - Navigate to `/public_html/`
   - Upload all files maintaining folder structure

---

### STEP 4: Set File Permissions on Hostinger

Using File Manager:

1. **Navigate to api folder**
2. **Right-click on `submissions.json`**
3. **Select "Permissions"**
4. **Set to: 666** (Read/Write for all)
5. **Click "Change"**

Or use this permission structure:
```
api/                    → 755
api/config.php          → 644
api/baserow.php         → 644
api/submissions.json    → 666 ⭐ (MUST be writable)
api/.htaccess           → 644
images/                 → 755
*.jpg, *.png            → 644
index.html              → 644
```

---

### STEP 5: Configure .htaccess (If Needed)

Create `.htaccess` in root (`public_html/`) if routing issues occur:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable CORS for API
<FilesMatch "\.(php)$">
  Header set Access-Control-Allow-Origin "*"
  Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
  Header set Access-Control-Allow-Headers "Content-Type"
</FilesMatch>

# Cache images
<FilesMatch "\.(jpg|jpeg|png|gif|svg|webp)$">
  Header set Cache-Control "max-age=2592000, public"
</FilesMatch>

# Cache CSS and JS
<FilesMatch "\.(css|js)$">
  Header set Cache-Control "max-age=604800, public"
</FilesMatch>
```

---

### STEP 6: Verify PHP Configuration

1. **Check PHP Version**
   - Go to Hostinger Panel → Advanced → PHP Configuration
   - Ensure PHP 7.4 or higher is selected
   - Recommended: PHP 8.0+

2. **Enable Required Extensions**
   - `curl` (for Baserow API)
   - `json` (for JSON handling)
   - `mbstring` (for string handling)

---

### STEP 7: Test Production Site

Visit: `https://rwanda-in-7-days.iforeveryoungtours.com/`

#### ✅ Visual Checks
- [ ] Logo appears in header
- [ ] Logo appears in footer
- [ ] Hero background image loads
- [ ] All 8 itinerary images load correctly
- [ ] All 4 highlights card images load
- [ ] QR code image loads in Reviews section
- [ ] CTA newsletter image loads
- [ ] No broken image icons (🖼️❌)

#### ✅ Functionality Checks
- [ ] Contact form step 1 works
- [ ] Contact form step 2 works
- [ ] Contact form step 3 works
- [ ] Contact form step 4 submits successfully
- [ ] Booking reference generated
- [ ] Reviews form tabs work
- [ ] PDF download link works
- [ ] All navigation links work
- [ ] Mobile menu works
- [ ] Responsive design works

#### ✅ API Checks
- [ ] Form creates record in Baserow
- [ ] Field mappings correct
- [ ] Date format correct (YYYY-MM-DD)
- [ ] Rate limiting works
- [ ] Error messages display

---

## 🔧 TROUBLESHOOTING ON HOSTINGER

### Issue: Images Not Loading

**Symptoms**: Broken image icons, missing logo, missing backgrounds

**Solutions**:
1. **Check file paths**
   - Verify images are in correct folders
   - Check capitalization (Linux is case-sensitive!)
   - `logo.png` ≠ `Logo.png` ≠ `LOGO.PNG`

2. **Check file permissions**
   ```
   images/ folder → 755
   All .jpg/.png → 644
   ```

3. **Clear browser cache**
   - Press Ctrl+Shift+R (Windows)
   - Press Cmd+Shift+R (Mac)

4. **Check File Manager**
   - Login to Hostinger
   - Navigate to `/public_html/images/`
   - Verify all images are present
   - Check file sizes (should not be 0 KB)

5. **Re-upload images**
   - Delete existing images folder
   - Re-upload from local `public/images/`

### Issue: Logo Not Showing

**Check these files**:
- `/public_html/images/logo.png` must exist
- File size should be ~5-50 KB (not 0 KB)
- Permissions: 644

**Test directly**:
Visit: `https://rwanda-in-7-days.iforeveryoungtours.com/images/logo.png`
- Should display the logo
- If 404 error → file missing
- If blank → file corrupted

### Issue: Hero Background Not Loading

**Check**:
- `/public_html/images/placeholder.png` exists
- File permissions: 644
- File size: Should be ~500KB-2MB

**Test directly**:
Visit: `https://rwanda-in-7-days.iforeveryoungtours.com/images/placeholder.png`

### Issue: Forms Not Submitting

**Check**:
1. **submissions.json permissions**
   - Must be 666 (writable)
   - Check in File Manager → Right-click → Permissions

2. **PHP errors**
   - Enable error logging in Hostinger
   - Check error logs in File Manager

3. **CORS issues**
   - Add `.htaccess` with CORS headers (see Step 5)

4. **API endpoint**
   - Test: `https://rwanda-in-7-days.iforeveryoungtours.com/api/baserow.php`
   - Should return JSON response

### Issue: PDF Not Downloading

**Check**:
- `/public_html/FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf` exists
- File permissions: 644
- File size: Should be ~2-10 MB

**Test directly**:
Visit: `https://rwanda-in-7-days.iforeveryoungtours.com/FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf`

---

## 📊 POST-DEPLOYMENT CHECKLIST

### Immediate (Within 1 Hour)
- [ ] All images load correctly
- [ ] Logo visible in header and footer
- [ ] Hero background displays
- [ ] Test form submission
- [ ] Verify Baserow record created
- [ ] Test on mobile device
- [ ] Test on different browsers (Chrome, Firefox, Safari)

### Day 1
- [ ] Monitor form submissions
- [ ] Check for PHP errors
- [ ] Verify email notifications (if configured)
- [ ] Test rate limiting (try 4 submissions)

### Week 1
- [ ] Review analytics
- [ ] Check page load speed
- [ ] Monitor user feedback
- [ ] Test all features again

---

## 🎯 CRITICAL FILES CHECKLIST

Before deployment, verify these files exist locally:

### Must Have - Images
- [ ] `public/images/logo.png` ⭐⭐⭐
- [ ] `public/images/placeholder.png` ⭐⭐⭐
- [ ] `public/images/QR code.png` ⭐⭐⭐
- [ ] `public/kigali-nightfall.jpg`
- [ ] `public/Kigali-Genocide-Memorial.jpg`
- [ ] `public/gorilla-village-dance7.jpg`
- [ ] `public/Lake-Kivu-Kayaking.jpg`
- [ ] `public/nyungwe-canopy-walk.jpg`
- [ ] `public/Kings-palace-museum.jpg`
- [ ] `public/images/Akagera-Safari1.jpg`
- [ ] `public/images/gorilla-trekking-volcanoes.jpg`
- [ ] `public/images/chimpanzee.jpg`
- [ ] `public/images/Akagera-Safari4.jpg`
- [ ] `public/images/Kigali & Cultural Moments.jpg`
- [ ] `public/images/lodging.jpg`
- [ ] `public/images/news letter 2.jpg`

### Must Have - Code
- [ ] `dist/index.html`
- [ ] `dist/assets/` folder
- [ ] `api/config.php`
- [ ] `api/baserow.php`
- [ ] `api/submissions.json`

### Must Have - Documents
- [ ] `public/FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf`

---

## 🆘 EMERGENCY CONTACTS

**Hostinger Support**:
- Live Chat: Available 24/7 in Hostinger panel
- Email: support@hostinger.com
- Knowledge Base: https://support.hostinger.com

**Developer Support**:
- Check `FINAL-DEPLOYMENT-CHECKLIST.md` for detailed troubleshooting
- Review browser console for JavaScript errors (F12)
- Check Network tab for failed image requests

---

## ✅ DEPLOYMENT COMPLETE

Once all checks pass:

**Production URL**: https://rwanda-in-7-days.iforeveryoungtours.com/

**Status**: 🟢 LIVE

**Last Updated**: _____________

**Deployed By**: _____________

---

## 📝 NOTES

- All image paths use relative URLs (no `public/` prefix in production)
- Images in `public/images/` → deployed to `/images/`
- Images in `public/` root → deployed to `/` root
- Logo appears in both header and footer
- QR code in Reviews section
- Hero uses placeholder.png background
- All paths tested and verified for Hostinger deployment

**Remember**: Linux servers are case-sensitive!
- `logo.png` ✅
- `Logo.png` ❌
- `LOGO.PNG` ❌
