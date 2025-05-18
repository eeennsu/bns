import { cva, VariantProps } from 'class-variance-authority';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

const badgeVariants = cva('rounded px-2 py-1 text-[10px] font-bold text-[#FFFFF0] sm:text-xs', {
  variants: {
    variant: {
      default: 'bg-[#1f1c1c]',
      signature: 'bg-[#8B4513]',
      new: 'bg-[#E74C3C]',
    },
  },
  defaultVariants: {
    variant: 'default',
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
