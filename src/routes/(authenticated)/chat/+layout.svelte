<script lang="ts">
	import { onMount } from 'svelte';
	import type { User } from '../../../globals';
	let { children } = $props();

	let users = $state<User[]>([]);

	onMount(() => {
		async function getUsers() {
			const res = await fetch('https://jsonplaceholder.typicode.com/users');
			if (!res.ok) return undefined;
			users = await res.json();
		}
		getUsers();
	});
</script>

<div>
	<div class="mx-auto max-w-7xl p-6">
		<article class="card flex min-h-svh gap-4 border p-5">
			<!-- left side chat view -->
			<aside class="w-full max-w-xs overflow-y-auto rounded border p-5">
				<h2 class="px-5 py-5 text-2xl font-medium">Whatsapp Clone</h2>
				<ul class="grid gap-4">
					{#each users as user (user?.id)}
						<li class="hover:bg-primary-500 cursor-pointer rounded px-4 py-2">
							<a href="/chat/{user.id}">{user.name}</a>
						</li>
					{/each}
				</ul>
			</aside>
			<!-- right side chat view -->
			<aside class="flex-1 overflow-y-auto rounded border p-5">
				{@render children()}
			</aside>
		</article>
	</div>
</div>
