import { cn } from '@shared/shadcn-ui/utils';
import type { FC, PropsWithChildren } from 'react';

interface IProps {
  className?: string;
}

const SectionContainer: FC<PropsWithChildren<IProps>> = ({ className, children }) => {
  return (
    <section
      className={cn('relative mx-auto flex w-full max-w-[1500px] items-center px-36', className)}
    >
      {children}
    </section>
  );
};

export default SectionContainer;
