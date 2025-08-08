import type { FC } from 'react';

interface IProps {
  title: string;
}

const SectionTitle: FC<IProps> = ({ title }) => {
  return (
    <div className='flex items-end gap-3'>
      <h2 className='font-montserrat text-5xl font-[800] lg:text-left lg:text-7xl'>{title}</h2>
      <div className='bg-wood mb-1.5 hidden size-3 lg:mb-2 lg:block lg:size-4' />
    </div>
  );
};

export default SectionTitle;
