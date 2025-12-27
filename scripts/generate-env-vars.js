/**
 * Generate Strapi Environment Variables
 * 
 * Run this script to generate secure random values for Strapi environment variables
 * 
 * Usage: node scripts/generate-env-vars.js
 */

const crypto = require('crypto');

function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('base64');
}

console.log('\n=== Strapi Environment Variables ===\n');
console.log('Copy these to your hosting service (Railway, Render, Heroku, etc.):\n');

console.log('APP_KEYS=' + generateSecret());
console.log('API_TOKEN_SALT=' + generateSecret());
console.log('ADMIN_JWT_SECRET=' + generateSecret());
console.log('TRANSFER_TOKEN_SALT=' + generateSecret());
console.log('ENCRYPTION_KEY=' + generateSecret());
console.log('\n=== Database Configuration ===\n');
console.log('For SQLite (development):');
console.log('DATABASE_CLIENT=sqlite\n');
console.log('For PostgreSQL (production):');
console.log('DATABASE_CLIENT=postgres');
console.log('DATABASE_URL=your-postgres-connection-string');
console.log('DATABASE_SSL=true\n');
console.log('=== Server Configuration ===\n');
console.log('HOST=0.0.0.0');
console.log('PORT=1337');
console.log('NODE_ENV=production\n');
console.log('=== Notes ===');
console.log('- Never commit these values to git');
console.log('- Add them as environment variables in your hosting service');
console.log('- Each deployment should have unique values\n');

