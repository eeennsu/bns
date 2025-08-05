'use client';

import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { Carousel, CarouselContent, CarouselItem } from '@shared/shadcn-ui/ui';
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
      <div className='flex w-full flex-col gap-16'>
        <SectionTitle title='SIGNATURE MENU' />

        <div className='flex grow gap-16'>
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

          {groupedSignatures?.[currentType]?.length === 0 ? (
            <EmptyProduct />
          ) : groupedSignatures?.[currentType]?.length > 1 ? (
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
    <Link
      href={MAIN_PATHS.product[signature.type].detail({ slug: signature.id })}
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
