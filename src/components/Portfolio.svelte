<script context="module" lang="ts">
	export enum State {
		Idle = 'idle',
		Editing = 'editing',
		Adding = 'adding'
	}
</script>


<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { DeFiProvider } from '../data/defi-provider'
	import type { QuoteCurrency } from '../data/currency/currency'

	import { Account } from '../state/portfolio-accounts'
	import { availableNetworks } from '../data/ethereum/networks'

	import { preferences } from '../state/preferences'


	// Portfolio management

	export let name = ''
	export let accounts: Account[]

	export let editable = false


	import { triggerEvent } from '../events/triggerEvent'


	let state = State.Idle
	$: if(editable && name === '')
		state = State.Editing

	let previousState: State
	$: {
		triggerEvent('Portfolio/ChangeState', { fromState: previousState, toState: state })
		previousState = state
	}


	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()


	// Wallet management

	function isValid(address){
		return address !== ''
	}

	let newWalletAddress = ''

	const addAccount = (newWalletAddress: Ethereum.Address) => {
		if(!isValid(newWalletAddress))
			return

		if(accounts.some(account => account.id.toLowerCase() === newWalletAddress.toLowerCase()))
			return

		const newAccount = new Account(newWalletAddress)
		accounts = [newAccount, ...accounts]

		triggerEvent('Portfolio/AddAccount', {
			accountChainIds: newAccount.networks.map(({ chainID }) => chainID),
			newPortfolioAccountsCount: accounts.length,
		})
	}

	const deleteAccount = (i: number) => {
		delayStartIndex = i

		const deletedAccount = accounts[i]
		accounts = [...accounts.slice(0, i), ...accounts.slice(i + 1)]

		triggerEvent('Portfolio/DeleteAccount', {
			accountChainIds: deletedAccount.networks.map(({ chainID }) => chainID),
			newPortfolioAccountsCount: accounts.length,
		})
	}
	
	
	// Balances view options
	
	export let provider: Ethereum.Provider
	export let defiProvider: DeFiProvider
	export let tokenBalancesProvider
	export let nftProvider
	export let quoteCurrency: QuoteCurrency

	$: defiProvider = $$props.defiProvider || $preferences.defiProvider
	$: tokenBalancesProvider = $$props.tokenBalancesProvider || $preferences.tokenBalancesProvider
	$: nftProvider = $$props.nftProvider || $preferences.nftProvider
	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency
	
	let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending' = 'value-descending'
	let showSmallValues = false
	let showUnderlyingAssets = false
	let showNFTMetadata = false
	let showImagesOnly = false
	let show3D = false


	// Computed Values
	let accountsSummaries = {}

	export let summary: {
		quoteTotal: number,
		quoteTotalCurrency: QuoteCurrency,
		balancesCount: number,
		defiAppsCount: number,
		nftContractsCount: number,
		nftsCount: number,
	}
	$: summary = {
		quoteTotal:
			accounts
				.map(({ id }) => accountsSummaries[id])
				.reduce((sum, { quoteTotal = 0 } = {}) => sum + quoteTotal, 0),

		quoteTotalCurrency: quoteCurrency,

		balancesCount:
			accounts
				.map(({ id }) => accountsSummaries[id])
				.reduce((sum, { balancesCount = 0 } = {}) => sum + balancesCount, 0),

		defiAppsCount:
			accounts
				.map(({ id }) => accountsSummaries[id])
				.reduce((sum, { defiAppsCount = 0 } = {}) => sum + defiAppsCount, 0),

		nftContractsCount:
			accounts
				.map(({ id }) => accountsSummaries[id])
				.reduce((sum, { nftContractsCount = 0 } = {}) => sum + nftContractsCount, 0),

		nftsCount:
			accounts
				.map(({ id }) => accountsSummaries[id])
				.reduce((sum, { nftsCount = 0 } = {}) => sum + nftsCount, 0),
	}


	// Options menu
	let showOptions = true
	const toggleShowOptions = () => showOptions = !showOptions


	let delayStartIndex = 0


	import AddressInput from './AddressInput.svelte'
	import Loading from './Loading.svelte'
	import InlineContainer from './InlineContainer.svelte'
	import SizeContainer from './SizeContainer.svelte'
	import PortfolioAccount from './PortfolioAccount.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TokenBalanceFormatSelect from './TokenBalanceFormatSelect.svelte'
	import TweenedNumber from './TweenedNumber.svelte'


	import { flip } from 'svelte/animate'
	import { fly, scale } from 'svelte/transition'
