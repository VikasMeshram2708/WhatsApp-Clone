export const actions = {
	register: async ({ request }: { request: Request }) => {
		// TODO: log the user
		const body = await request.formData();
		const data = Object.fromEntries(body);
		console.log('User data:', data);
	}
};
