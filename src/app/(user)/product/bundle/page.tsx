import { FC } from 'react';

import Contact from '@features/user/bundle/ui/Contact';

interface BundleItem {
  name: string;
  quantity: number;
}

interface Bundle {
  id: string;
  name: string;
  imageUrl: string;
  items: BundleItem[];
  price: number;
  discountPrice?: number;
}

const bundleList: Bundle[] = [
  {
    id: '1',
    name: '사워도우 & 트러플 마요 세트',
    imageUrl: 'https://picsum.photos/id/35/275/160',
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
    imageUrl: 'https://picsum.photos/id/62/275/165',
    items: [
      { name: '허니브레드', quantity: 2 },
      { name: '버터 소스', quantity: 1 },
    ],
    price: 12400,
  },
  {
    id: '3',
    name: '허니브레드 & 버터 세트',
    imageUrl: 'https://picsum.photos/id/236/275/165',
    items: [
      { name: '허니브레드', quantity: 1 },
      { name: '버터 소스', quantity: 1 },
    ],
    price: 11200,
  },
];

const BundleListPage: FC = () => {
  return (
    <section className='bg-[#fdfcf8] font-sans'>
      <section className='relative mx-auto h-[400px] max-w-6xl bg-[url("/images/bundle-list.jpg")] bg-cover bg-center bg-no-repeat'>
        <p className='text-ivory-tertiary absolute bottom-10 left-1/2 w-full max-w-6xl -translate-x-1/2 text-center text-lg font-medium tracking-wide md:text-3xl'>
          대파 스콘, 깜빠뉴 달인이 만든 <br />
          세트 구성품을 만나보세요.
        </p>
      </section>

      <div className='mx-auto flex max-w-6xl flex-col items-center px-4 py-12'>
        <h1 className='text-3xl font-extrabold tracking-tight text-[#8B5E3C]'>Set Products</h1>
        <div className='mt-2 h-1 w-24 rounded bg-[#A47551]' />
      </div>

      <div className='mx-auto max-w-6xl px-4 pb-16'>
        <h2 className='mb-6 text-xl font-semibold text-[#6D4C41] sm:text-2xl'>세트 상품</h2>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {bundleList.map(set => (
            <div
              key={set.id}
              className='rounded-2xl border border-[#e6dccf] bg-[#fffdf8] p-6 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-1 hover:shadow-lg'
            >
              <img
                src={set.imageUrl}
                alt={set.name}
                className='mb-4 h-40 w-full rounded-xl object-cover'
              />
              <h3 className='mb-2 text-lg font-bold text-[#4E342E]'>{set.name}</h3>
              <ul className='mb-4 space-y-1 text-sm text-[#5D4037]'>
                {set.items.map((item, index) => (
                  <li key={index}>
                    • {item.name} x {item.quantity}
                  </li>
                ))}
              </ul>
              <div className='pt-2'>
                {set.discountPrice ? (
                  <div className='flex flex-col gap-1'>
                    <span className='text-sm text-[#9E9E9E] line-through'>
                      {set.price.toLocaleString()}원
                    </span>
                    <span className='text-lg font-bold text-[#D84315]'>
                      {set.discountPrice.toLocaleString()}원
                    </span>
                  </div>
                ) : (
                  <span className='text-lg font-bold text-[#6D4C41]'>
                    {set.price.toLocaleString()}원
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Contact />
    </section>
  );
};

export default BundleListPage;
