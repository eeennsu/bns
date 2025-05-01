import { defineConfig } from 'drizzle-kit';
import { schemaFiles } from 'src/db/consts/schemaFiles';

export default defineConfig({
  schema: schemaFiles,
  out: './src/db/migrations',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
