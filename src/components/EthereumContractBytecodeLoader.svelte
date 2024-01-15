<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'
	import { NetworkProvider } from '../data/networkProviders/types'
	import { getViemPublicClient, networkProviderConfigByProvider } from '../data/networkProviders'


	// Context
	import { preferences } from '../state/preferences'
	
	
	// Inputs
	export let contractAddress: Ethereum.ContractAddress

	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider

	// (Computed)
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork

	let publicClient: Ethereum.PublicClient | undefined
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})

	$: viaRPC = networkProvider === NetworkProvider.Default ? '' : ` via ${networkProvider}`

	// (View options)
	export let loaderViewOptions: Partial<Loader<any, any, any, any, any>['viewOptions']> | undefined


	// Outputs
	export let contractBytecode: Ethereum.ContractBytecode

	type SharedSlotProps = {
		contractAddress: typeof contractAddress,
		contractBytecode: typeof contractBytecode,
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}
	

	// Functions
	import { createQuery } from '@tanstack/svelte-query'


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
			queryFn: publicClient && (async () => (
				await publicClient.getBytecode({ address: contractAddress })
					.then(contractBytecode => contractBytecode === undefined ? null : contractBytecode)
			))
		})
	}
	loadingIcon={networkProviderConfigByProvider[$preferences.rpcNetwork]?.icon}
	loadingIconName={networkProviderConfigByProvider[$preferences.rpcNetwork]?.name}
	loadingMessage={`Looking up contract code${viaRPC}...`}
	errorMessage={`Couldn't find contract code${viaRPC}.`}
	bind:result={contractBytecode}
>
	<svelte:fragment slot="loadingIcon">
		{@const networkProviderConfig = networkProviderConfigByProvider[$preferences.rpcNetwork]}

		{#if networkProviderConfig?.icon}
			<img src={networkProviderConfig.icon} alt={networkProviderConfig.name} width={25}>
		{:else}
			<NetworkIcon {network} />
		{/if}
	</svelte:fragment>

	<slot slot="header" name="header" {contractAddress} {contractBytecode} />
	<slot {contractAddress} {contractBytecode} />
</Loader>
