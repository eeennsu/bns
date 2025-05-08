import { ChevronDown, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

import UserPageWrapper from '../UserPageWrapper';

interface IParams {
  searchParams: Promise<{
    page: string;
  }>;
}

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
    isBestSeller: true,
  },
  {
    id: 2,
    name: '통밀 사워도우',
    category: 'sourdough',
    price: 7200,
    description: '영양가 높은 통밀로 만든 건강한 사워도우 빵입니다. 고소한 맛이 일품입니다.',
    image: 'https://picsum.photos/id/12/200/300',
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 3,
    name: '전통 바게트',
    category: 'baguette',
    price: 4500,
    description: '프랑스 전통 방식으로 만든 바게트입니다. 겉은 바삭하고 속은 부드럽습니다.',
    image: 'https://picsum.photos/id/35/200/300',
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 4,
    name: '버터 크루아상',
    category: 'croissant',
    price: 4200,
    description: '고급 프랑스 버터로 만든 정통 크루아상입니다. 층이 살아있는 식감을 느껴보세요.',
    image: 'https://picsum.photos/id/67/200/300',
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 5,
    name: '초코 크루아상',
    category: 'croissant',
    price: 4800,
    description: '벨기에 다크 초콜릿을 넣어 만든 달콤한 크루아상입니다.',
    image: 'https://picsum.photos/id/14/200/300',
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 6,
    name: '치즈 케이크',
    category: 'cake',
    price: 38000,
    description: '부드러운 크림치즈와 신선한 생크림으로 만든 케이크입니다. 6-8인분 크기입니다.',
    image: 'https://picsum.photos/id/63/200/300',
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 7,
    name: '호밀 사워도우',
    category: 'sourdough',
    price: 7500,
    description: '호밀가루를 넣어 깊은 풍미가 특징인 건강한 사워도우 빵입니다.',
    image: 'https://picsum.photos/id/54/200/300',
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 8,
    name: '햄 치즈 샌드위치',
    category: 'sandwich',
    price: 8500,
    description: '직접 구운 빵에 수제 햄과 치즈를 넣은 샌드위치입니다. 점심 식사로 완벽합니다.',
    image: 'https://picsum.photos/id/20/200/300',
    isNew: false,
    isBestSeller: false,
  },
];

const BreadListPage: FC<IParams> = async ({ searchParams }) => {
  const page = (await searchParams).page;
  console.log('page', page);

  return (
    <UserPageWrapper className=''>
      <div className='mb-12 text-center'>
        <h1 className='text-4xl font-bold text-[#8B4513] md:text-5xl'>Breads</h1>
        <p className='mx-auto mt-4 max-w-2xl text-[#3E2723]'>
          매일 아침 신선하게 구워내는 아티산 브레드의 다양한 빵을 만나보세요. 모든 빵은 천연
          발효종과 엄선된 재료로 정성껏 만들어집니다.
        </p>
        <div className='mx-auto mt-4 h-1 w-24 bg-[#8B4513]/30' />
      </div>

      <div className='mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
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
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4'>
        {breadProducts.map(bread => (
          <div
            key={bread.id}
            className='overflow-hidden rounded-lg bg-[#FFFFF0]/80 shadow-sm transition-shadow hover:shadow-md'
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
              {bread.isNew && (
                <div className='absolute top-4 left-4 rounded bg-[#E74C3C] px-2 py-1 text-xs font-bold text-white'>
                  NEW
                </div>
              )}
              {bread.isBestSeller && (
                <div className='absolute top-4 right-4 rounded bg-[#8B4513] px-2 py-1 text-xs font-bold text-[#FFFFF0]'>
                  BEST
                </div>
              )}
            </div>

            <div className='p-5'>
              <div className='mb-2 flex items-start justify-between'>
                <h3 className='text-xl font-bold text-[#8B4513]'>{bread.name}</h3>
              </div>
              <p className='line-clamp-2 text-sm text-[#3E2723]'>{bread.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='my-8 flex justify-center'>
        <div className='flex items-center gap-2'>
          <button className='flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFFF0]/70 text-[#3E2723] hover:bg-[#8B4513]/10'>
            &lt;
          </button>
          <button className='flex h-10 w-10 items-center justify-center rounded-full bg-[#8B4513] text-[#FFFFF0]'>
            1
          </button>
          <button className='flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFFF0]/70 text-[#3E2723] hover:bg-[#8B4513]/10'>
            2
          </button>
          <button className='flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFFF0]/70 text-[#3E2723] hover:bg-[#8B4513]/10'>
            3
          </button>
          <button className='flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFFF0]/70 text-[#3E2723] hover:bg-[#8B4513]/10'>
            &gt;
          </button>
        </div>
      </div>

      <section className='rounded-sm bg-[#8B4513] py-16'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-[#FFFFF0]'>단체 주문 안내</h2>
          <p className='mx-auto mb-8 max-w-2xl text-[#FFFFF0]/90'>
            10개 이상의 대량 주문은 최소 이틀 전에 미리 연락주세요. 특별 행사나 모임을 위한 맞춤형
            빵 주문도 가능합니다.
          </p>
          <Link
            href='/contact'
            className='inline-flex items-center rounded bg-[#FFFFF0] px-8 py-4 font-medium text-[#8B4513] transition-colors hover:bg-[#FFFFF0]/90'
          >
            문의하기
          </Link>
        </div>
      </section>
    </UserPageWrapper>
  );
};

export default BreadListPage;
