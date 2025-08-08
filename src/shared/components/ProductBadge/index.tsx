import { cva, VariantProps } from 'class-variance-authority';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

const badgeVariants = cva('rounded-md px-2.5 py-1 text-[11px] font-bold text-ivory sm:text-xs', {
  variants: {
    variant: {
      signature: 'bg-slate-900',
      new: 'bg-rose-500',
    },
  },
});

interface IProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

const ProductBadge: FC<PropsWithChildren<IProps>> = ({
  variant,
  className,
  children,
  ...props
}) => {
  return (
    <div className={badgeVariants({ variant, className })} {...props}>
      {children}
    </div>
  );
};

export default ProductBadge;
