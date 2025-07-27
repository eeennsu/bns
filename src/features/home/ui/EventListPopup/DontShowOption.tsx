import { FC } from 'react';

import { Checkbox } from '@shadcn-ui/ui';

interface Props {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onHideEvent: () => void;
}

const DontShowOption: FC<Props> = ({ checked, onCheckedChange, onHideEvent }) => {
  const handleCheckedChange = (checked: boolean) => {
    onCheckedChange(checked);
    if (checked === true) onHideEvent();
  };

  return (
    <label className='flex w-fit cursor-pointer items-center gap-2 bg-white'>
      <Checkbox
        checked={checked}
        onCheckedChange={handleCheckedChange}
        className='cursor-pointer border-gray-400 data-[state=checked]:border-gray-600 data-[state=checked]:bg-[#a87c50] data-[state=checked]:text-white'
      />
      <span className='text-gray-80 cursor-pointer text-xs'>3일간 보지 않기</span>
    </label>
  );
};

export default DontShowOption;
