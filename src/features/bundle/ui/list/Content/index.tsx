import ErrorMessage from '@shared/components/ErrorMessage';
import Pagination from '@shared/components/Pagination';
import { PER_PAGE_SIZE } from '@shared/consts/commons';
import { FC } from 'react';

import getBundleList from '@features/bundle/queries/getList';
import EmptyProduct from '@features/home/ui/FullPageScroll/EmptyProduct';

import BundleCard from './Card';

interface IProps {
  currentPage: string;
}

const BundleListContent: FC<IProps> = async ({ currentPage }) => {
  const [error, data] = await getBundleList({
    page: +currentPage,
    pageSize: PER_PAGE_SIZE.PRODUCT,
  });

  return (
    <section className='flex flex-col gap-4 lg:gap-6 lg:px-24'>
      {error ? (
        <ErrorMessage />
      ) : (
        <div className='grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3 lg:gap-14'>
          {data.list.length > 0 ? (
            data.list.map(bundle => <BundleCard key={bundle.id} bundle={bundle} />)
          ) : (
            <EmptyProduct />
          )}
        </div>
      )}

      <Pagination total={data.total} currentPage={+currentPage} perPage={PER_PAGE_SIZE.PRODUCT} />
    </section>
  );
};

export default BundleListContent;
