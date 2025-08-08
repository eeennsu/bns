import { FC } from 'react';

const EventListHead: FC = () => {
  return (
    <section className='flex flex-col gap-1 lg:gap-3'>
      <h2 className='text-3xl font-bold text-black/80 lg:text-5xl'>이벤트</h2>
      <p className='text-sm text-gray-800 lg:text-base'>다양한 이벤트와 혜택을 모았습니다.</p>
    </section>
  );
};

export default EventListHead;
