import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@shadcn-ui/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        ivory: 'bg-ivory shadow-xs text-wood hover:bg-wood hover:text-ivory border-2 border-wood',
        wood: 'bg-wood shadow-xs text-ivory hover:bg-wood/90',
        sage: 'bg-[#9CAF88] text-white shadow-xs hover:bg-[#9CAF88]/90',
        lavender: 'bg-[#E6E6FA] text-[#483D8B] shadow-xs hover:bg-[#E6E6FA]/90',
        peach: 'bg-[#FFDAB9] text-[#8B4513] shadow-xs hover:bg-[#FFDAB9]/90',
        mint: 'bg-[#98FF98] text-[#006400] shadow-xs hover:bg-[#98FF98]/90',
        sageOutline:
          'bg-white text-[#9CAF88] shadow-xs hover:bg-[#9CAF88] hover:text-white border-2 border-[#9CAF88]',
        lavenderOutline:
          'bg-white text-[#483D8B] shadow-xs hover:bg-[#E6E6FA] hover:text-[#483D8B] border-2 border-[#483D8B]',
        peachOutline:
          'bg-white text-[#8B4513] shadow-xs hover:bg-[#FFDAB9] hover:text-[#8B4513] border-2 border-[#8B4513]',
        mintOutline:
          'bg-white text-[#006400] shadow-xs hover:bg-[#98FF98] hover:text-[#006400] border-2 border-[#006400]',
        navy: 'bg-[#000080] text-white shadow-xs hover:bg-[#000080]/90',
        wine: 'bg-[#722F37] text-white shadow-xs hover:bg-[#722F37]/90',
        forest: 'bg-[#228B22] text-white shadow-xs hover:bg-[#228B22]/90',
        plum: 'bg-[#673147] text-white shadow-xs hover:bg-[#673147]/90',
        sunset:
          'bg-gradient-to-r from-[#FF8C00] to-[#FF4500] text-white shadow-xs hover:opacity-90',
        ocean: 'bg-gradient-to-r from-[#4682B4] to-[#00CED1] text-white shadow-xs hover:opacity-90',
        meadow:
          'bg-gradient-to-r from-[#90EE90] to-[#3CB371] text-white shadow-xs hover:opacity-90',
        berry: 'bg-gradient-to-r from-[#C71585] to-[#FF69B4] text-white shadow-xs hover:opacity-90',
        modern: 'bg-black/80 text-white hover:bg-black/70',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        xl: 'h-12 rounded-md px-8 has-[>svg]:px-6 text-lg',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

type ButtonProps = React.ComponentProps<typeof Button>;

export { Button, buttonVariants, type ButtonProps };
