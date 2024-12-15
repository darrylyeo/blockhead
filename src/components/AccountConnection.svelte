<script lang="ts">
	// Context
	import { preferences } from '$/state/preferences'
	import { eip6963Providers, findEip6963Provider } from '$/state/wallets'


	// Constants/types
	import { walletConnectionTypes } from '$/data/walletConnectionTypes'
	import type { AccountConnection } from '$/state/account'

	import { knownWalletsByType } from '$/data/wallets'
	import { networkByChainId, getNetworkColor } from '$/data/networks'


	// Shared state
	export let accountConnection: AccountConnection
	export let isFirstConnection = false


	// Internal state
	$: knownWalletConfig = accountConnection.selector.knownWallet && knownWalletsByType[accountConnection.selector.knownWallet.type]
	$: eip6963Provider = accountConnection.selector.eip6963 && findEip6963Provider({
		eip6963Providers: $eip6963Providers,
		rdns: accountConnection.selector.eip6963.rdns,
	})

	$: icon = knownWalletConfig?.icon || eip6963Provider?.info.icon
	$: name = knownWalletConfig?.name || eip6963Provider?.info.name
	$: colors = knownWalletConfig?.colors || []


	// Derived
	import { derived } from 'svelte/store'

	import { matchesMediaQuery } from '$/utils/matchesMediaQuery'
	const prefersDark = matchesMediaQuery('(prefers-color-scheme: dark)') 

	const theme = derived([preferences, prefersDark], ([$preferences, $prefersDark]) => ({
		mode: $preferences.theme === 'auto' ? $prefersDark ? 'dark' : 'light' : $preferences.theme
	}))


	// Actions
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()


	const onDragStart = (e: DragEvent) => {
		if(accountConnection.state.account?.address)
			e.dataTransfer.setData('text/plain', accountConnection.state.account.address)
	}


	// Functions
	import { isTruthy } from '$/utils/isTruthy'


	// Components
	import Address from './Address.svelte'
	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
	import Icon from './Icon.svelte'
	import InlineTransition from './InlineTransition.svelte'
	

	// Styles/animation
	import { scale } from 'svelte/transition'
	import { cardStyle } from '$/utils/card-background'
</script>


