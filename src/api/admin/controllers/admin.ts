/**
 * admin controller - Custom admin actions
 */

import type { Core } from '@strapi/strapi';

export default {
  async setProductPermissions(ctx: any) {
    try {
      const strapi = ctx.request.app as Core.Strapi;
      
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({
          where: { type: 'public' },
        });

      if (!publicRole) {
        return ctx.badRequest('Public role not found');
      }

      const actions = ['find', 'findOne'];
      const results = [];

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
          results.push(`✅ Created Product ${action} permission`);
        } else {
          results.push(`✅ Product ${action} permission already exists`);
        }
      }

      return ctx.send({
        success: true,
        message: 'Product permissions set successfully',
        results,
      });
    } catch (error: any) {
      return ctx.badRequest('Error setting permissions', { error: error.message });
    }
  },
};

