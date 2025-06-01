import { z } from 'zod';

export const SearchFormDtoSchema = z.object({
  search: z.string(),
});

export const ImageFileInputSchema = z.object({
  ref: z.enum(['bread', 'sauce', 'bundle', 'event']),
});