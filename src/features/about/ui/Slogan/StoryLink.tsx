'use client';

import { motion } from 'framer-motion';
import type { FC } from 'react';

const StoryLink: FC = () => {
  return (
    <motion.a
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 3.6 }}
      className='z-10 cursor-pointer text-lg font-semibold tracking-tight text-yellow-600 underline 2xl:text-2xl'
    >
      Brand Story
    </motion.a>
  );
};

export default StoryLink;
