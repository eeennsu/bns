import ErrorMessage from '@shared/components/ErrorMessage';
import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { ProductCategory } from '@shared/typings/commons';
import type { FC } from 'react';

import CategoryLink from '@app/(main)/product/CategoryLink';
import ListCardItem from '@app/(main)/product/ListCardItem';

import getDishList from '@features/dish/queries/getList';
import EmptyProduct from '@features/home/ui/FullPageScroll/EmptyProduct';

import { DISH_CATEGORY_SELECT } from '@entities/dish/consts';

import { PER_PAGE_SIZE } from '@consts/commons';

import Pagination from '@components/Pagination';

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
    <section className='flex flex-col gap-4 lg:gap-6 lg:px-24'>
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
        <div className='grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3 lg:gap-14'>
          {data.list.length > 0 ? (
            data?.list.map(dish => (
              <ListCardItem
                key={dish.id}
                href={MAIN_PATHS.product.dish.detail({ slug: dish.id })}
                {...dish}
              />
            ))
          ) : (
            <EmptyProduct />
          )}
        </div>
      )}

      <Pagination total={data.total} currentPage={+currentPage} perPage={PER_PAGE_SIZE.PRODUCT} />
    </section>
  );
};

export default DishListContent;
