import ErrorMessage from '@shared/components/ErrorMessage';
import { ProductCategory } from '@shared/typings/commons';
import { FC } from 'react';

import getBreadList from '@features/bread/queries/getList';

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
  const [error, data] = await getBreadList({
    page: +currentPage,
    pageSize: PER_PAGE_SIZE.PRODUCT,
    category,
  });

  return (
    <>
      <section className='flex flex-wrap justify-center gap-2 lg:justify-start'>
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
        <section className='grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-9 lg:gap-y-16 xl:grid-cols-4'>
          {data?.list.map(bread => (
            <BreadCard key={bread.id} bread={bread} />
          ))}
        </section>
      )}

      <Pagination total={data.total} currentPage={+currentPage} perPage={PER_PAGE_SIZE.PRODUCT} />
    </>
  );
};

export default BreadListContent;
