<script lang="ts">
</script>

<div class="py-10">
	<form action="?/register" method="POST" class="mx-auto max-w-sm space-y-4">
		<h2 class="text-center text-2xl font-medium">Register Page</h2>
		<div>
			<label for="name" class="label-text">Name</label>
			<input class="input" type="text" name="name" placeholder="Enter name" />
		</div>
		<div>
			<label for="email" class="label-text">Email</label>
			<input class="input" type="email" name="email" placeholder="Enter email" />
		</div>
		<div>
			<label for="password" class="label-text">Password</label>
			<input class="input" type="password" name="password" placeholder="Enter password" />
		</div>
		<button type="submit" class="btn preset-filled-tertiary-500">Submit</button>
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
