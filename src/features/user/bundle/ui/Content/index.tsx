import { FC } from 'react';

import BundleCard from '../Card';

interface IProps {
  list: any[];
}

const BundleListContent: FC<IProps> = ({ list }) => {
  return (
    <section className='container !max-w-5xl space-y-4 sm:space-y-8'>
      <p className='text-center text-[#6c6055]'>
        엄선된 빵과 디저트로 구성된 특별한 세트를 만나보세요
      </p>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {list.map(bundle => (
          <BundleCard key={bundle.id} {...bundle} />
        ))}
      </div>
    </section>
  );
};

export default BundleListContent;
