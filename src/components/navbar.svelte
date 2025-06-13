<script lang="ts">
	import type { Session } from '@auth/sveltekit';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { LogOut, MessageCircle } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	const { session }: { session: Session } = $props();
	let dropdownOpen = $state(false);

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	async function handleSignOut() {
		try {
			await signOut();
		} catch (error) {
			alert((error as Error)?.message ?? 'Something went wrong. Sign out failed');
		}
	}
</script>

<nav class="w-full p-4 shadow-sm">
	<div class="mx-auto flex max-w-7xl items-center justify-between">
		<h2 class="flex items-center gap-2 text-2xl font-bold">
			<MessageCircle class="" />
			<a href="/">WhatsApp Clone</a>
		</h2>

		{#if session?.user}
			<div class="flex items-center gap-2">
				<!-- Profile Dropdown -->
				<div class="relative">
					<button
						class="flex items-center gap-2 rounded-full px-3 py-2 transition"
						onclick={toggleDropdown}
					>
						{#if session.user.image}
							<img
								src="https://ui-avatars.com/api/?name={decodeURIComponent(
									session.user?.name ?? 'U'
								)}"
								alt={session?.user?.name ?? 'User'}
								class="h-10 w-10 rounded-full border-2 object-cover"
								loading="lazy"
							/>
						{:else}
							<div class="skeleton h-8 w-8 rounded-full"></div>
						{/if}
					</button>

					{#if dropdownOpen}
						<div
							in:fade
							out:fade
							class="ring-opacity-5 bg-primary-500 absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black"
						>
							<a href="/chat" class="hover:bg-primary-400 block px-4 py-2 text-sm">Chat</a>
							<a href="/dashboard" class="hover:bg-primary-400 block px-4 py-2 text-sm">Dashboard</a
							>
							<a href="/profile" class="hover:bg-primary-400 block px-4 py-2 text-sm">Profile</a>
							<a href="/settings" class="hover:bg-primary-400 block px-4 py-2 text-sm">Settings</a>
						</div>
					{/if}
				</div>

				<!-- Sign Out Button -->
				<button
					type="button"
					class="btn btn-outline btn-error flex items-center gap-1"
					onclick={handleSignOut}
				>
					<LogOut class="h-4 w-4" />
					Logout
				</button>
			</div>
		{:else}
			<!-- Google Sign In Button -->
			<button
				onclick={() =>
					signIn('google', {
						redirect: true,
						callbackUrl: '/chat'
					})}
				type="button"
				class="btn btn-outline btn-accent flex items-center gap-2"
			>
				<img
					src="https://www.svgrepo.com/show/475656/google-color.svg"
					alt="Google"
					class="h-5 w-5"
				/>
				<span>Sign in with Google</span>
			</button>
		{/if}
	</div>
</nav>
