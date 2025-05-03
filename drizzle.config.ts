import { assertEnv } from '@libs/assertEnv';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schemas/*.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  dbCredentials: {
    url: assertEnv({ env: process.env.DATABASE_URL, key: 'DATABASE_URL' }),
  },
});
