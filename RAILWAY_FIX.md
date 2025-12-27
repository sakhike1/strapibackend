# Fix Railway Build Error - Use npm install instead of npm ci

Railway is using `npm ci` which requires perfect sync between package.json and package-lock.json. We need to configure Railway to use `npm install` instead.

## Solution: Configure Railway Build Settings

### Step 1: Go to Railway Dashboard

1. Open your Railway project
2. Click on your service
3. Go to **"Settings"** tab

### Step 2: Change Build Command

1. Scroll down to **"Build"** section
2. Find **"Build Command"** field
3. Change it from (default/empty) to:
   ```
   npm install --legacy-peer-deps && npm run build
   ```
4. Click **"Save"**

### Step 3: Verify Start Command

1. In the same Settings page
2. Find **"Start Command"** field
3. Make sure it's set to:
   ```
   npm start
   ```
4. Click **"Save"**

### Step 4: Redeploy

1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on the latest deployment
3. Or Railway will auto-deploy after you save settings

## Alternative: Use Environment Variable

If the build command setting doesn't work, you can also:

1. Go to **"Variables"** tab
2. Add a new variable:
   - **Name:** `RAILWAY_BUILD_COMMAND`
   - **Value:** `npm install --legacy-peer-deps && npm run build`
3. Save and redeploy

## Why This Works

- `npm ci` requires exact sync (fails with any mismatch)
- `npm install` is more flexible and resolves dependencies
- `--legacy-peer-deps` helps with peer dependency conflicts
- This bypasses the package-lock.json sync issue

## After Fixing

Once you change the build command, Railway will:
1. Use `npm install` instead of `npm ci`
2. Successfully install dependencies
3. Build your Strapi admin panel
4. Start the application

