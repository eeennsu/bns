import { ChevronDown, Filter } from 'lucide-react';
import type { FC } from 'react';

const categories = [
  { id: 'all', name: '전체' },
  { id: 'signature', name: '시그니처' },
  { id: 'new', name: '신제품' },
];

const Head: FC = () => {
  return (
    <>
      <section className='mb-12 text-center'>
        <h1 className='text-4xl font-bold text-[#8B4513] md:text-5xl'>Breads</h1>
        <p className='mx-auto mt-4 max-w-2xl text-[#3E2723]'>
          매일 아침 신선하게 구워내는 아티산 브레드의 다양한 빵을 만나보세요. 모든 빵은 천연
          발효종과 엄선된 재료로 정성껏 만들어집니다.
        </p>
        <div className='mx-auto mt-4 h-1 w-24 bg-[#8B4513]/30' />
      </section>

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
    </>
  );
};

export default Head;
