import { Badge } from '@shared/shadcn-ui/ui';
import type { FC } from 'react';

interface IProps {
  ingredients: string[];
}

const Ingredients: FC<IProps> = ({ ingredients }) => {
  if (ingredients.length === 0) return null; // 재료 없으면 안 보이게

  return (
    <section aria-label='재료 목록' className='flex flex-col gap-3'>
      <p className='text-sm font-medium text-gray-500 uppercase select-none'>재료 목록</p>
      <div className='flex flex-wrap gap-3'>
        {ingredients.map((ingredient, index) => (
          <Badge
            key={index}
            className='rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-200'
            variant='secondary'
          >
            {ingredient}
          </Badge>
        ))}
      </div>
    </section>
  );
};

export default Ingredients;
