<script module lang="ts">
	export enum State {
		Idle = 'idle',
		Adding = 'adding'
	}
</script>


<script lang="ts">
	// Context
	import { accountConnections, AccountConnection, type AccountConnectionSelector } from '$/state/account'

	import { getWalletsContext } from '$/state/wallets.svelte'
	const wallets = getWalletsContext()


	// Constants
	import { displayedKnownWallets } from '$/data/wallets'


	// Internal state
	let currentState = $state(State.Idle)

	let previousState: State
	$effect(() => {
		triggerEvent('AccountConnections/ChangeState', { fromState: previousState, toState: currentState })
		previousState = currentState
	})

	let lastAddedConnectionIndex = $state<number | undefined>()


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
	let {
		layout = 'row',
	}: {
		layout?: 'row' | 'column'
	} = $props()


	// Transitions
	import { scale } from 'svelte/transition'
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
		{#if currentState === State.Idle}
			<button
				class="add medium"
				data-before="＋"
				onclick={() => { currentState = State.Adding }}
				transition:scale
			>Connect Wallet</button>
		{:else if currentState === State.Adding}
			<button
				class="cancel medium"
				onclick={() => { currentState = State.Idle }}
				transition:scale
			>Cancel</button>
		{/if}
	</div>
</header>

<HeightContainer class="stack" isOpen={currentState === State.Adding}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="card"
		onkeydown={e => { if(e.code === 'Escape') currentState = State.Idle }}
		transition:scale|global
	>
		<div class="wallets">
			{#each (
				[...wallets.eip6963Providers.values()]
					.sort((a, b) => a.info.name.localeCompare(b.info.name))
			) as eip6963Provider}
				<button
					class="wallet medium row"
					onclick={() => {
						addAccountConnection({
							eip6963: {
								rdns: eip6963Provider.info.rdns,
							},
						})
						currentState = State.Idle
					}}
				>
					<Icon
						imageSources={[eip6963Provider.info.icon]}
						title={eip6963Provider.info.name}
					/>
					{eip6963Provider.info.name}
				</button>
			{/each}

			{#each displayedKnownWallets as knownWallet}
				<button
					class="wallet medium row"
					style="--primary-color: {knownWallet.colors[knownWallet.colors.length - 1]}"
					onclick={() => {
						addAccountConnection({
							knownWallet: {
								type: knownWallet.type,
							},
						})
						currentState = State.Idle
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
		<AccountConnectionComponent
			{accountConnection}
			isFirstConnection={i === lastAddedConnectionIndex}
			on:connect={() => { if(i === lastAddedConnectionIndex) lastAddedConnectionIndex = undefined }}
			on:disconnect={() => removeAccountConnection(i)}
			on:cancel={() => removeAccountConnection(i)}
		/>
	{/each}
</section>
