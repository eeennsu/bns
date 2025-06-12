import { cookies } from 'next/headers';
import { TOKEN_TYPE } from 'src/shared/api/consts';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 10 } })
    .middleware(async () => {
      const cookiesStore = await cookies();
      const refreshToken = cookiesStore.get(TOKEN_TYPE.REFRESH)?.value;

      if (!refreshToken) {
        throw new Error('Access token expired');
      }

      return {};
    })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
