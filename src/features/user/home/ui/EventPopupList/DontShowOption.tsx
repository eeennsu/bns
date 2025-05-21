import { FC } from 'react';

import { Checkbox } from '@shadcn-ui/ui/checkbox';

interface Props {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const DontShowOption: FC<Props> = ({ checked, onCheckedChange }) => {
  return (
    <label className='flex w-fit cursor-pointer items-center gap-2'>
      <Checkbox
        checked={checked}
        onCheckedChange={checked => onCheckedChange(checked === true)}
        className='cursor-pointer border-[#a87c50] data-[state=checked]:bg-[#a87c50] data-[state=checked]:text-white'
      />
      <span className='cursor-pointer text-xs text-[#6c6055] sm:text-sm'>3일간 보지 않기</span>
    </label>
  );
};

export default DontShowOption;
