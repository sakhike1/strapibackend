'use strict';

const { createStrapi, compileStrapi } = require('@strapi/strapi');

async function main() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  try {
    // Get all admin users
    const adminUsers = await app.query('admin::user').findMany({
      select: ['id', 'email', 'firstname', 'lastname', 'isActive', 'blocked'],
    });

    if (adminUsers.length === 0) {
      console.log('No admin users found in the database.');
    } else {
      console.log('\n=== Admin Users ===\n');
      adminUsers.forEach((user, index) => {
        console.log(`User ${index + 1}:`);
        console.log(`  Email: ${user.email}`);
        console.log(`  Name: ${user.firstname} ${user.lastname}`);
        console.log(`  Active: ${user.isActive}`);
        console.log(`  Blocked: ${user.blocked}`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('Error fetching admin users:', error);
  }

  await app.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});






