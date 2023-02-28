<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import { type ContractMetadata, getContractMetadata, getSourcifyUrl } from '../api/sourcify'
	
	
	export let address: Ethereum.ContractAddress
	export let network: Ethereum.Network


	export let whenLoaded: (contractMetadata: ContractMetadata<string>) => void


	export let contractMetadata: ContractMetadata<string>


	$: sourcifyUrl = getSourcifyUrl({
		contractAddress: address,
		chainId: network.chainId
	})


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
				.catch(e => {
					// console.error(e)
					return undefined
				})
			)
		})
	}
	loadingIcon={SourcifyIcon}
	loadingIconName="Sourcify"
	loadingMessage={`Looking up contract metadata on ${'Sourcify'}...`}
	errorMessage={`Couldn't find contract metadata on ${'Sourcify'}.`}
	{whenLoaded}
	bind:result={contractMetadata}
>
	<slot slot="header" name="header" {address} {contractMetadata} {sourcifyUrl} />
	<slot {address} {contractMetadata} {sourcifyUrl} />
</Loader>
