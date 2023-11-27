<script lang="ts">
	// Types/constants
	import type { Cast, CastWithInteractions, EmbedUrl, EmbeddedCast } from '../api/neynar/v2'
	

	// Inputs
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
	$: imageEmbeds = ((embeds.get('image') ?? []) as EmbedUrl[]).map(embed => embed.url)
	$: urlEmbeds = ((embeds.get('url') ?? []) as EmbedUrl[]).map(embed => embed.url)


	// Functions
	import { parseUrl } from '../utils/parseUrl'
	import { resolvePath } from '@sveltejs/kit'

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
				text
					.replaceAll(`@${user.username}`, match => `<a href="${resolvePath(`/apps/farcaster/account/[farcasterUserName]`, { farcasterUserName: user.username })}">${match}</a>`)
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
</script>


<Collapsible
	containerClass="farcaster-cast card"
	class="column"
	showTriggerText={false}
	isOpen
>
	<svelte:fragment slot="title">
		<div class="cast-author row">
			<img src={cast.author.pfp_url} width="24" height="24" />

			<span>
				<address>
					<span>{cast.author.display_name}</span>
					<small>@{cast.author.username}</small>
				</address>

				{#if cast.author.active_status}
					<span class="active" title="Active">✔</span>
				{/if}
			</span>
		</div>
	</svelte:fragment>

	{#if cast.text}
		<div class="content column">
			{@html formatContent(cast.text)}
		</div>
	{/if}

	{#if imageEmbeds?.length}
		<div class="row">
			{#each imageEmbeds as src}
				<img {src} height="200" />
			{/each}
		</div>
	{/if}

	<footer role="toolbar">
		<dl class="row">
			{#if 'reactions' in cast}
				{#if cast.reactions.likes?.length}
					<div>
						<dt>Likes</dt>
						<dd>{cast.reactions.likes.length}</dd>
					</div>
				{/if}

				{#if cast.reactions.recasts?.length}
					<div>
						<dt>Recasts</dt>
						<dd>{cast.reactions.recasts.length}</dd>
					</div>
				{/if}
			{/if}

			{#if 'replies' in cast}
				<div>
					<dt>Replies</dt>
					<dd>{cast.replies.count}</dd>
				</div>
			{/if}
		</dl>
	</footer>
</Collapsible>


<style>
	.cast-author {
		gap: 1ch;
	}

	address {
		font-size: 1.05em;
		font-style: normal;
		font-weight: bold;
		display: inline;
	}

	:global(.farcaster-cast a) {
		/* color: var(--primary-color); */
		font-weight: bold;
	}

	img {
		border-radius: 4px;
		object-fit: cover;
	}
</style>
