import { PackageOpen } from 'lucide-react';
import type { FC } from 'react';

const EmptyProduct: FC = () => {
  return (
    <div className='flex h-[330px] w-full items-center justify-center rounded-xl text-center'>
      <div className='flex flex-col items-center gap-3 p-6'>
        <PackageOpen className='h-8 w-8 text-neutral-400' />
        <span className='text-base font-medium text-neutral-600'>상품을 준비 중입니다</span>
        <p className='text-sm text-neutral-400'>더 나은 품질로 곧 찾아뵐게요.</p>
      </div>
    </div>
  );
};

export default EmptyProduct;
