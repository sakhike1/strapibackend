# Railway Variables Troubleshooting

## Issue: ADMIN_JWT_SECRET Not Being Read

If you're still getting "Missing admin.auth.secret" error after adding the variable:

### Step 1: Verify Variable is Added

1. Go to Railway → Your Service → Variables tab
2. Look for `ADMIN_JWT_SECRET` in the list
3. Check:
   - Name is exactly: `ADMIN_JWT_SECRET` (no typos, case-sensitive)
   - Value is exactly: `zuFsNtJowmR48zfckMJe30mSot+KcsqzgW+bcS7fDGA=`
   - No extra spaces

### Step 2: Check APP_KEYS Format

`APP_KEYS` needs to be formatted as an array. In Railway, you can:

**Option A: Single value (Railway will convert)**
- Name: `APP_KEYS`
- Value: `wv3D0PjEiw3piiqmE7IVa7H1oubcby6EbltDGg1eWN0=`

**Option B: Comma-separated (if Railway supports it)**
- Name: `APP_KEYS`
- Value: `wv3D0PjEiw3piiqmE7IVa7H1oubcby6EbltDGg1eWN0=`

### Step 3: Force Restart

After adding/updating variables:
1. Go to Deployments tab
2. Click "Redeploy" on the latest deployment
3. This forces Railway to reload all environment variables

### Step 4: Verify All Variables

Make sure ALL these are in Railway Variables (check each one):

```
✅ NODE_ENV = production
✅ HOST = 0.0.0.0
✅ PORT = 1337
✅ APP_KEYS = wv3D0PjEiw3piiqmE7IVa7H1oubcby6EbltDGg1eWN0=
✅ API_TOKEN_SALT = tg8klNVYUZkax3yNpskHkn3mEseVeKkzwwqeAE4xwDM=
✅ ADMIN_JWT_SECRET = zuFsNtJowmR48zfckMJe30mSot+KcsqzgW+bcS7fDGA=
✅ TRANSFER_TOKEN_SALT = HSw7wWGvmaAHWkMhFgQJptkpKd5dPi1GRVP4dcSqbcM=
✅ ENCRYPTION_KEY = 3yJ96NTYJyA5gtpkK0Bc0yXGy/ng+2rPxKK4ZabCEjk=
```

### Step 5: Check Railway Logs

After redeploying, check the logs to see if variables are being read. Look for any errors about missing variables.

## Common Mistakes

1. **Typo in variable name:** `ADMIN_JWT_SECRET` not `ADMIN_JWT` or `JWT_SECRET`
2. **Extra spaces:** No spaces before/after name or value
3. **Wrong service:** Make sure you're adding to the Strapi service, not the database
4. **Not redeployed:** Variables need a restart to take effect

## If Still Not Working

Try deleting and re-adding the `ADMIN_JWT_SECRET` variable:
1. Delete the variable
2. Wait a moment
3. Add it again with exact name and value
4. Redeploy

