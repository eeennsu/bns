import imageCompression, { Options } from 'browser-image-compression';

export const compressImage = async (file: File): Promise<File> => {
  try {
    const compressedBlob = await imageCompression(file, options);

    const originalNameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
    const newFileName = `${originalNameWithoutExt}.webp`;

    return new File([compressedBlob], newFileName, {
      type: compressedBlob.type,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error('compressionImage: ', error);
    return file;
  }
};

const options: Options = {
  maxSizeMB: 0.6,
  maxWidthOrHeight: 800,
  useWebWorker: true,
  fileType: 'image/webp',
  initialQuality: 0.7,
};
