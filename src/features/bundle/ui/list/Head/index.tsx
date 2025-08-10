import { TextAnimate } from '@shared/magic-ui';
import UtilLocalImage from '@shared/utils/utilImage';
import type { FC } from 'react';

const BundleListHead: FC = () => {
  return (
    <div>
      <section
        className='relative mx-auto h-[360px] max-w-4xl overflow-hidden rounded-sm shadow-lg'
        style={{
          backgroundImage: `url(${UtilLocalImage.IMAGES.BUNDLE.LIST})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='via-black/05 absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />

        <div className='font-montserrat absolute bottom-10 left-1/2 w-full max-w-6xl -translate-x-1/2 px-4 text-center'>
          <h1 className='text-2xl font-medium text-white drop-shadow-md lg:text-4xl'>
            세트 구성 상품
          </h1>
          <div className='mt-2 text-base font-medium text-white lg:text-xl'>
            <TextAnimate animation='fadeIn' delay={1} duration={0.2}>
              모든 맛이 하나로 완성되는 조합을 만나보세요.
            </TextAnimate>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BundleListHead;
