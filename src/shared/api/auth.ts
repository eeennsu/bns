import 'server-only';

import { COOKIE_KEYS } from '@shared/consts/storage';
import bcrypt from 'bcryptjs';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

import { IVerifyToken } from '@entities/auth/types';

import { assertEnv } from '../libs/assertEnv';
import { COOKIE_EXPIRES, TOKEN_EXPIRES } from './consts';
import { IAccessTokenPayload, IRefreshTokenPayload, TokenType } from './typings';

export const comparePassword = async (password: string, hashed: string) => {
  try {
    return await bcrypt.compare(password, hashed);
  } catch {
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

  const expiresIn = tokenType === COOKIE_KEYS.ACCESS ? TOKEN_EXPIRES.ACCESS : TOKEN_EXPIRES.REFRESH;

  return sign(tokenPayloadWithType, jwtSecret, {
    expiresIn,
    ...jwtOption,
  });
};

export const verifyToken = (token: string) => {
  if (!token) {
    throw new Error('Token is missing');
  }

  try {
    const jwtSecret = assertEnv({ env: process.env.JWT_SECRET, key: 'JWT_SECRET' });

    return verify(token, jwtSecret) as IVerifyToken;
  } catch (error: any) {
    if (error?.name === 'TokenExpiredError') {
      return null;
    }

    throw error;
  }
};

export const setAccessTokenCookie = (response: NextResponse, token: string) => {
  response.cookies.set(COOKIE_KEYS.ACCESS, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: COOKIE_EXPIRES.ACCESS,
  });
};

export const setRefreshTokenCookie = (response: NextResponse, token: string) => {
  response.cookies.set(COOKIE_KEYS.REFRESH, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: COOKIE_EXPIRES.REFRESH,
  });
};
