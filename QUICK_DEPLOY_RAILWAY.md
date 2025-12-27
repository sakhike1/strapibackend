# Quick Railway Deployment - Step by Step

Follow these exact steps to deploy your Strapi backend to Railway.

## Prerequisites Checklist

- [ ] GitHub account
- [ ] Strapi project ready
- [ ] Database created (Afrihost MySQL or Railway PostgreSQL)

## Step 1: Push to GitHub (5 minutes)

If your code isn't on GitHub yet:

```bash
# Open PowerShell in your project folder
cd C:\Users\sakhi\my-strapi-project

# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit for Railway deployment"

# Create repo on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/skipaman-backend.git
git branch -M main
git push -u origin main
```

## Step 2: Create Railway Account (2 minutes)

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with GitHub (click "Login with GitHub")
4. Authorize Railway to access your GitHub

## Step 3: Deploy from GitHub (3 minutes)

1. **In Railway:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Find and select your `skipaman-backend` repository
   - Click "Deploy Now"

2. **Set Root Directory:**
   - Click on your new service
   - Go to "Settings" tab
   - Scroll to "Root Directory"
   - Enter: `skipaman`
   - Click "Save"

3. **Railway will automatically:**
   - Detect Node.js
   - Install dependencies
   - Build your project
   - Try to start (may fail until env vars are set - that's OK)

## Step 4: Add Environment Variables (5 minutes)

1. **In Railway, click your service:**
   - Go to "Variables" tab
   - Click "New Variable" for each one

2. **Add these variables one by one:**

```
NODE_ENV = production
HOST = 0.0.0.0
PORT = 1337
APP_KEYS = wv3D0PjEiw3piiqmE7IVa7H1oubcby6EbltDGg1eWN0=
API_TOKEN_SALT = tg8klNVYUZkax3yNpskHkn3mEseVeKkzwwqeAE4xwDM=
ADMIN_JWT_SECRET = zuFsNtJowmR48zfckMJe30mSot+KcsqzgW+bcS7fDGA=
TRANSFER_TOKEN_SALT = HSw7wWGvmaAHWkMhFgQJptkpKd5dPi1GRVP4dcSqbcM=
ENCRYPTION_KEY = 3yJ96NTYJyA5gtpkK0Bc0yXGy/ng+2rPxKK4ZabCEjk=
```

3. **Add Database Variables:**

**If using Railway PostgreSQL:**
- Click "New" → "Database" → "PostgreSQL"
- Railway creates it automatically
- Go back to your service → "Variables"
- Add: `DATABASE_CLIENT = postgres`
- Add: `DATABASE_URL = ${{Postgres.DATABASE_URL}}` (use the variable reference)

**If using Afrihost MySQL:**
```
DATABASE_CLIENT = mysql
DATABASE_HOST = <your-mysql-host>
DATABASE_PORT = 3306
DATABASE_NAME = skipamw4e0t7_<your-db-name>
DATABASE_USERNAME = skipamw4e0t7_<your-username>
DATABASE_PASSWORD = <your-password>
```

**Note:** For Afrihost MySQL, you may need to allow Railway's IP addresses. Contact Afrihost support for this.

## Step 5: Get Your URL (1 minute)

1. **In Railway:**
   - Click your service
   - Go to "Settings" → "Networking"
   - Click "Generate Domain"
   - Copy the URL (e.g., `https://skipaman-api.up.railway.app`)

## Step 6: Test Admin Panel (2 minutes)

1. Visit: `https://your-url.up.railway.app/admin`
2. Create admin account
3. Verify it works

## Step 7: Update Frontend (2 minutes)

1. Update your frontend `.env.production`:
   ```
   VITE_STRAPI_URL=https://your-url.up.railway.app
   ```

2. Rebuild and redeploy your frontend

## Total Time: ~20 minutes

## Troubleshooting

### "Build failed"
- Check Railway logs (click "Deployments" → "View Logs")
- Verify Root Directory is set to `skipaman`
- Check that `package.json` exists in `skipaman` folder

### "Application error"
- Check logs in Railway
- Verify all environment variables are set
- Check database connection

### "Database connection failed"
- Verify database credentials
- For Afrihost MySQL, check if external connections are allowed
- For Railway PostgreSQL, use the `${{Postgres.DATABASE_URL}}` variable

## Need Help?

- Railway Docs: [docs.railway.app](https://docs.railway.app)
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)

