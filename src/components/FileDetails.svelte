<script lang="ts">
	// External state
	export let src: string | undefined
	export let fileName: string | undefined
    export let extension: string | undefined
    export let contentType: string | undefined = 'text/plain'
	export let text: string | undefined
	export let blob: Blob | undefined
	// (Computed)
	$: if(src && !fileName) fileName = src.match(/[^/]+$/)![0]
	$: if(text && !blob) blob = new Blob([text], { type: contentType })
	$: [mediaType, params] = contentType?.split(/;\s*/) ?? []


	// Internal state
	// (Computed)
	$: displayType =
		!contentType || contentType.startsWith('text/plain') ? 'text'
		: contentType.startsWith('text/html') ? 'iframe'
		: contentType.startsWith('text/') ? 'text'
		: contentType.startsWith('image/svg') || text?.includes('<svg') ? 'image'
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
				{#if src}
					<a href={src} target="_blank">{fileName}</a>
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
					src={src ?? `data:${contentType};base64,${btoa(text)}`}
					title={`${fileName ?? ''}${extension ? `.${extension}` : ''}`}
				/>
			{:else if displayType === 'image'}
				<img src={src || URL.createObjectURL(blob)} />
			{:else if displayType === 'video'}
				<video controls>
					<source src={`data:${contentType};base64,${btoa(text)}`} type={contentType} />
					<track kind="captions">
				</video>
			{:else if displayType === 'audio'}
				<audio controls>
					<source src={`data:${contentType};base64,${btoa(text)}`} type={contentType} />
				</audio>
			{:else if displayType === 'json'}
				<pre><code>{JSON.stringify(JSON.parse(text), null, 2)}</code></pre>
			{:else if displayType === 'xml'}
				<pre><code>{text}</code></pre>
			{:else if displayType === 'pdf'}
				<object data={`data:${contentType};base64,${text}`} type={contentType} width="100%" height="100%">
					<p>Your browser does not support PDFs. <a href={`data:${contentType};base64,${btoa(text)}`} download>Download the PDF</a> instead.</p>
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
