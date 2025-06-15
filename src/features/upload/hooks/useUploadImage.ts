import { useUploadThing } from '@libs/uploadImage';
import { useState } from 'react';
import { toast } from 'sonner';

import { FILE_UPLOAD_TOAST_MESSAGES } from '@entities/image/consts';
import { FileWithDropzone, IImageFile, ImageRef } from '@entities/image/types';

import apiUploadImage from '../apis/image';

const useUploadImage = () => {
  const [imageFiles, setImageFiles] = useState<IImageFile[]>([]);
  const { startUpload: _startUpload, isUploading } = useUploadThing('imageUploader', {
    onUploadError: error => {
      console.error('onUploadError: ', error);
      toast.error(FILE_UPLOAD_TOAST_MESSAGES.FAILED_UPLOAD);
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

    return response;
  };

  const fetchUploadApi = async (files: FileWithDropzone[], refType: ImageRef) => {
    const [uploadedImageResponse] = await startUpload(files);

    if (!uploadedImageResponse) {
      toast.error(FILE_UPLOAD_TOAST_MESSAGES.FAILED_UPLOAD);
      return;
    }

    const imageIds = await apiUploadImage({
      imageFiles: [
        {
          url: uploadedImageResponse.ufsUrl,
          name: uploadedImageResponse.name,
        },
      ],
      refType,
    });

    if (!imageIds || imageIds.length === 0) {
      toast.error(FILE_UPLOAD_TOAST_MESSAGES.NO_IMAGE_IDS);
      return;
    }

    return imageIds;
  };

  return {
    startUpload,
    fetchUploadApi,
    isUploading,
    imageFiles,
  };
};

export default useUploadImage;
