# 📁 PRODUCTION FILE STRUCTURE

## What to Upload to Production Server

```
rwanda-in-7-days.iforeveryoungtours.com/
│
├── index.html                          (from dist/)
├── assets/                             (from dist/assets/)
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [all other asset files]
│
├── FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf
│
└── api/
    ├── config.php
    ├── baserow.php
    ├── validator.php
    ├── security.php
    ├── submit-booking.php
    ├── get-csrf-token.php
    └── submissions.json
```

## Build Command

```bash
npm run build
```

This creates the `dist/` folder. Upload ALL contents of `dist/` to your server root.

## Important Notes

1. **DO NOT upload these folders:**
   - `node_modules/`
   - `src/`
   - `.git/`
   - `public/` (contents are already in dist/)

2. **DO upload:**
   - Everything from `dist/` folder → server root
   - `api/` folder → server root
   - PDF file → server root

3. **Create submissions.json manually on server:**
   ```json
   {"rate_limits":{},"submissions":{}}
   ```
   Set permissions: `chmod 666 submissions.json`

## Verification URLs

After deployment, test these:
- https://rwanda-in-7-days.iforeveryoungtours.com/
- https://rwanda-in-7-days.iforeveryoungtours.com/api/get-csrf-token.php
- https://rwanda-in-7-days.iforeveryoungtours.com/FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf
