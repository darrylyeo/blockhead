<script lang="ts">
	// Types/constants
	import type { FarcasterProvider } from '$/data/farcasterProviders'
	import type { FarcasterCast as _FarcasterCast } from '$/api/farcaster'

	import { networksByChainID, networksBySlug } from '$/data/networks'


	// Inputs
	export let farcasterProvider: FarcasterProvider
	export let cast: _FarcasterCast

	// (View options)
	export let layout: 'standalone' | 'in-feed' = 'in-feed'
	export let showReactionsAndReplies = false


	// Functions
	import { resolveRoute } from '$app/paths'


	// Components
	import Collapsible from './Collapsible.svelte'
	import Date from './Date.svelte'
	import EthereumAccountOrContract from './EthereumAccountOrContract.svelte'
	import EthereumTransaction from './EthereumTransaction.svelte'
	import EthereumTransactionLoader from './EthereumTransactionLoader.svelte'
	import FarcasterCastLoader from './FarcasterCastLoader.svelte'
	import FarcasterCast from './FarcasterCast.svelte'
	import FarcasterCasts from './FarcasterCasts.svelte'
	import FarcasterChannel from './FarcasterChannel.svelte'
	import FarcasterText from './FarcasterText.svelte'
	import FarcasterUser from './FarcasterUser.svelte'
	import UrlMetadata from './UrlMetadata.svelte'


	// Styles
	import { matchesMediaQuery } from '$/utils/matchesMediaQuery'
	const matchesLayoutBreakpoint = matchesMediaQuery('(max-width: 30rem)')
</script>


<Collapsible
	containerClass="farcaster-cast card"
	class="column"
	showTriggerText={false}
	isOpen
	canToggle={false}
>
	<svelte:fragment slot="title">
		<FarcasterUser
			user={cast.author}
		/>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		{#if layout === 'standalone'}
			<span class="card-annotation">
				Farcaster Cast
			</span>
		{:else if cast.parentUrl}
			<small>
				<FarcasterChannel
					{farcasterProvider}
					channelUrl={cast.parentUrl}
				/>
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

		{#if cast.imageEmbeds?.length}
			<div class="image-embeds row">
				{#each cast.imageEmbeds as src}
					<img {src} />
				{/each}
			</div>
		{/if}
	</div>

	{#if cast.evmAddressEmbeds?.length || cast.evmTransactionEmbeds?.length}
		<div class="column">
			{#each cast.evmAddressEmbeds ?? [] as evmAddressEmbed}
				{@const network = (
					evmAddressEmbed.chainId ?
						networksByChainID[evmAddressEmbed.chainId]
					: evmAddressEmbed.networkSlug ?
						networksBySlug[evmAddressEmbed.networkSlug]
					: undefined
				) || networksBySlug['ethereum']}

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
						networksByChainID[evmTransactionEmbed.chainId]
					: evmTransactionEmbed.networkSlug ?
						networksBySlug[evmTransactionEmbed.networkSlug]
					: undefined
				) || networksBySlug['ethereum']}
	
				<EthereumTransactionLoader
					{network}
					transactionId={evmTransactionEmbed.transactionId}
					let:transaction
				>
					{#if transaction}
						<EthereumTransaction
							layout="standalone"
							{network}
							{transaction}
						/>
					{/if}
				</EthereumTransactionLoader>
			{/each}
		</div>
	{/if}

	{#if cast.castEmbeds?.length}
		{#each cast.castEmbeds as { clientUrl, userId, castId }}
			<FarcasterCastLoader
				{farcasterProvider}
				{clientUrl}
				{userId}
				{castId}
				let:cast
			>
				{#if cast}
					<FarcasterCast
						{cast}
						{farcasterProvider}
					/>
				{:else}
					Cast not found.
				{/if}
			</FarcasterCastLoader>
		{/each}
	{/if}

	{#if cast.urlEmbeds?.length}
		{#each cast.urlEmbeds as url}
			<UrlMetadata
				{url}
			/>
		{/each}
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
				class="row spaced wrap"
			>
				<div class="column">
					<dl class="row">
						{#if cast.reactions}
							{#if cast.reactions.likes?.length}
								<div>
									<dt data-before="♥️">Likes</dt>
									<dd>{cast.reactions.likes.length}</dd>
								</div>
							{/if}

							{#if cast.reactions.recasts?.length}
								<div>
									<dt data-before="🔁">Recasts</dt>
									<dd>{cast.reactions.recasts.length}</dd>
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
					<small class="row-inline">
						<a
							class="faded"
							href={resolveRoute(`/apps/farcaster/cast/[farcasterCastId]`, { farcasterCastId: cast.id })}
						>
							<Date
								date={cast.timestamp}
								layout="horizontal"
								format="relative"
							/>
						</a>

						{#if layout === 'standalone'}
							<span class="faded">in</span>

							<FarcasterChannel
								{farcasterProvider}
								channelUrl={cast.parentUrl}
							/>
						{/if}
					</small>

					<button
						class="small"
						on:click={toggle}
						data-after={isOpen ? '⏶' : '⏷'}
					>
						{isOpen ? 'Hide' : 'Show'}
					</button>
				</div>
			</footer>
		</svelte:fragment>

		{#if cast.replies?.length}
			<FarcasterCasts
				casts={cast.replies}
				layout="embedded-replies"
			/>
		{:else if cast.repliesCount}
			<FarcasterCastLoader
				{farcasterProvider}
				castId={cast.id}
				withReplies
				let:cast={castWithReplies}
			>
				{#if castWithReplies?.replies}
					<FarcasterCasts
						casts={castWithReplies.replies}
						layout="embedded-replies"
					/>
				{/if}
			</FarcasterCastLoader>
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

	.image-embeds img {
		border-radius: 4px;
		object-fit: contain;
		max-width: 100%;
		height: 100%;
		max-height: 20rem;
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
</style>
