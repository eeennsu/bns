import { CircleHelp } from 'lucide-react';
import type { FC, ReactNode } from 'react';

import { Tooltip as ShadcnTooltip, TooltipContent, TooltipTrigger } from '@shadcn-ui/ui';

interface IProps {
  description: ReactNode;
  contentClassName?: string;
}

const Tooltip: FC<IProps> = ({ contentClassName, description }) => {
  return (
    <ShadcnTooltip>
      <TooltipTrigger>
        <CircleHelp />
      </TooltipTrigger>
      <TooltipContent className={contentClassName}>{description}</TooltipContent>
    </ShadcnTooltip>
  );
};

export default Tooltip;
