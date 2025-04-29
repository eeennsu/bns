import Link from 'next/link';
import { type FC } from 'react';

import USER_PATHS from '@src/shared/configs/routes/userPaths';

const Header: FC = () => {
  return (
    <header className='flex w-full items-center justify-between bg-emerald-200'>
      <div>
        <Link className='text-5xl' href={USER_PATHS.home()}>
          BNS
        </Link>
      </div>
      <nav className='flex items-center gap-4'>
        <Link href={USER_PATHS.about()}>ABOUT</Link>
        <Link href={USER_PATHS.bread.list()}>BREADS</Link>
      </nav>
    </header>
  );
};

export default Header;
