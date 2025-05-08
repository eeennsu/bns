import { ArrowRight, PhoneCall } from 'lucide-react';
import type { FC } from 'react';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';

import LinkButton from '@components/LinkButton';

const ContactUs: FC = () => {
  return (
    <section className='container border-y border-[#8B4513]/20 bg-[#fffcdf] py-12 text-center lg:py-24'>
      <h2 className='mb-4 flex w-full items-center justify-center gap-3 text-3xl text-[#8B4513]'>
        <PhoneCall />
        <a href='tel:+1234567890' className='font-medium underline-offset-2 hover:underline'>
          123-456-7890
        </a>
      </h2>
      <p className='mx-auto mb-6 max-w-2xl text-[#3E2723]/90'>
        단체 주문하거나 오늘의 특별 메뉴에 대해 문의하려면 전화주세요.
      </p>

      <div className='flex justify-center'>
        <LinkButton href={USER_PATHS.bread.list()}>
          세트 메뉴 보기 <ArrowRight />
        </LinkButton>
      </div>
    </section>
  );
};

export default ContactUs;
