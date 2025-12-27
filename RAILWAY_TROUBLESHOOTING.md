# Railway Build Troubleshooting

## Common Build Failures and Solutions

### 1. "Failed to build an image"

**Check the build logs:**
- In Railway dashboard, click on your service
- Go to "Deployments" tab
- Click on the failed deployment
- Click "View Logs" to see the exact error

### 2. Root Directory Not Set

**Fix:**
1. Go to Railway → Your Service → Settings
2. Find "Root Directory"
3. Set it to: `skipaman`
4. Save and redeploy

### 3. Build Command Issues

**If using nixpacks.toml:**
- The file should be in the `skipaman` folder
- Railway will automatically use it

**If not using config file:**
1. Go to Settings → Build
2. Set Build Command: `npm install --legacy-peer-deps && npm run build`
3. Set Start Command: `npm start`

### 4. Memory Issues During Build

**Add to Railway environment variables:**
```
NODE_OPTIONS=--max-old-space-size=4096
```

### 5. TypeScript Compilation Errors

**If you see TypeScript errors:**
- Make sure `tsconfig.json` is in `skipaman` folder
- Railway should compile TypeScript automatically
- If not, add to build command: `npm install && npx tsc && npm run build`

### 6. Missing Dependencies

**If build fails with "module not found":**
- Check that `package.json` is in `skipaman` folder
- Verify all dependencies are listed in `package.json`
- Try: `npm install --legacy-peer-deps` in build command

## Quick Fixes

### Fix 1: Check Root Directory
```
Settings → Root Directory → Set to: skipaman
```

### Fix 2: Update Build Command
```
Settings → Build Command → npm install --legacy-peer-deps && npm run build
```

### Fix 3: Add Memory Option
```
Variables → NODE_OPTIONS → --max-old-space-size=4096
```

### Fix 4: Check Logs
Always check the build logs for the specific error message!

## Still Having Issues?

1. **Share the exact error from logs** - The build logs will show the specific error
2. **Check Root Directory** - This is the #1 cause of build failures
3. **Verify package.json location** - Must be in `skipaman` folder
4. **Check Node.js version** - Should be 18.x or 20.x

