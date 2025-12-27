# Afrihost Deployment Checklist

Follow these steps in order to deploy your Strapi backend to Afrihost.

## Pre-Deployment

- [ ] CORS configuration updated in `skipaman/config/middlewares.ts` ✓
- [ ] Environment variables generated (see `AFRIHOST_DEPLOYMENT_ENV_VARS.txt`)

## Step 1: Database Setup

- [ ] Login to Afrihost cPanel
- [ ] Create MySQL database (see `AFRIHOST_DATABASE_SETUP.md`)
- [ ] Create database user with strong password
- [ ] Grant ALL PRIVILEGES to user on database
- [ ] Document database credentials

## Step 2: Upload Strapi Project

- [ ] Compress `skipaman` directory (exclude `node_modules` folder)
- [ ] Upload zip file to cPanel File Manager
- [ ] Extract in appropriate location:
  - Option A: Subdomain folder (e.g., `api.skipaman.co.za`)
  - Option B: Separate directory (e.g., `~/strapi/` or `~/api/`)
- [ ] Note the full path where Strapi is extracted

## Step 3: Configure Node.js Application

- [ ] Open "Node.js Selector" or "Setup Node.js App" in cPanel
- [ ] Click "Create Application" or "Add Application"
- [ ] Set Application Root: `/home/username/path/to/skipaman`
- [ ] Set Application URL:
  - Option A: Create subdomain `api.skipaman.co.za` (recommended)
  - Option B: Use subdirectory `skipaman.co.za/api` (requires reverse proxy)
- [ ] Set Application Startup File: `src/index.ts` (or `dist/src/index.js` if compiled)
- [ ] Set Node.js Version: 18.x or 20.x (LTS)
- [ ] Set Application Mode: Production
- [ ] Set Start Command: `npm start`
- [ ] Note the PORT assigned by cPanel (check app settings)

## Step 4: Configure Environment Variables

- [ ] Open your Node.js application settings in cPanel
- [ ] Add all environment variables from `AFRIHOST_DEPLOYMENT_ENV_VARS.txt`
- [ ] Update `PORT` with the actual port assigned by cPanel
- [ ] Update database credentials with your actual values:
  - `DATABASE_NAME`
  - `DATABASE_USERNAME`
  - `DATABASE_PASSWORD`

## Step 5: Install Dependencies and Build

- [ ] Open cPanel Terminal or SSH
- [ ] Navigate to Strapi directory: `cd ~/path/to/skipaman`
- [ ] Install production dependencies: `npm install --production`
- [ ] Build admin panel: `npm run build`
- [ ] Verify `public/build` folder exists with files

## Step 6: Start Application

- [ ] In Node.js Selector, click on your application
- [ ] Click "Restart App" or "Start App"
- [ ] Check logs for errors (click "View Logs")
- [ ] Verify application is running

## Step 7: Access Admin Panel

- [ ] Visit your Strapi URL: `https://api.skipaman.co.za/admin` (or your chosen URL)
- [ ] Create admin account (first time only)
- [ ] Login and verify admin panel works

## Step 8: Update Frontend Configuration

- [ ] Note your deployed Strapi API URL
- [ ] Update frontend `.env.production` (see `FRONTEND_ENV_TEMPLATE.env.production`)
- [ ] Set `VITE_STRAPI_URL` (or equivalent) to your Strapi URL
- [ ] Rebuild and redeploy frontend

## Step 9: Test Integration

- [ ] Test API calls from frontend to Strapi
- [ ] Verify CORS is working (no CORS errors in browser console)
- [ ] Test user login/authentication
- [ ] Test API endpoints

## Troubleshooting

### Application won't start
- Check Node.js version (must be 18.x or 20.x)
- Check logs in Node.js app settings
- Verify all environment variables are set
- Check file permissions

### Database connection errors
- Verify database credentials are correct
- Check user has ALL PRIVILEGES
- Verify `DATABASE_HOST=localhost`

### CORS errors
- Verify frontend domain is in CORS config
- Check HTTPS/HTTP matches
- Restart application after CORS changes

### Admin panel not loading
- Verify `npm run build` completed successfully
- Check `public/build` folder exists
- Clear browser cache

## Important Notes

- The application will run automatically using `npm start` (production mode)
- No need to run `npm run dev` - it's production!
- Application auto-restarts on server reboot
- Keep environment variables secure - never commit to git

