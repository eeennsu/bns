import Link from 'next/link';
import type { FC } from 'react';

const Contact: FC = () => {
  return (
    <div className='mx-auto max-w-4xl rounded-2xl border border-[#e6dccf] bg-[#f8f1e6] px-6 py-12 text-center shadow-[0_4px_10px_rgba(0,0,0,0.04)]'>
      <h2 className='mb-4 text-3xl font-extrabold tracking-tight text-[#5D4037]'>단체 주문 안내</h2>
      <p className='mx-auto mb-8 max-w-2xl text-[#6D4C41]'>
        10개 이상의 대량 주문은 최소 이틀 전에 미리 연락주세요. <br />
        특별 행사나 모임을 위한 맞춤형 빵 주문도 가능합니다.
      </p>
      <Link
        href='/contact'
        className='inline-block rounded-full bg-[#8B5E3C] px-8 py-4 text-sm font-semibold text-[#fffdf8] shadow-md transition hover:bg-[#7a5033]'
      >
        문의하기
      </Link>
    </div>
  );
};

export default Contact;
