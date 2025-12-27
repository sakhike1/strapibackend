export default ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env.int('SMTP_PORT', 587),
        secure: env.bool('SMTP_SECURE', false), // true for 465, false for other ports
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        // For Gmail, you may need to use an App Password instead of regular password
        // https://support.google.com/accounts/answer/185833
      },
      settings: {
        defaultFrom: env('EMAIL_FROM', 'noreply@yourdomain.com'),
        defaultReplyTo: env('EMAIL_REPLY_TO', 'noreply@yourdomain.com'),
      },
    },
  },
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET', env('ADMIN_JWT_SECRET')),
    },
  },
});
