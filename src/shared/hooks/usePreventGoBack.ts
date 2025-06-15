'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useConfirmBeforeBack = (
  message: string = '정말 뒤로 가시겠습니까? 작성 중인 내용은 저장되지 않습니다.',
) => {
  const router = useRouter();

  useEffect(() => {
    const handlePopState = () => {
      const confirmLeave = confirm(message);
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
