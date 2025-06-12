<script lang="ts">
	import { User } from 'lucide-svelte';

	export let data;
	const { session } = data;
	const links = [
		{
			title: 'Test1',
			href: '/test1'
		},
		{
			title: 'Test2',
			href: '/test2'
		},
		{
			title: 'Test3',
			href: '/test3'
		}
	];
</script>

<div class="mx-auto min-h-screen w-full max-w-7xl">
	<article class="rounded-lg border-2">
		<aside class="bg-secondary-500/20 min-h-svh w-96 space-y-5 overflow-y-auto p-5">
			<h2 class="border-b p-2 text-2xl font-medium">Hello, {session?.user?.name ?? 'No User'}</h2>
			<nav>
				<ul class="space-y-4 text-lg font-medium">
					{#each links as link (link.href)}
						<li class="hover:bg-secondary-500 flex items-center gap-2 rounded p-2">
							<User class="h-5 w-5" />
							<a href="/">
								{link.title}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>
	</article>
</div>
