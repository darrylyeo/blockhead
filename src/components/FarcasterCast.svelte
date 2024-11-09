<script lang="ts">
	// Types/constants
	import type { FarcasterCast as _FarcasterCast } from '$/api/farcaster'
	import type { FarcasterProvider } from '$/data/farcasterProviders'
	import type { FarcasterFeedProvider } from '$/data/farcasterFeedProviders'

	import { ethereumMainnet, networkByChainId, networkBySlug } from '$/data/networks'


	// Context
	import { preferences } from '$/state/preferences'

	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork
	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider
	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency


	// Inputs
	export let farcasterProvider: FarcasterProvider
	export let farcasterFeedProvider: FarcasterFeedProvider
	export let cast: _FarcasterCast

	// (View options)
	export let layout: 'standalone' | 'in-feed' = 'in-feed'
	export let showReactionsAndReplies = false


	// Functions
	import { resolveRoute } from '$app/paths'


	// Components
	import AnchorLink from './AnchorLink.svelte'
	import Collapsible from './Collapsible.svelte'
	import Date from './Date.svelte'
	import Dialog from './Dialog.svelte'
	import EthereumAccountOrContract from './EthereumAccountOrContract.svelte'
	import EthereumTransaction from './EthereumTransaction.svelte'
	import EthereumTransactionLoader from './EthereumTransactionLoader.svelte'
	import FarcasterCastLoader from './FarcasterCastLoader.svelte'
	import FarcasterCastRepliesLoader from './FarcasterCastRepliesLoader.svelte'
	import FarcasterCast from './FarcasterCast.svelte'
	import FarcasterCasts from './FarcasterCasts.svelte'
	import FarcasterChannel from './FarcasterChannel.svelte'
	import FarcasterChannelLoader from './FarcasterChannelLoader.svelte'
	import FarcasterText from './FarcasterText.svelte'
	import FarcasterUser from './FarcasterUser.svelte'
	import FileDetails from './FileDetails.svelte'
	import UrlMetadata from './UrlMetadata.svelte'


	// Styles
	import { matchesMediaQuery } from '$/utils/matchesMediaQuery'
	const matchesLayoutBreakpoint = matchesMediaQuery('(max-width: 30rem)')
</script>


<Collapsible
	containerClass="farcaster-cast {layout === 'standalone' ? 'card' : ''}"
	class="column"
	showTriggerText={false}
	isOpen
	canToggle={false}
