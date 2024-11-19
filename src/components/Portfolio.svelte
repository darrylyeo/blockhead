<script context="module" lang="ts">
	export enum State {
		Idle = 'idle',
		Editing = 'editing',
		Adding = 'adding'
	}
</script>


<script lang="ts">
	import type { ComponentProps } from 'svelte'
	import type { AccountId } from '$/data/accountId'
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import type { DefiProvider } from '$/data/defiProviders'
	import type { NotificationsProvider } from '$/data/notificationsProvider'
	import { type QuoteCurrency, quoteCurrencies } from '$/data/currencies'

	import type { Portfolio } from '$/state/portfolio-accounts'
	import { defaultAccountNetworks, getNetworkColor, networkByChainId } from '$/data/networks'

	import { preferences } from '$/state/preferences'


	// Portfolio management

	export let portfolio: Portfolio

	export let isEditable = true


	import { triggerEvent } from '$/events/triggerEvent'


	let state = State.Idle
	$: if(isEditable && portfolio.name === '')
		state = State.Editing

	let previousState: State
	$: {
		triggerEvent('Portfolio/ChangeState', { fromState: previousState, toState: state })
		previousState = state
	}


	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	import { goto } from '$app/navigation'


	// Wallet management

	let newAccountId = globalThis.location?.hash.slice(1) ?? ''
	let newNetworks = [networkByChainId.get(1 as Ethereum.ChainId)] as Ethereum.Network[]

	const addAccount = ({
		id,
		nickname,
		networks,
	}: {
		id: string,
		nickname: string,
		networks: Ethereum.Network[],
	}) => {
		const added = portfolio.addAccount({
			id: id as AccountId,
			nickname,
			networks,
		})

		portfolio = portfolio

		triggerEvent('Portfolio/AddAccount', {
			accountChainIds: networks.map(({ chainId }) => chainId),
			newPortfolioAccountsCount: portfolio.accounts.length,
		})

		goto(`#${newAccountId}`, { noScroll: added })
	}

	const deleteAccount = (i: number) => {
		delayStartIndex = i

		const deletedAccount = portfolio.deleteAccount(i)

		portfolio = portfolio

		triggerEvent('Portfolio/DeleteAccount', {
			accountChainIds: deletedAccount.views.map(({ chainId }) => chainId),
			newPortfolioAccountsCount: portfolio.accounts.length,
		})
	}
	
	
	// Balances view options
	
	export let networkProvider: NetworkProvider
	export let defiProvider: DefiProvider
	export let tokenBalancesProvider
	export let nftProvider
	export let notificationsProvider: NotificationsProvider
	export let quoteCurrency: QuoteCurrency

	$: defiProvider = $$props.defiProvider || $preferences.defiProvider
	$: tokenBalancesProvider = $$props.tokenBalancesProvider || $preferences.tokenBalancesProvider
	$: nftProvider = $$props.nftProvider || $preferences.nftProvider
	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency

	let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'both'
	let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending' = 'value-descending'
	let showSmallValues = false
	let showApps = false
	let showUnderlyingAssets = false
	let showDefiPositionMetadata = false
	let showNftMetadata = false
	let showCollections = true
	let collectionsSortBy: 'symbol-ascending' | 'floor-price-descending' | 'floor-price-ascending' | 'value-descending' | 'value-ascending' = 'floor-price-descending'
	let show3D = false
	let showFloorPrices = false
	let showSmallNftFloorPrices = false
	let showFeed = false
	let feedLayout: 'byChannel' | 'chronological' = 'byChannel'


	// Computed Values
	let accountsSummaries: Record<AccountId, ComponentProps<PortfolioAccount>['summary']> = {}

	export let summary: {
		quoteTotal: number,
		quoteTotalCurrency: QuoteCurrency,
		balancesCount: number,
		defiAppsCount: number,
		nftContractsCount: number,
		nftsCount: number,
		hasMoreNfts: boolean,
	} | undefined

	$: summary = {
		quoteTotal:
			portfolio.accounts
				.map(account => accountsSummaries[account.id]?.quoteTotal)
				.filter(isTruthy)
				.reduce((sum, item) => sum + item, 0),

		quoteTotalCurrency: quoteCurrency,

		balancesCount:
			portfolio.accounts
				.map(account => accountsSummaries[account.id]?.balancesCount)
				.filter(isTruthy)
				.reduce((sum, item) => sum + item, 0),

		defiAppsCount:
			portfolio.accounts
				.map(account => accountsSummaries[account.id]?.defiAppsCount)
				.filter(isTruthy)
				.reduce((sum, item) => sum + item, 0),

		nftContractsCount:
			portfolio.accounts
				.map(account => accountsSummaries[account.id]?.nftContractsCount)
				.filter(isTruthy)
				.reduce((sum, item) => sum + item, 0),

		nftsCount:
			portfolio.accounts
				.map(account => accountsSummaries[account.id]?.nftsCount)
				.filter(isTruthy)
				.reduce((sum, item) => sum + item, 0),

		hasMoreNfts:
			portfolio.accounts
				.some(account => accountsSummaries[account.id]?.hasMoreNfts)
	}


	// Options menu
	let showOptions = true
	const toggleShowOptions = () => showOptions = !showOptions


	let delayStartIndex = 0


	// Functions
	import { isTruthy } from '$/utils/isTruthy'


	// Actions
	import { getQueryClientContext } from '@tanstack/svelte-query'
	const queryClient = getQueryClientContext()

	let isRefetching = false

	const refetchAllData = async () => {
		isRefetching = true

		await Promise.all([
			['Balances'],
			['DefiBalances'],
			['NFTs'],
		].map(queryKey => (
			queryClient.invalidateQueries({ queryKey })
		)))

		isRefetching = false
	}


	import AddressInput from './AddressInput.svelte'
	import Loading from './Loading.svelte'
	import InlineContainer from './InlineContainer.svelte'
	import InlineTransition from './InlineTransition.svelte'
	import NetworkSelect from './NetworkSelect.svelte'
	import SizeContainer from './SizeContainer.svelte'
	import PortfolioAccount from './PortfolioAccount.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TokenBalanceFormatSelect from './TokenBalanceFormatSelect.svelte'
	import TweenedNumber from './TweenedNumber.svelte'


	import { flip } from 'svelte/animate'
	import { blur, fade, fly, scale } from 'svelte/transition'
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

		backdrop-filter: var(--overlay-backdrop-filter);
	}

	.account-total-value {
		font-size: 1.21em;
	}

	header {
		z-index: 1;
	}

	.portfolio h1 {
		flex: 1 16rem;
	}


	form[name="add-account"] :global(select) {
		max-width: 7.5rem;
		position: relative;
	}
