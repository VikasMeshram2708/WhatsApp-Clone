<script lang="ts">
	import { enhance } from '$app/forms';
	import { LoaderCircle, X } from 'lucide-svelte';
	let { form } = $props();
	let isPending = $state(false);
	let showMessage = $state(true);

	function dismissMessage() {
		showMessage = false;
	}
</script>

{#if form && !form?.success && showMessage && !form.validationError}
	<div
		class="bg-primary-500 alert alert-error mx-auto flex max-w-sm items-center justify-between rounded px-4 py-2"
	>
		<p>{form?.message ?? 'Failed'}</p>
		<button class="btn btn-icon" onclick={dismissMessage}>
			<X />
		</button>
	</div>
{/if}

{#if form?.success && showMessage}
	<div
		class="bg-primary-500 alert alert-success mx-auto flex max-w-sm items-center justify-between rounded px-4 py-2"
	>
		<p>{form?.message ?? 'Registered'}</p>
		<button class="btn btn-icon" onclick={dismissMessage}>
			<X />
		</button>
	</div>
{/if}

<div class="py-10">
	<form
		use:enhance={async () => {
			isPending = true;
			return ({ update }) => {
				update({ invalidateAll: true }).finally(async () => {
					isPending = false;
				});
			};
		}}
		action="?/register"
		method="POST"
		class="mx-auto max-w-sm space-y-4"
	>
		<h2 class="text-center text-2xl font-medium">Register Page</h2>
		<div>
			<label for="name" class="label-text">Name</label>
			<input class="input" type="text" name="name" placeholder="Enter name" />
			{#if form && !form?.success && form?.validationError}
				<small class="text-sm font-medium text-red-500"
					>{form?.message?.name ? form?.message?.name : 'Invalid name'}</small
				>
			{/if}
		</div>
		<div>
			<label for="email" class="label-text">Email</label>
			<input class="input" type="email" name="email" placeholder="Enter email" />
			{#if form && !form?.success && form?.validationError}
				<small class="text-sm font-medium text-red-500"
					>{form?.message?.email ? form?.message?.email : 'Invalid email'}</small
				>
			{/if}
		</div>
		<div>
			<label for="password" class="label-text">Password</label>
			<input class="input" type="password" name="password" placeholder="Enter password" />
			{#if form && !form?.success && form?.validationError}
				<small class="text-sm font-medium text-red-500"
					>{form?.message?.password ? form?.message?.password : 'Invalid password'}</small
				>
			{/if}
		</div>
		<button disabled={isPending} type="submit" class="btn preset-filled-tertiary-500">
			{#if isPending}
				<LoaderCircle />
			{:else}
				Submit
			{/if}
		</button>
		<p>
			Already an user
			<span>
				<a href="/login">? Login</a>
			</span>
		</p>
		<p class="text-center text-sm">
			By registering, you agree to our
			<a href="/terms" class="text-blue-500 underline">Terms of Service</a> and
			<a href="/privacy" class="text-blue-500 underline">Privacy Policy</a>.
		</p>
	</form>
</div>
