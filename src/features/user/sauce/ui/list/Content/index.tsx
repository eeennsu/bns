import { ChevronDown, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';

import Pagination from '@components/Pagination';

const categories = [
  { id: 'all', name: '전체' },
  { id: 'signature', name: '시그니처' },
  { id: 'new', name: '신제품' },
];

const sauces = [
  {
    id: 1,
    name: '트러플 크림 소스',
    category: 'cream',
    price: 12000,
    description:
      '이탈리아 트러플을 넣은 고급 크림 소스입니다. 파스타나 빵에 곁들이면 풍부한 맛을 즐길 수 있습니다.',
    image: 'https://picsum.photos/id/63/350/256',
    isNew: true,
    isBest: true,
  },
  {
    id: 2,
    name: '바질 페스토',
    category: 'cream',
    price: 9800,
    description: '신선한 바질과 견과류, 올리브 오일로 만든 전통 이탈리안 페스토 소스입니다.',
    image: 'https://picsum.photos/id/23/350/256',
    isNew: false,
    isBest: true,
  },
  {
    id: 3,
    name: '토마토 파스타 소스',
    category: 'tomato',
    price: 8500,
    description: '유기농 토마토로 만든 클래식한 파스타 소스입니다. 풍부한 토마토 향이 특징입니다.',
    image: 'https://picsum.photos/id/54/350/256',
    isNew: false,
    isBest: false,
  },
  {
    id: 4,
    name: '엑스트라 버진 올리브 오일',
    category: 'olive',
    price: 18000,
    description:
      '스페인산 최고급 올리브로 만든 엑스트라 버진 올리브 오일입니다. 샐러드나 빵에 곁들이기 좋습니다.',
    image: 'https://picsum.photos/id/37/350/256',
    isNew: false,
    isBest: false,
  },
  {
    id: 5,
    name: '유기농 딸기잼',
    category: 'jam',
    price: 7500,
    description:
      '국내산 유기농 딸기로 만든 수제 딸기잼입니다. 설탕을 적게 넣어 과일 본연의 맛을 살렸습니다.',
    image: 'https://picsum.photos/id/123/350/256',
    isNew: false,
    isBest: true,
  },
  {
    id: 6,
    name: '블루베리 잼',
    category: 'jam',
    price: 8350,
    description:
      '국내산 블루베리로 만든 수제 잼입니다. 항산화 성분이 풍부하고 상큼한 맛이 특징입니다.',
    image: 'https://picsum.photos/id/645/350/256',
    isNew: true,
    isBest: false,
  },
  {
    id: 7,
    name: '허브 버터',
    category: 'butter',
    price: 6500,
    description: '다양한 허브를 넣어 만든 풍미 가득한 버터입니다. 빵이나 스테이크에 발라 드세요.',
    image: 'https://picsum.photos/id/575/350/256',
    isNew: false,
    isBest: false,
  },
  {
    id: 8,
    name: '아라비아타 소스',
    category: 'tomato',
    price: 9350,
    description: '매콤한 페퍼론치노를 넣은 이탈리안 토마토 소스입니다. 파스타나 피자에 활용하세요.',
    image: 'https://picsum.photos/id/434/350/256',
    isNew: true,
    isBest: false,
  },
];

const Content: FC = () => {
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
        {sauces.map(sauce => (
          <Link
            key={sauce.id}
            className='overflow-hidden rounded-lg bg-[#FFFFF0]/80 shadow-sm transition-shadow hover:shadow-md'
            href={USER_PATHS.product.sauce.detail({ slug: sauce.id })}
            scroll={false}
          >
            <div className='relative'>
              <div className='relative h-64 w-full'>
                <Image
                  src={sauce.image || '/placeholder.svg'}
                  alt={sauce.name}
                  fill
                  className='object-cover'
                />
              </div>
              <div className='absolute top-4 left-4 flex items-center gap-2'>
                {sauce.isNew && (
                  <div className='rounded bg-[#E74C3C] px-2 py-1 text-xs font-bold text-white'>
                    NEW
                  </div>
                )}
                {sauce.isBest && (
                  <div className='rounded bg-[#8B4513] px-2 py-1 text-xs font-bold text-[#FFFFF0]'>
                    Signature
                  </div>
                )}
              </div>
            </div>

            <div className='p-5'>
              <div className='mb-2 flex items-start justify-between'>
                <h3 className='text-xl font-bold text-[#8B4513]'>{sauce.name}</h3>
              </div>
              <p className='line-clamp-2 text-sm text-[#3E2723]'>{sauce.description}</p>
            </div>
          </Link>
        ))}
      </section>

      <Pagination totalPages={10} currentPage={1} handlePageChange={() => {}} />
    </>
  );
};

export default Content;
