<script context="module" lang="ts">
	const cachedIndex = {}
</script>


<script lang="ts">
	export let key
	export let imageSources = []

	export let title = ''
	export let placeholder = ''

	export let isGrayscale = false


	let i = cachedIndex[key] ||= 0
	$: cachedIndex[key] = i
</script>


<picture
	class="icon"
	class:isGrayscale={isGrayscale}
	{title}
>
	{#if imageSources[i]}
		<img src={imageSources[i]} on:error={e => i++} />
	{:else}
		<slot>
			{#if placeholder}<span class="placeholder-icon" data-placeholder={placeholder} />{/if}
		</slot>
	{/if}
</picture>


<style>
	:global(:root) {
		--icon-size: 1.25em;
	}

	picture:empty,
	picture:has(picture:empty) {
		display: none;
	}

	.icon {
		display: inline-flex;
		width: var(--icon-size);
		height: 1em;
		align-self: center;
		align-items: center;
	}
	.icon + :global(.icon) {
		margin-left: calc(-0.25em - var(--padding-inner));
	}

	source {
		display: none;
	}

	img, .placeholder-icon, .icon > :global(svg) {
		width: var(--icon-size);
		height: var(--icon-size);
		max-width: 100%;
		aspect-ratio: 1;
		border-radius: 0.3em;
		object-fit: contain;
	}

	.placeholder-icon {
		/* background-color: rgba(50, 50, 50, 0.75);
		background-color: var(--primary-color); */
		background: radial-gradient(transparent -175%, var(--primary-color) 125%);
		/* border: 0.1em dotted var(--primary-color); */
		/* box-shadow: 0 0 0.125em 0.125em var(--primary-color) inset; */

		color: #fff;

		display: inline-flex;
		/* place-items: center; */
		place-content: center;
		text-align: center;
		border-radius: 50%;
		overflow: hidden;

		line-height: var(--icon-size);
		padding: 0 0.1em;
	}
	.placeholder-icon:before {
		content: attr(data-placeholder);

		font-family: Pally, var(--base-fonts);
		font-size: 0.5em;
		font-weight: bold;

		/* white-space: pre;
		word-break: keep-all; */
	}

	/* ETH SVG off-center correction */
	picture[title="ETH"] :global(circle + g) {
		transform: translateX(-.498px);
	}

	.isGrayscale {
		filter: grayscale(66%);
	}
</style>
