// import { format } from 'date-fns';
// import { ko } from 'date-fns/locale';
// import { Calendar as CalendarIcon } from 'lucide-react';
// import { ControllerRenderProps } from 'react-hook-form';

// import { Button, FormControl, FormItem, FormLabel } from '@shadcn-ui/ui';
// import { Calendar } from '@shadcn-ui/ui/calendar';
// import { Popover, PopoverContent, PopoverTrigger } from '@shadcn-ui/ui/popover';
// import { cn } from '@shadcn-ui/utils';

// import { DatePick } from './utils/datePick';

// interface IProps<TName extends string> {
//   field: ControllerRenderProps<any, TName>;
//   label?: string;
//   isRequired?: boolean;
// }

// const SharedDatePickerFormFieldRender = <TName extends string>({
//   field,
//   label,
//   isRequired,
//   ...restProps
// }: IProps<TName>) => {
//   return (
//     <FormItem className='flex flex-col items-start gap-2 py-2'>
//       {label ? (
//         <FormLabel className='!mt-0'>
//           {label} {isRequired ? <strong className='required'>*</strong> : ''}
//         </FormLabel>
//       ) : null}
//       <Popover>
//         <FormControl>
//           <PopoverTrigger asChild>
//             <Button
//               data-testid={`${field.name}-date-picker`}
//               variant='outline'
//               className={cn(
//                 'w-[280px] justify-start text-left font-normal',
//                 !field.value && 'text-muted-foreground',
//               )}
//             >
//               <CalendarIcon className='mr-2 h-4 w-4' />
//               {field.value ? format(field.value, 'yyyy-MM-dd HH:mm:ss') : <>날짜를 선택해주세요.</>}
//             </Button>
//           </PopoverTrigger>
//         </FormControl>
//         <PopoverContent className='w-auto p-0'>
//           <Calendar
//             mode='single'
//             {...restProps}
//             selected={field.value}
//             onSelect={field.onChange}
//             initialFocus
//             locale={ko}
//           />
//           <div className='border-t border-border p-3'>
//             <DatePick setDate={field.onChange} date={field.value} />
//           </div>
//         </PopoverContent>
//       </Popover>
//     </FormItem>
//   );
// };

// export default SharedDatePickerFormFieldRender;
