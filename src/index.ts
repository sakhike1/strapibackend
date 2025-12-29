import type { Core } from '@strapi/strapi';

async function ensureProductPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({
      where: { type: 'public' },
    });

  if (!publicRole) {
    console.log('⚠️ Public role not found - cannot set Product permissions');
    return;
  }
  
  console.log(`✅ Public role found (ID: ${publicRole.id})`);

  const actions = ['find', 'findOne'];

  for (const action of actions) {
    const existing = await strapi
      .query('plugin::users-permissions.permission')
      .findOne({
        where: {
          action: `api::product.product.${action}`,
          role: publicRole.id,
        },
      });

    if (!existing) {
      await strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::product.product.${action}`,
          role: publicRole.id,
        },
      });
      console.log(`✅ Created Product ${action} permission for public role (ID: ${publicRole.id})`);
    } else {
      console.log(`✅ Product ${action} permission already exists for public role`);
    }
  }
}

async function ensureNewsletterSubscriptionPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({
      where: { type: 'public' },
    });

  if (!publicRole) {
    return;
  }

  // Only allow 'create' action for public role
  const action = 'create';

  const exists = await strapi
    .query('plugin::users-permissions.permission')
    .findOne({
      where: {
        action: `api::newsletter-subscription.newsletter-subscription.${action}`,
        role: publicRole.id,
      },
    });

  if (!exists) {
    await strapi.query('plugin::users-permissions.permission').create({
      data: {
        action: `api::newsletter-subscription.newsletter-subscription.${action}`,
        role: publicRole.id,
      },
    });
  }
}

async function ensureSearchQueryPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({
      where: { type: 'public' },
    });

  if (!publicRole) {
    return;
  }

  // Only allow 'create' action for public role to log searches
  const action = 'create';

  const exists = await strapi
    .query('plugin::users-permissions.permission')
    .findOne({
      where: {
        action: `api::search-query.search-query.${action}`,
        role: publicRole.id,
      },
    });

  if (!exists) {
    await strapi.query('plugin::users-permissions.permission').create({
      data: {
        action: `api::search-query.search-query.${action}`,
        role: publicRole.id,
      },
    });
  }
}

async function ensureCustomDesignRequestPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({
      where: { type: 'public' },
    });

  const authenticatedRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({
      where: { type: 'authenticated' },
    });

  // Public role: only allow 'create' (submit design requests)
  if (publicRole) {
    const action = 'create';
    const exists = await strapi
      .query('plugin::users-permissions.permission')
      .findOne({
        where: {
          action: `api::custom-design-request.custom-design-request.${action}`,
          role: publicRole.id,
        },
      });

    if (!exists) {
      await strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::custom-design-request.custom-design-request.${action}`,
          role: publicRole.id,
        },
      });
    }
  }

  // Authenticated role: allow 'find', 'findOne', and 'create'
  if (authenticatedRole) {
    const actions = ['find', 'findOne', 'create'];

    for (const action of actions) {
      const exists = await strapi
        .query('plugin::users-permissions.permission')
        .findOne({
          where: {
            action: `api::custom-design-request.custom-design-request.${action}`,
            role: authenticatedRole.id,
          },
        });

      if (!exists) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: {
            action: `api::custom-design-request.custom-design-request.${action}`,
            role: authenticatedRole.id,
          },
        });
      }
    }
  }
}

async function ensureOrderPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({
      where: { type: 'public' },
    });

  // Public role: only allow 'create' (place orders)
  if (publicRole) {
    const action = 'create';
    const exists = await strapi
      .query('plugin::users-permissions.permission')
      .findOne({
        where: {
          action: `api::order.order.${action}`,
          role: publicRole.id,
        },
      });

    if (!exists) {
      await strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::order.order.${action}`,
          role: publicRole.id,
        },
      });
    }
  }
}

export default {
  register() {
    console.log('📝 Bootstrap register() called');
  },
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    console.log('🚀 ============================================');
    console.log('🚀 BOOTSTRAP STARTING - Setting permissions...');
    console.log('🚀 ============================================');
    
    try {
      console.log('📦 Step 1: Setting Product permissions...');
      await ensureProductPermissions(strapi);
      console.log('✅ Step 1 complete: Product permissions set');
      
      console.log('📦 Step 2: Setting Newsletter permissions...');
      await ensureNewsletterSubscriptionPermissions(strapi);
      console.log('✅ Step 2 complete: Newsletter permissions set');
      
      console.log('📦 Step 3: Setting SearchQuery permissions...');
      await ensureSearchQueryPermissions(strapi);
      console.log('✅ Step 3 complete: SearchQuery permissions set');
      
      console.log('📦 Step 4: Setting CustomDesignRequest permissions...');
      await ensureCustomDesignRequestPermissions(strapi);
      console.log('✅ Step 4 complete: CustomDesignRequest permissions set');
      
      console.log('📦 Step 5: Setting Order permissions...');
      await ensureOrderPermissions(strapi);
      console.log('✅ Step 5 complete: Order permissions set');
      
      console.log('🚀 ============================================');
      console.log('✅ BOOTSTRAP COMPLETED - All permissions set!');
      console.log('🚀 ============================================');
    } catch (error) {
      console.error('❌ ============================================');
      console.error('❌ BOOTSTRAP ERROR:', error);
      console.error('❌ Stack:', error instanceof Error ? error.stack : 'No stack');
      console.error('❌ ============================================');
    }
  },
};
