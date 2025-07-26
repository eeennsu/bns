import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

import { SERVER_ERRORS } from './errorMessage';
import { ApiHandler, ApiParams } from './typings';

export const withErrorHandler = (apiHandler: ApiHandler) => {
  return async (request: NextRequest, { params }: { params: ApiParams }) => {
    try {
      return await apiHandler(request, { params });
    } catch (error) {
      Sentry.captureException(error);
      return NextResponse.json({ error: SERVER_ERRORS.UNEXPECTED_ERROR }, { status: 500 });
    }
  };
};
