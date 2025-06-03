import { useUploadThing } from '@libs/uploadImage';
import { useState } from 'react';
import { toast } from 'sonner';

import { IImageFile, ImageFileInput } from '@typings/commons';

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
          imageId: fileItem.serverData?.imageId || '',
          url: fileItem.ufsUrl,
          key: fileItem.key,
          name: fileItem.name,
          type: fileItem.type,
          lastModified: fileItem.lastModified,
          size: fileItem.size,
        })),
      );
    },
  });

  const startUpload = async (files: File[], type: ImageFileInput['ref']) => {
    const response = await _startUpload(files, { ref: type } as any);
    if (!response) {
      toast.error(FILE_UPLOAD_TOAST_MESSAGES.IMAGE_UPLOAD_FAILED);
      return [];
    }

    return response.map(file => ({
      imageId: file?.serverData?.imageId || '',
    }));
  };

  return {
    startUpload,
    isUploading,
    imageFiles,
  };
};

export default useUploadImage;
