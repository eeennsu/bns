import { useState } from 'react';

import { FileWithDropzone } from '@entities/image/types';

const useImageFiles = (initialImageFiles: FileWithDropzone[] = []) => {
  const [files, setFiles] = useState<FileWithDropzone[]>(initialImageFiles);

  return {
    files,
    setFiles,
  };
};

export default useImageFiles;
