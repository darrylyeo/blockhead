<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { getWalletProvider, getWalletProviderAndInstance } from '../data/ethereum/wallets/wallets'
	import { connectedProviderAccounts, getAccountsFromProvider } from '../data/ethereum/portfolio-accounts'


	export let portfolioProvider
	export let network: Ethereum.Network
	

	const loadMetaMaskProvider = async () => {
		const metaMaskProvider = await getWalletProvider(network, 'MetaMask')

		metaMaskProvider.on('accountsChanged', accounts => {
			console.log('accountsChanged', accounts)
			loadMetaMaskProvider()
		})
		metaMaskProvider.on('chainChanged', chainId => {
			console.log('chainChanged', chainId)
			loadMetaMaskProvider()
		})

		return metaMaskProvider
	}


	const loadTorusProvider = async () => {
		return await getWalletProvider(network, 'Torus')
	}
	const disconnectTorusProvider = async () => {
		(await getWalletProviderAndInstance(network, 'Torus')).disconnect()
	}


	const loadPortisProvider = async () => {
		return await getWalletProvider(network, 'Portis')
		// await portis.showPortis()
	}
	const disconnectPortisProvider = async () => {
		(await getWalletProviderAndInstance(network, 'Portis')).disconnect()
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

	.torus {
		--primary-color: var(--torus-blue);
	}
	.torus-logo {
		height: 0.75em;
		vertical-align: -0.025em;
	}
	:global(#openlogin-modal) {
		max-width: 410px;
		max-height: 650px;
		margin: auto;
		border-radius: 1rem;
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
		<Loader
			loadingIcon={'/logos/MetaMask.svg'}
			loadingIconName={'MetaMask'}
			loadingMessage="Log into MetaMask via the pop-up window."
			errorMessage="We couldn't connect your MetaMask Account."
			startImmediately={false}
			let:load fromPromise={() => loadMetaMaskProvider().then(provider => getAccountsFromProvider(provider, 'MetaMask'))}
			bind:result={$connectedProviderAccounts['MetaMask']}
			let:result={accounts}
			let:cancel
		>
			<svelte:fragment slot="header" let:status>
				{#if status !== 'resolved'}
					<div class="bar">
						<h1><img src="/logos/metamask-icon.svg" alt="MetaMask" class="metamask-logo"> MetaMask Wallet</h1>
						{#if status === 'idle'}
							<button on:click={load}>Connect</button>
						{/if}
					</div>
				{/if}
			</svelte:fragment>

			<div slot="idle" class="card">
				<img src="/logos/metamask.svg" alt="MetaMask" width="200">
				<p>Create or import a wallet address by connecting the MetaMask browser extension.</p>
			</div>

			<Portfolio
				name="MetaMask Wallet"
				provider={portfolioProvider}
				{accounts}
			>
				<h1 slot="title"><img src="/logos/metamask-icon.svg" alt="MetaMask" class="metamask-logo"> MetaMask Wallet</h1>

				<div slot="actions" class="row">
					<button on:click={cancel}>Disconnect</button>
				</div>
			</Portfolio>

			<svelte:fragment slot="errorActions">
				<button class="medium" on:click={load}>Try Again</button>
				<button class="medium" on:click={cancel}>Cancel</button>
			</svelte:fragment>
		</Loader>
	</div>

	<div class="torus column">
		<Loader
			loadingIcon={'/logos/Torus.svg'}
			loadingIconName={'Torus'}
			loadingMessage="Log into Torus via the pop-up window."
			errorMessage="We couldn't connect your Tor.us Account."
			startImmediately={false}
			let:load fromPromise={() => loadTorusProvider().then(provider => getAccountsFromProvider(provider, 'Torus'))}
			bind:result={$connectedProviderAccounts['Torus']}
			let:result={accounts}
			let:cancel whenCanceled={disconnectTorusProvider}
		>
			<svelte:fragment slot="header" let:status>
				{#if status !== 'resolved'}
					<div class="bar">
						<h1><img src="/logos/torus-logo.svg" alt="Torus" class="torus-logo"> Wallet</h1>
						{#if status === 'idle'}
							<button on:click={load}>Connect</button>
						{/if}
					</div>
				{/if}
			</svelte:fragment>

			<div slot="idle" class="card">
				<img src="/logos/torus-logo-color.svg" alt="Torus" width="180">
				<p>Create or import a wallet address by connecting a Tor.us OpenLogin account.</p>
				<small>Supports: email address, Google, Facebook, Twitter, Discord, LINE, Apple ID, GitHub, Twitch, LinkedIn, WeChat, KakaoTalk</small>
			</div>

			<Portfolio
				name="Torus Wallet"
				provider={portfolioProvider}
				{accounts}
			>
				<h1 slot="title"><img src="/logos/torus-logo.svg" alt="Torus" class="torus-logo"> Wallet</h1>

				<div slot="actions" class="row">
					<!-- <button on:click={() => addToPortfolio(accounts[0])}>Add to...</button> -->
					<button on:click={cancel}>Disconnect</button>
				</div>
			</Portfolio>

			<svelte:fragment slot="errorActions">
				<button class="medium" on:click={load}>Try Again</button>
				<button class="medium" on:click={cancel}>Cancel</button>
			</svelte:fragment>
		</Loader>
	</div>

	<div class="portis column">
		<Loader
			loadingIcon={'/logos/Portis.svg'}
			loadingIconName={'Portis'}
			loadingMessage="Log into Portis via the pop-up window."
			errorMessage="We couldn't connect your Portis.io Account."
			startImmediately={false}
			let:load fromPromise={() => loadPortisProvider().then(provider => getAccountsFromProvider(provider, 'Portis'))}
			bind:result={$connectedProviderAccounts['Portis']}
			let:result={accounts}
			let:cancel whenCanceled={disconnectPortisProvider}
		>
			<svelte:fragment slot="header" let:status>
				{#if status !== 'resolved'}
					<div class="bar">
						<h1><img src="/logos/portis-black.svg" alt="Portis" class="portis-logo"> Wallet</h1>
						{#if status === 'idle'}
							<button on:click={load}>Connect</button>
						{/if}
					</div>
				{/if}
			</svelte:fragment>

			<div slot="idle" class="card">
				<img src="/logos/portis.svg" alt="Portis" width="200">
				<p>Create or import a wallet address by connecting a Portis.io account.</p>
			</div>

			<Portfolio
				name="Portis Wallet"
				provider={portfolioProvider}
				{accounts}
			>
				<h1 slot="title"><img src="/logos/portis-black.svg" alt="Portis" class="portis-logo"> Wallet</h1>

				<div slot="actions" class="row">
					<!-- <button on:click={() => addToPortfolio(accounts[0])}>Add to...</button> -->
					<button on:click={cancel}>Disconnect</button>
				</div>
			</Portfolio>

			<svelte:fragment slot="errorActions">
				<button class="medium" on:click={load}>Try Again</button>
				<button class="medium" on:click={cancel}>Cancel</button>
			</svelte:fragment>
		</Loader>
	</div>
</section>