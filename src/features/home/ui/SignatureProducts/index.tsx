import type { FC } from 'react';
import { WordRotate } from 'src/shared/magic-ui/word-rotate';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@shadcn-ui/ui';

import getSignatureList from '@features/home/queries/getSignatureList';

import SignatureCard from './SignatureCard';

const SignatureProducts: FC = async () => {
  const [error, signatures] = await getSignatureList();

  if (error) return null;

  return (
    <section className='relative container space-y-8 rounded-2xl px-4 py-12 sm:px-6 md:px-10 lg:space-y-12'>
      <div className='space-y-2 text-center'>
        <h2 className='flex flex-col items-center justify-center text-center text-2xl font-bold tracking-tight sm:text-3xl lg:flex-row lg:gap-2'>
          Our Signature
          <WordRotate
            words={['Breads', 'Sauces']}
            className='text-wood flex w-28 justify-center'
            duration={2200}
          />
        </h2>
        <p className='text-sm sm:text-base'>
          빵과 소스가 어우러져 만들어내는 완벽한 조화를 경험해보세요.
        </p>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className='mx-auto w-full max-w-[1200px]'
      >
        <CarouselContent>
          {signatures?.map(signature => (
            <CarouselItem
              key={`signature-${signature.type}-${signature.id}`}
              className='basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4'
            >
              <SignatureCard signature={signature} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='cursor-pointer' />
        <CarouselNext className='cursor-pointer' />
      </Carousel>
    </section>
  );
};

export default SignatureProducts;
