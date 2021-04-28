<script lang="ts">
	import { onMount } from 'svelte'

	import { getProvider, getProviderInstance } from '../../data/ethereum/provider'
	import { Portfolio, getLocalPortfolios, getEthersAccounts } from '../../data/ethereum/accounts'
	import { ethereumNetwork, preferredAnalyticsProvider, preferredEthereumProvider, preferredQuoteCurrency } from '../../data/ethereum/preferences'

	let preferredProvider
	onMount(async () => 
		preferredProvider = await getProvider($ethereumNetwork, $preferredEthereumProvider, 'ethers')
	)
	
	const localPortfolios = getLocalPortfolios()
	function addPortfolio(){
		$localPortfolios = [...$localPortfolios, new Portfolio()]
	}
	function deletePortfolio(i){
		$localPortfolios = [...$localPortfolios.slice(0, i), ...$localPortfolios.slice(i + 1)]
	}

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
	
	import Loader from '../../components/Loader.svelte'
	import PortfolioComponent from '../../components/Portfolio.svelte'
	import Preferences from '../../components/Preferences.svelte'
	import { fly } from 'svelte/transition'
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
		gap: 2rem;
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
</style>

<svelte:head>
	<title>Portfolio | Blockhead</title>
</svelte:head>

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<section class="portfolios column">
		{#if localPortfolios}
			{#each $localPortfolios as {name, accounts}, i (i)}
				<PortfolioComponent
					bind:name
					bind:accounts
					editable={true}
					provider={preferredProvider}
					analyticsProvider={$preferredAnalyticsProvider}
					quoteCurrency={$preferredQuoteCurrency}
					on:delete={e => deletePortfolio(i)}
				/>
			{/each}
			{#if $localPortfolios[$localPortfolios.length - 1]?.accounts.length}
				<button on:click={() => addPortfolio()}>+ Create Another Portfolio</button>
			{/if}
		{:else}
			Please enable LocalStorage in your browser.
		{/if}
	</section>

	<section class="wallet-providers column">
		<div class="metamask column">
			{#if metaMaskAccountsPromise}
				<Loader
					loadingIcon={'/logos/metamask-icon.svg'}
					loadingIconName={'MetaMask'}
					loadingMessage="Log into Portis via the pop-up window."
					errorMessage="We couldn't connect your MetaMask Account."
					errorFunction={error => error.message ?? error}
					fromPromise={() => metaMaskAccountsPromise}
					let:then={accounts}
				>
					<svelte:fragment slot="header" let:status>
						{#if status !== 'resolved'}
							<h1><img src="/logos/metamask.svg" alt="MetaMask" class="metamask-logo"> Wallet</h1>
						{/if}
					</svelte:fragment>

					<PortfolioComponent name="MetaMask Wallet" provider={preferredProvider} analyticsProvider={$preferredAnalyticsProvider} quoteCurrency={$preferredQuoteCurrency} {accounts}>
						<button on:click={disconnectMetaMaskProvider}>Disconnect</button>
					</PortfolioComponent>

					<svelte:fragment slot="errorActions">
						<button on:click={loadMetaMaskAccounts}>Try Again</button>
						<button on:click={disconnectMetaMaskProvider}>Cancel</button>
					</svelte:fragment>
				</Loader>
			{:else}
				<div class="bar">
					<h1><img src="/logos/metamask-icon.svg" alt="MetaMask" class="metamask-logo"> MetaMask Wallet</h1>
					<button on:click={loadMetaMaskAccounts}>Connect</button>
				</div>
				<div class="card">
					<img src="/logos/metamask.svg" alt="MetaMask" width="200">
					<p>Create or import a wallet address by connecting the MetaMask browser extension.</p>
				</div>
			{/if}
			</div>

		<div class="portis column">
			{#if portisProvider}
				<Loader
					loadingIcon={'/logos/portis-icon.svg'}
					loadingIconName={'Portis'}
					loadingMessage="Log into Portis via the pop-up window."
					errorMessage="We couldn't connect your Portis.io Account."
					fromPromise={() => getEthersAccounts(portisProvider)}
					let:then={accounts}
				>
					<svelte:fragment slot="header" let:status>
						{#if status !== 'resolved'}
							<h1><img src="/logos/portis-black.svg" alt="Portis" class="portis-logo"> Wallet</h1>
						{/if}
					</svelte:fragment>

					<PortfolioComponent name="Portis Wallet" provider={preferredProvider} analyticsProvider={$preferredAnalyticsProvider} quoteCurrency={$preferredQuoteCurrency} {accounts}>
						<!-- <button on:click={() => addToPortfolio(accounts[0])}>Add to...</button> -->
						<button on:click={disconnectPortisProvider}>Disconnect</button>
					</PortfolioComponent>

					<svelte:fragment slot="errorActions">
						<button on:click={loadPortisProvider}>Try Again</button>
						<button on:click={disconnectPortisProvider}>Cancel</button>
					</svelte:fragment>
				</Loader>
			{:else}
				<div class="bar">
					<h1><img src="/logos/portis-black.svg" alt="Portis" class="portis-logo"> Wallet</h1>
					<button on:click={loadPortisProvider}>Connect</button>
				</div>
				<div class="card">
					<img src="/logos/portis.svg" alt="Portis" width="200">
					<p>Create or import a wallet address by connecting a Portis.io account.</p>
				</div>
			{/if}
		</div>
	</section>
</main>

<Preferences />