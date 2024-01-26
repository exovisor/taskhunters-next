import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import type {DefaultJWT} from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import { objectToAuthDataMap, AuthDataValidator } from "@telegram-auth/server";

import { createUserOrUpdate } from "@/lib/prisma";
import { env } from "@/env";
import { db } from "@/server/db";
import type {User} from "@/server/types";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		user: User | null;
	}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
		async jwt({ token, user}) {
			if (user) {
				token.user = {...user} as User;
			}
			return token;
		},
    session: ({ session, token }) => ({
			...session,
			user: {
				...session.user,
				...token.user,
				id: token.sub!,
			},
		}),
  },
  adapter: PrismaAdapter(db),
  providers: [
		CredentialsProvider({
			id: 'telegram-login',
			name: 'Telegram Login',
			credentials: {},
			async authorize(_credentials, req) {
				const validator = new AuthDataValidator({
					botToken: env.TELEGRAM_BOT_TOKEN,
				});

				const data = objectToAuthDataMap(req.query ?? {});
				const user = await validator.validate(data);

				if (user.id && user.first_name) {
					let returned = {
						telegram_id: user.id.toString(),
						username: user.username,
						display_name: [user.first_name, user.last_name ?? ""].filter(Boolean).join(" "),
						image: user.photo_url,
					} as User;

					try {
						const dbUser = await createUserOrUpdate(user);
						returned = {
							...returned,
							id: dbUser.id,
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							role: dbUser.role,
							studentProfileId: dbUser.studentProfileId
						}
					} catch {
						console.log(
							"Something went wrong while creating the user."
						);
					}

					return returned;
				}

				return null;
			},
		}),
  ],
	session: {
		strategy: 'jwt',
	},
	jwt: {
		maxAge: 24 * 60 * 60, // 1d
	}
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
