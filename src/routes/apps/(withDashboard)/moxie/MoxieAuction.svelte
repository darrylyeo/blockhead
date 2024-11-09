<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { MoxieSubjectToken, MoxieProvider } from '$/api/moxie/index'
	import type { MoxieAuction } from '$/api/moxie/auction/normalize'
	
	// Inputs
	export let network: Ethereum.Network
	export let auction: MoxieAuction

	export let moxieProvider: MoxieProvider

	// (View options)
	export let layout: 'standalone' | 'inline' = 'inline'
	export let isOpen = layout === 'standalone'
	export let headingLevel = 4
	export let showFormattedNames = true
	export let showFormattedTokenSymbols = true


	// Functions
	import { resolveRoute } from '$app/paths'


	// Internal state
	let auctioningToken: MoxieSubjectToken = auction.auctioningToken

	// (Computed)
	$: link = resolveRoute('/apps/moxie/network/[networkSlug]/auction/[auctionId]', {
		networkSlug: network.slug,
		auctionId: auction.id,
	})


	// Components
	import Address from '$/components/Address.svelte'
	import Collapsible from '$/components/Collapsible.svelte'
	import DateComponent from '$/components/Date.svelte'
	import EthereumTransaction from '$/components/EthereumTransaction.svelte'
	import EthereumTransactionLoader from '$/components/EthereumTransactionLoader.svelte'
	import FarcasterChannelComponent from '$/components/FarcasterChannel.svelte'
	import FarcasterUserProfile from '$/components/FarcasterUserProfile.svelte'
	import MoxieOrder from './MoxieOrder.svelte'
	import MoxieOrders from './MoxieOrders.svelte'
	import MoxieOrderLoader from './MoxieOrderLoader.svelte'
	import MoxieOrdersLoader from './MoxieOrdersLoader.svelte'
	import MoxieSubject from './MoxieSubject.svelte'
	import MoxieSubjectLoader from './MoxieSubjectLoader.svelte'
	import TokenBalance from '$/components/TokenBalance.svelte'
	import TokenRate from '$/components/TokenRate.svelte'
	import TransactionId from '$/components/TransactionId.svelte'
	import TweenedNumber from '$/components/TweenedNumber.svelte'
</script>


<article
	class="column"
	class:card={layout === 'standalone'}
