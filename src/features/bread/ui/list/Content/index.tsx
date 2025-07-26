import ErrorMessage from '@shared/components/ErrorMessage';
import { ProductCategory } from '@shared/typings/commons';
import { FC } from 'react';

import getBreadList from '@features/bread/actions/getList';

import { BREAD_CATEGORY_SELECT } from '@entities/bread/consts';

import { PER_PAGE_SIZE } from '@consts/commons';

import Pagination from '@components/Pagination';

import BreadCard from './Card';
import CategoryLink from './CategoryLink';

interface IProps {
  currentPage: string;
  category: ProductCategory;
}

const BreadListContent: FC<IProps> = async ({ currentPage, category }) => {
  const [error, breadList] = await getBreadList({
    page: +currentPage,
    pageSize: PER_PAGE_SIZE.DEFAULT,
    category,
  });

  return (
    <>
      <section className='flex flex-wrap justify-center gap-2 sm:justify-start'>
        {BREAD_CATEGORY_SELECT.map(categoryItem => (
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
      {error ? (
        <ErrorMessage />
      ) : (
        <section className='grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4'>
          {breadList.map(bread => (
            <BreadCard key={bread.id} bread={bread} />
          ))}
        </section>
      )}

      <Pagination total={30} currentPage={+currentPage} perPage={PER_PAGE_SIZE.PRODUCT} />
    </>
  );
};

export default BreadListContent;
