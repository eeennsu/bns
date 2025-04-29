'use client';

import { useState, type FC } from 'react';

import LoginDialog from '@components/LoginDialog';

const Footer: FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <footer className='w-full bg-blue-600' onClick={() => setCount(prev => prev + 1)}>
        푸터
      </footer>
      {count > 2 && <LoginDialog onClose={() => setCount(0)} />}
    </>
  );
};

export default Footer;
