'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FC, type PropsWithChildren } from 'react';

import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@shadcn-ui/ui/dialog';

const PageModal: FC<PropsWithChildren> = ({ children }) => {
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
        <DialogContent className='overflow-y-hidden'>
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
