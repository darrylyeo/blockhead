<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import { NetworkProvider } from '../data/networkProviders/types';
	import { getViemPublicClient, networkProviderConfigByProvider } from '../data/networkProviders'
	import { preferences } from '../state/preferences'
	
	
	export let contractAddress: Ethereum.ContractAddress
	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider

	export let transactionProvider

	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork

	let publicClient: Ethereum.PublicClient | undefined
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})

	$: viaRPC = networkProvider === NetworkProvider.Default ? '' : ` via ${networkProvider}`


	export let showIf: ((contractBytecode: Ethereum.ContractBytecode) => boolean) | undefined


	export let contractBytecode: Ethereum.ContractBytecode
	

	import { createQuery } from '@tanstack/svelte-query'


	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>


<Loader
	fromQuery={
		createQuery({
			queryKey: ['ContractBytecode', {
				networkProvider,
				chainId: network.chainId,
				contractAddress,
			}],
			queryFn: async () => (
				await publicClient.getBytecode({ address: contractAddress })
					.then(contractCode => contractCode === '0x' ? null : contractCode)
			)
		})
	}
	loadingIcon={networkProviderConfigByProvider[$preferences.rpcNetwork]?.icon}
	loadingIconName={networkProviderConfigByProvider[$preferences.rpcNetwork]?.name}
	loadingMessage={`Looking up contract code${viaRPC}...`}
	errorMessage={`Couldn't find contract code${viaRPC}.`}
	{showIf}
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
