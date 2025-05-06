import type { FC } from 'react';

interface IProps {
  title: string;
  description: string;
}

const StoryCard: FC<IProps> = ({ title, description }) => {
  return (
    <div className='bg-ivory/80 rounded-lg p-6'>
      <h3 className='text-wood mb-2 text-xl font-bold'>{title}</h3>
      <p className='text-wood/85'>{description}</p>
    </div>
  );
};

export default StoryCard;