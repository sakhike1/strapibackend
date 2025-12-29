# CORS Debug Steps - Why You're Getting This Error

## The Error Explained

```
Access-Control-Allow-Origin header is present on the requested resource
```

This means:
- ❌ The CORS middleware is NOT sending the required headers
- ❌ Railway is either:
  1. Not running the updated code
  2. Strapi hasn't restarted with the new config
  3. The middleware isn't being loaded correctly

## Root Cause Analysis

### Why This Happens

1. **Railway deployed the code** ✅
2. **But Strapi is still running old config** ❌
3. **Service needs a restart** ⚠️

OR

1. **Middleware order issue** - CORS must come before other middlewares
2. **Config not being read** - TypeScript config might not be compiled correctly
3. **Security middleware blocking** - Security middleware might be interfering

## Immediate Fix Steps

### Step 1: Verify Railway Has Latest Code

1. Go to Railway Dashboard → Deployments
2. Check if latest commit is deployed
3. If not, wait or force redeploy

### Step 2: **CRITICAL - Restart Railway Service**

**This is the #1 reason CORS doesn't work:**

1. Railway Dashboard → Your Service
2. Settings tab → **Click "Restart"**
3. Wait 30-60 seconds
4. Check logs for "Server started"

### Step 3: Verify CORS Headers Are Being Sent

After restart, test in browser console:

```javascript
// Test OPTIONS preflight
fetch('https://strapibackend-production-bb58.up.railway.app/api/products', {
  method: 'OPTIONS',
  headers: {
    'Origin': 'http://localhost:5174',
    'Access-Control-Request-Method': 'GET'
  }
})
.then(r => {
  console.log('Status:', r.status);
  console.log('Allow-Origin:', r.headers.get('Access-Control-Allow-Origin'));
  console.log('Allow-Methods:', r.headers.get('Access-Control-Allow-Methods'));
})
.catch(e => console.error('Error:', e));
```

**Expected:**
- Status: `200` or `204`
- `Allow-Origin: http://localhost:5174`
- `Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD`

### Step 4: Check Railway Logs

Look for:
- ✅ "Server started" = Good
- ✅ No CORS errors = Good
- ❌ Any middleware errors = Problem

### Step 5: If Still Not Working - Temporary Wildcard Test

To verify CORS works at all, temporarily use:

```typescript
origin: ['*'], // TEMPORARY TEST ONLY
```

If this works, then the issue is with the origin matching.
If this doesn't work, the CORS middleware isn't loading at all.

## Current Configuration

✅ **Code is correct:**
- `enabled: true`
- `origin: ['http://localhost:5174', ...]`
- `methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD']`
- `credentials: true`
- `maxAge: 86400`

## Most Likely Solution

**90% of the time, the issue is:**
1. Railway deployed the code ✅
2. But service wasn't restarted ❌
3. **Solution: Restart Railway service** ✅

## After Restart

1. Wait 30-60 seconds
2. Test in browser console (code above)
3. Check response headers
4. Test your frontend

If it still doesn't work after restart, there might be a deeper issue with how Strapi is loading the middleware configuration.



