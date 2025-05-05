import type { FC } from 'react';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorLayout: FC<Props> = ({ error, reset }) => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-3xl rounded-lg bg-white p-8 text-center shadow-lg'>
        <h1 className='mb-4 text-2xl font-bold text-gray-800'>Oops! Something went wrong</h1>
        <p className='mb-4 break-words text-gray-600'>
          {error.message}
          {error.digest && (
            <span className='mt-2 text-sm text-gray-500'>Error digest: {error.digest}</span>
          )}
        </p>
        <button
          onClick={() => reset()}
          className='mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
        >
          Try again
        </button>
      </div>
    </main>
  );
};

export default ErrorLayout;
