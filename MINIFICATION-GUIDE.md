# CSS and JavaScript Minification Guide

## Quick Minification (Online Tools - Recommended for Manual Workflow)

### For CSS Files

#### Option 1: CSS Minifier (Recommended)
1. Visit: https://www.toptal.com/developers/cssminifier
2. Copy content from `css/styles-swiss.css`
3. Paste and click "Minify"
4. Save output as `css/styles-swiss.min.css`

#### Option 2: CSS Compressor
- Visit: https://csscompressor.com/
- Upload `css/styles-swiss.css`
- Compression: **High**
- Download minified file

### For JavaScript Files

#### JS Minifier
1. Visit: https://www.toptal.com/developers/javascript-minifier
2. Upload `js/lightbox.js`
3. Download as `js/lightbox.min.js`
4. Repeat for `js/lite-youtube.js` → `js/lite-youtube.min.js`

---

## Automated Minification (PowerShell Script)

### Using NPM packages (requires Node.js)

If you have Node.js installed, run:

```powershell
# One-time setup
npm install -g clean-css-cli uglify-js

# Minify CSS
cleancss -o css/styles-swiss.min.css css/styles-swiss.css
cleancss -o css/lite-youtube.min.css css/lite-youtube.css

# Minify JavaScript
uglifyjs js/lightbox.js -c -m -o js/lightbox.min.js
uglifyjs js/lite-youtube.js -c -m -o js/lite-youtube.min.js
```

### Without Node.js (PowerShell basic compression)

Run the included script:
```powershell
.\minify-assets.ps1
```

This will create basic minified versions by removing:
- Comments
- Unnecessary whitespace
- Line breaks

---

## Files to Minify

### CSS (Priority Order)
1. ✅ **css/styles-swiss.css** (1036 lines, ~60KB) → css/styles-swiss.min.css
2. ✅ **css/lite-youtube.css** (94 lines, ~3KB) → css/lite-youtube.min.css

### JavaScript (Priority Order)
1. ✅ **js/lightbox.js** (144 lines, ~5KB) → js/lightbox.min.js
2. ✅ **js/lite-youtube.js** (52 lines, ~2KB) → js/lite-youtube.min.js

---

## After Minification: Update HTML References

Replace CSS/JS references in all HTML files:

### CSS Changes
**Before:**
```html
<link rel="stylesheet" href="css/styles-swiss.css">
```

**After:**
```html
<link rel="stylesheet" href="css/styles-swiss.min.css">
```

### JavaScript Changes  
**Before:**
```html
<script src="js/lightbox.js" defer></script>
```

**After:**
```html
<script src="js/lightbox.min.js" defer></script>
```

---

## HTML Files to Update (7 files)

1. ✅ index.html
2. ✅ pontta.html
3. ✅ mystudio.html
4. ✅ dash.html
5. ✅ courses.html
6. ✅ podcasts.html
7. ✅ talks.html (also update lite-youtube.js → lite-youtube.min.js)

---

## Expected Results

### CSS Minification
- **Original size**: ~60KB
- **Minified size**: ~45KB
- **Savings**: ~25% (15KB)

### JavaScript Minification
- **Original size**: ~7KB combined
- **Minified size**: ~4KB combined
- **Savings**: ~40% (3KB)

### Total Savings
- **~18KB** reduced file size
- Faster download times on slower connections
- Better PageSpeed Insights score

---

## Important Notes

### DO Keep Original Files
- Keep `css/styles-swiss.css` for editing
- Keep `js/lightbox.js` and `js/lite-youtube.js` for editing
- Only reference `.min.css` and `.min.js` in HTML
- Add to `.gitignore` if you want (or commit both)

### Development Workflow
1. Edit original CSS/JS files
2. Re-minify when ready to deploy
3. Git push (both original and minified, or just minified)
4. Hostinger deploys automatically

### Skip Minification If:
- You prefer readable code in production
- File sizes are acceptable without minification
- You want easier debugging in production

---

## Verification

After minification, test your site:
1. Open in browser
2. Check DevTools → Network tab
3. Verify `.min.css` and `.min.js` files are loading
4. Check file sizes are smaller
5. Verify no visual/functional changes
