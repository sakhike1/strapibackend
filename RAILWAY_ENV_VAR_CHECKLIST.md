# Railway Environment Variables Checklist

## Critical: ADMIN_JWT_SECRET Error Fix

The error "Missing admin.auth.secret configuration" means `ADMIN_JWT_SECRET` is not set correctly.

## Step-by-Step: Add ADMIN_JWT_SECRET

1. **Go to Railway Dashboard**
   - Click on your Strapi service
   - Click "Variables" tab

2. **Check if it exists:**
   - Look for `ADMIN_JWT_SECRET` in the list
   - If it's there, check the value is correct
   - If it's missing, add it

3. **Add the variable:**
   - Click "New Variable"
   - **Name:** `ADMIN_JWT_SECRET` (exactly this, case-sensitive)
   - **Value:** `zuFsNtJowmR48zfckMJe30mSot+KcsqzgW+bcS7fDGA=`
   - Click "Add"

4. **Verify it's added:**
   - You should see `ADMIN_JWT_SECRET` in the variables list
   - Check the value matches exactly

5. **Restart the service:**
   - After adding, Railway should auto-restart
   - Or manually click "Redeploy" or "Restart"

## Complete List of Required Variables

Make sure ALL of these are in Railway Variables:

```
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=wv3D0PjEiw3piiqmE7IVa7H1oubcby6EbltDGg1eWN0=
API_TOKEN_SALT=tg8klNVYUZkax3yNpskHkn3mEseVeKkzwwqeAE4xwDM=
ADMIN_JWT_SECRET=zuFsNtJowmR48zfckMJe30mSot+KcsqzgW+bcS7fDGA=
TRANSFER_TOKEN_SALT=HSw7wWGvmaAHWkMhFgQJptkpKd5dPi1GRVP4dcSqbcM=
ENCRYPTION_KEY=3yJ96NTYJyA5gtpkK0Bc0yXGy/ng+2rPxKK4ZabCEjk=
```

Plus database variables (PostgreSQL or MySQL).

## Common Issues

### Variable not showing up
- Check spelling: `ADMIN_JWT_SECRET` (not `ADMIN_JWT` or `JWT_SECRET`)
- Make sure there are no extra spaces
- Verify it's in the Variables tab, not Settings

### Service keeps crashing
- After adding variables, wait for Railway to restart
- Check logs to see if variable is being read
- Try manually restarting the service

### Still getting error
- Double-check the variable name is exactly `ADMIN_JWT_SECRET`
- Verify the value is exactly: `zuFsNtJowmR48zfckMJe30mSot+KcsqzgW+bcS7fDGA=`
- Make sure you're adding it to the correct service (your Strapi service, not the database)

