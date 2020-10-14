<script lang="ts">
	import { onMount } from 'svelte'

	import { ethereumNetwork } from '../data/ethereum/network'
	import { getProvider } from '../data/ethereum/provider'
	import type { CryptoAddress } from '../data/CryptoAddress'
	// import type { CryptoPosition } from '../data/CryptoPosition'
	
	export let name = 'Your Portfolio'

	let provider 
	export let accounts: CryptoAddress[]
	onMount(async () => {
		provider = await getProvider($ethereumNetwork)
	})

	import Address from './Address.svelte'
	import Balance from './Balance.svelte'
	import Controls from './Controls.svelte'
	import Loading from './Loading.svelte'
</script>

<style>
	.portfolio {
		display: grid;
		gap: var(--padding-inner);
	}

	section {
		padding: var(--padding-outer);

		background-color: var(--card-background-color);
		border-radius: var(--card-border-radius);
	}
</style>


<Controls>
	<h1>{name}</h1>
	<button>Edit</button>
	<button>+ Add Wallet</button>
</Controls>
<div class="portfolio">
	{#if accounts}
		{#each accounts as address}
			<section>
				<h3><Address {address} /></h3>
				{#if provider}
					<Balance provider={provider} address={address} />
				{/if}
			</section>
		{/each}
	{:else}
		<slot>
			<Loading>Loading your accounts...</Loading>
		</slot>
	{/if}
</div>