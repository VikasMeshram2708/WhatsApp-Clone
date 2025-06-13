import * as z from 'zod/v4';

const envSchema = z.object({
	DATABASE_URL: z.string(),
	AUTH_SECRET: z.string(),
	AUTH_BASE_URL: z.string(),
	MAIL_HOST: z.string(),
	MAIL_PORT: z.string(),
	MAIL_USER: z.string(),
	MAIL_PASS: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string()
});

let env;

try {
	// Validate environment variables
	env = envSchema.parse({
		DATABASE_URL: process.env.DATABASE_URL,
		AUTH_SECRET: process.env.AUTH_SECRET,
		AUTH_BASE_URL: process.env.AUTH_BASE_URL,
		MAIL_HOST: process.env.MAIL_HOST,
		MAIL_PORT: process.env.MAIL_PORT,
		MAIL_USER: process.env.MAIL_USER,
		MAIL_PASS: process.env.MAIL_PASS,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
	});
} catch (error) {
	console.error('Invalid environment variables:', error);
	process.exit(1); // Exit the process if validation fails
}

export default env;
