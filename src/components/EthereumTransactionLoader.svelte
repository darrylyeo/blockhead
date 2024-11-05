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
		status: Loader<any, any, any, any, any>['$$slot_def']['default']['status'],
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import { normalizeTransaction as normalizeViemTransaction } from '$/api/viem/normalize'
	import { getTransaction, getTransactionReceipt } from 'viem/actions'

	import { getBlockscoutRestEndpoint } from '$/api/blockscout/index'
	import { getTx as getTransactionBlockscout } from '$/api/blockscout/rest/index'
	import { normalizeTransaction as normalizeTransactionBlockscout } from '$/api/blockscout/rest/normalize'

	import { getTransaction as getTransactionChainbase } from '$/api/chainbase/index'
	import { normalizeTransaction as normalizeTransactionChainbase } from '$/api/chainbase/normalize'

	import { getTransaction as getTransactionCovalent } from '$/api/covalent/index'
	import { normalizeTransaction as normalizeTransactionCovalent } from '$/api/covalent/normalize'

	import { normalizeTransaction as normalizeTransactionDecommas } from '$/api/decommas/normalize'

	import { Etherscan } from '$/api/etherscan/index'
	import { normalizeRpcTransaction as normalizeTransactionEtherscan, normalizeRpcTransactionReceipt as normalizeTransactionReceiptEtherscan } from '$/api/etherscan/normalize'

	// import { getTransaction as getTransactionEtherspot, normalizeTransaction as normalizeEtherspotTransaction } from '$/api/etherspot'

	import { MoralisWeb3Api, chainCodeFromNetwork } from '$/api/moralis/web3Api/index'
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
	loadingMessage="Looking up {network.name} transaction via {transactionProvider}..."
	errorMessage="Error looking up transaction from {transactionProvider}"
	{...{
		[TransactionProvider.RpcProvider]: {
			fromQuery: publicClient && createQuery({
				queryKey: ['Transaction', {
					transactionProvider,
					networkProvider,
					chainId: network.chainId,
					transactionId
				}],
				queryFn: async () => {
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
		},

		[TransactionProvider.Blockscout]: {
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
				}) => (
					await getTransactionBlockscout(
						transactionId,
						{
							baseUrl: getBlockscoutRestEndpoint(chainId),
						}
					)
				),
				select: result => (
					normalizeTransactionBlockscout(result, network)
				),
			}),
		},

		[TransactionProvider.Chainbase]: {
			fromQuery: createQuery({
				queryKey: ['Transaction', {
					transactionProvider,
					chainId: network.chainId,
					transactionId,
				}],
				queryFn: async () => {
					const result = await getTransactionChainbase({
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
		},

		[TransactionProvider.Covalent]: {
			fromQuery: createQuery({
				queryKey: ['Transaction', {
					transactionProvider,
					chainId: network.chainId,
					transactionId,
				}],
				queryFn: async () => (
					await getTransactionCovalent({
						chainName: network.chainId,
						txHash: transactionId,
						noLogs: false,
					})
				),
				select: ({ items: [transaction] }) => (
					normalizeTransactionCovalent(transaction, network, quoteCurrency)
				),
			}),
		},

		[TransactionProvider.Decommas]: {
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
		},

		[TransactionProvider.Etherscan]: {
			fromQuery: createQuery({
				queryKey: ['Transaction', {
					transactionProvider,
					chainId: network.chainId,
					transactionId,
				}],
				queryFn: async () => {
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
		},

		// [TransactionProvider.Etherspot]: {
		// 	fromQuery: createQuery({
		// 		queryKey: ['Transaction', {
		// 			transactionProvider,
		// 			chainId: network.chainId,
		// 			transactionId,
		// 		}],
		// 		queryFn: async () => (
		// 			await getTransactionEtherspot({
		// 				network,
		// 				transactionID: transactionId
		// 			})
		// 		),
		// 		select: transaction => (
		// 			normalizeEtherspotTransaction(transaction, network)
		// 		),
		// 	}),
		// },

		[TransactionProvider.Moralis]: {
			fromQuery: createQuery({
				queryKey: ['Transaction', {
					transactionProvider,
					chainId: network.chainId,
					transactionId,
				}],
				queryFn: async () => (
					await MoralisWeb3Api.transaction.getTransaction({
						chain: chainCodeFromNetwork(network),
						transactionHash: transactionId,
					})
				),
				select: transaction => normalizeTransactionMoralis(transaction, network),
			}),
		},

		[TransactionProvider.Noves]: {
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
					const { Noves } = await import('$/api/noves')

					const chains = await Noves.Translate.Evm.getChains()
					const chain = chains.find(chain => chain.evmChainId === chainId)
					
					if (!chain)
						throw new Error(`Chain ${chainId} not supported by Noves`)

					// const result = await Noves.Translate.Evm.getTransaction({
					// 	chain: chain.name,
					// 	txHash: transactionId,
					// })

					const result = await Noves.Translate.Evm.getRawTransaction({
						chain: chain.name,
						txHash: transactionId,
					})

					if (!result)
						throw new Error('Transaction not found')

					return result
				},
				select: result => (
					// normalizeTransactionNoves(result, network)
					normalizeRawTransactionNoves(result, network)
				),
			})
		}
	}[transactionProvider]}
	bind:result={transaction}
	let:result={transaction}
	let:status
>
	<svelte:fragment slot="loadingIcon">
		<NetworkIcon {network}>
			<img src="/Blockhead-Logo.svg" width="30" />
		</NetworkIcon>

		<Icon
			imageSources={[
				transactionProviderIcons[transactionProvider]
			]}
			title={transactionProvider}
		/>
	</svelte:fragment>

	<svelte:fragment slot="header"
		let:result={transaction}
		let:status
	>
		<slot name="header" {status} {transaction} />
	</svelte:fragment>

	<slot {status} {transaction}>
		{#if transaction}
			<EthereumTransaction
				{network}
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
