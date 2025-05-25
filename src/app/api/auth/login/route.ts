import db from '@db/index';
import { users } from '@db/schemas/users';
import {
  comparePassword,
  generateToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from '@libs/auth';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { TOKEN_TYPE } from 'src/shared/api/consts';
import { AUTH_ERRORS } from 'src/shared/api/errorResponse';

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
    TOKEN_TYPE.ACCESS,
  );
  const refreshToken = generateToken(
    { id: findUser.id, username: findUser.username, role: findUser.role },
    TOKEN_TYPE.REFRESH,
  );

  const response = NextResponse.json({ ok: true, role: findUser.role });

  setAccessTokenCookie(response, accessToken);
  setRefreshTokenCookie(response, refreshToken);

  return response;
};
