import { db } from '@/server/db';
import {createTRPCRouter, adminProcedure} from "@/server/api/trpc";
import {userIdSchema} from "@/server/schema/user";

export const userRouter = createTRPCRouter({
	getUsers: adminProcedure
		.query(async () => {
			return db.user.findMany()
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
