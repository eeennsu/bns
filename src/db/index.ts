import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ logger: true, client: sql });

export default db;
