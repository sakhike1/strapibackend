# Fix JWT Secret Error for Users-Permissions Plugin

## Error
"Missing jwtSecret. Please, set configuration variable 'jwtSecret' for the users-permissions plugin"

## Solution

I've updated `config/plugins.ts` to use `ADMIN_JWT_SECRET` for the users-permissions plugin. 

## Add JWT_SECRET Variable (Optional)

You can also add a separate `JWT_SECRET` variable in Railway if you want it different from `ADMIN_JWT_SECRET`:

- **Name:** `JWT_SECRET`
- **Value:** `5vUNmF1h8I4oKgjtL3Ir4w==` (or generate a new one)

But the updated config will use `ADMIN_JWT_SECRET` if `JWT_SECRET` is not set, so you don't need to add it unless you want a separate secret.

## After Pushing

1. Railway will auto-deploy with the updated config
2. The error should be resolved
3. Strapi should start successfully

## Note

The config now uses `ADMIN_JWT_SECRET` for both admin and users-permissions, which is fine for most use cases. If you want separate secrets, add `JWT_SECRET` as a separate variable.



