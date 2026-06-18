# Single-file HTML builder for 《别独自用餐》 immersive learning page
# Combines dist/index.html + dist/assets/*.css + dist/assets/*.js + favicon into one self-contained HTML file.

$ErrorActionPreference = 'Stop'
$distDir   = 'C:\Users\李奕辰\Desktop\元模型大赛版\dist'
$outFile   = 'C:\Users\李奕辰\Desktop\元模型大赛版\别独自用餐-沉浸式学习.html'

$htmlRaw   = Get-Content (Join-Path $distDir 'index.html') -Raw -Encoding UTF8
$cssRaw    = Get-Content (Join-Path $distDir 'assets\index-DmH0mJwR.css') -Raw -Encoding UTF8
$jsRaw     = Get-Content (Join-Path $distDir 'assets\index-DElF4eL1.js') -Raw -Encoding UTF8
$faviconRaw= Get-Content (Join-Path $distDir 'favicon.svg') -Raw -Encoding UTF8

# Build favicon as data URI (UTF-8 base64)
$faviconBytes = [System.Text.Encoding]::UTF8.GetBytes($faviconRaw)
$faviconBase64 = [Convert]::ToBase64String($faviconBytes)
$faviconDataUri = "data:image/svg+xml;base64,$faviconBase64"

# 1. Replace the favicon link with data URI
$htmlRaw = $htmlRaw -replace '<link rel="icon" type="image/svg\+xml" href="/favicon\.svg"\s*/>', "<link rel=`"icon`" type=`"image/svg+xml`" href=`"$faviconDataUri`" />"

# 2. Replace external CSS with inline <style>
$cssTag = "`n<style data-inline=""true"">`n$cssRaw`n</style>`n"
$htmlRaw = $htmlRaw -replace '<link rel="stylesheet" crossorigin href="/assets/index-DmH0mJwR\.css">', $cssTag

# 3. Replace external JS with inline <script>
$jsTag = "`n<script type=""module"">`n$jsRaw`n</script>`n"
$htmlRaw = $htmlRaw -replace '<script type="module" crossorigin src="/assets/index-DElF4eL1\.js"></script>', $jsTag

# 4. Remove the Trae badge plugin block (development-only widget)
$htmlRaw = $htmlRaw -replace '(?s)\s*<script>\s*\(function\(\)\s*\{\s*''use strict'';\s*if\s*\(window\.TraeBadgePlugin\)', ''
$htmlRaw = $htmlRaw -replace '(?s)\s*window\.TraeBadgePlugin\s*=\s*\{[\s\S]*?\}\s*;\s*\}\)\(\);\s*</script>\s*', "`n"
$htmlRaw = $htmlRaw -replace '(?s)\s*<script>\s*\(function\(\)\s*\{\s*''use strict'';\s*if\s*\(window\.TraeBadgePlugin\)\s*return;[\s\S]*?\}\)\(\);\s*</script>\s*', "`n"

# 5. Save
[System.IO.File]::WriteAllText($outFile, $htmlRaw, [System.Text.Encoding]::UTF8)

$finalSize = (Get-Item $outFile).Length
Write-Output "OK: wrote single-file HTML"
Write-Output "Path: $outFile"
Write-Output ("Size: {0:N1} KB" -f ($finalSize / 1KB))
