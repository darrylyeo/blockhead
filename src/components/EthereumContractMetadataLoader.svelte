<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import { ContractSourceProvider, contractSourceProviderIcons } from '$/data/contractSourceProvider'

	type SourcePath = $$Generic<string>


	// Context
	import { preferences } from '$/state/preferences'


	// External state
	export let contractSourceProvider: ContractSourceProvider
	export let contractAddress: Ethereum.ContractAddress
	export let network: Ethereum.Network

	$: contractSourceProvider = $$props.contractSourceProvider ?? $preferences.contractSourceProvider


	// Internal state
	let result: {
		contractMetadata: Ethereum.ContractMetadata<SourcePath>,
		swarmUri?: string,
		sourcifyUrl?: string,
	}


	// Output
	export let contractMetadata: typeof result['contractMetadata']
	export let swarmUri: typeof result['swarmUri']
	export let sourcifyUrl: typeof result['sourcifyUrl']
	$: if(result) ({ contractMetadata, swarmUri, sourcifyUrl } = result)

	type SharedSlotProps = {
		contractAddress: typeof contractAddress,
		contractSourceProvider: typeof contractSourceProvider,
	} & typeof result

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import type { Etherscan } from '$/api/etherscan/index'
	import { normalizeContractSource as normalizeContractSourceEtherscan } from '$/api/etherscan/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	fromQuery={
		createQuery({
			queryKey: ['ContractMetadata', {
				contractSourceProvider,
				chainId: network.chainId,
				contractAddress,
			}],

			...{
				[ContractSourceProvider.Etherscan]: () => ({
					queryFn: async () => {
						const { Etherscan } = await import('$/api/etherscan/index')

						const metadata = await Etherscan.Contracts.getSource({
							chainId: network.chainId,
							contractAddress,
						})

						return metadata
					},

					select: normalizeContractSourceEtherscan,
				}),

				[ContractSourceProvider.Sourcify]: () => ({
					queryFn: async () => {
						const { getContractMetadata } = await import('$/api/sourcify')

						try {
							return await getContractMetadata({
								contractAddress: contractAddress,
								chainId: network.chainId,
							})
						}catch(e){
							console.warn(e)

							return await getContractMetadata({
								contractAddress,
								chainId: network.chainId,
								partialMatch: true,
							})
						}
					},
				}),

				// [ContractSourceProvider.Tenderly]: ({})
			}[contractSourceProvider]?.()
		})
	}
	loadingIcon={contractSourceProviderIcons[contractSourceProvider]}
	loadingIconName={contractSourceProvider}
	loadingMessage={`Looking up contract metadata on ${contractSourceProvider}...`}
	errorMessage={`Couldn't find contract metadata on ${contractSourceProvider}.`}
	bind:result
	let:result
>
	<svelte:fragment slot="header"
		let:result
	>
		<slot name="header" {contractAddress} {contractSourceProvider} {...result} />
	</svelte:fragment>

	<slot {contractAddress} {contractSourceProvider} {...result} />
</Loader>
