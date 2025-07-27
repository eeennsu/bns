'use client';

import * as Sentry from '@sentry/nextjs';
import { GlobalErrorPageError } from '@shared/class/customError';
import { UNKNOWN_ERROR_MESSAGE } from '@shared/consts/commons';
import NextError from 'next/error';
import { FC, useEffect } from 'react';

interface IProps {
  error: Error & { digest?: string };
}

const GlobalErrorPage: FC<IProps> = ({ error }) => {
  useEffect(() => {
    const globalErrorPageError = new GlobalErrorPageError(error?.message || UNKNOWN_ERROR_MESSAGE);

    Sentry.captureException(globalErrorPageError);
  }, [error]);

  return (
    <html>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
};

export default GlobalErrorPage;
