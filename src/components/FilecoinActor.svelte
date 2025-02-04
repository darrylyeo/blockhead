<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import { Filecoin } from '$/data/filecoin'
	import { networkBySlug } from '$/data/networks'
	import { type FilecoinTransactionProvider, filecoinTransactionProviders } from '$/data/filecoinTransactionProviders'
	import { filecoinTokenBalancesProviders } from '$/data/filecoinTokenBalancesProviders'


	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let displayedAddress: Filecoin.Address
	export let actor: Filecoin.Actor
	export let layout: 'default' | 'inline' = 'default'

	// (Sources)
	export let filecoinTransactionProvider: FilecoinTransactionProvider

	// (View options)
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3


	// Internal state
	$: actorType = Filecoin.actorTypes[actor.type]


	// Functions
	import { isTruthy } from '$/utils/isTruthy'

	import { formatIdentifierToWords } from '$/utils/formatIdentifierToWords'


	// Components
	import Address from './Address.svelte'
	import BlockNumber from './BlockNumber.svelte'
	import Collapsible from './Collapsible.svelte'
	import DateTime from './DateTime.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import FilecoinActorDetailsLoader from './FilecoinActorDetailsLoader.svelte'
	import FilecoinAddressDetails from './FilecoinAddressDetails.svelte'
	import FilecoinBalancesLoader from './FilecoinBalancesLoader.svelte'
	import FilecoinMinerDetails from './FilecoinMinerDetails.svelte'
	import FilecoinTransactionsLoader from './FilecoinTransactionsLoader.svelte'
	import FilecoinTransactions from './FilecoinTransactions.svelte'
	import FilecoinTransfersLoader from './FilecoinTransfersLoader.svelte'
	import FilecoinTransfers from './FilecoinTransfers.svelte'
	import InlineTransition from './InlineTransition.svelte'
	import IpfsContentId from './IpfsContentId.svelte'
	import ScrollContainer from './ScrollContainer.svelte'
	import TransactionId from './TransactionId.svelte'
</script>


