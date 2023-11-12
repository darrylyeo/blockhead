<script lang="ts">
	// Types
	import type { Root } from '@wooorm/starry-night/lib'


	// Inputs
	export let node: Root | Root['children'][number]
</script>


<svelte:element
	this={node.type === 'root' ? 'code' : node.type === 'element' ? node.tagName : 'span'}
	{...$$restProps}
	{...'properties' in node && Object.fromEntries(
		Object.entries(node.properties)
			.map(([attribute, value]) => [attribute === 'className' ? 'class' : attribute, value])
	)}
>
	{#if node.type === 'root' || node.type === 'element'}
		{#each node.children as childNode}
			<svelte:self node={childNode} />
		{/each}
	{:else if node.type === 'text'}
		{node.value}
	{/if}
</svelte:element>


<style>
	@import '@wooorm/starry-night/style/both';

	code {
		display: block;
	}
</style>
