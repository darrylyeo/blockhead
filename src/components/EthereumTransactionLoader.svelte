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
	import type { TransactionResponse } from 'ethers'
	import type { Covalent } from '../api/covalent'
	import type { BlockTransaction } from '../api/moralis/api/Api'

	export let transaction: TransactionResponse | Covalent.Transaction | BlockTransaction | undefined


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import { normalizeViemTransaction } from '../api/viem'
	import { getTransaction as getTransactionChainbase, normalizeTransaction as normalizeTransactionChainbase } from '../api/chainbase'
	import { getTransaction as getTransactionCovalent, normalizeTransaction as normalizeTransactionCovalent } from '../api/covalent'
	import { normalizeTransaction as normalizeTransactionDecommas } from '../api/decommas/normalize'
	// import { getTransaction as getTransactionEtherspot, normalizeTransaction as normalizeEtherspotTransaction } from '../api/etherspot'
	import { MoralisWeb3Api, chainCodeFromNetwork, normalizeMoralisTransaction } from '../api/moralis/web3Api'



	// Components
	import EthereumTransaction from './EthereumTransaction.svelte'
	import EthereumTransactionCovalent from './EthereumTransactionCovalent.svelte'
	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>


{#if transactionId}
	<div class="stack">
		{#key transactionProvider}
			<div class="column">
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

								const transactionReceipt = await publicClient.getTransactionReceipt({
									hash: transactionId
								})

								return { transaction: { ...transaction, ...transactionReceipt } }
							},
							select: ({ transaction, logs }) => normalizeViemTransaction(transaction, network, logs),
						})}
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

				{:else if transactionProvider === TransactionProvider.Chainbase}
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
								await getTransactionChainbase({
									chainId: network.chainId,
									hash: transactionId,
								})
							),
							select: result => normalizeTransactionChainbase(result.data, network),
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
									chainId: network.chainId,
									transactionHash: transactionId,
									includeLogs: true
								})
							),
							select: ({ items: [transaction] }) => (
								normalizeTransactionCovalent(transaction, network, quoteCurrency)
							),
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

				{:else if transactionProvider === TransactionProvider.Decommas}
					<Loader
						loadingIcon={transactionProviderIcons[transactionProvider]}
						loadingMessage="Fetching transaction data via {transactionProvider}..."
						fromQuery={createQuery({
							queryKey: ['Transaction', {
								transactionProvider,
								chainId: network.chainId,
								transactionId,
							}],
							queryFn: async () => {
								const { decommas, chainNameByChainId } = await import('../api/decommas')

								const chainName = chainNameByChainId[network.chainId]

								return await decommas.tx.getDetail({
									chainName,
									txHash: transactionId,
								})
							},
							select: transaction => (
								normalizeTransactionDecommas(transaction, network)
							),
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
					</Loader>

				<!-- {:else if transactionProvider === TransactionProvider.Etherspot}
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
								await getTransactionEtherspot({
									network,
									transactionID: transactionId
								})
							),
							select: transaction => (
								normalizeEtherspotTransaction(transaction, network)
							),
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
							),
							select: transaction => normalizeMoralisTransaction(transaction, network),
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
					</Loader>
				{/if}
			</div>
		{/key}
	</div>
{/if}
