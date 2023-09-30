<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'
	import { TransactionProvider, transactionProviderIcons } from '../data/transactionProvider'
	import type { NetworkProvider } from '../data/networkProviders/types'
	import type { QuoteCurrency } from '../data/currencies'
	import { getViemPublicClient } from '../data/networkProviders'
	import { updatesByNetwork } from '../data/networks/updates'


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
	
	// (View options)
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false
	export let showTransactions = false


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

	// (Computed)
	$: lastUpdate = block && updatesByNetwork.get(network)?.find(upgrade => block?.blockNumber >= upgrade.blockNumber)


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import { getBlock } from '../api/covalent'

	import { chainCodeFromNetwork, MoralisWeb3Api } from '../api/moralis/web3Api'


	// Components
	import Date from './Date.svelte'
	import EthereumBlock from './EthereumBlock.svelte'
	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>


<div class="block card">
	<div class="bar">
		<h2><EthereumBlockNumber {network} {blockNumber} tween={false} /></h2>
		<span class="card-annotation">
			{network.name} {blockNumber == 0 ? 'Genesis Block' : 'Block'}

			{#if lastUpdate}(<a href={lastUpdate.links[0]} target="_blank">{lastUpdate.name}</a>){/if}
		</span>
	</div>

	<div class="stack">
		{#if transactionProvider === TransactionProvider.Covalent}
			<Loader
				loadingIcon={transactionProviderIcons[transactionProvider]}
				loadingIconName={transactionProvider}
				{loadingMessage}
				{errorMessage}
				contentClass="column"
				fromQuery={createQuery({
					queryKey: ['Block', {
						transactionProvider,
						chainID: network.chainId,
						blockNumber
					}],
					queryFn: async () => (
						(await getBlock({
							chainID: network.chainId,
							blockNumber
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
				})}
				bind:result={block}
				let:result={block}
			>
				<hr>

				<div class="footer bar">
					<span />
					<Date date={block?.timestamp} layout="horizontal" />
				</div>

				<!-- {#each block.transactions ?? [] as transaction}
					<EthereumTransactionsLoader
						{network}
						{blockNumber}
						{provider}
						{transactionProvider}
						{quoteCurrency}
						includeLogs={detailLevel === 'exhaustive'}
						let:transactions
					>
						<svelte:fragment slot="header" let:status>
							<div class="bar">
								<h3>
									Transactions
									{#if status === 'resolved'}({block.transactions.length}{block.transactions.length === 100 ? '+' : ''}){/if}
								</h3>
								<label>
									<input type="checkbox" bind:checked={showFees}>
									<span>Show Fees</span>
								</label>
								<label>
									<span>View</span>
									<select bind:value={detailLevel}>
										<option value="summary">Summary</option>
										<option value="detailed">Detailed</option>
										<option value="exhaustive">Exhaustive</option>
									</select>
								</label>
							</div>
						</svelte:fragment>
					</EthereumTransactionsLoader>
				{/each} -->
			</Loader>

		{:else if transactionProvider === TransactionProvider.Moralis}
			<Loader
				loadingIcon={transactionProviderIcons[transactionProvider]}
				loadingIconName={transactionProvider}
				{loadingMessage}
				{errorMessage}
				contentClass="column"
				fromQuery={createQuery({
					queryKey: ['Block', {
						transactionProvider,
						chainID: network.chainId,
						blockNumber
					}],
					queryFn: async () => (
						MoralisWeb3Api.block.getBlock({
							chain: chainCodeFromNetwork(network),
							blockNumberOrHash: blockNumber
						}).then(({
							timestamp,
							number,
							hash,
							parent_hash,
							nonce,
							sha3_uncles,
							logs_bloom,
							transactions_root,
							state_root,
							receipts_root,
							miner,
							difficulty,
							total_difficulty,
							size,
							extra_data,
							gas_limit,
							gas_used,
							transaction_count,
							transactions
						}) => ({
							hash: hash,
							parentHash: parent_hash,
							blockNumber: number,
							timestamp: timestamp,
							nonce,

							difficulty,
							totalDifficulty: total_difficulty,
							gasLimit: gas_limit,
							gasUsed: gas_used,

							minerAddress: miner,
							extraData: extra_data,

							transactions: transactions.sort((transaction1, transaction2) => transaction1.indexInBlock - transaction2.indexInBlock)
						}))
						.catch((e) => {
							throw new Error(`Moralis hasn't yet indexed ${network.name} block #${blockNumber}.`) 
						})
					)
				})}
				bind:result={block}
				showIf={block => block}
				let:result={block}
			>
				<hr>

				<EthereumBlock
					{network}
					{block}
					{transactionProvider}
					{quoteCurrency}
					{detailLevel}
					{tokenBalanceFormat}
					{showFees}
					{showTransactions}
				/>
			</Loader>

		{:else if transactionProvider === TransactionProvider.RpcProvider}
			<Loader
				loadingIconName={transactionProvider}
				{loadingMessage}
				{errorMessage}
				contentClass="column"
				fromQuery={publicClient && createQuery({
					queryKey: ['Block', {
						transactionProvider,
						networkProvider,
						chainID: network.chainId,
						blockNumber,
					}],
					queryFn: async () => (
						await publicClient.getBlock(Number(blockNumber))
					)
				})}
				bind:result={block}
				then={block => (block && {
					...block,
					timestamp: block.date,
					transactions: block.transactions,
					prefetchedTransactions: block.prefetchedTransactions,
				})}
				let:result={block}
			>
				<NetworkIcon slot="loadingIcon" {network} />

				<hr>

				{#if block}
					<EthereumBlock
						{network}
						{block}
						{transactionProvider}
						{quoteCurrency}
						{detailLevel}
						{tokenBalanceFormat}
						{showFees}
						{showTransactions}
					/>
				{:else}
					No data provided.
				{/if}
			</Loader>
		{/if}
	</div>
</div>
