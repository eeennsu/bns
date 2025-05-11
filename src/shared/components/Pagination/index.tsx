// import { PaginationItem, PaginationLink } from '@shadcn-ui/ui/pagination';
// import { cn } from '@shadcn-ui/utils';
// import { Fragment, type FC } from 'react';

// interface IProps {
//   totalPages: number;
//   currentPage: number;
//   handlePageChange: (page: number) => void;
// }

// const Pagination: FC<IProps> = ({ totalPages, currentPage, handlePageChange }) => {
//   const paginationItems: number[] = new Array(totalPages).fill(0).map((_, i) => {
//     const pageNumber = i + 1;

//     return <Fragment key={pageNumber}>
//         <PaginationItem key={pageNumber}>
//           <PaginationLink
//             className=''
//           >
//             {pageNumber}
//           </PaginationLink>
//         </PaginationItem>
//     </Fragment>

//   })

//   return (
//     <section className='mt-12 flex justify-center'>
//       <nav className='inline-flex items-center rounded-lg bg-[#FFFFF0]/80 p-1.5 shadow-sm'>
//         <button
//           className='flex h-9 w-9 items-center justify-center rounded-md text-[#3E2723] transition-all duration-200 hover:bg-[#8B4513]/10 hover:text-[#8B4513]'
//           aria-label='이전 페이지'
//         >
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             width='18'
//             height='18'
//             viewBox='0 0 24 24'
//             fill='none'
//             stroke='currentColor'
//             strokeWidth='2'
//             strokeLinecap='round'
//             strokeLinejoin='round'
//           >
//             <polyline points='15 18 9 12 15 6'></polyline>
//           </svg>
//         </button>

//         <div className='mx-1 flex items-center'>
//           <button className='flex h-9 w-9 items-center justify-center rounded-md bg-[#8B4513] font-medium text-[#FFFFF0] shadow-sm transition-all duration-200'>
//             1
//           </button>
//           <button className='flex h-9 w-9 items-center justify-center rounded-md font-medium text-[#3E2723] transition-all duration-200 hover:bg-[#8B4513]/10 hover:text-[#8B4513]'>
//             2
//           </button>
//           <button className='flex h-9 w-9 items-center justify-center rounded-md font-medium text-[#3E2723] transition-all duration-200 hover:bg-[#8B4513]/10 hover:text-[#8B4513]'>
//             3
//           </button>
//           <button className='flex h-9 w-9 items-center justify-center rounded-md font-medium text-[#3E2723] transition-all duration-200 hover:bg-[#8B4513]/10 hover:text-[#8B4513]'>
//             4
//           </button>
//           <button className='flex h-9 w-9 items-center justify-center rounded-md font-medium text-[#3E2723] transition-all duration-200 hover:bg-[#8B4513]/10 hover:text-[#8B4513]'>
//             5
//           </button>
//         </div>

//         <button
//           className='flex h-9 w-9 items-center justify-center rounded-md text-[#3E2723] transition-all duration-200 hover:bg-[#8B4513]/10 hover:text-[#8B4513]'
//           aria-label='다음 페이지'
//         >
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             width='18'
//             height='18'
//             viewBox='0 0 24 24'
//             fill='none'
//             stroke='currentColor'
//             strokeWidth='2'
//             strokeLinecap='round'
//             strokeLinejoin='round'
//           >
//             <polyline points='9 18 15 12 9 6'></polyline>
//           </svg>
//         </button>
//       </nav>
//     </section>
//   );
// };

// export default Pagination;
