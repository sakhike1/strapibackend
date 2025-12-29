# Complete Fix Guide - 401 Errors & Authentication Issues

## Root Cause

The **401 errors** mean Products still require authentication. The bootstrap code should set public permissions, but it's not running or not working.

## Solution: Two-Part Fix

### Part 1: Verify Bootstrap Ran (CRITICAL)

**Check Railway Logs RIGHT NOW:**

1. Go to Railway Dashboard → Your `strapibackend` service
2. Click **"Logs"** tab
3. Look for these messages:

```
🚀 ============================================
🚀 BOOTSTRAP STARTING - Setting permissions...
🚀 ============================================
```

**If you DON'T see these messages:**
- Bootstrap didn't run
- **Restart Railway service** (Settings → Restart)
- Wait 1-2 minutes
- Check logs again

**If you DO see bootstrap messages:**
- Check if they show errors
- Check if permissions were created
- Share the logs with me

### Part 2: Manual Permission Fix (If Bootstrap Fails)

If bootstrap isn't running, we need to set permissions manually via Strapi Admin:

#### Option A: Via Strapi Admin UI (If Accessible)

1. **Go to:** `https://strapibackend-production-bb58.up.railway.app/admin`
2. **Login** to Strapi admin
3. **Go to:** Settings → Users & Permissions Plugin → Roles → Public
4. **Find:** Product (under Permissions)
5. **Check:** `find` and `findOne` checkboxes
6. **Click:** Save

#### Option B: Via API Endpoint (If UI Doesn't Work)

**Call this endpoint to set permissions:**

```bash
curl -X POST https://strapibackend-production-bb58.up.railway.app/api/admin/set-product-permissions
```

Or in browser console:

```javascript
fetch('https://strapibackend-production-bb58.up.railway.app/api/admin/set-product-permissions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
})
.then(r => r.json())
.then(data => {
  console.log('Result:', data);
  if (data.success) {
    console.log('✅ Permissions set! Test products API now.');
  }
});
```

**Note:** This endpoint might require authentication. If it returns 401, we'll need to make it public or add a secret token.

### Part 3: Fix Authentication Errors

The "Unable to connect to authentication server" errors suggest:

1. **CORS issue** - Check if `https://skipaman.co.za` is in CORS config ✅ (Already done)
2. **Wrong API URL** - Frontend might be using wrong Strapi URL
3. **Missing endpoints** - Auth endpoints might not be accessible

**Check Frontend Configuration:**

The frontend needs to know the Strapi URL. Check if your frontend has:

```env
VITE_STRAPI_URL=https://strapibackend-production-bb58.up.railway.app
```

Or check your frontend code for where it sets the Strapi URL.

## Immediate Action Plan

### Step 1: Check Railway Logs (DO THIS FIRST)

**What to look for:**
- Bootstrap messages (`🚀 BOOTSTRAP STARTING...`)
- Permission creation messages (`✅ Created Product find...`)
- Any errors

**Share what you see!**

### Step 2: Test API Directly

Test in browser console on your deployed site:

```javascript
// Test WITHOUT token - should work if permissions are set
fetch('https://strapibackend-production-bb58.up.railway.app/api/products?populate=*&pagination[pageSize]=10')
.then(r => {
  console.log('Status:', r.status);
  if (r.status === 200) {
    console.log('✅ SUCCESS! Products are public!');
    return r.json();
  } else {
    console.error('❌ Still 401 - permissions not set');
    return r.text();
  }
})
.then(data => {
  if (data) {
    console.log('✅ Data received:', data);
  }
})
.catch(e => console.error('❌ Error:', e));
```

### Step 3: Check Frontend Strapi URL

**On your deployed frontend (`https://skipaman.co.za`):**

Open browser console and check:

```javascript
// Check what URL the frontend is using
console.log('Strapi URL:', window.__STRAPI_URL__ || 'Not set');
```

Or check your frontend's environment variables/build config.

### Step 4: If Bootstrap Didn't Run

**Restart Railway:**
1. Railway Dashboard → Your service
2. Settings → Restart
3. Wait 1-2 minutes
4. Check logs again

## What I Need From You

1. **Railway logs** - Do you see bootstrap messages?
2. **API test result** - What status code do you get?
3. **Frontend Strapi URL** - What URL is the frontend using?
4. **Can you access Strapi admin?** - `https://strapibackend-production-bb58.up.railway.app/admin`

## Summary

**Main Issue:** Products require authentication (401 errors)
**Root Cause:** Bootstrap code isn't running or permissions aren't being set
**Fix:** 
1. Check Railway logs to see if bootstrap ran
2. If not, restart Railway
3. If still not working, manually set permissions
4. Verify frontend is using correct Strapi URL

**Check Railway logs first and share what you see!**

