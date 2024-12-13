<script lang="ts">
	// Context
	import { preferences } from '$/state/preferences'
	import { getWalletsContext } from '$/state/wallets.svelte'
	const wallets = getWalletsContext()


	// Constants/types
	import { walletConnectionTypes } from '$/data/walletConnectionTypes'
	import type { AccountConnection } from '$/state/account.svelte'

	import { knownWalletsByType } from '$/data/wallets'
	import { networkByChainId, getNetworkColor } from '$/data/networks'


	// Shared state
	let {
		accountConnection = $bindable(),
		isFirstConnection = $bindable(false),
	}: {
		accountConnection: AccountConnection
		isFirstConnection: boolean
	} = $props()


	// Internal state
	const knownWalletConfig = $derived(
		accountConnection.selector.knownWallet && (
			knownWalletsByType[accountConnection.selector.knownWallet.type]
		)
	)
	const eip6963Provider = $derived(
		accountConnection.selector.eip6963 && (
			wallets.findEip6963Provider({
				rdns: accountConnection.selector.eip6963.rdns,
			})
		)
	)

	const icon = $derived(
		knownWalletConfig?.icon || eip6963Provider?.info.icon
	)
	const name = $derived(
		knownWalletConfig?.name || eip6963Provider?.info.name
	)
	const colors = $derived(
		knownWalletConfig?.colors || []
	)


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
	

	// Styles/animation
	import { scale } from 'svelte/transition'
	import { cardStyle } from '$/utils/card-background'
</script>


<div class="column scroll-snap-item" transition:scale>
	<Loader
		fromPromise={async () => (
			await accountConnection.getWalletConnection({
				wallets,
				theme,
			})
		)}
		loadingIcon={icon}
		loadingMessage={`Finding ${name} connection...`}

		errorMessage={`Couldn't find ${name} connection.`}

		whenCanceled={async () => dispatch('cancel')}

		let:result={walletConnection}
	>
		<Loader
			startImmediately={accountConnection.autoconnect || isFirstConnection}

			fromPromise={async () => {
				await accountConnection.connectWallet({
					isInitiatedByUser: !accountConnection.autoconnect,
					wallets,
				})
			}}

			loadingIcon={icon}

			whenLoaded={() => {
				dispatch('connect')
			}}

			errorMessage={`Couldn't connect your ${name} account.`}

			whenCanceled={async () => dispatch('cancel')}
		>
			<svelte:fragment slot="loadingMessage">
				{@const walletConnectionTypeConfig = walletConnection && walletConnectionTypes[walletConnection.connectionType]}

				<p>
					Connecting to {name}...
					{#if walletConnectionTypeConfig}<br><small>(using {walletConnectionTypeConfig.name})</small>{/if}
				</p>
			</svelte:fragment>

			<svelte:fragment slot="idle" let:load>
				<article
					class="wallet-connection card"

					title={name}

					style={cardStyle([...colors])}
				>
					<div class="wallet-icon-container stack">
						<Icon imageSources={[icon]} />
					</div>

					<!-- <div class="column align-start">
						<h4>{name}</h4>

						<div class="row">
							<button class="small" on:click={load}>Connect</button>

							<small>
								<label>
									<input type="checkbox" bind:checked={accountConnection.autoconnect} />
									<span>Autoconnect</span>
								</label>
							</small>

							<button
								class="small align-end destructive"
								data-before="✕"
								on:click={async () => {
									await await accountConnection.disconnectWallet?.()
									dispatch('disconnect')
								}}
							/>
						</div>
					</div> -->

					<!-- <div class="bar">
						<h4>{name}</h4>

						<div class="column align-end">
							<div class="row inline">
								<button class="small" on:click={load}>Connect</button>

								<button
									class="small align-end destructive"
									data-before="✕"
									on:click={async () => {
										await await accountConnection.disconnectWallet?.()
										dispatch('disconnect')
									}}
								/>
							</div>

							<small>
								<label>
									<input type="checkbox" bind:checked={accountConnection.autoconnect} />
									<span>Autoconnect</span>
								</label>
							</small>
						</div>
					</div> -->

					<!-- <div class="column">
						<div class="bar">
							<h4>{name}</h4>

							<div class="row inline">
								<button class="small" on:click={load}>Connect</button>

								<button
									class="small align-end destructive"
									data-before="✕"
									on:click={async () => {
										await await accountConnection.disconnectWallet?.()
										dispatch('disconnect')
									}}
								/>
							</div>
						</div>

						<div class="row">
							<small>
								<label>
									<input type="checkbox" bind:checked={accountConnection.autoconnect} />
									<span>Autoconnect</span>
								</label>
							</small>
						</div>
					</div> -->

					<div class="column">
						<div class="bar">
							<h4>{name}</h4>

							<button class="small" on:click={load}>Connect</button>
						</div>

						<div class="bar">
							<span />
							<small>
								<label>
									<input type="checkbox" bind:checked={accountConnection.autoconnect} />
									<span>Autoconnect</span>
								</label>
							</small>

							<button
								class="small align-end destructive"
								data-before="✕"
								on:click={async () => {
									await accountConnection.disconnectWallet?.()
									dispatch('disconnect')
								}}
							>Delete</button>
						</div>
					</div>
				</article>
			</svelte:fragment>

			{@const state = accountConnection.state}
			{@const walletConnectionTypeConfig = state.walletConnection && walletConnectionTypes[state.walletConnection.type]}
			{@const network = state.chainId && networkByChainId.get(state.chainId)}

			<article
				class="wallet-connection card"

				title="{name ?? state.walletConnection?.type}{walletConnectionTypeConfig ? ` via ${walletConnectionTypeConfig?.name}` : ''}"

				draggable={!!state.account?.address}
				on:dragstart={onDragStart}

				style={cardStyle([...colors ?? [], getNetworkColor(network)].filter(isTruthy))}
			>
				<!-- style="--primary-color: {walletConfig.colors[0]}" -->
				<!-- {getNetworkColor(network)} -->
				<div class="wallet-icon-container stack">
					<Icon imageSources={[icon]} />
					{#key state.chainId}{#if network}<div class="network-icon" transition:scale><NetworkIcon {network} /></div>{/if}{/key}
				</div>

				<div class="column align-start">
					{#if state.account?.address}
						<span>
							<Address
								address={state.account.address} {network}
								format="middle-truncated"
							/>
							{#if state.account.nickname}
								<small>"{state.account.nickname}"</small>
							{/if}
						</span>
					{:else}
						<span class="disconnected">Disconnected</span>
					{/if}

					{#if state.walletConnection}
						<div class="overflow-ellipsis">
							{name}
							<small>({walletConnectionTypeConfig?.name})</small>
						</div>
					{/if}
				</div>

				<button
					class="small align-end"
					on:click={async () => {
						await accountConnection.disconnectWallet?.()
						dispatch('disconnect')
					}}
					data-before="✕"
				/>
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
	.wallet-connection .column > :global(:nth-child(1)) {
		line-height: 1;
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
