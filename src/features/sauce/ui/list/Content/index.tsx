import ErrorMessage from '@shared/components/ErrorMessage';
import { ProductCategory } from '@shared/typings/commons';
import type { FC } from 'react';

import CategoryLink from '@features/bread/ui/list/Content/CategoryLink';
import getSauceList from '@features/sauce/queries/getList';

import { SAUCE_CATEGORY_SELECT } from '@entities/sauce/consts';

import { PER_PAGE_SIZE } from '@consts/commons';

import Pagination from '@components/Pagination';

import SauceCard from './Card';

interface IProps {
  currentPage: string;
  category: ProductCategory;
}

const SauceListContent: FC<IProps> = async ({ currentPage, category }) => {
  const [error, sauceList] = await getSauceList({
    page: +currentPage,
    pageSize: PER_PAGE_SIZE.PRODUCT,
    category,
  });

  return (
    <>
      <div className='flex flex-wrap justify-center gap-2 sm:justify-start'>
        {SAUCE_CATEGORY_SELECT.map(categoryItem => (
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
      </div>
      {error ? (
        <ErrorMessage />
      ) : (
        <section className='grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4'>
          {sauceList.map(sauce => (
            <SauceCard key={sauce.id} sauce={sauce} />
          ))}
        </section>
      )}

      <Pagination total={30} currentPage={+currentPage} perPage={PER_PAGE_SIZE.PRODUCT} />
    </>
  );
};

export default SauceListContent;
