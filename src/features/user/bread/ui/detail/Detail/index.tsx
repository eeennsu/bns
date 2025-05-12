import Image from 'next/image';
import { FC } from 'react';

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
              alt={bread.name}
              fill
              className='object-cover'
            />
          </div>

          <div>
            <div className='mb-6'>
              <h2 className='text-3xl font-bold text-[#8B4513] md:text-4xl'>{bread.name}</h2>

              {(bread?.isNew || bread.isBestSeller) && (
                <div className='mt-1 flex items-center gap-2'>
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

              <p className='mt-3 mb-4 text-xl font-bold text-[#3E2723]'>
                {bread.price.toLocaleString()}원
              </p>

              {/* MBTI 정보 */}
              <div className='mb-6 rounded-lg bg-[#8B4513]/5 p-4'>
                <div className='mb-2 flex items-center gap-2'>
                  <span className='rounded bg-[#8B4513] px-2 py-1 text-xs font-bold text-[#FFFFF0]'>
                    MBTI
                  </span>
                  <span className='font-bold text-[#8B4513]'>{bread.mbti}</span>
                </div>
                <p className='text-sm text-[#3E2723]'>{getMbtiDescription(bread.mbti)}</p>
              </div>
            </div>

            <div className='mb-6'>
              <h3 className='mb-3 text-lg font-bold text-[#8B4513]'>상세 설명</h3>
              <p className='text-sm whitespace-pre-line text-[#3E2723]'>{bread.longDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSauce;

function getMbtiDescription(mbti: string): string {
  const descriptions: { [key: string]: string } = {
    INFP: '섬세한 맛을 즐기는 몽상가들에게 어울리는 빵입니다. 깊은 풍미와 복합적인 맛을 느낄 수 있습니다.',
    ISTJ: '전통과 안정성을 중요시하는 분들에게 어울리는 건강한 빵입니다. 변함없는 맛과 영양을 제공합니다.',
    ENTJ: '목표 지향적이고 리더십이 강한 분들에게 어울리는 클래식한 빵입니다. 확실한 맛과 만족감을 줍니다.',
    ENFP: '새로운 경험을 즐기는 열정적인 분들에게 어울리는 빵입니다. 다양한 식감과 풍부한 맛이 특징입니다.',
    ESFP: '즐거움을 추구하는 활발한 분들에게 어울리는 달콤한 빵입니다. 기분 좋은 달콤함이 특징입니다.',
    ISFJ: '따뜻하고 배려심 많은 분들에게 어울리는 부드러운 빵입니다. 편안한 맛과 포근한 식감이 특징입니다.',
    INTJ: '분석적이고 전략적인 사고를 가진 분들에게 어울리는 복합적인 맛의 빵입니다. 깊은 풍미가 특징입니다.',
    ESTP: '모험을 즐기는 활동적인 분들에게 어울리는 실용적인 빵입니다. 든든하고 만족스러운 맛이 특징입니다.',
    INFJ: '이상주의적이고 창의적인 분들에게 어울리는 독특한 빵입니다. 특별한 맛과 영감을 줍니다.',
  };
  return descriptions[mbti] || '모든 MBTI 유형이 즐길 수 있는 균형 잡힌 맛의 빵입니다.';
}
