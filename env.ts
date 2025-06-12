import * as z from 'zod/v4';

const envSchema = z.object({
	DATABASE_URL: z.string(),
	AUTH_SECRET: z.string(),
	AUTH_BASE_URL: z.string()
});

let env;

try {
	// Validate environment variables
	env = envSchema.parse({
		DATABASE_URL: process.env.DATABASE_URL,
		AUTH_SECRET: process.env.AUTH_SECRET,
		AUTH_BASE_URL: process.env.AUTH_BASE_URL
	});
} catch (error) {
	console.error('Invalid environment variables:', error);
	process.exit(1); // Exit the process if validation fails
}

export default env;
