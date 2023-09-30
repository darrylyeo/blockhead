<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'
	import type { QuoteCurrency } from '../data/currencies'
	import type { NetworkProvider } from '../data/networkProviders/types'
	import { TransactionProvider, transactionProviderIcons } from '../data/transactionProvider'
	import { getViemPublicClient } from '../data/networkProviders'
	import { preferences } from '../state/preferences'


	// Inputs
	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider
	export let transactionProvider: TransactionProvider
	export let transactionId: Ethereum.TransactionID
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
	import type { TransactionResponse } from 'ethers/types/providers'
	import type { Covalent } from '../api/covalent'
	import type { BlockTransaction } from '../api/moralis/api/Api'

	export let transaction: TransactionResponse | Covalent.Transaction | BlockTransaction | undefined

	// (Computed)

	let passive = !!transaction


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import { getTransaction as getTransactionCovalent } from '../api/covalent'
	// import { getTransaction as getTransactionEtherspot } from '../api/etherspot'
	import { MoralisWeb3Api, chainCodeFromNetwork } from '../api/moralis/web3Api'


	import { formatUnits } from 'ethers'

	const normalizeViemTransaction = (transaction: TransactionResponse) => ({
		network,

		transactionID: transaction.hash as Ethereum.TransactionID,
		nonce: transaction.nonce,
		transactionIndex: transaction.transactionIndex,
		blockNumber: transaction.blockNumber as Ethereum.BlockNumber,
		blockHash: transaction.blockHash as Ethereum.BlockHash,
		date: transaction.timestamp,

		isSuccessful: transaction.status != '0',

		fromAddress: transaction.from as Ethereum.Address,
		toAddress: transaction.to as Ethereum.Address,

		value: formatUnits(transaction.value, network.nativeCurrency.decimals),

		gasToken: network.nativeCurrency,
		gasOffered: transaction.gasLimit,
		gasSpent: transaction.gasUsed && formatUnits(transaction.gasUsed, 'wei'),
		gasRate: transaction.gasPrice,
		gasValue: transaction.gasPrice && transaction.gasUsed && formatUnits(transaction.gasPrice * transaction.gasUsed, network.nativeCurrency.decimals),
		
		logEvents: transaction.logs?.map(({
			address,
			blockHash,
			blockNumber,
			data,
			decoded,
			logIndex,
			topics,
			transactionHash,
			transactionIndex
		} : {
			address: string,
			blockHash: string,
			blockNumber: number,
			data: string,
			decoded: Ethereum.TransactionLogEventDecoded,
			logIndex: number,
			topics: string[],
			transactionHash: string,
			transactionIndex: number
		}) => ({
			indexInTransaction: logIndex,
			transactionHash,

			indexInBlock: transactionIndex,
			blockNumber,
			blockHash,

			topics,
			data,

			contract: {
				address
			},

			decoded
		} as Ethereum.TransactionLogEvent)),
	}) as Ethereum.Transaction


	// Components
	import EthereumTransaction from './EthereumTransaction.svelte'
	import EthereumTransactionCovalent from './EthereumTransactionCovalent.svelte'
	// import EthereumTransactionEtherspot from './EthereumTransactionEtherspot.svelte'
	import EthereumTransactionMoralis from './EthereumTransactionMoralis.svelte'
	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>


