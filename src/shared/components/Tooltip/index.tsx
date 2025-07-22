import type { TooltipProps } from '@radix-ui/react-tooltip';
import { HelpCircle } from 'lucide-react';
import { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react';

import {
  TooltipProvider,
  Tooltip as ShadcnTooltip,
  TooltipTrigger,
  TooltipContent,
} from '@shadcn-ui/ui/tooltip';
import { cn } from '@shadcn-ui/utils';

interface IProps extends TooltipProps {
  content: ReactNode;
  contentProps?: ComponentProps<typeof TooltipContent>;
  triggerClassName?: string;
}

const Tooltip: FC<PropsWithChildren<IProps>> = ({
  children,
  content,
  delayDuration = 200,
  contentProps,
  triggerClassName,
  ...tooltipProps
}) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <ShadcnTooltip {...tooltipProps}>
        <TooltipTrigger asChild className={triggerClassName}>
          {children || <HelpCircle className='text-gray-400' size={12} />}
        </TooltipTrigger>
        <TooltipContent
          {...contentProps}
          className={cn(
            'rounded-md border-0 bg-slate-600 px-3 py-2.5 text-xs font-normal text-white',
            contentProps?.className,
          )}
        >
          {content}
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
};

export default Tooltip;
