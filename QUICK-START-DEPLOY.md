# 🚀 QUICK START - Deploy to Hostinger in 10 Minutes

## Step-by-Step Guide for Rwanda In 7 Days

---

## ⚡ QUICK STEPS

### 1️⃣ UPDATE CONFIGURATION (2 minutes)

Open `api/config.php` and update these lines:

```php
// Line 18-20: Update with your Baserow credentials
define('BASEROW_TOKEN', 'YOUR_ACTUAL_TOKEN_HERE');
define('BASEROW_DATABASE_ID', 'YOUR_DATABASE_ID');
define('BASEROW_TABLE_ID', 'YOUR_TABLE_ID');

// Line 30-35: Add your domain
define('ALLOWED_ORIGINS', [
    'https://your-actual-domain.com',
    'https://www.your-actual-domain.com',
]);
```

**Where to find Baserow credentials:**
1. Login to Baserow: https://baserow.odiecloud.org
2. Click your profile → Settings → API tokens
3. Copy your token
4. Go to your database → Note the database ID from URL
5. Go to your table → Note the table ID from URL

---

### 2️⃣ BUILD THE PROJECT (1 minute)

**Option A: Using Build Script (Recommended)**
1. Double-click `build-for-hostinger.bat`
2. Wait for completion
3. Check `deployment` folder was created

**Option B: Manual Build**
```bash
npm install
npm run build
```

---

### 3️⃣ UPLOAD TO HOSTINGER (5 minutes)

**Using File Manager:**

1. **Login to Hostinger**
   - Go to: https://hpanel.hostinger.com
   - Login with your credentials

2. **Open File Manager**
   - Click your domain
   - Click "File Manager"
   - Navigate to `public_html`

3. **Clear Old Files**
   - Select all files in public_html
   - Click "Delete"
   - Confirm deletion

4. **Upload New Files**
   - Click "Upload"
   - Select all files from `deployment` folder
   - Wait for upload to complete

5. **Set Permissions**
   - Right-click `api/logs` → Permissions → 755
   - Right-click `api/submissions.json` → Permissions → 666
   - Right-click `api/logs/php_errors.log` → Permissions → 666

---

### 4️⃣ TEST YOUR SITE (2 minutes)

**Test 1: Homepage**
```
https://your-domain.com
```
✅ Should load without errors

**Test 2: Session**
```
https://your-domain.com/api/test-session.php
```
✅ Should show: `"success": true`

**Test 3: CSRF Token**
```
https://your-domain.com/api/get-csrf-token.php
```
✅ Should show: `"csrfToken": "..."`

**Test 4: Booking Form**
1. Scroll to booking section
2. Fill out the form
3. Submit
4. ✅ Should see success message with booking reference
5. ✅ Check Baserow for the submission

---

## 🎯 THAT'S IT!

Your site is now live! 🎉

---

## 🔧 TROUBLESHOOTING

### Problem: "Security initialization failed"

**Solution:**
1. Check `api/config.php` has your domain in ALLOWED_ORIGINS
2. Test: `https://your-domain.com/api/test-session.php`
3. If it shows error, check PHP version is 8.0+ in Hostinger

### Problem: "Failed to submit booking"

**Solution:**
1. Verify Baserow credentials in `api/config.php`
2. Check `api/logs/php_errors.log` for errors
3. Test Baserow API directly

### Problem: Images not loading

**Solution:**
1. Verify `public/images/` folder uploaded
2. Check file permissions (644 for images)
3. Clear browser cache

### Problem: 404 on API calls

**Solution:**
1. Verify `.htaccess` files uploaded
2. Check mod_rewrite is enabled in Hostinger
3. Verify file paths are correct

---

## 📋 QUICK CHECKLIST

Before going live:
- [ ] Updated api/config.php with Baserow credentials
- [ ] Updated api/config.php with your domain
- [ ] Built the project (deployment folder exists)
- [ ] Uploaded all files to public_html
- [ ] Set correct permissions
- [ ] Tested homepage loads
- [ ] Tested API endpoints work
- [ ] Tested booking form works
- [ ] Checked Baserow receives submissions

---

## 📞 NEED HELP?

**Hostinger Support:**
- Live Chat: Available 24/7 in hPanel
- Very responsive and helpful

**Check These Files:**
- `HOSTINGER_DEPLOYMENT_COMPLETE.md` - Full detailed guide
- `PRE-DEPLOYMENT-CHECKLIST.md` - Complete checklist
- `api/logs/php_errors.log` - Error logs

---

## 🎉 SUCCESS!

Your Rwanda In 7 Days booking site is now live and accepting bookings!

**Next Steps:**
1. Share the URL with your team
2. Monitor bookings in Baserow
3. Check error logs regularly
4. Keep backups of your files

---

**Deployment Time:** ~10 minutes
**Difficulty:** Easy
**Status:** Production Ready ✅
