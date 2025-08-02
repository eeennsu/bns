import ErrorMessage from '@shared/components/ErrorMessage';
import Pagination from '@shared/components/Pagination';
import { PER_PAGE_SIZE } from '@shared/consts/commons';
import { FC } from 'react';

import getBundleList from '@features/bundle/queries/getList';

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
    <>
      <section className='container !max-w-5xl space-y-4 sm:space-y-8'>
        <p className='text-center text-[#6c6055]'>
          엄선된 빵과 소스로 구성된 특별한 세트를 만나보세요
        </p>

        {error ? (
          <ErrorMessage />
        ) : (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {data.list.map(bundle => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        )}
      </section>

      <Pagination total={data.total} currentPage={+currentPage} perPage={PER_PAGE_SIZE.PRODUCT} />
    </>
  );
};

export default BundleListContent;