<article class="card">
	<Collapsible
		type="label"
		isOpen={layout === 'default'}
		canToggle={layout === 'inline'}
		class="column"
	>
		<svelte:fragment slot="title">
			<svelte:element this={`h${headingLevel}`}>
				<InlineTransition align="start"
					key={displayedAddress}
				>
					<Address
						{network}
						address={displayedAddress}
					/>
				</InlineTransition>
			</svelte:element>
		</svelte:fragment>

		<svelte:fragment slot="header-right">
			<span class="card-annotation">
				Filecoin Actor
				({#if actorType?.links}<a href={actorType.links[0]} target="_blank">{actorType.name}</a>{:else}{actorType?.name ?? formatIdentifierToWords(actor.type, true)}{/if})
			</span>
		</svelte:fragment>

		<div class="row flex-fill align-top wrap">
			<section class="card">
				<header class="bar wrap">
					<svelte:element this={`h${headingLevel + 2}`}>Actor Details</svelte:element>
				</header>

				<hr>

				<dl>
					<dt>Type</dt>
					<dd>
						<InlineTransition align="start"
							key={actorType}
						>
							<a
								href={actorType?.links?.[0]}
								target="_blank"
							>
								{actorType?.name ?? formatIdentifierToWords(actor.type, true)}
							</a>
						</InlineTransition>
					</dd>

					{#if 'cid' in actor && actor.cid}
						<dt>CID</dt>
						<dd>
							<output>
								<InlineTransition align="start"
									key={actor.cid}
								>
									<IpfsContentId
										ipfsContentId={actor.cid}
										format="middle-truncated"
									/>
								</InlineTransition>
							</output>
						</dd>
					{/if}

					{#each (
						[
							actor.lastActiveAt && {
								label: 'Last Active',
								timeReference: actor.lastActiveAt,
							},
							actor.createdAt && {
								label: 'Created',
								timeReference: actor.createdAt,
							},
						]
							.filter(isTruthy)
					) as { label, timeReference } (label)}
						<dt>{label}</dt>
						<dd>
							{#if 'transaction' in timeReference && timeReference.transaction?.cid}
								<InlineTransition align="start"
									key={timeReference.transaction.cid}
								>
									<TransactionId
										{network}
										transactionId={timeReference.transaction.cid}
										format="middle-truncated"
										truncateOptions={{
											startLength: 8,
											endLength: 6,
										}}
									/>
								</InlineTransition>
							{/if}

							{#if 'tipset' in timeReference && timeReference.tipset}
								<div class="column inline">
									{#if timeReference.tipset.timestamp}
										<InlineTransition align="start"
											key={timeReference.tipset.timestamp}
										>
											<DateTime
												date={timeReference.tipset.timestamp}
												format="relative"
											/>
										</InlineTransition>
									{/if}

									{#if timeReference.tipset.number !== undefined}
										<small>
											at
											<span>
												tipset

												<InlineTransition align="start"
													key={timeReference.tipset.number}
												>
													<BlockNumber
														{network}
														blockNumber={timeReference.tipset.number}
													/>
												</InlineTransition>
											</span>
										</small>
									{/if}
								</div>
							{/if}
						</dd>
					{/each}

					{#if 'creator' in actor && actor.creator}
						<dt>Creator</dt>
						<dd>
							<InlineTransition align="start"
								key={actor.creator.robustAddress ?? actor.creator.shortAddress}
							>
								<Address
									{network}
									address={actor.creator.robustAddress ?? actor.creator.shortAddress}
									format="middle-truncated"
								/>
							</InlineTransition>
						</dd>
					{/if}
				</dl>
			</section>

			<section class="card">
				<header class="bar wrap">
					<svelte:element this={`h${headingLevel + 2}`}>Aliases</svelte:element>
				</header>
		
				<hr>
		
				<dl>
					{#if actor.shortAddress}
						<dt>
							<a href="https://docs.filecoin.io/smart-contracts/filecoin-evm-runtime/address-types#id-addresses" target="_blank">ID Address</a>
						</dt>
						<dd>
							<InlineTransition align="start"
								key={actor.shortAddress}
							>
								<Address
									{network}
									address={actor.shortAddress}
								/>
							</InlineTransition>
						</dd>
					{/if}

					{#if 'robustAddress' in actor && actor.robustAddress}
						<dt>Robust Address</dt>
						<dd>
							<InlineTransition align="start"
								key={actor.robustAddress}
							>
								<Address
									{network}
									address={actor.robustAddress}
									format="middle-truncated"
									truncateOptions={{
										startLength: 23,
										endLength: 21,
									}}
								/>
							</InlineTransition>
						</dd>
					{/if}

					{#if 'evmAddress' in actor && actor.evmAddress}
						<dt>ETH Address</dt>
						<dd>
							<InlineTransition align="start"
								key={actor.evmAddress}
							>
								<Address
									{network}
									address={actor.evmAddress}
								/>
							</InlineTransition>
						</dd>
					{/if}
				</dl>
			</section>

			<FilecoinAddressDetails
				{network}
				address={displayedAddress}
				headingLevel={headingLevel + 2}
			/>
		</div>

		{#if actor.type === Filecoin.ActorType.StorageMiner && 'minerDetails' in actor && actor.minerDetails}
			<hr>

			<Collapsible
				title="Storage Miner Details"
				isOpen={true}
			>
				<svelte:fragment slot="header-right">
					<span class="card-annotation">{filecoinTransactionProviders[filecoinTransactionProvider]?.name ?? filecoinTransactionProvider}</span>
				</svelte:fragment>

				<FilecoinMinerDetails
					{network}
					minerDetails={actor.minerDetails}
				/>
			</Collapsible>
		{/if}

		<hr>

		<section>
			<FilecoinBalancesLoader
				{network}
				address={displayedAddress}
				let:balances
			>
				<svelte:fragment slot="header"
					let:tokenBalancesProvider
				>
					<header class="bar wrap">
						<svelte:element this={`h${headingLevel + 1}`}>Balances</svelte:element>

						<span class="card-annotation">{filecoinTokenBalancesProviders[tokenBalancesProvider]?.name ?? tokenBalancesProvider}</span>
					</header>
				</svelte:fragment>

				{#if balances}
					<EthereumBalances
						{network}
						{balances}
					/>
				{/if}
			</FilecoinBalancesLoader>
		</section>

		{#each (
			[
				actor.ownedMiners && {
					label: 'Owned Miners',
					actors: actor.ownedMiners,
				},
				actor.workerMiners && {
					label: 'Worker Miners',
					actors: actor.workerMiners,
				},
				actor.benefitedMiners && {
					label: 'Benefitted Miners',
					actors: actor.benefitedMiners,
				},
			]
				.filter(isTruthy)
				.filter(({ actors }) => actors.length)
		) as { label, actors } (label)}
			<hr>

			<section>
				<Collapsible>
					<svelte:fragment slot="title">
						<div class="row inline">
							<svelte:element this={`h${headingLevel + 1}`}>
								{label}
							</svelte:element>

							<small>({actors.length})</small>
						</div>
					</svelte:fragment>

					<ScrollContainer
						isScrollEnabled={actors.length > 7}
					>
						<ul class="column">
							{#each actors as minerActor}
								<li>
									<FilecoinActorDetailsLoader
										{network}
										address={minerActor.shortAddress ?? minerActor.robustAddress}
										let:actor
									>
										{#if actor}
											<svelte:self
												{network}
												{actor}
												displayedAddress={minerActor.shortAddress ?? minerActor.robustAddress}
												layout="inline"
												headingLevel={headingLevel + 1}
											/>
										{/if}
									</FilecoinActorDetailsLoader>
								</li>
							{/each}
						</ul>
					</ScrollContainer>
				</Collapsible>
			</section>
		{/each}

		<hr>

		<section>
			<FilecoinTransactionsLoader
				{network}
				query={{
					address: displayedAddress,
					type: 'sender',
				}}
				let:transactions
				let:transactionsCount
				let:pagination
			>
				<FilecoinTransactions
					{network}
					{transactions}
					{transactionsCount}
					headingLevel={headingLevel + 1}
					{pagination}
				/>
			</FilecoinTransactionsLoader>
		</section>

		<hr>

		<section>
			<FilecoinTransfersLoader
				{network}
				query={{
					address: displayedAddress,
				}}
				let:transfers
				let:transfersCount
			>
				<FilecoinTransfers
					{network}
					{transfers}
					{transfersCount}
					headingLevel={headingLevel + 1}
				/>
			</FilecoinTransfersLoader>
		</section>
	</Collapsible>
</article>


<style>
	small {
		opacity: 0.66;
	}
</style>
