<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import { Filecoin } from '$/data/filecoin'
	import { networksBySlug } from '$/data/networks'


	// Inputs
	export let network: Ethereum.Network = networksBySlug['filecoin']
	export let account: Filecoin.Account
	// (View options)
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3



	// Components'
	import Address from './Address.svelte'
	import Collapsible from './Collapsible.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import FilecoinAccountBalancesLoader from './FilecoinAccountBalancesLoader.svelte'
	import FilecoinAccountTransactionsLoader from './FilecoinAccountTransactionsLoader.svelte'
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
					address={account.address}
				/>
			</svelte:element>
		</svelte:fragment>

		<svelte:fragment slot="header-right">
			<span class="card-annotation">
				Filecoin {account.actorType === Filecoin.ActorType.Unknown ? 'Unknown Account' : account.actorType}
			</span>
		</svelte:fragment>

		<hr>

		<section>
			<FilecoinAccountBalancesLoader
				{network}
				address={account.address}
				let:balances
			>
				<!-- <EthereumBalances
					{network}
					{balances}
				/> -->
			</FilecoinAccountBalancesLoader>
		</section>

		<hr>

		<section>
			<!-- <FilecoinAccountTransactionsLoader
				{network}
				address={account.address}
				let:transactions
			>
				<FilecoinTransactions
					{network}
					{transactions}
				/>
			</FilecoinAccountTransactionsLoader> -->
		</section>
	</Collapsible>
</article>
