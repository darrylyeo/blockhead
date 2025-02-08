<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { networkBySlug } from '$/data/networks'

	
	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let blocks: Filecoin.Block[] = []

	// (View options)
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3
	export let isOpen: boolean


	// Components
	import AnchorLink from './AnchorLink.svelte'
	import Collapsible from './Collapsible.svelte'
	import FilecoinBlock from './FilecoinBlock.svelte'
	import InlineTransition from './InlineTransition.svelte'
	import TweenedNumber from './TweenedNumber.svelte'
</script>


<Collapsible
	type="label"
	bind:isOpen
>
	<svelte:fragment slot="title">
		<slot name="title">
			<span class="row inline wrap">
				<svelte:element this={`h${headingLevel}`}>
					Blocks
				</svelte:element>
				<small
					><span>(</span
					><InlineTransition
						align="end"
						clip
						isOpen={isOpen && blocks.length !== undefined}
					><span
						><TweenedNumber
							value={1}
						/> – <TweenedNumber
							value={blocks.length}
						/></span> of&nbsp;</InlineTransition
					><TweenedNumber
						value={blocks.length}
					/><span>)</span
				></small>
			</span>
		</slot>
	</svelte:fragment>
	
	<div class="blocks-list column" class:scrollable-list={blocks.length > 7}>
		{#each blocks as block (block.cid)}
			<AnchorLink
				class="card"
				base={`/explorer/${network.slug}`}
				link={`/block/${block.cid}`}
			>
				<FilecoinBlock
					{block}
					headingLevel={headingLevel + 1}
					isOpen
				/>
			</AnchorLink>
		{/each}
	</div>
</Collapsible>


<style>
	small {
		opacity: 0.5;
	}
</style>
