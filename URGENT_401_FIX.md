# URGENT: Fix 401 Errors - Step by Step

## The Problem

Your frontend is getting **401 Unauthorized** errors when trying to fetch products. This means Products require authentication, but they should be public.

## Root Cause

The bootstrap code that sets public permissions isn't running or didn't work.

## IMMEDIATE FIX - Choose One Method

### Method 1: Check Railway Logs First (RECOMMENDED)

**Do this FIRST to see if bootstrap ran:**

1. **Railway Dashboard** → Your `strapibackend` service
2. **Click "Logs" tab**
3. **Look for:** `🚀 BOOTSTRAP STARTING...`
4. **Share what you see!**

**If you see bootstrap messages:**
- ✅ Bootstrap ran
- Check if there were errors
- Permissions might already be set

**If you DON'T see bootstrap messages:**
- ❌ Bootstrap didn't run
- **Restart Railway** (Settings → Restart)
- Wait 1-2 minutes
- Check logs again

### Method 2: Try API Endpoint (Quick Fix)

**Call this endpoint to manually set permissions:**

Open browser console on your deployed site (`https://skipaman.co.za`) and run:

```javascript
fetch('https://strapibackend-production-bb58.up.railway.app/api/admin/set-product-permissions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
})
.then(r => {
  console.log('Status:', r.status);
  return r.json();
})
.then(data => {
  console.log('Result:', data);
  if (data.success) {
    console.log('✅ Permissions set! Now test products:');
    // Test products API
    return fetch('https://strapibackend-production-bb58.up.railway.app/api/products?populate=*&pagination[pageSize]=10');
  } else {
    console.error('❌ Failed to set permissions:', data);
  }
})
.then(r => {
  if (r) {
    console.log('Products API Status:', r.status);
    return r.json();
  }
})
.then(data => {
  if (data) console.log('✅ Products data:', data);
})
.catch(e => console.error('Error:', e));
```

**If this endpoint returns 401:**
- It requires authentication
- We need to make it public or use Method 3

### Method 3: Via Strapi Admin (If Accessible)

1. **Go to:** `https://strapibackend-production-bb58.up.railway.app/admin`
2. **Login** to Strapi admin
3. **Navigate:** Settings → Users & Permissions Plugin → Roles → Public
4. **Find:** Product (in the permissions list)
5. **Check boxes:** `find` and `findOne`
6. **Click:** Save (top right)
7. **Test:** Refresh your frontend site

### Method 4: Restart Railway (If Bootstrap Didn't Run)

If bootstrap messages aren't in logs:

1. **Railway Dashboard** → Your service
2. **Settings tab** → **Click "Restart"**
3. **Wait 1-2 minutes**
4. **Check logs** for bootstrap messages
5. **Test API** again

## Test After Fix

**Test in browser console:**

```javascript
fetch('https://strapibackend-production-bb58.up.railway.app/api/products?populate=*&pagination[pageSize]=10')
.then(r => {
  console.log('Status:', r.status);
  if (r.status === 200) {
    console.log('✅ SUCCESS! Products are now public!');
    return r.json();
  } else {
    console.error('❌ Still 401 - permissions not set');
    return r.text();
  }
})
.then(data => {
  if (data) console.log('Data:', data);
});
```

**Expected:**
- ✅ Status 200 = Fixed!
- ❌ Status 401 = Still need to set permissions

## What I Need From You

1. **Check Railway logs** - Do you see `🚀 BOOTSTRAP STARTING...`?
2. **Try Method 2** - Did the API endpoint work?
3. **Can you access Strapi admin?** - `https://strapibackend-production-bb58.up.railway.app/admin`
4. **Test result** - What status code do you get?

## Summary

**Quickest fix:** Try Method 2 (API endpoint) first
**Best fix:** Check Railway logs to see if bootstrap ran
**Manual fix:** Use Strapi admin (Method 3) if accessible

**Start with Method 1 (check logs) to understand what's happening!**



