import { FC } from 'react';

import BundleCard from '../Card';

const bundleList: any[] = [
  {
    id: '1',
    name: '사워도우 & 트러플 마요 세트',
    imageUrl: 'https://picsum.photos/id/35/275/160',
    items: [
      { id: '1', name: '클래식 사워도우', quantity: 1 },
      { id: '2', name: '트러플 마요 소스', quantity: 2 },
    ],
    price: 15200,
    discountedPrice: 13800,
  },
  {
    id: '2',
    name: '허니브레드 듀오 세트',
    imageUrl: 'https://picsum.photos/id/62/275/165',
    items: [
      { id: '3', name: '허니브레드', quantity: 2 },
      { id: '4', name: '버터 소스', quantity: 1 },
    ],
    price: 12400,
  },
  {
    id: '3',
    name: '허니브레드 & 버터 세트',
    imageUrl: 'https://picsum.photos/id/236/275/165',
    items: [
      { id: '5', name: '허니브레드', quantity: 1 },
      { id: '6', name: '버터 소스', quantity: 1 },
    ],
    price: 11200,
  },
];

const BundleListContent: FC = () => {
  return (
    <section className='container !max-w-5xl space-y-4 sm:space-y-8'>
      <p className='text-center text-[#6c6055]'>
        엄선된 빵과 소스로 구성된 특별한 세트를 만나보세요
      </p>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {bundleList.map(bundle => (
          <BundleCard key={bundle.id} bundle={bundle} />
        ))}
      </div>
    </section>
  );
};

export default BundleListContent;
