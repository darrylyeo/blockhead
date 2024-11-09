<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { FarcasterUser } from '$/api/farcaster'
	import type { MoxieOrder } from '$/api/moxie/auction/normalize'


	// Inputs
	export let network: Ethereum.Network
	export let order: MoxieOrder

	// (View options)
	export let layout: 'standalone' | 'inline' = 'inline'
	export let isOpen = layout === 'standalone'
	export let headingLevel = 4
	export let showFormattedNames = true
	export let showFormattedTokenSymbols = true

	// (Derived)
	let auctioningToken = order.auction.auctioningToken

	$: biddingToken = order.auction.biddingToken


	// Functions
	import { resolveRoute } from '$app/paths'


	// Internal state
	let subject: MoxieSubjectLoader['$$prop_def']['subject']

	// (Computed)
	$: link = resolveRoute('/apps/moxie/network/[networkSlug]/order/[orderId]', {
		networkSlug: network.slug,
		orderId: order.id,
	})


	// Components
	import Address from '$/components/Address.svelte'
	import Collapsible from '$/components/Collapsible.svelte'
	import DateComponent from '$/components/Date.svelte'
	import EthereumTransaction from '$/components/EthereumTransaction.svelte'
	import EthereumTransactionLoader from '$/components/EthereumTransactionLoader.svelte'
	import TokenBalance from '$/components/TokenBalance.svelte'
	import TokenRate from '$/components/TokenRate.svelte'
	import TransactionId from '$/components/TransactionId.svelte'
	import MoxieAuctionLoader from './MoxieAuctionLoader.svelte'
	import MoxieAuction from './MoxieAuction.svelte'
	import MoxieSubjectLoader from './MoxieSubjectLoader.svelte'
</script>


