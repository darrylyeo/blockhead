<script lang="ts">
	// Inputs
	export let isScrollEnabled = true
	export let pagination: Loader['$$slot_def']['default']['pagination']

	// (View options)
	export let margin: number | undefined
	export let defaultHeight: string


	// Components	
	import Loader from './Loader.svelte'
	import Visible from './Visible.svelte'
</script>


<div
	class="column {$$restProps.class}"
	class:scrollable-list={isScrollEnabled}
	style:--resizeVertical-defaultHeight={defaultHeight}
	{...$$restProps}
>
	{#if pagination?.hasPreviousPage}
		<Visible
			{margin}
			onVisible={() => { pagination?.fetchPreviousPage() }}
		>
			<slot name="before" />
		</Visible>
	{/if}

	<slot />

	{#if pagination?.hasNextPage}
		<Visible
			{margin}
			onVisible={() => { pagination?.fetchNextPage() }}
		>
			<slot name="after" />
		</Visible>
	{/if}
</div>
