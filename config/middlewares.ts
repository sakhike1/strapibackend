export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        // Development URLs
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'http://localhost:5174',
        // Production URLs
        'https://skipaman.co.za',
        'https://www.skipaman.co.za',
        // For development only - remove '*' in production and add specific domains
        ...(process.env.NODE_ENV === 'development' ? ['*'] : []),
      ],
      headers: [
        'Content-Type',
        'Authorization',
        'Origin',
        'X-Requested-With',
        'Accept',
        'Accept-Version',
        'Content-Length',
        'Content-MD5',
        'Date',
        'X-Api-Version',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      credentials: true,
      maxAge: 86400, // 24 hours
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
