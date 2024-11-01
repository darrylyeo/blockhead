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

	import type { Portfolio } from '$/state/portfolios.svelte'
	import { defaultAccountNetworks, getNetworkColor, networkByChainId } from '$/data/networks'

	import { preferences } from '$/state/preferences'


	// Props
	let {
		// Portfolio management
		portfolio = $bindable(),
		isEditable = true,

		// Balances view options
		networkProvider,
		defiProvider,
		tokenBalancesProvider,
		nftProvider,
		notificationsProvider,
		quoteCurrency,

		// Computed values
		summary,
	}: {
		// Portfolio management
		portfolio: Portfolio
		isEditable: boolean

		// Balances view options
		networkProvider: NetworkProvider
		defiProvider: DefiProvider
		tokenBalancesProvider: any
		nftProvider: any
		notificationsProvider: NotificationsProvider
		quoteCurrency: QuoteCurrency

		// Computed values
		summary?: {
			quoteTotal: number
			quoteTotalCurrency: QuoteCurrency
			balancesCount: number
			defiAppsCount: number
			nftContractsCount: number
			nftsCount: number
			hasMoreNfts: boolean
		}
	} = $props()


	// Portfolio management
	import { triggerEvent } from '$/events/triggerEvent'

	let currentState = $state(State.Idle)
	$effect(() => {
		if(isEditable && portfolio.name === '')
			currentState = State.Editing
	})

	let previousState = $state<State>()
	$effect(() => {
		triggerEvent('Portfolio/ChangeState', { fromState: previousState, toState: currentState })
		previousState = currentState
	})


	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	import { goto } from '$app/navigation'


	// Wallet management
	let newAccount = $state(
		{
			id: globalThis.location?.hash.slice(1) ?? '',
			chainIds: [1] as Ethereum.ChainId[],
		}
	)

	const addAccount = ({
		id,
		nickname,
		chainIds,
	}: {
		id: string,
		nickname: string,
		chainIds: Ethereum.ChainId[],
	}) => {
		const added = portfolio.addAccount({
			id: id as AccountId,
			nickname,
			chainIds,
		})

		triggerEvent('Portfolio/AddAccount', {
			accountChainIds: chainIds,
			newPortfolioAccountsCount: portfolio.accounts.length,
		})

		goto(`#${newAccount.id}`, { noScroll: added })
	}

	const deleteAccount = (i: number) => {
		delayStartIndex = i

		const deletedAccount = portfolio.deleteAccount(i)

		triggerEvent('Portfolio/DeleteAccount', {
			accountChainIds: deletedAccount.views.map(({ chainId }) => chainId),
			newPortfolioAccountsCount: portfolio.accounts.length,
		})
	}
	
	
	// Balances view options
	$effect(() => {
		defiProvider ??= $preferences.defiProvider
		tokenBalancesProvider ??= $preferences.tokenBalancesProvider
		nftProvider ??= $preferences.nftProvider
		quoteCurrency ??= $preferences.quoteCurrency
	})

	let tokenBalanceFormat = $state<'original' | 'converted' | 'both'>('both')
	let sortBy = $state<'value-descending' | 'value-ascending' | 'ticker-ascending'>('value-descending')
	let showSmallValues = $state(false)
	let showApps = $state(false)
	let showUnderlyingAssets = $state(false)
	let showDefiPositionMetadata = $state(false)
	let showNftMetadata = $state(false)
	let showCollections = $state(true)
	let collectionsSortBy = $state<'symbol-ascending' | 'floor-price-descending' | 'floor-price-ascending' | 'value-descending' | 'value-ascending'>('floor-price-descending')
	let show3D = $state(false)
	let showFloorPrices = $state(false)
	let showSmallNftFloorPrices = $state(false)
	let showFeed = $state(false)
	let feedLayout = $state<'byChannel' | 'chronological'>('byChannel')


	// Computed Values
	let accountsSummaries = $state<Record<AccountId, ComponentProps<PortfolioAccount>['summary']>>({})

	$effect(() => {
		summary = {
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
	})


	// Options menu
	let showOptions = $state(true)
	const toggleShowOptions = () => showOptions = !showOptions


	let delayStartIndex = $state(0)


	// Functions
	import { isTruthy } from '$/utils/isTruthy'


	// Actions
	import { getQueryClientContext } from '@tanstack/svelte-query'
	const queryClient = getQueryClientContext()

	let isRefetching = $state(false)

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
	onkeydown={e => { if(e.code === 'Escape') currentState = State.Idle }}
	ondragenter={e => { currentState = State.Adding }}
	transition:scale={{ duration: 300, start: 0.95 }}
	tabIndex={0}
>
	<header class="bar wrap">
		<slot name="title">
			<h1 class="row" ondblclick={() => { if(isEditable) currentState = State.Editing }}>
				{#if currentState !== State.Editing}
					{portfolio.name || '[Untitled Portfolio]'}
				{:else}
					<form onsubmit={() => { currentState = State.Idle }}>
						<input type="text" bind:value={portfolio.name} placeholder="My Portfolio" autofocus />
					</form>
				{/if}
			</h1>
		</slot>

		<InlineContainer isOpen={summary && currentState !== State.Editing}>
			<span class="summary" transition:scale>
				<span class="account-total-value">
					<TokenBalance
						format="fiat"
						token={{
							symbol: quoteCurrency,
						}}
						balance={summary?.quoteTotal}
					/>
				</span>

				<!-- {#if summary?.filteredBalancesCount}
					│
					<strong><TweenedNumber value={summary?.filteredBalancesCount} /></strong> token{summary?.balancesCount === 1 ? '' : 's'}
				{/if} -->

				<!-- {#if summary?.defiAppsCount}
					│
					<strong><TweenedNumber value={summary?.defiAppsCount} /></strong> app{summary?.defiAppsCount === 1 ? '' : 's'}
				{/if} -->

				{#if summary?.nftsCount}
					│
					<strong><TweenedNumber value={summary?.nftsCount} />{summary?.hasMoreNfts ? '+' : ''}</strong> NFT{summary?.nftsCount === 1 ? '' : 's'}

					<!-- {#if summary?.nftContractsCount}
						from <strong><TweenedNumber value={summary?.nftContractsCount} /></strong> collection{summary?.nftContractsCount === 1 ? '' : 's'}
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
				key={currentState !== State.Editing}
				clip={false}
			>
				<span class="row align-end wrap">
					{#if currentState !== State.Editing}
						<InlineContainer
							isOpen={currentState === State.Idle}
							alignInline="end"
							contentTransition={[scale]}
						>
							<button class="add" data-before="＋" onclick={() => { currentState = State.Adding }}>Add Account</button>
						</InlineContainer>

						<InlineContainer align="end">
							<button data-before="↻" onclick={refetchAllData} disabled={isRefetching}>{isRefetching ? 'Refreshing...' : 'Refresh'}</button>
						</InlineContainer>

						<InlineContainer align="end">
							<button data-before="✎" onclick={() => { currentState = State.Editing }}>Edit</button>
						</InlineContainer>
					{:else}
						<button class="destructive" data-before="☒" onclick={() => dispatch('delete')}>Delete Portfolio</button>
						<button data-before="✓" onclick={() => { currentState = State.Idle }}>Done</button>
					{/if}
				</span>
			</InlineTransition>
		{/if}
		<!-- <button onclick={toggleShowOptions}>Options</button> -->

		<slot name="actions"></slot>
	</header>

	{#if portfolio.accounts}
		<SizeContainer layout="block"
			renderOnlyWhenOpen={false}
			alignBlock="end"
			containerProps={{
				class: 'align-bottom',
			}}
			isOpen={currentState === State.Adding || !portfolio.accounts.length}
		>
			<div class="stack align-bottom">
				{#if currentState === State.Adding}
					<form
						class="card"
						name="add-account"
						onsubmit={e => {
							e.preventDefault()

							addAccount({
								id: newAccount.id,
								nickname: '',
								chainIds: [...newAccount.chainIds],
							})

							currentState = State.Idle
							newAccount.id = ''
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
											...(
												[...newAccount.chainIds]
													.filter(chainId => !defaultAccountNetworks.some(network => network.chainId === chainId))
													.map(chainId => networkByChainId.get(chainId)!)
											),
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
													bind:group={newAccount.chainIds}
													name="networks[]"
													value={network.chainId}
													required={!newAccount.chainIds.length}
												/>
												<span>{network.name}</span>
											</label>
										{/each}

										<NetworkSelect
											on:change={({ detail: { network, target }}) => {
												newAccount.chainIds = newAccount.chainIds.includes(network.chainId) ? newAccount.chainIds.filter(_ => _ !== network.chainId) : [...newAccount.chainIds, network.chainId]
												target.value = ''
											}}
											placeholder="Add Network..."
											showTestnets={false}
										/>
									</div>
								</InlineContainer>

								<!-- <input type="text" name="networks[]" bind:value={newAccount.networks} required hidden /> -->
							</div>
						</div>

						<div class="bar wrap">
							<AddressInput
								bind:address={newAccount.id}
								placeholder="EVM Address (0xabcd...6789) / ENS Domain (vitalik.eth) / Lens Handle (stani.lens)"
								autofocus
								required
							/>

							<button type="submit" class="medium add">Add</button>
							<button type="button" class="medium cancel" onclick={() => { currentState = State.Idle }}>Cancel</button>
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
							<p>You can <a onclick={() => { currentState = State.Adding }}>add a new wallet address manually</a>, or import an address by connecting a wallet service!</p>
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
					bind:account={portfolio.accounts[i]}

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

					isEditing={currentState === State.Editing}

					bind:summary={accountsSummaries[account.id]}
				>
					{#if currentState === State.Editing}
						<InlineContainer
							align="end"
							isOpen={currentState === State.Editing}
						>
							<div class="row edit-controls">
								<button class="destructive" data-before="☒" onclick={() => deleteAccount(i)}>Delete Account</button>
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
		isOpen={showOptions && portfolio.accounts.length && currentState !== State.Editing}
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
