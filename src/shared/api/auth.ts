import 'server-only';

import { COOKIE_KEYS } from '@shared/consts/storage';
import bcrypt from 'bcryptjs';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

import { IVerifyToken } from '@entities/auth/types';

import { assertEnv } from '../libs/assertEnv';
import { TOKEN_EXPIRES_EXP, TOKEN_EXPIRES_MAX_AGE } from './consts';
import { IAccessTokenPayload, IRefreshTokenPayload, TokenType } from './typings';

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

  const expiresIn =
    tokenType === COOKIE_KEYS.ACCESS ? TOKEN_EXPIRES_EXP.ACCESS : TOKEN_EXPIRES_EXP.REFRESH;

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

  return verify(token, jwtSecret) as IVerifyToken;
};

export const setAccessTokenCookie = (response: NextResponse, token: string) => {
  response.cookies.set(COOKIE_KEYS.ACCESS, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: TOKEN_EXPIRES_MAX_AGE.ACCESS,
  });
};

export const setRefreshTokenCookie = (response: NextResponse, token: string) => {
  response.cookies.set(COOKIE_KEYS.REFRESH, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: TOKEN_EXPIRES_MAX_AGE.REFRESH,
  });
};
