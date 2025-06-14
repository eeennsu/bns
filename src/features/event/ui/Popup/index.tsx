'use client';

import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';
import { FC } from 'react';

interface IProps {
  title: string;
  description: string;
  image?: string | null;
  startDate: string;
  endDate: string;
}

const EventPopup: FC<IProps> = ({ title, description, startDate, endDate }) => {
  return (
    <>
      <div className='mb-2 flex items-center gap-2 sm:mb-3'>
        <Calendar className='h-4 w-4 text-[#a87c50]' />
        <span className='text-xs text-[#6c6055]'>
          {dayjs(startDate).format('YYYY.MM.DD')} ~ {dayjs(endDate).format('YYYY.MM.DD')}
        </span>
      </div>

      <h3 className='mb-2 text-lg font-bold text-[#5e503f] sm:mb-3 sm:text-xl'>{title}</h3>
      <p className='rounded-md bg-[#f0e9df] p-3 text-sm text-[#6c6055] sm:text-base'>
        {description}
      </p>
    </>
  );
};

export default EventPopup;
