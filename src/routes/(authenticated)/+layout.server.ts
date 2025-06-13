import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	// console.log('lay-se', session);
	if (!session?.user) throw redirect(303, '/auth/signin');
	return {
		session
	};
};
