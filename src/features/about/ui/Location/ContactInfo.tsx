import type { FC, ReactNode } from 'react';

interface IProps {
  icon: ReactNode;
  text: string | ReactNode;
}

const ContactInfo: FC<IProps> = ({ icon, text }) => {
  return (
    <div className='flex items-center gap-3.5 text-black/80'>
      <span className='size-5 text-black/60'>{icon}</span>
      <span className='mt-[2px] text-sm sm:text-base'>{text}</span>
    </div>
  );
};

export default ContactInfo;
