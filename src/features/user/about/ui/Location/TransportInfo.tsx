import type { FC, ReactNode } from 'react';

interface IProps {
  icon: ReactNode;
  title: string;
  description: string | ReactNode;
}

const TransportInfo: FC<IProps> = ({ icon, title, description }) => {
  return (
    <div className='bg-ivory rounded-lg p-4 shadow-sm'>
      <div className='mb-2 flex items-center'>
        <span className='text-wood mr-2 h-5 w-5'>{icon}</span>
        <h4 className='text-wood font-bold'>{title}</h4>
      </div>
      <p className='text-wood/85'>{description}</p>
    </div>
  );
};

export default TransportInfo;