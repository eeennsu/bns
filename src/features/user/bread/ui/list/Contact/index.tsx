import Link from 'next/link';
import type { FC } from 'react';

const Contact: FC = () => {
  return (
    <section className='mt-20 rounded-sm bg-[#8B4513] py-16'>
      <div className='container mx-auto px-4 text-center'>
        <h2 className='mb-4 text-3xl font-bold text-[#FFFFF0]'>단체 주문 안내</h2>
        <p className='mx-auto mb-8 max-w-2xl text-[#FFFFF0]/90'>
          10개 이상의 대량 주문은 최소 이틀 전에 미리 연락주세요. 특별 행사나 모임을 위한 맞춤형 빵
          주문도 가능합니다.
        </p>
        <Link
          href='/contact'
          className='inline-flex items-center rounded bg-[#FFFFF0] px-8 py-4 font-medium text-[#8B4513] transition-colors hover:bg-[#FFFFF0]/90'
        >
          문의하기
        </Link>
      </div>
    </section>
  );
};

export default Contact;
