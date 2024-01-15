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
	export let includeTransactions: boolean = false

	// (Computed)
	$: transactionProvider = $$props.transactionProvider ?? $preferences.transactionProvider
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork

	// (View options)
	export let loaderViewOptions: Partial<Loader<any, any, any, any, any>['viewOptions']> | undefined
	

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
	import { createQuery, createQueries } from '@tanstack/svelte-query'

	import { numberToHex } from 'viem'
	import { isTruthy } from '../utils/isTruthy'

	import { normalizeBlock as normalizeViemBlock } from '../api/viem/normalize'

	import { getBlockByNumber as getBlockByNumberChainbase } from '../api/chainbase'
	import { normalizeBlock as normalizeBlockChainbase } from '../api/chainbase/normalize'

	import { getBlock as getBlockCovalent, getAllTransactionsInABlock as getBlockTransactionsCovalent } from '../api/covalent/index'
	import { normalizeBlock as normalizeBlockCovalent, normalizeTransaction as normalizeTransactionCovalent } from '../api/covalent/normalize'

	import { Etherscan } from '../api/etherscan/index'
	import { normalizeBlock as normalizeBlockEtherscan } from '../api/etherscan/normalize'

	import { chainCodeFromNetwork, MoralisWeb3Api } from '../api/moralis/web3Api/index'
	import { normalizeBlock as normalizeMoralisBlock } from '../api/moralis/web3Api/normalize'


	// Components
	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>


<Loader
	viewOptions={{
		contentClass: 'column',
		...loaderViewOptions,
	}}
	loadingIcon={transactionProviderIcons[transactionProvider]}
	loadingIconName={transactionProvider}
	{loadingMessage}
	{errorMessage}
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
			fromQuery: createQueries({
				queries: [
					{
						placeholderData: () => placeholderData,

						queryKey: ['Block', {
							transactionProvider,
							chainId: network.chainId,
							blockNumber: Number(blockNumber),
						}],
						queryFn: async () => (
							await getBlockCovalent({
								chainName: network.chainId,
								blockHeight: Number(blockNumber),
							})
						),
						select: result => result === placeholderData ? result : normalizeBlockCovalent(result.items[0], network),
					},

					includeTransactions && {
						queryKey: ['BlockTransactions', {
							transactionProvider,
							chainId: network.chainId,
							blockNumber: Number(blockNumber),
						}],
						queryFn: async () => (
							await getBlockTransactionsCovalent({
								chainName: network.chainId,
								blockHeight: Number(blockNumber),
								quoteCurrency,
							})
						),
						select: result => (
							result.items
								.map(transaction => normalizeTransactionCovalent(transaction, network, quoteCurrency))
						),
					},
				].filter(isTruthy),

				combine: ([
					blockQuery,
					transactionsQuery,
				]) => ({
					...blockQuery,
					...transactionsQuery,
					data: {
						...blockQuery.data,
						...transactionsQuery?.data && {
							transactions: transactionsQuery.data,
						},
					},
				}),
			})
		}),

		[TransactionProvider.Etherscan]: () => ({
			fromQuery: createQuery({
				queryKey: ['Block', {
					transactionProvider,
					chainId: network.chainId,
					blockNumber: Number(blockNumber),
					includeTransactions,
				}],
				placeholderData: () => placeholderData,
				queryFn: async () => (
					await Etherscan.RpcProxy.getBlockByNumber({
						chainId: network.chainId,
						tag: numberToHex(blockNumber),
						getFullTransactionObjects: includeTransactions,
					})
				),
				select: block => block === placeholderData ? block : normalizeBlockEtherscan(block, network),
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
					includeTransactions,
				}],
				placeholderData: () => placeholderData,
				queryFn: async () => (
					await publicClient.getBlock({
						blockNumber,
						includeTransactions,
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
