<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { preferences } from '../data/ethereum/preferences'


	export let network: Ethereum.Network
	export let blockNumber: Ethereum.BlockNumber
	export let transactionProvider
	export let provider: Ethereum.Provider
	export let quoteCurrency
	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider
	
	
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false
	export let showTransactions = false


	import { networksBySlug } from '../data/ethereum/networks'

	export let navigationNetworks: Ethereum.Network[] = [
		networksBySlug['ethereum'],
		networksBySlug['polygon'],
		networksBySlug['avalanche'],
		networksBySlug['bsc'],
	]


	let block

	
	import { useQuery } from '@sveltestack/svelte-query'

	import { getBlock } from '../data/analytics/covalent'

	import { chainCodeFromNetwork, MoralisWeb3Api } from '../data/moralis/moralis-web3-api'


	import { toHex } from 'etherspot'


	import Date from './Date.svelte'
	import EthereumBlock from './EthereumBlock.svelte'
	import EthereumBlockNavigation from './EthereumBlockNavigation.svelte'
	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>


<style>
	.navigation {
		--padding-inner: 0.25em;

		/* margin: 0 calc(-1 * var(--padding-outer)); */
		margin-top: auto;
		padding: var(--padding-outer);

		backdrop-filter: var(--overlay-backdrop-filter);
		border-radius: var(--card-border-radius);
	}
	.navigation {
		position: sticky;
		bottom: 4rem;
		margin: 0 calc(-1 * var(--padding-outer));
		z-index: 1;
		font-size: 0.8em;
		background-color: rgba(0, 0, 0, 0.25);
	}
	/* .navigation {
		position: sticky;
		top: calc(100% - 8rem);
		bottom: 3.5rem;

		transition: 0.3s;
	}
	.navigation:not(:hover):not(:focus-within) {
		transform: translateY(calc(100% - 1em - var(--padding-outer) * 2));
	} */
</style>

<div class="block card">
	<div class="bar">
		<h2><EthereumBlockNumber {network} {blockNumber} /></h2>
		<span class="card-annotation">{network.name} {blockNumber == 0 ? 'Genesis Block' : 'Block'}</span>
	</div>

	{#if transactionProvider === 'Covalent'}
		<Loader
			loadingIcon={'/logos/Covalent.svg'}
			loadingIconName={transactionProvider}
			loadingMessage="Retrieving block data from {transactionProvider}..."
			errorMessage="Error retrieving block data from {transactionProvider}"
			fromUseQuery={useQuery({
				queryKey: ['Block', {
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

	{:else if transactionProvider === 'Moralis'}
		<Loader
			loadingIcon={'/logos/Moralis.svg'}
			loadingIconName={transactionProvider}
			loadingMessage="Retrieving block data from {transactionProvider}..."
			errorMessage="Error retrieving block data from {transactionProvider}"
			fromUseQuery={useQuery({
				queryKey: ['Block', {
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
				{provider}
				{quoteCurrency}
				{detailLevel}
				{tokenBalanceFormat}
				{showFees}
				{showTransactions}
			/>
		</Loader>

	{:else if transactionProvider === 'RPC Provider'}
		<Loader
			loadingIconName={transactionProvider}
			loadingMessage="Retrieving block data from {transactionProvider}..."
			errorMessage="Error retrieving block data from {transactionProvider}"
			fromUseQuery={provider && useQuery({
				queryKey: ['Block', {
					chainID: network.chainId,
					blockNumber
				}],
				queryFn: async () =>  {
					// for(let block; !block; block = await provider.getBlockWithTransactions(toHex(blockNumber)));
					// console.log('block', block)
					try {
						const block = await provider.getBlockWithTransactions(toHex(blockNumber))
						return block
					}catch(e){
						console.dir(e)
						if(e.body){
							const { error } = JSON.parse(e.body)
							console.error(e, error)
							throw error.message + Object.entries(error.data).map(([k, v]) => `\n${k}: ${v}`).join('')
						}else{
							throw e
						}
					}
				}
			})}
			bind:result={block}
			let:result={block}
		>
			<NetworkIcon slot="loadingIcon" {network} />

			<hr>

			{#if block}
				<EthereumBlock
					{network}
					{block}
					{transactionProvider}
					{provider}
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


<div class="navigation column">
	<EthereumBlockNavigation
		{network}
		{provider}
		blockNumber={Number(blockNumber)}
		showBeforeAndAfter
	/>

	{#if navigationNetworks && transactionProvider === 'Moralis' && block?.timestamp}
		{#each navigationNetworks.filter(_network => _network !== network) as network}
			{#await MoralisWeb3Api.dateToBlock.getDateToBlock({
				chain: chainCodeFromNetwork(network),
				date: block.timestamp
			}) then {block: blockNumber, timestamp}}
				{#if blockNumber > 1}
					<EthereumBlockNavigation
						{network}
						blockNumber={blockNumber > 1 ? Number(blockNumber) : undefined}
					/>
				{/if}
			{:catch error}
				{#if error?.message}
					{(console.error(error), error.message)}
				{/if}
			{/await}
		{/each}
	{/if}
</div>