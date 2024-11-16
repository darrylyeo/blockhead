<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { TransactionProvider, transactionProviderIcons } from '$/data/transactionProvider'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import type { QuoteCurrency } from '$/data/currencies'
	import { getViemPublicClient } from '$/data/networkProviders'


	// Context
	import { preferences } from '$/state/preferences'


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
	$: quoteCurrency = $$props.quoteCurrency ?? $preferences.quoteCurrency

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
	import { isTruthy } from '$/utils/isTruthy'

	import { normalizeBlock as normalizeViemBlock } from '$/api/viem/normalize'

	import { normalizeBlock as normalizeBlockBlockscout, normalizeTransaction as normalizeTransactionBlockscout } from '$/api/blockscout/rest/normalize'

	import { normalizeBlock as normalizeBlockChainbase } from '$/api/chainbase/normalize'

	import { normalizeBlock as normalizeBlockCovalent, normalizeTransaction as normalizeTransactionCovalent } from '$/api/covalent/normalize'

	import { normalizeBlock as normalizeBlockCurvegridMultibaas } from '$/api/curvegrid/multibaas/normalize'

	import { normalizeBlock as normalizeBlockEtherscan } from '$/api/etherscan/normalize'

	import { normalizeBlock as normalizeMoralisBlock } from '$/api/moralis/web3Api/normalize'


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
		[TransactionProvider.Blockscout]: () => ({
			fromQuery: createQueries({
				queries: [
					{
						queryKey: ['Block', {
							transactionProvider,
							chainId: network.chainId,
							blockNumber: Number(blockNumber),
						}],
						placeholderData: () => placeholderData,
						queryFn: async ({
							queryKey: [
								_,
								{
									transactionProvider,
									chainId,
									blockNumber,
								},
							],
						}) => {
							const { getBlock } = await import('$/api/blockscout/rest/index')

							const block = await getBlock(
								blockNumber,
								{
									baseUrl: (await import('$/api/blockscout/index')).getBlockscoutRestEndpoint(chainId),
								}
							)

							if(!block)
								throw new Error(`Blockscout has not yet indexed block #${blockNumber}.`)

							return block
						},
						select: block => (
							block === placeholderData
								? block
								: normalizeBlockBlockscout(block, network)
						),
					},
					{
						queryKey: ['BlockTransactions', {
							transactionProvider,
							chainId: network.chainId,
							blockNumber: Number(blockNumber),
						}],
						placeholderData: () => placeholderData,
						queryFn: async ({
							queryKey: [
								_,
								{
									transactionProvider,
									chainId,
									blockNumber,
								},
							],
						}) => {
							const { getBlockTxs } = await import('$/api/blockscout/rest/index')

							return await getBlockTxs(
								blockNumber,
								{
									baseUrl: (await import('$/api/blockscout/index')).getBlockscoutRestEndpoint(chainId),
								}
							)
						},
						select: result => (
							result === placeholderData
								? result
								: result.items
									.map(transaction => (
										normalizeTransactionBlockscout(transaction, network)
									))
						),
					},
				],
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
			}),
		}),

		[TransactionProvider.Chainbase]: () => ({
			fromQuery: createQuery({
				queryKey: ['Block', {
					transactionProvider,
					chainId: network.chainId,
					blockNumber: Number(blockNumber),
				}],
				placeholderData: () => placeholderData,
				queryFn: async () => {
					const { getBlockByNumber } = await import('$/api/chainbase')

					return await getBlockByNumber({
						chainId: network.chainId,
						number: Number(blockNumber),
					})
				},
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
						queryFn: async () => {
							const { getBlock } = await import('$/api/covalent/index')

							return await getBlock({
								chainName: network.chainId,
								blockHeight: Number(blockNumber),
							})
						},
						select: result => result === placeholderData ? result : normalizeBlockCovalent(result.items[0], network),
					},

					includeTransactions && {
						queryKey: ['BlockTransactions', {
							transactionProvider,
							chainId: network.chainId,
							blockNumber: Number(blockNumber),
							quoteCurrency,
						}],
						queryFn: async () => {
							const { getAllTransactionsInABlock } = await import('$/api/covalent/index')

							return await getAllTransactionsInABlock({
								chainName: network.chainId,
								blockHeight: Number(blockNumber),
								quoteCurrency,
							})
						},
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

		[TransactionProvider.Curvegrid_Multibaas]: () => ({
			fromQuery: createQuery({
				queryKey: ['Block', {
					transactionProvider,
					chainId: network.chainId,
					blockNumber: Number(blockNumber),
				}],
				placeholderData: () => placeholderData,
				queryFn: async ({
					queryKey: [_, {
						chainId,
						blockNumber,
					}],
				}) => {
					const { getBlock } = await import('$/api/curvegrid/multibaas')

					return await getBlock({
						chain: 'ethereum',
						block: blockNumber.toString(),
					})
				},
				select: block => block === placeholderData ? block : normalizeBlockCurvegridMultibaas(block, network),
				staleTime: 10 * 1000,
			}),
		}),

		[TransactionProvider.Decommas]: () => ({
			fromQuery: createQuery({
				queryKey: ['Block', {
					transactionProvider,
					chainId: network.chainId,
					blockNumber: Number(blockNumber),
					includeTransactions,
				}],
				placeholderData: () => placeholderData,
				queryFn: async () => {
					throw `Decommas does not yet support querying blocks.`
				},
			}),
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
				queryFn: async () => {
					const { Etherscan } = await import('$/api/etherscan/index')

					return await Etherscan.RpcProxy.getBlockByNumber({
						chainId: network.chainId,
						tag: numberToHex(blockNumber),
						getFullTransactionObjects: includeTransactions,
					})
				},
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
				queryFn: async () => {
					const { MoralisWeb3Api, chainCodeFromNetwork } = await import('$/api/moralis/web3Api/index')

					return await MoralisWeb3Api.block.getBlock({
						chain: chainCodeFromNetwork(network),
						blockNumberOrHash: blockNumber,
					})
				},
				select: block => block === placeholderData ? block : normalizeMoralisBlock(block, network),
			}),
		}),

		[TransactionProvider.Noves]: () => ({
			fromQuery: createQuery({
				queryKey: ['Block', {
					transactionProvider,
					chainId: network.chainId,
					blockNumber: Number(blockNumber),
				}],
				placeholderData: () => placeholderData,
				queryFn: async () => {
					throw `Noves does not yet support querying blocks.`
				},
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
				queryFn: async () => {
					const { getBlock } = await import('viem/actions')

					return await getBlock(publicClient, {
						blockNumber,
						includeTransactions,
					})
				},
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
