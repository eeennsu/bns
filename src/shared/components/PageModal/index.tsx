'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FC, type PropsWithChildren } from 'react';

import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@shadcn-ui/ui/dialog';
import { cn } from '@shadcn-ui/utils';

interface IProps {
  className?: string;
}

const PageModal: FC<PropsWithChildren<IProps>> = ({ className, children }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        router.back();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen, router]);

  return (
    <Dialog defaultOpen open={isOpen} onOpenChange={setIsOpen}>
      <DialogOverlay>
        <DialogContent
          closeButtonClassName='cursor-pointer hover:bg-gray-100 rounded-full p-1.5 focus:ring-0 focus:ring-offset-0'
          className={cn(
            'overflow-y-auto sm:max-h-[85vh] sm:max-w-[75vw] 2xl:max-w-[55vw]',
            className,
          )}
        >
          <VisuallyHidden>
            <DialogTitle>숨김 제목</DialogTitle>
          </VisuallyHidden>
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default PageModal;
