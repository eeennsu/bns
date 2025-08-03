'use client';

import { Carousel, CarouselContent, CarouselItem } from '@shared/shadcn-ui/ui';
import { cn } from '@shared/shadcn-ui/utils';
import Autoplay from 'embla-carousel-autoplay';
import { PackageOpen } from 'lucide-react';
import Image from 'next/image';
import { ComponentProps, useMemo, useState, type FC } from 'react';

import { ISignatureProduct } from '@entities/home/types';

interface IProps {
  signatures: ISignatureProduct[];
}

const Section2: FC<IProps> = ({ signatures }) => {
  const [currentType, setCurrentType] = useState<string>('bread');
  const groupedSignatures = useMemo(
    () =>
      signatures.reduce((acc, cur) => {
        const { type } = cur;
        let key;

        if (type === 'bread' || type === 'sauce') {
          key = 'bread';
        } else if (type === 'drink') {
          key = 'drink';
        } else if (type === 'dish' || type === 'dessert') {
          key = 'dish';
        } else if (type === 'bundle') {
          key = 'bundle';
        }

        if (key) {
          acc[key] = acc[key] || [];
          acc[key].push(cur);
        }

        return acc;
      }, {}),
    [signatures],
  );

  return (
    <section className='relative mx-auto flex w-full max-w-[1500px] items-center px-36'>
      <div className='flex w-full flex-col gap-16'>
        <div className='flex items-end gap-3'>
          <h2 className='font-montserrat text-7xl font-[800]'>SIGNATURE MENU</h2>
          <div className='bg-wood mb-2 size-4' />
        </div>

        <div className='flex grow gap-16 pb-4'>
          <div className='flex h-full min-w-[300px] flex-col gap-20 text-3xl font-bold'>
            <SignatureGroupButton
              isCurrentType={currentType === 'bread'}
              group={['BREAD', 'SAUCE']}
              description='섬세한 기술과 정성으로 완성된 최고의 빵'
              onClick={() => setCurrentType('bread')}
            />

            <SignatureGroupButton
              isCurrentType={currentType === 'drink'}
              group={['COFFEE', 'DRINK']}
              description='하루를 채울 신선한 커피와 음료'
              onClick={() => setCurrentType('drink')}
            />

            <SignatureGroupButton
              isCurrentType={currentType === 'dish'}
              group={['DISH', 'DESSERT']}
              description='가벼운 달콤한 디저트'
              onClick={() => setCurrentType('dish')}
            />
          </div>

          {!Array.isArray(groupedSignatures?.[currentType]) ? (
            <div className='flex h-[330px] w-full items-center justify-center rounded-xl text-center'>
              <div className='flex flex-col items-center gap-3 p-6'>
                <PackageOpen className='h-8 w-8 text-neutral-400' />
                <span className='text-base font-medium text-neutral-600'>상품을 준비 중입니다</span>
                <p className='text-sm text-neutral-400'>더 나은 품질로 곧 찾아뵐게요.</p>
              </div>
            </div>
          ) : groupedSignatures?.[currentType].length > 1 ? (
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              className='h-full w-full'
            >
              <CarouselContent className='h-[330px] pr-[10%]'>
                {groupedSignatures?.[currentType]?.map(signature => (
                  <CarouselItem
                    key={`${signature.type}-${signature.id}`}
                    className={cn(
                      'basis-full pr-3',
                      groupedSignatures?.[currentType]?.length > 1 && 'sm:basis-1/2',
                    )}
                  >
                    <SignatureCard signature={signature} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <SignatureCard signature={groupedSignatures?.[currentType].at(0)} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Section2;

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
    <div className='flex flex-col gap-1'>
      <button
        className={cn(
          'w-fit cursor-pointer text-slate-500 hover:underline',
          isCurrentType && 'text-black underline',
          className,
        )}
        {...props}
      >
        {group[0]} <span className='text-2xl text-slate-800'>&</span> {group[1]}
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
    <figure className='relative flex h-[330px] w-full flex-col items-center rounded-xl pl-3'>
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
    </figure>
  );
};
