import { FC } from 'react';

import { PER_PAGE_SIZE } from '@consts/commons';

import Pagination from '@components/Pagination';

import BreadCard from './Card';
import CategoryLink from './CategoryLink';

const categories = [
  { id: 'all', name: '전체' },
  { id: 'signature', name: '시그니처' },
  { id: 'new', name: '신제품' },
];

const breadProducts = [
  {
    id: 1,
    name: '클래식 사워도우 어쩌라고 크크킄크크킄',
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

interface IProps {
  currentPage: string;
  category: string;
}

const BreadListContent: FC<IProps> = ({ currentPage, category }) => {
  return (
    <>
      <section className='flex flex-wrap justify-center gap-2 sm:justify-start'>
        {categories.map(categoryItem => (
          <CategoryLink
            key={categoryItem.id}
            selected={categoryItem.id === category}
            href={{
              query: {
                page: 1,
                category: categoryItem.id,
              },
            }}
          >
            {categoryItem.name}
          </CategoryLink>
        ))}
      </section>

      <section className='grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4'>
        {breadProducts.map(bread => (
          <BreadCard key={bread.id} bread={bread} />
        ))}
      </section>

      <Pagination total={30} currentPage={+currentPage} perPage={PER_PAGE_SIZE.PRODUCT} />
    </>
  );
};

export default BreadListContent;
