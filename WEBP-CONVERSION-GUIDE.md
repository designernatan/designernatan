# WebP Conversion Guide

## Quick Option: Online Converter (Recommended for Manual Workflow)

### Using Squoosh (Google's Web Tool)
1. Visit: https://squoosh.app/
2. Drag & drop images from your `img/` folders
3. Settings:
   - Format: **WebP**
   - Quality: **85** (good balance)
   - Effort: **4** (default)
4. Click "Download" for each image
5. Save with `.webp` extension in same folder as original

### Batch Process with Squoosh CLI (Alternative)
```bash
npx @squoosh/cli --webp '{quality:85}' img/**/*.{jpg,png}
```

---

## Advanced Option: cwebp (Command Line)

### Download WebP Tools
- Windows: https://developers.google.com/speed/webp/download
- Extract `cwebp.exe` to your project folder

### Convert All Images
Run the provided PowerShell script:
```powershell
.\convert-to-webp.ps1
```

---

## Images to Convert (Priority Order)

### 1. Hero Images (High Priority - Above the Fold)
- `img/start/home-start.png` → Used on index.html
- `img/dash.png` → Project card on index.html  
- `img/pontta.png` → Project card on index.html

### 2. Case Study Screenshots (Medium Priority)
- `img/pontta/pontta1.jpg`
- `img/pontta/pontta2.jpg`
- `img/pontta/pontta3.jpg`
- `img/dash/dash1.jpg`
- `img/dash/dash2.jpg`
- `img/dash/dash3.jpg`
- `img/start/start1.jpg`
- `img/start/start2.jpg`
- `img/start/start3.jpg`

### 3. Lightbox Big Images (Low Priority)
- `img/dash/dash1-big.jpg`
- `img/dash/dash2-big.jpg`
- `img/dash/dash3-big.jpg`
- `img/start/start1-big.jpg` (if exists)
- `img/start/start2-big.jpg` (if exists)
- `img/start/start3-big.jpg` (if exists)

### 4. Other Images
- `img/natan-souza-pb.jpg` → Contact section
- `img/okroger/*.png` → Case study hero images
- `img/turmas/*.JPG` → Various images

---

## After Converting: Update HTML

Replace simple `<img>` tags with `<picture>` element for WebP + fallback.

### Before:
```html
<img src="img/pontta.png" alt="Pontta Gestor" loading="lazy">
```

### After:
```html
<picture>
    <source srcset="img/pontta.webp" type="image/webp">
    <img src="img/pontta.png" alt="Pontta Gestor" loading="lazy">
</picture>
```

---

## Expected Results

- **File size reduction**: 25-40% for JPG, 40-60% for PNG
- **Visual quality**: Imperceptible difference at quality 85
- **Browser support**: 95%+ (IE fallback to original format)

---

## Notes

- Keep original JPG/PNG files for future editing
- WebP files work great with git (binary compression)
- External images (Alura, Hipsters) cannot be converted (not hosted by you)
