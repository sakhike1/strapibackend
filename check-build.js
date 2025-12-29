#!/usr/bin/env node
// Check if admin panel is already built
const fs = require('fs');
const path = require('path');

const buildPath = path.join(__dirname, 'dist', 'build');

if (fs.existsSync(buildPath)) {
  console.log('✓ Admin panel already built, skipping build step...');
  process.exit(0);
} else {
  console.log('Admin panel not found, will build...');
  process.exit(1);
}



