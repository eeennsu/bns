import { TextAnimate } from '@magic-ui/text-animate';
import UtilLocalImage from '@shared/utils/utilImage';
import Image from 'next/image';
import type { FC } from 'react';

const BriefHistory: FC = () => {
  return (
    <section className='bg-ivory/90 mx-auto flex max-w-4xl flex-col items-center gap-10 rounded-xl p-6 lg:flex-row lg:p-10'>
      <div className='flex size-48 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-black/40'>
        <Image
          src={UtilLocalImage.SVGS.SHEF}
          alt='김현겸'
          width={146}
          height={146}
          className='mt-6 object-cover'
        />
      </div>

      <div className='flex-1 text-center lg:text-left'>
        <h2 className='mb-1 text-xl font-semibold text-black/80'>김현겸</h2>
        <p className='mb-3 text-[15px] font-medium text-black/40'>메인 베이커</p>
        <div className='space-y-4 text-[15px] leading-relaxed text-black/80'>
          <p>
            10년간 한결같이 빵을 구워온 베이커로, 프랑스에서 정통 제빵 기술을 익힌 후 2005년,
            조그마한 동네 빵집에서 제 인생의 첫 반죽을 시작했습니다. 지금까지도 매일 아침 같은
            마음으로 반죽하고 굽고, 정성을 담고 있습니다.
          </p>
          <p>
            단순히 배를 채우는 빵이 아닌, 먹는 순간 마음이 따뜻해지는 빵을 만들고 싶습니다. 밀가루와
            물, 소금 그리고 기다림이 모여 얼마나 깊은 맛을 낼 수 있는지 늘 고민하며 오븐 앞에
            섭니다.
          </p>

          <div className='mx-auto mt-6 max-w-[600px] rounded-xl px-6 pt-6 text-[15px] leading-relaxed font-medium text-black/80'>
            <span className='font-serif text-4xl leading-none text-black/30'>“</span>
            <TextAnimate
              delay={0.7}
              duration={1.5}
              animation='blurInUp'
              className='font-gowun-dodum text-xl font-bold text-black/80'
            >
              좋은 재료와 정성이 담긴 빵은 사람들에게 행복을 전합니다. &nbsp; 매일 아침, 오븐에서 첫
              빵이 나오는 순간의 기쁨을 고객들과 함께 나누고 싶습니다.
            </TextAnimate>
            <span className='block text-right font-serif text-4xl leading-none text-black/30'>
              ”
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BriefHistory;
