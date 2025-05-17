import { LoaderIcon } from 'lucide-react';
import type { FC } from 'react';

const Loader: FC = () => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <LoaderIcon className='text-wood-tertiary size-7 animate-spin' />
    </div>
  );
};

export default Loader;
