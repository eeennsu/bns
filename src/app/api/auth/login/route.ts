import db from '@db/index';
import { users } from '@db/schemas/users';
import { COOKIE_KEYS } from '@shared/consts/storage';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import {
  comparePassword,
  generateToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from 'src/shared/api/auth';
import { AUTH_ERRORS } from 'src/shared/api/errorMessage';

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const username = body?.username;
  const password = body?.password;

  if (!username || !password) {
    return NextResponse.json({ error: AUTH_ERRORS.MISSING_USERNAME_OR_PASSWORD }, { status: 400 });
  }

  const findUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .then(res => res.at(0));

  if (!findUser) {
    return NextResponse.json({ error: AUTH_ERRORS.ADMIN_NOT_FOUND }, { status: 404 });
  }

  const isPasswordCorrect = await comparePassword(password, findUser.password);

  if (!isPasswordCorrect) {
    return NextResponse.json({ error: AUTH_ERRORS.ID_OR_PASSWORD_INCORRECT }, { status: 401 });
  }

  await db.update(users).set({ lastLoggedAt: new Date() }).where(eq(users.id, findUser.id));

  const accessToken = generateToken(
    { id: findUser.id, username: findUser.username, role: findUser.role },
    COOKIE_KEYS.ACCESS,
  );
  const refreshToken = generateToken(
    { id: findUser.id, username: findUser.username, role: findUser.role },
    COOKIE_KEYS.REFRESH,
  );

  const response = NextResponse.json({ ok: true, user: { username: findUser.username } });

  setAccessTokenCookie(response, accessToken);
  setRefreshTokenCookie(response, refreshToken);

  return response;
};
