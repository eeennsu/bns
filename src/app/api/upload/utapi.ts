import { extractUploadThingFileKey } from '@shared/api/uploadthing';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

export const deleteUploadthingFile = async (ufsUrl: string) => {
  const fileKey = extractUploadThingFileKey(ufsUrl);

  await utapi.deleteFiles(fileKey);
};

export default utapi;
