import { cn } from '@shared/shadcn-ui/utils';
import { FC } from 'react';

import { MBTI_MAP } from '@entities/bread/consts';

interface Props {
  mbti: string;
}

const Mbti: FC<Props> = ({ mbti }) => {
  if (!mbti || mbti.length !== 4) return null;

  return (
    <div className='flex flex-col gap-1.5'>
      <h3 className='flex items-center text-sm font-semibold tracking-wider text-gray-500 uppercase'>
        어떤 성격인가요?
      </h3>

      <div className='flex flex-col gap-5 rounded-lg border border-gray-200 bg-white p-5'>
        {MBTI_MAP.map((pair, index) => {
          const isRightAligned = mbti.includes(pair.right.type);

          return (
            <div key={index} className='flex items-center justify-between'>
              <span
                className={cn(
                  'flex items-center gap-3 text-sm transition-colors',
                  isRightAligned ? 'text-gray-500' : 'font-semibold text-black',
                )}
              >
                <span
                  className={cn(
                    'inline-flex size-6 items-center justify-center rounded-full border text-xs transition-all duration-200',
                    !isRightAligned
                      ? 'scale-105 border-gray-900 bg-gray-900 text-white shadow-sm'
                      : 'border-gray-300 text-gray-500',
                  )}
                >
                  {pair.left.type}
                </span>
                {pair.left.name}
              </span>

              <span
                className={cn(
                  'flex items-center gap-3 text-sm transition-colors',
                  isRightAligned ? 'font-semibold text-black' : 'text-gray-500',
                )}
              >
                <span
                  className={cn(
                    'inline-flex size-6 items-center justify-center rounded-full border text-xs transition-all duration-200',
                    isRightAligned
                      ? 'scale-105 border-gray-900 bg-gray-900 text-white shadow-sm'
                      : 'border-gray-300 text-gray-500',
                  )}
                >
                  {pair.right.type}
                </span>
                {pair.right.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mbti;
