import { AlertTriangle } from 'lucide-react';
import { FC } from 'react';

interface IProps {
  message?: string;
}

const ErrorMessage: FC<IProps> = ({
  message = '서버 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
}) => (
  <div
    role='alert'
    className='mx-auto my-8 flex max-w-md items-center gap-3 rounded-xl border border-red-300 bg-red-50 p-5 text-sm text-red-700 shadow-sm'
  >
    <AlertTriangle className='h-5 w-5 flex-shrink-0 text-red-500' />
    <span className='leading-relaxed'>{message}</span>
  </div>
);

export default ErrorMessage;
