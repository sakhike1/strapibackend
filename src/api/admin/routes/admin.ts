/**
 * admin router - Custom admin endpoints
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/admin/set-product-permissions',
      handler: 'admin.setProductPermissions',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

