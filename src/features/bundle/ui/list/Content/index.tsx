import ErrorMessage from '@shared/components/ErrorMessage';
import { FC } from 'react';

import getBundleList from '@features/bundle/queries/getList';

import BundleCard from './Card';

const BundleListContent: FC = async () => {
  const [error, bundleList] = await getBundleList();

  return (
    <section className='container !max-w-5xl space-y-4 sm:space-y-8'>
      <p className='text-center text-[#6c6055]'>
        엄선된 빵과 소스로 구성된 특별한 세트를 만나보세요
      </p>

      {error ? (
        <ErrorMessage />
      ) : (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {bundleList.map(bundle => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BundleListContent;
