import Image from 'next/image';
import { FC } from 'react';

import DrawerAnimation from '@components/DrawerAnimation';

import Mbti from './Mbti';

interface IProps {
  id: string;
}

const bread = {
  id: 1,
  name: '클래식 사워도우',
  category: 'sourdough',
  price: 6800,
  description:
    '24시간 저온 발효한 클래식 사워도우 빵입니다. 바삭한 겉면과 쫄깃한 속을 즐기세요. 자연 발효종을 사용하여 건강하고 소화가 잘 되는 것이 특징입니다.',
  longDescription:
    '아티산 브레드의 시그니처 제품인 클래식 사워도우는 100% 천연 발효종을 사용하여 24시간 이상 저온에서 천천히 발효시켜 만듭니다. 이 과정을 통해 깊은 풍미와 복합적인 맛이 형성되며, 바삭한 겉면과 쫄깃한 속의 완벽한 조화를 경험하실 수 있습니다. 인공 첨가물이나 방부제를 전혀 사용하지 않아 건강하며, 전통 방식 그대로 장인의 손길로 하나하나 정성껏 만들어집니다.',
  image: '/placeholder.svg?height=500&width=500&text=사워도우',
  ingredients: ['유기농 밀가루', '천연 발효종', '히말라야 핑크 솔트', '정제수'],
  nutritionFacts: {
    calories: 250,
    protein: 8,
    carbs: 48,
    fat: 2,
    fiber: 3,
  },
  allergens: ['밀'],
  storageGuide: '서늘하고 건조한 곳에 보관하세요. 당일 섭취를 권장합니다.',
  isNew: true,
  isBestSeller: true,
  rating: 4.8,
  reviewCount: 124,
  mbti: 'ENFP',
};

const DetailSauce: FC<IProps> = ({ id = 1 }) => {
  console.log(id);
  return (
    <DrawerAnimation>
      <div className='flex items-center justify-center bg-gradient-to-br px-4 py-6 sm:px-6 md:px-8'>
        <div className='w-full max-w-4xl space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0'>
          {/* 이미지 */}
          <div className='relative h-60 w-full overflow-hidden rounded-lg shadow-2xl sm:h-72 md:h-[400px]'>
            <Image
              src='https://picsum.photos/id/600/400/300'
              alt={bread.name}
              fill
              className='object-cover'
            />
          </div>

          {/* 텍스트 */}
          <div className='flex flex-col justify-between gap-4 pt-2'>
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold text-[#8B4513] md:text-3xl'>{bread.name}</h2>

              <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                <p className='text-lg font-bold text-[#3E2723] md:text-xl'>
                  {bread.price.toLocaleString()}원
                </p>
                {(bread?.isNew || bread.isBestSeller) && (
                  <div className='flex items-center gap-2'>
                    {bread.isNew && (
                      <div className='rounded bg-[#E74C3C] px-2 py-1 text-xs font-bold text-white'>
                        NEW
                      </div>
                    )}
                    {bread.isBestSeller && (
                      <div className='rounded bg-[#8B4513] px-2 py-1 text-xs font-bold text-[#FFFFF0]'>
                        BEST
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className='space-y-5'>
              <div className='space-y-2'>
                <h3 className='text-base font-bold text-[#8B4513] md:text-lg'>상세 설명</h3>
                <p className='text-sm leading-relaxed whitespace-pre-line text-[#3E2723]'>
                  {bread.longDescription}
                </p>
              </div>

              {/* MBTI 정보 */}
              <Mbti mbti={bread.mbti} />
            </div>
          </div>
        </div>
      </div>
    </DrawerAnimation>
  );
};

export default DetailSauce;
