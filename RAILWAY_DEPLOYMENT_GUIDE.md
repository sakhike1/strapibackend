# Railway Deployment Guide for Strapi

This guide will help you deploy your Strapi backend to Railway, which is easier than cPanel and has a free tier.

## Why Railway?

- ✅ Free tier available (with limits)
- ✅ Easy Node.js deployment
- ✅ Automatic HTTPS
- ✅ Easy environment variable management
- ✅ Automatic deployments from Git
- ✅ No need to configure Node.js manually

## Prerequisites

- GitHub account (free)
- Railway account (free)
- Your Strapi project ready

## Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with GitHub (recommended) or email
4. Verify your email if needed

## Step 2: Prepare Your Project for Git

If your project isn't in Git yet:

1. **Initialize Git** (if not already done):
   ```bash
   cd C:\Users\sakhi\my-strapi-project
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**:
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it: `skipaman-backend` (or similar)
   - Don't initialize with README
   - Click "Create repository"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/skipaman-backend.git
   git branch -M main
   git push -u origin main
   ```

## Step 3: Deploy to Railway

### Option A: Deploy from GitHub (Recommended)

1. **In Railway Dashboard:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway to access your GitHub
   - Select your repository: `skipaman-backend`
   - Railway will detect it's a Node.js project

2. **Set Root Directory:**
   - After deployment starts, go to "Settings"
   - Under "Build & Deploy", set "Root Directory" to: `skipaman`
   - Save changes

3. **Railway will automatically:**
   - Detect `package.json` in `skipaman` folder
   - Install dependencies
   - Build the project
   - Start the application

### Option B: Deploy from Local Directory

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login:**
   ```bash
   railway login
   ```

3. **Initialize and Deploy:**
   ```bash
   cd C:\Users\sakhi\my-strapi-project\skipaman
   railway init
   railway up
   ```

## Step 4: Configure Environment Variables

1. **In Railway Dashboard:**
   - Click on your project
   - Go to "Variables" tab
   - Add the following environment variables:

### Required Variables:

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
```

### Security Keys (Use the generated ones):

```env
APP_KEYS=wv3D0PjEiw3piiqmE7IVa7H1oubcby6EbltDGg1eWN0=
API_TOKEN_SALT=tg8klNVYUZkax3yNpskHkn3mEseVeKkzwwqeAE4xwDM=
ADMIN_JWT_SECRET=zuFsNtJowmR48zfckMJe30mSot+KcsqzgW+bcS7fDGA=
TRANSFER_TOKEN_SALT=HSw7wWGvmaAHWkMhFgQJptkpKd5dPi1GRVP4dcSqbcM=
ENCRYPTION_KEY=3yJ96NTYJyA5gtpkK0Bc0yXGy/ng+2rPxKK4ZabCEjk=
```

### Database Configuration:

**Option 1: Use Railway PostgreSQL (Recommended)**

1. In Railway, click "New" → "Database" → "PostgreSQL"
2. Railway will create a PostgreSQL database
3. Go to the database service → "Variables" tab
4. Copy the connection details
5. Add to your Strapi service variables:

```env
DATABASE_CLIENT=postgres
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

Or manually:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=<from Railway database>
DATABASE_PORT=5432
DATABASE_NAME=<from Railway database>
DATABASE_USERNAME=<from Railway database>
DATABASE_PASSWORD=<from Railway database>
DATABASE_SSL=true
```

**Option 2: Use Your Afrihost MySQL Database**

```env
DATABASE_CLIENT=mysql
DATABASE_HOST=<your-afrihost-mysql-host>
DATABASE_PORT=3306
DATABASE_NAME=<your-database-name>
DATABASE_USERNAME=<your-database-username>
DATABASE_PASSWORD=<your-database-password>
```

**Note:** You'll need to allow Railway's IP addresses in your MySQL database, or use a public MySQL connection string if available.

## Step 5: Configure Build Settings

1. **In Railway, go to your service → Settings:**
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Root Directory:** `skipaman` (if deploying from repo root)

## Step 6: Get Your Strapi URL

1. **In Railway Dashboard:**
   - Click on your service
   - Go to "Settings" → "Networking"
   - Click "Generate Domain" to get a public URL
   - Or use the default Railway domain
   - Your URL will be like: `https://your-app-name.up.railway.app`

## Step 7: Update CORS (Already Done ✓)

The CORS configuration in `skipaman/config/middlewares.ts` already includes `https://skipaman.co.za`, so it should work!

## Step 8: Access Admin Panel

1. Visit: `https://your-app-name.up.railway.app/admin`
2. Create your admin account (first time only)
3. Login and verify it works

## Step 9: Update Frontend Configuration

Update your frontend `.env.production`:

```env
VITE_STRAPI_URL=https://your-app-name.up.railway.app
```

Then rebuild and redeploy your frontend.

## Troubleshooting

### Build Fails
- Check Railway logs
- Verify `package.json` is in `skipaman` folder
- Check Root Directory is set correctly

### Application Won't Start
- Check logs in Railway dashboard
- Verify all environment variables are set
- Check PORT is set (Railway assigns automatically, but Strapi needs it)

### Database Connection Errors
- Verify database credentials
- Check if database allows external connections (for Afrihost MySQL)
- For Railway PostgreSQL, use the `DATABASE_URL` variable

### CORS Errors
- Verify frontend domain is in CORS config
- Check HTTPS/HTTP matches
- Restart service after CORS changes

## Railway Free Tier Limits

- 500 hours/month free
- $5 credit monthly
- Sleeps after inactivity (wakes on request)
- Perfect for development and small projects

## Upgrade Options

If you need:
- Always-on service (no sleep)
- More resources
- Custom domain
- More hours

You can upgrade to Railway Pro ($5/month).

## Next Steps

1. Deploy to Railway using the steps above
2. Get your Railway URL
3. Update frontend to point to Railway URL
4. Test the connection

## Quick Reference

- **Railway Dashboard:** [railway.app](https://railway.app)
- **Railway Docs:** [docs.railway.app](https://docs.railway.app)
- **Strapi Docs:** [docs.strapi.io](https://docs.strapi.io)

