import type { FC } from 'react';
import { WordRotate } from 'src/shared/magic-ui/word-rotate';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@shadcn-ui/ui/carousel';

import SignatureCard from './SignatureCard';

const DUMMY_SIGNATURES = [
  {
    id: 1,
    name: '사워도우 불',
    description: '바삭한 크러스트와 부드럽고 톡 쏘는 속살이 특징인 클래식 사워도우입니다.',
  },
  {
    id: 2,
    name: '러스틱 바게트',
    description:
      '전통적인 프랑스 스타일의 바게트로, 바삭한 크러스트와 공기 가득한 속살이 특징입니다.',
  },
  {
    id: 3,
    name: '멀티그레인 로프',
    description: '7가지 곡물과 씨앗이 가득 담긴 영양가 높은 빵입니다.',
  },
  {
    id: 4,
    name: '올리브 & 로즈마리',
    description: '칼라마타 올리브와 신선한 로즈마리가 들어간 지중해 스타일의 빵입니다.',
  },
  {
    id: 5,
    name: '체다 & 허니',
    description: '체다 치즈와 꿀이 조화를 이루는 달콤하고 짭짤한 빵입니다.',
  },
  {
    id: 6,
    name: '호두 & 크랜베리',
    description: '호두와 크랜베리가 들어간 달콤하고 고소한 빵입니다.',
  },
];
const Signature: FC = () => {
  return (
    <section className='relative container space-y-8 rounded-2xl px-10 py-16 lg:space-y-12'>
      <div className='text-center'>
        <h2 className='flex w-full flex-col items-center justify-center text-center text-3xl font-bold tracking-tight lg:flex-row lg:gap-2'>
          Our Signature
          <WordRotate
            words={['Breads', 'Sauces']}
            className='text-wood flex w-28 justify-start'
            duration={2200}
          />
        </h2>
        <p>빵과 소스가 어우러져 만들어내는 완벽한 조화를 경험해보세요.</p>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className='mx-auto max-w-[1200px]'
      >
        <CarouselContent>
          {DUMMY_SIGNATURES.map((bread, index) => (
            <CarouselItem key={bread.name} className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4'>
              <SignatureCard key={bread.name} bread={bread} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='cursor-pointer' />
        <CarouselNext className='cursor-pointer' />
      </Carousel>
    </section>
  );
};

export default Signature;
