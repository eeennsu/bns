import { TextAnimate } from '@magic-ui/text-animate';
import { type FC } from 'react';

const AdminPage: FC = () => {
  return (
    <main className='relative flex size-full flex-col items-center justify-center gap-6'>
      <TextAnimate
        animation='blurInUp'
        by='character'
        duration={5}
        className='text-5xl font-extrabold tracking-tight text-neutral-900 md:text-6xl dark:text-white'
      >
        I AM BREAD KING KIM HYUN GYEOM
      </TextAnimate>
    </main>
  );
};

export default AdminPage;
