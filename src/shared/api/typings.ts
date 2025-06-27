import { COOKIE_KEYS } from '@shared/consts/storage';
import { NextRequest, NextResponse } from 'next/server';

import { User } from '@entities/auth/types';

import { ORDER_BY_TYPES } from './consts';
import { FILTER_TYPES } from '@shared/consts/commons';

export type TokenType = (typeof COOKIE_KEYS)[keyof typeof COOKIE_KEYS];

export interface ITokenPayload extends Pick<User, 'id' | 'username' | 'role'> {}

export interface IAccessTokenPayload extends ITokenPayload {
  type: typeof COOKIE_KEYS.ACCESS;
}

export interface IRefreshTokenPayload extends ITokenPayload {
  type: typeof COOKIE_KEYS.REFRESH;
}

export type WithImageId<T> = Omit<T, 'imageFiles'> & { imageId: number };
export type WithImageIds<T> = Omit<T, 'imageFiles'> & { imageIds: number[] };

export type ApiParams = Promise<{ id: string }>;

export type ApiHandler = (
  request: NextRequest,
  { params }: { params: ApiParams },
) => Promise<NextResponse>;

export type OrderByType = (typeof ORDER_BY_TYPES)[keyof typeof ORDER_BY_TYPES];
export type FilterType = typeof FILTER_TYPES[keyof typeof FILTER_TYPES];