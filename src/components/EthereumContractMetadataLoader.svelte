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
		repository?: {
			name?: string,
			url?: string,
		},
		contractState?: {
			creationBytecode?: Ethereum.ContractBytecode,
			runtimeBytecode?: Ethereum.ContractBytecode,
			isSelfDestructed?: boolean,
		},
		contractMetadata?: Ethereum.ContractMetadata<SourcePath>,
		swarmUri?: string,
	}


	// Output
	export let repository: typeof result['repository']
	export let contractState: typeof result['contractState']
	export let contractMetadata: typeof result['contractMetadata']
	export let swarmUri: typeof result['swarmUri']
	$: if(result) ({ repository, contractState, contractMetadata, swarmUri } = result)

	type SharedSlotProps = {
		contractAddress: typeof contractAddress,
		contractSourceProvider: typeof contractSourceProvider,
		isOpen: Loader<any, any, any, 'collapsible'>['$$slot_def']['default']['isOpen'],
		toggle: Loader<any, any, any, 'collapsible'>['$$slot_def']['default']['toggle'],
	} & typeof result

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import { normalizeContractSource as normalizeContractSourceBlockscout } from '$/api/blockscout/rest/normalize'

	import type { Etherscan } from '$/api/etherscan/index'
	import { normalizeContractSource as normalizeContractSourceEtherscan } from '$/api/etherscan/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		layout: 'collapsible',
		collapsibleType: 'label',
	}}
	fromQuery={
		createQuery({
			queryKey: ['ContractMetadata', {
				contractSourceProvider,
				chainId: network.chainId,
				contractAddress,
			}],

			...{
				[ContractSourceProvider.Blockscout]: () => ({
					queryFn: async ({
						queryKey: [_, {
							contractAddress,
						}],
					}) => {
						const { getSmartContract } = await import('$/api/blockscout/rest/index')
						const { getBlockscoutRestEndpoint } = await import('$/api/blockscout')

						return await getSmartContract(
							contractAddress,
							{
								baseUrl: getBlockscoutRestEndpoint(network.chainId),
							}
						)
					},

					select: normalizeContractSourceBlockscout,
				}),

				[ContractSourceProvider.Etherscan]: () => ({
					queryFn: async ({
						queryKey: [_, {
							contractAddress,
						}],
					}) => {
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
	let:isOpen
	let:toggle
>
	<svelte:fragment slot="header"
		let:result
		let:isOpen
		let:toggle
	>
		<slot name="header"
			{contractAddress} {contractSourceProvider}
			{...result}
			{isOpen} {toggle}
		/>
	</svelte:fragment>

	<slot
		{contractAddress} {contractSourceProvider}
		{...result}
		{isOpen} {toggle}
	/>
</Loader>
