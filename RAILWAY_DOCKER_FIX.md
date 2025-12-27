# Railway Docker Fix for @swc/core Native Binding

The `@swc/core` native binding error persists. Railway might not have the build tools needed. 

## Solution: Use Dockerfile

I've created a `Dockerfile` that:
1. Uses Node.js 20 Alpine (lightweight)
2. Installs build tools (python3, make, g++)
3. Rebuilds native modules properly
4. Builds Strapi with memory limit

## How to Use

### Option 1: Railway Auto-Detects Dockerfile

Railway should automatically detect the Dockerfile and use it instead of Railpack.

1. The Dockerfile is already in your repo
2. Railway should auto-detect it
3. Redeploy and it should use Docker build

### Option 2: Force Docker Build in Railway

1. Go to Railway → Your Service → Settings
2. Find "Build Type" or "Builder"
3. Change from "Railpack" to "Dockerfile"
4. Save and redeploy

## Why This Works

- Dockerfile ensures build tools are available
- Alpine Linux is lightweight but has build tools
- Native modules compile correctly in Docker environment
- More control over the build process

## Alternative: If Docker Doesn't Work

If Railway doesn't use the Dockerfile, you can also try:

1. **Remove @swc/core and let Strapi reinstall:**
   - The updated build script now does this

2. **Use Railway's buildpacks:**
   - Railway might have a better buildpack for Node.js

3. **Contact Railway Support:**
   - They might have specific solutions for native modules

## Next Steps

1. Push the Dockerfile (already done)
2. Railway should auto-detect it
3. Redeploy
4. If it still uses Railpack, manually switch to Dockerfile in settings

