<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { getProvider, getProviderInstance } from '../data/ethereum/provider'
	import { getAccountsFromProvider } from '../data/ethereum/portfolio-accounts'
	import { preferredAnalyticsProvider, preferredQuoteCurrency } from '../data/ethereum/preferences'


	export let portfolioProvider
	export let network: Ethereum.Network
	

	let metaMaskProvider
	const loadMetaMaskProvider = async () => {
		metaMaskProvider = await getProvider(network, 'MetaMask', 'ethers')
		await metaMaskProvider.enable()

		metaMaskProvider.on('accountsChanged', accounts => {
			console.log('accountsChanged', accounts)
			loadMetaMaskProvider()
		})
		metaMaskProvider.on('chainChanged', chainId => {
			console.log('chainChanged', chainId)
			loadMetaMaskProvider()
		})
	}
	const disconnectMetaMaskProvider = async () => {
		metaMaskProvider = undefined
	}


	let portisProvider
	const loadPortisProvider = async () => {
		portisProvider = await getProvider(network, 'Portis', 'ethers')
		// await portis.showPortis()
	}
	const disconnectPortisProvider = async () => {
		const portis = await getProviderInstance(network, 'Portis')
		portis.logout()
		portisProvider = undefined
	}

	
	import Loader from './Loader.svelte'
	import Portfolio from './Portfolio.svelte'
</script>

<style>
	section {
		gap: 2.5rem;
	}

	.metamask {
		--primary-color: var(--metamask-orange);
	}
	.metamask-logo {
		height: 1.1em;
		vertical-align: -0.2em;
		/* filter: brightness(300%); */
	}

	.portis {
		--primary-color: var(--portis-blue);
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
</style>


<section class="wallet-providers column">
	<div class="metamask column">
		{#if metaMaskProvider}
			<Loader
				loadingIcon={'/logos/metamask-icon.svg'}
				loadingIconName={'MetaMask'}
				loadingMessage="Log into MetaMask via the pop-up window."
				errorMessage="We couldn't connect your MetaMask Account."
				errorFunction={error => error.message ?? error}
				fromPromise={() => getAccountsFromProvider(metaMaskProvider)}
				let:then={accounts}
			>
				<svelte:fragment slot="header" let:status>
					{#if status !== 'resolved'}
						<h1><img src="/logos/metamask-icon.svg" alt="MetaMask" class="metamask-logo"> MetaMask Wallet</h1>
					{/if}
				</svelte:fragment>

				<Portfolio
					name="MetaMask Wallet"
					provider={portfolioProvider}
					analyticsProvider={$preferredAnalyticsProvider}
					quoteCurrency={$preferredQuoteCurrency}
					{accounts}
				>
					<h1 slot="title"><img src="/logos/metamask-icon.svg" alt="MetaMask" class="metamask-logo"> MetaMask Wallet</h1>

					<div slot="actions" class="row">
						<button on:click={disconnectMetaMaskProvider}>Disconnect</button>
					</div>
				</Portfolio>

				<svelte:fragment slot="errorActions">
					<div slot="actions" class="row">
						<button on:click={loadMetaMaskProvider}>Try Again</button>
						<button on:click={disconnectMetaMaskProvider}>Cancel</button>
					</div>
				</svelte:fragment>
			</Loader>
		{:else}
			<div class="bar">
				<h1><img src="/logos/metamask-icon.svg" alt="MetaMask" class="metamask-logo"> MetaMask Wallet</h1>
				<button on:click={loadMetaMaskProvider}>Connect</button>
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
				fromPromise={() => getAccountsFromProvider(portisProvider)}
				let:then={accounts}
			>
				<svelte:fragment slot="header" let:status>
					{#if status !== 'resolved'}
						<h1><img src="/logos/portis-black.svg" alt="Portis" class="portis-logo"> Wallet</h1>
					{/if}
				</svelte:fragment>

				<Portfolio
					name="Portis Wallet"
					provider={portfolioProvider}
					analyticsProvider={$preferredAnalyticsProvider}
					quoteCurrency={$preferredQuoteCurrency}
					{accounts}
				>
					<h1 slot="title"><img src="/logos/portis-black.svg" alt="Portis" class="portis-logo"> Wallet</h1>

					<div slot="actions" class="row">
						<!-- <button on:click={() => addToPortfolio(accounts[0])}>Add to...</button> -->
						<button on:click={disconnectPortisProvider}>Disconnect</button>
					</div>
				</Portfolio>

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