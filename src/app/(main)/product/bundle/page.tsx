import { FC } from 'react';

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
    <div className='-mt-5 flex flex-col gap-5 lg:gap-10'>
      <BundleListHead />
      <BundleListContent currentPage={page} />
    </div>
  );
};

export default BundleListPage;
