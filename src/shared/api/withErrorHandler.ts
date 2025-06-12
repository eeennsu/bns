import { NextRequest, NextResponse } from 'next/server';

import { SERVER_ERRORS } from './errorMessage';
import { ApiHandler, ApiParams } from './typings';

export const withErrorHandler = (apiHandler: ApiHandler) => {
  return async (request: NextRequest, { params }: { params: ApiParams }) => {
    try {
      return await apiHandler(request, { params });
    } catch (error) {
      console.error('Error on withErrorHandler: ', error);
      return NextResponse.json({ error: SERVER_ERRORS.UNEXPECTED_ERROR }, { status: 500 });
    }
  };
};
