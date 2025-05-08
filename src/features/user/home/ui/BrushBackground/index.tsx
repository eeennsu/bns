import Image from 'next/image';
import { type FC } from 'react';

const BrushBackground: FC = () => {
  return (
    <>
      <div className='pointer-events-none absolute top-0 right-0 left-0 -z-20 h-[68%]'>
        <Image
          src='/svg/wave-top.svg'
          alt='background texture'
          fill
          className='object-cover opacity-85'
        />
      </div>

      <div className='pointer-events-none absolute top-[68%] right-0 bottom-0 left-0 -z-20 h-[54%] xl:h-[60%]'>
        <Image
          src='/svg/wave-bottom.svg'
          alt='background texture bottom'
          fill
          className='object-cover opacity-85'
        />
      </div>
    </>
  );
};

export default BrushBackground;
