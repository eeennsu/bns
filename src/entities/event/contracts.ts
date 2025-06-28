import { STRING_LENGTH } from '@db/consts/commons';
import dayjs from 'dayjs';
// import dayjs from 'dayjs';
import { z } from 'zod';

import { SingleImageFileSchema } from '@entities/image/contracts';

import { getDateSchema, SortOrderSchema } from '@contracts/common';

export const EventFormDtoSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: '이벤트 이름을 입력해주세요.' })
      .max(STRING_LENGTH.NAME, {
        message: `최대 ${STRING_LENGTH.NAME}자 까지 입력할 수 있습니다.`,
      }),
    description: z
      .string()
      .min(1, { message: '이벤트 설명을 입력해주세요.' })
      .max(STRING_LENGTH.DESCRIPTION, {
        message: `최대 ${STRING_LENGTH.DESCRIPTION}자 까지 입력할 수 있습니다.`,
      }),
    // dateRange: z
    //   .object({
    //     from: z.union([
    //       z.string().min(1, { message: '시작 날짜를 선택해주세요.' }),
    //       z.date({ required_error: '시작 날짜를 선택해주세요.' }),
    //     ]),
    //     to: z.union([z.string({ message: '종료 날짜를 선택해주세요.' }), z.date()]),
    //   })
    //   .refine(
    //     ({ from, to }) => dayjs(from).isAfter(dayjs(), 'day') || dayjs(to).isAfter(dayjs(), 'day'),
    //   )
    //   .refine(({ from, to }) => from && to && from <= to, {
    //     message: '시작 날짜는 종료 날짜보다 이전이어야 합니다.',
    //     path: ['root'],
    //   }),
    startDate: getDateSchema('시작'),
    endDate: getDateSchema('종료'),
    isHidden: z.boolean(),
    imageFiles: SingleImageFileSchema,
    sortOrder: SortOrderSchema,
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (
      startDate &&
      endDate &&
      (dayjs(startDate).isSame(dayjs(endDate), 'day') ||
        dayjs(startDate).isAfter(dayjs(endDate), 'day'))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '종료일는 시작일보다 이후여야합니다.',
        path: ['endDate'],
      });
    }
  });
