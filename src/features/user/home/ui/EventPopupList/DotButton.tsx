import type { ButtonHTMLAttributes, FC } from 'react';

import { cn } from '@shadcn-ui/utils';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const DotButton: FC<IProps> = ({ className, ...props }) => {
  return (
    <button
      className={cn(
        'size-3 cursor-pointer rounded-full transition sm:size-2 sm:h-2.5 sm:w-2.5',
        className,
      )}
      {...props}
    />
  );
};

export default DotButton;
