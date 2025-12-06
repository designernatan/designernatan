# WebP Conversion Script for Portfolio Images
# This script converts JPG/PNG images to WebP format using cwebp (Google's WebP encoder)
# 
# PREREQUISITES:
# 1. Download cwebp.exe from: https://developers.google.com/speed/webp/download
# 2. Extract and place cwebp.exe in this directory OR add to PATH
#
# USAGE:
# Run: .\convert-to-webp.ps1
#
# The script will:
# - Find all JPG/PNG images in img/ folder
# - Convert each to WebP format (same name, .webp extension)
# - Keep original files intact
# - Show conversion progress

# Check if cwebp is available
$cwebpPath = $null
if (Test-Path ".\cwebp.exe") {
    $cwebpPath = ".\cwebp.exe"
} elseif (Get-Command cwebp -ErrorAction SilentlyContinue) {
    $cwebpPath = "cwebp"
} else {
    Write-Host "ERROR: cwebp.exe not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please download WebP tools from:" -ForegroundColor Yellow
    Write-Host "https://developers.google.com/speed/webp/download" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Extract the archive and either:" -ForegroundColor Yellow
    Write-Host "  1. Copy cwebp.exe to this directory, OR" -ForegroundColor Yellow
    Write-Host "  2. Add the bin folder to your PATH" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "ALTERNATIVE: Use online converter" -ForegroundColor Green
    Write-Host "  - Visit: https://squoosh.app/" -ForegroundColor Cyan
    Write-Host "  - Drag & drop images from img/ folders" -ForegroundColor Cyan
    Write-Host "  - Choose WebP format with quality 85" -ForegroundColor Cyan
    Write-Host "  - Download and replace files" -ForegroundColor Cyan
    exit 1
}

Write-Host "=== WebP Conversion Started ===" -ForegroundColor Green
Write-Host "Using: $cwebpPath" -ForegroundColor Cyan
Write-Host ""

# Get all JPG and PNG images
$images = Get-ChildItem -Path "img" -Recurse -Include *.jpg,*.jpeg,*.png,*.JPG,*.JPEG,*.PNG

$total = $images.Count
$current = 0
$converted = 0
$skipped = 0

foreach ($image in $images) {
    $current++
    $webpPath = [System.IO.Path]::ChangeExtension($image.FullName, ".webp")
    
    # Skip if WebP already exists and is newer than source
    if ((Test-Path $webpPath) -and ((Get-Item $webpPath).LastWriteTime -gt $image.LastWriteTime)) {
        Write-Host "[$current/$total] SKIP: $($image.Name) (WebP exists)" -ForegroundColor Yellow
        $skipped++
        continue
    }
    
    Write-Host "[$current/$total] Converting: $($image.Name)..." -ForegroundColor Cyan
    
    # Convert with quality 85 (good balance between size and quality)
    $result = & $cwebpPath -q 85 $image.FullName -o $webpPath 2>&1
    
    if (Test-Path $webpPath) {
        $originalSize = (Get-Item $image.FullName).Length / 1KB
        $webpSize = (Get-Item $webpPath).Length / 1KB
        $savings = [math]::Round((($originalSize - $webpSize) / $originalSize) * 100, 1)
        
        Write-Host "  ✓ Created: $([System.IO.Path]::GetFileName($webpPath))" -ForegroundColor Green
        Write-Host "    Original: $([math]::Round($originalSize, 1)) KB → WebP: $([math]::Round($webpSize, 1)) KB (Saved: $savings%)" -ForegroundColor Gray
        $converted++
    } else {
        Write-Host "  ✗ FAILED: $($image.Name)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Conversion Complete ===" -ForegroundColor Green
Write-Host "Total images: $total" -ForegroundColor Cyan
Write-Host "Converted: $converted" -ForegroundColor Green
Write-Host "Skipped: $skipped" -ForegroundColor Yellow
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Review converted WebP images" -ForegroundColor White
Write-Host "2. Update HTML files to use <picture> element with WebP + fallback" -ForegroundColor White
Write-Host "3. Test on different browsers to ensure compatibility" -ForegroundColor White
