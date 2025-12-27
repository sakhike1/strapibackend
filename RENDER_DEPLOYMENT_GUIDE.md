# Render Deployment Guide for Strapi

Alternative deployment option using Render.com (also has a free tier).

## Why Render?

- ✅ Free tier available
- ✅ Easy Node.js deployment
- ✅ Automatic HTTPS
- ✅ PostgreSQL database included
- ✅ Custom domains supported

## Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)
3. Verify your email

## Step 2: Prepare Your Project for Git

Same as Railway - make sure your project is on GitHub.

## Step 3: Create New Web Service

1. **In Render Dashboard:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository: `skipaman-backend`

2. **Configure Service:**
   - **Name:** `skipaman-api` (or your choice)
   - **Region:** Choose closest to your users
   - **Branch:** `main` (or your default branch)
   - **Root Directory:** `skipaman`
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

3. **Click "Create Web Service"**

## Step 4: Add PostgreSQL Database

1. **In Render Dashboard:**
   - Click "New +" → "PostgreSQL"
   - Name it: `skipaman-db`
   - Choose free tier
   - Click "Create Database"

2. **Note the connection details:**
   - Internal Database URL (for Render services)
   - External Database URL (if needed)

## Step 5: Configure Environment Variables

1. **In your Web Service:**
   - Go to "Environment" tab
   - Add these variables:

### Required Variables:

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=10000
```

**Note:** Render uses port 10000 by default, but check your service settings.

### Security Keys:

```env
APP_KEYS=wv3D0PjEiw3piiqmE7IVa7H1oubcby6EbltDGg1eWN0=
API_TOKEN_SALT=tg8klNVYUZkax3yNpskHkn3mEseVeKkzwwqeAE4xwDM=
ADMIN_JWT_SECRET=zuFsNtJowmR48zfckMJe30mSot+KcsqzgW+bcS7fDGA=
TRANSFER_TOKEN_SALT=HSw7wWGvmaAHWkMhFgQJptkpKd5dPi1GRVP4dcSqbcM=
ENCRYPTION_KEY=3yJ96NTYJyA5gtpkK0Bc0yXGy/ng+2rPxKK4ZabCEjk=
```

### Database Configuration:

**For Render PostgreSQL:**

1. In your Web Service → "Environment" tab
2. Click "Link Database" and select your PostgreSQL database
3. This automatically adds `DATABASE_URL`

Then add:

```env
DATABASE_CLIENT=postgres
DATABASE_SSL=true
```

Or manually:

```env
DATABASE_CLIENT=postgres
DATABASE_URL=<from Render PostgreSQL service>
DATABASE_SSL=true
```

## Step 6: Get Your Strapi URL

1. **In Render Dashboard:**
   - Your service will have a URL like: `https://skipaman-api.onrender.com`
   - This is your Strapi API URL

## Step 7: Update Frontend

Update your frontend `.env.production`:

```env
VITE_STRAPI_URL=https://skipaman-api.onrender.com
```

## Render Free Tier Notes

- Services sleep after 15 minutes of inactivity
- Wakes up on first request (may take 30-60 seconds)
- Perfect for development
- Upgrade for always-on service

## Troubleshooting

### Service Won't Start
- Check logs in Render dashboard
- Verify all environment variables
- Check PORT matches Render's requirement (usually 10000)

### Database Connection
- Use "Link Database" feature for automatic connection
- Or manually set DATABASE_URL from PostgreSQL service

## Next Steps

1. Deploy to Render
2. Get your Render URL
3. Update frontend configuration
4. Test connection

