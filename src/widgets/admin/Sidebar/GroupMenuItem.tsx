import { Pin } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import { IAdminMenuRoute } from '@typings/commons';
import { cn } from '@shadcn-ui/utils';

interface IProps {
  isActive: boolean;
  group: IAdminMenuRoute[];
}

const GroupMenuItem: FC<IProps> = ({ isActive, group }) => {
  const pathname = usePathname();

  return (
    <div className='space-y-1'>
      <Link
        href={group[0]?.path || ''} 
        className={cn(
          'flex items-center justify-between rounded-md px-2.5 py-1.5 text-[14px] font-medium transition-colors',
          isActive ? 'bg-sky-100/80 text-sky-700' : 'text-neutral-700 hover:bg-neutral-100',
        )}
      >
        {group[0].menuName}
        <Pin className='ml-1 size-3.5' color={isActive ? 'skyblue' : 'lightgray'} />
      </Link>

      <div className='flex flex-col gap-0.5 pl-3'>
        {group
          .filter(item => item.order === 1)
          .map(item => {
            const isSubActive = pathname === item.path.split('?')[0];
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  'rounded-md px-2 py-1 text-[13px] transition-colors',
                  isSubActive
                    ? 'bg-sky-100/80 text-sky-700'
                    : 'text-neutral-600 hover:bg-neutral-100',
                )}
              >
                {item.menuName}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default GroupMenuItem;
