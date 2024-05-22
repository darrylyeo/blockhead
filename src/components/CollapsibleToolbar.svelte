<script lang="ts">
	// Inputs
	export let breakpointWidth = '40rem'


	// Components
	import Collapsible from '$/components/Collapsible.svelte'


	// Style/transitions
	import { scale } from 'svelte/transition'

	import { matchesMediaQuery } from '$/utils/matchesMediaQuery'
	let hasCollapsedNavigation = matchesMediaQuery(`(max-width: ${breakpointWidth})`) 
	$: hasCollapsedNavigation = matchesMediaQuery(`(max-width: ${breakpointWidth})`)
</script>


<Collapsible
	type="details"
	{...$$restProps}
	canToggle={$hasCollapsedNavigation}
>
	<svelte:fragment slot="title">
		<slot name="title" />
	</svelte:fragment>

	<svelte:fragment slot="toolbar">
		{#if !$hasCollapsedNavigation}
			<div
				role="toolbar"
				class="default-size row wrap align-end"
				transition:scale={{ duration: 200 }}
			>
				<slot />
			</div>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="trigger-text">
		<slot name="trigger-text">
			Navigate
		</slot>
	</svelte:fragment>

	{#if $hasCollapsedNavigation}
		<div
			role="toolbar"
			class="row wrap align-end"
			transition:scale={{ duration: 200 }}
		>
			<slot />
		</div>
	{/if}
</Collapsible>


<style>
	.default-size {
		font-size: 1em;
	}
</style>