</script>


<style>
	.portfolio {
		scroll-snap-align: start;
	}

	.edit-controls {
		flex: 0 auto;
		font-size: 0.7em;
	}

	.options {
		margin: 0 calc(-1 * var(--padding-outer));

		font-size: 0.8em;

		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
	}

	form {
		display: contents;
	}

	.account-total-value {
		font-size: 1.21em;
	}

	.portfolio h1 {
		flex: 1 16rem;
	}
</style>


<section
	class="portfolio column"
	on:keydown={e => { if(e.code === 'Escape') state = State.Idle }}
	on:dragenter={e => state = State.Adding}
	tabIndex={0}
>
	<header class="bar">
		<slot name="title">
			<h1 class="row" on:dblclick={editable && (() => state = State.Editing)}>
				{#if state !== State.Editing}
					{name || '[Untitled Portfolio]'}
				{:else}
					<form on:submit={() => state = State.Idle}>
						<input type="text" bind:value={name} placeholder="My Portfolio" autofocus />
					</form>
				{/if}
			</h1>
		</slot>

		<InlineContainer isOpen={summary && state !== State.Editing}>
			<span class="summary" transition:scale>
				<span class="account-total-value"><TokenBalance symbol={quoteCurrency} balance={summary.quoteTotal} showPlainFiat={true} /></span>

				<!-- {#if summary.filteredBalancesCount}
					│
					<strong><TweenedNumber value={summary.filteredBalancesCount} /></strong> token{summary.balancesCount === 1 ? '' : 's'}
				{/if} -->

				<!-- {#if summary.defiAppsCount}
					│
					<strong><TweenedNumber value={summary.defiAppsCount} /></strong> app{summary.defiAppsCount === 1 ? '' : 's'}
				{/if} -->

				{#if summary.nftsCount}
					│
					<strong><TweenedNumber value={summary.nftsCount} /></strong> NFT{summary.nftsCount === 1 ? '' : 's'}

					<!-- {#if summary.nftContractsCount}
						from <strong><TweenedNumber value={summary.nftContractsCount} /></strong> collection{summary.nftContractsCount === 1 ? '' : 's'}
					{/if} -->
				{/if}
			</span>
		</InlineContainer>
		<!-- {#if quoteTotals.length && state !== State.Editing}
			<span class="account-total-value" transition:scale>
				<TokenBalance symbol={quoteCurrency} balance={quoteTotal} showPlainFiat={true} clip={false} />
			</span>
		{/if} -->

		{#if editable}
			<div class="stack-inline">
				<InlineContainer containerClass="align-end" isOpen={state !== State.Editing}>
					<div class="bar align-end" transition:scale>
						{#if state === State.Idle}
							<button class="add" on:click={() => state = State.Adding} transition:scale>+ Add Account</button>
						{/if}
						<InlineContainer containerClass="align-end" isOpen={accounts.length > 0}>
							<button on:click={() => state = State.Editing} transition:scale>Edit</button>
						</InlineContainer>
					</div>
				</InlineContainer>
				<InlineContainer containerClass="align-end" isOpen={state === State.Editing}>
					<div class="bar align-end" transition:scale>
						<button class="destructive" on:click={() => dispatch('delete')}>Delete Portfolio</button>
						<button on:click={() => state = State.Idle}>Done</button>
					</div>
				</InlineContainer>
			</div>

			<!-- <InlineContainer containerClass="align-end" class="stack align-end">
				{#if state !== State.Editing}
					<div class="bar align-end" transition:scale>
						{#if state === State.Idle}
							<button class="add" on:click={() => state = State.Adding} transition:scale>+ Add Account</button>
						{/if}
						<button on:click={() => state = State.Editing}>Edit</button>
					</div>
				{:else}
					<div class="bar align-end" transition:scale>
						<button class="destructive" on:click={() => dispatch('delete')}>Delete Portfolio</button>
						<button on:click={() => state = State.Idle}>Done</button>
					</div>
				{/if}
			</InlineContainer> -->
		{/if}
		<!-- <button on:click={toggleShowOptions}>Options</button> -->

		<slot name="actions"></slot>
	</header>

	{#if accounts}
		<SizeContainer containerClass="align-bottom" isOpen={state === State.Adding || !accounts.length} clip>
			<div class="stack">
				{#if state === State.Adding}
					<div class="card" in:scale|local={{ start: 0.5 }} out:scale>
						<div class="bar">
							<div>
								<h3>Add Ethereum/EVM Wallet</h3>
							</div>
							<small>{availableNetworks.map(network => network.name).join(', ')}</small>
						</div>
						<div class="bar">
							<form class="bar" on:submit|preventDefault={() => {addAccount(newWalletAddress); state = State.Idle; newWalletAddress = ''}}>
								<AddressInput
									bind:address={newWalletAddress}
									placeholder="Address (0xabcd...6789) / ENS Domain (vitalik.eth)"
									autofocus
									required
								/>
								<button class="medium add" disabled={!isValid(newWalletAddress)}>Add</button>
							</form>
							<button class="medium cancel" on:click={() => state = State.Idle}>Cancel</button>
						</div>
					</div>
				{:else if !accounts.length}
					<div class="card" in:scale|local={{ start: 0.5 }} out:scale>
						<h3>Your Blockhead Portfolio is empty!</h3>
						{#if editable}
							<p>You can <a on:click={() => state = State.Adding}>add a new wallet address manually</a>, or import an address by connecting a wallet service!</p>
						{/if}
					</div>
				{/if}
			</div>
		</SizeContainer>

		{#each accounts as {id, type, nickname, networks}, i (id)}
			<div transition:scale|local animate:flip|local={{duration: 300, delay: Math.abs(delayStartIndex - i) * 50}}>
				<PortfolioAccount
					addressOrEnsName={id}
					{type}
					bind:nickname
					bind:showNetworks={networks}

					{provider}
					{defiProvider}
					{tokenBalancesProvider}
					{nftProvider}
					{quoteCurrency}

					{tokenBalanceFormat}
					{sortBy}
					{showSmallValues}
					{showUnderlyingAssets}
					{showNFTMetadata}
					{showImagesOnly}
					{show3D}
					isEditing={state === State.Editing}

					bind:summary={accountsSummaries[id]}
				>
					{#if state === State.Editing}
						<div class="row edit-controls" transition:scale>
							<button class="destructive" on:click={() => deleteAccount(i)}>Delete Account</button>
						</div>
					{/if}
				</PortfolioAccount>
			</div>
		{/each}
	{:else}
		<slot name="loading">
			<Loading>Loading your accounts...</Loading>
		</slot>
	{/if}

	<SizeContainer containerClass="sticky-bottom" isOpen={showOptions && accounts.length && state !== State.Editing}>
		<div class="options card row spaced" transition:fly={{ y: 100 }}>
			<div class="row">
				<h3>Balances</h3>

				<label>
					<!-- <span>Show</span> -->
					<TokenBalanceFormatSelect
						bind:tokenBalanceFormat
						{quoteCurrency}
					/>
				</label>

				<label>
					<input type="checkbox" bind:checked={showSmallValues}>
					<span>Small Values</span>
				</label>

				<label>
					<span>Sort</span>
					<select bind:value={sortBy}>
						<option value="ticker-ascending">Alphabetical</option>
						<option value="value-descending">Highest Value</option>
						<option value="value-ascending">Lowest Value</option>
					</select>
				</label>
			</div>

			<div class="row">
				<h3>DeFi</h3>

				<label>
					<input type="checkbox" bind:checked={showUnderlyingAssets}>
					<span>Underlying Assets</span>
				</label>
			</div>

			<div class="row">
				<h3>NFTs</h3>

				<label>
					<input type="checkbox" bind:checked={showNFTMetadata}>
					<span>Metadata</span>
				</label>

				<label>
					<input type="checkbox" bind:checked={showImagesOnly}>
					<span>Collections</span>
				</label>

				<label>
					<input type="checkbox" bind:checked={show3D}>
					<span>3D</span>
				</label>
			</div>
		</div>
	</SizeContainer>
</section>