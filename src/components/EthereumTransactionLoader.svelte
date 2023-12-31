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

	import { normalizeTransaction as normalizeViemTransaction } from '../api/viem/normalize'

	import { getTransaction as getTransactionChainbase } from '../api/chainbase/index'
	import { normalizeTransaction as normalizeTransactionChainbase } from '../api/chainbase/normalize'

	import { getTransaction as getTransactionCovalent } from '../api/covalent/index'
	import { normalizeTransaction as normalizeTransactionCovalent } from '../api/covalent/normalize'

	import { normalizeTransaction as normalizeTransactionDecommas } from '../api/decommas/normalize'

	import { Etherscan } from '../api/etherscan/index'
	import { normalizeRpcTransaction as normalizeTransactionEtherscan, normalizeRpcTransactionReceipt as normalizeTransactionReceiptEtherscan } from '../api/etherscan/normalize'

	// import { getTransaction as getTransactionEtherspot, normalizeTransaction as normalizeEtherspotTransaction } from '../api/etherspot'

	import { MoralisWeb3Api, chainCodeFromNetwork } from '../api/moralis/web3Api/index'
	import { normalizeTransaction as normalizeTransactionMoralis } from '../api/moralis/web3Api/normalize'


	// Components
	import EthereumTransaction from './EthereumTransaction.svelte'
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
								const [
									transaction,
									transactionReceipt,
								] = await Promise.all([
									publicClient.getTransaction({
										hash: transactionId
									}),
									publicClient.getTransactionReceipt({
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

						{#if transaction}
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
						{/if}
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
									chainName: network.chainId,
									txHash: transactionId,
									noLogs: false,
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

				{:else if transactionProvider === TransactionProvider.Etherscan}
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
							select: ({ transaction, transactionReceipt }) => ({
								...normalizeTransactionReceiptEtherscan(network, transactionReceipt),
								...normalizeTransactionEtherscan(network, transaction),
							}),
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
							select: transaction => normalizeTransactionMoralis(transaction, network),
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
				{/if}
			</div>
		{/key}
	</div>
{/if}
