<script lang="ts">
	// Types/constants
	import type { FarcasterProvider } from '../data/farcasterProviders'
	import type { FarcasterCast as _FarcasterCast } from '../api/farcaster'

	// Inputs
	export let text: string
	export let urlEmbeds: _FarcasterCast['urlEmbeds']
	export let mentionedUsers: _FarcasterCast['mentionedUsers']


	// Functions
	import { parseUrl } from '../utils/parseUrl'
	import { resolvePath } from '@sveltejs/kit'

	const formatUrls = (text: string) => (
		(urlEmbeds ?? [])
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

	const formatUserMentions = (text: string) => (
		mentionedUsers?.length
			? mentionedUsers
				.reduce((text, user) => (
					user.name ?
						text.replaceAll(`@${user.name}`, match => `<a href="${resolvePath(`/apps/farcaster/account/[farcasterUserName]`, { farcasterUserName: user.name })}">${match}</a>`)
					:
						text
				), text)
			: text
				.replaceAll(
					/(?<!\w)@([a-z0-9]+(?:[-][a-z0-9]+)*(?:[.](?:eth|xyz|luxe|kred|art|club))?)(?=\W|$)/g,
					(match, farcasterUserName) => `<a href="${resolvePath(`/apps/farcaster/account/[farcasterUserName]`, { farcasterUserName })}">${match}</a>`
				)
	)

	const formatChannelMentions = (text: string) => (
		text
			.replaceAll(
				/(?<=^|\s)[/](?<farcasterChannelSlug>[a-z0-9]+(?:[-][a-z0-9]+)*)(?=\W|$)/g, (match,
				farcasterChannelSlug) => `<a href="${resolvePath(`/apps/farcaster/channel/[farcasterChannelSlug]`, { farcasterChannelSlug })}">${match}</a>`
			)
	)

	const formatContent = (text: string) => (
		text
			.split('\n\n')
			.map((line, i) => (
				`<p>${
					formatUrls(
						formatUserMentions(
							formatChannelMentions(
								line.replaceAll('\n', '<br />')
							)
						)
					)
				}</p>`
			))
			.join('')
	)
</script>


<div class="content column">
	{@html formatContent(text)}
</div>


<style>
	.content :global(a) {
		/* color: var(--primary-color); */
		font-weight: bold;
	}
</style>
