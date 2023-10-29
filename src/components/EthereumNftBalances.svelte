<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { QuoteCurrency } from '../data/currencies'
	import type { NftProvider } from '../data/nftProviders'
	import { ipfsGatewaysByProvider } from '../data/ipfsGateways'


	// Context
	import { preferences } from '../state/preferences'


	export let network: Ethereum.Network
	export let address: Ethereum.Address

	export let nftProvider: NftProvider
	export let quoteCurrency: QuoteCurrency

	export let showImagesOnly = false
	export let show3D = false
	export let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending'
	export let showNFTMetadata = false
	export let isScrollable = true

	export let isOpen: boolean

	export let containerClass: string
	export let contentClass: string


	// Computed
	export let summary: {
		quoteTotal: number,
		quoteCurrency: QuoteCurrency,
		nftContractsCount: number,
		nftsCount: number,
	} | undefined


	let sortFunction: (a: Ethereum.NftContractWithNfts, b: Ethereum.NftContractWithNfts) => number
	$: sortFunction = {
		'value-descending': (a: Ethereum.NftContractWithNfts, b: Ethereum.NftContractWithNfts) => (b.conversion?.value ?? 0) - (a.conversion?.value ?? 0) || (b.nftsCount ?? b.nfts?.length ?? 0) - (a.nftsCount ?? a.nfts?.length ?? 0),
		'value-ascending': (a: Ethereum.NftContractWithNfts, b: Ethereum.NftContractWithNfts) => (a.conversion?.value ?? 0) - (b.conversion?.value ?? 0) || (a.nftsCount ?? a.nfts?.length ?? 0) - (b.nftsCount ?? b.nfts?.length ?? 0),
		'ticker-ascending': (a: Ethereum.NftContractWithNfts, b: Ethereum.NftContractWithNfts) => a.symbol?.localeCompare(b.symbol),
	}[sortBy]


	import { resolveUri } from '../utils/resolveUri'

	const formatTokenId = (tokenId: Ethereum.Nft['tokenId']) =>
		String(tokenId).length > 12
			? String(tokenId).slice(0, 6) + '⸱⸱⸱' + String(tokenId).slice(-6)
			: String(tokenId)

	const formatNFTNameAndTokenID = (name: string, tokenId: Ethereum.Nft['tokenId']) => `${name ? `${name.replace(new RegExp(`#${tokenId}$`), '')}\n` : ''}#${formatTokenId(tokenId)}`


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


	import Address from './Address.svelte'
	import EthereumNftBalancesLoader from './EthereumNftBalancesLoader.svelte'
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
	.nft-contract {
		position: relative;
	}
	.nft-contract:not(.is-single) {
		grid-column: 1 / -1;
	}
	.nft-contracts.scrollable-list {
		--resizeVertical-defaultHeight: 39.5rem;
	}

	.nft-contract-logo {
		width: fit-content;
		height: 1.75em;
		border-radius: 0.3em;
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
		--resizeVertical-defaultHeight: 31rem;
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
	.show3D:not(.showImagesOnly) .nft-contract:before {
		--angle: -0.075turn;
		content: '';
		position: absolute;
		inset: 0;
		transform: rotateX(var(--angle));
		transform-origin: top;
		/* background-color: var(--card-background-color); */
		border-radius: inherit;
		transition: 2s;


		/* --parallax-factor: 1.1;
		transform: translateZ(calc(var(--perspective) * (1 - var(--parallax-factor)))) scale(var(--parallax-factor));
		transition: transform 0.3s;
		z-index: calc(100 * var(--parallax-factor)); */
	}
	.show3D:not(.showImagesOnly) .nft-contract:not(:focus-within):before {
		transform-origin: top;
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
	}
	.show3D .nft {
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


		--wipe-gradient-height: 0.333;
		--total-height: calc(2 + var(--wipe-gradient-height));

		-webkit-mask:
			linear-gradient(
				178deg,
				white calc(100% / var(--total-height)),
				transparent calc(100% * (1 + var(--wipe-gradient-height)) / var(--total-height))
			)
			50% / 100% calc(100% * var(--total-height))
			no-repeat;
		mask:
			linear-gradient(
				178deg,
				white calc(100% / var(--total-height)),
				transparent calc(100% * (1 + var(--wipe-gradient-height)) / var(--total-height))
			)
			50% / 100% calc(100% * var(--total-height))
			no-repeat;

		-webkit-mask-position-y: calc(50% + var(--grid-height) / 2);
		mask-position-y: calc(50% + var(--grid-height) / 2);

		-webkit-backdrop-filter: blur(6px);
		backdrop-filter: blur(6px);

		transition: var(--transition-duration);
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


<EthereumNftBalancesLoader
	{network}
	{address}
	{nftProvider}
	{quoteCurrency}
	{isOpen}
	{containerClass}
	{contentClass}
	bind:summary
	let:nftContractsWithBalances
>
	<svelte:fragment slot="header"
		let:nftContractsWithBalances
		let:summary
		let:status
		let:loadingMessage
		let:errorMessage
	>
		<slot name="header" {nftContractsWithBalances} {summary} {status} {loadingMessage} {errorMessage} />
	</svelte:fragment>

	{#if nftContractsWithBalances}
		<div
			class="nft-contracts column"
			class:scrollable-list={(isScrollable && nftContractsWithBalances?.length > 3) || show3D}
			class:showImagesOnly
			class:show3D
		>
		<!-- on:contextmenu={() => showImagesOnly = !showImagesOnly}
		on:dblclick={() => show3D = !show3D} -->
			{#each
				nftContractsWithBalances
					.sort(sortFunction)
					.filter(({ nfts }) => nfts && nfts.length > 0)
				as contract,
				i (contract.address || contract.symbol || contract.name)
			}
				<div class="nft-contract card column"
					class:is-single={contract.nfts ? contract.nfts.length <= 1 : true}
					tabIndex={show3D ? 0 : undefined}
					animate:flip|local={{duration: 500, delay: Math.abs(i) * 10, easing: quintOut}}
					draggable={true}
				>
					{#if contract.metadata?.bannerImage && !show3D}
						<img
							class="cover-image"
							src={resolveUri({
								uri: contract.metadata.bannerImage,
								ipfsGatewayDomain: ipfsGatewaysByProvider[$preferences.ipfsGateway].gatewayDomain,
								arweaveGateway: $preferences.arweaveGateway,
							})}
							on:error={e => e.target.hidden = true}
						/>
					{/if}

					<header class="column">
						<div class="bar wrap">
							<h5 class="row">
								{#if contract.metadata?.logoImage}
									<img
										src={resolveUri({
											uri: contract.metadata.logoImage,
											ipfsGatewayDomain: ipfsGatewaysByProvider[$preferences.ipfsGateway].gatewayDomain,
											arweaveGateway: $preferences.arweaveGateway,
										})}
										height="24"
										style="width: fit-content"
										on:error={e => e.target.hidden = true}
									/>
								{/if}
								<span>
									<Address
										{network}
										address={contract.address}
										format="middle-truncated" 
										let:formattedAddress
									>{#if contract.name}{contract.name}{:else}<span class="format">{formattedAddress}</span>{/if}</Address>
									{#if contract.nfts && contract.nfts.length > 1}({contract.nfts.length}){/if}
								</span>
							</h5>

							{#if contract.ercTokenStandards?.length}
								{@const ercTokenStandards = contract.ercTokenStandards.includes('erc1155') && contract.ercTokenStandards.includes('erc721') ? ['erc1155'] : contract.ercTokenStandards}
								<span class="card-annotation">{ercTokenStandards.join('/')}</span>
							{/if}
						</div>

						{#if showNFTMetadata}
							{#if contract.metadata?.description}<p>{contract.metadata.description}</p>{/if}
						{/if}
					</header>

					{#if contract.nfts}
						<hr />

						<div class="nfts" class:scrollable-list={isScrollable && contract.nfts?.length > 3 && !show3D}>
							{#each contract.nfts as nft (nft.tokenId || nft.tokenUri || nft.metadata.name)}
								<SizeContainer contentsOnly={showImagesOnly}>
									<figure
										class="nft"
										class:column={!showImagesOnly}
										class:stack={showImagesOnly}
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
										<picture
											title={
												[
													[formatNFTNameAndTokenID(nft.metadata.name ?? '', nft.tokenId), nft.metadata.name],
													[nft.metadata.description],
													nft.metadata.attributes?.map(({traitType, value}) => `${traitType}: ${value}`) ?? []
												].map(section => section.filter(Boolean).join('\n')).filter(Boolean).join('\n\n')
											}
										>
											{#each
												[
													[nft.metadata['image'], undefined],
													[nft.metadata['image_256'], '(min-width: 256px)'],
													[nft.metadata['image_512'], '(min-width: 512px)'],
													[nft.metadata['image_1024'], '(min-width: 1024px)'],
												].filter(([ uri, ]) => uri)
												as [uri, media]
											}
												<source
													srcset={resolveUri({
														src: uri,
														ipfsGatewayDomain: ipfsGatewaysByProvider[$preferences.ipfsGateway].gatewayDomain,
														arweaveGateway: $preferences.arweaveGateway,
													})}
													media={media}
												/>
											{/each}

											<img
												class="nft-image"
												src={resolveUri({
													src: nft.metadata['image_256'] || nft.metadata['image'],
													ipfsGatewayDomain: ipfsGatewaysByProvider[$preferences.ipfsGateway].gatewayDomain,
													arweaveGateway: $preferences.arweaveGateway,
												})}
												alt={formatNFTNameAndTokenID(nft.metadata.name ?? '', nft.tokenId)}
												loading="lazy"
												on:load={e => {
													const [w, h] = findClosestAspectRatio(e.target.naturalWidth / e.target.naturalHeight)
													const figure = e.target.closest('figure')
													figure.style.setProperty('--grid-item-width', w)
													figure.style.setProperty('--grid-item-height', h)
												}}
												draggable={false}
											/>
											<!-- <img class="nft-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt={formatNFTNameAndTokenID(metadata.name, token_id)} /> -->
										</picture>

											<!-- {#if metadata.animation_url}
												<iframe src={metadata.animation_url} lazy="true" />
											{/if} -->
										<!-- </a> -->

										<figcaption class="column">
											<header class="bar wrap">
												<div class="nft-name" class:row-inline={!showImagesOnly}>
													{#if nft.metadata.name}<h6>{nft.metadata.name}</h6>{/if}
													{#if nft.erc1155Balance && nft.erc1155Balance > 1}
														<span class="nft-count">×{nft.erc1155Balance}</span>
													{/if}
												</div>

												{#if String(nft.tokenId).length < 6}
													<span class="card-annotation token-id">#{nft.tokenId}</span>
												{/if}
											</header>

											{#if showNFTMetadata}
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
								</SizeContainer>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</EthereumNftBalancesLoader>
