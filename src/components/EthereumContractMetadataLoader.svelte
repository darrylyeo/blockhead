<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { type ContractMetadata, getContractMetadata } from '../api/sourcify'
	
	
	export let address: Ethereum.ContractAddress
	export let network: Ethereum.Network


	export let contractMetadata: ContractMetadata<string>


	import { useQuery } from '@sveltestack/svelte-query'


	import Loader from './Loader.svelte'
	import { SourcifyIcon } from '../assets/icons'
</script>


<Loader
	fromUseQuery={
		useQuery({
			queryKey: ['ContractMetadata', {
				address,
				chainId: network.chainId
			}],
			queryFn: (async () =>
				await getContractMetadata({
					contractAddress: address,
					chainId: network.chainId
				})
			)
		})
	}
	loadingIcon={SourcifyIcon}
	loadingIconName="Sourcify"
	loadingMessage={`Looking up contract metadata on ${'Sourcify'}...`}
	errorMessage={`Couldn't find contract metadata on ${'Sourcify'}.`}
	bind:result={contractMetadata}
>
	<slot slot="header" name="header" {address} {contractMetadata} />
	<slot {address} {contractMetadata} />
</Loader>