{#if transactionId}
	<div class="stack">
		{#key transactionProvider}
			<div class="column">
				{#if passive}
					<EthereumTransaction
						{network}
						transaction={normalizeViemTransaction(transaction)}
						{quoteCurrency}

						{layout}
						{innerLayout}

						{detailLevel}
						{showFees}
						{tokenBalanceFormat}
					
						{contextualAddress}
					/>
				{/if}

				{#if transactionProvider === TransactionProvider.RpcProvider}
					<Loader
						loadingIconName={transactionProvider}
						loadingMessage="Looking up transaction from {transactionProvider}..."
						errorMessage="Error looking up transaction from {transactionProvider}"
						contentClass="column"
						fromQuery={publicClient && createQuery({
							queryKey: ['Transaction', {
								transactionProvider,
								networkProvider,
								chainId: network.chainId,
								transactionId
							}],
							queryFn: async () => {
								const transaction = await publicClient.getTransaction({
									hash: transactionId
								})

								if(transaction?.blockNumber){
									transaction.logs = (
										await publicClient.getLogs({
											fromBlock: transaction.blockNumber - 1n,
											toBlock: transaction.blockNumber + 1n,
										})
									).filter(log => log.transactionHash === transaction.hash)

									/*
									const query = createQuery({
										queryKey: ['LogsByBlock', {
											transactionProvider,
											providerName,
											chainId: network.chainId,
											blockNumber: Number(transaction.blockNumber),
										}],
										queryFn: async () => (
											await publicClient.getLogs({
												fromBlock: transaction.blockNumber - 1n,
												toBlock: transaction.blockNumber + 1n,
											})
										)
									})

									const logs = await new Promise((resolve, reject) => {
										query.subscribe((result) => {
											if(result.isSuccess){
												resolve(result.data)
											}else if(result.isError){
												reject(result.error)
											}
										})
									})

									transaction.logs = logs.filter(log => log.transactionHash?.toLowerCase() === transaction.hash.toLowerCase())
									*/
								}

								return transaction
							}
						})}
						then={normalizeViemTransaction}
						let:result={transaction}
					>
						<NetworkIcon slot="loadingIcon" {network}><img src="/Blockhead-Logo.svg" width="30" /></NetworkIcon>

						<svelte:fragment slot="header"
							let:result={transaction}
							let:status
						>
							<slot name="header" {status} {transaction} />
						</svelte:fragment>

						<EthereumTransaction
							{network}
							{transaction}
							{quoteCurrency}

							{layout}
							{innerLayout}

							{detailLevel}
							{showFees}
							{tokenBalanceFormat}
						
							{contextualAddress}
						/>
					</Loader>
				{:else if transactionProvider === TransactionProvider.Covalent}
					<Loader
						loadingIcon={transactionProviderIcons[transactionProvider]}
						loadingMessage="Fetching transaction data via {transactionProvider}..."
						fromQuery={createQuery({
							queryKey: ['Transaction', {
								transactionProvider,
								chainId: network.chainId,
								transactionId,
							}],
							queryFn: async () => (
								await getTransactionCovalent({
									chainID: network.chainId,
									transactionHash: transactionId,
									includeLogs: true
								})
								.then(({ items: [transaction] }) => transaction)
							)
						})}
						bind:result={transaction}
						let:result={transaction}
					>
						<svelte:fragment slot="header"
							let:result={transaction}
							let:status
						>
							<slot name="header" {status} {transaction} />
						</svelte:fragment>

						<EthereumTransactionCovalent
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
					</Loader>

				<!-- {:else if transactionProvider === TransactionProvider.Etherspot}
					<Loader
						loadingIcon={transactionProviderIcons[transactionProvider]}
						loadingMessage="Fetching transaction data via {transactionProvider}..."
						fromQuery={createQuery({
							queryKey: ['Transaction', {
								transactionProvider,
								chainId: network.chainId
								transactionId,
							}],
							queryFn: async () => (
								await getTransactionEtherspot({
									network,
									transactionID: transactionId
								})
							)
						})}
						let:result={transaction}
					>
						<svelte:fragment slot="header"
							let:result={transaction}
							let:status
						>
							<slot name="header" {status} {transaction} />
						</svelte:fragment>

						<EthereumTransactionEtherspot
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
					</Loader> -->

				{:else if transactionProvider === TransactionProvider.Moralis}
					<Loader
						loadingIcon={transactionProviderIcons[transactionProvider]}
						loadingMessage="Fetching transaction data via {transactionProvider}..."
						fromQuery={createQuery({
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
							)
						})}
						bind:result={transaction}
						let:result={transaction}
					>
						<svelte:fragment slot="header"
							let:result={transaction}
							let:status
						>
							<slot name="header" {status} {transaction} />
						</svelte:fragment>

						<EthereumTransactionMoralis
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
					</Loader>
				{/if}
			</div>
		{/key}
	</div>
{/if}
