import Link from 'next/link';
import type { FC } from 'react';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';

const Contact: FC = () => {
  return (
    <section className='border-ivory mx-auto w-full max-w-4xl rounded-3xl border bg-[#fdfaf5] px-6 py-14 text-center shadow-lg transition-all duration-300 sm:px-10 md:px-16'>
      <h2 className='text-wood mb-4 text-3xl font-bold tracking-tight sm:text-4xl'>
        단체 주문 안내
      </h2>
      <p className='mx-auto mb-6 max-w-2xl text-base text-[#6D4C41] sm:text-lg'>
        10개 이상의 대량 주문은 <strong className='text-[#5D4037]'>최소 이틀 전</strong>에 연락
        주세요. <br className='hidden sm:block' />
        특별 행사나 모임을 위한 <span className='underline underline-offset-2'>맞춤형 빵 주문</span>
        도 가능합니다.
      </p>
      <Link
        href={USER_PATHS.product.bundle()}
        className='inline-block rounded-full bg-[#8B5E3C] px-8 py-4 text-sm font-semibold text-[#fffdf8] shadow-md transition hover:bg-[#7a5033]'
      >
        세트 구성 보기
      </Link>
    </section>
  );
};

export default Contact;
