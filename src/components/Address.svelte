<script module lang="ts">
	// Types/constants
	export enum AddressFormat {
		Full = 'full',
		MiddleTruncated = 'middle-truncated',
	}
</script>


<script lang="ts">
	// Types/constants
	import type { NetworkAccountAddress } from '$/data/address'
	import type { Ethereum } from '$/data/networks/types'
	import { AccountIdType } from '$/data/accountId'


	// Props
	let {
		network,
		address,
		ensName,
		// (View options)
		format = AddressFormat.Full,
		linked = true,
	}: {
		network: Ethereum.Network
		address: NetworkAccountAddress
		ensName
		format?: AddressFormat
		linked?: boolean
	} = $props()


	// Functions
	import { formatAddress } from '$/utils/formatAddress'
	import { resolveRoute } from '$app/paths'


	// State
	let link = $derived(
		linked && network && address ?
			resolveRoute(`/explorer/[networkSlug]/address/[address]`, {
				networkSlug: network.slug,
				address
			})
		:
			undefined
	)


	// Actions
	const ondragstart = (e: DragEvent) => {
		e.dataTransfer?.setData('text/plain', address)
		if(link) e.dataTransfer?.setData('text/uri-list', link)
	}


	// Components
	import TruncatedValue from './TruncatedValue.svelte'
</script>


{#if link}
	<a
		class="address"
		href={link}
		draggable={true}
		{ondragstart}
	>
		<span data-text="font-monospace">{#if !ensName}<TruncatedValue value={address} />{:else}<span data-text="font-monospace">{ensName}</span>{/if}</span>
	</a>
{:else}
	<span
		class="address"
		data-text="font-monospace"
		draggable={true}
		{ondragstart}
	>{#if !ensName}<TruncatedValue value={address} />{:else}<span data-text="font-monospace">{ensName}</span>{/if}</span>
{/if}
