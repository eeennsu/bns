import { z } from 'zod';

import { IMAGE_REF_VALUES, MAX_FILE_SIZE, MAX_FILE_SIZE_BYTES } from './consts';

export const imageFileSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string().optional(),
  preview: z.string().optional(),
  order: z.number().optional(),
  lastModified: z.number().optional(),
});

export const SingleImageFileSchema = z
  .array(z.union([imageFileSchema, z.instanceof(File)]))
  .refine(files => files.length > 0, { message: '이미지를 선택해주세요.' })
  .refine(files => files.length <= 1, { message: '최대 1개의 이미지까지 선택 가능합니다.' })
  .refine(
    files =>
      files.every(file => {
        if (file instanceof File) {
          return file.size <= 1024 * 1024 * +MAX_FILE_SIZE.charAt(0);
        }
        return true;
      }),
    {
      message: `최대 ${MAX_FILE_SIZE}의 이미지까지 선택 가능합니다.`,
    },
  )
  .refine(
    files =>
      files.every(file => {
        if (file instanceof File) {
          return file.type.startsWith('image/');
        }
        return true;
      }),
    {
      message: '이미지 파일만 업로드 가능합니다.',
    },
  );

export const getMultipleImageFileSchema = (minCount: number = 1, maxCount: number = 10) =>
  z
    .array(z.union([imageFileSchema, z.instanceof(File)]), {
      message: '이미지가 선택되어야 합니다.',
    })
    .refine(files => files.length >= minCount, {
      message: `최소 ${minCount}개의 이미지를 선택해주세요.`,
    })
    .refine(files => files.length <= maxCount, {
      message: `최대 ${maxCount}개의 이미지까지 선택 가능합니다.`,
    })
    .refine(
      files =>
        files.every(file => {
          if (file instanceof File) {
            return file.size <= MAX_FILE_SIZE_BYTES;
          }
          return true;
        }),
      {
        message: `최대 ${MAX_FILE_SIZE}의 이미지까지 선택 가능합니다.`,
      },
    );

export const ImageRefValueSchema = z.enum(Object.values(IMAGE_REF_VALUES) as [string, ...string[]]);
