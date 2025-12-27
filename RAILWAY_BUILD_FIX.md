# Railway Build Fix - Admin Panel Build Error

The build is failing during "Building admin panel" phase. Here are solutions:

## Solution 1: Add Memory Limit (Recommended)

In Railway Settings → Variables, add:
- **Name:** `NODE_OPTIONS`
- **Value:** `--max-old-space-size=4096`

This gives the build process more memory.

## Solution 2: Update Build Command

Change Railway build command to:
```
NODE_OPTIONS=--max-old-space-size=4096 npm install --legacy-peer-deps && npm run build
```

## Solution 3: Skip Admin Panel Build (Temporary)

If the above doesn't work, you can build admin panel separately. But this is not recommended for production.

## Solution 4: Check for Native Dependencies

The error might be from `better-sqlite3` compilation. If using PostgreSQL in production, you can remove `better-sqlite3` from dependencies.

## Common Causes

1. **Memory Issues** - Admin panel build is memory-intensive
2. **Native Module Compilation** - `better-sqlite3` needs to compile
3. **Build Timeout** - Railway free tier has time limits

## Next Steps

1. Add `NODE_OPTIONS=--max-old-space-size=4096` to Railway variables
2. Update build command to include memory option
3. Redeploy and check logs

