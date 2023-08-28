<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import { ContractSourceProvider, contractSourceProviderIcons } from '../data/contractSourceProvider'
	import type { getContractMetadata } from '../api/sourcify'


	// Context
	import { preferences } from '../state/preferences'


	// External state
	export let contractSourceProvider: ContractSourceProvider
	export let contractAddress: Ethereum.ContractAddress
	export let network: Ethereum.Network

	$: contractSourceProvider = $$props.contractSourceProvider ?? $preferences.contractSourceProvider


	// Internal state
	let result: Awaited<ReturnType<typeof getContractMetadata>>


	// Output
	export let contractMetadata: typeof result['contractMetadata']
	export let sourcifyUrl: typeof result['sourcifyUrl']
	$: if(result) ({ contractMetadata, sourcifyUrl } = result)

	type SharedSlotProps = {
		contractAddress: typeof contractAddress,
		contractMetadata: typeof contractMetadata | undefined,
		sourcifyUrl: typeof sourcifyUrl | undefined,
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'


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

			queryFn: {
				[ContractSourceProvider.Etherscan]: async () => {
					const { Etherscan } = await import('../api/etherscan')

					const metadata = await Etherscan.Contracts.getSource({
						chainId: network.chainId,
						contractAddress,
					})

					return {
						swarmUri: metadata.SwarmSource,
						contractMetadata: {
							compiler: {
								version: metadata.CompilerVersion,
							},
							// language: ,
							output: {
								abi: JSON.parse(metadata.ABI),
							},
							settings: {
								compilationTarget: {
									[metadata.ContractName]: metadata.ContractName,
								},
								evmVersion: metadata.EVMVersion,
								optimizer: {
									enabled: metadata.OptimizationUsed == '1',
									runs: Number(metadata.Runs),
								},
							},
							sources: {
								[metadata.ContractName]: {
									content: metadata.SourceCode,
									// keccak256: ,
									license: metadata.LicenseType,
									urls: [
										metadata.SwarmSource,
									],
								},
							},
						},
					}
				},

				[ContractSourceProvider.Sourcify]: async () => {
					const { getContractMetadata } = await import('../api/sourcify')

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

				// [ContractSourceProvider.Tenderly]: async () => {
				// },
			}[contractSourceProvider]
		})
	}
	loadingIcon={contractSourceProviderIcons[contractSourceProvider]}
	loadingIconName={contractSourceProvider}
	loadingMessage={`Looking up contract metadata on ${contractSourceProvider}...`}
	errorMessage={`Couldn't find contract metadata on ${contractSourceProvider}.`}
	{...$$restProps}
	bind:result
	let:result
>
	<svelte:fragment slot="header"
		let:result
	>
		<slot name="header" {contractAddress} {...result} />
	</svelte:fragment>

	<slot {contractAddress} {...result} />
</Loader>
