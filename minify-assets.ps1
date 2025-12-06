# PowerShell script to minify CSS and JavaScript files
# Basic minification: removes comments, extra whitespace, and line breaks

Write-Host "=== Asset Minification Script ===" -ForegroundColor Green
Write-Host ""

function Minify-CSS {
    param([string]$InputFile, [string]$OutputFile)
    
    Write-Host "Minifying CSS: $InputFile..." -ForegroundColor Cyan
    
    $content = Get-Content $InputFile -Raw
    
    # Remove CSS comments
    $content = $content -replace '/\*[\s\S]*?\*/', ''
    
    # Remove unnecessary whitespace
    $content = $content -replace '\s+', ' '
    
    # Remove spaces around special characters
    $content = $content -replace '\s*{\s*', '{'
    $content = $content -replace '\s*}\s*', '}'
    $content = $content -replace '\s*:\s*', ':'
    $content = $content -replace '\s*;\s*', ';'
    $content = $content -replace '\s*,\s*', ','
    
    # Remove trailing semicolons
    $content = $content -replace ';}'', '}'
    
    $content.Trim() | Set-Content $OutputFile -NoNewline
    
    $originalSize = (Get-Item $InputFile).Length / 1KB
    $minifiedSize = (Get-Item $OutputFile).Length / 1KB
    $savings = [math]::Round((($originalSize - $minifiedSize) / $originalSize) * 100, 1)
    
    Write-Host "  Created: $OutputFile" -ForegroundColor Green
    Write-Host "  Original: $([math]::Round($originalSize, 1)) KB" -ForegroundColor Gray
    Write-Host "  Minified: $([math]::Round($minifiedSize, 1)) KB" -ForegroundColor Gray
    Write-Host "  Saved: $savings%" -ForegroundColor Green
}

function Minify-JS {
    param([string]$InputFile, [string]$OutputFile)
    
    Write-Host "Minifying JS: $InputFile..." -ForegroundColor Cyan
    
    $content = Get-Content $InputFile -Raw
    
    # Remove single-line comments (but preserve URLs)
    $content = $content -replace '(?<!:)//.*?$', '' -replace '\r?\n', ''
    
    # Remove multi-line comments
    $content = $content -replace '/\*[\s\S]*?\*/', ''
    
    # Remove unnecessary whitespace
    $content = $content -replace '\s+', ' '
    
    # Remove spaces around operators and brackets
    $content = $content -replace '\s*{\s*', '{'
    $content = $content -replace '\s*}\s*', '}'
    $content = $content -replace '\s*\(\s*', '('
    $content = $content -replace '\s*\)\s*', ')'
    $content = $content -replace '\s*;\s*', ';'
    $content = $content -replace '\s*,\s*', ','
    
    $content.Trim() | Set-Content $OutputFile -NoNewline
    
    $originalSize = (Get-Item $InputFile).Length / 1KB
    $minifiedSize = (Get-Item $OutputFile).Length / 1KB
    $savings = [math]::Round((($originalSize - $minifiedSize) / $originalSize) * 100, 1)
    
    Write-Host "  Created: $OutputFile" -ForegroundColor Green
    Write-Host "  Original: $([math]::Round($originalSize, 1)) KB" -ForegroundColor Gray
    Write-Host "  Minified: $([math]::Round($minifiedSize, 1)) KB" -ForegroundColor Gray
    Write-Host "  Saved: $savings%" -ForegroundColor Green
}

# Minify CSS files
Write-Host "Minifying CSS files..." -ForegroundColor Yellow
Write-Host ""
Minify-CSS -InputFile "css\styles-swiss.css" -OutputFile "css\styles-swiss.min.css"
Write-Host ""
Minify-CSS -InputFile "css\lite-youtube.css" -OutputFile "css\lite-youtube.min.css"

Write-Host ""
Write-Host "Minifying JavaScript files..." -ForegroundColor Yellow
Write-Host ""
Minify-JS -InputFile "js\lightbox.js" -OutputFile "js\lightbox.min.js"
Write-Host ""
Minify-JS -InputFile "js\lite-youtube.js" -OutputFile "js\lite-youtube.min.js"

Write-Host ""
Write-Host "=== Minification Complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Update HTML files to reference .min.css and .min.js files" -ForegroundColor White
Write-Host "2. Test your site to ensure everything works correctly" -ForegroundColor White
Write-Host "3. Commit and push changes to deploy" -ForegroundColor White
