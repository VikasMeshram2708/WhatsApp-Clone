<script lang="ts">
	export let data;
	const { session } = data;
</script>

<div class="min-h-screen w-full">
	<h1 class="text-2xl font-semibold">This is Index Page</h1>
	<pre>{JSON.stringify(session, null, 2)}</pre>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>
</div>
