<script lang="ts">
	// Todo
	interface Todo {
		userId: number;
		id: number;
		title: string;
		completed: boolean;
	}
	let { data } = $props();
	const todos: Todo[] = $derived(data.todos);
</script>

<div>
	<h2>Dynamic Page</h2>

	<ul>
		{#each todos as todo (todo.id)}
			<li>
				<input type="checkbox" />
				{todo.title}
			</li>
		{/each}
	</ul>
</div>
