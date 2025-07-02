import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ADMIN_IMAGE_KEYS, FILE_UPLOAD_TOAST_MESSAGES } from '@entities/image/consts';
import { FileWithDropzone, ImageRef } from '@entities/image/types';

import apiUploadImage from '../apis/upload';
import { compressImage } from '../libs/compress';
import { useUploadThing } from '../libs/uploadthing';

const useUploadImage = () => {
  // const [imageFiles, setImageFiles] = useState<IImageFile[]>([]);

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

    // onClientUploadComplete: response => {
    //   setImageFiles(
    //     response.map(fileItem => ({
    //       url: fileItem.ufsUrl,
    //       preview: fileItem.ufsUrl,
    //       key: fileItem.key,
    //       name: fileItem.name,
    //       type: fileItem.type,
    //       lastModified: fileItem.lastModified,
    //       size: fileItem.size,
    //     })),
    //   );
    // },
  });

  const compressAndUpload = async (files: FileWithDropzone[]) => {
    const filesArray: File[] = files.filter(file => file instanceof File);

    if (filesArray.length === 0) {
      toast.warning(FILE_UPLOAD_TOAST_MESSAGES.NO_FILE);
    }

    const compressedFiles = await Promise.all(filesArray.map(file => compressImage(file)));

    const response = await startUpload(compressedFiles);
    if (!response) {
      return null;
    }

    return response;
  };

  const fetchUploadApi = async (files: FileWithDropzone[], refType: ImageRef) => {
    const uploadedImagesResponse = await compressAndUpload(files);

    if (!uploadedImagesResponse || uploadedImagesResponse.length === 0) {
      return [];
    }

    let imageIds: number[] = [];

    const imageFiles = uploadedImagesResponse.map(uploaded => ({
      url: uploaded.ufsUrl,
      name: uploaded.name,
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
    // imageFiles,
  };
};

export default useUploadImage;
