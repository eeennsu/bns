import { cn } from '@shared/shadcn-ui/utils';
import { PackageOpen } from 'lucide-react';
import type { FC } from 'react';

interface IProps {
  size?: 'sm' | 'md';
}

const EmptyProduct: FC<IProps> = ({ size = 'md' }) => {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center rounded-xl text-center',
        size === 'md' ? 'h-[400px]' : 'h-[330px]',
      )}
    >
      <div className='flex flex-col items-center gap-3 p-6'>
        <PackageOpen className={cn('text-neutral-400', size === 'md' ? 'size-10' : 'size-8')} />
        <span className={cn('font-medium text-neutral-600', size === 'md' ? 'text-xl' : 'text-sm')}>
          상품을 준비 중입니다
        </span>
        <p className={cn('text-sm text-neutral-400', size === 'md' ? 'text-base' : 'text-sm')}>
          더 나은 품질로 곧 찾아뵐게요.
        </p>
      </div>
    </div>
  );
};

export default EmptyProduct;
