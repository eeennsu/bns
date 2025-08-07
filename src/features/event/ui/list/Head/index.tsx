import { FC } from 'react';

const EventListHead: FC = () => {
  return (
    <section className='flex flex-col gap-3'>
      <h2 className='text-6xl font-bold text-black/80'>이벤트</h2>
      <p className='text-gray-800'>다양한 이벤트와 혜택을 모았습니다.</p>
    </section>
  );
};

export default EventListHead;
