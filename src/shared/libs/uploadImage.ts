import { generateUploadButton, generateUploadDropzone } from '@uploadthing/react';

import { OurFileRouter } from '@app/api/upload/core';

export const UploadButton = generateUploadButton<OurFileRouter>({ url: '/api/upload' });
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
