<script>
	import { page } from '$app/state'

</script>

<main data-column>
	{#if page.error}
		<h2>{page.status}</h2>

		<p>{page.error.message}</p>
	{/if}
</main>