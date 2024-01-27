import { db } from '@/server/db';
import {createTRPCRouter, studentProcedure} from "@/server/api/trpc";
import {studentProfileIdSchema, updateStudentProfileSchema} from "@/server/schema/user";

export const studentRouter = createTRPCRouter({
	getProfileByUserId: studentProcedure
		.input(studentProfileIdSchema)
		.query(async ({ input: { id }}) => {
			return db.studentProfile.findFirst({
				where: {
					id: id
				}
			})
		}),
	createOrUpdateStudentProfile: studentProcedure
		.input(updateStudentProfileSchema)
		.mutation(async ({ input: profile}) => {
			return db.user.update({
				where: { id: profile.userId },
				data: {
					email: profile.email,
					studentProfile: {
						upsert: {
							create: { fullname: profile.fullname, phone: profile.phone },
							update: { fullname: profile.fullname, phone: profile.phone}
						}
					}
				}
			})
		})
});
