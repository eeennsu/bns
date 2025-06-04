import { useUploadThing } from '@libs/uploadImage';
import { useState } from 'react';
import { toast } from 'sonner';

import { FileWithPreview, IImageFile, ImageFileInput } from '@typings/commons';

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
          id: fileItem.serverData?.imageId || '',
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

  const startUpload = async (files: FileWithPreview[], type: ImageFileInput['ref']) => {
    const response = await _startUpload(files, { ref: type } as any);
    if (!response) {
      return [{ imageId: null }];
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
