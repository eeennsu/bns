import { useUploadThing } from '@libs/uploadImage';
import { useState } from 'react';
import { toast } from 'sonner';

import { FileWithDropzone, IImageFile } from '@typings/commons';

import { FILE_UPLOAD_TOAST_MESSAGES } from '@consts/commons';

const useUploadImage = () => {
  const [imageFiles, setImageFiles] = useState<IImageFile[]>([]);
  const { startUpload: _startUpload, isUploading } = useUploadThing('imageUploader', {
    onUploadError: error => {
      console.error('onUploadError: ', error);
      toast.error(FILE_UPLOAD_TOAST_MESSAGES.IMAGE_UPLOAD_FAILED);
    },

    onClientUploadComplete: response => {
      setImageFiles(
        response.map(fileItem => ({
          url: fileItem.ufsUrl,
          preview: fileItem.ufsUrl,
          key: fileItem.key,
          name: fileItem.name,
          type: fileItem.type,
          lastModified: fileItem.lastModified,
          size: fileItem.size,
        })),
      );
    },
  });

  const startUpload = async (files: FileWithDropzone[]) => {
    const filesArray: File[] = files.filter(file => file instanceof File);

    if (filesArray.length === 0) {
      toast.warning(FILE_UPLOAD_TOAST_MESSAGES.NO_FILE);
    }

    const response = await _startUpload(filesArray);
    if (!response) {
      return null;
    }

    return response.map(file => file.ufsUrl);
  };

  return {
    startUpload,
    isUploading,
    imageFiles,
  };
};

export default useUploadImage;
