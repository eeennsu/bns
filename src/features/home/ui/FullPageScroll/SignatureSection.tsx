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

import { SIGNATURE_CATEGORY_DESCRIPTION } from '@entities/home/consts';
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
          className='flex flex-col gap-4 lg:grow lg:flex-row lg:gap-16'
          orientation='vertical'
        >
          <div className='overflow-x-auto'>
            <TabsList className='flex gap-6 bg-white p-0 font-bold lg:h-full lg:min-w-[300px] lg:flex-col lg:gap-20'>
              <TabsTrigger
                value='bread'
                onClick={() => setCurrentType('bread')}
                asChild
                className='w-full gap-1 p-0 font-bold'
              >
                <SignatureGroupButton
                  isCurrentType={currentType === 'bread'}
                  group={['BREAD', 'SAUCE']}
                  description={SIGNATURE_CATEGORY_DESCRIPTION.bread}
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
                  description={SIGNATURE_CATEGORY_DESCRIPTION.drink}
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
                  description={SIGNATURE_CATEGORY_DESCRIPTION.dish}
                  className='items-end'
                />
              </TabsTrigger>
            </TabsList>
          </div>

          <div className='block text-center lg:hidden'>
            {currentType === 'bread' && SIGNATURE_CATEGORY_DESCRIPTION.bread}
            {currentType === 'drink' && SIGNATURE_CATEGORY_DESCRIPTION.drink}
            {currentType === 'dish' && SIGNATURE_CATEGORY_DESCRIPTION.dish}
          </div>

          <div className='flex-1'>
            {Object.entries(groupedSignatures).map(([type, items]) => (
              <TabsContent key={type} value={type} className='mt-0'>
                {items.length === 0 ? (
                  <EmptyProduct size='sm' />
                ) : items.length === 1 ? (
                  <SignatureCard signature={items.at(0)} className='mx-auto lg:w-1/2' />
                ) : (
                  <Carousel
                    opts={{ align: 'start', loop: true }}
                    plugins={[Autoplay({ delay: 4000 })]}
                    className='h-full w-full'
                  >
                    <CarouselContent className='h-[330px] lg:pr-[10%]'>
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
      {isCurrentType && (
        <p className='font-nanum-gothic hidden text-center text-base font-bold text-black lg:block'>
          {description}
        </p>
      )}
    </div>
  );
};

interface ISignatureCardProps {
  signature: ISignatureProduct;
  className?: string;
}

const SignatureCard: FC<ISignatureCardProps> = ({ signature, className }) => {
  return (
    <Link
      href={MAIN_PATHS.product[signature.type].list()}
      className={cn(
        'group flex h-[330px] w-full flex-col items-center overflow-hidden rounded-xl pl-3',
        className,
      )}
    >
      <div className='relative h-[95%] w-full'>
        <Image
          src={signature.image}
          alt={signature.name}
          width={350}
          height={180}
          className='size-full rounded-xl object-cover transition-all group-hover:scale-105'
        />
        <div className='absolute bottom-0 left-1/2 z-10 w-[80%] -translate-x-1/2 translate-y-1/2 rounded-md bg-black/80 px-3 py-1 text-center text-sm font-semibold text-white shadow-lg'>
          {signature.name}
        </div>
      </div>
    </Link>
  );
};