</style>


<section
	class="portfolio column-block"
	on:keydown={e => { if(e.code === 'Escape') state = State.Idle }}
	on:dragenter={e => state = State.Adding}
	transition:scale={{ duration: 300, start: 0.95 }}
	tabIndex={0}
>
	<header class="bar wrap">
		<slot name="title">
			<h1 class="row" on:dblclick={isEditable && (() => state = State.Editing)}>
				{#if state !== State.Editing}
					{portfolio.name || '[Untitled Portfolio]'}
				{:else}
					<form on:submit={() => state = State.Idle}>
						<input type="text" bind:value={portfolio.name} placeholder="My Portfolio" autofocus />
					</form>
				{/if}
			</h1>
		</slot>

		<InlineContainer isOpen={summary && state !== State.Editing}>
			<span class="summary" transition:scale>
				<span class="account-total-value">
					<TokenBalance
						format="fiat"
						token={{
							symbol: quoteCurrency,
						}}
						balance={summary.quoteTotal}
					/>
				</span>

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
					<strong><TweenedNumber value={summary.nftsCount} />{summary.hasMoreNfts ? '+' : ''}</strong> NFT{summary.nftsCount === 1 ? '' : 's'}

					<!-- {#if summary.nftContractsCount}
						from <strong><TweenedNumber value={summary.nftContractsCount} /></strong> collection{summary.nftContractsCount === 1 ? '' : 's'}
					{/if} -->
				{/if}
			</span>
		</InlineContainer>
		<!-- {#if quoteTotals.length && state !== State.Editing}
			<span class="account-total-value" transition:scale>
				<TokenBalance
					format="fiat"
					token={{
						symbol: quoteCurrency,
					}}
					balance={quoteTotal}
					clip={false}
				/>
			</span>
		{/if} -->

		{#if isEditable}
			<InlineTransition
				align="end"
				key={state !== State.Editing}
				clip={false}
			>
				<span class="row align-end wrap">
					{#if state !== State.Editing}
						<InlineContainer
							isOpen={state === State.Idle}
							alignInline="end"
							contentTransition={[scale]}
						>
							<button class="add" data-before="＋" on:click={() => state = State.Adding}>Add Account</button>
						</InlineContainer>

						<InlineContainer align="end">
							<button data-before="↻" on:click={refetchAllData} disabled={isRefetching}>{isRefetching ? 'Refreshing...' : 'Refresh'}</button>
						</InlineContainer>

						<InlineContainer align="end">
							<button data-before="✎" on:click={() => state = State.Editing}>Edit</button>
						</InlineContainer>
					{:else}
						<button class="destructive" data-before="☒" on:click={() => dispatch('delete')}>Delete Portfolio</button>
						<button data-before="✓" on:click={() => state = State.Idle}>Done</button>
					{/if}
				</span>
			</InlineTransition>
		{/if}
		<!-- <button on:click={toggleShowOptions}>Options</button> -->

		<slot name="actions"></slot>
	</header>

	{#if portfolio.accounts}
		<SizeContainer layout="block"
			renderOnlyWhenOpen={false}
			alignBlock="end"
			containerProps={{
				class: 'align-bottom',
			}}
			isOpen={state === State.Adding || !portfolio.accounts.length}
		>
			<div class="stack align-bottom">
				{#if state === State.Adding}
					<form
						class="card"
						name="add-account"
						on:submit|preventDefault={() => {
							addAccount({
								id: newAccountId,
								nickname: '',
								networks: [...newNetworks],
							})

							state = State.Idle
							newAccountId = ''
						}}
						in:fly={{ duration: 200, opacity: 0, y: -20 }}
						out:scale={{ start: 0.95, duration: 150, opacity: 0 }}
					>
					<!-- in:blur={{ duration: 200, opacity: 0, amount: 20 }} -->
					<!-- in:scale={{ start: 0.95, duration: 300, opacity: 0 }} -->
						<div class="bar wrap">
							<div>
								<h3>Add Account</h3>
							</div>

							<!-- <small>{availableNetworks.map(network => network.name).join(', ')}</small> -->

							<div role="toolbar" class="row wrap align-end">
								Networks:

								<InlineContainer alignInline="end">
									<div class="row wrap align-start">
										{#each [
											...defaultAccountNetworks,
											...newNetworks.filter(network => !defaultAccountNetworks.includes(network))
										] as network, i (network)}
											<label
												class="align-start"
												title={`${network.name}\nChain ID: ${network.chainId}`}
												style="--primary-color: {getNetworkColor(network)}"
												transition:scale={{ duration: 300 }}
												animate:flip|local={{ duration: 300 }}
											>
												<input
													type="checkbox"
													bind:group={newNetworks}
													name="networks[]"
													value={network}
													required={!newNetworks.length}
												/>
												<span>{network.name}</span>
											</label>
										{/each}

										<NetworkSelect
											on:change={({ detail: { network, target }}) => {
												newNetworks = newNetworks.includes(network) ? newNetworks.filter(_ => _ !== network) : [...newNetworks, network]
												target.value = ''
											}}
											placeholder="Add Network..."
											showTestnets={false}
										/>
									</div>
								</InlineContainer>

								<!-- <input type="text" name="networks[]" bind:value={newNetworks} required hidden /> -->
							</div>
						</div>

						<div class="bar wrap">
							<AddressInput
								bind:address={newAccountId}
								placeholder="EVM Address (0xabcd...6789) / ENS Domain (vitalik.eth) / Lens Handle (stani.lens)"
								autofocus
								required
							/>

							<button type="submit" class="medium add">Add</button>
							<button type="button" class="medium cancel" on:click={() => state = State.Idle}>Cancel</button>
						</div>
					</form>
				{:else if !portfolio.accounts.length}
					<div
						class="card"
						in:scale={{ start: 0.95, duration: 300, opacity: 0 }}
						out:scale={{ start: 0.95, duration: 150, opacity: 0 }}
					>
						<h3>Your Blockhead Portfolio is empty!</h3>
						{#if isEditable}
							<p>You can <a on:click={() => state = State.Adding}>add a new wallet address manually</a>, or import an address by connecting a wallet service!</p>
						{/if}
					</div>
				{/if}
			</div>
		</SizeContainer>

		{#each portfolio.accounts as account, i (account.id)}
			<div
				transition:scale={{ start: 0.8, duration: 300 }}
				animate:flip|local={{ duration: 300, delay: Math.abs(delayStartIndex - i) * 50 }}
			>
				<PortfolioAccount
					bind:account

					{networkProvider}
					{defiProvider}
					{tokenBalancesProvider}
					{nftProvider}
					{notificationsProvider}
					{quoteCurrency}

					{tokenBalanceFormat}
					{sortBy}
					{showSmallValues}
					{showApps}
					{showUnderlyingAssets}
					{showDefiPositionMetadata}
					{showNftMetadata}
					showImagesOnly={!showCollections}
					{collectionsSortBy}
					{showFloorPrices}
					{showSmallNftFloorPrices}
					{show3D}
					{showFeed}
					{feedLayout}

					isEditing={state === State.Editing}

					bind:summary={accountsSummaries[account.id]}
				>
					{#if state === State.Editing}
						<InlineContainer
							align="end"
							isOpen={state === State.Editing}
						>
							<div class="row edit-controls">
								<button class="destructive" data-before="☒" on:click={() => deleteAccount(i)}>Delete Account</button>
							</div>
						</InlineContainer>
					{/if}
				</PortfolioAccount>
			</div>
		{/each}
	{:else}
		<slot name="loading">
			<Loading>Loading your accounts...</Loading>
		</slot>
	{/if}

	<SizeContainer layout="block"
		isOpen={showOptions && portfolio.accounts.length && state !== State.Editing}
		containerProps={{
			class: 'sticky-bottom',
		}}
	>
		<div role="toolbar" class="options card row wrap" transition:fly|global={{ y: 100 }}>
			<div class="row wrap">
				<h3>Balances</h3>

				<!-- <label>
					<!-- <span>Show</span> -- >
					<TokenBalanceFormatSelect
						bind:tokenBalanceFormat
						{quoteCurrency}
					/>
				</label> -->
				<TokenBalanceFormatSelect
					type="checkboxes"
					bind:tokenBalanceFormat
					{quoteCurrency}
				/>

				<label>
					<input type="checkbox" bind:checked={showSmallValues}>
					<!-- <span>Small Values</span> -->
					<span>Small</span>
				</label>

				<label>
					<span>Sort</span>
					<select bind:value={sortBy}>
						<!-- <option value="ticker-ascending">Alphabetical</option>
						<option value="value-descending">Highest Value</option>
						<option value="value-ascending">Lowest Value</option> -->
						<option value="ticker-ascending">A–Z</option>
						<option value="value-descending">Highest</option>
						<option value="value-ascending">Lowest</option>
					</select>
				</label>
			</div>

			<div class="row wrap">
				<h3>DeFi</h3>

				<label>
					<input type="checkbox" bind:checked={showApps}>
					<span>Apps</span>
				</label>

				<label>
					<input type="checkbox" bind:checked={showUnderlyingAssets}>
					<!-- <span>Underlying Assets</span> -->
					<span>Underlying</span>
				</label>

				<label>
					<input type="checkbox" bind:checked={showDefiPositionMetadata}>
					<span>Metadata</span>
				</label>
			</div>

			<div class="row wrap">
				<h3>NFTs</h3>

				<div class="row">
					<label>
						<input type="checkbox" bind:checked={showCollections}>
						<span>Collections</span>
					</label>

					<InlineContainer isOpen={showCollections} clip>
						<label>
							<span>Sort</span>
							<select bind:value={collectionsSortBy}>
								<option value="symbol-ascending">A–Z</option>
								<option value="floor-price-descending">Highest Floor</option>
								<option value="floor-price-ascending">Lowest Floor</option>
								<option value="value-descending">Highest Value</option>
								<option value="value-ascending">Lowest Value</option>
							</select>
						</label>
					</InlineContainer>
				</div>

				<label>
					<input type="checkbox" bind:checked={showNftMetadata}>
					<span>Metadata</span>
				</label>

				<label>
					<input type="checkbox" bind:checked={show3D}>
					<span>3D</span>
				</label>

				<div class="row">
					<label>
						<input type="checkbox" bind:checked={showFloorPrices}>
						<span>Floor ({quoteCurrencies[quoteCurrency]?.symbol})</span>
					</label>

					<InlineContainer isOpen={showFloorPrices} clip>
						<label>
							<input type="checkbox" bind:checked={showSmallNftFloorPrices}>
							<span>Small</span>
						</label>
					</InlineContainer>
				</div>
			</div>

			<div class="row wrap">
				<h3>Feed</h3>

				<label>
					<input type="checkbox" bind:checked={showFeed}>
					<span>Show</span>
				</label>

				<InlineContainer isOpen={showFeed} clip>
					<label transition:fade={{duration: 300}}>
						<!-- <span>View</span> -->
						<select bind:value={feedLayout}>
							<option value="byChannel">By Channel</option>
							<option value="chronological">Chronological</option>
						</select>
					</label>
				</InlineContainer>
			</div>
		</div>
	</SizeContainer>
</section>
