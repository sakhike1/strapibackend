# PowerShell script to start Strapi with error checking
# Run this: .\start-strapi.ps1

Write-Host "🚀 Starting Strapi Development Server..." -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found!" -ForegroundColor Red
    Write-Host "💡 Make sure you're in the skipaman directory" -ForegroundColor Yellow
    exit 1
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠️  node_modules not found. Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
        exit 1
    }
}

# Check if port 1337 is in use
$portInUse = Get-NetTCPConnection -LocalPort 1337 -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "⚠️  Port 1337 is already in use!" -ForegroundColor Yellow
    Write-Host "💡 You may need to stop the existing process or use a different port" -ForegroundColor Yellow
    Write-Host ""
    $process = Get-Process -Id $portInUse.OwningProcess -ErrorAction SilentlyContinue
    if ($process) {
        Write-Host "Process using port 1337: $($process.ProcessName) (PID: $($process.Id))" -ForegroundColor Yellow
        Write-Host "Stop it with: Stop-Process -Id $($process.Id)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "📦 Starting Strapi..." -ForegroundColor Green
Write-Host ""

# Start Strapi
npm run develop

































