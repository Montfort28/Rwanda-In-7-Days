# PRE-DEPLOYMENT CHECKLIST
## Rwanda In 7 Days - Hostinger Deployment

---

## ✅ BEFORE BUILDING

### 1. Configuration Files

#### api/config.php
- [ ] Update BASEROW_TOKEN with your actual token
- [ ] Update BASEROW_DATABASE_ID with your database ID
- [ ] Update BASEROW_TABLE_ID with your table ID
- [ ] Add your production domain to ALLOWED_ORIGINS
- [ ] Verify session settings (should auto-detect production)

**Current values to update:**
```php
define('BASEROW_TOKEN', 'YOUR_ACTUAL_TOKEN_HERE');
define('BASEROW_DATABASE_ID', 'YOUR_DATABASE_ID');
define('BASEROW_TABLE_ID', 'YOUR_TABLE_ID');

define('ALLOWED_ORIGINS', [
    'https://rwanda-in-7-days.iforeveryoungtours.com',
    'https://www.rwanda-in-7-days.iforeveryoungtours.com',
    // Add your actual domain
]);
```

#### src/services/baserowService.js
- [ ] Verify production URL is correct
- [ ] Current: `https://rwanda-in-7-days.iforeveryoungtours.com/api`
- [ ] Update if your domain is different

### 2. Content Review
- [ ] All images are optimized (< 500KB each)
- [ ] All text content is finalized
- [ ] Pricing information is correct
- [ ] Contact information is accurate
- [ ] PDF brochure is up to date

### 3. Testing Locally
- [ ] Run `npm run dev` and test everything
- [ ] Test booking form submission
- [ ] Verify success message displays
- [ ] Check all navigation links work
- [ ] Test language switcher
- [ ] Test on mobile view
- [ ] Check browser console for errors

---

## ✅ BUILDING

### 1. Run Build Script
- [ ] Double-click `build-for-hostinger.bat`
- [ ] Wait for build to complete
- [ ] Check for any errors
- [ ] Verify `deployment` folder was created

### 2. Verify Build Output
Check that `deployment` folder contains:
- [ ] index.html
- [ ] assets/ folder (with JS and CSS files)
- [ ] api/ folder (with all PHP files)
- [ ] api/logs/ folder (with php_errors.log)
- [ ] api/submissions.json (empty: {})
- [ ] public/images/ folder (with all images)
- [ ] .htaccess (root)

---

## ✅ HOSTINGER PREPARATION

### 1. Hostinger Account
- [ ] Login to Hostinger hPanel
- [ ] Verify domain is active
- [ ] Check PHP version (should be 8.0+)
- [ ] Verify SSL certificate is active

### 2. Domain Setup
- [ ] Domain DNS is pointing to Hostinger
- [ ] SSL certificate is installed
- [ ] HTTPS is working
- [ ] WWW redirect configured (if needed)

### 3. PHP Configuration
Go to: hPanel → Advanced → PHP Configuration
- [ ] PHP version: 8.0 or higher
- [ ] Extensions enabled:
  - [ ] curl
  - [ ] json
  - [ ] session
  - [ ] mbstring
  - [ ] openssl

---

## ✅ UPLOADING

### 1. Backup Existing Site (if any)
- [ ] Download current public_html contents
- [ ] Save backup locally

### 2. Clear public_html
- [ ] Delete all existing files in public_html
- [ ] Keep .htaccess if you have custom rules

### 3. Upload Files
Using File Manager or FTP:
- [ ] Upload index.html to root
- [ ] Upload assets/ folder
- [ ] Upload api/ folder
- [ ] Upload public/ folder
- [ ] Upload .htaccess to root

### 4. Set Permissions
In File Manager, set permissions:
- [ ] api/logs/ → 755 (right-click → Permissions)
- [ ] api/submissions.json → 666
- [ ] api/logs/php_errors.log → 666

---

## ✅ POST-DEPLOYMENT TESTING

### 1. Basic Tests
- [ ] Visit: https://your-domain.com
- [ ] Homepage loads without errors
- [ ] All images display correctly
- [ ] Navigation works
- [ ] No console errors (F12)

### 2. API Tests
Test these URLs in browser:

**Session Test:**
- [ ] https://your-domain.com/api/test-session.php
- [ ] Should return JSON with "success": true

