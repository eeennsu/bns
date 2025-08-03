import type { FC } from 'react';

interface IProps {
  title: string;
}

const SectionTitle: FC<IProps> = ({ title }) => {
  return (
    <div className='flex items-end gap-3'>
      <h2 className='font-montserrat text-7xl font-[800]'>{title}</h2>
      <div className='bg-wood mb-2 size-4' />
    </div>
  );
};

export default SectionTitle;
