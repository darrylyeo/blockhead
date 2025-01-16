<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { Filecoin } from '$/data/filecoin'
	import { networkBySlug } from '$/data/networks'

	const link = 'https://docs.filecoin.io/smart-contracts/filecoin-evm-runtime/address-types'


	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let address: Filecoin.Address

	// (View options)
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3


	// Functions
	import { isEvmAddress } from '$/utils/isEvmAddress'


	// Internal state
	$: addressPrefix = address.match(/^[ft][0-9]/)?.[0] ?? undefined

	$: addressType = (
		addressPrefix ?
			Number(addressPrefix[1]) as Filecoin.AddressType

		: isEvmAddress(address) ?
			Filecoin.AddressType.Extensible

		:
			undefined
	)

	$: addressTypeConfig = addressType !== undefined && Filecoin.addressTypes[addressType]

	$: addressManagerActorAddress = (
		addressType === Filecoin.AddressType.Extensible &&
			address.match(/^([ft])4([0-9]+)/)?.slice(1, 3).join('0')
		||
			undefined
	)


	// Components
	import AddressWithLabel from './AddressWithLabel.svelte'
	import InlineTransition from './InlineTransition.svelte'
</script>


<section class="card">
	<header class="bar wrap">
		<svelte:element this={`h${headingLevel}`}>Address Details</svelte:element>
	</header>

	<hr>

	<dl>
		<dt>
			<a href={link} target="_blank">Type</a>
		</dt>
		<dd>
			{#if addressTypeConfig}
				<a
					href={addressTypeConfig.link}
					title={addressTypeConfig.description}
					target="_blank"
				>
					{addressTypeConfig.name}
					{#if addressPrefix}<small>(<output>{addressPrefix}</output>)</small>{/if}
				</a>
			{:else}
				<output>{addressPrefix}</output>
			{/if}
		</dd>

		{#if addressManagerActorAddress}
			<dt>Address Manager</dt>
			<dd>
				<InlineTransition align="start"
					key={addressManagerActorAddress}
				>
					<AddressWithLabel
						{network}
						label="Ethereum Address Manager"
						address={addressManagerActorAddress}
						format="address-label"
						addressFormat="middle-truncated"
					/>
				</InlineTransition>
			</dd>
		{/if}
	</dl>
</section>
