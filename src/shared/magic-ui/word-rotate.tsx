'use client';

import { AnimatePresence, motion, MotionProps } from 'motion/react';
import { useEffect, useState } from 'react';

import { cn } from '@shadcn-ui/utils';

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
  isActive?: boolean;
}

export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  className,
  isActive = true,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  const variants = {
    active: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    inactive: { opacity: 1, y: 0, transition: { duration: 0 } },
  };

  return (
    <div className='overflow-hidden py-2'>
      <AnimatePresence mode='wait'>
        <motion.h1
          key={words[index]}
          variants={variants}
          initial='inactive'
          animate={isActive ? 'active' : 'inactive'}
          exit={{ opacity: 0, y: 50 }}
          className={cn(className)}
          {...motionProps}
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
