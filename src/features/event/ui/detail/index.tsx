import { dateFormat } from '@shared/libs/date';
import { ProductData } from '@shared/typings/commons';
import UtilLocalImage from '@shared/utils/utilImage';
import dayjs from 'dayjs';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { IEvent } from '@entities/event/types';

import EventLongDescription from './DynamicEventLongDescription';

interface IProps {
  event: ProductData<IEvent>;
}

const EventDetail: FC<IProps> = ({ event }) => {
  const { name, startDate, endDate, longDescription, image } = event;
  const isUpcoming = dayjs().isBefore(startDate);
  const status = isUpcoming ? '예정' : '진행 중';
  const statusStyle = isUpcoming ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800';

  return (
    <div className='lg:pt- flex flex-col gap-4 px-4 pt-4 pb-10 lg:px-0 lg:pt-0'>
      <Link
        href='/event'
        className='text-muted-foreground hidden items-center gap-1 text-sm transition-colors hover:text-black lg:inline-flex'
      >
        <ArrowLeft className='size-4' />
        이벤트 목록으로
      </Link>

      <figure className='relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100'>
        <Image src={image || UtilLocalImage.SVGS.GIFT} alt={name} fill className='object-cover' />
      </figure>

      <div className='mt-5 flex flex-col gap-6'>
        <h1 className='text-xl font-bold tracking-tight text-black lg:text-3xl'>{name}</h1>

        <div className='text-muted-foreground flex flex-wrap items-center gap-2 text-sm lg:text-base'>
          <div className='flex items-center gap-1.5'>
            <CalendarDays className='size-4' />
            <span>
              {dateFormat(startDate)} ~ {dateFormat(endDate)}
            </span>
          </div>

          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle}`}>
            {status}
          </span>
        </div>
      </div>

      <EventLongDescription description={longDescription} />
    </div>
  );
};

export default EventDetail;
