<script lang="ts">
	// External state
	export let displayType: 'text' | 'image' | 'video' | 'audio' | 'json' | 'xml' | 'pdf' | 'iframe' | undefined
	export let src: string | undefined
	export let fileName: string | undefined
	export let extension: string | undefined
	export let contentType: string | undefined
	export let contentSize: number | BigInt | undefined
	export let text: string | undefined
	export let blob: Blob | undefined
	export let file: File | undefined
	export let width: number | undefined
	export let height: number | undefined

	// (Computed)
	$: if(!fileName && src) fileName = src.match(/[^/]+$/)![0]
	$: if(!blob && (text ?? src)) blob = new Blob([text ?? src], { type: contentType })
	else if(!contentType && blob) contentType = blob.type
	$: if(!fileName && file) fileName = file.name
	$: if(!contentType && file) contentType = file.type
	$: if(!contentSize && file) contentSize = file.size
	$: [mediaType, params] = contentType?.split(/;\s*/) ?? []
	$: blobUrl = blob && (() => { try { return URL.createObjectURL(blob) } catch {} })()
	$: dataUrl = text && (() => { try { return `data:${contentType};base64,${btoa(text)}` } catch {}})()

	$: displaySrc = src ?? blobUrl ?? dataUrl

	$: displayType = $$props.displayType ||=
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

	$: displayIcon = displayType
		? ({
			text: '📄',
			image: '🖼️',
			video: '🎥',
			audio: '🔊',
			json: '🗒️',
			xml: '🗒️',
			pdf: '📄',
			iframe: '🌐',
		} as const)[displayType]
		: '📦'


	// (View options)
	export let isOpen: boolean = false


	// Internal state
	let containerElement: Element
	let iframeElement: HTMLIFrameElement
	let fullscreenElement: Element


	// Functions
	import { formatByteCount } from '$/utils/formatByteCount'


	// Components
	import Collapsible from './Collapsible.svelte'
</script>



<svelte:document bind:fullscreenElement />


<article class="card" bind:this={containerElement}>
	<Collapsible
		type="label"
		showTriggerText={false}
		class="column"
		canToggle={!fullscreenElement}
		{isOpen}
	>
		<h4 slot="title" class="row" data-before={displayIcon}>
			{#if displaySrc}
				<a href={displaySrc} target="_blank">{fileName}</a>
			{:else}
				{fileName ?? ''}
			{/if}
		</h4>

		<svelte:fragment slot="header-right">
			{#if contentSize !== undefined}
				<span>{formatByteCount(contentSize)}</span>
			{/if}

			<span class="card-annotation">
				{#if mediaType}
					<a title="IANA Media Type" href="https://www.iana.org/assignments/media-types/{mediaType}" target="_blank">{mediaType}</a><!-- {#if params}; {params}{/if} -->
				{:else if displayType}
					{displayType}
				{:else}
					file
				{/if}
			</span>
		</svelte:fragment>

		<hr>

		<div class="scrollable" class:align-center={!['iframe', 'pdf', 'json'].includes(displayType)}>
			{#if displayType === 'text' && text !== undefined}
				<pre class="text" style="--text-length: {text.length}">{text}</pre>
			{:else if displayType === 'iframe'}
				<iframe
					bind:this={iframeElement}
					src={displaySrc}
					title={`${fileName ?? ''}${extension ? `.${extension}` : ''}`}
					{width}
					{height}
				/>
			{:else if displayType === 'image'}
				<img
					src={displaySrc}
					{width}
					{height}
				/>
			{:else if displayType === 'video'}
				<video
					controls
					{width}
					{height}
				>
					<source src={displaySrc} type={contentType} />
					<track kind="captions">
				</video>
			{:else if displayType === 'audio'}
				<audio controls>
					<source srcset={displaySrc} type={contentType} />
				</audio>
			{:else if displayType === 'json'}
				<pre><code>{JSON.stringify(JSON.parse(text), null, 2)}</code></pre>
			{:else if displayType === 'xml'}
				<pre><code>{text}</code></pre>
			{:else if displayType === 'pdf'}
				<object
					data={displaySrc}
					type={contentType}
					{width}
					{height}
				>
					<p>Your browser does not support PDFs. <a href={dataUrl} download>Download the PDF</a> instead.</p>
				</object>
			{:else if text !== undefined}
				<pre class="text" style="--text-length: {text.length}">{text}</pre>
			{/if}
		</div>

		<hr>

		<footer class="bar wrap">
			<div class="row wrap">
			</div>

			<div class="row wrap">
				<div role="toolbar" class="row wrap">
					<button
						class="medium"
						data-before="📋"
						on:click={e => {
							if(text && ['text', 'json', 'xml'].includes(displayType))
								navigator.clipboard.writeText(text)
							else if(blob)
								navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })])
							else if(displaySrc)
								navigator.clipboard.writeText(displaySrc)
						}}
					>Copy</button>

					<a href={displaySrc} download>
						<button
							class="medium"
							title="Download"
							data-before="📥"
						>Download</button>
					</a>

					<button
						class="medium"
						data-before="⛶"
						on:click={e => {
							if (fullscreenElement) {
								document.exitFullscreen()
							} else {
								containerElement.requestFullscreen()
							}
						}}
					>{!fullscreenElement ? 'Full Screen' : 'Exit'}</button>
				</div>
			</div>
		</footer>
	</Collapsible>
</article>


<style>
	article:fullscreen {
		align-content: stretch;
	}
	article:fullscreen > :global(* > *) {
		grid-template-rows: auto 1fr auto auto;
	}
	article:fullscreen .scrollable {
		display: grid;
		align-items: center;
		justify-content: stretch;
		min-height: 100%;
		height: 0;
	}
	article:not(:fullscreen) .scrollable > * {
		max-width: 100%;
	}
	article .scrollable > * {
		margin: auto;
	}

	pre {
		font-size: 1em;
	}

	.text {
		font-size: clamp(1rem, 80 / var(--text-length) * 1rem, 2rem);
		padding: 1rem 0.5rem;
	}

	iframe {
		background: white;
		justify-self: stretch;
		align-self: stretch;
	}
	article:fullscreen iframe {
		min-height: 0;
	}
</style>
