<script lang="ts">
	export let title: string
	export let description: string
	export let url: string
	export let image: {
		url: string,
		alt?: string,
	}
	export let twitterHandle = '0xBlockhead'
	export let creatorTwitterHandle = '@darryl__yeo'

	export let isArticle = false
	export let author: string
	export let readingTime: number
</script>


<svelte:head>
	{#if description}
		<meta name="description" content={description} />
	{/if}

	{#if title}
		<meta name="twitter:title" content={title} />
	{/if}

	{#if description}
		<meta name="twitter:description" content={description} />
	{/if}

	{#if url}
		<meta name="twitter:url" content={url} />
	{/if}

	{#if image}
		<meta name="twitter:card" content="summary_large_image" />

		{#if image.url}
			<meta name="twitter:image" content={image.url} />
		{/if}

		{#if image.alt}
			<meta name="twitter:image:alt" content={image.alt} />
		{/if}
	{/if}

	{#if twitterHandle}
		<meta name="twitter:site" content={`@${twitterHandle}`} />
	{/if}

	{#if creatorTwitterHandle}
		<meta name="twitter:creator" content={`@${creatorTwitterHandle}`} />
	{/if}

	{#if isArticle}
		{#if author}
			<meta name="twitter:label1" content="Written by" />
			<meta name="twitter:data1" content={author} />
		{/if}

		{#if readingTime > 0}
			<meta name="twitter:label2" content="Est. reading time" />
			<meta name="twitter:data2" content={`${readingTime} minute${readingTime === 1 ? '' : 's'}` } />
		{/if}
	{/if}

	<!-- All OpenGraph tags -->
	<meta name="og:type" content={isArticle ? 'article' : 'website'} />
</svelte:head>
