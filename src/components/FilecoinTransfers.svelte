<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { networkBySlug } from '$/data/networks'
	import { FilecoinTransactionProvider } from '$/data/filecoinTransactionProviders'

	
	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let transfers: Filecoin.Transfer[] = []
	export let transfersCount: number | undefined
	export let filecoinTransactionProvider: FilecoinTransactionProvider

	// (View options)
	export let title = 'Transfers'
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3
	export let isOpen: boolean


	// Components
	import Collapsible from './Collapsible.svelte'
	import FilecoinTransfer from './FilecoinTransfer.svelte'
	import InlineTransition from './InlineTransition.svelte'
	import ScrollContainer from './ScrollContainer.svelte'
	import TweenedNumber from './TweenedNumber.svelte'
</script>


<Collapsible
	type="label"
	title=""
	bind:isOpen
	canToggle={transfers.length > 0}
>
	<svelte:fragment slot="title">
		<slot name="title">
			<span class="row inline wrap">
				<svelte:element this={`h${headingLevel}`}>
					{title}
				</svelte:element>
				<small
					><span>(</span
					><InlineTransition
						align="end"
						clip
						isOpen={isOpen && transfersCount !== undefined}
					><span
						><TweenedNumber
							value={1}
						/> – <TweenedNumber
							value={transfers.length}
						/></span> of&nbsp;</InlineTransition
					><TweenedNumber
						value={transfersCount ?? transfers.length}
					/><span>)</span
				></small>
			</span>
		</slot>
	</svelte:fragment>
	
	<ScrollContainer
		isScrollEnabled={transfers.length > 7}
	>
		<ol class="column">
			{#each transfers as transfer}
				<li class="card">
					<FilecoinTransfer
						{network}
						{transfer}
						headingLevel={headingLevel + 1}
						layout="inline"
					/>
				</li>
			{/each}
		</ol>
	</ScrollContainer>
</Collapsible>


<style>
	small {
		opacity: 0.66;
	}
</style>
