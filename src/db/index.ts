import { assertEnv } from '@libs/assertEnv';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';

config({ path: '.env' });

const DATABASE_URL = assertEnv({ env: process.env.DATABASE_URL, key: 'DATABASE_URL' });

const sql = neon(DATABASE_URL);
const db = drizzle({ client: sql });

export default db;
