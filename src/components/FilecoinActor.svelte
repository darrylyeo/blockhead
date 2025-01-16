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



	// Components'
	import Address from './Address.svelte'
	import Collapsible from './Collapsible.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import FilecoinBalancesLoader from './FilecoinBalancesLoader.svelte'
	import FilecoinTransactionsLoader from './FilecoinTransactionsLoader.svelte'
	import FilecoinTransactions from './FilecoinTransactions.svelte'
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
				<Address
					{network}
					address={displayedAddress}
				/>
			</svelte:element>
		</svelte:fragment>

		<svelte:fragment slot="header-right">
			<span class="card-annotation">
				Filecoin {actor.actorType === Filecoin.ActorType.Unknown ? 'Unknown Account' : actor.actorType}
			</span>
		</svelte:fragment>

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

						<span class="card-annotation">{filecoinTokenBalancesProviders[tokenBalancesProvider].name}</span>
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
