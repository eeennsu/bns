import { getServerSession } from 'src/shared/api/getServerSession';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { ImageFileInputSchema } from '@contracts/common';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 10,
    },
  })
    .input(ImageFileInputSchema)
    .middleware(async ({ input }) => {
      const user = await getServerSession();

      return {
        imageRef: input.ref,
        userId: user.id,
      };
    })
    .onUploadError(async res => {
      console.log('file error', res);
    })
    .onUploadComplete(async ({ metadata }) => {
      const { imageRef } = metadata;
      let imageId = '';

      switch (imageRef) {
        case 'bread':
          imageId = '1';
          return { imageId };

        case 'sauce':
          imageId = '2';
          return { imageId };

        case 'bundle':
          imageId = '3';
          return { imageId };

        case 'event':
          imageId = '4';
          return { imageId };

        default:
          throw new Error('알 수 없는 이미지 타입입니다.');
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
