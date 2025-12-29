/**
 * Script to manually set Product permissions for public role
 * Run this if bootstrap code doesn't work: node scripts/set-product-permissions.js
 */

const strapi = require('@strapi/strapi');

async function setProductPermissions() {
  const app = await strapi().load();

  try {
    const publicRole = await app
      .query('plugin::users-permissions.role')
      .findOne({
        where: { type: 'public' },
      });

    if (!publicRole) {
      console.error('❌ Public role not found!');
      process.exit(1);
    }

    console.log('✅ Found public role:', publicRole.id);

    const actions = ['find', 'findOne'];

    for (const action of actions) {
      const existing = await app
        .query('plugin::users-permissions.permission')
        .findOne({
          where: {
            action: `api::product.product.${action}`,
            role: publicRole.id,
          },
        });

      if (!existing) {
        await app.query('plugin::users-permissions.permission').create({
          data: {
            action: `api::product.product.${action}`,
            role: publicRole.id,
          },
        });
        console.log(`✅ Created Product ${action} permission for public role`);
      } else {
        console.log(`✅ Product ${action} permission already exists`);
      }
    }

    console.log('\n✅ Product permissions set successfully!');
    console.log('✅ Products should now be publicly accessible');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting permissions:', error);
    process.exit(1);
  } finally {
    await app.destroy();
  }
}

setProductPermissions();

