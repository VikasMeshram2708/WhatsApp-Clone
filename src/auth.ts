import { AUTH_SECRET } from '$env/static/private';
import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';
import { loginSchema } from '../models/user';
import { db } from '$lib/server/db';
import bcrypt from 'bcryptjs';
import { userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { mailOnLogin } from '$lib';

console.log('env', AUTH_SECRET);
export const { handle } = SvelteKitAuth({
	session: {
		strategy: 'jwt',
		maxAge: 3600
	},
	providers: [
		Credentials({
			credentials: {
				email: {
					type: 'text',
					label: 'Email',
					placeholder: 'johndoe@example.com'
				},
				password: {
					type: 'password',
					label: 'Password',
					placeholder: '********'
				}
			},
			authorize: async ({ email, password }) => {
				try {
					if (!email || !password) return null;
					// sanitize the incoming data
					const parsed = loginSchema.safeParse({ email, password });
					if (!parsed.success) return null;
					// check user exists
					const userExists = await db.query.userTable.findFirst({
						where: (f, { eq }) => eq(f.email, email as string)
					});

					console.log('userExists', userExists);

					if (!userExists) return null;

					// compare the password
					const isValidPass = await bcrypt.compare(
						password as string,
						userExists.password as string
					);
					if (!isValidPass) return null;
					// update the lastLogin
					await db
						.update(userTable)
						.set({
							lastLogin: new Date()
						})
						.where(eq(userTable.email, userExists?.email));
					// send the mail
					await mailOnLogin({ clientEmail: email as string });
					return {
						email: userExists.email,
						name: userExists.name
					};
				} catch (error) {
					throw new Error((error as Error).message ?? 'Something went wrong. Please try again.');
				}
			}
		})
	],
	callbacks: {
		signIn: async ({ user, credentials }) => {
			console.log('sign-in-user', JSON.stringify(user));
			if (!credentials) return false;
			return true;
		},
		jwt: async ({ user, token }) => {
			if (user) {
				user.email = token.email as string;
				user.name = token.name as string;
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (token) {
				session.user.email = token.email as string;
				session.user.name = token.name as string;
			}
			return session;
		}
	},
	secret: AUTH_SECRET
});
