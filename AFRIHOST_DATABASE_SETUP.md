# Database Setup Guide for Afrihost cPanel

This guide will help you create a MySQL database for your Strapi application in Afrihost cPanel.

## Step 1: Create Database

1. **Login to cPanel**
2. **Open "MySQL Databases"** (usually in the "Databases" section)
3. **Create New Database:**
   - Enter a database name (e.g., `skipaman_db` or `strapi_prod`)
   - Click "Create Database"
   - Note: cPanel will prefix it with your username (e.g., `username_skipaman_db`)
   - **Save the full database name** (with prefix)

## Step 2: Create Database User

1. **Scroll down to "MySQL Users"** section
2. **Create New User:**
   - Enter username (e.g., `skipaman_user` or `strapi_user`)
   - Enter a strong password (use the password generator)
   - Click "Create User"
   - Note: cPanel will prefix it with your username (e.g., `username_skipaman_user`)
   - **Save the full username** (with prefix) and password

## Step 3: Add User to Database

1. **Scroll down to "Add User to Database"** section
2. **Select the user** you just created from the dropdown
3. **Select the database** you just created from the dropdown
4. **Click "Add"**
5. **Grant ALL PRIVILEGES:**
   - Check "ALL PRIVILEGES" checkbox
   - Click "Make Changes"

## Step 4: Document Your Credentials

Save these values for the environment variables:

```
DATABASE_NAME=username_skipaman_db
DATABASE_USERNAME=username_skipaman_user
DATABASE_PASSWORD=your_strong_password_here
```

## Step 5: Update Environment Variables

Add these to your Node.js app settings in cPanel:

```
DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=username_skipaman_db
DATABASE_USERNAME=username_skipaman_user
DATABASE_PASSWORD=your_strong_password_here
```

## Troubleshooting

### "Access denied" errors
- Verify the user has ALL PRIVILEGES on the database
- Check that you're using the full username (with cPanel prefix)
- Verify the password is correct

### "Database doesn't exist" errors
- Check you're using the full database name (with cPanel prefix)
- Verify the database was created successfully

### Connection refused
- Make sure `DATABASE_HOST=localhost` (not 127.0.0.1)
- Verify `DATABASE_PORT=3306` for MySQL



