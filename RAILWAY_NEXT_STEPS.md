# Railway Deployment - Next Steps

Your build succeeded! 🎉 Now follow these steps to complete the deployment.

## Step 1: Add Environment Variables

Go to Railway → Your Service → Variables tab, and add:

### Required Variables:
```
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
```

### Security Keys (from AFRIHOST_DEPLOYMENT_ENV_VARS.txt):
```
APP_KEYS=wv3D0PjEiw3piiqmE7IVa7H1oubcby6EbltDGg1eWN0=
API_TOKEN_SALT=tg8klNVYUZkax3yNpskHkn3mEseVeKkzwwqeAE4xwDM=
ADMIN_JWT_SECRET=zuFsNtJowmR48zfckMJe30mSot+KcsqzgW+bcS7fDGA=
TRANSFER_TOKEN_SALT=HSw7wWGvmaAHWkMhFgQJptkpKd5dPi1GRVP4dcSqbcM=
ENCRYPTION_KEY=3yJ96NTYJyA5gtpkK0Bc0yXGy/ng+2rPxKK4ZabCEjk=
```

## Step 2: Set Up Database

### Option A: Railway PostgreSQL (Recommended - Easiest)

1. In Railway Dashboard, click "New" → "Database" → "PostgreSQL"
2. Railway creates it automatically
3. Go back to your service → Variables
4. Add: `DATABASE_CLIENT=postgres`
5. Add: `DATABASE_URL=${{Postgres.DATABASE_URL}}` (use Railway's variable reference)

### Option B: Use Your Afrihost MySQL

Add these variables (use your actual database credentials):
```
DATABASE_CLIENT=mysql
DATABASE_HOST=<your-mysql-host>
DATABASE_PORT=3306
DATABASE_NAME=<your-database-name>
DATABASE_USERNAME=<your-database-username>
DATABASE_PASSWORD=<your-database-password>
```

**Note:** You may need to allow Railway's IP addresses in your MySQL database settings.

## Step 3: Get Your Railway URL

1. Go to Railway → Your Service → Settings → Networking
2. Click "Generate Domain" (or use the default)
3. Copy the URL (e.g., `https://your-app.up.railway.app`)

## Step 4: Test Admin Panel

1. Visit: `https://your-railway-url.up.railway.app/admin`
2. Create your admin account (first time only)
3. Login and verify it works

## Step 5: Update Frontend

Update your frontend `.env.production`:
```
VITE_STRAPI_URL=https://your-railway-url.up.railway.app
```

Then rebuild and redeploy your frontend.

## Troubleshooting

### Application won't start
- Check Railway logs
- Verify all environment variables are set
- Check database connection

### Database connection errors
- Verify database credentials
- For Railway PostgreSQL, use the `${{Postgres.DATABASE_URL}}` variable
- For Afrihost MySQL, check if external connections are allowed

### Admin panel not loading
- Verify the service is running (check Railway logs)
- Check the URL is correct
- Clear browser cache

## Success Checklist

- [ ] Environment variables added
- [ ] Database configured
- [ ] Railway URL obtained
- [ ] Admin panel accessible
- [ ] Frontend updated with Railway URL
- [ ] Frontend can connect to Strapi API

