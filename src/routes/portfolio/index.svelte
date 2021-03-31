<script lang="ts">
	import { onMount } from 'svelte'

	import { getProvider, getProviderInstance } from '../../data/ethereum/provider'
	import { getLocalAccounts, getEthersAccounts } from '../../data/ethereum/accounts'
	import { ethereumNetwork, preferredAnalyticsProvider, preferredEthereumProvider, preferredQuoteCurrency } from '../../data/ethereum/preferences'

	let preferredProvider
	onMount(async () => 
		preferredProvider = await getProvider($ethereumNetwork, $preferredEthereumProvider, 'ethers')
	)
	
	const localAccounts = getLocalAccounts()

	// let metaMaskProvider
	// const loadMetaMaskProvider = async () => {
	// 	metaMaskProvider = await getProvider($ethereumNetwork, 'MetaMask', 'ethers')

	// 	const metaMask = await getProviderInstance($ethereumNetwork, 'MetaMask')
	// 	metaMaskProvider.on('accountsChanged', accounts => {
	// 		console.log('accountsChanged', accounts)
	// 		loadMetaMaskProvider()
	// 	})
	// 	metaMaskProvider.on('chainChanged', chainId => {
	// 		console.log('chainChanged', chainId)
	// 		loadMetaMaskProvider()
	// 	})
	// }
	// const disconnectMetaMaskProvider = async () => {
	// 	const metaMask = await getProviderInstance($ethereumNetwork, 'MetaMask')
	// 	metaMaskProvider = undefined
	// }
	let metaMaskAccountsPromise
	const loadMetaMaskAccounts = async () => {
		metaMaskAccountsPromise = getProvider($ethereumNetwork, 'MetaMask', 'ethers').then(provider => getEthersAccounts(provider))

		const metaMask = await getProviderInstance($ethereumNetwork, 'MetaMask')
		metaMask.once('accountsChanged', accounts => {
			console.log('accountsChanged', accounts)
			loadMetaMaskAccounts()
		})
		metaMask.once('chainChanged', chainId => {
			console.log('chainChanged', chainId, metaMask.chainId)
			loadMetaMaskAccounts()
		})
	}
	const disconnectMetaMaskProvider = async () => {
		// const metaMask = await getProviderInstance($ethereumNetwork, 'MetaMask')
		metaMaskAccountsPromise = undefined
	}

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
	
	import Loading from '../../components/Loading.svelte'
	import Portfolio from '../../components/Portfolio.svelte'
	import Preferences from '../../components/Preferences.svelte'
	import { fly } from 'svelte/transition'
	import { assets } from '$app/paths'
</script>

<style>
	main {
		/* display: grid;
		grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
		justify-items: center; */

		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 2rem;
		
		/* Override scroll container to support position: sticky */
		height: 100vh;
		overflow-y: auto;
	}
	main > * {
		flex: 1 30rem;
		max-width: 45rem;
	}
	section {
		display: grid;
		gap: var(--padding-inner);
		align-content: start;
		grid-template-columns: 100%;
	}

	.metamask {
		--primary-color: var(--metamask-orange);
	}
	/* .metamask-logo {
		filter: brightness(300%);
	} */

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

	.wallet-providers {
		display: grid;
		gap: 2em;
		align-content: start;
	}
</style>

<svelte:head>
	<title>Portfolio | Blockhead</title>
</svelte:head>

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<section>
		{#if localAccounts}
			<Portfolio name="Your Portfolio" provider={preferredProvider} analyticsProvider={$preferredAnalyticsProvider} quoteCurrency={$preferredQuoteCurrency} bind:accounts={$localAccounts} editable={true} />
		{:else}
			Please enable LocalStorage in your browser.
		{/if}
	</section>

	<div class="wallet-providers">
		<section class="metamask">
			{#if metaMaskAccountsPromise}
				{#await metaMaskAccountsPromise}
					<h1><img src="{assets}/logos/metamask.svg" alt="MetaMask" class="metamask-logo"> Wallet</h1>
					<Loading iconAnimation="hover">
						<img slot="icon" src="{assets}/logos/metamask-icon.svg">
						Log into MetaMask via the pop-up window.
					</Loading>
				{:then accounts}
					<Portfolio name="MetaMask Wallet" provider={preferredProvider} analyticsProvider={$preferredAnalyticsProvider} quoteCurrency={$preferredQuoteCurrency} {accounts}>
						<button on:click={disconnectMetaMaskProvider}>Disconnect</button>
					</Portfolio>
				{:catch error}
					<h1><img src="{assets}/logos/metamask.svg" alt="MetaMask" class="metamask-logo"> Wallet</h1>
					<div class="card">
						<p>We couldn't connect your MetaMask Account: <strong>{error.message ?? error}</strong></p>
						<button on:click={loadMetaMaskAccounts}>Try Again</button>
						<button on:click={disconnectMetaMaskProvider}>Cancel</button>
					</div>
				{/await}
			{:else}
				<div class="bar">
					<h1><img src="{assets}/logos/metamask-icon.svg" alt="MetaMask" class="metamask-logo"> MetaMask Wallet</h1>
					<button on:click={loadMetaMaskAccounts}>Connect</button>
				</div>
				<div class="card">
					<img src="{assets}/logos/metamask.svg" alt="MetaMask" width="200">
					<p>Create or import a wallet address by connecting the MetaMask browser extension.</p>
				</div>
			{/if}
		</section>

		<section class="portis">
			{#if portisProvider}
				{#await getEthersAccounts(portisProvider)}
					<h1><img src="{assets}/logos/portis-black.svg" alt="Portis" class="portis-logo"> Wallet</h1>
					<Loading>
						<!-- <img slot="icon" src="{assets}/logos/portis-icon.svg" width=""> -->
						Log into Portis via the pop-up window.
					</Loading>
				{:then accounts}
					<Portfolio name="Portis Wallet" provider={preferredProvider} analyticsProvider={$preferredAnalyticsProvider} quoteCurrency={$preferredQuoteCurrency} {accounts}>
						<!-- <button on:click={() => addToPortfolio(accounts[0])}>Add to...</button> -->
						<button on:click={disconnectPortisProvider}>Disconnect</button>
					</Portfolio>
				{:catch error}
					<h1><img src="{assets}/logos/portis-black.svg" alt="Portis" class="portis-logo"> Wallet</h1>
					<div class="card">
						<button on:click={loadPortisProvider}>Try Again</button>
						<button on:click={disconnectPortisProvider}>Cancel</button>
					</div>
				{/await}
			{:else}
				<div class="bar">
					<h1><img src="{assets}/logos/portis-black.svg" alt="Portis" class="portis-logo"> Wallet</h1>
					<button on:click={loadPortisProvider}>Connect</button>
				</div>
				<div class="card">
					<img src="{assets}/logos/portis.svg" alt="Portis" width="200">
					<p>Create or import a wallet address by connecting a Portis.io account.</p>
				</div>
			{/if}
		</section>
	</div>
</main>

<Preferences />