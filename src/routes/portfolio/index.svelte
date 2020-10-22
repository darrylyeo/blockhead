<script lang="ts">
	import { onMount } from 'svelte'

	import { getProvider, getProviderInstance } from '../../data/ethereum/provider'
	import { getLocalAccounts, getEthersAccounts } from '../../data/ethereum/accounts'
	import { ethereumNetwork, preferredEthereumProvider } from '../../data/ethereum/preferences'

	let preferredProvider
	onMount(async () => 
		preferredProvider = await getProvider($ethereumNetwork, $preferredEthereumProvider, 'ethers')
	)
	
	let localAccounts
	onMount(async () =>
		localAccounts = getLocalAccounts()
	)

	let portisProvider
	const loadPortisProvider = async () => {
		portisProvider = await getProvider($ethereumNetwork, 'Portis', 'ethers')
		// await portis.showPortis()
	}
	const disconnectPortisProvider = async () => {
		const portis = await getProviderInstance($ethereumNetwork, 'Portis')
		portis.logout()
		portisProvider = undefined
	}

	const addToPortfolio = account => {

	}
	
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

	.portis-logo {
		display: inline-block;
		height: 1.1em;
		vertical-align: middle;
	}
	@media (prefers-color-scheme: dark) {
		.portis-logo {
			filter: invert(1);
		}
	}
	.portis {
		--primary-color: var(--portis-blue);
	}
</style>

<svelte:head>
	<title>Portfolio | Blockhead</title>
</svelte:head>

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<section>
		{#if localAccounts}
			<Portfolio name="Your Portfolio" provider={preferredProvider} bind:accounts={$localAccounts} editable={true} />
		{:else}
			Please enable LocalStorage in your browser.
		{/if}
	</section>

	<section class="portis">
		{#if portisProvider}
			{#await getEthersAccounts(portisProvider)}
				<h1><img src="/logos/portis-black.svg" alt="Portis" class="portis-logo"> Wallet</h1>
				<Loading>Log into Portis via the pop-up window.</Loading>
			{:then accounts}
				<Portfolio name="Portis Wallet" provider={preferredProvider} {accounts}>
					<!-- <button on:click={() => addToPortfolio(accounts[0])}>Add to...</button> -->
					<button on:click={disconnectPortisProvider}>Disconnect</button>
				</Portfolio>
			{:catch error}
				<h1><img src="/logos/portis-black.svg" alt="Portis" class="portis-logo"> Wallet</h1>
				<div>
					<p>We couldn't connect your Portis.io Account: <strong>{error}</strong></p>
					<button on:click={loadPortisProvider}>Try Again</button>
					<button on:click={disconnectPortisProvider}>Cancel</button>
				</div>
			{/await}
		{:else}
			<Controls>
				<h1><img src="/logos/portis-black.svg" alt="Portis" class="portis-logo"> Wallet</h1>
				<button on:click={loadPortisProvider}>Connect</button>
			</Controls>
			<div class="card">
				<img src="/logos/portis.svg" alt="Portis" width="200">
				<p>Create or import a wallet address by connecting a Portis.io account.</p>
			</div>
		{/if}
	</section>
</main>