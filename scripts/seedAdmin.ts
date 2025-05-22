import db from '@db/index';
import bcrypt from 'bcryptjs';
import { admins } from 'src/db/schemas/admins';

const seedAdmin = async () => {
  const password = process.env.SEED_ADMIN_PW;

  if (!password) {
    throw new Error('SEED_ADMIN_PW is missing');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(admins).values({ username: '엄준식', password: hashedPassword });
  } catch (error) {
    console.error('seedAdmin error: ', error);
  }
};

seedAdmin();
