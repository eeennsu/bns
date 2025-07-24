'use client';

import * as Sentry from '@sentry/nextjs';
import { FC, useEffect } from 'react';

interface IProps {
  error: Error & { digest?: string };
}

const GlobalError: FC<IProps> = ({ error }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error);
    } else {
      console.error('로컬 에러 발생 : ', error);
    }
  }, [error]);

  return (
    <html lang='ko'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body
        style={{
          padding: '2rem',
          fontFamily: 'sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#fafafa',
        }}
      >
        <h1>문제가 발생했어요</h1>
        <p>죄송합니다. 예기치 못한 오류가 발생했어요.</p>
        {error.digest && (
          <p style={{ color: '#999', fontSize: '0.9rem' }}>오류 코드: {error.digest}</p>
        )}
      </body>
    </html>
  );
};

export default GlobalError;
