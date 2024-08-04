<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'


	// Inputs
	export let nft: Ethereum.NftWithBalance

	// (View options)
	export let layout: 'column' | 'stack' = 'column'
	export let showMetadata = false
	export let is3d = false


	// Functions
	const findClosestAspectRatio = (n, minInteger = 1, maxInteger = 30, target = 24) => {
		let numerator = minInteger
		let denominator = minInteger
		
		for(
			let ratio;
			ratio = numerator / denominator,
			Math.abs((ratio - n) / n) >= 1 / maxInteger;
			ratio < n ? numerator++ : denominator++
		);

		const scaleFactor = Math.max(1, Math.round(Math.sqrt((target * target) / (numerator * denominator))))
		return [numerator * scaleFactor, denominator * scaleFactor]
	}


	// Components
	import NftImage from './NftImage.svelte'
</script>


<figure
	class="nft"
	data-layout={layout}
	class:column={layout === 'column'}
	class:stack={layout === 'stack'}
	data-3d={is3d ? '' : undefined}
	draggable={true}
	tabIndex={0}
>
<!-- style="order: {Math.random() * 1000 | 0}" -->
	<!-- <IPFSLink -->
	<!-- <a
		href={tokenUri || nft.metadata['external_url']}
		target="_blank"
		draggable={false}
	> -->
	<NftImage
		{nft}
		on:load={e => {
			const [w, h] = findClosestAspectRatio(e.target.naturalWidth / e.target.naturalHeight)
			const figure = e.target.closest('figure')
			figure.style.setProperty('--grid-item-width', w)
			figure.style.setProperty('--grid-item-height', h)
		}}
	/>

	<figcaption class="column">
		<header class="bar wrap">
			<div class="nft-name" class:row={layout === 'column'} class:inline={layout === 'column'}>
				{#if nft.metadata.name}<h6>{nft.metadata.name}</h6>{/if}
				{#if nft.erc1155Balance && nft.erc1155Balance > 1}
					<span class="nft-count">×{nft.erc1155Balance}</span>
				{/if}
			</div>

			{#if String(nft.tokenId).length < 6}
				<span class="card-annotation token-id">#{nft.tokenId}</span>
			{/if}
		</header>

		{#if showMetadata}
			{#if nft.metadata.description}
				<p class="description">{nft.metadata.description}</p>
			{/if}
			{#if nft.metadata.attributes?.length}
				<dl class="attributes">
					{#each nft.metadata.attributes as {traitType, value}}
						<dt>{traitType}</dt>
						<dd>{value}</dd>
					{/each}
				</dl>
			{/if}
		{/if}
	</figcaption>
</figure>


<style>
	.nft {
		--padding-inner: 0.75em;
		gap: var(--padding-inner);

		> a {
			display: grid;
		}

		header {
			row-gap: 0.15em;
		}

		/* * {
			overflow: hidden;
			text-overflow: ellipsis;
		} */

		:global(.nft-image img) {
			width: 100%;
			border-radius: 0.33rem;
			margin: auto;
			background-color: rgba(0, 0, 0, 0.1);
			object-fit: contain;
			aspect-ratio: auto 1 / 1;
		}

		.nft-name {
			gap: 0.5ch;
			overflow: hidden;
			text-overflow: ellipsis;

			.nft-count {
				font-size: 0.85em;
				opacity: 0.8;
			}
		}

		.description {
			font-size: 0.85em;
			line-height: 1.3;
		}

		.attributes {
			font-size: 0.8em;
			line-height: 1.25;
			row-gap: 0.5em;
			opacity: 0.8;
		}

		.token-id {
			display: inline-block;
			line-height: 1.25;
			word-break: break-all;
		}

		&[data-layout="stack"] {
			overflow: hidden;
			border-radius: 0.33rem;
			grid-column-end: span var(--grid-item-width);
			grid-row-end: span var(--grid-item-height);

			scroll-snap-align: start;

			figcaption {
				align-self: end;
				padding: var(--padding-inner);

				z-index: 1;

				/* min-height: min(max-content, 100%);
				height: min(max-content, 100%); */

				/* max-height: 0; */
				min-height: 100%;
				max-height: 0;

				opacity: 0;
				/* transform: translateY(100%); */
				transform: scale(0.95) translateZ(-1rem);
				transition: 0.15s;
			}

			&:hover figcaption {
				/* backdrop-filter: blur(5px); */
				background-color: rgba(var(--rgb-light-dark), 0.33);
				opacity: 1;
				transform: translateZ(1rem);
				overflow-y: auto;
			}

			header {
				position: sticky;
				top: 0;
			}
		}

		&[data-3d] {
			--angle: -0.075turn;
			--grid-height: 8em;

			overflow: visible;
			height: var(--grid-height);
			transform: rotateX(var(--angle));
			transform-origin: top;
			display: grid;
			grid-auto-flow: row reverse;

			transition: var(--transition-duration);
			will-change: transform;
			animation-delay: var(--transition-duration);

			&:focus-within,
			:global([data-nft-focus-group]:focus-within) &,
			&:focus {
				height: auto;
				--angle: 0;
			}

			:global(.nft-image) {
				/* mask: linear-gradient(white, transparent) no-repeat; */
				/* mask-image: linear-gradient(white, transparent); */
				/* mask-image: linear-gradient(white 20%, transparent 80%); */

				--wipe-gradient-height: 0.333;
				--total-height: calc(2 + var(--wipe-gradient-height));

				mask:
					linear-gradient(
						178deg,
						white calc(100% / var(--total-height)),
						transparent calc(100% * (1 + var(--wipe-gradient-height)) / var(--total-height))
					)
					50% / 100% calc(100% * var(--total-height))
					no-repeat;

					-webkit-mask-position-y: calc(50% + var(--grid-height) / 2);

				backdrop-filter: blur(6px);

				transition: var(--transition-duration);
				will-change: transform;
			}

			&:focus-within :global(.nft-image),
			:global([data-nft-focus-group]:focus-within) & :global(.nft-image) {
				-webkit-mask-position-y: top;
			}

			figcaption {
				order: -1;
				transform: rotateX(calc(-1 * var(--angle)));
				transform-origin: bottom;
				transform-origin: top;
				transition: var(--transition-duration);
			}
		}
	}
</style>
