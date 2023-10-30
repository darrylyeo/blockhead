<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'
	import { TransactionProvider, transactionProviderIcons } from '../data/transactionProvider'
	import type { NetworkProvider } from '../data/networkProviders/types'
	import type { QuoteCurrency } from '../data/currencies'
	import { getViemPublicClient } from '../data/networkProviders'


	// Context
	import { preferences } from '../state/preferences'


	// Inputs
	export let network: Ethereum.Network
	export let blockNumber: Ethereum.BlockNumber
	export let transactionProvider: TransactionProvider
	export let networkProvider: NetworkProvider
	export let quoteCurrency: QuoteCurrency

	// (Computed)
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork
	

	// Internal state
	let publicClient: Ethereum.PublicClient | undefined

	// (Computed)
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})

	$: loadingMessage = `Retrieving block data from ${transactionProvider}...`
	$: errorMessage = `Couldn't retrieve block data from ${transactionProvider}.`


	// Outputs
	export let block: Ethereum.Block

	type SharedSlotProps = {
		block: typeof block
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import { normalizeViemBlock } from '../api/viem'
	import { getBlock } from '../api/covalent'
	import { chainCodeFromNetwork, MoralisWeb3Api, normalizeMoralisBlock } from '../api/moralis/web3Api'


	// Components
	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>


<Loader
	loadingIcon={transactionProviderIcons[transactionProvider]}
	loadingIconName={transactionProvider}
	{loadingMessage}
	{errorMessage}
	contentClass="column"
	{...{
		[TransactionProvider.Covalent]: {
			fromQuery: createQuery({
				queryKey: ['Block', {
					transactionProvider,
					chainID: network.chainId,
					blockNumber
				}],
				queryFn: async () => (
					(await getBlock({
						chainID: network.chainId,
						blockNumber,
					}))
						.items.map(({
							height,
							signed_at
						}) => ({
							blockNumber: height,
							timestamp: signed_at
						}))
						?.[0]
				)
			}),
		},

		[TransactionProvider.Moralis]: {
			fromQuery: createQuery({
				queryKey: ['Block', {
					transactionProvider,
					chainID: network.chainId,
					blockNumber
				}],
				queryFn: async () => (
					await MoralisWeb3Api.block.getBlock({
						chain: chainCodeFromNetwork(network),
						blockNumberOrHash: blockNumber,
					})
				),
				select: block => normalizeMoralisBlock(block, network),
			}),
		},

		[TransactionProvider.RpcProvider]: {
			fromQuery: publicClient && createQuery({
				queryKey: ['Block', {
					transactionProvider,
					networkProvider,
					chainID: network.chainId,
					blockNumber,
				}],
				queryFn: async () => (
					await publicClient.getBlock({
						blockNumber: BigInt(blockNumber),
						includeTransactions: true,
					})
				),
				select: block => normalizeViemBlock(block, network),
			}),
		},
	}[transactionProvider]}
	bind:result={block}
	let:result={block}
>
	<svelte:fragment slot="loadingIcon">
		{#if transactionProvider === TransactionProvider.RpcProvider}
			<NetworkIcon {network} />
		{:else}
			<img src={transactionProviderIcons[transactionProvider]} alt={transactionProvider} width={25}>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="header">
		<slot name="header" {block} />
	</svelte:fragment>

	<slot {block} />
</Loader>
