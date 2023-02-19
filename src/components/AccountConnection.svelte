<script lang="ts">
	// Constants/types
	import type { WalletType } from '../data/ethereum/wallets'
	import { type AccountConnectionState, getAccountConnectionState } from '../state/account'

	import { walletsByType } from '../data/ethereum/wallets'
	import { networksByChainID, getNetworkColor } from '../data/ethereum/networks'


	// External state
	export let walletType: WalletType
	export let autoconnect = true
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
		loadingMessage={`Detecting ${walletsByType[walletType]?.name} connection...`}

		errorMessage={`Error detecting ${walletsByType[walletType]?.name} connection.`}

		whenCanceled={async () => dispatch('cancel')}

		let:result={walletConnection}
	>
		<Loader
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
							<span>
								{walletConfig.name}
								<small>({state.walletConnection?.connectionType})</small>
							</span>
						{/if}
					</div>

					<button
						class="small align-end"
						on:click={async () => {
							await state?.walletConnection?.disconnect?.()
							dispatch('disconnect')
						}}
					>✕</button>
				</article>
			{/if}
		</Loader>
	</Loader>
</div>


<style>
	.wallet-connection {
		display: flex;
		align-items: center;
		padding: 0.5em;
		text-align: left;

		--icon-size: 2.5em;
	}
	.wallet-connection .column {
		gap: 0em;
	}
	.wallet-connection .column > * {
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.wallet-connection .column > :first-child {
		font-weight: 600;
	}
	.wallet-connection .column > :nth-child(2) {
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
