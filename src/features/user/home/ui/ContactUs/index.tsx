import { ArrowRight, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';

import { Button } from '@shadcn-ui/ui/button';

const ContactUs: FC = () => {
  return (
    <section className='container border-y border-[#8B4513]/20 bg-white py-24 text-center'>
      <h2 className='mb-4 flex w-full items-center justify-center gap-3 text-3xl text-[#8B4513]'>
        <PhoneCall />
        <a href='tel:+1234567890' className='font-medium underline-offset-2 hover:underline'>
          123-456-7890
        </a>
      </h2>
      <p className='mx-auto mb-6 max-w-2xl text-[#3E2723]/90'>
        주문하거나 오늘의 특별 메뉴에 대해 문의하려면 전화주세요.
      </p>

      <div className='flex justify-center'>
        <Link href={USER_PATHS.bread.list()}>
          <Button className='border-wood rounded-xl border-2 !px-6 py-4' variant='wood'>
            세트 메뉴 보기 <ArrowRight />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ContactUs;
