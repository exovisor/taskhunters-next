import { db } from '@/server/db';
import {createTRPCRouter, adminProcedure} from "@/server/api/trpc";
import {userIdSchema} from "@/server/schema/user";
import {buildQueryFromOptions, queryOptionsSchema} from "@/server/schema/query";

export const userRouter = createTRPCRouter({
	getUsers: adminProcedure
		.input(queryOptionsSchema)
		.query(async ({ input: options}) => {
			const { where, ...query } = buildQueryFromOptions(options);
			const [users, totalUsers] = await db.$transaction([
				db.user.findMany({
					...query,
					where: where
				}),
				db.user.count({
					where: where
				})
			]);
			return {
				rows: users,
				meta: {
					totalCount: totalUsers
				}
			}
		}),

	deleteUser: adminProcedure
		.input(userIdSchema)
		.mutation(async ({ input: { id }}) => {
			return db.user.delete({
				where: {
					id: id
				}
			});
		})
});