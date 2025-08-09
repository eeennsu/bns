import ErrorMessage from '@shared/components/ErrorMessage';
import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { ProductCategory } from '@shared/typings/commons';
import type { FC } from 'react';

import CategoryLink from '@app/(main)/product/CategoryLink';
import ListCardItem from '@app/(main)/product/ListCardItem';

import getDessertList from '@features/dessert/queries/getList';
import EmptyProduct from '@features/home/ui/FullPageScroll/EmptyProduct';

import { DESSERT_CATEGORY_SELECT } from '@entities/dessert/consts';

import { PER_PAGE_SIZE } from '@consts/commons';

import Pagination from '@components/Pagination';

interface IProps {
  currentPage: string;
  category: ProductCategory;
}

const DessertListContent: FC<IProps> = async ({ currentPage, category }) => {
  const [error, data] = await getDessertList({
    page: +currentPage,
    pageSize: PER_PAGE_SIZE.PRODUCT,
    category,
  });

  return (
    <section className='flex flex-col gap-4 lg:gap-6 lg:px-24'>
      <div className='flex flex-wrap justify-center gap-2 sm:justify-start'>
        {DESSERT_CATEGORY_SELECT.map(categoryItem => (
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
<div className='grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-7'>
          {data.list.length > 0 ? (
            data?.list.map(dessert => (
              <ListCardItem
                key={dessert.id}
                href={MAIN_PATHS.product.dessert.detail({ slug: dessert.id })}
                {...dessert}
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

export default DessertListContent;
