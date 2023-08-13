<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import { NetworkProvider } from '../data/networkProviders/types';
	import { getEthersProvider, networkProviderConfigByProvider } from '../data/networkProviders'
	import { preferences } from '../state/preferences'
	
	
	export let address: Ethereum.ContractAddress
	export let network: Ethereum.Network
	export let providerName: NetworkProvider
	export let provider: Ethereum.Provider

	export let transactionProvider

	$: providerName = $$props.providerName ?? $preferences.rpcNetwork

	$: if(network && providerName && !provider)
		getEthersProvider({
			network,
			networkProvider: providerName,
		}).then(_ => provider = _)

	$: viaRPC = providerName === NetworkProvider.Default ? '' : ` via ${providerName}`


	export let showIf: ((contractCode: Ethereum.ContractBytecode) => boolean) | undefined


	export let contractCode: Ethereum.ContractBytecode
	

	import { createQuery } from '@tanstack/svelte-query'


	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>


<Loader
	fromQuery={
		createQuery({
			queryKey: ['ContractBytecode', {
				providerName,
				chainId: network.chainId,
				address,
			}],
			queryFn: async () => (
				await provider.getCode(address)
					.then(contractCode => contractCode === '0x' ? null : contractCode)
			)
		})
	}
	loadingIcon={networkProviderConfigByProvider[$preferences.rpcNetwork]?.icon}
	loadingIconName={networkProviderConfigByProvider[$preferences.rpcNetwork]?.name}
	loadingMessage={`Looking up contract code${viaRPC}...`}
	errorMessage={`Couldn't find contract code${viaRPC}.`}
	{showIf}
	bind:result={contractCode}
>
	<svelte:fragment slot="loadingIcon">
		{@const networkProviderConfig = networkProviderConfigByProvider[$preferences.rpcNetwork]}

		{#if networkProviderConfig?.icon}
			<img src={networkProviderConfig.icon} alt={networkProviderConfig.name} width={25}>
		{:else}
			<NetworkIcon {network} />
		{/if}
	</svelte:fragment>

	<slot slot="header" name="header" {address} {contractCode} />
	<slot {address} {contractCode} />
</Loader>
