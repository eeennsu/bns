import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { Button, FormControl, FormItem, FormLabel, FormMessage } from '@shadcn-ui/ui';
import { Calendar } from '@shadcn-ui/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn-ui/ui/popover';
import { cn } from '@shadcn-ui/utils';

import Tooltip from '@components/Tooltip';

interface IProps<TName extends string> {
  field: ControllerRenderProps<any, TName>;
  label?: string;
  isRequired?: boolean;
  tooltip?: ReactNode;
}

const SharedDatePickerFormFieldRender = <TName extends string>({
  field,
  label,
  isRequired,
  tooltip,
  ...restProps
}: IProps<TName>) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  return (
    <FormItem className='flex flex-col items-start gap-2 py-2'>
      {label ? (
        <FormLabel className='gap-0.5'>
          {label}
          {isRequired ? <strong className='required'>*</strong> : ''}
          {tooltip ? <Tooltip content={tooltip} triggerClassName='ml-1' /> : null}
        </FormLabel>
      ) : null}
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <FormControl>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !field.value && 'text-muted-foreground',
              )}
            >
              {field.value ? (
                <>
                  <CalendarIcon size={12} className='text-black' />
                  {format(field.value, 'yyyy-MM-dd (EEE)', { locale: ko })}
                </>
              ) : (
                <>
                  <CalendarIcon size={12} className='text-slate-400' />
                  <span className='text-xs text-slate-400'>날짜를 선택해주세요.</span>
                </>
              )}
            </Button>
          </PopoverTrigger>
        </FormControl>
        <FormMessage className='text-xs' />
        <PopoverContent className='w-auto p-0'>
          <Calendar
            mode='single'
            {...restProps}
            defaultMonth={field.value}
            selected={field.value}
            onSelect={e => {
              field.onChange(e);
              setIsCalendarOpen(false);
            }}
            initialFocus
            locale={ko}
          />
        </PopoverContent>
      </Popover>
    </FormItem>
  );
};

export default SharedDatePickerFormFieldRender;
