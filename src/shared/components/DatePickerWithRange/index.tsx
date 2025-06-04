'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FC, HTMLAttributes, useState } from 'react';
import { DateRange, Matcher, SelectRangeEventHandler } from 'react-day-picker';

import { Button } from '@shadcn-ui/ui';
import { Calendar } from '@shadcn-ui/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn-ui/ui/popover';
import { cn } from '@shadcn-ui/utils';

type IProps = HTMLAttributes<HTMLDivElement> & {
  onDateChange?: SelectRangeEventHandler;
  selected?: DateRange;
  buttonClassName?: string;
  calendarDisabled?: Matcher | Matcher[];
};

const DatePickerWithRange: FC<IProps> = ({
  onDateChange,
  selected,
  className,
  buttonClassName,
  calendarDisabled,
  ...props
}) => {
  const [internalDate, setInternalDate] = useState<DateRange | undefined>(selected);

  const date = selected ?? internalDate;

  const handleDateChange: SelectRangeEventHandler = (range, ...args) => {
    if (!selected) {
      setInternalDate(range);
    }

    if (onDateChange) {
      onDateChange(range, ...args);
    }
  };

  return (
    <div className={cn('grid gap-2', className)} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[240px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              buttonClassName,
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'yyyy. MM. dd')}&nbsp; ~ &nbsp;
                  {format(date.to, 'yyyy. MM. dd')}
                </>
              ) : (
                format(date.from, 'yyyy. MM. dd')
              )
            ) : (
              <span className='text-xs text-slate-400'>기간을 선택해주세요.</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='range'
            defaultMonth={date?.from}
            selected={selected}
            onSelect={handleDateChange}
            disabled={calendarDisabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerWithRange;
