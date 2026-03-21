# 🚀 QUICK DEPLOYMENT COMMANDS

## Step 1: Build for Production
```bash
cd c:\xampp\htdocs\Rwanda-In-7-Days
npm run build
```

## Step 2: What Gets Created
The `dist/` folder will contain:
- index.html
- assets/ (JS, CSS, images)

## Step 3: Upload to Server
Upload these folders/files to your production server:

**From `dist/` folder:**
- Upload ALL contents to server root

**From project root:**
- Upload `api/` folder to server root
- Upload `FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf` to server root

## Step 4: Create submissions.json on Server
SSH into your server and run:
```bash
cd /path/to/your/site/api/
echo '{"rate_limits":{},"submissions":{}}' > submissions.json
chmod 666 submissions.json
```

Or create manually via FTP/cPanel:
- Create file: `api/submissions.json`
- Content: `{"rate_limits":{},"submissions":{}}`
- Set permissions: 666 (read/write for all)

## Step 5: Verify Deployment
Test these URLs in your browser:

1. **Homepage:**
   https://rwanda-in-7-days.iforeveryoungtours.com/

2. **CSRF Token API:**
   https://rwanda-in-7-days.iforeveryoungtours.com/api/get-csrf-token.php
   Should return: `{"csrfToken":"..."}`

3. **PDF Download:**
   https://rwanda-in-7-days.iforeveryoungtours.com/FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf
   Should download the PDF

4. **Test Booking Form:**
   - Fill out the form completely
   - Click "Complete Booking"
   - Should see success message with booking reference
   - Check Baserow table for new record

## Common Issues & Fixes

### Issue: "Failed to get security token"
**Fix:** Check that `api/get-csrf-token.php` is uploaded and accessible

### Issue: "CORS error"
**Fix:** Verify your production domain is in `api/config.php` ALLOWED_ORIGINS array

### Issue: "submissions.json not writable"
**Fix:** 
```bash
chmod 666 api/submissions.json
```

### Issue: PDF 404 error
**Fix:** Ensure PDF is in root directory, NOT in a `/public/` subfolder

## File Permissions (Linux/Apache)
```bash
chmod 755 api/
chmod 644 api/*.php
chmod 666 api/submissions.json
chmod 644 FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf
```

## Deployment Complete! 🎉
Your site should now be live and fully functional at:
https://rwanda-in-7-days.iforeveryoungtours.com
