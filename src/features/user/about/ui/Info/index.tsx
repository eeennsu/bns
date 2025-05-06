import { ArrowRight } from 'lucide-react';
import type { FC } from 'react';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';

import LinkButton from '@components/LinkButton';

const Info: FC = () => {
  return (
    <section className='rounded-xl'>
      <div className='container mx-auto px-4'>
        <div className='mb-10 text-center'>
          <h2 className='text-wood-border-wood-secondary mb-4 text-3xl font-bold'>문의하기</h2>
          <div className='bg-wood border-wood-secondary/30 mx-auto h-1 w-16' />
        </div>

        <div className='mx-auto max-w-2xl'>
          <div className='bg-ivory-secondary/80 rounded-lg p-6 shadow-sm lg:p-8'>
            <div>
              <p className='mb-6 text-center text-[#3E2723]'>
                주문하시거나 오늘의 특별 메뉴에 대해 문의하려면 전화주세요. 단체 주문 및 케이터링
                서비스도 가능합니다. 라는 대충 이런 내용
              </p>
              <p className='mb-6 text-center text-[#3E2723]'>
                특별한 날을 위한 맞춤형 빵이나 케이크가 필요하시면 최소 3일 전에 미리 연락주세요.
                라는 대충이런 내용
              </p>
            </div>

            <div className='mt-6 flex flex-col justify-center gap-4 sm:flex-row'>
              <LinkButton href={USER_PATHS.bread.list()} className='flex-1 justify-center'>
                세트 메뉴 보기 <ArrowRight className='h-4 w-4' />
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
