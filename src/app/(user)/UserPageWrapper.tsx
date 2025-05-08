import type { FC, ReactNode } from 'react';

import { cn } from '@shadcn-ui/utils';

interface IProps {
  children: ReactNode;
  className?: string;
}

const UserPageWrapper: FC<IProps> = ({ children, className }) => {
  return (
    <main
      className={cn(
        'from-ivory container h-full bg-gradient-to-br to-[#E8D0A9] py-12 lg:py-26',
        className,
      )}
    >
      {children}
    </main>
  );
};

export default UserPageWrapper;
