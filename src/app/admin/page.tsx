import { type FC } from 'react';
import { TextAnimate } from 'src/shared/magic-ui/text-animate';

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

      <div className='w-full max-w-xl rounded-xl border border-neutral-200 bg-white/70 p-6 shadow-lg backdrop-blur-lg dark:border-neutral-700 dark:bg-white/5'>
        <p className='text-sm leading-relaxed text-neutral-700 dark:text-neutral-300'>
          여긴 대시보드 페이지인데... 보통 사이트 일일 방문 수... 월간 방문 수.... 등등 이런 걸
          구현하는데... 일단 얘는 추후에 할게요
        </p>
      </div>
    </main>
  );
};

export default AdminPage;
