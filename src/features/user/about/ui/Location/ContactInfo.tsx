import type { FC, ReactNode } from 'react';

interface IProps {
  icon: ReactNode;
  text: string | ReactNode;
}

const ContactInfo: FC<IProps> = ({ icon, text }) => {
  return (
    <div className='text-wood/85 flex items-center gap-3.5'>
      <span className='text-wood size-5'>{icon}</span>
      <p>{text}</p>
    </div>
  );
};

export default ContactInfo;
