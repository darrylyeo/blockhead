<script lang="ts">
	// Inputs
	export let pagination: Loader<any, any, any, any>['$$slot_def']['default']['pagination']
	export let margin: number | undefined


	// Components	
	import Loader from './Loader.svelte'
	import Visible from './Visible.svelte'
</script>


<div
	class="column scrollable-list"
	{...$$restProps}
>
	{#if pagination?.hasPreviousPage}
		<Visible
			{margin}
			onVisible={() => pagination?.fetchPreviousPage()}
		>
			<slot name="before" />
		</Visible>
	{/if}

	<slot />

	{#if pagination?.hasNextPage}
		<Visible
			{margin}
			onVisible={() => pagination?.fetchNextPage()}
		>
			<slot name="after" />
		</Visible>
	{/if}
</div>
