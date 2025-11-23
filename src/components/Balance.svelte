<script lang="ts">
	// Types/constants
	import type { Balance } from '$/schema/Balance.ts'


	// Props
	let {
		balance,
	}: {
		balance: Balance
	} = $props()


	// Derived
	const isNative = $derived(!('address' in balance.$id.$coin))
	const decimals = $derived(18) // Default to 18 decimals
	const formattedBalance = $derived(
		(Number(balance.$fields.balance) / Math.pow(10, decimals)).toFixed(6)
	)
	const displayAddress = $derived(
		isNative
			? 'Native Currency'
			: balance.$id.$coin.address
	)
</script>


<article data-row="wrap">
	<span class="balance">
		{formattedBalance}
	</span>
	
	<span class="coin">
		{#if isNative}
			<abbr title="Native Currency">
				Native
			</abbr>
		{:else}
			<abbr title={balance.$id.$coin.address}>
				{balance.$id.$coin.address.slice(0, 6)}...{balance.$id.$coin.address.slice(-4)}
			</abbr>
		{/if}
	</span>
</article>


<style>
	article {
		gap: var(--spacing-1);
	}

	.balance {
		font-weight: var(--font-weight-semibold);
		font-variant-numeric: tabular-nums;
	}

	.coin {
		color: var(--text-color-secondary);
		font-size: var(--font-size-sm);
	}

	abbr {
		text-decoration: none;
		cursor: help;
	}
</style>


