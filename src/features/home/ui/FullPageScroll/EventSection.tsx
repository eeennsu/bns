import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { dateFormat } from '@shared/libs/date';
import UtilLocalImage from '@shared/utils/utilImage';
import dayjs from 'dayjs';
import { CalendarDays, MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

import { IEventItem } from '@entities/event/types';
import { ISummaryEvent } from '@entities/home/types';

import EmptyProduct from './EmptyProduct';
import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';

interface IProps {
  events: ISummaryEvent[];
  total: number;
}

const EventSection: FC<IProps> = ({ events, total }) => {
  const others = total - events.length;

  return (
    <SectionContainer id='event-list'>
      <div className='flex h-full w-full flex-col justify-center gap-16 lg:h-auto lg:flex-row lg:justify-start'>
        <div className='flex flex-col gap-8 lg:gap-16'>
          <SectionTitle title='EVENT' />

          <figure className='relative size-[180px] max-lg:flex max-lg:w-full max-lg:justify-center lg:size-[430px]'>
            <Image src={UtilLocalImage.SVGS.GIFT} alt='event illustration' fill />
          </figure>
        </div>

        <div className='flex w-full flex-col gap-4'>
          {events.length === 0 ? (
            <EmptyProduct />
          ) : (
            <div className='divide-border flex flex-col divide-y bg-white lg:grow lg:justify-center'>
              {events?.map(event => (
                <EventItem key={`event-${event.id}`} event={event} />
              ))}

              {others > 0 && (
                <Link
                  href={MAIN_PATHS.event.list()}
                  className='text-muted-foreground mt-4 inline-flex items-center justify-end gap-1 text-sm font-medium hover:text-black hover:underline'
                >
                  외에도 {others}개의 이벤트가 더 있어요
                  <MoveRight className='size-3' />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
};

export default EventSection;

interface IEventItemProps {
  event: Partial<IEventItem>;
}

const EventItem: FC<IEventItemProps> = ({ event }) => {
  const remainDay = dayjs(event.endDate).diff(dayjs(), 'day');

  return (
    <Link
      href={MAIN_PATHS.event.detail({ slug: event.id })}
      className='group relative flex items-start justify-between gap-4 overflow-hidden p-6'
    >
      <div className='absolute inset-0 z-0 origin-left scale-x-0 bg-black/80 transition-transform duration-300 ease-out group-hover:scale-x-100' />

      <div className='relative z-10 flex grow flex-col gap-1'>
        <h3 className='text-foreground text-base font-semibold transition-colors duration-150 group-hover:text-white'>
          {event.name}
        </h3>
        <p className='text-muted-foreground text-sm transition-colors duration-150 group-hover:text-white'>
          {event.shortDescription}
        </p>
      </div>

      <div className='relative z-10 flex min-w-[160px] flex-col items-end gap-1 text-right'>
        <div className='text-muted-foreground flex items-center gap-1 text-xs transition-colors duration-150 group-hover:text-white'>
          <CalendarDays className='size-4' />
          <span>
            {dateFormat(event.startDate)} ~ {dateFormat(event.endDate)}
          </span>
        </div>

        {remainDay === 0 ? (
          <p className='animate-caret-blink text-xs font-bold text-red-500'>D - Day</p>
        ) : (
          <p className='text-xs font-medium text-red-500'>D - {remainDay}</p>
        )}
      </div>
    </Link>
  );
};
