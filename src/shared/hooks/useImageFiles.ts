import { useState } from 'react';

import { FileWithPreview } from '@typings/commons';

const useImageFiles = (initialImageFiles: FileWithPreview[] = []) => {
  const [files, setFiles] = useState<FileWithPreview[]>(initialImageFiles);

  return {
    files,
    setFiles,
  };
};

export default useImageFiles;
