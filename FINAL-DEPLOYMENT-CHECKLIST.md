# FINAL DEPLOYMENT CHECKLIST - Rwanda in 7 Days

## ✅ PRE-DEPLOYMENT VERIFICATION

### 1. Images Verification
- [x] Hero section background: `images/Hero.png`
- [x] QR Code: `images/QR code.png`
- [x] Itinerary images (8 days):
  - Sunday: `kigali-nightfall.jpg`
  - Day 1: `Kigali-Genocide-Memorial.jpg`
  - Day 2: `images/Akagera-Safari1.jpg`
  - Day 3: `gorilla-village-dance7.jpg`
  - Day 4: `images/gorilla-trekking-volcanoes.jpg`
  - Day 5: `Lake-Kivu-Kayaking.jpg`
  - Day 6: `nyungwe-canopy-walk.jpg`
  - Day 7: `Kings-palace-museum.jpg`
- [x] Highlights section images (4 cards):
  - `images/chimpanzee.jpg`
  - `images/Akagera-Safari4.jpg`
  - `images/Kigali & Cultural Moments.jpg`
  - `images/lodging.jpg`

### 2. API Configuration
- [x] Baserow API token: `e9auwsf47aYBRi70wMy5ptzDbTfHGwWs`
- [x] Database ID: `301`
- [x] Table ID: `1103`
- [x] Production domain whitelisted: `https://rwanda-in-7-days.iforeveryoungtours.com`
- [x] Field mappings verified (option IDs for single_select fields)
- [x] Rate limiting: 3 submissions per hour per IP
- [x] Date format: YYYY-MM-DD

### 3. Form Features
- [x] Contact form: 4-step wizard with validation
- [x] Reviews form: 3-tab interface (Rate, Testimonial, Refer)
- [x] Success messages with booking reference
- [x] Error handling with user-friendly messages
- [x] Field validation per step
- [x] Rate limit tracking in `api/submissions.json`

### 4. UI/UX Verification
- [x] Color palette updated (44 hex colors + 88 RGBA variants)
- [x] Font family: Inter (weights 600-900)
- [x] Responsive design (desktop, tablet, mobile)
- [x] Step-by-step form layout
- [x] Testimonials section before footer
- [x] Highlights section height optimized
- [x] 3-column itinerary grid (responsive to 2-col, then 1-col)

### 5. Content Updates
- [x] 8-day itinerary with detailed timing
- [x] Updated day labels (Sunday, Monday, etc.)
- [x] Signature experience benefits (4 items)
- [x] Contact info card with 4 steps
- [x] QR code with referral URL

## 📦 DEPLOYMENT STEPS

### Step 1: Build Production Files
```bash
cd c:\xampp\htdocs\Rwanda-In-7-Days
npm run build
```

### Step 2: Verify Build Output
Check that `dist/` folder contains:
- `index.html`
- `assets/` folder with JS and CSS files
- All images copied correctly

### Step 3: Upload to Production Server
Upload these files to: `https://rwanda-in-7-days.iforeveryoungtours.com/`

**Required files/folders:**
```
/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── images/
│   ├── Hero.png
│   ├── QR code.png
│   ├── kigali-nightfall.jpg
│   ├── Kigali-Genocide-Memorial.jpg
│   ├── Akagera-Safari1.jpg
│   ├── gorilla-village-dance7.jpg
│   ├── gorilla-trekking-volcanoes.jpg
│   ├── Lake-Kivu-Kayaking.jpg
│   ├── nyungwe-canopy-walk.jpg
│   ├── Kings-palace-museum.jpg
│   ├── chimpanzee.jpg
│   ├── Akagera-Safari4.jpg
│   ├── Kigali & Cultural Moments.jpg
│   ├── lodging.jpg
│   └── ... (all other images)
├── api/
│   ├── config.php
│   ├── baserow.php
│   ├── submissions.json (with write permissions)
│   └── .htaccess
├── FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf
└── .htaccess (if needed for routing)
```

### Step 4: Set File Permissions
```bash
chmod 755 api/
chmod 644 api/*.php
chmod 666 api/submissions.json  # Writable by PHP
```

### Step 5: Test Production Environment

#### A. Test Images
- [ ] Hero background image loads
- [ ] All 8 itinerary day images load
- [ ] All 4 highlights card images load
- [ ] QR code image loads in Reviews section
- [ ] Logo and brand images load

#### B. Test Forms
- [ ] Contact form step 1 validation works
- [ ] Contact form step 2 validation works
- [ ] Contact form step 3 validation works
- [ ] Contact form step 4 submission works
- [ ] Booking reference generated correctly
- [ ] Reviews form Rate tab works
- [ ] Reviews form Testimonial tab works
- [ ] Reviews form Refer tab works

#### C. Test API Integration
- [ ] Form submission creates Baserow record
- [ ] Field mappings correct (check Baserow table)
- [ ] Date format correct (YYYY-MM-DD)
- [ ] Source field mapping works (Google/Facebook/Instagram → Social Media)
- [ ] Rate limiting works (3 per hour)
- [ ] Error messages display correctly

#### D. Test Responsive Design
- [ ] Desktop view (1920px+)
- [ ] Laptop view (1280px-1920px)
- [ ] Tablet view (768px-1024px)
- [ ] Mobile view (320px-767px)
- [ ] All sections responsive
- [ ] Forms work on mobile

#### E. Test Navigation
- [ ] All anchor links work (#overview, #highlights, #itinerary, etc.)
- [ ] Smooth scrolling works
- [ ] Mobile menu works
- [ ] Language switcher works (if implemented)

#### F. Test External Links
- [ ] PDF download link works
- [ ] Email link (booking@iforeveryoungtours.com) works
- [ ] Phone numbers clickable on mobile
- [ ] QR code referral URL correct

## 🔧 TROUBLESHOOTING

### Images Not Loading
1. Check file paths (no `public/` prefix in production)
2. Verify images exist in correct folders
3. Check file permissions (644 for images)
4. Clear browser cache (Ctrl+F5)

### Forms Not Submitting
1. Check `api/submissions.json` permissions (666)
2. Verify Baserow API token is valid
3. Check CORS whitelist includes production domain
4. Review PHP error logs
5. Test API endpoint directly: `https://rwanda-in-7-days.iforeveryoungtours.com/api/baserow.php`

### Rate Limiting Issues
1. Clear `api/submissions.json` content: `{"submissions": [], "ips": {}}`
2. Verify file is writable
3. Check timestamp format

### Styling Issues
1. Verify CSS files loaded correctly
2. Check for CSS conflicts
3. Clear browser cache
4. Test in incognito mode

## 📊 POST-DEPLOYMENT MONITORING

### Week 1 Checklist
- [ ] Monitor form submissions in Baserow
- [ ] Check for error logs
- [ ] Verify email notifications (if configured)
- [ ] Test on different devices/browsers
- [ ] Monitor page load speed
- [ ] Check mobile responsiveness

### Ongoing Maintenance
- [ ] Weekly: Review form submissions
- [ ] Monthly: Clear old rate limit data
- [ ] Quarterly: Update images if needed
- [ ] As needed: Update content/pricing

## 🚀 DEPLOYMENT COMPLETE

Once all items are checked:
1. Announce launch to stakeholders
2. Share production URL: `https://rwanda-in-7-days.iforeveryoungtours.com/`
3. Monitor analytics and user feedback
4. Document any issues for future updates

---

**Deployment Date:** _____________
**Deployed By:** _____________
**Production URL:** https://rwanda-in-7-days.iforeveryoungtours.com/
**Status:** ✅ READY FOR DEPLOYMENT
