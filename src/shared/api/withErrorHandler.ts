import * as Sentry from '@sentry/nextjs';
import { ServerError } from '@shared/libs/customError';
import { NextRequest, NextResponse } from 'next/server';

import { SERVER_ERRORS } from './errorMessage';
import { ApiHandler, ApiParams } from './typings';

export const withErrorHandler = (apiHandler: ApiHandler) => {
  return async (request: NextRequest, { params }: { params: ApiParams }) => {
    try {
      return await apiHandler(request, { params });
    } catch (error) {
      const serverError = new ServerError(error?.message || SERVER_ERRORS.UNEXPECTED_ERROR);
      Sentry.captureException(serverError);

      if (process.env.NODE_ENV === 'development') console.error('withErrorHandler error: ', error);
      return NextResponse.json({ error: SERVER_ERRORS.UNEXPECTED_ERROR }, { status: 500 });
    }
  };
};
