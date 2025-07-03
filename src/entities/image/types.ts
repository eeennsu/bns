import { z } from 'zod';

import { imageFileSchema, ImageRefValueSchema } from './contracts';

export type FileWithPreview = File & { id: string; preview: string };
export type FileWithDropzone = FileWithPreview | IImageFile;
export interface IFileImagesWithSortOrder {
  id: string;
  sortOrder: number;
}

export interface IImageFile extends z.infer<typeof imageFileSchema> {}
export type ImageRef = z.infer<typeof ImageRefValueSchema>;

export interface IUploadImage {
  imageFiles: {
    url: string;
    name: string;
    order?: number;
  }[];
  refType: ImageRef;
}
