import { useEffect } from 'react';

interface IParams {
  message?: string;
  enabled?: boolean;
}

const usePreventRefresh = ({
  message = '변경사항이 저장되지 않았습니다. 정말로 나가시겠습니까?',
}: IParams = {}) => {
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = message;
    return message;
  };

  useEffect(() => {
    window.addEventListener('beforeunload', preventClose);

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, [message]);
};

export default usePreventRefresh;
