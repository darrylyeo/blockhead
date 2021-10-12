<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { preferences } from '../data/ethereum/preferences'

	import { getBlock } from '../data/analytics/covalent'
	import { chainCodeFromNetwork, MoralisWeb3Api } from '../data/moralis/moralis-web3-api'


	export let network: Ethereum.Network
	export let blockNumber: Ethereum.BlockNumber
	export let transactionProvider
	export let provider: Ethereum.Provider
	export let quoteCurrency
	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider
	
	
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let showValues: 'original' | 'converted' | 'both' = 'original'
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

	
	import { toHex } from 'etherspot'


	import Date from './Date.svelte'
	import EthereumBlock from './EthereumBlock.svelte'
	import EthereumBlockNavigation from './EthereumBlockNavigation.svelte'
	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
	import Loader from './Loader.svelte'
	import TokenIcon from './TokenIcon.svelte'
</script>


<style>
	.navigation {
		--padding-inner: 0.25em;
	}
	.navigation {
		/* margin: 0 calc(-1 * var(--padding-outer)); */
		margin-top: auto;
		padding: var(--padding-outer);

		backdrop-filter: var(--overlay-backdrop-filter);
		border-radius: var(--card-border-radius);
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
			loadingIcon={'/logos/covalent-logomark.svg'}
			loadingIconName={transactionProvider}
			loadingMessage="Retrieving block data from {transactionProvider}..."
			errorMessage="Error retrieving block data from {transactionProvider}"
			fromPromise={async () =>
				(await getBlock({blockNumber, chainID: network.chainId}))
					.items.map(({
						height,
						signed_at
					}) => ({
						blockNumber: height,
						timestamp: signed_at
					}))
					?.[0]
			}
			bind:result={block}
			let:then={block}
		>
			<hr>

			<div class="footer bar">
				<span />
				<Date date={block.timestamp} layout="horizontal" />
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
			loadingIcon={'/logos/moralis-icon.svg'}
			loadingIconName={transactionProvider}
			loadingMessage="Retrieving block data from {transactionProvider}..."
			errorMessage="Error retrieving block data from {transactionProvider}"
			fromPromise={async () =>
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
					throw new Error(`Moralis hasn't yet indexed block #${blockNumber}.`) 
				})
			}
			bind:result={block}
			showIf={block => block}
			let:then={block}
		>
			<hr>

			<EthereumBlock
				{network}
				{block}
				{transactionProvider}
				{provider}
				{quoteCurrency}
				{detailLevel}
				{showValues}
				{showFees}
				{showTransactions}
			/>
		</Loader>

	{:else if transactionProvider === 'RPC Provider'}
		<Loader
			loadingIconName={transactionProvider}
			loadingMessage="Retrieving block data from {transactionProvider}..."
			errorMessage="Error retrieving block data from {transactionProvider}"
			fromPromise={provider && (async () => {
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
			})}
			bind:result={block}
			let:then={block}
		>
			<TokenIcon slot="loadingIcon" symbol={network.nativeCurrency.symbol} />

			<hr>

			{#if block}
				<EthereumBlock
					{network}
					{block}
					{transactionProvider}
					{provider}
					{quoteCurrency}
					{detailLevel}
					{showValues}
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
</div>