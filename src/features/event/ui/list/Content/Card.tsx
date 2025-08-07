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
      <div className='flex items-center gap-7'>
        <span className='text-sm font-bold text-gray-600'>{index}</span>
        <span className='text-lg font-semibold text-black/80'>{event.name}</span>
      </div>
      <div className='text-right text-black/70'>
        <span className='mr-1 hidden text-xs sm:inline-block'>진행 기간 : </span>
        <span className='text-xs font-medium text-black lg:text-base'>
          {dateFormat(event.startDate)} ~ {dateFormat(event.endDate)}
        </span>
      </div>
    </Link>
  );
};

export default EventCard;
