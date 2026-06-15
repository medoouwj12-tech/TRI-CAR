# Deploy Policy Section Updates
# Run this from D:\شغل فرست كار directory

Write-Host "=== Deploying Policy Section to First Car ===" -ForegroundColor Cyan
Write-Host ""

# Check we're in the right directory
$projectPath = "D:\شغل فرست كار"
if ((Get-Location).Path -ne $projectPath) {
    Write-Host "Switching to project directory..." -ForegroundColor Yellow
    Set-Location $projectPath
}

# Show what changed
Write-Host "Files modified:" -ForegroundColor Green
Write-Host "  - messages/ar.json"
Write-Host "  - messages/en.json"
Write-Host "  - src/components/home-policy.tsx (NEW)"
Write-Host "  - src/app/[locale]/page.tsx"
Write-Host "  - src/components/navbar.tsx"
Write-Host ""

# Git workflow
Write-Host "Staging changes..." -ForegroundColor Cyan
git add messages/ar.json messages/en.json src/components/home-policy.tsx "src/app/[locale]/page.tsx" src/components/navbar.tsx

Write-Host "Committing..." -ForegroundColor Cyan
git commit -m "feat: add Al-Hossam car rental policy section with i18n support"

Write-Host "Pushing to remote..." -ForegroundColor Cyan
git push origin main

Write-Host ""
Write-Host "=== Done! Check your Vercel/Netlify dashboard for the deploy. ===" -ForegroundColor Green
Write-Host "Or test locally with: npm run dev" -ForegroundColor Yellow
