import { z } from 'zod';

export const SearchFormDtoSchema = z.object({
  search: z.string(),
});
