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

## Step 8: Configure Strapi Permissions

**Important:** The bootstrap code in `src/index.ts` should automatically set Product permissions when Strapi starts. However, manual verification is recommended to ensure products are accessible without authentication.

- [ ] Navigate to: **Settings → Users & Permissions Plugin → Roles → Public**
- [ ] Find **"Product"** in the permissions list
- [ ] Enable the following permissions for Product:
  - [ ] **find** (allows fetching list of products)
  - [ ] **findOne** (allows fetching a single product)
- [ ] Click **"Save"** (top right)
- [ ] Verify bootstrap code ran by checking application logs for:
  - `✅ Created Product find permission for public role`
  - `✅ Created Product findOne permission for public role`
  - OR `✅ Product find permission already exists for public role`

**Note:** If bootstrap code ran successfully, permissions may already be set. The manual check ensures they're configured correctly.

## Step 9: Update Frontend Configuration

- [ ] Note your deployed Strapi API URL
- [ ] Update frontend `.env.production` (see `FRONTEND_ENV_TEMPLATE.env.production`)
- [ ] Set `VITE_STRAPI_URL` (or equivalent) to your Strapi URL
- [ ] Rebuild and redeploy frontend

## Step 10: Test Integration

- [ ] Test API calls from frontend to Strapi
- [ ] Verify CORS is working (no CORS errors in browser console)
- [ ] Test user login/authentication
- [ ] Test API endpoints
- [ ] **Verify Product API access:**
  - [ ] Products load for anonymous (not logged in) users
  - [ ] Products load for logged-in users
  - [ ] No 401 errors appear in the browser console
  - [ ] Test products endpoint directly: `https://api.skipaman.co.za/api/products?populate=*&pagination[pageSize]=10`

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

### 401 Unauthorized errors for Products
If you're getting 401 errors when trying to access products:

1. **Check if bootstrap code ran:**
   - View application logs in Node.js app settings
   - Look for: `🚀 BOOTSTRAP STARTING - Setting permissions...`
   - If bootstrap didn't run, restart the application

2. **Manually set permissions via Strapi Admin:**
   - Go to: **Settings → Users & Permissions Plugin → Roles → Public**
   - Find **"Product"** in the permissions list
   - Enable **"find"** and **"findOne"** checkboxes
   - Click **"Save"**

3. **Verify permissions are set:**
   - Test products API in browser console:
     ```javascript
     fetch('https://api.skipaman.co.za/api/products?populate=*&pagination[pageSize]=10')
       .then(r => {
         console.log('Status:', r.status);
         if (r.status === 200) {
           console.log('✅ Products are publicly accessible!');
         } else {
           console.error('❌ Still getting 401 - permissions not set');
         }
       });
     ```
   - Expected: Status 200 = Fixed, Status 401 = Permissions still need to be set

4. **After fixing permissions:**
   - Restart the Strapi application
   - Clear browser cache
   - Test again from frontend

**Note:** The bootstrap code in `src/index.ts` should automatically set these permissions on startup. If 401 errors persist, the bootstrap may not have run or encountered an error.

## Important Notes

- The application will run automatically using `npm start` (production mode)
- No need to run `npm run dev` - it's production!
- Application auto-restarts on server reboot
- Keep environment variables secure - never commit to git



