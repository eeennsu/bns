import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: ['./src/db/schemas/bread.ts', './src/db/schemas/event.ts'],
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
