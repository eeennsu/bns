import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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
      toast.error('니가 뭘할 수 있는데 ㅋㅋ 나한테 물어보든가 ㅋㅋ');
    },
  });

  const onHealthCheck = () => {
    healthCheck();
  };

  useEffect(() => {
    if (stack <= 0) return;

    if (stack < 5) {
      toast.success('기능 정상 작동 중');
    } else if (stack < 10) {
      toast.success('아 그만하라고 된다니까 ㅋㅋ');
    } else {
      toast.success('사이트 터진다 ㅅㄱ');
    }
  }, [stack]);

  return {
    onHealthCheck,
    isPending,
  };
};

export default useHealthCheck;
