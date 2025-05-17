import { FC } from 'react';

import BundleListContact from '@features/user/bundle/ui/Contact';
import BundleListContent from '@features/user/bundle/ui/Content';
import BundleListHead from '@features/user/bundle/ui/Head';

interface BundleItem {
  id: string;
  name: string;
  quantity: number;
}

interface Bundle {
  id: string;
  name: string;
  imageUrl: string;
  items: BundleItem[];
  price: number;
  discountedPrice?: number;
}

const bundleList: Bundle[] = [
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

const BundleListPage: FC = () => {
  return (
    <section className='bg-[#fefcf7] sm:pb-10'>
      <BundleListHead />

      <div className='space-y-10'>
        <BundleListContent list={bundleList} />
        <BundleListContact />
      </div>
    </section>
  );
};

export default BundleListPage;
