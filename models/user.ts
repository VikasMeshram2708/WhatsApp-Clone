/**
 * This file hold the user schema using zod
 */

import * as z from 'zod/v4';

export const registerSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100, 'Name should be less than 100 characters.'),
	email: z.email(),
	password: z
		.string()
		.min(5, 'Password are required')
		.max(100, 'Password should be less than 100 characters.')
});

export type RegisterSchema = z.infer<typeof registerSchema>;

// login
export const loginSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(5, 'Password are required')
		.max(100, 'Password should be less than 100 characters.')
});

export type LoginSchema = z.infer<typeof loginSchema>;
