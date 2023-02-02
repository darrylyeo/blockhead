<script lang="ts">
	// Constants/types
	import type { WalletConnection, WalletType } from '../data/ethereum/wallets'
	import type { ConnectedAccount } from '../state/account'

	import { walletsByType } from '../data/ethereum/wallets'
	import { networksByChainID, getNetworkColor } from '../data/ethereum/networks'


	// External state
	export let autoconnect = true
	export let walletType: WalletType


	// Internal state
	export let account: ConnectedAccount


	// Shared state
	export let address: string

	$: if(account?.walletConnection?.walletType)
		walletType = account.walletConnection.walletType


	// Methods/hooks/lifecycle

	import { getWalletConnection, getSigner } from '../data/ethereum/wallets'

	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	import { readable } from 'svelte/store'

	const getAccountConnectionStore = (walletConnection: WalletConnection) =>
		readable(
			{loading: true},
			set => void (async () => { // readable<Result<ConnectedAccount>>
				try {
					const accounts = await walletConnection.connect()

					const account = {
						walletConnection,
						signer: getSigner(walletConnection.provider),
						address: accounts?.[0],
						chainId: undefined,
					}

					set({
						loading: false,
						data: account
					})

					const stores = walletConnection.subscribe()

					stores.accounts.subscribe(accounts => set({
						loading: false,
						data: {
							...account,
							address: accounts[0]
						}
					}))

					stores.chainId.subscribe(chainId => set({
						loading: false,
						data: {
							...account,
							chainId
						}
					}))
				}catch(e){
					set({
						loading: false,
						error: e
					})
				}
			})()
		)


	const onDragStart = (e: DragEvent) => {
		e.dataTransfer.setData('text/plain', account.address)
	}


	// Components
	import Address from './Address.svelte'
	import Loader from './Loader.svelte'
	import Icon from './Icon.svelte'
	

	// Styles/animation
	import { scale } from 'svelte/transition'
</script>


<div class="column" transition:scale>
	<Loader 
		fromPromise={async () =>
			await getWalletConnection({
				walletType,
				// chainId,
			})
		}
		loadingIcon={walletsByType[walletType]?.icon}
		loadingMessage={`Detecting ${walletsByType[walletType]?.name} connection...`}
		let:result={walletConnection}
	>
		<Loader
			fromStore={() => getAccountConnectionStore(walletConnection)}

			loadingIcon={walletsByType[walletType]?.icon}
			loadingMessage={`Connecting to ${walletsByType[walletType]?.name} via ${walletConnection.connectionType}...`}

			whenLoaded={() => dispatch('connect')}

			errorMessage={`Couldn't connect your ${walletsByType[walletType]?.name} account.`}

			whenCanceled={async () => {
				dispatch('cancel')
			}}

			bind:result={account}
			let:result={account}
		>
			{#if account}
				<article
					class="wallet-connection card bar"

					title="{account.walletConnection.walletType} via {account.walletConnection.connectionType}"

					draggable={true}
					on:dragstart={onDragStart}

					style="--primary-color: {getNetworkColor(networksByChainID[account.chainId])}"
				>
					<div class="row">
						<Icon imageSources={[walletsByType[account.walletConnection.walletType]?.icon]} />

						<div class="column align-start">
							{#if account.address}
								<Address
									address={account.address} network={networksByChainID[account.chainId]}
									format="middle-truncated"
								/>
							{:else}
								<span class="disconnected">Disconnected</span>
							{/if}

							<span>
								{walletsByType[account.walletConnection.walletType].name}
								<small>({account.walletConnection.connectionType})</small>
							</span>
						</div>
					</div>
					
					<button
						class="small align-end"
						on:click={async () => {
							await account?.walletConnection.disconnect?.()
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

	small {
		font-size: 0.75em;
	}

	.disconnected {
		opacity: 0.5;
	}
</style>
