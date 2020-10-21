<script lang="ts">
	import { onMount } from 'svelte'

	import { getProvider, providersCache } from '../../data/ethereum/provider'
	import { getLocalAccounts, getEthersAccounts } from '../../data/ethereum/accounts'
	import { ethereumNetwork, preferredEthereumProvider } from '../../data/ethereum/preferences'
	
	let localAccounts
	onMount(async () =>
		localAccounts = getLocalAccounts()
	)

	let portisProvider
	const loadPortisProvider = async () =>
		portisProvider = await getProvider($ethereumNetwork, 'Portis', 'ethers')
	const disconnectPortisProvider = () => {
		providersCache[$ethereumNetwork]['Portis'].provider.stop()
		providersCache[$ethereumNetwork]['Portis'].provider.removeProvider(portisProvider)
		console.log(portisProvider, providersCache[$ethereumNetwork]['Portis'].provider.isConnected())
		portisProvider = undefined
	}

	let preferredProvider
	onMount(async () =>
		preferredProvider = await getProvider($ethereumNetwork, $preferredEthereumProvider, 'ethers')
	)
	
	import Controls from '../../components/Controls.svelte'
	import Loading from '../../components/Loading.svelte'
	import Portfolio from '../../components/Portfolio.svelte'
	import { fly } from 'svelte/transition'
</script>

<style>
	main {
		/* display: grid;
		grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr)); */
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 2rem;
	}
	section {
		flex: 1 25rem;
		max-width: 45rem;

		display: grid;
		gap: var(--padding-inner);
		align-content: start;
		grid-template-columns: 100%;
	}
</style>

<svelte:head>
	<title>Portfolio | Blockhead Explorers</title>
</svelte:head>

<main in:fly={{x: 100}} out:fly={{x: -100}}>
	<section>
		{#if localAccounts}
			<Portfolio name="Your Portfolio" provider={preferredProvider} bind:accounts={$localAccounts} editable={true} />
		{:else}
			LocalStorage isn't available in your browser.
		{/if}
	</section>
	<section>
		{#if portisProvider}
			{#await getEthersAccounts(portisProvider)}
				<Loading>Log into Portis via the pop-up window.</Loading>
			{:then accounts}
				<Portfolio name="Portis Wallet" provider={preferredProvider} {accounts}>
					<button on:click={disconnectPortisProvider}>Disconnect</button>
				</Portfolio>
			{:catch error}
				<h1>Import from Portis</h1>
				<div>
					<p>We couldn't connect your Portis.io Account: <strong>{error}</strong></p>
					<button on:click={loadPortisProvider}>Try Again</button>
					<button on:click={disconnectPortisProvider}>Cancel</button>
				</div>
			{/await}
		{:else}
			<Controls>
				<h1>Portis Wallet</h1>
				<button on:click={loadPortisProvider}>Connect</button>
			</Controls>
			<div>
				<p>Create or connect an existing Portis.io account to import your wallet addresses.</p>
			</div>
		{/if}
	</section>
</main>