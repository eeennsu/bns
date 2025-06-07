'use client';

import { CircleHelp } from 'lucide-react';
import type { FC, ReactNode } from 'react';

import { Tooltip as ShadcnTooltip, TooltipContent, TooltipTrigger } from '@shadcn-ui/ui';

interface IProps {
  description: ReactNode;
  contentClassName?: string;
  icon?: ReactNode;
}

const Tooltip: FC<IProps> = ({ contentClassName, description, icon }) => {
  return (
    <ShadcnTooltip>
      <TooltipTrigger asChild>
        {icon || (
          <CircleHelp
            size={16}
            className='text-muted-foreground hover:text-foreground ml-1 transition-colors'
          />
        )}
      </TooltipTrigger>
      <TooltipContent className={contentClassName}>{description}</TooltipContent>
    </ShadcnTooltip>
  );
};

export default Tooltip;
