import Link from 'next/link';
import type { AnchorHTMLAttributes, ComponentProps, FC, PropsWithChildren } from 'react';

import { Button } from '@shadcn-ui/ui';
import { cn } from '@shadcn-ui/utils';

interface IProps extends ComponentProps<typeof Button> {
  href: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
}

const LinkButton: FC<PropsWithChildren<IProps>> = ({
  children,
  target,
  href,
  size,
  variant,
  className,
  rel,
  ...buttonProps
}) => {
  return (
    <Link href={href} target={target} rel={rel} className='w-fit'>
      <Button
        size={size || 'xl'}
        variant={variant || 'modern'}
        className={cn('gap-1.5 px-8 py-3 font-medium shadow-md', className)}
        {...buttonProps}
      >
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
