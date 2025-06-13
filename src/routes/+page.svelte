<script lang="ts">
	export let data;
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

<div class="mx-auto min-h-screen w-full max-w-7xl p-4">
	<article
		class="card preset-outlined-tertiary-500 grid grid-cols-1 items-center gap-6 p-5 md:grid-cols-2"
	>
		<div class="flex flex-col">
			<h2 class="text-2xl font-bold">Home Page</h2>
			<p class="text-gray-600">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, quisquam?
			</p>
			<div class="mt-4 flex items-center gap-4">
				<button
					type="button"
					class="btn preset-outlined-tertiary-500 hover:bg-tertiary-100 transition"
					aria-label="Outlined Button"
				>
					Lorem, ipsum.
				</button>
				<button
					type="button"
					class="btn preset-filled-tertiary-500 hover:bg-tertiary-600 transition"
					aria-label="Filled Button"
				>
					Lorem, ipsum.
				</button>
			</div>
			<nav class="mt-6">
				<ul class="flex flex-wrap gap-4">
					{#each links as link (link.href)}
						<li>
							<a
								href={link.href}
								class="text-tertiary-500 hover:underline"
								aria-label={`Navigate to ${link.title}`}
							>
								{link.title}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
		<div class="relative">
			<img
				src="https://placehold.co/400x250"
				alt="Random Nature"
				class="h-auto w-full rounded shadow-md"
			/>
		</div>
	</article>
</div>
