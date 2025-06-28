import db from '@db/index';
import { users } from '@db/schemas/users';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

const ADMIN_NAME = '엄준식';

const seedAdmin = async () => {
  const password = process.env.SEED_ADMIN_PW;

  if (!password) {
    throw new Error('SEED_ADMIN_PW is missing');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.username, ADMIN_NAME))
      .limit(1);

    if (existingAdmin) {
      throw new Error(`Existing admin name : ${ADMIN_NAME}`);
    }

    await db.insert(users).values({
      username: ADMIN_NAME,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('seedAdmin error: ', error);
    throw error;
  }
};

seedAdmin();
