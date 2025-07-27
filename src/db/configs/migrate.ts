import { migrate } from 'drizzle-orm/neon-http/migrator';

import db from '../index';

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: 'src/db/migrations' });
    console.log('☑️ Migration complete');
  } catch (error) {
    console.error(error);
  }
};

main();
