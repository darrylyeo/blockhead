<script context="module" lang="ts">
	export enum State {
		Idle = 'idle',
		Adding = 'adding'
	}
</script>


<script lang="ts">
	// External state
	import { accountConnections, createAccountConnection } from '../state/account'


	// Constants
	import { wallets, type WalletType } from '../data/ethereum/wallets'


	// Internal state
	let state = State.Idle

	let previousState: State
	$: {
		triggerEvent('AccountConnections/ChangeState', { fromState: previousState, toState: state })
		previousState = state
	}


	// Actions

	import { triggerEvent } from '../events/triggerEvent'

	const addAccountConnection = (walletType: WalletType) => {
		$accountConnections = [createAccountConnection({ walletType }), ...$accountConnections]

		triggerEvent('AccountConnections/AddConnection', {
			walletType
		})
	}

	const removeAccountConnection = (i: number) => {
		const deletedAccountConnection = $accountConnections[i]
		$accountConnections = [...$accountConnections.slice(0, i), ...$accountConnections.slice(i + 1)]
		console.log({$accountConnections})

		triggerEvent('AccountConnections/DeleteConnection', {
			walletType: deletedAccountConnection.walletType
		})
	}

	// Components
	import AccountConnection from './AccountConnection.svelte'
	import HeightContainer from './HeightContainer.svelte'
	import Icon from './Icon.svelte'
	import InlineContainer from './InlineContainer.svelte'


	// Style
	export let layout: 'row' | 'column' = 'row'


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


<header class="bar">
	<h2>Wallets</h2>

	<div class="stack align-end" transition:scale>
		{#if state === State.Idle}
			<button
				class="add medium"
				on:click={() => state = State.Adding}
				transition:scale
			>＋ Connect Wallet</button>
		{:else if state === State.Adding}
			<button
				class="cancel medium"
				on:click={() => state = State.Idle}
				transition:scale
			>Cancel</button>
		{/if}
	</div>
</header>

<HeightContainer class="stack" isOpen={state === State.Adding}>
	<div class="card"
		on:keydown={e => { if(e.code === 'Escape') state = State.Idle }}
		transition:scale
	>
		<div class="wallets">
			{#each wallets as {type, name, icon, colors}}
				<button
					class="wallet medium row"
					style="--primary-color: {colors[colors.length - 1]}"
					on:click={() => { addAccountConnection(type); state = State.Idle }}
				>
					<Icon imageSources={[icon]} title={name} />
					{name}
				</button>
			{/each}
		</div>
	</div>
</HeightContainer>

<section
	class:row-scrollable={layout === 'row'}
	class:column={layout === 'column'}
>
	{#each $accountConnections as { id, walletType, state }, i (id)}
		<AccountConnection
			bind:walletType
			bind:state
			on:disconnect={() => removeAccountConnection(i)}
			on:cancel={() => removeAccountConnection(i)}
		/>
	{/each}
</section>
