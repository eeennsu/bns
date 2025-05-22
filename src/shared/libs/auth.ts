import bcrypt from 'bcryptjs';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

import { TOKEN_EXPIRES, TOKEN_EXPIRES_MS, TOKEN_TYPE } from '../api/consts';
import { IAccessTokenPayload, IRefreshTokenPayload, TokenType } from '../api/typings';
import { assertEnv } from './assertEnv';

export const comparePassword = async (password: string, hashed: string) => {
  try {
    return await bcrypt.compare(password, hashed);
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const generateToken = (
  payload: Omit<IAccessTokenPayload, 'type'> | Omit<IRefreshTokenPayload, 'type'>,
  tokenType: TokenType,
  jwtOption?: SignOptions,
) => {
  const jwtSecret = assertEnv({ env: process.env.JWT_SECRET, key: 'JWT_SECRET' });

  const tokenPayloadWithType = { ...payload, type: tokenType };

  const expiresIn = tokenType === TOKEN_TYPE.ACCESS ? TOKEN_EXPIRES.ACCESS : TOKEN_EXPIRES.REFRESH;

  return sign(tokenPayloadWithType, jwtSecret, {
    expiresIn,
    ...jwtOption,
  });
};

export const verifyToken = (token: string) => {
  if (!token) {
    throw new Error('Token is missing');
  }

  const jwtSecret = assertEnv({ env: process.env.JWT_SECRET, key: 'JWT_SECRET' });

  return verify(token, jwtSecret);
};

export const setAccessTokenCookie = (response: NextResponse, token: string) => {
  response.cookies.set(TOKEN_TYPE.ACCESS, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: TOKEN_EXPIRES_MS.ACCESS,
  });
};

export const setRefreshTokenCookie = (response: NextResponse, token: string) => {
  response.cookies.set(TOKEN_TYPE.REFRESH, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: TOKEN_EXPIRES_MS.REFRESH,
  });
};
