import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch, depends }) => {
	// tell TypeScript what `params` looks like
	const { id } = params as { id: string };

	depends(`user:todos:${id}`);

	const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`);

	if (!res.ok) throw new Error('Failed to fetch the todos');

	return {
		todos: await res.json()
	};
};
