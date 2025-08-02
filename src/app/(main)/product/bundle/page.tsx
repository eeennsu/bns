import { FC } from 'react';

import BundleListContact from '@features/bundle/ui/list/Contact';
import BundleListContent from '@features/bundle/ui/list/Content';
import BundleListHead from '@features/bundle/ui/list/Head';

interface IParams {
  searchParams: Promise<{
    page: string;
  }>;
}

const BundleListPage: FC<IParams> = async ({ searchParams }) => {
  const { page = '1' } = await searchParams;

  return (
    <div className='bg-[#fefcf7] sm:pb-10'>
      <BundleListHead />

      <div className='flex flex-col gap-4'>
        <BundleListContent currentPage={page} />
        <BundleListContact />
      </div>
    </div>
  );
};

export default BundleListPage;
