import Image from 'next/image';
import { FC } from 'react';

interface IProps {
  id: string;
}

const sauce = {
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
  mbti: 'INTJ',
};

const DetailSauce: FC<IProps> = ({ id = 1 }) => {
  console.log(id);
  return (
    <div className='flex items-center justify-center bg-gradient-to-br'>
      <div className='p-6 md:p-8'>
        <div className='grid items-start gap-8 md:grid-cols-2'>
          <div className='relative h-[300px] w-full overflow-hidden rounded-lg md:h-[400px]'>
            <Image
              src='https://picsum.photos/id/600/400/300'
              alt={sauce.name}
              fill
              className='object-cover'
            />
          </div>

          <div>
            <div className='mb-6'>
              <h2 className='text-3xl font-bold text-[#8B4513] md:text-4xl'>{sauce.name}</h2>

              {(sauce?.isNew || sauce.isBestSeller) && (
                <div className='mt-1 flex items-center gap-2'>
                  {sauce.isNew && (
                    <div className='rounded bg-[#E74C3C] px-2 py-1 text-xs font-bold text-white'>
                      NEW
                    </div>
                  )}
                  {sauce.isBestSeller && (
                    <div className='rounded bg-[#8B4513] px-2 py-1 text-xs font-bold text-[#FFFFF0]'>
                      BEST
                    </div>
                  )}
                </div>
              )}

              <p className='mt-3 mb-4 text-xl font-bold text-[#3E2723]'>
                {sauce.price.toLocaleString()}원
              </p>
            </div>

            <div className='mb-6'>
              <h3 className='mb-3 text-lg font-bold text-[#8B4513]'>상세 설명</h3>
              <p className='text-sm whitespace-pre-line text-[#3E2723]'>{sauce.longDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSauce;
