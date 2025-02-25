<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { TransactionProvider, transactionProviders } from '$/data/transactionProviders'
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
	export let loaderViewOptions: Partial<Loader['viewOptions']> | undefined
	

	// Internal state
	$: loadingMessage = `Retrieving block data from ${transactionProviders[transactionProvider].name}...`
	$: errorMessage = `Couldn't retrieve block data from ${transactionProviders[transactionProvider].name}.`


	// Outputs
	let placeholderData: Pick<Ethereum.Block, 'blockNumber' | 'network'> = { network, blockNumber }
	$: placeholderData = { network, blockNumber }

	export let block: Ethereum.Block | typeof placeholderData = placeholderData

	type SharedSlotProps = {
		block: typeof block,
		status: Loader['$$slot_def']['default']['status'],
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

	import { normalizeBlock as normalizeBlockEnvioHypersync, normalizeTransaction as normalizeTransactionEnvioHypersync } from '$/api/envio/hypersync/normalize'

	import { normalizeBlock as normalizeBlockEtherscan } from '$/api/etherscan/normalize'

	import { normalizeBlock as normalizeMoralisBlock } from '$/api/moralis/web3Api/normalize'


	// Components
	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
	import Icon from './Icon.svelte'
</script>


<Loader
	viewOptions={{
		contentClass: 'column',
		...loaderViewOptions,
	}}
	loadingIcon={transactionProviders[transactionProvider].icon}
	loadingIconName={transactionProviders[transactionProvider].name}
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
				queryFn: async ({
					queryKey: [_, {
						chainId,
						blockNumber,
					}],
				}) => {
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
						queryFn: async ({
							queryKey: [_, {
								chainId,
								blockNumber,
							}],
						}) => {
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
						queryFn: async ({
							queryKey: [_, {
								chainId,
								blockNumber,
							}],
						}) => {
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

		[TransactionProvider.Envio_Hypersync]: () => ({
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
					const { getBlock } = await import('$/api/envio/hypersync')

					return await getBlock({
						chainId,
						blockNumber,
						includeTransactions,
					})
				},
				select: result => {
					if(result === placeholderData)
						return result

					if(!result.data[0])
						throw new Error(`Block ${blockNumber} not found.`)

					const block = (
						result
							.data
							.flatMap(data => data.blocks)
							.map(block => normalizeBlockEnvioHypersync(block, network))
							[0]
					)

					const transactions = (
						result
							.data
							.flatMap(data => data.transactions ?? [])
							.map(transaction => normalizeTransactionEnvioHypersync(transaction, network))
					)

					return {
						...block,
						transactions,
					}
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
				queryFn: async ({
					queryKey: [_, {
						chainId,
						blockNumber,
					}],
				}) => {
					const { Etherscan } = await import('$/api/etherscan/index')

					return await Etherscan.RpcProxy.getBlockByNumber({
						chainId,
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
				queryFn: async ({
					queryKey: [_, {
						chainId,
						blockNumber,
					}],
				}) => {
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
			fromQuery: createQuery({
				queryKey: ['Block', {
					transactionProvider,
					networkProvider,
					chainId: network.chainId,
					blockNumber: Number(blockNumber),
					includeTransactions,
				}],
				placeholderData: () => placeholderData,
				queryFn: async ({
					queryKey: [_, {
						chainId,
						blockNumber,
					}],
				}) => {
					const { getViemPublicClient } = await import('$/data/networkProviders')
					const { getBlock } = await import('viem/actions')

					const publicClient = getViemPublicClient({
						network,
						networkProvider,
					})

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
			<Icon imageSources={[transactionProviders[transactionProvider].icon]} alt={transactionProviders[transactionProvider].name} />
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="header"
		let:status
	>
		<slot name="header" {block} {status} />
	</svelte:fragment>

	<slot {block} {status} />
</Loader>
