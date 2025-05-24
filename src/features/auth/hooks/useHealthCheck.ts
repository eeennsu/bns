import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import apiAuthHealthCheck from '../apis/healthCheck';

const useHealthCheck = () => {
  const { mutate: healthCheck } = useMutation({
    mutationKey: ['AUTH_HEALTH_CHECK'],
    mutationFn: apiAuthHealthCheck,
    onSuccess: () => {
      toast.success('헬스체크 성공');
    },
    onError: () => {
      toast.error('헬스체크 실패');
    },
  });

  const onCheck = () => {
    healthCheck();
  };

  return onCheck;
};

export default useHealthCheck;
