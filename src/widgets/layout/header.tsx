// import type { FC } from 'react'
// import { Github } from 'lucide-react'
// import Link from 'next/link'
// import { twMerge } from 'tailwind-merge'

// interface Props {
//     isHeaderVisible: boolean
// }

// export const Header: FC<Props> = ({ isHeaderVisible }) => {
//     return (
//         <header
//             className={twMerge(
//                 'fixed top-0 z-50 bg-white/30 backdrop-blur-lg shadow-md w-full left-0 transition-opacity duration-300 ease-out',
//                 isHeaderVisible ? 'opacity-100' : 'opacity-0'
//             )}
//         >
//             <div className='mx-auto px-6 py-4 flex justify-between items-center max-w-6xl'>
//                 <div className='flex items-end gap-2'>
//                     <h1 className='text-2xl text-gray-800 tracking-wide'>방은수</h1>
//                     <span className='text-sm text-gray-700'>1999.01.21</span>
//                 </div>

//                 <Link
//                     href='https://github.com/eeennsu'
//                     target='_blank'
//                     rel='noopener noreferrer'
//                     className='text-gray-800 hover:text-blue-600 transition-colors'
//                 >
//                     <Github size={28} />
//                 </Link>
//             </div>
//         </header>
//     )
// }
