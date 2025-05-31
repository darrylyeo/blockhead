<script lang="ts">
	// Types/constants
	import type { Snippet } from 'svelte'


	// Props
	let {
		level = 1,
		children,
	}: {
		level?: 1 | 2 | 3 | 4 | 5 | 6
		children: Snippet
	} = $props()
</script>


<svelte:element this={`h${level}`}>
	{@render children()}
</svelte:element>
