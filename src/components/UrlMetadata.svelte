<script lang="ts">
	// Inputs
	export let url: string


	// Internal state
	// (Computed)
	$: urlHostname = new URL(url).hostname
	$: urlDomain = urlHostname.replace(/^www\./, '')
	$: knownEmbedType =
		url.match(new RegExp(`(?:${RegExp.escape(`https://x.com`)}|${RegExp.escape(`https://twitter.com`)})\/([a-zA-Z0-9_]+)\/status\/([0-9]+)`)) ? '𝕏 Post' :
		url.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/) ? 'YouTube Video' :
		undefined


	// Components
	import UrlMetadataLoader from './UrlMetadataLoader.svelte'
	import Collapsible from './Collapsible.svelte'


	// Functions
	const formatContent = (text: string) => (
		text
			.split('\n\n')
			.map((line, i) => (
				`<p>${line.replaceAll('\n', '<br />')}</p>`
			))
			.join('')
	)


	// Styles
	import { matchesMediaQuery } from '../utils/matchesMediaQuery'
	const matchesLayoutBreakpoint = matchesMediaQuery('(max-width: 30rem)')
</script>


<UrlMetadataLoader
	{url}
	let:urlMetadata
>
	{#if urlMetadata}
		<Collapsible
			containerClass="card"
			class="column"
			showTriggerText={false}
			isOpen
			canToggle={false}
		>
			<svelte:fragment slot="title">
				<a
					href={url}
					target="_blank"
					class="title row"
				>
					{#if urlMetadata.logo}
						<img
							src={urlMetadata.logo.url}
							width="24"
							height="24"
						/>
					{/if}

					<h4>
						{urlMetadata.title}
					</h4>
				</a>
			</svelte:fragment>

			<svelte:fragment slot="header-right">
				<a
					href={url}
					target="_blank"
					class="card-annotation"
				>
					<address
						class="row-inline"
						data-after="↗︎"
					>
						{#if (knownEmbedType || urlMetadata.publisher) && !urlDomain.toLowerCase().includes((knownEmbedType || urlMetadata.publisher).toLowerCase())}
							{knownEmbedType || urlMetadata.publisher} ({urlDomain})
						{:else}
							{urlDomain}
						{/if}
						<!-- {#if knownEmbedType}
							{knownEmbedType}
						{:else if urlMetadata.publisher && !urlDomain.toLowerCase().includes(urlMetadata.publisher.toLowerCase())}
							{urlMetadata.publisher} ({urlDomain})
						{:else}
							{urlDomain}
						{/if} -->
					</address>
				</a>
			</svelte:fragment>

			{#if urlMetadata.description || urlMetadata.image}
				<div class="content-and-images bar align-top" class:wrap={$matchesLayoutBreakpoint}>
					{#if urlMetadata.description}
						<div class="content column">
							{@html formatContent(urlMetadata.description)}
						</div>
					{/if}

					{#if urlMetadata.image}
						<div class="image-embeds row">
							<img
								src={urlMetadata.image.url}
								style={`
									aspect-ratio: ${urlMetadata.image.width} / ${urlMetadata.image.height};
								`}
								alt={urlMetadata.alt}
							/>
						</div>
					{/if}
				</div>
			{/if}
		</Collapsible>
	{/if}
</UrlMetadataLoader>


<style>
	.title {
		gap: 1ch;
	}

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
		max-height: 8rem;
	}
</style>
