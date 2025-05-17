'use client';

import { ChevronDown, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';

import useChangePage from '@hooks/useChangePage';

import { PER_PAGE_SIZE } from '@consts/commons';

import Pagination from '@components/Pagination';

const categories = [
  { id: 'all', name: '전체' },
  { id: 'signature', name: '시그니처' },
  { id: 'new', name: '신제품' },
];
const breadProducts = [
  {
    id: 1,
    name: '클래식 사워도우',
    category: 'sourdough',
    price: 6800,
    description: '24시간 저온 발효한 클래식 사워도우 빵입니다. 바삭한 겉면과 쫄깃한 속을 즐기세요.',
    image: 'https://picsum.photos/id/14/200/300',
    isNew: false,
    isBest: true,
  },
  {
    id: 2,
    name: '통밀 사워도우',
    category: 'sourdough',
    price: 7200,
    description: '영양가 높은 통밀로 만든 건강한 사워도우 빵입니다. 고소한 맛이 일품입니다.',
    image: 'https://picsum.photos/id/12/200/300',
    isNew: false,
    isBest: false,
  },
  {
    id: 3,
    name: '전통 바게트',
    category: 'baguette',
    price: 4500,
    description: '프랑스 전통 방식으로 만든 바게트입니다. 겉은 바삭하고 속은 부드럽습니다.',
    image: 'https://picsum.photos/id/35/200/300',
    isNew: false,
    isBest: true,
  },
  {
    id: 4,
    name: '버터 크루아상',
    category: 'croissant',
    price: 4200,
    description: '고급 프랑스 버터로 만든 정통 크루아상입니다. 층이 살아있는 식감을 느껴보세요.',
    image: 'https://picsum.photos/id/67/200/300',
    isNew: true,
    isBest: true,
  },
  {
    id: 5,
    name: '초코 크루아상',
    category: 'croissant',
    price: 4800,
    description: '벨기에 다크 초콜릿을 넣어 만든 달콤한 크루아상입니다.',
    image: 'https://picsum.photos/id/14/200/300',
    isNew: true,
    isBest: false,
  },
  {
    id: 6,
    name: '치즈 케이크',
    category: 'cake',
    price: 38000,
    description: '부드러운 크림치즈와 신선한 생크림으로 만든 케이크입니다. 6-8인분 크기입니다.',
    image: 'https://picsum.photos/id/63/200/300',
    isNew: false,
    isBest: false,
  },
  {
    id: 7,
    name: '호밀 사워도우',
    category: 'sourdough',
    price: 7500,
    description: '호밀가루를 넣어 깊은 풍미가 특징인 건강한 사워도우 빵입니다.',
    image: 'https://picsum.photos/id/54/200/300',
    isNew: true,
    isBest: false,
  },
  {
    id: 8,
    name: '햄 치즈 샌드위치',
    category: 'sandwich',
    price: 8500,
    description: '직접 구운 빵에 수제 햄과 치즈를 넣은 샌드위치입니다. 점심 식사로 완벽합니다.',
    image: 'https://picsum.photos/id/20/200/300',
    isNew: false,
    isBest: false,
  },
];

const Content: FC = () => {
  const paginationData = useChangePage({
    total: 20, // TODO: 실제 값으로
  });

  return (
    <>
      <section className='mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
        <div className='flex flex-wrap gap-2'>
          {categories.map(category => (
            <button
              key={category.id}
              className={`rounded-full px-4 py-2 text-sm ${
                category.id === 'all'
                  ? 'bg-[#8B4513] text-[#FFFFF0]'
                  : 'bg-[#FFFFF0]/70 text-[#3E2723] hover:bg-[#8B4513]/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className='flex items-center'>
          <button className='flex items-center gap-2 rounded-lg bg-[#FFFFF0]/70 px-4 py-2 text-[#3E2723] hover:bg-[#FFFFF0]'>
            <Filter size={16} />
            <span>필터</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </section>
      <section className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4'>
        {breadProducts.map(bread => (
          <Link
            key={bread.id}
            className='overflow-hidden rounded-lg bg-[#FFFFF0]/80 shadow-sm transition-shadow hover:shadow-md'
            href={USER_PATHS.product.bread.detail({ slug: bread.id })}
            scroll={false}
          >
            <div className='relative'>
              <div className='relative h-64 w-full'>
                <Image
                  src={bread.image || '/placeholder.svg'}
                  alt={bread.name}
                  fill
                  className='object-cover'
                />
              </div>
              <div className='absolute top-4 left-4 flex items-center gap-2'>
                {bread.isNew && (
                  <div className='rounded bg-[#E74C3C] px-2 py-1 text-xs font-bold text-white'>
                    NEW
                  </div>
                )}
                {bread.isBest && (
                  <div className='rounded bg-[#8B4513] px-2 py-1 text-xs font-bold text-[#FFFFF0]'>
                    Signature
                  </div>
                )}
              </div>
            </div>

            <div className='p-5'>
              <div className='mb-2 flex items-start justify-between'>
                <h3 className='text-xl font-bold text-[#8B4513]'>{bread.name}</h3>
              </div>
              <p className='line-clamp-2 text-sm text-[#3E2723]'>{bread.description}</p>
            </div>
          </Link>
        ))}
      </section>
      <Pagination {...paginationData} perPage={PER_PAGE_SIZE.PRODUCT} />
    </>
  );
};

export default Content;
