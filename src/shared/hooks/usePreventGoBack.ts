'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useConfirmBeforeBack = (message?: string) => {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;

    const handlePopState = () => {
      const confirmLeave = confirm(
        message || '정말 뒤로 가시겠습니까? 작성 중인 내용은 저장되지 않습니다.',
      );
      if (!confirmLeave) {
        router.push(window.location.pathname);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [message, router]);
};

export default useConfirmBeforeBack;
