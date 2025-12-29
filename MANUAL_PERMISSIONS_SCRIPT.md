# Manual Permissions Script - Emergency Fix

If bootstrap isn't running, use this script to manually set permissions.

## Option 1: Run via Railway Console

1. **Go to Railway Dashboard → Your service**
2. **Click "Deployments" tab**
3. **Click on the latest deployment**
4. **Click "View Logs"**
5. **Look for "Console" or "Shell" option** (if available)

Or use Railway's CLI:

```bash
railway run node scripts/set-product-permissions.js
```

## Option 2: Create API Endpoint to Trigger

I'll create a custom endpoint you can call via HTTP to set permissions.

## Option 3: Use Strapi Admin (If Accessible)

1. Go to: `https://strapibackend-production-bb58.up.railway.app/admin`
2. Login
3. Settings → Users & Permissions → Roles → Public
4. Find "Product" in permissions
5. Check `find` and `findOne`
6. Save

## Quick Test After Setting Permissions

```javascript
fetch('https://strapibackend-production-bb58.up.railway.app/api/products?populate=*&pagination[pageSize]=10')
.then(r => {
  console.log('Status:', r.status);
  return r.status === 200 ? r.json() : r.text();
})
.then(data => console.log('Result:', data));
```



