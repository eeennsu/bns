import { useState } from 'react';

const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    setIsOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
