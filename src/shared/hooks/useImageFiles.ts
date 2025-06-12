import { useState } from 'react';

import { FileWithDropzone } from '@typings/commons';

const useImageFiles = (initialImageFiles: FileWithDropzone[] = []) => {
  const [files, setFiles] = useState<FileWithDropzone[]>(initialImageFiles);

  return {
    files,
    setFiles,
  };
};

export default useImageFiles;
