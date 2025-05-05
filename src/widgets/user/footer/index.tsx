'use client';

import { useState, type FC } from 'react';

import { BRAND_TITLE } from '@consts/commons';
import { BALOO_2 } from '@consts/font';

import LoginDialog from './LoginDialog';

const Footer: FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <footer
        onClick={() => setCount(prev => prev + 1)}
        className='bg-brand border-t bg-[repeating-linear-gradient(0deg,_#1a1a1a,_#1a1a1a_4px,_#484848_4px,_#484848_10px)]'
      >
        <div className='border-border space-y-1 border-t py-3 text-center lg:space-y-4 lg:py-5'>
          <h2
            className={`text-lg font-bold text-amber-200 lg:text-3xl ${BALOO_2.className} text-shadow-lg`}
          >
            {BRAND_TITLE.EN}
          </h2>
          <p className='text-xs font-semibold text-gray-200'>
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
      {count > 2 && <LoginDialog onClose={() => setCount(0)} />}
    </>
  );
};

export default Footer;
