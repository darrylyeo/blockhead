<script lang="ts">
	// External state
	import { accountConnections } from '../state/account'

	
	import ConnectAccount from './ConnectAccount.svelte'
	import HeightContainer from './HeightContainer.svelte'


	import { scale } from 'svelte/transition'
</script>


<header class="bar">
	<h2>Wallets</h2>

	{#if !$accountConnections.length || $accountConnections[$accountConnections.length - 1].walletType}
		<button
			class="align-end medium"
			on:click={() => $accountConnections = [...$accountConnections, { walletType: undefined }]}
			transition:scale
		>+ Connect Wallet</button>
	{/if}
</header>

<HeightContainer class="column">
	{#each $accountConnections as { walletType }, i}
		<ConnectAccount
			bind:walletType
			on:disconnect={() => $accountConnections = [...$accountConnections.slice(0, i), ...$accountConnections.slice(i + 1)]}
		/>
	{/each}
</HeightContainer>
