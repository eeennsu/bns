import useImageFiles from '@shared/hooks/useImageFiles';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ADMIN_IMAGE_KEYS, FILE_UPLOAD_TOAST_MESSAGES } from '@entities/image/consts';
import { FileWithDropzone, ImageRef } from '@entities/image/types';

import apiUploadImage from '../apis/upload';
import { compressImage } from '../libs/compress';
import { useUploadThing } from '../libs/uploadthing';

const useUploadImage = (initialImageFiles: FileWithDropzone[] = []) => {
  const { files, setFiles } = useImageFiles(initialImageFiles);

  const { mutateAsync: uploadImage } = useMutation({
    mutationKey: [ADMIN_IMAGE_KEYS.UPLOAD],
    mutationFn: apiUploadImage,
    onError: () => {
      toast.error(FILE_UPLOAD_TOAST_MESSAGES.FAILED_UPLOAD_API);
    },
  });

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onUploadError: error => {
      console.error('onUploadError: ', error);
      toast.error(FILE_UPLOAD_TOAST_MESSAGES.FAILED_UPLOADTHING);
    },
  });

  const compressAndUpload = async (files: FileWithDropzone[]) => {
    const filesArray: File[] = files.filter(file => file instanceof File);

    if (filesArray.length === 0) {
      toast.warning(FILE_UPLOAD_TOAST_MESSAGES.NO_FILE);
    }

    const compressedFiles = await Promise.all(filesArray.map(file => compressImage(file)));

    console.log('compressedFiles', compressedFiles);
    const response = await startUpload(compressedFiles);
    if (!response) {
      return null;
    }

    console.log('response', response);

    return response;
  };

  const fetchUploadApi = async (files: FileWithDropzone[], refType: ImageRef) => {
    const uploadthingResponse = await compressAndUpload(files);

    if (!uploadthingResponse || uploadthingResponse.length === 0) {
      return [];
    }

    let imageIds: number[] = [];

    const imageFiles = uploadthingResponse.map((uploaded, index) => ({
      url: uploaded.ufsUrl,
      name: uploaded.name,
      order: index + 1,
    }));

    imageIds = await uploadImage({
      imageFiles,
      refType,
    });

    return imageIds ?? [];
  };

  return {
    startUpload,
    fetchUploadApi,
    isUploading,
    files,
    setFiles,
  };
};

export default useUploadImage;
