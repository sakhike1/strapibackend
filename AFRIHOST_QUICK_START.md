# Afrihost Deployment Quick Start

This is a condensed guide to get your Strapi backend running on Afrihost quickly.

## Prerequisites

- Afrihost cPanel access
- Node.js support enabled in cPanel
- Frontend deployed at https://skipaman.co.za

## Quick Steps

### 1. Generate Environment Variables ✓
Already done! See `AFRIHOST_DEPLOYMENT_ENV_VARS.txt` for the values.

### 2. Update CORS ✓
Already done! `config/middlewares.ts` includes skipaman.co.za domains.

### 3. Create Database
Follow `AFRIHOST_DATABASE_SETUP.md` to create MySQL database in cPanel.

### 4. Compress & Upload
Run the compression script:
```powershell
.\compress-for-cpanel.ps1
```
Then upload `skipaman-for-cpanel.zip` to cPanel File Manager and extract it.

### 5. Setup Node.js App in cPanel

1. Open "Node.js Selector" in cPanel
2. Create new application:
   - **Root:** `/home/username/path/to/skipaman`
   - **URL:** `api.skipaman.co.za` (create subdomain first)
   - **Startup File:** `src/index.ts`
   - **Node Version:** 18.x or 20.x
   - **Mode:** Production
   - **Start Command:** `npm start`
3. Note the PORT assigned by cPanel

### 6. Add Environment Variables
In Node.js app settings, add all variables from `AFRIHOST_DEPLOYMENT_ENV_VARS.txt`:
- Update `PORT` with actual port from cPanel
- Update database credentials with your values

### 7. Install & Build
In cPanel Terminal/SSH:
```bash
cd ~/path/to/skipaman
npm install --production
npm run build
```

### 8. Start App
In Node.js Selector, click "Restart App" and check logs.

### 9. Access Admin
Visit `https://api.skipaman.co.za/admin` and create admin account.

### 10. Update Frontend
Update frontend `.env.production` with:
```
VITE_STRAPI_URL=https://api.skipaman.co.za
```

## Files Reference

- **Environment Variables:** `AFRIHOST_DEPLOYMENT_ENV_VARS.txt`
- **Database Setup:** `AFRIHOST_DATABASE_SETUP.md`
- **Full Checklist:** `AFRIHOST_DEPLOYMENT_CHECKLIST.md`
- **Frontend Config:** `../FRONTEND_ENV_TEMPLATE.env.production`

## Key Points

- ✅ CORS already configured for skipaman.co.za
- ✅ Environment variables generated
- ✅ Use `npm start` (not `npm run dev`) - production mode
- ✅ App runs automatically, no manual start needed
- ✅ Auto-restarts on server reboot

## Need Help?

See the detailed guides:
- `AFRIHOST_DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist
- `AFRIHOST_DATABASE_SETUP.md` - Database setup details
- `../CPANEL_DEPLOYMENT_GUIDE.md` - General cPanel guide



