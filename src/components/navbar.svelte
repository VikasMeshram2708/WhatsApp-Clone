<script lang="ts">
	import { MessageCircle } from 'lucide-svelte';
</script>

<nav class="w-full p-4">
	<div class="mx-auto max-w-7xl">
		<div class="flex items-center justify-between">
			<h2 class="flex items-center gap-1 text-2xl font-medium">
				<MessageCircle />
				<a href="/"> AurKya </a>
			</h2>
			<div class="flex items-center gap-4">
				<button type="button" class="btn">
					<a href="/login">Login</a>
				</button>
				<button type="button" class="btn bg-primary-500">
					<a href="/register">Register</a>
				</button>
			</div>
		</div>
	</div>
</nav>
