'use client';

import { FC } from 'react';

import Head from '@features/user/set/ui/Head';

interface SetItem {
  name: string;
  quantity: number;
}

interface SetProduct {
  id: string;
  name: string;
  items: SetItem[];
  price: number;
  discountPrice?: number;
}

const setList: SetProduct[] = [
  {
    id: '1',
    name: '사워도우 & 트러플 마요 세트',
    items: [
      { name: '클래식 사워도우', quantity: 1 },
      { name: '트러플 마요 소스', quantity: 2 },
    ],
    price: 15200,
    discountPrice: 13800,
  },
  {
    id: '2',
    name: '허니브레드 듀오 세트',
    items: [
      { name: '허니브레드', quantity: 2 },
      { name: '버터 소스', quantity: 1 },
    ],
    price: 12400,
  },
];

const SetListPage: FC = () => {
  return (
    <section className='bg-[#fdfcf8] px-4 py-8'>
      <Head />
      <div className='mx-auto max-w-5xl'>
        <h1 className='mb-6 text-2xl font-bold text-[#5D4037] sm:text-3xl'>세트 상품</h1>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {setList.map(set => (
            <div
              key={set.id}
              className='space-y-4 rounded-xl bg-white p-5 shadow-md transition hover:shadow-lg'
            >
              <h2 className='text-lg font-semibold text-[#3E2723]'>{set.name}</h2>

              <ul className='space-y-1 text-sm text-[#5A5A5A]'>
                {set.items.map((item, index) => (
                  <li key={index}>
                    • {item.name} x {item.quantity}
                  </li>
                ))}
              </ul>

              <div className='pt-2'>
                {set.discountPrice ? (
                  <div className='flex flex-col'>
                    <span className='text-sm text-gray-500 line-through'>
                      {set.price.toLocaleString()}원
                    </span>
                    <span className='text-lg font-bold text-[#E74C3C]'>
                      {set.discountPrice.toLocaleString()}원
                    </span>
                  </div>
                ) : (
                  <span className='text-lg font-bold text-[#3E2723]'>
                    {set.price.toLocaleString()}원
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SetListPage;
