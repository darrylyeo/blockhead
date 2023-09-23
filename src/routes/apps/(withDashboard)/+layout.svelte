<script lang="ts">
	// Constants/types
	import type { AccountConnection } from '../../../state/account'


	// Params
	import { accountId } from '../_appsParams'


	// Context
	import { web3AppConfig, network } from '../_appsContext'
	import { preferences } from '../../../state/preferences'


	// Internal state
	let selectedAccountConnection: AccountConnection

	let tokenBalanceFormat
	let showUnderlyingAssets


	// Computed
	$: if(selectedAccountConnection?.state?.account?.address) $accountId = selectedAccountConnection.state.account.address
	$: currentAccountId = $accountId


	// Components
	import AccountIdResolver from '../../../components/AccountIdResolver.svelte'
	import BlockTransition from '../../../components/BlockTransition.svelte'
	import ConnectedAccountSelect from '../../../components/ConnectedAccountSelect.svelte'
	import ExplorerInput from '../../../components/ExplorerInput.svelte'
	import Web3AppDashboard from '../../../components/Web3AppDashboard.svelte'


	// Transitions
	import { fly } from 'svelte/transition'
</script>


<style>
	.accountId-form {
		display: grid;
		grid-template-columns: 3fr auto 1fr auto;
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

	[data-app="zora"] :global(:is(h3, h4)) {
		font-family: 'Arial Narrow', var(--base-fonts);
		font-weight: 700;
		letter-spacing: -0.1px;
	}
</style>


<section
	class="column"
	data-app={$web3AppConfig?.slug}
	in:fly={{x: 100}}
	out:fly={{x: -100}}
>
	<form class="accountId-form row" on:submit|preventDefault={() => $accountId = currentAccountId}>
		<ExplorerInput bind:value={currentAccountId} placeholder="EVM Address (0xabcd...6789) / ENS Domain (vitalik.eth) / Lens Handle (stani.lens)" />

		<span>or</span>

		<label class="row inline">
			<ConnectedAccountSelect address={$accountId} bind:selectedAccountConnection />
		</label>

		<button type="submit">Go</button>
	</form>

	<AccountIdResolver
		accountId={$accountId}
		passiveResolveToAddress
		passiveResolveToName
		let:address
	>
		{#if $web3AppConfig}
			<BlockTransition
				key={$web3AppConfig}
				inTransition={fly}
				inTransitionParams={{x: 100}}
				outTransition={fly}
				outTransitionParams={{x: -100}}
			>
				<Web3AppDashboard
					web3AppConfig={$web3AppConfig}
					network={$network}
					{address}
					networkProvider={$preferences.rpcNetwork}
					defiProvider={$preferences.defiProvider}
					quoteCurrency={$preferences.quoteCurrency}
					{tokenBalanceFormat}
					{showUnderlyingAssets}
				/>
			</BlockTransition>
		{/if}
	</AccountIdResolver>

	<slot />
</section>
