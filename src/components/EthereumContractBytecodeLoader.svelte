<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { NetworkProvider } from '$/data/networkProviders/types'
	import { networkProviderConfigByProvider } from '$/data/networkProviders'


	// Context
	import { preferences } from '$/state/preferences'
	
	
	// Inputs
	export let contractAddress: Ethereum.ContractAddress

	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider

	// (Computed)
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork

	$: viaRPC = networkProvider === NetworkProvider.Default ? '' : ` via ${networkProvider}`

	// (View options)
	export let loaderViewOptions: Partial<Loader<any, any, any, any>['viewOptions']> | undefined


	// Outputs
	export let contractBytecode: Ethereum.ContractBytecode | null

	type SharedSlotProps = {
		contractAddress: typeof contractAddress,
		contractBytecode: typeof contractBytecode,
		status: Loader<any, any, any, any>['status'],
		isOpen: Loader<any, any, any, 'collapsible'>['$$slot_def']['default']['isOpen'],
		toggle: Loader<any, any, any, 'collapsible'>['$$slot_def']['default']['toggle'],
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}
	

	// Functions
	import { createQuery } from '@tanstack/svelte-query'
	import { getBytecode } from 'viem/actions'


	// Components
	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>


<Loader
	viewOptions={loaderViewOptions}
	fromQuery={
		createQuery({
			queryKey: ['ContractBytecode', {
				networkProvider,
				chainId: network.chainId,
				contractAddress,
			}],
			queryFn: async ({
				queryKey: [_, {
					networkProvider,
				}],
			}) => {
				const { getViemPublicClient } = await import('$/data/networkProviders')

				const publicClient = await getViemPublicClient({
					network,
					networkProvider,
				})

				if(!publicClient)
					throw new Error(`Couldn't connect to ${network.name} via ${networkProvider}.`)

				const contractBytecode = await getBytecode(
					publicClient,
					{
						address: contractAddress,
					},
				)

				return contractBytecode ?? null
			},
		})
	}
	loadingIcon={networkProviderConfigByProvider[$preferences.rpcNetwork]?.icon}
	loadingIconName={networkProviderConfigByProvider[$preferences.rpcNetwork]?.name}
	loadingMessage={`Looking up contract code${viaRPC}...`}
	errorMessage={`Couldn't find contract code${viaRPC}.`}
	bind:result={contractBytecode}
	let:status
>
	<svelte:fragment slot="loadingIcon">
		{@const networkProviderConfig = networkProviderConfigByProvider[$preferences.rpcNetwork]}

		{#if networkProviderConfig?.icon}
			<img src={networkProviderConfig.icon} alt={networkProviderConfig.name} width={25}>
		{:else}
			<NetworkIcon {network} />
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="header"
		let:status
		let:isOpen let:toggle
	>
		<slot name="header"
			{contractAddress} {contractBytecode}
			{isOpen} {toggle}
			{status}
		/>
	</svelte:fragment>

	<slot
		{contractAddress} {contractBytecode}
		{status}
	/>
</Loader>
