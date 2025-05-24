import db from '@db/index';
import { users } from '@db/schemas/users';
import bcrypt from 'bcryptjs';

const seedAdmin = async () => {
  const password = process.env.SEED_ADMIN_PW;

  if (!password) {
    throw new Error('SEED_ADMIN_PW is missing');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({
      username: '엄준식',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('seedAdmin error: ', error);
  }
};

seedAdmin();
