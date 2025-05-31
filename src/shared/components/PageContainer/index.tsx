import type { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@shadcn-ui/utils';

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const PageContainer = ({ className, children, ...props }: PropsWithChildren<IProps>) => {
  return (
    <div className={cn('flex flex-col rounded-lg bg-white p-7', className)} {...props}>
      {children}
    </div>
  );
};

export default PageContainer;
