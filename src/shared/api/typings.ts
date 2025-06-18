import { NextRequest, NextResponse } from 'next/server';

import { User } from '@entities/auth/types';

import { TOKEN_TYPE } from './consts';

export type TokenType = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];

export interface ITokenPayload extends Pick<User, 'id' | 'username' | 'role'> {}

export interface IAccessTokenPayload extends ITokenPayload {
  type: typeof TOKEN_TYPE.ACCESS;
}

export interface IRefreshTokenPayload extends ITokenPayload {
  type: typeof TOKEN_TYPE.REFRESH;
}

export type WithImageId<T> = Omit<T, 'imageFiles'> & { imageId: number };
export type WithImageIds<T> = Omit<T, 'imageFiles'> & { imageIds: number[] };

export type ApiParams = Promise<{ id: string }>;

export type ApiHandler = (
  request: NextRequest,
  { params }: { params: ApiParams },
) => Promise<NextResponse>;
