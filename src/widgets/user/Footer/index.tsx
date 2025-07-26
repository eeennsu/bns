'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, type FC } from 'react';

import AdminEntryPoint from '@features/admin/ui/EntryPoint';
import useGetSession from '@features/auth/hooks/useGetSession';

import useModal from '@hooks/useModal';

import UtilLocalImage from '@utils/utilImage';

import { BUSINESS_INFO, BRAND_TITLE, SNS_INFO } from '@consts/brand';

const Footer: FC = () => {
  const { isOpen, setIsOpen, openModal, closeModal } = useModal();

  const { session, isLoading: isSessionLoading } = useGetSession();

  const onOpenLoginModal = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    console.log('!@?#!@?#');
    openModal();
  };

  return (
    <>
      <footer className='bg-[#5D4037] py-10 text-[#FFFDF4]'>
        <div className='mx-auto max-w-6xl space-y-4 px-4 text-center'>
          <div className='flex items-center justify-center gap-2'>
            <h2 className='text-xl font-bold tracking-wide'>{BRAND_TITLE.KO}</h2>
            <Image
              src={UtilLocalImage.IMAGES.LOGO}
              alt='logo'
              width={45}
              height={45}
              className='rounded-xl bg-white'
            />
          </div>
          <div className='flex justify-center gap-4'>
            {Object.entries(SNS_INFO).map(([key, value]) => (
              <Link key={key} href={value.URL}>
                <Image
                  src={value.IMAGE_URL}
                  alt={key}
                  width={24}
                  height={24}
                  className='transition-all hover:scale-110'
                />
              </Link>
            ))}
          </div>
          <ul className='flex flex-col items-center gap-2 text-sm text-[#FAF9F6] sm:flex-row sm:justify-center sm:gap-0'>
            {Object.entries(BUSINESS_INFO).map(([key, v], i) => (
              <li
                key={key}
                className="flex items-center gap-1 sm:after:mx-4 sm:after:h-4 sm:after:w-px sm:after:bg-[#FAF9F6]/30 sm:after:content-[''] last:sm:after:hidden"
              >
                {v.label}
                <span
                  className='font-medium'
                  onContextMenu={i === 1 ? onOpenLoginModal : undefined}
                >
                  : {v.value}
                </span>
              </li>
            ))}
          </ul>
          <p className='text-xs opacity-70'>
            &copy; {dayjs().year()} {BRAND_TITLE.EN} All rights reserved.
          </p>
        </div>
      </footer>

      {isOpen && (
        <AdminEntryPoint
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModal={closeModal}
          isLoading={isSessionLoading}
          isAuthorized={session?.isAuthorized}
        />
      )}
    </>
  );
};

export default Footer;
