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
    <section className='bg-[#fefcf7] pb-20 font-sans'>
      {/* Hero Section */}
      <section className="relative mx-auto h-[400px] max-w-6xl rounded-b-[2rem] bg-[url('/images/bundle-list.jpg')] bg-cover bg-center bg-no-repeat shadow-md">
        <p className='absolute bottom-10 left-1/2 w-full max-w-6xl -translate-x-1/2 px-4 text-center text-xl font-semibold text-white drop-shadow-md md:text-4xl'>
          대파 스콘, 깜빠뉴 달인이 만든 <br />
          세트 구성품을 만나보세요.
        </p>
      </section>

      {/* Title */}
      <div className='mx-auto flex max-w-6xl flex-col items-center px-4 py-14 text-center'>
        <h1 className='text-4xl font-extrabold text-[#5D4037]'>Set Products</h1>
        <div className='mt-3 h-1 w-24 rounded bg-[#A47551]' />
      </div>

      {/* Bundle Grid */}
      <div className='mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:grid-cols-2 lg:grid-cols-3'>
        {bundleList.map(set => (
          <div
            key={set.id}
            className='rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg'
          >
            <div className='overflow-hidden rounded-2xl'>
              <img
                src={set.imageUrl}
                alt={set.name}
                className='h-44 w-full object-cover transition-transform duration-300 hover:scale-105'
              />
            </div>

            <div className='mt-4'>
              <h3 className='text-xl font-bold text-neutral-800'>{set.name}</h3>
              <ul className='mt-2 space-y-1 text-sm text-neutral-600'>
                {set.items.map((item, index) => (
                  <li key={index}>
                    • {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>

              <div className='mt-4'>
                {set.discountPrice ? (
                  <div className='flex flex-col gap-1'>
                    <span className='text-sm text-gray-400 line-through'>
                      {set.price.toLocaleString()}원
                    </span>
                    <span className='text-xl font-bold text-orange-600'>
                      {set.discountPrice.toLocaleString()}원
                    </span>
                  </div>
                ) : (
                  <span className='text-xl font-bold text-neutral-800'>
                    {set.price.toLocaleString()}원
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-20 px-4'>
        <Contact />
      </div>
    </section>
  );
};

export default BundleListPage;
