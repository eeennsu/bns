import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { MAX_FILE_SIZE } from '@entities/image/consts';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: MAX_FILE_SIZE, maxFileCount: 10 } })
    .middleware(async () => {
      return {};
    })
    .onUploadError(({ error }) => {
      throw error;
    })
    .onUploadComplete(res => {
      console.log('res.file', res.file);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
