import { startOfToday } from 'date-fns';
import type { FC } from 'react';
import { DateRange } from 'react-day-picker';
import { ControllerRenderProps } from 'react-hook-form';

import { FormControl, FormItem, FormLabel } from '@shadcn-ui/ui';

import DatePickerWithRange from '@components/DatePickerWithRange';
import FormMessageNestedField from '@components/FormMessageNestedFiled';

interface IProps {
  label?: string;
  field: ControllerRenderProps<any, 'dateRange'>;
  isRequired?: boolean;
  mode?: 'all' | 'future';
}

const SharedDatePickerFormFieldRender: FC<IProps> = ({
  label,
  isRequired,
  field,
  mode = 'all',
}) => {
  return (
    <FormItem>
      {label ? (
        <FormLabel className='gap-0.5'>
          {label}
          {isRequired ? <strong className='required'>*</strong> : ''}
        </FormLabel>
      ) : null}
      <FormControl>
        <DatePickerWithRange
          selected={field.value as DateRange}
          onDateChange={dateRange => field.onChange(dateRange)}
          calendarDisabled={
            mode === 'future' && {
              before: startOfToday(),
            }
          }
        />
      </FormControl>

      <FormMessageNestedField paths={['from', 'to', 'root']} />
    </FormItem>
  );
};

export default SharedDatePickerFormFieldRender;
