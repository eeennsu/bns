'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { FC, PropsWithChildren } from 'react';

const DrawerAnimation: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div>{children}</motion.div>
    </AnimatePresence>
  );
};

// const DrawerAnimation: FC<PropsWithChildren> = ({ children }) => {
//   return (
//     <AnimatePresence>
//       <motion.div
//         className='flex items-center justify-center'
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <motion.div
//           className='relative w-[90%] max-w-4xl overflow-y-auto rounded-xl'
//           initial={{ y: '-100px', opacity: 0 }}
//           animate={{
//             y: 0,
//             opacity: 1,
//             transition: { type: 'spring', stiffness: 200, damping: 20 },
//           }}
//           exit={{ y: '-100px', opacity: 0 }}
//           onClick={e => e.stopPropagation()}
//         >
//           {children}
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

export default DrawerAnimation;
