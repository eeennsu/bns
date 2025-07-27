import Link from 'next/link';
import type { FC } from 'react';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

const BreadListContact: FC = () => {
  return (
    <section className='border-ivory mx-auto w-full max-w-4xl rounded-2xl border bg-[#fdfaf5] px-4 py-10 text-center shadow-md transition-all duration-300 sm:px-6 sm:py-12 md:px-10 md:py-14 lg:rounded-3xl lg:shadow-lg'>
      <h2 className='text-wood mb-3 text-2xl font-bold tracking-tight sm:mb-4 sm:text-3xl md:text-4xl'>
        단체 주문 안내
      </h2>
      <p className='mx-auto mb-6 max-w-xl text-sm text-[#6D4C41] sm:text-base md:text-lg'>
        10개 이상의 대량 주문은 <strong className='text-[#5D4037]'>최소 이틀 전</strong>에 연락
        주세요. <br className='hidden sm:block' />
        특별 행사나 모임을 위한 <span className='underline underline-offset-2'>맞춤형 빵 주문</span>
        도 가능합니다.
      </p>
      <Link
        href={MAIN_PATHS.product.bundle.list()}
        className='inline-block rounded-full bg-[#8B5E3C] px-6 py-3 text-xs font-semibold text-[#fffdf8] shadow-sm transition hover:bg-[#7a5033] sm:px-8 sm:py-4 sm:text-sm md:text-base'
      >
        세트 구성 보기
      </Link>
    </section>
  );
};

export default BreadListContact;
