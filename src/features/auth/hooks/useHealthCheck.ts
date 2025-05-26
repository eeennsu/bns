import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import apiAuthHealthCheck from '../apis/healthCheck';

const useHealthCheck = () => {
  const { mutate: healthCheck, isPending } = useMutation({
    mutationKey: ['AUTH_HEALTH_CHECK'],
    mutationFn: apiAuthHealthCheck,
    onSuccess: () => {
      toast.success('기능 정상 작동 중');
    },
    onError: () => {
      toast.error('니가 뭘할 수 있는데 ㅋㅋ 나한테 물어보든가 ㅋㅋ');
    },
  });

  const onHealthCheck = () => {
    healthCheck();
  };

  return {
    onHealthCheck,
    isPending,
  };
};

export default useHealthCheck;
