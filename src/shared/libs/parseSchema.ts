import { z } from 'zod';

export const parseSchema = (
  schema: z.ZodTypeAny,
  value: unknown,
  fallback?: unknown,
): z.infer<typeof schema> => {
  const result = schema.safeParse(value);

  return result.success ? result.data : fallback;
};