**CSRF Token Test:**
- [ ] https://your-domain.com/api/get-csrf-token.php
- [ ] Should return JSON with csrfToken

### 3. Booking Form Test
- [ ] Scroll to booking form
- [ ] Fill out all required fields
- [ ] Submit form
- [ ] Success message displays
- [ ] Booking reference shows
- [ ] Copy button works
- [ ] Check Baserow for submission

### 4. Browser Testing
Test on multiple browsers:
- [ ] Chrome (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Edge (desktop)
- [ ] Chrome (mobile)
- [ ] Safari (mobile)

### 5. Mobile Testing
- [ ] Responsive design works
- [ ] Form is usable on mobile
- [ ] Navigation menu works
- [ ] Images load properly
- [ ] No horizontal scrolling

---

## ✅ SECURITY VERIFICATION

### 1. HTTPS
- [ ] Site loads with HTTPS
- [ ] HTTP redirects to HTTPS
- [ ] SSL certificate is valid
- [ ] No mixed content warnings

### 2. API Security
- [ ] CSRF tokens working
- [ ] Rate limiting active (test 4 submissions)
- [ ] Duplicate prevention working (test same email twice)
- [ ] Session cookies are secure

### 3. File Protection
- [ ] Cannot access: /api/submissions.json directly
- [ ] Cannot access: /api/logs/php_errors.log directly
- [ ] Cannot list directories

---

## ✅ PERFORMANCE CHECK

### 1. Speed Test
Use: https://pagespeed.web.dev/
- [ ] Desktop score > 80
- [ ] Mobile score > 70
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 3s

### 2. Image Optimization
- [ ] All images < 500KB
- [ ] Images are compressed
- [ ] Images use correct format (JPG/PNG/WebP)

### 3. Caching
- [ ] Browser caching enabled
- [ ] Static assets cached
- [ ] Gzip compression active

---

## ✅ MONITORING SETUP

### 1. Error Logging
- [ ] Check: /api/logs/php_errors.log regularly
- [ ] Set up log rotation if needed
- [ ] Monitor for errors

### 2. Baserow Monitoring
- [ ] Check submissions daily
- [ ] Verify data is correct
- [ ] Set up email notifications (if available)

### 3. Uptime Monitoring
Consider using:
- [ ] UptimeRobot (free)
- [ ] Pingdom
- [ ] Hostinger's built-in monitoring

---

## ✅ DOCUMENTATION

### 1. Save Important Info
- [ ] Hostinger login credentials
- [ ] FTP credentials
- [ ] Baserow credentials
- [ ] Domain registrar info
- [ ] SSL certificate info

### 2. Create Backup Schedule
- [ ] Weekly: Download public_html
- [ ] Monthly: Export Baserow data
- [ ] Keep 3 months of backups

### 3. Update Documentation
- [ ] Document any custom changes
- [ ] Note any issues encountered
- [ ] Record solutions for future reference

---

## ✅ FINAL CHECKS

### Before Going Live
- [ ] All tests passed
- [ ] No console errors
- [ ] No broken links
- [ ] All forms work
- [ ] All images load
- [ ] Mobile responsive
- [ ] HTTPS working
- [ ] API endpoints working
- [ ] Baserow integration working

### Announcement Ready
- [ ] Site is fully functional
- [ ] Content is proofread
- [ ] Contact info is correct
- [ ] Booking system tested
- [ ] Performance is good
- [ ] Security is verified

---

## 🎉 DEPLOYMENT COMPLETE!

Once all items are checked:
- [ ] Announce the site is live
- [ ] Share the URL
- [ ] Monitor for issues
- [ ] Respond to bookings promptly

---

## 📞 EMERGENCY CONTACTS

**Hostinger Support:**
- Live Chat: 24/7 in hPanel
- Email: support@hostinger.com

**Baserow Support:**
- Docs: https://baserow.io/docs
- Community: https://community.baserow.io

**Developer Notes:**
- Keep this checklist for future updates
- Document any issues and solutions
- Maintain regular backups

---

## 📝 NOTES SECTION

Use this space to note any issues or customizations:

```
Date: _______________
Issue: _______________________________________________
Solution: ____________________________________________
_____________________________________________________

Date: _______________
Issue: _______________________________________________
Solution: ____________________________________________
_____________________________________________________
```

---

**Last Updated:** [Current Date]
**Deployment Version:** 1.0.0
**Status:** Ready for Production
