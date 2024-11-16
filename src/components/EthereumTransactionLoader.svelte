<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { QuoteCurrency } from '$/data/currencies'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { TransactionProvider, transactionProviderIcons } from '$/data/transactionProvider'
	import { getViemPublicClient } from '$/data/networkProviders'
	import { preferences } from '$/state/preferences'


	// Inputs
	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider
	export let transactionProvider: TransactionProvider
	export let transactionId: Ethereum.TransactionId
	export let quoteCurrency: QuoteCurrency

	// (Computed)
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork
	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider
	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency

	// (View options)
	export let contextualAddress: Ethereum.Address
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false

	export let layout: 'standalone' | 'inline' = 'inline'
	export let innerLayout: 'columns' | 'row' = 'row'


	// Internal state
	let publicClient: Ethereum.PublicClient | undefined

	// (Computed)
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})


	// Outputs
	export let transaction: Ethereum.Transaction | undefined

	type SharedSlotProps = {
		transaction: typeof transaction,
		transactionProvider: typeof transactionProvider,
		status: Loader<any, any, any, any, any>['$$slot_def']['default']['status'],
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Functions
	import { createQuery, createQueries } from '@tanstack/svelte-query'

	import { normalizeTransaction as normalizeViemTransaction } from '$/api/viem/normalize'

	import { normalizeTransaction as normalizeTransactionBlockscout } from '$/api/blockscout/rest/normalize'

	import { normalizeTransaction as normalizeTransactionChainbase } from '$/api/chainbase/normalize'

	import { normalizeTransaction as normalizeTransactionCovalent } from '$/api/covalent/normalize'

	import { normalizeTransaction as normalizeTransactionCurvegridMultibaas, normalizeTransactionReceipt as normalizeTransactionReceiptCurvegridMultibaas } from '$/api/curvegrid/multibaas/normalize'

	import { normalizeTransaction as normalizeTransactionDecommas } from '$/api/decommas/normalize'

	import { normalizeRpcTransaction as normalizeTransactionEtherscan, normalizeRpcTransactionReceipt as normalizeTransactionReceiptEtherscan } from '$/api/etherscan/normalize'

	// import { normalizeTransaction as normalizeEtherspotTransaction } from '$/api/etherspot'

	import { normalizeTransaction as normalizeTransactionMoralis } from '$/api/moralis/web3Api/normalize'

	import { normalizeTransaction as normalizeTransactionNoves, normalizeRawTransaction as normalizeRawTransactionNoves } from '$/api/noves/normalize'


	// Components
	import EthereumTransaction from './EthereumTransaction.svelte'
	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
	import Icon from './Icon.svelte'
</script>


<Loader
	viewOptions={{
		contentClass: 'column',
	}}
	loadingIcon={transactionProviderIcons[transactionProvider]}
	loadingMessage="Looking up {network.name} transaction via {transactionProvider}..."
	errorMessage="Error looking up transaction from {transactionProvider}"
	{...{
		[TransactionProvider.RpcProvider]: () => ({
			fromQuery: publicClient && createQuery({
				queryKey: ['Transaction', {
					transactionProvider,
					networkProvider,
					chainId: network.chainId,
					transactionId
				}],
				queryFn: async () => {
					const { getTransaction, getTransactionReceipt } = await import('viem/actions')
					const [
						transaction,
						transactionReceipt,
					] = await Promise.all([
						getTransaction(publicClient, {
							hash: transactionId
						}),
						getTransactionReceipt(publicClient, {
							hash: transactionId
						}),
					])

					return { transaction, transactionReceipt }
				},
				select: ({ transaction, transactionReceipt }) => (
					normalizeViemTransaction(
						{ ...transaction, ...transactionReceipt },
						network,
					)
				),
			}),
		}),

		[TransactionProvider.Blockscout]: () => ({
			fromQuery: createQuery({
				queryKey: ['Transaction', {
					transactionProvider,
					chainId: network.chainId,
					transactionId,
				}],
				queryFn: async ({
					queryKey: [
						_,
						{
							transactionProvider,
							chainId,
							transactionId,
						},
					]
				}) => {
					const { getBlockscoutRestEndpoint } = await import('$/api/blockscout/index')

					const { getTx } = await import('$/api/blockscout/rest/index')

					return await getTx(
						transactionId,
						{
							baseUrl: getBlockscoutRestEndpoint(chainId),
						}
					)
				},
				select: result => (
					normalizeTransactionBlockscout(result, network)
				),
			}),
		}),

		[TransactionProvider.Chainbase]: () => ({
			fromQuery: createQuery({
				queryKey: ['Transaction', {
					transactionProvider,
					chainId: network.chainId,
					transactionId,
				}],
				queryFn: async () => {
					const { getTransaction } = await import('$/api/chainbase/index')

					const result = await getTransaction({
						chainId: network.chainId,
						hash: transactionId,
					})

					if(result.data === null)
						throw new Error(`Transaction not found.`)

					return result
				},
				select: result => (
					normalizeTransactionChainbase(result.data, network)
				),
			}),
		}),

		[TransactionProvider.Covalent]: () => ({
			fromQuery: createQuery({
				queryKey: ['Transaction', {
					transactionProvider,
					chainId: network.chainId,
					transactionId,
					quoteCurrency,
				}],
				queryFn: async () => {
					const { getTransaction } = await import('$/api/covalent/index')

					return await getTransaction({
						chainName: network.chainId,
						txHash: transactionId,
						quoteCurrency,
						noLogs: false,
					})
				},
				select: ({ items: [transaction] }) => (
					normalizeTransactionCovalent(transaction, network, quoteCurrency)
				),
			}),
		}),

		[TransactionProvider.Curvegrid_Multibaas]: () => ({
			fromQuery: createQueries({
				queries: [
					{
						queryKey: ['Transaction', {
							transactionProvider,
							chainId: network.chainId,
							transactionId,
						}],
						queryFn: async ({
							queryKey: [_, {
								chainId,
								transactionId,
							}],
						}) => {
							const { getTransaction } = await import('$/api/curvegrid/multibaas')

							return await getTransaction({
								chain: 'ethereum',
								hash: transactionId,
								include: 'contract',
							})
						},
						select: transaction => (
							normalizeTransactionCurvegridMultibaas(transaction, network)
						),
					},
					{
						queryKey: ['TransactionReceipt', {
							transactionProvider,
							chainId: network.chainId,
							transactionId,
						}],
						queryFn: async ({
							queryKey: [_, {
								chainId,
								transactionId,
							}],
						}) => {
							const { getTransactionReceipt } = await import('$/api/curvegrid/multibaas')

							return await getTransactionReceipt({
								chain: 'ethereum',
								hash: transactionId,
								include: 'contract',
							})
						},
						select: receipt => (
							normalizeTransactionReceiptCurvegridMultibaas(receipt, network)
						),
					},
				],

				combine: ([
					transactionQuery,
					receiptQuery,
				]) => ({
					...transactionQuery,
					...receiptQuery,
					data: {
						...transactionQuery.data,
						...receiptQuery?.data,
					},
				}),
			}),
		}),

		[TransactionProvider.Decommas]: () => ({
			fromQuery: createQuery({
				queryKey: ['Transaction', {
					transactionProvider,
					chainId: network.chainId,
					transactionId,
				}],
				queryFn: async () => {
					const { decommas, chainNameByChainId } = await import('$/api/decommas')

					const chainName = chainNameByChainId[network.chainId]

					return await decommas.tx.getDetail({
						chainName,
						txHash: transactionId,
					})
				},
				select: transaction => (
					normalizeTransactionDecommas(transaction, network)
				),
			}),
		}),

		[TransactionProvider.Etherscan]: () => ({
			fromQuery: createQuery({
				queryKey: ['Transaction', {
					transactionProvider,
					chainId: network.chainId,
					transactionId,
				}],
				queryFn: async () => {
					const { Etherscan } = await import('$/api/etherscan/index')

					const [
						transaction,
						transactionReceipt,
					] = await Promise.all([
						Etherscan.RpcProxy.getTransactionByHash({
							chainId: network.chainId,
							transactionId,
						}),
						Etherscan.RpcProxy.getTransactionReceipt({
							chainId: network.chainId,
							transactionId,
						}),
					])

					return { transaction, transactionReceipt }
				},
				select: ({ transaction, transactionReceipt }) => {
					const _transaction = {
						...normalizeTransactionReceiptEtherscan(network, transactionReceipt),
						...normalizeTransactionEtherscan(network, transaction),
					}

					return {
						..._transaction,
						gasValue: BigInt(_transaction.gasUnitsSpent) * BigInt(_transaction.gasUnitRate),
					}
				},
			}),
		}),

		// [TransactionProvider.Etherspot]: () => ({
		// 	fromQuery: createQuery({
		// 		queryKey: ['Transaction', {
		// 			transactionProvider,
		// 			chainId: network.chainId,
		// 			transactionId,
		// 		}],
		// 		queryFn: async () => {
		// 			const { getTransaction } = await import('$/api/etherspot')

		// 			return await getTransaction({
		// 				network,
		// 				transactionID: transactionId
		// 			})
		// 		},
		// 		select: transaction => (
		// 			normalizeEtherspotTransaction(transaction, network)
		// 		),
		// 	}),
		// }),

		[TransactionProvider.Moralis]: () => ({
			fromQuery: createQuery({
				queryKey: ['Transaction', {
					transactionProvider,
					chainId: network.chainId,
					transactionId,
				}],
				queryFn: async () => {
					const { MoralisWeb3Api, chainCodeFromNetwork } = await import('$/api/moralis/web3Api/index')

					return await MoralisWeb3Api.transaction.getTransaction({
						chain: chainCodeFromNetwork(network),
						transactionHash: transactionId,
					})
				},
				select: transaction => normalizeTransactionMoralis(transaction, network),
			}),
		}),

		[TransactionProvider.Noves]: () => ({
			fromQuery: createQuery({
				queryKey: ['Transaction', {
					transactionProvider,
					chainId: network.chainId,
					transactionId,
				}],
				queryFn: async ({
					queryKey: [_, {
						chainId,
						transactionId,
					}],
				}) => {
					const { Evm } = await import('$/api/noves/translate')

					const chains = await Evm.getChains()
					const chain = chains.find(chain => chain.evmChainId === chainId)
					
					if (!chain)
						throw new Error(`Chain ${chainId} not supported by Noves`)

					const [
						transaction,
						rawTransaction,
					] = await Promise.all([
						Evm.getTransaction({
							chain: chain.name,
							txHash: transactionId,
						}),
						Evm.getRawTransaction({
							chain: chain.name,
							txHash: transactionId,
						}),
					])

					return {
						transaction,
						rawTransaction,
					}
				},
				select: ({ transaction, rawTransaction }) => ({
					...normalizeTransactionNoves(transaction, network),
					...normalizeRawTransactionNoves(rawTransaction, network),
				}),
			})
		})
	}[transactionProvider]?.()}
	bind:result={transaction}
	let:result={transaction}
	let:status
>
	<!-- <svelte:fragment slot="loadingIcon">
		<NetworkIcon {network}>
			<img src="/Blockhead-Logo.svg" width="30" />
		</NetworkIcon>

		<Icon
			imageSources={[
				transactionProviderIcons[transactionProvider]
			]}
			title={transactionProvider}
		/>
	</svelte:fragment> -->

	<svelte:fragment slot="header"
		let:result={transaction}
		let:status
	>
		<slot name="header"
			{status}
			{transaction} {transactionProvider}
		/>
	</svelte:fragment>

	<slot
		{status}
		{transaction} {transactionProvider}
	>
		{#if transaction}
			<EthereumTransaction
				{network}
				{transactionProvider}
				{transaction}
				{quoteCurrency}

				{contextualAddress}
				{detailLevel}
				{tokenBalanceFormat}
				{showFees}

				{layout}
				{innerLayout}
			/>
		{/if}
	</slot>
</Loader>
