<script lang="ts">
	// External state
	export let src: string | undefined
	export let fileName: string | undefined
    export let extension: string | undefined
    export let contentType: string | undefined = 'text/plain'
	export let text: string | undefined
	export let blob: Blob | undefined

	// (Computed)
	$: if(!fileName && src) fileName = src.match(/[^/]+$/)![0]
	$: if(!blob && (text ?? src)) blob = new Blob([text ?? src], { type: contentType })
	$: [mediaType, params] = contentType?.split(/;\s*/) ?? []
	$: blobUrl = blob && URL.createObjectURL(blob)
	$: dataUrl = text && `data:${contentType};base64,${btoa(text)}`

	$: displaySrc = src ?? blobUrl ?? dataUrl
	$: displayType =
		!contentType || contentType.startsWith('text/plain') ? 'text'
		: contentType.startsWith('text/html') ? 'iframe'
		: contentType.startsWith('text/') ? 'text'
		// : contentType.startsWith('image/svg') || text?.includes('<svg') ? 'image'
		: contentType.startsWith('image/') ? 'image'
		: contentType.startsWith('video/') ? 'video'
		: contentType.startsWith('audio/') ? 'audio'
		: contentType.startsWith('application/json') ? 'json'
		: contentType.startsWith('application/xml') ? 'xml'
		: contentType.startsWith('application/pdf') ? 'pdf'
		: 'iframe' // 'unsupported'
</script>


{#if text}
	<article class="card">
		<header class="bar wrap">
			<h4>
				{#if displaySrc}
					<a href={displaySrc} target="_blank">{fileName}</a>
				{:else}
					{fileName}
				{/if}
			</h4>

			<div class="row wrap">
				<span class="card-annotation">
					<a title="IANA Media Type" href="https://www.iana.org/assignments/media-types/{mediaType}" target="_blank">{mediaType}</a><!-- {#if params}; {params}{/if} -->
				</span>
			</div>
		</header>

		<hr>

		<div class="scrollable align-center">
			{#if displayType === 'text'}
				<pre>{text}</pre>
			{:else if displayType === 'iframe'}
				<iframe
					bind:this={iframeElement}
					src={displaySrc}
					title={`${fileName ?? ''}${extension ? `.${extension}` : ''}`}
				/>
			{:else if displayType === 'image'}
				<img src={displaySrc} />
			{:else if displayType === 'video'}
				<video controls>
					<source src={displaySrc} type={contentType} />
					<track kind="captions">
				</video>
			{:else if displayType === 'audio'}
				<audio controls>
					<source src={displaySrc} type={contentType} />
				</audio>
			{:else if displayType === 'json'}
				<pre><code>{JSON.stringify(JSON.parse(text), null, 2)}</code></pre>
			{:else if displayType === 'xml'}
				<pre><code>{text}</code></pre>
			{:else if displayType === 'pdf'}
				<object
					data={displaySrc}
					type={contentType}
				>
					<p>Your browser does not support PDFs. <a href={dataUrl} download>Download the PDF</a> instead.</p>
				</object>
			{:else}
				<pre>{text}</pre>
			{/if}
		</div>
	</article>
{/if}


<style>
	pre {
		font-size: 1em;
	}

	iframe {
		background: white;
		min-height: 0;
	}
</style>
