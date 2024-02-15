import { z } from 'zod';

export const paginationOptionsSchema = z.object({
  pageIndex: z.number().optional(),
  pageSize: z.number().optional(),
});

export const sortingOptionsSchema = z.object({
  id: z.string().optional(),
  desc: z.boolean().optional(),
});

export const filterTypes = [ 'value', 'date', 'enum', 'number' ] as const;
export const filterOptionsSchema = z.object({
  id: z.string().optional(),
  value: z.string().optional().array().optional(),
  type: z.enum(filterTypes).optional(),
});

export const queryOptionsSchema = z.object({
  paginationOptions: paginationOptionsSchema.optional(),
  sortingOptions: sortingOptionsSchema.optional(),
  filterOptions: filterOptionsSchema.array().optional(),
});

export type GeneratedFindOptions = {
  skip?: number | undefined;
  take?: number | undefined;
  orderBy?: Record<string, 'asc' | 'desc'> | undefined;
  where?: unknown;
};
export function buildQueryFromOptions({
  paginationOptions,
  sortingOptions,
  filterOptions,
} : z.infer<typeof queryOptionsSchema>): GeneratedFindOptions {
  return {
    skip: (paginationOptions?.pageIndex && paginationOptions.pageSize) ? paginationOptions.pageSize * paginationOptions.pageIndex : undefined,
    take: paginationOptions?.pageSize ?? 10,
    orderBy: sortingOptions?.id ? {
      [sortingOptions.id]: sortingOptions.desc ? 'desc' : 'asc',
    } : undefined,
    where: filterOptions ? buildWhereQuery(filterOptions) : undefined,
  };
}

function buildWhereQueryItem({ type, id, value }: z.infer<typeof filterOptionsSchema>) {
  const where: Record<string, unknown> = {};
  if (id && type === 'value' && value && value.length > 0) {
    where[id] = {
      contains: value[0],
    };
  }
  if (id && type === 'number' && value && value.length > 0) {
    where[id] = {
      contains: value[0] ? parseInt(value[0]) : undefined,
    };
  }
  if (id && type === 'enum' && value && value.length > 0) {
    where[id] = {
      in: value,
    };
  }
  if (id && type === 'date' && value && value.length > 0 && value[0]) {
    where[id] = {
      gte: new Date(value[0]),
      lte: value[1] ? new Date(value[1]) : undefined,
    };
  }
  return where;
}
function buildWhereQuery(filters: z.infer<typeof filterOptionsSchema>[]) {
  const items = filters.map(f => buildWhereQueryItem(f));
  return {
    AND: [
      ...items,
    ],
  };
}
