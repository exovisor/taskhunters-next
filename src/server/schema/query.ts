import {z} from "zod";

export const paginationOptionsSchema = z.object({
	pageIndex: z.number().optional(),
	pageSize: z.number().optional(),
}).optional();

export const sortingOptionsSchema = z.object({
	id: z.string().optional(),
	desc: z.boolean().optional(),
}).optional();

export const queryOptionsSchema = z.object({
	paginationOptions: paginationOptionsSchema,
	sortingOptions: sortingOptionsSchema,
})

export type GeneratedFindOptions = {
	skip?: number | undefined;
	take?: number | undefined;
	orderBy?: Record<string, 'asc' | 'desc'> | undefined;
}
export function buildQueryFromOptions({
	paginationOptions,
	sortingOptions
} : z.infer<typeof queryOptionsSchema>): GeneratedFindOptions {
	return {
		skip: (paginationOptions?.pageIndex && paginationOptions.pageSize) ? paginationOptions.pageSize * paginationOptions.pageIndex : undefined,
		take: paginationOptions?.pageSize ?? 10,
		orderBy: sortingOptions?.id ? {
			[sortingOptions.id]: sortingOptions.desc ? 'desc' : 'asc',
		} : undefined,
	}
}
