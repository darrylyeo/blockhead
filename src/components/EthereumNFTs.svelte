<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { Covalent } from '../data/analytics/covalent'
	import type { QuoteCurrency, TickerSymbol } from '../data/currency/currency'
	import { getTokenAddressBalances } from '../data/analytics/covalent'

	export let network: Ethereum.Network
	export let address: string
	export let nftProvider = 'Covalent'
	export let quoteCurrency: QuoteCurrency
	export let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending'
	export let showNFTMetadata = false
	export let showValues
	export let showImagesOnly = false
	export let show3D = false
	export let isScrollable = true

	export let quoteTotal
	export let nftContractCount
	export let nftCount

	export let isCollapsed: boolean


	import { memoizedAsync } from '../utils/memoized'

	// const getNftBalancesCovalent = getTokenAddressBalances
	const getNftBalancesCovalent = memoizedAsync(getTokenAddressBalances)

	let filterFunction: (b: Covalent.ERC20TokenOrNFTContractWithBalance) => boolean
	$: filterFunction =
		b => b.type === 'nft'

	let sortFunction: (a: Covalent.ERC20TokenOrNFTContractWithBalance, b: Covalent.ERC20TokenOrNFTContractWithBalance) => number
	$: sortFunction =
		sortBy === 'value-descending' ? (a, b) => b.quote - a.quote || b.balance - a.balance :
		sortBy === 'value-ascending' ? (a, b) => a.quote - b.quote || a.balance - b.balance :
		sortBy === 'ticker-ascending' ? (a, b) => a.contract_ticker_symbol?.localeCompare(b.contract_ticker_symbol) :
		undefined


	export let balances: Covalent.NFTContractWithBalance[] = []

	$: quoteTotal = balances.reduce((sum, item) => sum + item.quote, 0)
	$: nftContractCount = balances.length
	$: nftCount = balances.reduce((sum, item) => sum + (item.nft_data?.length ?? 0), 0)


	function parseNFTAttributes(attributes: Covalent.NFTAttributes | null): {
		key?: string
		display_type?: string
		trait_type: string
		value: string | number
	}[] {
		return attributes === null ?
			[]
		: Array.isArray(attributes) ?
			attributes
		:
			Object.entries(attributes).map(([trait_type, value]) => ({trait_type, value}))

		// return attributes === null ?
		// 	{}
		// : Array.isArray(attributes) ?
		// 	Object.fromEntries(attributes.map(({trait_type, value}) => [trait_type, value]))
		// :
		// 	attributes
	}


	const formatTokenId = (tokenId: number | string) =>
		String(tokenId).length > 12
			? String(tokenId).slice(0, 6) + '⸱⸱⸱' + String(tokenId).slice(-6)
			: String(tokenId)

	const formatNFTNameAndTokenID = (name: string, tokenId: number) => `${name ? `${name.replace(new RegExp(`#${tokenId}$`), '')}\n` : ''}#${formatTokenId(tokenId)}`


	const findClosestAspectRatio = (n, minInteger = 1, maxInteger = 30, target = 24) => {
		let numerator = minInteger
		let denominator = minInteger
		
		for(
			let ratio;
			ratio = numerator / denominator,
			Math.abs((ratio - n) / n) >= 1 / maxInteger;
			ratio < n ? numerator++ : denominator++
		);

		console.log('findClosestAspectRatio', {n, numerator, denominator})

		const scaleFactor = Math.max(1, Math.round(Math.sqrt((target * target) / (numerator * denominator))))
		return [numerator * scaleFactor, denominator * scaleFactor]
	}


	import Address from './Address.svelte'
	import Loader from './Loader.svelte'
	import SizeContainer from './SizeContainer.svelte'
	import { flip } from 'svelte/animate'
	import { quintOut } from 'svelte/easing'
</script>


