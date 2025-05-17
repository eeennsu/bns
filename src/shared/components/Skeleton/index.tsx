import type { FC } from 'react';

import { cn } from '@shadcn-ui/utils';

interface IProps {
  shape?: 'square' | 'circle';
  className?: string;
}

const Skeleton: FC<IProps> = ({ shape = 'square', className }) => {
  return (
    <div
      className={cn(
        'block h-[1em] w-full animate-pulse bg-gray-200',
        shape === 'circle' ? 'rounded-full' : 'rounded',
        className,
      )}
    />
  );
};

export default Skeleton;
