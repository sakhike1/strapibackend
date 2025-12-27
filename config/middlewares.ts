export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        // Development URLs
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        // Production URLs
        'https://skipaman.co.za',
        'https://www.skipaman.co.za',
        // For development only - remove '*' in production and add specific domains
        ...(process.env.NODE_ENV === 'development' ? ['*'] : []),
      ],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
