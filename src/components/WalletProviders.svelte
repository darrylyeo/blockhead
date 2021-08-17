<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { getEthersProvider, getProviderAndInstance } from '../data/ethereum/provider'
	import { connectedProviderAccounts, getAccountsFromProvider } from '../data/ethereum/portfolio-accounts'
	import { preferredDeFiProvider, preferredAnalyticsProvider, preferredQuoteCurrency } from '../data/ethereum/preferences'


	export let portfolioProvider
	export let network: Ethereum.Network
	

	const loadMetaMaskProvider = async () => {
		const metaMaskProvider = await getEthersProvider(network, 'MetaMask')

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
		return await getEthersProvider(network, 'Torus')
	}
	const disconnectTorusProvider = async () => {
		(await getProviderAndInstance(network, 'Torus')).disconnect()
	}


	const loadPortisProvider = async () => {
		return await getEthersProvider(network, 'Portis')
		// await portis.showPortis()
	}
	const disconnectPortisProvider = async () => {
		(await getProviderAndInstance(network, 'Portis')).disconnect()
	}


	import type { Account } from '../data/ethereum/portfolio-accounts'
	import type { DID } from 'dids'

	let didAuthProviderAccount: Account
	let did: DID
	const load3IDConnect = async (account: Account) => {
		// const address = '0x3c2d0f69d96cd6e6c3e77a9916365d332668cfe8'
		const { getDIDProviderFromEthereumProvider, getDID, authenticateDID } = await import('../data/ceramic/3id')

		const didProvider = await getDIDProviderFromEthereumProvider({
			// ethereumProvider: await loadMetaMaskProvider(),
			// address
			ethereumProvider: account.provider,
			address: account.id
		})
		const did = await getDID({ didProvider })

		console.log(did)
		await authenticateDID(did)
		console.log(did)


		const { getCAIP10Link } = await import('../data/ceramic/streams/caip10-link')

		const caip10Link = await getCAIP10Link({
			address,
			blockchainName: 'Ethereum'
		})

		return []
	}
	const disconnect3IDConnect = async () => {
		
	}

	
	import Loader from './Loader.svelte'
	import Portfolio from './Portfolio.svelte'
	import WalletAccountSelect from './WalletAccountSelect.svelte'
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

	.idx {
		--primary-color: #c639f9;
	}
	.idx-logo {
		display: inline-block;
		height: 0.72em;
	}

	.wallet-providers :global(.wallet-account-select) {
    	max-width: 10em;
	}
	/* label {
		gap: 0.25em;
	} */


	:global(iframe#openlogin-modal, iframe.threeid-connect-manage) {
		inset: 0;
		max-width: 410px;
		max-height: 650px;
		margin: auto;
		border-radius: 1rem;
	}
</style>


<section class="wallet-providers column">
	<div class="metamask column">
		<Loader
			loadingIcon={'/logos/metamask-icon.svg'}
			loadingIconName={'MetaMask'}
			loadingMessage="Log into MetaMask via the pop-up window."
			errorMessage="We couldn't connect your MetaMask Account."
			startImmediately={false}
			let:load fromPromise={() => loadMetaMaskProvider().then(provider => getAccountsFromProvider(provider, 'MetaMask'))}
			bind:result={$connectedProviderAccounts['MetaMask']}
			let:then={accounts}
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
				defiProvider={$preferredDeFiProvider}
				analyticsProvider={$preferredAnalyticsProvider}
				quoteCurrency={$preferredQuoteCurrency}
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
			loadingIcon={'/logos/torus-icon.svg'}
			loadingIconName={'Torus'}
			loadingMessage="Log into Torus via the pop-up window."
			errorMessage="We couldn't connect your Tor.us Account."
			startImmediately={false}
			let:load fromPromise={() => loadTorusProvider().then(provider => getAccountsFromProvider(provider, 'Torus'))}
			bind:result={$connectedProviderAccounts['Torus']}
			let:then={accounts}
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
				defiProvider={$preferredDeFiProvider}
				analyticsProvider={$preferredAnalyticsProvider}
				quoteCurrency={$preferredQuoteCurrency}
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
			loadingIcon={'/logos/portis-icon.svg'}
			loadingIconName={'Portis'}
			loadingMessage="Log into Portis via the pop-up window."
			errorMessage="We couldn't connect your Portis.io Account."
			startImmediately={false}
			let:load fromPromise={() => loadPortisProvider().then(provider => getAccountsFromProvider(provider, 'Portis'))}
			bind:result={$connectedProviderAccounts['Portis']}
			let:then={accounts}
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
				defiProvider={$preferredDeFiProvider}
				analyticsProvider={$preferredAnalyticsProvider}
				quoteCurrency={$preferredQuoteCurrency}
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

	<hr>

	<div class="idx column">
		<Loader
			loadingIcon={'/logos/idx.svg'}
			loadingIconName={'3ID Connect'}
			loadingMessage="Log into 3ID Connect via the pop-up window."
			errorMessage="We couldn't connect your 3ID Connect identity."
			startImmediately={false}
			let:load fromPromise={didAuthProviderAccount && (() => load3IDConnect(didAuthProviderAccount))}
			bind:result={$connectedProviderAccounts['3ID Connect']}
			let:then={accounts}
			let:cancel whenCanceled={disconnect3IDConnect}
		>
			<svelte:fragment slot="header" let:status>
				{#if status !== 'resolved'}
					<div class="bar">
						<h1><img src="/logos/idx.svg" alt="Ceramic/IDX" class="idx-logo"> Identity</h1>
						<label>
							<WalletAccountSelect bind:account={didAuthProviderAccount} />
						</label>
						{#if status === 'idle'}
							<button on:click={load} disabled={!!!didAuthProviderAccount}>Connect</button>
						{/if}
					</div>
				{/if}
			</svelte:fragment>

			<div slot="idle" class="card">
				<p>Connect a decentralized identity (DID) via 3ID Connect/IDX.</p>
			</div>

			<Portfolio
				name="3ID Connect/IDX"
				provider={portfolioProvider}
				defiProvider={$preferredDeFiProvider}
				analyticsProvider={$preferredAnalyticsProvider}
				quoteCurrency={$preferredQuoteCurrency}
				{accounts}
			>
				<h1 slot="title">3ID Connect/IDX</h1>

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