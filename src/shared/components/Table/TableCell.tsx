import type { ComponentProps, FC, PropsWithChildren } from 'react';

import { TableCell as ShadcnTd } from '@shadcn-ui/ui';
import { cn } from '@shadcn-ui/utils';

interface IProps extends ComponentProps<typeof ShadcnTd> {
  isStopPropagation?: boolean;
}

const TableCell: FC<PropsWithChildren<IProps>> = ({
  children,
  isStopPropagation,
  className,
  ...props
}) => {
  return (
    <ShadcnTd
      className={cn(
        'max-w-20 px-5 py-3.5 text-sm break-words whitespace-normal text-gray-800',
        className,
      )}
      onClick={isStopPropagation ? e => e.stopPropagation() : undefined}
      {...props}
    >
      {children}
    </ShadcnTd>
  );
};

export default TableCell;
