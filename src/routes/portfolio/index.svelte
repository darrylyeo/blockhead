<script lang="ts">
	import Portfolio from '../../components/Portfolio.svelte';

	import type { CryptoAddress } from '../../data/CryptoAddress'
	import type { CryptoPosition } from '../../data/CryptoPosition'

	let addresses: CryptoAddress[] = []
</script>

<svelte:head>
	<title>Portfolio | Blockhead Explorers</title>
</svelte:head>

<h1>Portfolio</h1>

<section>
	<Portfolio />
	<!-- {#each addresses as address}
		<Portfolio {address} />
	{/each} -->
	<button>Connect Wallet</button>
</section>