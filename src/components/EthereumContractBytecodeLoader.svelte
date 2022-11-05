<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { NetworkProvider } from '../data/providers-types';
	import { networkProviderConfigByProvider } from '../data/providers'
	import { preferences } from '../state/preferences'
	
	
	export let address: Ethereum.ContractAddress
	export let network: Ethereum.Network
	export let provider: Ethereum.Provider

	export let contractCode: Ethereum.ContractBytecode
	
	export let showIf: ((contractCode: Ethereum.ContractBytecode) => boolean) | undefined
	

	import { useQuery } from '@sveltestack/svelte-query'

	$: viaRPC = $preferences.rpcNetwork === NetworkProvider.Default ? '' : ` via ${$preferences.rpcNetwork}`


	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>


<Loader
	fromUseQuery={
		useQuery({
			queryKey: ['ContractBytecode', {
				address,
				chainId: network.chainId
			}],
			queryFn: async () => (
				await provider.getCode(address)
					.then(contractCode => contractCode === '0x' ? undefined : contractCode)
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
	<!-- <svelte:fragment slot="loadingIcon">
		<NetworkIcon {network} />
	</svelte:fragment> -->

	<slot slot="header" name="header" {address} {contractCode} />
	<slot {address} {contractCode} />
</Loader>
