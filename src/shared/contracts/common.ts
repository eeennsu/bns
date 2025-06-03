import { z } from 'zod';

import { MAX_FILE_SIZE } from '@consts/commons';

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

export const SortOrderSchema = z
  .string()
  .refine(val => val !== '', { message: '순서를 입력해주세요.' })
  .refine(
    val => {
      const num = Number(val);
      return !isNaN(num) && Number.isInteger(num) && num > 0;
    },
    { message: '순서는 1 이상의 정수여야 합니다.' },
  );

export const PriceSchema = z
  .string()
  .refine(val => val !== '', { message: '가격을 입력해주세요.' })
  .refine(val => val === '0' || !val.startsWith('0'), {
    message: '0으로 시작하는 숫자는 입력할 수 없습니다. (0원은 입력 가능)',
  })
  .refine(val => !isNaN(Number(val)), { message: '가격은 0원 이상이어야 합니다.' });
