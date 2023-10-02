<script lang="ts">
	// Types/constants
	import type { Filecoin } from '../data/filecoin'

	
	// Inputs
	export let blocks: Filecoin.Block[] = []
	// (View options)
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3
	export let isOpen: boolean


	// Components
	import Collapsible from './Collapsible.svelte'
	import FilecoinBlock from './FilecoinBlock.svelte'
	import TweenedNumber from './TweenedNumber.svelte'
</script>


<Collapsible
	type="label"
	bind:isOpen
>
	<svelte:fragment slot="title">
		<svelte:element this={`h${headingLevel}`}>
			Blocks
			<span>(<TweenedNumber value={blocks.length} />)</span>
		</svelte:element>
	</svelte:fragment>
	
	<div class="blocks-list column" class:scrollable-list={blocks.length > 7}>
		{#each blocks as block (block.id)}
			<div class="card">
				<FilecoinBlock
					{block}
					isOpen
				/>
			</div>
		{/each}
	</div>
</Collapsible>
