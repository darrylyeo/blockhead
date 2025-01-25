<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { networkBySlug } from '$/data/networks'
	
	
	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let block: Filecoin.Block

	// (View options)
	export let isOpen = true
	export let layout: 'standalone' | 'inline' = 'inline'
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 4
	
	
	// Components
	import AddressWithLabel from './AddressWithLabel.svelte'
	import BlockNumber from './BlockNumber.svelte'
	import Collapsible from './Collapsible.svelte'
	import DateTime from './DateTime.svelte'
	import FilecoinBlockLoader from './FilecoinBlockLoader.svelte'
	import FilecoinBlockCid from './FilecoinBlockCid.svelte'
	import FilecoinTransactionsLoader from './FilecoinTransactionsLoader.svelte'
	import FilecoinTransactions from './FilecoinTransactions.svelte'
	import IpfsContentId from './IpfsContentId.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TweenedNumber from './TweenedNumber.svelte'
</script>


<Collapsible
	type="label"
	bind:isOpen
	canToggle={false}
	containerClass="column {layout === 'standalone' ? 'card' : ''}"
	class="column"
>
	<svelte:fragment slot="title">
		<div class="row wrap">
			<svelte:element this={`h${headingLevel}`}>
				{#if block.tipset?.number !== undefined}
					<BlockNumber
						{network}
						blockNumber={block.tipset.number}
					/>

					›
				{/if}

				<FilecoinBlockCid
					{network}
					blockCid={block.cid}
					format="middle-truncated"
				/>
			</svelte:element>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">
			{network.name} Block
		</span>
	</svelte:fragment>

	<hr>

	<section>
		<Collapsible
			type="label"
			class="column"
			canToggle
			isOpen
		>
			<svelte:fragment slot="title">
				<svelte:element this={`h${headingLevel + 1}`}>Network Consensus</svelte:element>
			</svelte:fragment>

			<svelte:fragment slot="header-right">
				<span class="card-annotation">
					<a href="https://spec.filecoin.io/algorithms/expected_consensus/" target="_blank">Expected Consensus</a>
				</span>
			</svelte:fragment>

			<div class="consensus card column">
				<div class="row wrap">
					<span>
						Miner

						{#if block.miner?.shortAddress ?? block.miner?.robustAddress}
							<span class="miner-address">
								<AddressWithLabel
									{network}
									address={block.miner?.shortAddress ?? block.miner?.robustAddress}
									addressFormat="middle-truncated"
									label={block.labels?.miner?.label}
								/>
							</span>
						{/if}
					</span>

					<span>
						included

						<span>
							{#if block.transactionsCount !== undefined}
								<TweenedNumber
									value={block.transactionsCount}
								/>
							{:else}
								some
							{/if}
							{block.transactionsCount === 1 ? 'transaction' : 'transactions'}
						</span>
					</span>

					{#if block.stateRoot}
						<span>
							and state root
							<small>(<IpfsContentId
								ipfsContentId={block.stateRoot}
								format="middle-truncated"
							/>)</small>
						</span>
					{/if}

					<span>
						in block
					</span>


					{#if
						block.parentBlocks
						|| block.weight !== undefined
					}
						<hr>
					{/if}

					{#if block.parentBlocks}
						<span class="row">
							<span>
								referencing

								<span>
									{block.parentBlocks.length}
									{block.parentBlocks.length === 1 ? 'block' : 'blocks'}
								</span>

								<small>
									(<ul class="row inline wrap">
										{#each block.parentBlocks as parentBlock (parentBlock.cid)}
											<li>
												<FilecoinBlockCid
													{network}
													blockCid={parentBlock.cid}
													truncateOptions={{
														// startLength: 6,
														// endLength: 4,
													}}
												/>
											</li>
										{/each}
									</ul>)
								</small>

								from

								<span>
									{#if (block.tipset?.previousTipset?.number ?? block.tipset?.number) !== undefined}
										tipset
										<BlockNumber
											{network}
											blockNumber={block.tipset.previousTipset?.number ?? block.tipset.number - 1n}
										/>
									{:else}
										previous tipset
									{/if}
								</span>
							</span>
						</span>
					{/if}

					{#if block.weight !== undefined}
						<span>
							with cumulative weight
							<TweenedNumber
								value={Number(block.weight)}
							/>
						</span>
					{/if}


					{#if
						block.tipset?.number !== undefined
						|| block.winCount !== undefined
					}
						<hr>
					{/if}

					{#if block.tipset?.number !== undefined}
						<span>
							and
							included in

							<span>
								tipset

								<BlockNumber
									{network}
									blockNumber={block.tipset.number}
								/>
							</span>
						</span>
					{/if}

					{#if block.winCount !== undefined}
						<span>
							with win count
							<TweenedNumber
								value={block.winCount}
							/>
						</span>
					{/if}


					{#if
						block.reward !== undefined && block.reward > 0
						|| block.penalty !== undefined && block.penalty > 0
					}
						<hr>
					{/if}

					{#if block.reward !== undefined && block.reward > 0}
						<span>
							earning reward
							<TokenBalance
								{network}
								token={{
									chainId: network.chainId,
									...network.nativeCurrency,
								}}
								balance={block.reward}
							/>
						</span>
					{/if}

					{#if block.penalty !== undefined && block.penalty > 0}
						<span>
							{#if block.reward !== undefined && block.reward > 0}
								but
							{/if}

							incurring penalty
							<TokenBalance
								{network}
								token={{
									chainId: network.chainId,
									...network.nativeCurrency,
								}}
								balance={block.penalty}
								showDecimalPlaces={network.nativeCurrency.decimals}
							/>
						</span>
					{/if}
				</div>
			</div>
		</Collapsible>
	</section>

	<hr>

	<section>
		<header class="bar">
			<svelte:element this={`h${headingLevel + 1}`}>Economics</svelte:element>
		</header>

		<div class="card">
			<dl>
				{#if block.baseGasRate !== undefined}
					<dt>Base gas rate</dt>
					<dd>
						<TokenBalance
							{network}
							token={{
								chainId: network.chainId,
								...network.nativeCurrency,
							}}
							balance={block.baseGasRate}
							showDecimalPlaces={network.nativeCurrency.decimals}
						/>
						/ gas unit
					</dd>
				{/if}
			</dl>
		</div>
	</section>

	<hr>

	<section>
		<FilecoinTransactionsLoader
			{network}
			query={{
				blockCid: block.cid,
			}}
			bind:transactions={block.transactions}
			bind:transactionsCount={block.transactionsCount}
			let:transactions
			let:transactionsCount
			let:pagination
		>
			<FilecoinTransactions
				{network}
				{transactions}
				{transactionsCount}
				{pagination}
				isOpen
			/>
		</FilecoinTransactionsLoader>
	</section>

	<hr>

	{#if block.parentBlocks}
		<Collapsible>
			<svelte:fragment slot="title">
				<svelte:element this={`h${headingLevel + 1}`}>
					Parent Blocks
					
					{#if block.tipset?.number !== undefined}
						<small>
							from tipset
							<BlockNumber
								{network}
								blockNumber={block.tipset.number - 1n}
							/>
						</small>
					{/if}

					<small>
						({block.parentBlocks.length})
					</small>
				</svelte:element>
			</svelte:fragment>

			<ul class="column scrollable-list">
				{#each block.parentBlocks as parentBlock}
					<li class="scrollable-list-item">
						<FilecoinBlockLoader
							{network}
							blockCid={parentBlock.cid}
							let:block
						>
							{#if block}
								<div class="card">
									<svelte:self
										{network}
										{block}
										headingLevel={headingLevel + 2}
										isOpen={false}
									/>
								</div>
							{/if}
						</FilecoinBlockLoader>
					</li>
				{/each}
			</ul>
		</Collapsible>
	{/if}

	<hr>

	<footer class="footer row">
		<span class="row inline wrap">
			<span>
				Block
				<FilecoinBlockCid
					{network}
					blockCid={block.cid}
					format="middle-truncated"
				/>
			</span>

			{#if block.tipset?.number !== undefined}
				in

				<span>
					tipset
					<BlockNumber
						{network}
						blockNumber={block.tipset.number}
					/>
				</span>
			{/if}
		</span>

		{#if block.tipset?.timestamp}
			<DateTime
				date={block.tipset.timestamp}
				layout="horizontal"
			/>
		{/if}
	</footer>
</Collapsible>
