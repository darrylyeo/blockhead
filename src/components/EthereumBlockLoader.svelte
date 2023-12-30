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
	$: transactionProvider = $$props.transactionProvider ?? $preferences.transactionProvider
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
	let placeholderData: Pick<Ethereum.Block, 'blockNumber' | 'network'> = { network, blockNumber }
	$: placeholderData = { network, blockNumber }

	export let block: Ethereum.Block | typeof placeholderData = placeholderData

	type SharedSlotProps = {
		block: typeof block,
		status: Loader<any, any, any, any, any>['$$slot_def']['default']['status'],
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import { normalizeViemBlock } from '../api/viem'
	import { getBlockByNumber as getBlockByNumberChainbase, normalizeBlock as normalizeBlockChainbase } from '../api/chainbase'
	import { getBlock as getBlockCovalent } from '../api/covalent/index'
	import { chainCodeFromNetwork, MoralisWeb3Api, normalizeMoralisBlock } from '../api/moralis/web3Api'


	// Components
	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>


<Loader
	{...$$restProps}
	loadingIcon={transactionProviderIcons[transactionProvider]}
	loadingIconName={transactionProvider}
	{loadingMessage}
	{errorMessage}
	contentClass="column"
	{...{
		[TransactionProvider.Chainbase]: () => ({
			fromQuery: createQuery({
				queryKey: ['Block', {
					transactionProvider,
					chainId: network.chainId,
					blockNumber: Number(blockNumber),
				}],
				placeholderData: () => placeholderData,
				queryFn: async () => (
					await getBlockByNumberChainbase({
						chainId: network.chainId,
						number: Number(blockNumber),
					})
				),
				select: result => result === placeholderData ? result : normalizeBlockChainbase(result.data, network),
			}),
		}),

		[TransactionProvider.Covalent]: () => ({
			fromQuery: createQuery({
				queryKey: ['Block', {
					transactionProvider,
					chainId: network.chainId,
					blockNumber: Number(blockNumber),
				}],
				placeholderData: () => placeholderData,
				queryFn: async () => (
					(await getBlockCovalent({
						chainName: network.chainId,
						blockHeight: Number(blockNumber),
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
		}),

		[TransactionProvider.Moralis]: () => ({
			fromQuery: createQuery({
				queryKey: ['Block', {
					transactionProvider,
					chainId: network.chainId,
					blockNumber: Number(blockNumber),
				}],
				placeholderData: () => placeholderData,
				queryFn: async () => (
					await MoralisWeb3Api.block.getBlock({
						chain: chainCodeFromNetwork(network),
						blockNumberOrHash: blockNumber,
					})
				),
				select: block => block === placeholderData ? block : normalizeMoralisBlock(block, network),
			}),
		}),

		[TransactionProvider.RpcProvider]: () => ({
			fromQuery: publicClient && createQuery({
				queryKey: ['Block', {
					transactionProvider,
					networkProvider,
					chainId: network.chainId,
					blockNumber: Number(blockNumber),
				}],
				placeholderData: () => placeholderData,
				queryFn: async () => (
					await publicClient.getBlock({
						blockNumber,
						includeTransactions: true,
					})
				),
				select: block => block === placeholderData ? block : normalizeViemBlock(block, network),
			}),
		}),
	}[transactionProvider]?.()}
	bind:result={block}
	let:result={block}
	let:status
>
	<svelte:fragment slot="loadingIcon">
		{#if transactionProvider === TransactionProvider.RpcProvider}
			<NetworkIcon {network} />
		{:else}
			<img src={transactionProviderIcons[transactionProvider]} alt={transactionProvider} width={25}>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="header"
		let:status
	>
		<slot name="header" {block} {status} />
	</svelte:fragment>

	<slot {block} {status} />
</Loader>
