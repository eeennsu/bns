import type { ButtonHTMLAttributes, FC } from 'react';

import { cn } from '@shadcn-ui/utils';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const DotButton: FC<IProps> = ({className, ...props }) => {
  return (
    <button
      className={cn(
        'h-2 w-2 cursor-pointer rounded-full transition sm:h-2.5 sm:w-2.5',
        className,
      )}
      {...props}
    />
  );
};

export default DotButton;

