// import type { Dispatch, FC, SetStateAction } from 'react';

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@shadcn-ui/ui';

// import { SelectItem as SelectItemType } from '@typings/commons';

// interface IProps {
//   selectList: string[] | SelectItemType[];
//   setValues: Dispatch<SetStateAction<string[] | SelectItemType[]>>;
//   placeholder?: string;
// }

// const SharedMultiSelect: FC<IProps> = ({
//   selectList,
//   setValues,
//   placeholder = '추가할 목록을 선택해주세요',
// }) => {
//   const onChangeSelect = (value: string) => {
//     setValues(prev => {
//       const findValue = prev.find(v => v === value);

//       if (findValue) {
//         return prev.filter(v => v !== value);
//       } else {
//         return [...prev, value];
//       }
//     });
//   };

//   return (
//     <Select onValueChange={onChangeSelect}>
//       <SelectTrigger className='w-[180px]'>
//         <SelectValue placeholder={placeholder} />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           {selectList.map((select, index) => {
//             if (typeof select === 'string') {
//               return (
//                 <SelectItem key={index} value={select}>
//                   {select}
//                 </SelectItem>
//               );
//             }

//             if (typeof select === 'object') {
//               return (
//                 <SelectItem key={index} value={select.value}>
//                   {select.label}
//                 </SelectItem>
//               );
//             }
//           })}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// };

// export default SharedMultiSelect;