>
	<Collapsible
		type="label"
		class="column"
		showTriggerText={false}
		isOpen={layout === 'standalone'}
	>
		<svelte:fragment slot="title">
			<svelte:element this={`h${headingLevel}`} class="row with-float">
				<a
					href={link}
				>
					Auction for

					<MoxieSubjectLoader
						token={auction.auctioningToken}
						bind:subjectToken={auctioningToken}
						let:subjectToken
						let:subject
					>
						<strong><MoxieSubject
							{subject}
							{subjectToken}
							{showFormattedTokenSymbols}
						/></strong>{
						#if subject.network
							}{subject.network.name.endsWith('s') ? '’' : '’s'} network{
						:else if subject.farcasterUser
							}{subject.farcasterUser?.name?.endsWith('s') ? '’' : '’s'}{
						:else if subject.farcasterChannel
							}{subject.farcasterChannel?.name?.endsWith('s') ? '’' : '’s'} channel{
						:else
							}{subjectToken.name?.endsWith('s') ? '’' : '’s'}{
						/if}

						<Address
							{network}
							address={subjectToken.address}
						>
							fan token
						</Address>
					</MoxieSubjectLoader>
				</a>
			</svelte:element>
		</svelte:fragment>

		<svelte:fragment slot="header-right">
			<span class="card-annotation">
				Moxie Auction
			</span>
		</svelte:fragment>

		<hr>

		<section>
			<Collapsible
				type="label"
				class="card column"
				isOpen
			>
				<svelte:fragment slot="title">
					<svelte:element this={`h${headingLevel + 1}`}>
						Summary
					</svelte:element>
				</svelte:fragment>

				<p class="row wrap">
					<span>
						<strong>
							<TokenBalance
								balance={auction.auctionSupply}
								token={auctioningToken}
								showName={showFormattedTokenSymbols}
							/>
						</strong>

						tokens
					</span>

					<span>
						{#if auction.isCleared}
							distributed to
						{:else}
							will be distributed to
						{/if}

						<strong>
							<TweenedNumber
								value={auction.uniqueBidders}
							/>

							bidder{auction.uniqueBidders === 1n ? '' : 's'}
						</strong>
					</span>

					<span>
						across

						<strong>
							<TweenedNumber
								value={auction.activeOrderCount}
							/>

							order{auction.activeOrderCount === 1n ? '' : 's'}
						</strong>
					</span>

					<span>
						at clearing price

						<strong>
							<TokenRate
								rate={auction.currentClearingPrice}
								quoteToken={auction.biddingToken}
								baseToken={auctioningToken}
								layout="horizontal"
								fractionLayout="horizontal"
								showName={showFormattedTokenSymbols}
							/>
						</strong>
					</span>

					<span>
						for a total volume of

						<strong>
							<TokenBalance
								balance={auction.currentVolume}
								token={auction.biddingToken}
								showName={showFormattedTokenSymbols}
							/>
						</strong>
					</span>
					
					<span>
						<DateComponent
							date={auction.auctionEndDate}
							format="both"
						/>
					</span>
				</p>
			</Collapsible>
		</section>

		<MoxieSubjectLoader
			token={auctioningToken}
			let:subject
		>
			{#if subject}
				<hr>

				<section>
					{#if subject.farcasterUser}
						<Collapsible
							type="label"
							class="column"
							isOpen
						>
							<svelte:fragment slot="title">
								<svelte:element this={`h${headingLevel + 1}`}>
									Subject
								</svelte:element>
							</svelte:fragment>

							<FarcasterUserProfile
								user={subject.farcasterUser}
								headingLevel={headingLevel + 1}
							/>
						</Collapsible>

					{:else if subject.farcasterChannel}
						<Collapsible
							type="label"
							class="column"
							isOpen
						>
							<svelte:fragment slot="title">
								<svelte:element this={`h${headingLevel + 1}`}>
									Farcaster Channel
								</svelte:element>
							</svelte:fragment>

							<FarcasterChannelComponent
								channel={subject.farcasterChannel}
								headingLevel={headingLevel + 1}
							/>
						</Collapsible>
					{/if}
				</section>
			{/if}
		</MoxieSubjectLoader>

		<hr>

		<section>
			<Collapsible
				type="label"
				class="card column"
				isOpen
			>
				<svelte:fragment slot="title">
					<svelte:element this={`h${headingLevel + 1}`}>
						Configuration
					</svelte:element>
				</svelte:fragment>

				<dl>
					<div>
						<dt>Auction ID</dt>
						<dd>
							{auction.id}
						</dd>
					</div>

					<div>
						<dt>Auction Supply</dt>
						<dd>
							<TokenBalance
								balance={auction.auctionSupply}
								token={auctioningToken}
								showName={showFormattedTokenSymbols}
							/>
						</dd>
					</div>

					<div>
						<dt>Minimum Bidding Amount</dt>
						<dd>
							<TokenBalance
								balance={auction.minimumBiddingAmountPerOrder}
								token={auction.biddingToken}
								showName={showFormattedTokenSymbols}
							/>
							/ order
						</dd>
					</div>

					<div>
						<dt>Minimum Funding Threshold</dt>
						<dd>
							<TokenBalance
								balance={auction.minFundingThreshold}
								token={auction.biddingToken}
								showName={showFormattedTokenSymbols}
							/>
						</dd>
					</div>

					<div>
						<dt>Minimum Buy Amount</dt>
						<dd>
							<TokenBalance
								balance={auction.minBuyAmount}
								token={auctioningToken}
								showName={showFormattedTokenSymbols}
							/>
						</dd>
					</div>

					<div>
						<dt>Allowlist Manager</dt>
						<dd>
							<Address
								{network}
								address={auction.allowListManager}
							/>
						</dd>
					</div>

					<div>
						<dt>Allowlist Signer</dt>
						<dd>
							{#if auction.allowListSigner !== '0x00'}
								<output>
									{auction.allowListSigner}
								</output>
							{:else}
								<span class="not-set" />
							{/if}
						</dd>
					</div>

					<div>
						<dt>Is Atomic Closure Allowed?</dt>
						<dd>
							{auction.isAtomicClosureAllowed ? 'Yes' : 'No'}
						</dd>
					</div>

					<div>
						<dt>Minimum Price</dt>
						<dd>
							<TokenRate
								rate={auction.minimumPriceInMoxie}
								quoteToken={auction.biddingToken}
								baseToken={auctioningToken}
								layout="horizontal"
								fractionLayout="horizontal"
								showName={showFormattedTokenSymbols}
							/>
						</dd>
					</div>

					<div>
						<dt>Is Private?</dt>
						<dd>
							{auction.isPrivateAuction ? 'Yes' : 'No'}
						</dd>
					</div>
				</dl>
			</Collapsible>
		</section>

		<hr>

		<section>
			<Collapsible
				type="label"
				class="card column"
				isOpen
			>
				<svelte:fragment slot="title">
					<svelte:element this={`h${headingLevel + 1}`}>
						Status
					</svelte:element>
				</svelte:fragment>

				<dl>
					<div>
						<dt>Is Cleared?</dt>
						<dd>
							{auction.isCleared ? 'Yes' : 'No'}
						</dd>
					</div>

					<div>
						<dt>Volume</dt>
						<dd>
							<TokenBalance
								balance={auction.currentVolume}
								token={auction.biddingToken}
								showName={showFormattedTokenSymbols}
							/>
						</dd>
					</div>

					<div>
						<dt>Clearing Price</dt>
						<dd>
							<TokenRate
								rate={auction.currentClearingPrice}
								quoteToken={auction.biddingToken}
								baseToken={auctioningToken}
								layout="horizontal"
								fractionLayout="horizontal"
								showName={showFormattedTokenSymbols}
							/>
						</dd>
					</div>

					<div>
						<dt>Unique Bidders</dt>
						<dd>
							<TweenedNumber value={auction.uniqueBidders} />
						</dd>
					</div>

					<div>
						<dt>Active Orders</dt>
						<dd>
							<TweenedNumber value={auction.activeOrderCount} />
						</dd>
					</div>

					<div>
						<dt>Total Orders</dt>
						<dd>
							<TweenedNumber value={auction.totalOrders} />
						</dd>
					</div>

					<div>
						<dt>Current Bidding Amount</dt>
						<dd>
							<TokenBalance
								balance={auction.currentBiddingAmount}
								token={auction.biddingToken}
								showName={showFormattedTokenSymbols}
							/>
						</dd>
					</div>

					<div>
						<dt>Current Subject Token Bid Amount</dt>
						<dd>
							<TokenBalance
								balance={auction.currentSubjectTokenBidAmount}
								token={auctioningToken}
								showName={showFormattedTokenSymbols}
							/>
						</dd>
					</div>

					<div>
						<dt>Interest Score</dt>
						<dd>
							<TweenedNumber
								value={auction.interestScore}
								format={{
									showDecimalPlaces: 20,
									notation: 'scientific',
								}}
							/>
						</dd>
					</div>

					<div>
						<dt>Transaction Hash</dt>
						<dd>
							<TransactionId
								{network}
								transactionId={auction.txHash}
							/>
						</dd>
					</div>
				</dl>
			</Collapsible>
		</section>

		<hr>

		<section>
			<MoxieOrdersLoader
				{network}
				{moxieProvider}
				query={{
					auctionId: auction.id,
				}}
				viewOptions={{
					isOpen: false,
				}}
				let:orders
				let:pagination
			>
				{#if orders}
					<MoxieOrders
						{network}
						{orders}
						{moxieProvider}
						{pagination}
					/>
				{/if}
			</MoxieOrdersLoader>
		</section>

		{#if auction.highestPriceBidOrder}
			<hr>

			<section>
				<Collapsible type="label" class="column">
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 1}`}>
							Highest Price Bid
						</svelte:element>
					</svelte:fragment>

					<div class="card">
						<MoxieOrder
							{network}
							order={auction.highestPriceBidOrder}
							auctioningToken={auction.auctioningToken}
							biddingToken={auction.biddingToken}
						/>
					</div>
				</Collapsible>
			</section>
		{/if}

		{#if auction.lowestPriceBidOrder}
			<hr>

			<section>
				<Collapsible type="label" class="column">
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 1}`}>
							Lowest Price Bid
						</svelte:element>
					</svelte:fragment>

					<div class="card">
						<MoxieOrder
							{network}
							order={auction.lowestPriceBidOrder}
							auctioningToken={auction.auctioningToken}
							biddingToken={auction.biddingToken}
						/>
					</div>
				</Collapsible>
			</section>
		{/if}

		{#if auction.currentClearingOrderId}
			<hr>

			<section>
				<Collapsible type="label" class="column">
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 1}`}>
							Clearing Order
						</svelte:element>
					</svelte:fragment>

					<div class="card">
						<MoxieOrderLoader
							{network}
							orderId={auction.currentClearingOrderId}
							let:order
						>
							<MoxieOrder
								{network}
								{order}
								auctioningToken={auction.auctioningToken}
								biddingToken={auction.biddingToken}
							/>
						</MoxieOrderLoader>
					</div>
				</Collapsible>
			</section>
		{/if}

		<hr>

		<section>
			<Collapsible
				type="label"
				class="column"
				isOpen={layout === 'standalone'}
			>
				<svelte:fragment slot="title">
					<svelte:element this={`h${headingLevel + 1}`}>
						Timeline
					</svelte:element>
				</svelte:fragment>

				<Collapsible
					type="label"
					containerClass="card"
					class="column"
					showTriggerText={false}
					isOpen
				>
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 2}`}>
							Auction Start
						</svelte:element>
					</svelte:fragment>

					<svelte:fragment slot="header-right">
						<span class="date">
							<DateComponent
								date={auction.startingTimeStamp}
							/>
						</span>
					</svelte:fragment>

					<div class="card">
						<EthereumTransactionLoader
							{network}
							transactionId={auction.txHash}
							let:transaction
							let:transactionProvider
						>
							<EthereumTransaction
								{transactionProvider}
								{transaction}
							/>
						</EthereumTransactionLoader>
					</div>
				</Collapsible>

				<Collapsible
					type="label"
					containerClass="card"
					class="column"
					showTriggerText={false}
					isOpen
					canToggle={false}
				>
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 2}`}>
							Auction End
						</svelte:element>
					</svelte:fragment>

					<svelte:fragment slot="header-right">
						<span class="date">
							<DateComponent
								date={auction.auctionEndDate}
							/>
						</span>
					</svelte:fragment>
				</Collapsible>

				<Collapsible
					type="label"
					containerClass="card"
					class="column"
					showTriggerText={false}
					isOpen
					canToggle={false}
				>
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 2}`}>
							Order Cancellation End
						</svelte:element>
					</svelte:fragment>

					<svelte:fragment slot="header-right">
						<span class="date">
							<DateComponent
								date={auction.orderCancellationEndDate}
							/>
						</span>
					</svelte:fragment>
				</Collapsible>
			</Collapsible>
		</section>

		<hr>
	</Collapsible>

	<footer>
		<span class="date">
			from
			<DateComponent
				date={auction.startingTimeStamp}
				format="absolute"
			/>
			to
			<DateComponent
				date={auction.auctionEndDate}
				format="absolute"
			/>
		</span>
	</footer>
</article>


<style>
	.date {
		font-size: 0.75em;
		opacity: 0.8;
	}

	dl {
		/* grid-template-columns: minmax(auto, 1fr) minmax(max-content, 1fr); */
	}

	.not-set:after {
		content: '—';
		opacity: 0.3;
	}
</style>
