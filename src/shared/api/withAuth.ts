import 'server-only';

import * as Sentry from '@sentry/nextjs';
import { UNKNOWN_ERROR_MESSAGE } from '@shared/consts/commons';
import { COOKIE_KEYS } from '@shared/consts/storage';
import { JWTError } from '@shared/libs/customError';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from 'src/shared/api/auth';

import { ADMIN_ERRORS } from './errorMessage';
import { ApiHandler, ApiParams } from './typings';
import { withErrorHandler } from './withErrorHandler';

export const withAuth = (apiHandler: ApiHandler) => {
  return async (request: NextRequest, { params }: { params: ApiParams }) => {
    const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS)?.value;

    if (!accessToken) {
      return NextResponse.json({ error: ADMIN_ERRORS.MISSING_ACCESS_TOKEN }, { status: 401 });
    }

    let payload;

    try {
      payload = verifyToken(accessToken);
    } catch (error: any) {
      if (error instanceof Error && error.message !== 'jwt expired') {
        const jWTError = new JWTError(error?.message || UNKNOWN_ERROR_MESSAGE);

        Sentry.captureException(jWTError);
      }

      return NextResponse.json({ error: ADMIN_ERRORS.INVALID_ACCESS_TOKEN }, { status: 401 });
    }

    if (
      typeof payload !== 'object' ||
      !payload?.id ||
      !payload?.username ||
      payload?.role !== 'admin'
    ) {
      return NextResponse.json({ error: ADMIN_ERRORS.INVALID_TOKEN_PAYLOAD }, { status: 401 });
    }

    const wrappedHandler = withErrorHandler(apiHandler);

    return wrappedHandler(request, { params });
  };
};