>
	<svelte:fragment slot="title">
		{#if cast.author}
			<FarcasterUser
				user={cast.author}
				{farcasterProvider}
			/>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		{#if layout === 'standalone'}
			<span class="card-annotation">
				Farcaster Cast
			</span>
		{:else if cast.channel}
			<small>
				<FarcasterChannelLoader
					viewOptions={{
						layout: 'passive',
					}}
					{farcasterProvider}
					query={
						'id' in cast.channel ?
							{
								channelId: cast.channel.id,
							}
						:
							{
								castParentUrl: cast.channel.url,
							}
					}
					let:channel
				>
					{#if channel}
						<FarcasterChannel
							{channel}
						/>
					{/if}
				</FarcasterChannelLoader>
			</small>
		{/if}
	</svelte:fragment>

	<div class="content-and-images bar align-top" class:wrap={$matchesLayoutBreakpoint}>
		{#if cast.text}
			<FarcasterText
				text={cast.text}
				urlEmbeds={cast.urlEmbeds}
				mentionedUsers={cast.mentionedUsers}
			/>
		{/if}

		{#if cast.imageEmbeds?.length || cast.videoEmbeds?.length}
			<div class="image-embeds row">
				{#each cast.imageEmbeds ?? [] as src}
					<Dialog>
						<img {src} />
					
						<svelte:fragment slot="content">
							<FileDetails
								{src}
								displayType="image"
								isOpen
							/>
						</svelte:fragment>
					</Dialog>
				{/each}

				{#each cast.videoEmbeds ?? [] as src}
					<Dialog>
						<video controls>
							<source {src} />
						</video>
					
						<svelte:fragment slot="content">
							<FileDetails
								{src}
								displayType="video"
								isOpen
							/>
						</svelte:fragment>
					</Dialog>
				{/each}
			</div>
		{/if}
	</div>

	{#if cast.evmAddressEmbeds?.length || cast.evmTransactionEmbeds?.length}
		<div class="column">
			{#each cast.evmAddressEmbeds ?? [] as evmAddressEmbed}
				{@const network = (
					evmAddressEmbed.chainId ?
						networkByChainId.get(evmAddressEmbed.chainId)
					: evmAddressEmbed.networkSlug ?
						networkBySlug.get(evmAddressEmbed.networkSlug)
					: undefined
				) || ethereumMainnet}

				<EthereumAccountOrContract
					{network}
					address={evmAddressEmbed.address}
					isOpen={false}
				>
					<svelte:fragment slot="title">
						{evmAddressEmbed.link}
					</svelte:fragment>
				</EthereumAccountOrContract>
			{/each}

			{#each cast.evmTransactionEmbeds ?? [] as evmTransactionEmbed}
				{@const network = (
					evmTransactionEmbed.chainId ?
						networkByChainId.get(evmTransactionEmbed.chainId)
					: evmTransactionEmbed.networkSlug ?
						networkBySlug.get(evmTransactionEmbed.networkSlug)
					: undefined
				) || ethereumMainnet}
	
				<EthereumTransactionLoader
					{network}
					{networkProvider}
					{transactionProvider}
					transactionId={evmTransactionEmbed.transactionId}
					let:transaction
				>
					{#if transaction}
						<EthereumTransaction
							{network}
							{transactionProvider}
							{transaction}
							{quoteCurrency}
			
							detailLevel="detailed"
							tokenBalanceFormat="original"
							showFees
			
							layout="collapsible"
							headingLevel={4}
							isOpen={false}
						/>
					{/if}
				</EthereumTransactionLoader>
			{/each}
		</div>
	{/if}

	{#if cast.castEmbeds?.length}
		{#each cast.castEmbeds as castEmbed}
			<FarcasterCastLoader
				{farcasterProvider}
				{farcasterFeedProvider}
				query={
					'castId' in castEmbed && castEmbed.castId ?
						{
							castId: castEmbed.castId,
						}
					: 'clientUrl' in castEmbed && castEmbed.clientUrl ?
						{
							clientUrl: castEmbed.clientUrl,
						}
					:
						undefined
				}
				let:cast
			>
				{#if cast}
					<AnchorLink
						base={`/apps/farcaster`}
						link={`/cast/${cast.id}`}
					>
						<FarcasterCast
							{cast}
							{farcasterProvider}
							{farcasterFeedProvider}
						/>
					</AnchorLink>
				{:else}
					Cast not found.
				{/if}
			</FarcasterCastLoader>
		{/each}
	{/if}

	{#if cast.urlEmbeds?.length}
		<div class="url-embeds column">
			{#each cast.urlEmbeds as url}
				<UrlMetadata
					{url}
				/>
			{/each}
		</div>
	{/if}

	<hr>

	<Collapsible
		type="label"
		isOpen={showReactionsAndReplies}
	>
		<svelte:fragment
			slot="header"
			let:isOpen
			let:toggle
		>
			<footer
				role="toolbar"
				class="row wrap"
			>
				<div class="column">
					<dl class="row">
						{#if cast.reactions}
							{#if cast.reactions.likes?.length || cast.reactions.likesCount}
								<div>
									<dt data-before="♥️">Likes</dt>
									<dd>{cast.reactions.likes?.length || cast.reactions.likesCount}</dd>
								</div>
							{/if}

							{#if cast.reactions.recasts?.length || cast.reactions.recastsCount}
								<div>
									<dt data-before="🔁">Recasts</dt>
									<dd>{cast.reactions.recasts?.length || cast.reactions.recastsCount}</dd>
								</div>
							{/if}
						{/if}

						{#if cast.replies?.length || cast.repliesCount}
							<div>
								<dt data-before="💬">Replies</dt>
								<dd>{cast.replies?.length || cast.repliesCount}</dd>
							</div>
						{/if}
					</dl>
				</div>

				<div class="row">
					<small class="footer-right row inline">
						<a
							class="faded"
							href={resolveRoute(`/apps/farcaster/cast/[farcasterCastId]`, { farcasterCastId: cast.id })}
						>
							<Date
								date={cast.timestamp}
								format="relative"
							/>
						</a>

						{#if layout === 'standalone' && cast.channel}
							<span class="faded">in</span>

							<FarcasterChannelLoader
								viewOptions={{
									layout: 'passive',
								}}
								{farcasterProvider}
								query={
									'id' in cast.channel ?
										{
											channelId: cast.channel.id,
										}
									:
										{
											castParentUrl: cast.channel.url,
										}
								}
								let:channel
							>
								{#if channel}
									<FarcasterChannel
										{channel}
									/>
								{/if}
							</FarcasterChannelLoader>
						{/if}
					</small>

					<button
						class="small"
						on:click|preventDefault={toggle}
						data-after={isOpen ? '⏶' : '⏷'}
					>
						{isOpen ? 'Hide' : 'Replies'}
					</button>
				</div>
			</footer>
		</svelte:fragment>

		{#if cast.replies}
			<FarcasterCasts
				casts={cast.replies}
				isReplies
				layout="embedded-replies"
				{farcasterProvider}
				{farcasterFeedProvider}
			/>
		{:else}
			<FarcasterCastRepliesLoader
				{farcasterProvider}
				query={{
					parentCastId: cast.id,
				}}
				let:casts
			>
				{#if casts}
					<FarcasterCasts
						{casts}
						isReplies
						layout="embedded-replies"
						{farcasterProvider}
						{farcasterFeedProvider}
					/>
				{/if}
			</FarcasterCastRepliesLoader>
		{/if}
	</Collapsible>
</Collapsible>


<style>
	.content-and-images > :global(:first-child:not(.image-embeds)) {
		min-width: min(14rem, 100%);
	}

	.image-embeds {
		justify-content: center;
		margin-inline-end: auto;
	}

	.image-embeds :is(img, video) {
		border-radius: 4px;
		object-fit: contain;
		max-width: 100%;
		height: 100%;
		max-height: 20rem;
	}

	.url-embeds {
		font-size: smaller;
	}

	dl {
		gap: 1.25rem;
		margin: 0;
	}
	dl > div {
		grid-template-columns: auto auto;
		gap: 0.75ch;
	}
	dl > div > dt {
		display: flex;
		gap: 0.75ch;
	}

	.faded {
		opacity: 0.6;
	}

	.footer-right {
		align-items: center;
	}
</style>
