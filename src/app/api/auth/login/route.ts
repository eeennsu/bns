import db from '@db/index';
import {
  comparePassword,
  generateToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from '@libs/auth';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { admins } from 'src/db/schemas/admins';
import { TOKEN_TYPE } from 'src/shared/api/consts';
import { AUTH_ERRORS } from 'src/shared/api/errorResponse';

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const username = body?.username;
  const password = body?.password;

  if (!username || !password) {
    return NextResponse.json({ error: AUTH_ERRORS.MISSING_USERNAME_OR_PASSWORD }, { status: 400 });
  }

  const admin = await db
    .select()
    .from(admins)
    .where(eq(admins.username, username))
    .then(res => res.at(0));

  if (!admin) {
    return NextResponse.json({ error: AUTH_ERRORS.ADMIN_NOT_FOUND }, { status: 404 });
  }

  const isPasswordCorrect = await comparePassword(password, admin.password);

  if (!isPasswordCorrect) {
    return NextResponse.json({ error: AUTH_ERRORS.ID_OR_PASSWORD_INCORRECT }, { status: 401 });
  }

  const accessToken = generateToken({ id: admin.id, username: admin.username }, TOKEN_TYPE.ACCESS);
  const refreshToken = generateToken(
    { id: admin.id, username: admin.username },
    TOKEN_TYPE.REFRESH,
  );

  const response = NextResponse.json({ ok: true });

  setAccessTokenCookie(response, accessToken);
  setRefreshTokenCookie(response, refreshToken);

  return response;
};
