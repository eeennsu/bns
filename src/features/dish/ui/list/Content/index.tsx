import ErrorMessage from '@shared/components/ErrorMessage';
import { ProductCategory } from '@shared/typings/commons';
import type { FC } from 'react';

import CategoryLink from '@features/bread/ui/list/Content/CategoryLink';
import getDishList from '@features/dish/queries/getList';

import { DISH_CATEGORY_SELECT } from '@entities/dish/consts';

import { PER_PAGE_SIZE } from '@consts/commons';

import Pagination from '@components/Pagination';

import DishCard from './Card';

interface IProps {
  currentPage: string;
  category: ProductCategory;
}

const DishListContent: FC<IProps> = async ({ currentPage, category }) => {
  const [error, data] = await getDishList({
    page: +currentPage,
    pageSize: PER_PAGE_SIZE.PRODUCT,
    category,
  });

  return (
    <>
      <div className='flex flex-wrap justify-center gap-2 sm:justify-start'>
        {DISH_CATEGORY_SELECT.map(categoryItem => (
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
          {data.list.map(dish => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </section>
      )}

      <Pagination total={data.total} currentPage={+currentPage} perPage={PER_PAGE_SIZE.PRODUCT} />
    </>
  );
};

export default DishListContent;
