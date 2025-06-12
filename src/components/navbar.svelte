<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { LogOut, MessageCircle } from 'lucide-svelte';
	const { session } = $props();

	async function handleSignOut() {
		try {
			await signOut();
		} catch (error) {
			alert((error as Error)?.message ?? 'Something went wrong. Sign out failed');
		}
	}
</script>

<nav class="w-full p-4">
	<div class="mx-auto max-w-7xl">
		<div class="flex items-center justify-between">
			<h2 class="flex items-center gap-1 text-2xl font-medium">
				<MessageCircle />
				<a href="/"> WhatsApp Clone </a>
			</h2>
			{#if session && session?.user}
				<button type="button" class="btn preset-outlined-primary-500" onclick={handleSignOut}>
					<LogOut />
					Logout
				</button>
			{:else}
				<div class="flex items-center gap-4">
					<button type="button" class="btn">
						<a href="/login">Login</a>
					</button>
					<button type="button" class="btn bg-primary-500">
						<a href="/register">Register</a>
					</button>
				</div>
			{/if}
		</div>
	</div>
</nav>
