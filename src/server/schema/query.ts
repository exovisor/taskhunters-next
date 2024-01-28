import {z} from "zod";

export const paginationOptionsSchema = z.object({
	pageIndex: z.number().optional(),
	pageSize: z.number().optional(),
}).optional()

export const queryOptionsSchema = z.object({
	paginationOptions: paginationOptionsSchema
})

export type GeneratedFindOptions = {
	skip: number | undefined;
	take: number | undefined;
}
export function buildQueryFromOptions({
	paginationOptions
} : z.infer<typeof queryOptionsSchema>): GeneratedFindOptions {
	return {
		skip: (paginationOptions?.pageIndex && paginationOptions.pageSize) ? paginationOptions.pageSize * paginationOptions.pageIndex : undefined,
		take: paginationOptions?.pageSize ?? 10
	}
}
