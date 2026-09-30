import z from 'zod';

export const requiredZodString = (
  module: string,
  { min = 3, max = 255 }: { min?: number; max?: number } = {},
) => {
  return z
    .string()
    .trim()
    .nonempty(`${module} is required`)
    .min(min, `${module} must be at least ${min} characters`)
    .max(max, `${module} must be at most ${max} characters`);
};
