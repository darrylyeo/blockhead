<script context="module" lang="ts">
	export enum State {
		Idle = 'idle',
		Adding = 'adding'
	}
</script>


<script lang="ts">
	// Context
	import { accountConnections, AccountConnection, type AccountConnectionSelector } from '$/state/account'
	import { eip6963Providers } from '$/state/wallets'


	// Constants
	import { displayedKnownWallets, knownWalletsByEip6963Rdns } from '$/data/wallets'


	// Internal state
	let state = State.Idle

	let previousState: State
	$: {
		triggerEvent('AccountConnections/ChangeState', { fromState: previousState, toState: state })
		previousState = state
	}

	let lastAddedConnectionIndex: number | undefined


	// Actions
	import { triggerEvent } from '$/events/triggerEvent'

	const addAccountConnection = (selector: AccountConnectionSelector) => {
		$accountConnections = [
			new AccountConnection({ selector }),
			...$accountConnections,
		]

		lastAddedConnectionIndex = 0

		triggerEvent('AccountConnections/AddConnection', {
			knownWalletType: selector.knownWallet?.type,
			eip6963Rdns: selector.eip6963?.rdns,
		})
	}

	const removeAccountConnection = (i: number) => {
		const deletedAccountConnection = $accountConnections[i]
		$accountConnections = [...$accountConnections.slice(0, i), ...$accountConnections.slice(i + 1)]

		triggerEvent('AccountConnections/DeleteConnection', {
			knownWalletType: deletedAccountConnection.selector.knownWallet?.type,
			eip6963Rdns: deletedAccountConnection.selector.eip6963?.rdns,
		})
	}

	// Components
	import AccountConnectionComponent from './AccountConnection.svelte'
	import HeightContainer from './HeightContainer.svelte'
	import Icon from './Icon.svelte'


	// Style
	export let layout: 'row' | 'column' = 'row'


	// Transitions
	import { scale } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { expoOut } from 'svelte/easing'
</script>


<style>
	.wallets {
		--grid-gap: 0.66rem;
		
		display: flex;
		flex-wrap: wrap;
		margin: calc(-0.5 * var(--grid-gap));
		gap: 0;
	}

	.wallet {
		justify-content: center;
		flex: 1 auto;
		gap: 0.5em;
		margin: calc(0.5 * var(--grid-gap));
	}
</style>


<svelte:window
	on:blockhead_addAccountConnection={e => {
		addAccountConnection(e.detail.selector)
	}}
/>


<header class="bar wrap">
	<h2>Wallets</h2>

	<div class="stack align-end" transition:scale>
		{#if state === State.Idle}
			<button
				class="add align-end medium"
				data-before="＋"
				on:click={() => state = State.Adding}
				transition:scale
			>Connect Wallet</button>
		{:else if state === State.Adding}
			<button
				class="cancel align-end medium"
				on:click={() => state = State.Idle}
				transition:scale
			>Cancel</button>
		{/if}
	</div>
</header>

<HeightContainer class="stack" isOpen={state === State.Adding}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="card"
		on:keydown={e => { if(e.code === 'Escape') state = State.Idle }}
		transition:scale|global
	>
		<div class="wallets">
			{#each (
				Object.values($eip6963Providers)
					.sort((a, b) => a.info.name.localeCompare(b.info.name))
			) as eip6963Provider (eip6963Provider.info.uuid)}
				{@const knownWallet = knownWalletsByEip6963Rdns[eip6963Provider.info.rdns]}

				<button
					class="wallet medium row"
					style:--primary-color={knownWallet?.colors?.[knownWallet.colors.length - 1]}
					on:click={() => {
						addAccountConnection({
							eip6963: {
								rdns: eip6963Provider.info.rdns,
							},
						})
						state = State.Idle
					}}
				>
					<Icon
						imageSources={[eip6963Provider.info.icon]}
						title={eip6963Provider.info.name}
					/>
					{eip6963Provider.info.name}
				</button>
			{/each}

			{#each displayedKnownWallets as knownWallet (knownWallet.type)}
				<button
					class="wallet medium row"
					style:--primary-color={knownWallet.colors?.[knownWallet.colors.length - 1]}
					on:click={() => {
						addAccountConnection({
							knownWallet: {
								type: knownWallet.type,
							},
						})
						state = State.Idle
					}}
				>
					<Icon
						imageSources={[knownWallet.icon]}
						title={knownWallet.name}
					/>
					{knownWallet.name}
				</button>
			{/each}
		</div>
	</div>
</HeightContainer>

<section
	class="scroll-snap-area"
	class:row-scrollable={layout === 'row'}
	class:column={layout === 'column'}
>
	{#each $accountConnections as accountConnection, i (accountConnection.id)}
		<div animate:flip={{ duration: 500, easing: expoOut }}>
			<AccountConnectionComponent
				{accountConnection}
				isFirstConnection={i === lastAddedConnectionIndex}
				on:connect={() => { if(i === lastAddedConnectionIndex) lastAddedConnectionIndex = undefined }}
				on:delete={() => removeAccountConnection(i)}
			/>
		</div>
	{/each}
</section>
