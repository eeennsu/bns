import Image from 'next/image';
import type { FC } from 'react';

const BriefHistory: FC = () => {
  return (
    <section className='bg-ivory/70 mx-auto flex max-w-2xl flex-col items-center gap-8 rounded-lg p-8 shadow-lg lg:flex-row'>
      <div className='border-wood/30 size-32 flex-shrink-0 overflow-hidden rounded-full border-2'>
        <Image
          src='https://picsum.photos/seed/picsum/128/128'
          alt='김현겸'
          width={128}
          height={128}
          className='object-cover'
        />
      </div>
      <div className='flex-1 text-center lg:text-left'>
        <h3 className='text-wood mb-2 text-2xl font-bold'>김보겸</h3>
        <p className='mb-4 font-medium text-[#A0522D]'>장인 베이커 & 오너</p>
        <div className='text-wood/85 space-y-3'>
          <p>
            30년 경력의 베이킹 장인으로, 프랑스에서 전통 제빵 기술을 배웠습니다. 2005년 작은
            빵가게를 시작으로 지금까지 한결같은 마음으로 건강한 빵을 만들고 있습니다.
          </p>
          <p>
            "좋은 재료와 정성이 담긴 빵은 사람들에게 행복을 전합니다. 매일 아침 첫 빵이 나오는
            순간의 기쁨을 고객과 나누고 싶습니다."
          </p>
        </div>
      </div>
    </section>
  );
};

export default BriefHistory;
