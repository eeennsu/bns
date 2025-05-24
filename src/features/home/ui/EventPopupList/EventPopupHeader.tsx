import { Gift } from 'lucide-react';
import { FC } from 'react';

const EventPopupHeader: FC = () => {
  return (
    <div className='rounded-t-lg bg-gradient-to-r from-[#d4a373] to-[#a87c50] px-4 py-3 text-center text-white sm:p-4'>
      <div className='mb-1 flex justify-center sm:mb-2'>
        <Gift className='size-8 sm:size-10' />
      </div>
      <h2 className='text-lg font-bold sm:text-xl'>특별 이벤트</h2>
    </div>
  );
};

export default EventPopupHeader;
