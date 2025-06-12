<script lang="ts">
	import '../app.css';
	import Navbar from '../components/navbar.svelte';

	let { children, data } = $props();
	const { session } = data;
</script>

<Navbar {session} />
{@render children()}