<div class="column scroll-snap-item" transition:scale>
	<Loader
		fromPromise={async () => (
			await accountConnection.getWalletConnection({
				theme,
			})
		)}
		loadingIcon={icon}
		loadingMessage={`Finding ${name} connection...`}

		errorMessage={`Couldn't find ${name} connection.`}

		whenCanceled={() => { dispatch('cancel') }}

		viewOptions={{
			contentClass: 'stack',
		}}
	>
		{@const walletConnectionTypeConfig = accountConnection.state.walletConnection && walletConnectionTypes[accountConnection.state.walletConnection.type]}
		{@const network = accountConnection.state.chainId && networkByChainId.get(accountConnection.state.chainId)}

		<Loader
			startImmediately={accountConnection.autoconnect || isFirstConnection}
			fromStore={() => (
				accountConnection.connectWallet({
					isInitiatedByUser: !accountConnection.autoconnect,
				})
			)}

			loadingIcon={icon}

			loadingMessage={`Connecting to ${name}${walletConnectionTypeConfig ? ` (using ${walletConnectionTypeConfig.name})` : ''}...`}
			whenLoaded={() => {
				isFirstConnection = false
				dispatch('connect')
			}}

			errorMessage={`Couldn't connect your ${name} account.`}

			whenCanceled={async () => {
				await accountConnection.disconnectWallet?.()
				dispatch('cancel')
			}}

			viewOptions={{
				showContentWhenIdle: true,
				loadingClass: 'backdrop',
				errorClass: 'backdrop',
			}}

			let:status={walletConnectionStatus}
			let:load={connectWallet}
			let:cancel={disconnectWallet}
		>
			{@const isConnected = walletConnectionStatus === 'resolved'}

			<svelte:fragment slot="loadingMessage">
				<p>
					Connecting to {name}...
					{#if walletConnectionTypeConfig}<br><small>(using {walletConnectionTypeConfig.name})</small>{/if}
				</p>
			</svelte:fragment>

			<article
				class="wallet-connection card"

				title="{name ?? accountConnection.state.walletConnection?.type}{walletConnectionTypeConfig ? ` via ${walletConnectionTypeConfig?.name}` : ''}"

				draggable={!!accountConnection.state.account?.address}
				on:dragstart={onDragStart}

				style={isConnected ? cardStyle([...colors ?? [], getNetworkColor(network)].filter(isTruthy)) : undefined}
			>
				<div class="wallet-icon-container stack">
					<Icon imageSources={[icon]} />

					{#key network}{#if network}<div class="network-icon" transition:scale><NetworkIcon {network} /></div>{/if}{/key}
				</div>

				<div class="column">
					<div class="bar">
						<InlineTransition
							key={isConnected && accountConnection.state.account?.address}
							align="start"
						>
							{#if isConnected && accountConnection.state.account?.address}
								<span>
									<InlineTransition
										value={accountConnection.state.account?.address}
										align="start"
									>
										<Address
											address={accountConnection.state.account?.address} {network}
											format="middle-truncated"
										/>
									</InlineTransition>

									{#if accountConnection.state.account?.nickname}
										<small>"{accountConnection.state.account?.nickname}"</small>
									{/if}
								</span>
							{:else}
								<span class="overflow-ellipsis">
									<h4>{name}</h4>
								</span>
							{/if}
						</InlineTransition>

						<InlineTransition
							align="end"
							key={isConnected}
						>
							{#if !isConnected}
								<div class="bar">
									<button class="small" on:click={connectWallet}>Connect</button>
								</div>
							{:else}
								<small>
									<label>
										<input type="checkbox" bind:checked={accountConnection.autoconnect} />
										<span>Pin</span>
									</label>
								</small>
							{/if}
						</InlineTransition>
					</div>

					<div class="bar">
						<InlineTransition
							key={isConnected && accountConnection.state.account?.address}
							align="start"
							containerProps={{
								class: 'overflow-ellipsis',
								style: 'flex: 1 0;',
							}}
							contentProps={{
								class: 'overflow-ellipsis',
							}}
						>
							{#if isConnected && accountConnection.state.account?.address}
								<div class="overflow-ellipsis" style="flex: 1 0;">
									{name}
									{#if walletConnectionTypeConfig?.name}
										<small>({walletConnectionTypeConfig?.name})</small>
									{/if}
								</div>
							{:else if accountConnection.state.account?.address || walletConnectionTypeConfig?.name}
								<div class="overflow-ellipsis" style="flex: 1 0;">
									{#if accountConnection.state.account?.address}
										Last:

										<Address
											address={accountConnection.state.account?.address} {network}
											format="middle-truncated"
										/>

										{#if walletConnectionTypeConfig?.name}
											<small>({walletConnectionTypeConfig?.name})</small>
										{/if}
									{:else if walletConnectionTypeConfig?.name}
										{walletConnectionTypeConfig?.name}
									{/if}
								</div>
							{/if}
						</InlineTransition>

						<InlineTransition
							key={!isConnected ? 1 : isConnected && !accountConnection.autoconnect ? 2 : 0}
							align="end"
						>
							{#if !isConnected}
								<button
									class="small align-end destructive"
									data-before="✕"
									title="Delete"
									on:click={async () => {
										dispatch('delete')
									}}
								></button>
							{:else if isConnected && !accountConnection.autoconnect}
								<button
									class="small cancel"
									data-before="✕"
									title="Disconnect"
									on:click={disconnectWallet}
								></button>
							{/if}
						</InlineTransition>
					</div>
				</div>
			</article>
		</Loader>
	</Loader>
</div>


<style>
	.wallet-connection {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-auto-flow: column;
		align-items: center;
		padding: 0.5em;
		text-align: left;
		line-height: 1.25;

		--icon-size: 2.5em;
	}
	.wallet-connection > :global(*) {
		--padding-inner: 0.33rem;
		gap: 0.33rem;
	}
	.wallet-connection h4 {
		font-weight: 600;
	}
	.wallet-connection :global(.column > :nth-child(2)) {
		font-weight: 200;
		font-size: 0.75em;
		opacity: 0.8;
	}
	.align-end {
		margin-left: auto;
	}

	.wallet-icon-container {
		aspect-ratio: 1;
	}
	.network-icon {
		display: flex;
		--icon-size: 1em;
		place-self: end;
	}


	small {
		font-size: 0.75em;
	}

	.disconnected {
		opacity: 0.5;
	}
</style>
