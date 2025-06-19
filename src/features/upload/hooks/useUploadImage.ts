import { toast } from 'sonner';

import { useUploadThing } from '@features/upload/libs/uploadthing';

import { FILE_UPLOAD_TOAST_MESSAGES } from '@entities/image/consts';
import { FileWithDropzone, ImageRef } from '@entities/image/types';

import apiUploadImage from '../apis/image';
import { compressImage } from '../libs/compress';

const useUploadImage = () => {
  // const [imageFiles, setImageFiles] = useState<IImageFile[]>([]);
  const { startUpload: _startUpload, isUploading } = useUploadThing('imageUploader', {
    onUploadError: error => {
      console.error('onUploadError: ', error);
      toast.error(FILE_UPLOAD_TOAST_MESSAGES.FAILED_UPLOAD);
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

  const startUpload = async (files: FileWithDropzone[]) => {
    const filesArray: File[] = files.filter(file => file instanceof File);

    if (filesArray.length === 0) {
      toast.warning(FILE_UPLOAD_TOAST_MESSAGES.NO_FILE);
    }

    const compressedFiles = await Promise.all(filesArray.map(file => compressImage(file)));

    const response = await _startUpload(compressedFiles);
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

    let imageIds: number[] = [];

    try {
      imageIds = await apiUploadImage({
        imageFiles: [
          {
            url: uploadedImageResponse.ufsUrl,
            name: uploadedImageResponse.name,
          },
        ],
        refType,
      });
    } catch (error) {
      console.error('error', error);
      imageIds = [];
    }

    return imageIds;
  };

  return {
    startUpload,
    fetchUploadApi,
    isUploading,
    // imageFiles,
  };
};

export default useUploadImage;
