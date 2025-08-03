import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { dateFormat } from '@shared/libs/date';
import UtilLocalImage from '@shared/utils/utilImage';
import dayjs from 'dayjs';
import { CalendarDays } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

import { IEvent } from '@entities/event/types';

import EmptyProduct from './EmptyProduct';
import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';

interface IProps {
  events: Partial<IEvent>[];
}

const EventSection: FC<IProps> = ({ events }) => {
  return (
    <SectionContainer>
      <div className='flex h-full w-full items-center gap-40'>
        <div className='flex flex-col gap-16'>
          <SectionTitle title='EVENT' />

          <Image src={UtilLocalImage.SVGS.GIFT} alt='background texture' width={430} height={430} />
        </div>

        {events.length === 0 ? (
          <EmptyProduct />
        ) : (
          <div className='divide-border flex grow flex-col divide-y bg-white'>
            {events?.map(event => (
              <EventItem key={`event-${event.id}`} event={event} />
            ))}
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default EventSection;

interface IEventItemProps {
  event: Partial<IEvent>;
}

const EventItem: FC<IEventItemProps> = ({ event }) => {
  return (
    <Link
      href={MAIN_PATHS.event.detail({ slug: event.id })}
      className='group relative flex items-start justify-between gap-4 overflow-hidden p-6'
    >
      <div className='absolute inset-0 z-0 origin-left scale-x-0 bg-slate-700 transition-transform duration-300 ease-out group-hover:scale-x-100' />

      <div className='relative z-10 flex grow flex-col gap-1'>
        <h3 className='text-foreground text-base font-semibold transition-colors duration-150 group-hover:text-white'>
          {event.name}
        </h3>
        <p className='text-muted-foreground text-sm transition-colors duration-150 group-hover:text-white'>
          {event.shortDescription}
        </p>
      </div>

      <div className='relative z-10 flex min-w-[160px] flex-col items-end text-right'>
        <div className='text-muted-foreground flex items-center gap-1 text-xs transition-colors duration-150 group-hover:text-white'>
          <CalendarDays className='size-4' />
          <span>
            {dateFormat(event.startDate)} ~ {dateFormat(event.endDate)}
          </span>
        </div>
        <p className='mt-1 text-xs font-medium text-red-500'>
          D-{dayjs(event.endDate).diff(dayjs(), 'day')}
        </p>
      </div>
    </Link>
  );
};
