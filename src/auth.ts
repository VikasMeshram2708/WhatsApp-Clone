import { AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import { db } from '$lib/server/db';
import { userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { mailOnLogin } from '$lib';

// console.log('env', AUTH_SECRET);
export const { handle } = SvelteKitAuth({
	theme: {
		buttonText: 'Whatsapp Clone',
		brandColor: '#25D366', // Added branch color (WhatsApp green)
		colorScheme: 'dark',
		logo: 'https://placehold.co/100x100/000000/FFFFFF'
	},
	session: {
		strategy: 'jwt',
		maxAge: 3600
	},
	providers: [
		Google({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		})
	],
	callbacks: {
		signIn: async ({ user, account }) => {
			const userExists = await db.query.userTable.findFirst({
				where: eq(userTable.email, user?.email as string)
			});
			if (account?.provider === 'google') {
				// check if user already exists
				if (!userExists) {
					// save the user in db
					await db.insert(userTable).values({
						name: user?.name ?? '',
						email: user?.email ?? '',
						picture: user?.image ?? ''
					});
					// send the mail
					await mailOnLogin({ clientEmail: user?.email as string });
				} else {
					// update the last login
					await db
						.update(userTable)
						.set({
							lastLogin: new Date()
						})
						.where(eq(userTable.email, user?.email as string));
					// send the mail
					await mailOnLogin({ clientEmail: user?.email as string });
				}
			}
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
