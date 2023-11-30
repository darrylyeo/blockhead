<script lang="ts">
	// Types/constants
	import type { FarcasterProvider } from '../data/farcasterProviders'
	import type { FarcasterCastId, FarcasterUserId } from '../api/farcaster'
	import type { Cast, CastWithInteractions, EmbedCastId, EmbedUrl, EmbeddedCast } from '../api/neynar/v2'

	import type { Ethereum } from '../data/networks/types'
	import { networksBySlug } from '../data/networks'


	// Inputs
	export let farcasterProvider: FarcasterProvider
	export let cast: Cast | CastWithInteractions


	// Internal state
	let embeds: Map<'image' | 'url' | 'cast' | undefined, EmbeddedCast[]>
	// (Computed)
	$: embeds = cast.embeds.groupToMap((embed) => (
		'url' in embed ?
			embed.url.match(/\.(png|jpe?g|gif)$/i) ?
				'image'
			:
				'url'
		: 'cast_id' in embed ?
			'cast'
		:
			undefined
	))

	const extractCastEmbeds = (text: string) => (
		[
			new RegExp(`https://warpcast.com/(?<userId>.*)/(?<castIdShort>0x[0-9a-f]{8})`, 'gi'),
		].flatMap(regex => (
			Array.from(
				text.matchAll(regex),
				match => match?.groups && ({
					clientUrl: match[0],
					userId: Number(match.groups.userId) as FarcasterUserId | undefined,
					castId: match.groups.castId as FarcasterCastId | undefined,
					castIdShort: match.groups.castIdShort as `0x${string}` | undefined,
				})
			)
				.filter(isTruthy)
		))
	)

	let castEmbeds: {
		clientUrl?: string,
		userId?: FarcasterUserId,
		castId?: FarcasterCastId
	}[]
	$: castEmbeds = [
		...((embeds.get('cast') ?? []) as EmbedCastId[])
			.map(embed => embed.cast_id)
			.map(castId => ({
				userId: castId.fid,
				castId: castId.hash as FarcasterCastId,
			})),
		...extractCastEmbeds(cast.text)
	]

	$: imageEmbeds = ((embeds.get('image') ?? []) as EmbedUrl[]).map(embed => embed.url)
	$: urlEmbeds = ((embeds.get('url') ?? []) as EmbedUrl[]).map(embed => embed.url)

	$: evmAddressEmbeds = [
		// /(?<networkSlug>[a-z]+:)?(?<address>(?:0x)?[0-9a-f]{40})/gi,
		new RegExp(`${RegExp.escape(`https://mint.fun`)}/(?<networkSlug>[a-z]+)/(?<address>(?:0x)?[0-9a-f]{40})`, 'gi'),
		new RegExp(`${RegExp.escape(`https://zora.co/collect`)}/(?<networkSlug>[a-z]+)/(?<address>(?:0x)?[0-9a-f]{40})/(?<tokenId>[0-9]+)`, 'gi'),
		new RegExp(`${RegExp.escape(`https://titles.xyz/collect`)}/(?<networkSlug>[a-z]+)/(?<address>(?:0x)?[0-9a-f]{40})`, 'gi'),
	].flatMap(regex => (
		Array.from(
			cast.text.matchAll(regex),
			match => match?.groups && ({
				link: match[0],
				networkSlug: match.groups.networkSlug as string | undefined,
				address: match.groups.address as Ethereum.Address,
				tokenId: Number(match.groups.tokenId) as number | undefined,
			})
		)
			.filter(isTruthy)
	))


	// Functions
	import { parseUrl } from '../utils/parseUrl'
	import { resolvePath } from '@sveltejs/kit'
	import { isTruthy } from '../utils/isTruthy'

	const formatUrls = (text: string) => (
		urlEmbeds
			.map(parseUrl)
			.reduce((text, url) => (
				url
					? text
						.replaceAll(
							new RegExp(`(?:${RegExp.escape(url.protocol)}//)?(?:${RegExp.escape(url.host)})(?:${RegExp.escape(url.pathname)})${url.pathname === '/' ? '?' : ''}(?:${RegExp.escape(url.search)})?(?:${RegExp.escape(url.hash)})?`, 'gi'),
							match => `<a href="${url}">${match}</a>`
						)
					: text
			), text)
		// text.replaceAll(`${url.host}${url.pathname === '/' ? '' : url.pathname}`, match => `<a href="${url}">${match}</a>`)
	)

	const formatProfiles = (text: string) => (
		// text.replaceAll(/@([a-z0-9_]+)/gi, (match, farcasterUserName) => `<a href="${resolvePath(`/apps/farcaster/account/[farcasterUserName]`, { farcasterUserName })}">${match}</a>`)
		('mentioned_profiles' in cast ? cast.mentioned_profiles : [])
			.reduce((text, user) => (
				user.username ?
					text.replaceAll(`@${user.username}`, match => `<a href="${resolvePath(`/apps/farcaster/account/[farcasterUserName]`, { farcasterUserName: user.username })}">${match}</a>`)
				:
					text
			), text)
	)

	const formatContent = (text: string) => (
		text
			.split('\n\n')
			.map((line, i) => (
				`<p>${
					formatUrls(
						formatProfiles(
							line.replaceAll('\n', '<br />')
						)
					)
				}</p>`
			))
			.join('')
	)


	// Components
	import Collapsible from './Collapsible.svelte'
	import Date from './Date.svelte'
	import EthereumAccountOrContract from './EthereumAccountOrContract.svelte'
	import FarcasterCastLoader from './FarcasterCastLoader.svelte'
	import FarcasterCast from './FarcasterCast.svelte'
	import FarcasterChannel from './FarcasterChannel.svelte'
	
	
	// Styles
	import { matchesMediaQuery } from '../utils/matchesMediaQuery'
	const matchesLayoutBreakpoint = matchesMediaQuery('(max-width: 30rem)')
</script>


<Collapsible
	containerClass="farcaster-cast card"
	class="column"
	showTriggerText={false}
	isOpen
>
	<svelte:fragment slot="title">
		<div class="cast-author row">
			{#if cast.author.pfp_url}
				<img
					class="avatar"
					src={cast.author.pfp_url}
					width="24"
					height="24"
				/>
			{/if}

			<span>
				<a
					href={
						cast.author.username
							? resolvePath(`/apps/farcaster/account/[farcasterUserName]`, { farcasterUserName: cast.author.username })
							: resolvePath(`/apps/farcaster/account/[farcasterUserId]`, { farcasterUserId: String(cast.author.fid) })
					}
				>
					<address>
						<span>{cast.author.display_name}</span>
						<small class="faded">
							{#if cast.author.username}
								@{cast.author.username}
							{:else if cast.author.fid}
								#{cast.author.fid}
							{/if}
						</small>
					</address>
				</a>

				{#if cast.author.active_status}
					<span class="active" title="Active">✔</span>
				{/if}
			</span>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		{#if cast.parent_url}
			<FarcasterChannel
				{farcasterProvider}
				channelUrl={cast.parent_url}
			/>
		{:else}
			<span class="card-annotation">
				Farcaster Cast
			</span>
		{/if}
	</svelte:fragment>

	<div class="content-and-images bar align-top" class:wrap={$matchesLayoutBreakpoint}>
		{#if cast.text}
			<div class="content column">
				{@html formatContent(cast.text)}
			</div>
		{/if}

		{#if imageEmbeds?.length}
			<div class="image-embeds row">
				{#each imageEmbeds as src}
					<img {src} />
				{/each}
			</div>
		{/if}
	</div>

	{#if evmAddressEmbeds?.length}
		<div class="column">
			{#each evmAddressEmbeds as evmAddressEmbed}
				<EthereumAccountOrContract
					network={evmAddressEmbed.networkSlug && networksBySlug[evmAddressEmbed.networkSlug] || networksBySlug['ethereum']}
					address={evmAddressEmbed.address}
					isOpen={false}
				>
					<svelte:fragment slot="title">
						{evmAddressEmbed.link}
					</svelte:fragment>
				</EthereumAccountOrContract>
			{/each}
		</div>
	{/if}

	{#if castEmbeds?.length}
		{#each castEmbeds as { clientUrl, userId, castId }}
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

	<hr>

	<footer
		role="toolbar"
		class="row spaced wrap"
	>
		<dl class="row">
			{#if 'reactions' in cast}
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

			{#if 'replies' in cast}
				<div>
					<dt data-before="💬">Replies</dt>
					<dd>{cast.replies.count}</dd>
				</div>
			{/if}
		</dl>

		<a href={resolvePath(`/apps/farcaster/cast/[farcasterCastId]`, { farcasterCastId: cast.hash })}>
			<small class="faded">
				<Date
					date={cast.timestamp}
					layout="horizontal"
					format="relative"
				/>
			</small>
		</a>
	</footer>
</Collapsible>


<style>
	.cast-author {
		gap: 1ch;
	}

	.avatar {
		border-radius: 4px;
		object-fit: cover;
	}

	address {
		font-size: 1.05em;
		font-style: normal;
		font-weight: bold;
		display: inline;
	}

	:global(.farcaster-cast .content a) {
		/* color: var(--primary-color); */
		font-weight: bold;
	}

	.content {
		min-width: min(12rem, 100%);
	}

	.image-embeds {
		justify-content: center;
		margin-inline-end: auto;
		/* min-width: max-content; */
		flex-shrink: 0;
	}

	.image-embeds img {
		border-radius: 4px;
		object-fit: cover;
	}

	dl {
		gap: 1.25rem;
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
