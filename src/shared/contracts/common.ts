import { MAX_FILE_SIZE } from '@libs/uploadImage';
import { z } from 'zod';

export const SearchFormDtoSchema = z.object({
  search: z.string(),
});

export const ImageFileInputSchema = z.object({
  ref: z.enum(['bread', 'sauce', 'bundle', 'event']),
});

export const SingleImageFileSchema = z
  .array(z.instanceof(File), { message: '이미지가 선택되어야 합니다.' })
  .refine(files => files.length > 0, { message: '이미지를 선택해주세요.' })
  .refine(files => files.length <= 1, { message: '최대 1개의 이미지까지 선택 가능합니다.' })
  .refine(files => files.every(file => file.size <= 1024 * 1024 * +MAX_FILE_SIZE.charAt(0)), {
    message: `최대 ${MAX_FILE_SIZE}의 이미지까지 선택 가능합니다.`,
  })
  .refine(files => files.every(file => file.type.startsWith('image/')), {
    message: '이미지 파일만 업로드 가능합니다.',
  });

export const MultipleImageFileSchema = (minCount: number = 1, maxCount: number = 10) =>
  z
    .array(z.instanceof(File), { message: '이미지가 선택되어야 합니다.' })
    .refine(files => files.length >= minCount, {
      message: `최소 ${minCount}개의 이미지를 선택해주세요.`,
    })
    .refine(files => files.length <= maxCount, {
      message: `최대 ${maxCount}개의 이미지까지 선택 가능합니다.`,
    })
    .refine(files => files.every(file => file.size <= 1024 * 1024 * 4), {
      message: '최대 6MB의 이미지까지 선택 가능합니다.',
    });
