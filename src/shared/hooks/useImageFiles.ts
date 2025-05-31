import { useState } from 'react';

import { ImageFile } from '@typings/commons';

const useImageFiles = (initialImageFiles: ImageFile[] = []) => {
  const [files, setFiles] = useState<ImageFile[]>(initialImageFiles);

  return {
    files,
    setFiles,
  };
};

export default useImageFiles;
