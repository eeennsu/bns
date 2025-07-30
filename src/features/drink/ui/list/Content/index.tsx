import ErrorMessage from '@shared/components/ErrorMessage';
import { ProductCategory } from '@shared/typings/commons';
import type { FC } from 'react';

import CategoryLink from '@features/bread/ui/list/Content/CategoryLink';
import getDrinkList from '@features/drink/queries/getList';

import { DRINK_CATEGORY_SELECT } from '@entities/drink/consts';

import { PER_PAGE_SIZE } from '@consts/commons';

import Pagination from '@components/Pagination';

import DrinkCard from './Card';

interface IProps {
  currentPage: string;
  category: ProductCategory;
}

const DrinkListContent: FC<IProps> = async ({ currentPage, category }) => {
  const [error, drinkList] = await getDrinkList({
    page: +currentPage,
    pageSize: PER_PAGE_SIZE.PRODUCT,
    category,
  });

  return (
    <>
      <div className='flex flex-wrap justify-center gap-2 sm:justify-start'>
        {DRINK_CATEGORY_SELECT.map(categoryItem => (
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
          {drinkList.map(drink => (
            <DrinkCard key={drink.id} drink={drink} />
          ))}
        </section>
      )}

      <Pagination total={30} currentPage={+currentPage} perPage={PER_PAGE_SIZE.PRODUCT} />
    </>
  );
};

export default DrinkListContent;
