<script lang="ts">
	// Types/constants
	import type { NetworkAccountAddress } from '../data/address'
	import type { Ethereum } from '../data/networks/types'
	

	// Inputs
	export let network: Ethereum.Network
	export let address: NetworkAccountAddress | undefined
	export let label: string | undefined

	export let format: 'label' | 'address' | 'both' = 'label'
	export let addressFormat: 'full' | 'middle-truncated'
	export let linked: boolean


	// Internal state
	let computedFormat: 'label' | 'address' | 'both'
	// (Computed)
	$: computedFormat =
		format === 'both' ?
			(label && !address) ?
				'label'
			: (!label && address) ?
				'address'
			:
				'both'
		: format === 'label' ?
			label ?
				'label'
			:
				'address'
		:
			'address'


	// Components
	import Address from './Address.svelte'
	import InlineContainer from './InlineContainer.svelte'
</script>


<span class="address-with-label"
	data-format={computedFormat}
>
	<InlineContainer isOpen={computedFormat === 'label' || computedFormat === 'both'}>
		<Address {network} {address} format={addressFormat} {linked}>
			<span class="label">{label}</span>
		</Address>
	</InlineContainer>

	<InlineContainer isOpen={computedFormat === 'address' || computedFormat === 'both'}>
		<span class="address">
			{#if label}({/if}<Address {network} {address} format={addressFormat} {linked} />{#if label}){/if}
		</span>
	</InlineContainer>
</span>


<style>
	.address-with-label[data-format=both] .address {
		font-size: 0.75em;
		font-weight: normal;
	}
</style>
