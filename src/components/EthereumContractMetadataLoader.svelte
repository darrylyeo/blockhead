<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import { getContractMetadata } from '../api/sourcify'
	
	
	export let address: Ethereum.ContractAddress
	export let network: Ethereum.Network


	export let whenLoaded: (_: Awaited<ReturnType<typeof getContractMetadata>>) => void


	let result: Awaited<ReturnType<typeof getContractMetadata>>
	export let contractMetadata: typeof result['contractMetadata']
	export let sourcifyUrl: typeof result['sourcifyUrl']
	$: if(result) ({ contractMetadata, sourcifyUrl } = result)


	// Output
	type SharedSlotProps = {
		address: typeof address,
		contractMetadata: typeof contractMetadata | undefined,
		sourcifyUrl: typeof sourcifyUrl | undefined,
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


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
			queryFn: async () => {
				try {
					return await getContractMetadata({
						contractAddress: address,
						chainId: network.chainId,
					})
				}catch(e){
					console.error(e)

					return await getContractMetadata({
						contractAddress: address,
						chainId: network.chainId,
						partialMatch: true,
					})
				}
			}
		})
	}
	loadingIcon={SourcifyIcon}
	loadingIconName="Sourcify"
	loadingMessage={`Looking up contract metadata on ${'Sourcify'}...`}
	errorMessage={`Couldn't find contract metadata on ${'Sourcify'}.`}
	{whenLoaded}
	bind:result
	let:result
>
	<slot slot="header" name="header" {address} {...result} />
	<slot {address} {...result} />
</Loader>
