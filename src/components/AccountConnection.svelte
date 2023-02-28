<script lang="ts">
	// Constants/types
	import type { WalletType } from '../data/ethereum/wallets'
	import { type AccountConnectionState, getAccountConnectionState } from '../state/account'

	import { walletsByType } from '../data/ethereum/wallets'
	import { networksByChainID, getNetworkColor } from '../data/networks'


	// External state
	export let walletType: WalletType
	export let autoconnect = false
	export let state: AccountConnectionState = {}


	// Shared state
	$: if(state?.walletConnection?.walletType)
		walletType = state.walletConnection.walletType


	// Methods/hooks/lifecycle

	import { getWalletConnection } from '../data/ethereum/wallets'

	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()


	const onDragStart = (e: DragEvent) => {
		e.dataTransfer.setData('text/plain', state.address)
	}


	// Components
	import Address from './Address.svelte'
	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
	import Icon from './Icon.svelte'
	

	// Styles/animation
	import { scale } from 'svelte/transition'
	import { cardStyle } from '../utils/card-background'
</script>


<div class="column scroll-snap-item" transition:scale>
	<Loader
		fromPromise={async () =>
			await getWalletConnection({
				walletType,
				// chainId,
			})
		}
		loadingIcon={walletsByType[walletType]?.icon}
		loadingMessage={`Finding ${walletsByType[walletType]?.name} connection...`}

		errorMessage={`Couldn't find ${walletsByType[walletType]?.name} connection.`}

		whenCanceled={async () => dispatch('cancel')}

		let:result={walletConnection}
	>
		<Loader
			startImmediately={autoconnect}
			fromStore={() => getAccountConnectionState(walletConnection)}

			loadingIcon={walletsByType[walletType]?.icon}

			whenLoaded={() => dispatch('connect')}

			errorMessage={`Couldn't connect your ${walletsByType[walletType]?.name} account.`}

			whenCanceled={async () => dispatch('cancel')}

			bind:result={state}
		>
			<svelte:fragment slot="loadingMessage">
				<p>
					Connecting to {walletsByType[walletType]?.name}...
					<br><small>(using {walletConnection?.connectionType})</small>
				</p>
			</svelte:fragment>

			<svelte:fragment slot="idle" let:status let:load>
				{@const walletConfig = walletsByType[walletType]}

				<article
					class="wallet-connection card"

					title="{walletType}"

					style={cardStyle([...walletConfig?.colors])}
				>
					<div class="wallet-icon-container stack">
						<Icon imageSources={[walletConfig?.icon]} />
					</div>

					{#if status === 'idle'}
						<!-- <div class="column align-start">
							<h4>{walletConfig.name}</h4>

							<div class="row">
								<button class="small" on:click={load}>Connect</button>

								<small>
									<label>
										<input type="checkbox" bind:checked={autoconnect} />
										<span>Autoconnect</span>
									</label>
								</small>

								<button
									class="small align-end destructive"
									data-before="✕"
									on:click={async () => {
										await state?.walletConnection?.disconnect?.()
										dispatch('disconnect')
									}}
								/>
							</div>
						</div> -->

						<!-- <div class="bar">
							<h4>{walletConfig.name}</h4>

							<div class="column align-end">
								<div class="row-inline">
									<button class="small" on:click={load}>Connect</button>

									<button
										class="small align-end destructive"
										data-before="✕"
										on:click={async () => {
											await state?.walletConnection?.disconnect?.()
											dispatch('disconnect')
										}}
									/>
								</div>

								<small>
									<label>
										<input type="checkbox" bind:checked={autoconnect} />
										<span>Autoconnect</span>
									</label>
								</small>
							</div>
						</div> -->

						<!-- <div class="column">
							<div class="bar">
								<h4>{walletConfig.name}</h4>

								<div class="row-inline">
									<button class="small" on:click={load}>Connect</button>

									<button
										class="small align-end destructive"
										data-before="✕"
										on:click={async () => {
											await state?.walletConnection?.disconnect?.()
											dispatch('disconnect')
										}}
									/>
								</div>
							</div>

							<div class="row">
								<small>
									<label>
										<input type="checkbox" bind:checked={autoconnect} />
										<span>Autoconnect</span>
									</label>
								</small>
							</div>
						</div> -->

						<div class="column">
							<div class="bar">
								<h4>{walletConfig.name}</h4>

								<button class="small" on:click={load}>Connect</button>
							</div>

							<div class="bar">
								<span />
								<small>
									<label>
										<input type="checkbox" bind:checked={autoconnect} />
										<span>Autoconnect</span>
									</label>
								</small>

								<button
									class="small align-end destructive"
									data-before="✕"
									on:click={async () => {
										await state?.walletConnection?.disconnect?.()
										dispatch('disconnect')
									}}
								>Delete</button>
							</div>
						</div>
					{/if}
				</article>
			</svelte:fragment>

			{#if state}
				{@const walletConfig = walletsByType[state.walletConnection?.walletType]}

				<article
					class="wallet-connection card"

					title="{state.walletConnection?.walletType} via {state.walletConnection?.connectionType}"

					draggable={!!state.address}
					on:dragstart={onDragStart}

					style={cardStyle([...walletConfig?.colors ?? [], getNetworkColor(networksByChainID[state.chainId])])}
				>
					<div class="wallet-icon-container stack">
						<Icon imageSources={[walletConfig?.icon]} />
						{#key state.chainId}{#if state.chainId}<div class="network-icon" transition:scale><NetworkIcon network={networksByChainID[state.chainId]} /></div>{/if}{/key}
					</div>

					<div class="column align-start">
						{#if state.address}
							<Address
								address={state.address} network={networksByChainID[state.chainId]}
								format="middle-truncated"
							/>
						{:else}
							<span class="disconnected">Disconnected</span>
						{/if}

						{#if state.walletConnection}
							<div class="overflow-ellipsis">
								{walletConfig.name}
								<small>({state.walletConnection?.connectionType})</small>
							</div>
						{/if}
					</div>

					<button
						class="small align-end"
						on:click={async () => {
							await state?.walletConnection?.disconnect?.()
							dispatch('disconnect')
						}}
						data-before="✕"
					/>
				</article>
			{/if}
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
