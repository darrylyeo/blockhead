<script lang="ts">
	// Types/constants
	import type { NetworkAccountAddress } from '$/data/address'
	import type { Ethereum } from '$/data/networks/types'
	

	// Inputs
	export let network: Ethereum.Network
	export let address: NetworkAccountAddress | undefined
	export let label: string | undefined

	export let format: 'label' | 'address' | 'both' | 'address-label' = 'label'
	export let addressFormat: 'full' | 'middle-truncated'
	export let linked = true


	// Internal state
	$: parts = (
		(
			{
				'label': ['label'],
				'address': ['address'], 
				'both': ['label', 'address'],
				'address-label': ['address', 'label']
			} as const
		)
			[format]
			.filter(part => (
				part === 'label' ?
					Boolean(label)
				: part === 'address' ?
					Boolean(address)
				:
					false
			))
	)


	// Components
	import Address from './Address.svelte'


	// Transitions/animations
	import { flip } from 'svelte/animate'
	import { expoOut } from 'svelte/easing'
</script>


<span class="address-with-label row inline wrap"
	data-format={format}
>
	{#each parts as part, i (part)}
		<span
			animate:flip={{ duration: 300, easing: expoOut }}
		>
			{#if i > 0}<span>(</span>{/if
			}{#if part === 'label' && label
				}<span class="label"><Address
						{network}
						{address}
						format={addressFormat}
						{linked}
					>{label}</Address></span>{:else if address
				}<span class="address"
					><Address
						{network}
						{address}
						format={addressFormat}
						{linked}
					/></span
			>{/if
			}{#if i > 0}<span>)</span>{/if}
		</span>
	{/each}
</span>


<style>
	.address-with-label {
		> span {
			transition-property:
				font-size,
				font-weight
			;

			&:nth-of-type(2) {
				font-size: 0.75em;
				font-weight: normal;
			}

			> span {
				display: inline-flex;
			}
		}
	}
</style>
