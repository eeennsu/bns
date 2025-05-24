'use client';

import type { TargetAndTransition } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import type { FC } from 'react';

interface Props {
  mbti: string;
}

const Mbti: FC<Props> = ({ mbti }) => {
  const variant = mbtiVariants[mbti] || mbtiVariants.DEFAULT;

  return (
    <AnimatePresence>
      <motion.div
        className='rounded-lg bg-[#8B4513]/5 p-4'
        initial={variant.initial}
        animate={{
          ...variant.animate,
          transition: { delay: 0.5, ...(variant.animate.transition ?? {}) },
        }}
        exit={{ opacity: 0 }}
      >
        <div className='mb-2 flex items-center gap-2'>
          <span className='rounded bg-[#8B4513] px-2 py-1 text-xs font-bold text-[#FFFFF0]'>
            MBTI
          </span>
          <span className='font-bold text-[#8B4513]'>{mbti}</span>
        </div>
        <p className='text-sm text-[#3E2723]'>{getMbtiDescription(mbti)}</p>
      </motion.div>
    </AnimatePresence>
  );
};

export default Mbti;

const mbtiVariants: MBTIVariants = {
  INFP: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  },
  INFJ: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: 'easeInOut' } },
  },

  INTP: {
    initial: { opacity: 0, rotate: -5, scale: 0.95 },
    animate: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  },
  INTJ: {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  },

  ENFP: {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.4 } },
  },
  ENFJ: {
    initial: { opacity: 0, scale: 0.9, rotate: 5 },
    animate: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', damping: 10 } },
  },
  ENTP: {
    initial: { x: -30, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  },
  ENTJ: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200 } },
  },

  ISTJ: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'linear' } },
  },
  ISFJ: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } },
  },
  ESTJ: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 250 } },
  },
  ESFJ: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  },

  ISTP: {
    initial: { scale: 0.8, rotate: -10, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 180 } },
  },
  ISFP: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  },
  ESTP: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300 } },
  },
  ESFP: {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.4 } },
  },

  // 예외 처리
  DEFAULT: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  },
};

type MBTIVariants = {
  [key: string]: {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
  };
};

const getMbtiDescription = (mbti: string): string => {
  const descriptions: { [key: string]: string } = {
    INFP: '섬세한 맛을 즐기는 몽상가들에게 어울리는 빵입니다. 깊은 풍미와 복합적인 맛을 느낄 수 있습니다.',
    ISTJ: '전통과 안정성을 중요시하는 분들에게 어울리는 건강한 빵입니다. 변함없는 맛과 영양을 제공합니다.',
    ENTJ: '목표 지향적이고 리더십이 강한 분들에게 어울리는 클래식한 빵입니다. 확실한 맛과 만족감을 줍니다.',
    ENFP: '새로운 경험을 즐기는 열정적인 분들에게 어울리는 빵입니다. 다양한 식감과 풍부한 맛이 특징입니다.',
    ESFP: '즐거움을 추구하는 활발한 분들에게 어울리는 달콤한 빵입니다. 기분 좋은 달콤함이 특징입니다.',
    ISFJ: '따뜻하고 배려심 많은 분들에게 어울리는 부드러운 빵입니다. 편안한 맛과 포근한 식감이 특징입니다.',
    INTJ: '분석적이고 전략적인 사고를 가진 분들에게 어울리는 복합적인 맛의 빵입니다. 깊은 풍미가 특징입니다.',
    ESTP: '모험을 즐기는 활동적인 분들에게 어울리는 실용적인 빵입니다. 든든하고 만족스러운 맛이 특징입니다.',
    INFJ: '이상주의적이고 창의적인 분들에게 어울리는 독특한 빵입니다. 특별한 맛과 영감을 줍니다.',
  };
  return descriptions[mbti] || '모든 MBTI 유형이 즐길 수 있는 균형 잡힌 맛의 빵입니다.';
};
