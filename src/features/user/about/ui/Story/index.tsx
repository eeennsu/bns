import Image from 'next/image';
import type { FC } from 'react';

import { BRAND_TITLE } from '@consts/commons';

import StoryCard from './StoryCard';

const Story: FC = () => {
  return (
    <section
      className='grid scroll-m-25 items-center gap-12 rounded-xl lg:grid-cols-2'
      id='brand-story'
    >
      <div className='order-2 lg:order-1'>
        <h1 className='text-wood mb-6 text-3xl font-bold xl:text-4xl'>
          <span className='font-baloo-2'>{BRAND_TITLE.EN}</span> 이야기
        </h1>
        <div className='text-wood/85 space-y-4'>
          <p>
            아티산 브레드는 2005년, 전통적인 빵 제조 방식을 현대적으로 재해석하고자 하는 열정으로
            시작되었습니다. 우리는 자연 발효종을 사용한 건강한 빵을 만들기 위해 끊임없이 연구하고
            발전해왔습니다.
          </p>
          <p>
            최고 품질의 유기농 재료만을 사용하며, 인공 첨가물이나 방부제를 전혀 사용하지 않습니다.
            모든 빵은 장인의 손길로 하나하나 정성껏 만들어지며, 매일 아침 신선한 빵을 제공하기 위해
            새벽부터 준비합니다.
          </p>
          <p>
            아티산 브레드는 단순히 빵을 파는 곳이 아닌, 지역 사회와 함께 성장하는 공간이 되고자
            합니다. 지역 농산물을 적극 활용하고, 다양한 베이킹 클래스를 통해 빵 문화를 나누고
            있습니다.
          </p>
        </div>

        <div className='mt-8 grid grid-cols-2 gap-6'>
          <StoryCard
            title='우리의 철학'
            description='자연의 맛을 살린 건강한 빵으로 일상에 행복을 더합니다.'
          />
          <StoryCard
            title='우리의 약속'
            description='매일 신선한 재료로 정성을 다해 최고의 빵을 만듭니다.'
          />
        </div>
      </div>

      <div className='relative order-1 h-full lg:order-2'>
        <div className='relative h-full max-h-[400px] overflow-hidden rounded-lg shadow-xl'>
          <Image
            src='https://picsum.photos/id/93/723/400'
            alt='베이커리 전경'
            fill
            className='object-cover'
          />
        </div>
        <div className='border-ivory absolute -bottom-6 -left-6 hidden size-48 overflow-hidden rounded-lg border-4 shadow-lg lg:block'>
          <Image
            src='https://picsum.photos/id/235/184/184'
            alt='빵 제작 과정'
            fill
            className='object-cover'
          />
        </div>
      </div>
    </section>
  );
};

export default Story;
