import type { FC, ReactNode } from 'react';

interface IProps {
  icon: ReactNode;
  title: string;
  description: string | ReactNode;
}

const TransportInfo: FC<IProps> = ({ icon, title, description }) => {
  return (
    <div className='space-y-2 rounded-lg bg-white/60 px-4 py-3'>
      <div className='flex items-center gap-3 text-black/80'>
        <span className='size-5'>{icon}</span>
        <h4 className='text-[17px] font-semibold'>{title}</h4>
      </div>
      <div className='pl-7 text-[15px] leading-relaxed text-black/70'>{description}</div>
    </div>
  );
};

export default TransportInfo;
