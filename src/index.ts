import type { Core } from '@strapi/strapi';

async function ensureProductPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({
      where: { type: 'public' },
    });

  if (!publicRole) {
    console.log('⚠️ Public role not found');
    return;
  }

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
      console.log(`✅ Created Product ${action} permission for public role`);
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
  register() {},
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensureProductPermissions(strapi);
    await ensureNewsletterSubscriptionPermissions(strapi);
    await ensureSearchQueryPermissions(strapi);
    await ensureCustomDesignRequestPermissions(strapi);
    await ensureOrderPermissions(strapi);
  },
};