<style>
	.nft-contracts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
		grid-auto-flow: row dense;
	}
	.nft-contract:not(.is-single) {
		grid-column: 1 / -1;
	}
	.nft-contracts.scrollable-list {
		height: 39.5rem;
	}

	.nfts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
		grid-template-rows: masonry;
		align-items: stretch;

		--padding-inner: 1.5em;
		gap: var(--padding-inner);
	}
	.nfts.scrollable-list {
		height: 31rem;
	}

	.nft-image {
		width: 100%;
		border-radius: 0.33rem;
		margin: auto;
		background-color: rgba(0, 0, 0, 0.1);
		object-fit: contain;
		aspect-ratio: auto 1 / 1;
	}

	.nft {
		--padding-inner: 0.75em;
		gap: var(--padding-inner);
	}
	.nft > a {
		display: grid;
	}
	.nft header {
		row-gap: 0.15em;
	}
	/* .nft * {
		overflow: hidden;
		text-overflow: ellipsis;
	} */

	.nft picture img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.nft .nft-name {
		gap: 0.5ch;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.nft .nft-name .nft-count {
		font-size: 0.85em;
		opacity: 0.8;
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


	.showImagesOnly.nft-contracts {
		--grid-unit-size: 0.125rem;
		--grid-item-width: 24;
		--grid-item-height: 24;

		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--grid-unit-size), auto));
		grid-template-columns: repeat(auto-fit, minmax(var(--grid-unit-size), auto));
		grid-auto-columns: min-content;
		gap: 0.25em;
	}
	.showImagesOnly .nft-contract,
	.showImagesOnly .nfts {
		display: contents;
	}
	.showImagesOnly .nft {
		overflow: hidden;
		border-radius: 0.33rem;
		grid-column-end: span var(--grid-item-width);
		grid-row-end: span var(--grid-item-height);

		scroll-snap-align: start;
	}
	.showImagesOnly .nft figcaption {
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
	.showImagesOnly .nft:hover figcaption {
		/* backdrop-filter: blur(5px); */
		background-color: rgba(var(--rgb-light-dark), 0.33);
		opacity: 1;
		transform: translateZ(1rem);
		overflow-y: auto;
	}
	.showImagesOnly .nft header {
		position: sticky;
		top: 0;
	}
	.showImagesOnly .nft-contract > header,
	.showImagesOnly .nft-contract > hr {
		display: none;
	}

	.show3D.nft-contracts {
		--perspective: 1000px;
		--transition-duration: 0.3s;

		perspective: var(--perspective);
		transform-style: preserve-3d;
	}
	.show3D .nft-contract {
		transition: var(--transition-duration), background-color var(--transition-duration) calc(var(--transition-duration) * 2/3);
	}
	.show3D .nft-contract:not(:focus-within) {
		background-color: transparent;
		box-shadow: 0 0 1px 1px var(--card-background-color) inset;
		transition: var(--transition-duration);
	}
	/* .show3D .nft-contract:before {
		content: '';
		position: absolute;
		inset: 0;
		background-color: var(--card-background-color);
		border-radius: inherit;

		--parallax-factor: 1.1;
		transform: translateZ(calc(var(--perspective) * (1 - var(--parallax-factor)))) scale(var(--parallax-factor));
		transition: transform 0.3s;
		z-index: calc(100 * var(--parallax-factor));
	} */
	.show3D .nft {
		--angle: -0.075turn;

		overflow: visible;
		height: 8em;
		transform: rotateX(var(--angle));
		transform-origin: top;
		display: grid;
		grid-auto-flow: row reverse;
		transition: var(--transition-duration);
		will-change: transform;
	}
	.show3D .nft:focus-within,
	.show3D:not(.showImagesOnly) .nft-contract:focus-within .nft,
	.show3D.showImagesOnly .nft:focus {
		height: auto;
		--angle: 0;
	}
	.show3D .nft picture {
		/* -webkit-mask: linear-gradient(white, transparent) no-repeat;
		mask: linear-gradient(white, transparent) no-repeat; */
		/* -webkit-mask-image: linear-gradient(white 30%, rgba(255, 255, 255, 0.25) 50%, transparent);
		mask-image: linear-gradient(white, transparent); */
		/* -webkit-mask-image: linear-gradient(white 20%, transparent 80%);
		mask-image: linear-gradient(white 20%, transparent 80%); */


		--wipe-gradient-height: 0.25;
		--total-height: calc(2 + var(--wipe-gradient-height));

		transition: var(--transition-duration);

		-webkit-mask:
			linear-gradient(
				178deg,
				white calc(100% / var(--total-height)),
				transparent calc(100% * (1 + var(--wipe-gradient-height)) / var(--total-height))
			)
			50% / 100% calc(100% * var(--total-height));
		mask:
			linear-gradient(
				178deg,
				white calc(100% / var(--total-height)),
				transparent calc(100% * (1 + var(--wipe-gradient-height)) / var(--total-height))
			)
			50% / 100% calc(100% * var(--total-height));
		will-change: transform;
	}
	.show3D .nft:focus-within picture,
	.show3D:not(.showImagesOnly) .nft-contract:focus-within .nft picture {
		-webkit-mask-position-y: top;
		mask-position-y: top;
	}
	.show3D .nft figcaption {
		order: -1;
		transform: rotateX(calc(-1 * var(--angle)));
		transform-origin: bottom;
		transform-origin: top;
		transition: var(--transition-duration);
	}
</style>


{#if address}
	<Loader
		loadingIcon={'/logos/covalent-logomark.svg'}
		loadingIconName={nftProvider}
		loadingMessage="Retrieving {network.name} NFTs from {nftProvider}..."
		errorMessage="Error retrieving {network.name} NFTs from {nftProvider}"
		fromPromise={filterFunction && sortFunction && (() =>
			getNftBalancesCovalent({
				address,
				nft: true,
				chainID: network.chainId,
				quoteCurrency: quoteCurrency
			}).then(balances =>
				(filterFunction ? balances.items.filter(filterFunction) : balances.items)
					.sort(sortFunction)
				// as Covalent.NFTContractWithBalance[]
			)
		)}
		bind:result={balances}
		{isCollapsed}
	>
		<svelte:fragment slot="header">
			<slot name="header" {balances} {quoteCurrency} {quoteTotal} {nftContractCount} {nftCount}></slot>
		</svelte:fragment>

		{#if balances}
			<div
				class="nft-contracts column"
				class:scrollable-list={(isScrollable && balances?.length > 3) || show3D}
				class:showImagesOnly
				class:show3D
				on:contextmenu={() => showImagesOnly = !showImagesOnly}
				on:dblclick={() => show3D = !show3D}
			>
				{#each
					balances
					as {balance, contract_name, contract_address, contract_ticker_symbol, logo_url, nft_data, supports_erc},
					i (contract_address || contract_ticker_symbol || contract_name)
				}
					<div class="nft-contract card column"
						class:is-single={nft_data ? nft_data.length <= 1 : true}
						tabIndex={show3D ? 0 : undefined}
						animate:flip|local={{duration: 500, delay: Math.abs(i) * 10, easing: quintOut}}
					>
						<header class="bar">
							<h4><Address {network} address={contract_address} let:formattedAddress>{contract_name || formattedAddress}</Address> ({balance})</h4>
							{#each [supports_erc.filter(erc => erc !== 'erc20')] as supports_erc}
								{#if supports_erc?.length}
									<span class="card-annotation">{supports_erc.filter(erc => erc !== 'erc20').join('/')}</span>
								{/if}
							{/each}
						</header>

						{#if nft_data}
							<hr />

							<div class="nfts" class:scrollable-list={isScrollable && nft_data?.length > 3 && !show3D}>
								{#each nft_data as {token_id, token_url, token_balance, external_data, supports_erc, burned}}
									{#if external_data}
										{#each [parseNFTAttributes(external_data.attributes)] as attributes}
											<SizeContainer contentsOnly={showImagesOnly}>
												<figure
													class="nft"
													class:column={!showImagesOnly}
													class:stack={showImagesOnly}
													style="order: {Math.random() * 1000 | 0}"
												>
													<a href={token_url || external_data?.external_url} target="_blank">
														<picture
															title={
																[
																	[formatNFTNameAndTokenID(contract_name, token_id), external_data.name],
																	[external_data.description],
																	attributes.map(({trait_type, value}) => `${trait_type}: ${value}`)
																].map(section => section.filter(Boolean).join('\n')).filter(Boolean).join('\n\n')
															}
														>
															{#if external_data.image}<source src={external_data.image} />{/if}
															{#if external_data.image_256}<source src={external_data.image_256} media="(min-width: 256px)" />{/if}
															{#if external_data.image_512}<source src={external_data.image_512} media="(min-width: 512px)" />{/if}
															{#if external_data.image_1024}<source src={external_data.image_1024} media="(min-width: 1024px)" />{/if}
															<img
																class="nft-image"
																src={external_data.image_256 || external_data.image}
																alt={formatNFTNameAndTokenID(external_data.name, token_id)}
																loading="lazy"
																on:load={e => {
																	const [w, h] = findClosestAspectRatio(e.target.naturalWidth / e.target.naturalHeight)
																	const figure = e.target.closest('figure')
																	figure.style.setProperty('--grid-item-width', w)
																	figure.style.setProperty('--grid-item-height', h)
																}}
															/>
															<!-- <img class="nft-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt={formatNFTNameAndTokenID(external_data.name, token_id)} /> -->
														</picture>

														<!-- {#if external_data.animation_url}
															<iframe src={external_data.animation_url} lazy="true" />
														{/if} -->
													</a>
													<figcaption class="column">
														<header class="bar">
															<div class="nft-name" class:row-inline={!showImagesOnly}>
																{#if external_data.name}<h5>{external_data.name}</h5>{/if}
																{#if token_balance > 1}
																	<span class="nft-count">×{token_balance}</span>
																{/if}
															</div>
															{#if String(token_id).length < 6}
																<span class="card-annotation token-id">#{token_id}</span>
															{/if}
														</header>
														{#if showNFTMetadata && attributes.length}
															{#if external_data.description}
																<p class="description">{external_data.description}</p>
															{/if}
															<dl class="attributes">
																{#each attributes as {key, display_type, trait_type, value}}
																	<dt>{trait_type}</dt>
																	<dd>{value}</dd>
																{/each}
															</dl>
														{/if}
													</figcaption>
												</figure>
											</SizeContainer>
										{/each}
									{:else}
										<div class="nft column" title={`${contract_name ? `${contract_name} ` : ''}#${token_id}`}>
											<div class="nft-image" />
											<span class="card-annotation token-id">#{token_id}</span>
										</div>
									{/if}
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</Loader>
{/if}
