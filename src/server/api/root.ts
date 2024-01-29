import { createTRPCRouter } from "@/server/api/trpc";

import { studentRouter } from "@/server/api/routers/student-router";
import { userRouter } from "@/server/api/routers/user-router";
import {dictionaryRouter} from "@/server/api/routers/dictionary-router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	student: studentRouter,
	user: userRouter,
	dictionaries: dictionaryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
