import type { FC, PropsWithChildren } from 'react';

import { cn } from '@shadcn-ui/utils';

interface IProps {
  className?: string;
}
const BottomRightWrapper: FC<PropsWithChildren<IProps>> = ({ children, className }) => {
  return <div className={cn('flex flex-1 items-end justify-end', className)}>{children}</div>;
};

export default BottomRightWrapper;
