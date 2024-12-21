<script lang="ts">
	// Context
	import { preferences } from '$/state/preferences'

	import { accountConnectionToInfo } from '$/state/account'


	// Constants/types
	import type { AccountConnection } from '$/state/account'
	import { networkByChainId, getNetworkColor } from '$/data/networks'


	// Shared state
	export let accountConnection: AccountConnection
	
	export let isFirstConnection = false


	// Internal state
	$: info = $accountConnectionToInfo.get(accountConnection)!


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
		if(info.address)
			e.dataTransfer?.setData('text/plain', info.address)
	}


	// Functions
	import { parseCaip2Id } from '$/utils/parseCaip2Id'
	import { isTruthy } from '$/utils/isTruthy'


	// Components
	import Address from './Address.svelte'
	import BlockTransition from './BlockTransition.svelte'
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
		loadingIcon={info.icon}
		loadingMessage={`Finding ${info.walletName} connection...`}

		errorMessage={`Couldn't find ${info.walletName} connection.`}

		whenCanceled={() => { dispatch('delete') }}

		viewOptions={{
			contentClass: 'stack',
		}}
	>
		<Loader
			startImmediately={accountConnection.autoconnect || isFirstConnection}
			fromStore={() => (
				accountConnection.connectWallet({
					isInitiatedByUser: !accountConnection.autoconnect,
				})
			)}

			loadingIcon={info.icon}

			loadingMessage={`Connecting to ${info.walletName}${info.walletConnectionTypeName ? ` (using ${info.walletConnectionTypeName})` : ''}...`}
			whenLoaded={() => {
				isFirstConnection = false
				dispatch('connect')
			}}

			errorMessage={`Couldn't connect your ${info.walletName} account.`}

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
					Connecting to {info.walletName}...
					{#if info.walletConnectionTypeName}<br><small>(using {info.walletConnectionTypeName})</small>{/if}
				</p>
			</svelte:fragment>

			<article
				class="wallet-connection card"

				data-connected={isConnected}

				title="{info.walletName ?? info.walletConnectionTypeName}{info.walletConnectionTypeName ? ` via ${info.walletConnectionTypeName}` : ''}"

				on:dragover={e => { e.preventDefault() }}
				on:drop={e => {
					const text = e.dataTransfer?.getData('text/plain')
					if(!text) return

					const result = parseCaip2Id(text)
					if(!('chainId' in result)) return
					
					const chainId = Number(result.chainId)
					const network = networkByChainId.get(chainId)
					if(!network) return

					accountConnection.state.walletConnection?.switchNetwork?.(network)
				}}

				draggable={!!info.address}
				on:dragstart={onDragStart}

				style={isConnected ? cardStyle([...info.colors ?? [], info.network && getNetworkColor(info.network)].filter(isTruthy)) : undefined}
			>
				<div class="wallet-icon-container stack">
					<Icon imageSources={[info.icon].filter(isTruthy)} />

					{#key info.network}{#if info.network}<div class="network-icon" transition:scale><NetworkIcon network={info.network} /></div>{/if}{/key}
				</div>

				<div class="column">
					<div class="bar">
						<BlockTransition
							key={isConnected && info.address}
							align="bottom"
							contentProps={{
								class: 'align-start',
							}}
						>
							<span class="overflow-ellipsis">
								{#if isConnected && info.address}
									<BlockTransition
										value={info.address}
										align="bottom"
										contentProps={{
											class: 'align-start',
										}}
									>
										<Address
											network={info.network}
											address={info.address}
											format="middle-truncated"
										/>
									</BlockTransition>

									{#if info.nickname}
										<small>"{info.nickname}"</small>
									{/if}
								{:else}
									<h4>{info.walletName}</h4>
								{/if}
							</span>
						</BlockTransition>

						<InlineTransition
							key={isConnected}
							align="end"
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
						<BlockTransition
							key={isConnected && info.address}
							align="top"
							contentProps={{
								class: 'align-start',
							}}
						>
							<span class="overflow-ellipsis">
								{#if isConnected && info.address}
									{info.walletName}
									{#if info.walletConnectionTypeName}
										<small>({info.walletConnectionTypeName})</small>
									{/if}
								{:else if info.address || info.walletConnectionTypeName}
									{#if info.address}
										Last:

										<Address
											network={info.network}
											address={info.address}
											format="middle-truncated"
										/>

										{#if info.walletConnectionTypeName}
											<small>({info.walletConnectionTypeName})</small>
										{/if}
									{:else if info.walletConnectionTypeName}
										{info.walletConnectionTypeName}
									{/if}
								{/if}
							</span>
						</BlockTransition>

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

		transition-property: box-shadow;

		.wallet-icon-container {
			aspect-ratio: 1;

			.network-icon {
				display: flex;
				--icon-size: 1em;
				place-self: end;
			}

			transition-property: filter, opacity;
		}

		.column {
			gap: 0.33rem;

			> :nth-child(1) {
				gap: inherit;

				h4 {
					font-weight: 600;
				}

				transition-property: opacity;
			}

			> :nth-child(2) {
				gap: inherit;

				font-size: 0.75em;

				> :global(:first-child) {
					font-weight: 200;
					opacity: 0.8;
				}

				transition-property: opacity;
			}
		}

		&[data-connected="false"] {
			box-shadow: 0 0 0 0 transparent inset;

			.wallet-icon-container {
				filter: grayscale(0.25) contrast(1.25);
				opacity: 0.5;
			}

			.column {
				> :nth-child(1) {
					> :first-child {
						opacity: 0.75;
					}
				}

				> :nth-child(2) {
					> :global(:first-child) {
						opacity: 0.66;
					}
				}
			}
		}

		&[data-connected="true"] {
			box-shadow: 0 0 0 2px color-mix(in oklch, transparent 80%, var(--primary-color)) inset;
		}
	}

	.align-end {
		margin-left: auto;
	}


	small {
		font-size: 0.75em;
	}
</style>
