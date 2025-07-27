import * as Sentry from '@sentry/nextjs';

// const isProduction = process.env.NODE_ENV === 'production';
const isProduction = true;

Sentry.init({
  dsn: isProduction ? process.env.NEXT_PUBLIC_SENTRY_DSN : undefined,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  // request, response 성능 측정용
  tracesSampleRate: isProduction ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
