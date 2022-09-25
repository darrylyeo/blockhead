<script lang="ts">
	import { getLocalPortfolios, connectedProviderAccounts, Account } from '../data/ethereum/portfolio-accounts'

	const localPortfolios = getLocalPortfolios()


	export let account: Account
	$: console.log('account', account)
</script>


<select class="wallet-account-select" bind:value={account}>
	<!-- {#each $localPortfolios as {name, accounts}, i (i)}
		<optgroup label={name}>
			{#each accounts as account}
				<option value={account}>{account.id}</option>
			{/each}
		</optgroup>
	{/each} -->
	<option value={undefined}>Choose account...</option>
	{#each Object.entries($connectedProviderAccounts) as [providerName, accounts]}
		{#if accounts?.length}
			{#each accounts as account}
				<optgroup label={providerName}>
					<option value={account}>{account.id}</option>
				</optgroup>
			{/each}
		{/if}
	{/each}
</select>