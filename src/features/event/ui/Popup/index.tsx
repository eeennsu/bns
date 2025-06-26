import { ScrollArea } from '@shared/shadcn-ui/ui/scroll-area';
import dayjs from 'dayjs';
import { CalendarDays } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

interface EventPopupProps {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
}

const EventPopup: FC<EventPopupProps> = ({ title, description, startDate, endDate, image }) => {
  const dateFormat = (date: string) => {
    return dayjs(date).format('YYYY년 MM월 DD일 ddd');
  };

  return (
    <div className='flex flex-col gap-1.5 p-4 text-[#2f2f2f]'>
      <figure className='relative flex max-h-[350px] w-full flex-1 overflow-hidden rounded-xl shadow-sm'>
        <Image
          src={image}
          alt={title}
          fill
          className='w-full object-cover transition-transform duration-300 hover:scale-[1.02]'
        />
        <div className='absolute right-0 bottom-0 flex items-center gap-2 rounded-tl-md bg-black/50 px-3 py-2 text-xs tracking-wide text-white backdrop-blur-sm'>
          <CalendarDays className='size-4' />
          진행 기간
          <span>
            {dateFormat(startDate)} ~ {dateFormat(endDate)}
          </span>
        </div>
      </figure>

      <h3 className='mt-3 text-xl leading-tight font-semibold tracking-tight text-gray-900'>
        {title}
      </h3>

      <ScrollArea className='h-fit max-h-[100px] rounded-lg px-3 text-sm leading-relaxed text-gray-700'>
        {description}
      </ScrollArea>
    </div>
  );
};

export default EventPopup;
