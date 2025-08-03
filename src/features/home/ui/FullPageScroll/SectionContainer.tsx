import { cn } from '@shared/shadcn-ui/utils';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

interface IProps extends ComponentProps<'section'> {}

const SectionContainer: FC<PropsWithChildren<IProps>> = ({ className, children, ...props }) => {
  return (
    <section
      className={cn('relative mx-auto flex w-full max-w-[1500px] items-center px-36', className)}
      {...props}
    >
      {children}
    </section>
  );
};

export default SectionContainer;
