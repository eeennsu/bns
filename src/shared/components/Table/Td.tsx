import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@shadcn-ui/utils';

interface IProps extends HTMLAttributes<HTMLTableCellElement> {
  isStopPropagation?: boolean;
}

const Td: FC<PropsWithChildren<IProps>> = ({
  children,
  isStopPropagation,
  className,
  ...props
}) => {
  return (
    <td
      className={cn('max-w-20 px-4 py-3 text-center text-sm break-words', className)}
      onClick={isStopPropagation ? e => e.stopPropagation() : undefined}
      {...props}
    >
      {children}
    </td>
  );
};

export default Td;
