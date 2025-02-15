<script lang="ts">
	// Types/constants
	import type { NetworkAccountAddress } from '$/data/address'
	import type { Ethereum } from '$/data/networks/types'
	import { AccountIdType } from '$/data/accountId'


	// Inputs
	export let network: Ethereum.Network | undefined
	export let address: NetworkAccountAddress
	export let resolveToEnsName = false

	// (View options)
	export let format: 'full' | 'middle-truncated' = 'full'
	export let linked = true
	export let truncateOptions: Pick<TruncatedValue['$$prop_def'], 'startLength' | 'endLength'> | undefined


	// Functions
	import { formatAddress } from '$/utils/formatAddress'
	import { resolveRoute } from '$app/paths'


	// Internal state
	// (Computed)
	$: link = linked && network && address ? resolveRoute(`/explorer/[networkSlug]/address/[address]`, { networkSlug: network.slug, address }) : undefined


	// Actions
	const onDragStart = (e: DragEvent) => {
		e.dataTransfer?.setData('text/plain', address)
		if(link) e.dataTransfer?.setData('text/uri-list', link)
	}


	// Components
	import AccountIdResolver from './AccountIdResolver.svelte'
	import TruncatedValue from './TruncatedValue.svelte'
</script>


<AccountIdResolver
	accountId={address}
	resolveToName={resolveToEnsName ? AccountIdType.EnsName : false}
	passiveResolveToName
	loaderViewOptions={{
		layout: 'passive',
	}}
	let:ensName
>
	{@const formattedAddress = ensName || formatAddress(address, format)}

	{#if link}
		<a
			class="address"
			href={link}
			draggable={true}
			on:dragstart={onDragStart}
		>
			<slot {formattedAddress}>
				<span class="monospace">{#if !ensName}{#if format === 'full'}{address}{:else}<TruncatedValue value={address} {...truncateOptions} />{/if}{:else}<span class="monospace">{ensName}</span>{/if}</span>
			</slot>
		</a>
	{:else}
		<span>
			<slot {formattedAddress}>
				<span
					class="address monospace"
					draggable={true}
					on:dragstart={onDragStart}
				>{#if !ensName}{#if format === 'full'}{address}{:else}<TruncatedValue value={address} {...truncateOptions} />{/if}{:else}<span class="monospace">{ensName}</span>{/if}</span>
			</slot>
		</span>
	{/if}
</AccountIdResolver>
