import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { dateFormat } from '@shared/libs/date';
import { ProductData } from '@shared/typings/commons';
import Link from 'next/link';
import { FC } from 'react';

import { IEvent } from '@entities/event/types';

interface IProps {
  event: ProductData<IEvent>;
  index: number;
}

const EventCard: FC<IProps> = ({ event, index }) => {
  return (
    <Link
      href={MAIN_PATHS.event.detail({ slug: event.id })}
      className='flex flex-col gap-1 p-5 transition-colors hover:bg-gray-100 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:p-8'
    >
      <div className='flex items-center gap-4 lg:gap-7'>
        <span className='text-sm font-bold text-gray-600'>{index}</span>
        <p className='line-clamp-3 text-base font-medium text-ellipsis text-black/80 lg:text-lg'>
          {event.name}
        </p>
      </div>

      <div className='self-end text-black/70 lg:self-auto'>
        <span className='mr-1 hidden text-xs sm:inline-block'>진행 기간 : </span>
        <span className='text-xs font-medium text-black lg:text-base'>
          {dateFormat(event.startDate)} ~ {dateFormat(event.endDate)}
        </span>
      </div>
    </Link>
  );
};

export default EventCard;
