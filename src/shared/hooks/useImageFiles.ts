import { useState } from 'react';

const useImageFiles = (initialImageFiles: File[] = []) => {
  const [imageFiles, setImageFiles] = useState<File[]>(initialImageFiles);

  return {
    imageFiles,
    setImageFiles,
  };
};

export default useImageFiles;
