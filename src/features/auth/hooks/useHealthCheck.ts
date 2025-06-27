import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { AUTH_TOAST_MESSAGES } from '@entities/auth/consts';

import apiAuthHealthCheck from '../apis/healthCheck';

const useHealthCheck = () => {
  const [stack, setStack] = useState<number>(0);
  const { mutate: healthCheck, isPending } = useMutation({
    mutationKey: ['AUTH_HEALTH_CHECK'],
    mutationFn: apiAuthHealthCheck,
    onSuccess: () => {
      setStack(prev => prev + 1);
    },
    onError: () => {
      toast.error(AUTH_TOAST_MESSAGES.HEALTH_CHECK_FAILED);
    },
  });

  const onHealthCheck = () => {
    healthCheck();
  };

  useEffect(() => {
    if (stack <= 0) return;

    if (stack < 5) {
      toast.success(AUTH_TOAST_MESSAGES.HEALTH_CHECK_SUCCESS);
    } else if (stack < 10) {
      toast.success(AUTH_TOAST_MESSAGES.HEALTH_CHECK_SUCCESS_2);
    } else {
      toast.success(AUTH_TOAST_MESSAGES.HEALTH_CHECK_SUCCESS_3);
    }
  }, [stack]);

  return {
    onHealthCheck,
    isPending,
  };
};

export default useHealthCheck;
