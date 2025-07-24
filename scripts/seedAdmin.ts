import db from '@db/index';
import { users } from '@db/schemas/users';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

const ADMIN_NAME = 'please input admin name';
const PASSWORD = 'please input password';
const ROLE = 'user'; // or admin

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash(PASSWORD, 10);

  try {
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.username, ADMIN_NAME))
      .limit(1);

    if (existingAdmin.length > 0) {
      throw new Error(`Existing admin name : ${ADMIN_NAME}`);
    }

    await db.insert(users).values({
      username: ADMIN_NAME,
      password: hashedPassword,
      role: ROLE,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('seedAdmin error: ', error);
    throw error;
  }
};

seedAdmin();
