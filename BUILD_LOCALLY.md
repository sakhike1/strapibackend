# Build Admin Panel Locally and Deploy

Since Railway is having issues with native module compilation, we can build the admin panel locally and commit it.

## Step 1: Build Locally

On your local machine:

```powershell
cd C:\Users\sakhi\my-strapi-project\skipaman
npm install
npm run build
```

This will create the `public/build` folder with the compiled admin panel.

## Step 2: Commit Build Files

```powershell
git add public/build
git commit -m "Add pre-built admin panel for Railway deployment"
git push
```

## Step 3: Skip Build in Railway

Update Railway build command to:
```
npm install --legacy-peer-deps && npm start
```

This skips the build step since we already have the built files.

## Step 4: Update package.json Build Script

We can make the build script skip if build already exists:

```json
"build": "test -d public/build || (npm rebuild @swc/core better-sqlite3 && NODE_OPTIONS=--max-old-space-size=4096 strapi build)"
```

## Note

- You'll need to rebuild locally whenever you make changes to admin panel
- This is a workaround, not ideal for production
- Better long-term: Fix Railway native module issue or use Render

