'use client';

import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { Carousel, CarouselContent, CarouselItem } from '@shared/shadcn-ui/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/shadcn-ui/ui/tabs';
import { cn } from '@shared/shadcn-ui/utils';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps, useMemo, useState, type FC } from 'react';

import { getGroupedSignatures } from '@features/home/libs/getGroupedSignatures';

import { ISignatureProduct } from '@entities/home/types';

import EmptyProduct from './EmptyProduct';
import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';

interface IProps {
  signatures: ISignatureProduct[];
}

const SignatureSection: FC<IProps> = ({ signatures }) => {
  const [currentType, setCurrentType] = useState<string>('bread');
  const groupedSignatures = useMemo(() => getGroupedSignatures(signatures), [signatures]);

  return (
    <SectionContainer>
      <div className='flex h-full w-full flex-col justify-center gap-6 lg:h-auto lg:justify-start lg:gap-16'>
        <SectionTitle title='SIGNATURE MENU' />

        <Tabs
          value={currentType}
          className='flex flex-col gap-16 lg:grow lg:flex-row'
          orientation='vertical'
        >
          <TabsList className='flex min-w-[300px] flex-col gap-6 bg-white p-0 font-bold lg:h-full lg:gap-20'>
            <TabsTrigger
              value='bread'
              onClick={() => setCurrentType('bread')}
              asChild
              className='w-full gap-1 p-0 font-bold'
            >
              <SignatureGroupButton
                isCurrentType={currentType === 'bread'}
                group={['BREAD', 'SAUCE']}
                description='섬세한 기술과 정성으로 완성된 최고의 빵'
                className='items-end'
              />
            </TabsTrigger>

            <TabsTrigger
              value='drink'
              onClick={() => setCurrentType('drink')}
              asChild
              className='w-full gap-1 p-0 font-bold'
            >
              <SignatureGroupButton
                isCurrentType={currentType === 'drink'}
                group={['COFFEE', 'DRINK']}
                description='하루를 채울 신선한 커피와 음료'
                className='items-end'
              />
            </TabsTrigger>

            <TabsTrigger
              value='dish'
              onClick={() => setCurrentType('dish')}
              asChild
              className='w-full gap-1 p-0 font-bold'
            >
              <SignatureGroupButton
                isCurrentType={currentType === 'dish'}
                group={['DISH', 'DESSERT']}
                description='가벼운 달콤한 디저트'
                className='items-end'
              />
            </TabsTrigger>
          </TabsList>

          <div className='flex-1'>
            {Object.entries(groupedSignatures).map(([type, items]) => (
              <TabsContent key={type} value={type} className='mt-0'>
                {items.length === 0 ? (
                  <EmptyProduct size='sm' />
                ) : items.length > 1 ? (
                  <Carousel
                    opts={{ align: 'start', loop: true }}
                    plugins={[Autoplay({ delay: 4000 })]}
                    className='h-full w-full'
                  >
                    <CarouselContent className='h-[330px] pr-[15%] lg:pr-[10%]'>
                      {items.map(signature => (
                        <CarouselItem
                          key={`${signature.type}-${signature.id}`}
                          className={cn('basis-full pr-3', items.length > 1 && 'sm:basis-1/2')}
                        >
                          <SignatureCard signature={signature} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                ) : (
                  <SignatureCard signature={items[0]} />
                )}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </SectionContainer>
  );
};

export default SignatureSection;

interface ISignatureGroupButtonProps extends ComponentProps<'button'> {
  isCurrentType: boolean;
  group: [string, string];
  description: string;
}

const SignatureGroupButton: FC<ISignatureGroupButtonProps> = ({
  isCurrentType,
  description,
  group,
  className,
  ...props
}) => {
  return (
    <div className={cn('flex flex-col gap-1 text-xl lg:items-start lg:text-3xl', className)}>
      <button
        className={cn(
          'w-fit cursor-pointer text-gray-600 hover:underline',
          isCurrentType && '!text-black underline lg:text-4xl',
        )}
        {...props}
      >
        {group[0]} & {group[1]}
      </button>
      {isCurrentType && <p className='text-base font-bold text-black'>{description}</p>}
    </div>
  );
};

interface ISignatureCardProps {
  signature: ISignatureProduct;
}

const SignatureCard: FC<ISignatureCardProps> = ({ signature }) => {
  return (
    <Link
      href={MAIN_PATHS.product[signature.type].list()}
      className='flex h-[330px] w-full flex-col items-center rounded-xl pl-3'
    >
      <div className='relative h-[95%] w-full'>
        <Image
          src={signature.image}
          alt={signature.name}
          width={350}
          height={180}
          className='size-full rounded-xl object-cover'
        />
        <div className='absolute bottom-0 left-1/2 z-10 w-[80%] -translate-x-1/2 translate-y-1/2 rounded-md bg-black/80 px-3 py-1 text-center text-sm font-semibold text-white shadow-lg'>
          {signature.name}
        </div>
      </div>
    </Link>
  );
};
