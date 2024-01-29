import {adminProcedure, createTRPCRouter, protectedProcedure} from "@/server/api/trpc";
import {
	dictionaryCreateSchema,
	dictionaryIdSchema,
	dictionaryUpdateSchema
} from "@/server/schema/dictionary";
import {db} from "@/server/db";
import {buildQueryFromOptions, queryOptionsSchema} from "@/server/schema/query";
import {Prisma} from "@prisma/client";
import InstituteWhereInput = Prisma.InstituteWhereInput;

export const dictionaryRouter = createTRPCRouter({
	// Institutes CRUD
	getInstitutes: protectedProcedure
		.input(queryOptionsSchema)
		.query(async ({ input: options}) => {
			const {where, ...query} = buildQueryFromOptions(options);
			const [institutes, totalInstitutes] = await db.$transaction([
				db.institute.findMany({
					...query,
					where: where as InstituteWhereInput
				}),
				db.institute.count({
					where: where as InstituteWhereInput
				})
			]);
			return {
				rows: institutes,
				meta: {
					totalCount: totalInstitutes
				}
			}
		}),
	createInstitute: adminProcedure
		.input(dictionaryCreateSchema)
		.mutation(async ({ input: { name }}) => {
			return db.institute.create({
				data: {
					name: name
				}
			});
		}),
	updateInstitute: adminProcedure
		.input(dictionaryUpdateSchema)
		.mutation(async ({ input: { id, name }}) => {
			return db.institute.update({
				where: {
					id: id,
				},
				data: {
					name: name,
				}
			});
		}),
	deleteInstitute: adminProcedure
		.input(dictionaryIdSchema)
		.mutation(async ({ input: { id }}) => {
			return db.institute.delete({
				where: {
					id: id
				}
			});
		}),
});
