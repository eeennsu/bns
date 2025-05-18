import { FC } from 'react';

import { Checkbox } from '@shadcn-ui/ui/checkbox';

interface Props {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const DontShowOption: FC<Props> = ({ checked, onCheckedChange }) => {
  return (
    <div className='flex items-center gap-2'>
      <Checkbox
        id='dontShow'
        checked={checked}
        onCheckedChange={checked => onCheckedChange(checked === true)}
        className='border-[#a87c50] data-[state=checked]:bg-[#a87c50] data-[state=checked]:text-white'
      />
      <label htmlFor='dontShow' className='cursor-pointer text-xs text-[#6c6055] sm:text-sm'>
        3일간 보지 않기
      </label>
    </div>
  );
};

export default DontShowOption;
