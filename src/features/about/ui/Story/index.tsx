import UtilLocalImage from '@shared/utils/utilImage';
import Image from 'next/image';
import type { FC } from 'react';

const Story: FC = () => {
  return (
    <section className='grid items-center gap-x-10 gap-y-4 rounded-xl lg:grid-cols-2'>
      <div className='order-2 space-y-4 pt-10 lg:order-1'>
        <h1 className='font-nanum-gothic mb-6 text-center text-4xl font-bold text-black sm:text-left xl:text-4xl'>
          특별하게 먹고 싶은 빵
        </h1>
        <div className='space-y-4 text-black/85'>
          <p>
            오늘은, 조금 특별한 빵이 당긴다. 매일 먹는 익숙한 빵이지만, 가끔은 색다른 한 입이 하루를
            다르게 만들어주죠. 우리의 시그니처 브레드는 오랜 시간 정성 들여 반죽하고 구워내, 겉은
            바삭하고 속은 촉촉한 완벽한 식감을 자랑해요.
          </p>
          <p>
            그런 빵을 더욱 완성시키는 건, 바로 소스입니다. 바질 페스토의 신선함, 갈릭 버터의 고소함,
            그리고 직접 끓여낸 수제 크림 소스의 부드러움까지. 각 빵에 어울리는 소스를 더하면, 그
            자체로 하나의 요리가 되죠.
          </p>
          <p>
            한 조각 한 조각이 단순한 간식을 넘어, 새로운 미식의 순간이 됩니다. 출출한 오후에도,
            여유로운 브런치 타임에도, Bread & Sauce의 조합은 언제나 좋은 선택이 되어줄 거예요.
          </p>
          <p>
            지금, 당신이 찾던 그 특별한 조각을 만나보세요. 입안 가득 퍼지는 풍미와 따뜻함이 오늘
            하루를 조금 더 풍성하게 채워줄 거예요.
          </p>
        </div>
      </div>

      <figure className='relative order-1 h-full max-w-[1000px] lg:order-2'>
        <Image src={UtilLocalImage.SVGS.PANCAKE} alt='background texture' fill />
      </figure>
    </section>
  );
};

export default Story;