{#if order.auction.auctioningToken}
	<MoxieSubjectLoader
		{network}
		token={order.auction.auctioningToken}
		bind:subjectToken={auctioningToken}
		bind:subject
	/>
{/if}

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
			<svelte:element this={`h${headingLevel}`}>
				<a href={link}>
					<strong>
						<Address
							{network}
							address={order.userWalletAddress}
							resolveToEnsName
							format="middle-truncated"
						/>
					</strong>

					<span>
						<TransactionId
							{network}
							transactionId={order.finalTxHash ?? order.txHash}
						>
							{order.status.toLowerCase()}
						</TransactionId>
					</span>

					order

					<!-- bid
					<TokenBalance
						balance={order.volume}
						token={biddingToken}
					/> -->

					<span>
						{#if order.buyAmount > 0n}
							to

							<span>
								buy

								<TokenBalance
									balance={order.buyAmount}
									token={auctioningToken}
									showName={showFormattedTokenSymbols}
									showDecimalPlaces={1}
									compactLargeValues={false}
								/>
							</span>
						{:else}
							to

							<span>
								sell

								<TokenBalance
									balance={order.sellAmount}
									token={auctioningToken}
									showName={showFormattedTokenSymbols}
								/>
							</span>
						{/if}

						at
						<span>
							<TokenRate
								rate={order.price}
								quoteToken={biddingToken}
								baseToken={auctioningToken}
								layout="horizontal"
								fractionLayout="horizontal"
								showName={showFormattedTokenSymbols}
							/>
						</span>
					</span>
				</a>
			</svelte:element>
		</svelte:fragment>

		<svelte:fragment slot="header-right">
			<span class="card-annotation">
				Moxie Order
			</span>
		</svelte:fragment>

		<hr>

		<dl>
			<div>
				<dt>Bidder</dt>
				<dd>
					{#if order.userWalletAddress}
						<Address
							{network}
							address={order.userWalletAddress}
							resolveToEnsName
						/>
					{/if}
				</dd>
			</div>

			<div>
				<dt>Status</dt>
				<dd>
					{order.status}
				</dd>
			</div>

			<div>
				<dt>Price</dt>
				<dd>
					<TokenRate
						rate={order.price}
						baseToken={biddingToken}
						quoteToken={auctioningToken}
						layout="horizontal"
						fractionLayout="horizontal"
						showName={showFormattedTokenSymbols}
					/>
				</dd>
			</div>

			<div>
				<dt>Volume</dt>
				<dd>
					<TokenBalance
						balance={order.volume}
						token={biddingToken}
						showName={showFormattedTokenSymbols}
					/>
				</dd>
			</div>

			<div>
				<dt>Encoded Order ID</dt>
				<dd>
					<output>{order.encodedOrderId}</output>
				</dd>
			</div>

			<div>
				<dt>Last Updated Index</dt>
				<dd>
					{order.lastUpdatedIndex}
				</dd>
			</div>

			<div>
				<dt>Is Exact Order?</dt>
				<dd>{order.isExactOrder ? 'Yes' : 'No'}</dd>
			</div>

			{#if order.finalizedBuyAmount}
				<div>
					<dt>Finalized Buy Amount</dt>
					<dd>
						<TokenBalance
							balance={order.finalizedBuyAmount}
							token={auctioningToken}
							showName={showFormattedTokenSymbols}
						/>
					</dd>
				</div>
			{/if}

			{#if order.finalizedSellAmount}
				<div>
					<dt>Finalized Sell Amount</dt>
					<dd>
						<TokenBalance
							balance={order.finalizedSellAmount}
							token={auctioningToken}
							showName={showFormattedTokenSymbols}
						/>
					</dd>
				</div>
			{/if}

			{#if order.refundAmount}
				<div>
					<dt>Refund Amount</dt>
					<dd>
						<TokenBalance
							balance={order.refundAmount}
							token={biddingToken}
							showName={showFormattedTokenSymbols}
						/>
					</dd>
				</div>
			{/if}
		</dl>

		<hr>

		<section>
			<Collapsible
				type="label"
				class="column"
				showTriggerText={false}
				isOpen
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
				>
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 2}`}>
							Order Placed
						</svelte:element>
					</svelte:fragment>

					<svelte:fragment slot="header-right">
						<span class="date">
							<DateComponent
								date={order.timestamp}
								layout="horizontal"
							/>
						</span>
					</svelte:fragment>

					{#if order.txHash}
						<div class="card">
							<EthereumTransactionLoader
								{network}
								transactionId={order.txHash}
								let:transaction
								let:transactionProvider
							>
								{#if transaction}
									<EthereumTransaction
										{network}
										{transactionProvider}
										{transaction}
										quoteCurrency="USD"
										contextualAddress={order.userWalletAddress}
									/>
								{/if}
							</EthereumTransactionLoader>
						</div>
					{/if}
				</Collapsible>

				{#if order.finalTxHash}
					<Collapsible
						type="label"
						containerClass="card"
						class="column"
						showTriggerText={false}
					>
						<svelte:fragment slot="title">
							<svelte:element this={`h${headingLevel + 2}`}>
								Order Finalized
							</svelte:element>
						</svelte:fragment>

						<!-- <svelte:fragment slot="header-right">
							<span class="date">
								<DateComponent
									date={order.timestamp}
									layout="horizontal"
								/>
							</span>
						</svelte:fragment> -->

						<div class="card">
							<EthereumTransactionLoader
								{network}
								transactionId={order.finalTxHash}
								let:transaction
								let:transactionProvider
							>
								{#if transaction}
									<EthereumTransaction
										{network}
										{transactionProvider}
										{transaction}
										quoteCurrency="USD"
										contextualAddress={order.userWalletAddress}
									/>
								{/if}
							</EthereumTransactionLoader>
						</div>
					</Collapsible>
				{/if}
			</Collapsible>
		</section>

		<hr>

		<section>
			<Collapsible
				type="label"
				class="column"
			>
				<svelte:fragment slot="title">
					<svelte:element this={`h${headingLevel + 1}`}>
						Auction
					</svelte:element>
				</svelte:fragment>

				<MoxieAuctionLoader
					viewOptions={{
						contentClass: 'card',
					}}
					{network}
					auctionId={order.auctionId}
					let:auction
				>
					{#if auction}
						<MoxieAuction
							{network}
							{auction}
							{showFormattedNames}
							{showFormattedTokenSymbols}
						/>
					{/if}
				</MoxieAuctionLoader>
			</Collapsible>
		</section>

		<hr>
	</Collapsible>

	<footer>
		<span class="date">
			<DateComponent
				date={order.timestamp}
				layout="horizontal"
			/>
		</span>
	</footer>
</article>


<style>
	.date {
		font-size: 0.75em;
		opacity: 0.8;
	}
</style>
