import { z } from 'zod';

import { imageFileSchema, ImageRefSchema } from './contracts';

export type FileWithPreview = File & { preview: string };
export type FileWithDropzone = FileWithPreview | IImageFile;
export interface IFileImagesWithSortOrder {
  id: string;
  sortOrder: number;
}

export interface IImageFile extends z.infer<typeof imageFileSchema> {}
export type ImageRef = z.infer<typeof ImageRefSchema>;

export interface IUploadImage {
  imageFiles: {
    url: string;
    name: string;
  }[];
  refType: ImageRef;
}
