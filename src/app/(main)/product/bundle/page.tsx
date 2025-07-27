import { FC } from 'react';

import BundleListContact from '@features/bundle/ui/list/Contact';
import BundleListContent from '@features/bundle/ui/list/Content';
import BundleListHead from '@features/bundle/ui/list/Head';

const BundleListPage: FC = () => {
  return (
    <div className='bg-[#fefcf7] sm:pb-10'>
      <BundleListHead />

      <div className='flex flex-col gap-4'>
        <BundleListContent />
        <BundleListContact />
      </div>
    </div>
  );
};

export default BundleListPage;
