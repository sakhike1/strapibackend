# Railway - Skip Build Step

Since we have pre-built admin panel files, we can skip the build step entirely in Railway.

## Solution: Update Railway Build Command

In Railway Settings → Build Command, change it to:

```
npm install --legacy-peer-deps
```

**Remove the `npm run build` part** since we already have pre-built files in `dist/build`.

## Why This Works

- We've committed the pre-built `dist/build` folder to Git
- Strapi will use these files when starting
- No need to build during deployment
- Avoids all native module compilation issues

## Alternative: If Build is Required

If Railway still requires a build step, use:

```
npm install --legacy-peer-deps && node check-build.js && echo "Build skipped - using pre-built files"
```

This will:
1. Install dependencies
2. Check if dist/build exists (it does)
3. Skip the actual build
4. Continue to start command

## Start Command

Make sure Railway Start Command is:
```
npm start
```

## After This Change

1. Railway will install dependencies
2. Skip the build (use pre-built files)
3. Start Strapi successfully
4. Admin panel will work from pre-built files



