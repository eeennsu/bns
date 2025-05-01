import { Wheat } from 'lucide-react';
import Link from 'next/link';
import { type FC } from 'react';
import USER_PATHS from 'src/shared/configs/routes/userPaths';

const Header: FC = () => {
  return (
    <header className='sticky top-0 z-40 border-b bg-white/90 backdrop-blur-sm'>
      <div className='flex h-16 w-full items-center justify-between px-5 py-4'>
        <Link href={USER_PATHS.home()} className='flex items-center gap-2'>
          <Wheat className='h-6 w-6 text-[#8B4513]' />
          <span className='text-xl font-bold text-[#8B4513]'>Bread & Sauce</span>
        </Link>
        <nav className='mr-20 hidden gap-6 md:flex'>
          <Link
            href={USER_PATHS.about()}
            className='text-sm font-medium text-[#8B4513] hover:text-[#A0522D]'
          >
            About
          </Link>
          <Link
            href={USER_PATHS.bread.list()}
            className='text-sm font-medium text-[#8B4513] hover:text-[#A0522D]'
          >
            Breads
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
