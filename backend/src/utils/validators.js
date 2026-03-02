/**
 * @file Shared Zod schemas for backend payload validation.
 */

import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20)
});

export const idSchema = z.object({
  id: z.string().min(3)
});
