<script lang="ts">
	// Constants/types
	import type { AccountConnectionState } from '../../../state/account'


	// Params
	import { accountId } from '../_appsParams'


	// Context
	import { web3AppConfig } from '../_appsContext'
	import { preferences } from '../../../state/preferences'


	// Internal state
	let selectedAccount: AccountConnectionState

	let tokenBalanceFormat
	let showUnderlyingAssets


	// Computed
	$: if(selectedAccount?.address) $accountId = selectedAccount.address
	$: currentAccountId = $accountId


	// Components
	import AccountIdResolver from '../../../components/AccountIdResolver.svelte'
	import ConnectedAccountSelect from '../../../components/ConnectedAccountSelect.svelte'
	import ExplorerInput from '../../../components/ExplorerInput.svelte'
	import Web3AppDashboard from '../../../components/Web3AppDashboard.svelte'


	// Transitions
	import { fly } from 'svelte/transition'
</script>


<style>
	.accountId-form {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto 1fr auto;
	}


	/* Nouns DAO */
	[data-app="nouns"] :global(:is(.card, select, button, input)) {
		--nouns-border: var(--primary-color) 0.25rem solid;
	}
	[data-app="nouns"] :global(.card:has(.card)) {
		position: relative;
		border-radius: 0;
		border: var(--nouns-border);
	}
	[data-app="nouns"] :global(.card:nth-last-child(n + 2):nth-child(2n + 1):before) {
		content: '';
		position: absolute;
		top: calc(50% - 0.5rem * 0.75);
		right: calc(100% + 0.25rem - 1px);
		width: 0.5rem;
		height: 0.5rem;
		border-top: var(--nouns-border);
		border-left: var(--nouns-border);
		pointer-events: none;
	}
	[data-app="nouns"] :global(.card):nth-child(2n):before {
		content: '';
		position: absolute;
		top: calc(50% - var(--padding-inner) * 0.75);
		right: 100%;
		width: calc(var(--padding-inner) + 0.25rem);
		height: 0.5rem;
		border-top: var(--nouns-border);
		pointer-events: none;
	}
	[data-app="nouns"] :global(.card):is(:nth-last-child(2), :nth-child(2)):after {
		content: '';
		z-index: -1;
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to right,
			rgba(255, 255, 255, calc(0.08 + var(--is-light) * 0.2)) 49.5%,
			rgba(0, 0, 0, calc(0.08 + var(--is-light) * 0.2)) 50.5%
		);
		pointer-events: none;
		animation: Blink 10s infinite;
	}
	@keyframes Blink {
		0%, 20%, 85% {
			translate: 0;
		}
		35%, 45% {
			translate: -1rem;
		}
		55%, 75% {
			translate: 1rem;
		}
		98%, 100% {
			scale: 1;
		}
		99% {
			scale: 1 0;
		}
	}
</style>


<section
	class="column"
	data-app={$web3AppConfig.slug}
	in:fly={{x: 100}}
	out:fly={{x: -100}}
>
	<form class="accountId-form row" on:submit|preventDefault={() => $accountId = currentAccountId}>
		<label class="row inline">
			<ConnectedAccountSelect address={$accountId} bind:selectedAccount />
		</label>

		<span>or</span>

		<ExplorerInput bind:value={currentAccountId} placeholder="EVM Address (0xabcd...6789) / ENS Domain (vitalik.eth) / Lens Handle (stani.lens)" />

		<button type="submit">Go</button>
	</form>

	<AccountIdResolver
		accountId={$accountId}
		passiveForwardResolution
		passiveReverseResolution
		let:address
	>
		{#if $web3AppConfig}
			<div class="stack">
				{#key $web3AppConfig}
					<div class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
						<Web3AppDashboard
							{address}
							web3AppConfig={$web3AppConfig}
							providerName={$preferences.rpcNetwork}
							defiProvider={$preferences.defiProvider}
							quoteCurrency={$preferences.quoteCurrency}
							{tokenBalanceFormat}
							{showUnderlyingAssets}
						/>
					</div>
				{/key}
			</div>
		{/if}
	</AccountIdResolver>

	<slot />
</section>
