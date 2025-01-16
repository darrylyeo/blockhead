<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import { Filecoin } from '$/data/filecoin'
	import { networkBySlug } from '$/data/networks'
	import { filecoinTokenBalancesProviders } from '$/data/filecoinTokenBalancesProviders'


	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let displayedAddress: Filecoin.Address
	export let actor: Filecoin.Actor
	// (View options)
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3


	// Internal state
	$: actorType = Filecoin.actorTypes[actor.type]


	// Functions
	import { formatIdentifierToWords } from '$/utils/formatIdentifierToWords'


	// Components
	import Address from './Address.svelte'
	import Collapsible from './Collapsible.svelte'
	import DateComponent from './Date.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import FilecoinAddressDetails from './FilecoinAddressDetails.svelte'
	import FilecoinBalancesLoader from './FilecoinBalancesLoader.svelte'
	import FilecoinTransactionsLoader from './FilecoinTransactionsLoader.svelte'
	import FilecoinTransactions from './FilecoinTransactions.svelte'
	import InlineTransition from './InlineTransition.svelte'
	import IpfsContentId from './IpfsContentId.svelte'
	import TransactionId from './TransactionId.svelte'
</script>


<article class="card">
	<Collapsible
		type="label"
		isOpen
		canToggle={false}
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

					{#if actor.creation}
						<dt>Created</dt>
						<dd>
							{#if 'transactionId' in actor.creation && actor.creation.transactionId}
								<InlineTransition align="start"
									key={actor.creation.transactionId}
								>
									<TransactionId
										{network}
										transactionId={actor.creation.transactionId}
										format="middle-truncated"
										truncateOptions={{
											startLength: 8,
											endLength: 6,
										}}
									/>
								</InlineTransition>
							{/if}

							{#if 'tipsetTimestamp' in actor.creation && actor.creation.tipsetTimestamp}
								<InlineTransition align="start"
									key={actor.creation.tipsetTimestamp}
								>
									<DateComponent
										date={actor.creation.tipsetTimestamp}
									/>
								</InlineTransition>
							{/if}
						</dd>
					{/if}

					{#if 'creatorAddress' in actor && actor.creatorAddress}
						<dt>Creator</dt>
						<dd>
							<InlineTransition align="start"
								key={actor.creatorAddress}
							>
								<Address
									{network}
									address={actor.creatorAddress}
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
							<output>
								<InlineTransition align="start"
									key={actor.shortAddress}
								>
									<Address
										{network}
										address={actor.shortAddress}
									/>
								</InlineTransition>
							</output>
						</dd>
					{/if}

					{#if 'robustAddress' in actor && actor.robustAddress}
						<dt>Robust Address</dt>
						<dd>
							<output>
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
							</output>
						</dd>
					{/if}

					{#if 'evmAddress' in actor && actor.evmAddress}
						<dt>ETH Address</dt>
						<dd>
							<output>
								<InlineTransition align="start"
									key={actor.evmAddress}
								>
									<Address
										{network}
										address={actor.evmAddress}
									/>
								</InlineTransition>
							</output>
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

				<EthereumBalances
					{network}
					{balances}
				/>
			</FilecoinBalancesLoader>
		</section>

		<hr>

		<section>
			<FilecoinTransactionsLoader
				{network}
				query={{
					address: displayedAddress,
					type: 'sender',
				}}
				let:transactions
				let:pagination
			>
				<FilecoinTransactions
					{network}
					{transactions}
					headingLevel={headingLevel + 1}
					{pagination}
				/>
			</FilecoinTransactionsLoader>
		</section>
	</Collapsible>
</article>
