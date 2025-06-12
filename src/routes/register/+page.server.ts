import { db } from '$lib/server/db/index.js';
import bcrypt from 'bcryptjs';
import { registerSchema } from '../../../models/user.js';
import { flattenError } from 'zod/v4';
import { userTable } from '$lib/server/db/schema.js';
import { mailOnRegister } from '$lib';

export const actions = {
	register: async ({ request }: { request: Request }) => {
		try {
			const body = await request.formData();
			const user = {
				name: body.get('name'),
				email: body.get('email'),
				password: body.get('password')
			};
			console.log('User data:', user);
			// sanitize
			const parsed = registerSchema.safeParse(user);
			if (!parsed.success) {
				return {
					success: false,
					message: flattenError(parsed.error).fieldErrors,
					validationError: true
				};
			}
			const { email, name, password } = parsed.data;
			// check if email already in use
			const emailInUse = await db.query.userTable.findFirst({
				where: (f, { eq }) => eq(f.email, email)
			});
			if (emailInUse) {
				return {
					success: false,
					message: 'Email already in use'
				};
			}
			// hash the password
			const hashedPassword = await bcrypt.hash(password, 10);
			// register the user
			await db.insert(userTable).values({
				email: email,
				password: hashedPassword,
				name: name
			});
			// send the mail
			await mailOnRegister({ clientEmail: email });
			// return he response
			return {
				success: true,
				message: 'User registered successfully'
			};
		} catch (e) {
			console.log(e);
			return {
				success: false,
				message: (e as Error).message ?? 'Something went wrong. Register failed.'
			};
		}
	}
};
