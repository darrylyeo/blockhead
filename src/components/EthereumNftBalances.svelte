<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { QuoteCurrency } from '$/data/currencies'
	import type { NftProvider } from '$/data/nftProviders'
	import { ipfsGatewaysByProvider } from '$/data/ipfsGateways'


	// Context
	import { preferences } from '$/state/preferences'


	// Inputs
	export let nftContractsWithBalances: Ethereum.NftContractWithNfts[]
	export let network: Ethereum.Network
	export let address: Ethereum.Address
	export let nftProvider: NftProvider
	export let quoteCurrency: QuoteCurrency

	// (View options)
	export let showImagesOnly = false
	export let show3D = false
	export let collectionsSortBy: 'symbol-ascending' | 'floor-price-descending' | 'floor-price-ascending' | 'value-descending' | 'value-ascending' = 'floor-price-descending'
	export let showNFTMetadata = false
	export let showFloorPrices = false
	export let showSmallNftFloorPrices = false
	export let isScrollable = true


	// Internal state
	let collectionsSortFunction: (a: Ethereum.NftContractWithNfts, b: Ethereum.NftContractWithNfts) => number
	$: collectionsSortFunction = {
		'symbol-ascending': (a: Ethereum.NftContractWithNfts, b: Ethereum.NftContractWithNfts) => a.symbol && b.symbol && a.symbol.localeCompare(b.symbol) || 0,
		'floor-price-descending': (a: Ethereum.NftContractWithNfts, b: Ethereum.NftContractWithNfts) => (b.conversion?.value ?? 0) - (a.conversion?.value ?? 0),
		'floor-price-ascending': (a: Ethereum.NftContractWithNfts, b: Ethereum.NftContractWithNfts) => (a.conversion?.value ?? 0) - (b.conversion?.value ?? 0),
		'value-descending': (a: Ethereum.NftContractWithNfts, b: Ethereum.NftContractWithNfts) => (b.conversion?.value ?? 0) * (b.nftsCount ?? b.nfts?.length ?? 0) - (a.conversion?.value ?? 0) * (a.nftsCount ?? a.nfts?.length ?? 0),
		'value-ascending': (a: Ethereum.NftContractWithNfts, b: Ethereum.NftContractWithNfts) => (a.conversion?.value ?? 0) * (a.nftsCount ?? a.nfts?.length ?? 0) - (b.conversion?.value ?? 0) * (b.nftsCount ?? b.nfts?.length ?? 0),
	}[collectionsSortBy]


	// Functions
	import { resolveUri } from '$/utils/resolveUri'


	// Components
	import Address from './Address.svelte'
	import Collapsible from './Collapsible.svelte'
	import InlineTransition from './InlineTransition.svelte'
	import Icon from './Icon.svelte'
	import Nft from './Nft.svelte'
	import NftImage from './NftImage.svelte'
	import SizeContainerOld from './SizeContainerOld.svelte'
	import TokenBalance from './TokenBalance.svelte'


	// Transitions/animations
	import { flip } from 'svelte/animate'
	import { fly } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
</script>


<style>
	.summary {
		font-size: 0.8em;
	}

	.nft-contracts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
		grid-auto-flow: row dense;

		&.scrollable-list {
			--resizeVertical-defaultHeight: 39.5rem;
		}

		.nft-contract {
			position: relative;

			&:has(> [data-state="open"]) {
				&:not(.is-single) {
					grid-column: 1 / -1;
				}
				grid-row-end: span 6;
			}

			header {
				> * {
					margin: -0.25em 0;
				}

				.nft-contract-logo {
					width: fit-content;
					height: 1.75em;
					border-radius: 0.3em;
				}

				.nfts-preview {
					display: flex;
					flex-direction: row;

					> :global(* + *) {
						margin-inline-start: -1em;
					}

					> :global(.nft-image img) {
						border-radius: 3px;
					}
				}
			}

			.nfts {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
				grid-template-rows: masonry;
				align-items: stretch;

				--padding-inner: 1.5em;
				gap: var(--padding-inner);

				&.scrollable-list {
					--resizeVertical-defaultHeight: 31rem;
				}
			}
		}
	}

	.nft-contracts[data-layout="images"] {
		--grid-unit-size: 0.125rem;
		--grid-item-width: 24;
		--grid-item-height: 24;

		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--grid-unit-size), auto));
		grid-template-columns: repeat(auto-fit, minmax(var(--grid-unit-size), auto));
		grid-auto-columns: min-content;
		gap: 0.25em;

		.nft-contract {
			display: contents;

			.nfts {
				display: contents;
			}
			
			& > header {
				display: none;
			}
			& > hr {
				display: none;
			}
		}
	}

	.nft-contracts[data-3d] {
		--perspective: 1000px;
		--transition-duration: 0.3s;

		perspective: var(--perspective);
		transform-style: preserve-3d;

		.nft-contract {
			transition: var(--transition-duration), background-color var(--transition-duration) calc(var(--transition-duration) * 2/3);

			&:not(:focus-within) {
				background-color: transparent;
				box-shadow: 0 0 1px 1px var(--card-background-color) inset;
				transition: var(--transition-duration);
			}
		}

		&[data-layout="collections"] .nft-contract {
			&:before {
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

			&:not(:focus-within):before {
				transform-origin: top;
				backdrop-filter: blur(10px);
			}
		}
	}

	.empty {
		grid-column: 1 / -1;
	}
</style>


<div
	class="nft-contracts column"
	class:scrollable-list={(isScrollable && nftContractsWithBalances?.length > 3) || show3D}
	data-layout={showImagesOnly ? 'images' : 'collections'}
	data-3d={show3D ? '' : undefined}
>
<!-- on:contextmenu={() => showImagesOnly = !showImagesOnly}
on:dblclick={() => show3D = !show3D} -->
	{#each
		nftContractsWithBalances
			.sort(collectionsSortFunction)
			.filter(({ nfts }) => nfts && nfts.length > 0)
		as contract,
		i (contract.address || contract.symbol || contract.name)
	}
		{@const showFloorPrice = showFloorPrices && contract.conversion?.value && (showSmallNftFloorPrices ? true : contract.conversion.value >= 1)}

		<article
			class="nft-contract card"
			class:is-single={contract.nfts ? contract.nfts.length <= 1 : true}
			tabIndex={show3D ? 0 : undefined}
			animate:flip|local={{duration: 500, delay: Math.abs(i) * 10, easing: quintOut}}
			draggable={true}
			data-nft-focus-group={!showImagesOnly}
		>
			<Collapsible
				type="label"
				class="column"
				isOpen={showImagesOnly}
				clip={false}
				showContentsOnly={showImagesOnly}
			>
				{#if contract.metadata?.bannerImage && !show3D}
					<img
						class="cover-image"
						src={resolveUri({
							uri: contract.metadata.bannerImage,
							ipfsGatewayDomain: ipfsGatewaysByProvider[$preferences.ipfsGateway].gatewayDomain,
							arweaveGatewayDomain: $preferences.arweaveGateway,
						})}
						on:error={e => e.target.hidden = true}
					/>
				{/if}

				<header slot="header"
					class="column"
					let:toggle
					let:isOpen
				>
					<div class="bar" class:wrap={isOpen}>
						<h5 class="row">
							{#if contract.metadata?.logoImage}
								<Icon
									imageSources={resolveUri({
										uri: contract.metadata.logoImage,
										ipfsGatewayDomain: ipfsGatewaysByProvider[$preferences.ipfsGateway].gatewayDomain,
										arweaveGatewayDomain: $preferences.arweaveGateway,
									})}
								/>
							{/if}
							<span class:overflow-ellipsis={!isOpen}>
								<Address
									{network}
									address={contract.address}
									format="middle-truncated" 
									let:formattedAddress
								>{#if contract.name}{contract.name}{:else}<span class="format">{formattedAddress}</span>{/if}</Address>
								{#if contract.nfts && contract.nfts.length > 1 && !showFloorPrice}({contract.nfts.length}){/if}
							</span>
						</h5>

						<InlineTransition
							key={!isOpen && contract.nfts?.length}
							align="end"
							contentTransition={[fly, { y: 100 }]}
							clip
						>
							{#if showFloorPrice && contract.conversion}
								<span class="summary">
									<TokenBalance
										format="fiat"
										token={{
											symbol: contract.conversion.quoteCurrency,
										}}
										balance={contract.conversion.value}
									/>
									{#if contract.nfts && contract.nfts.length > 1}
										× {contract.nfts.length}
									{/if}
								</span>
							{:else if !isOpen && contract.nfts?.length}
								<div class="nfts-preview row inline">
									{#each contract.nfts.slice(0, 3) ?? [] as nft}
										<NftImage
											{nft}
											height={24}
										/>
									{/each}
								</div>
							{:else}
								{#if contract.ercTokenStandards?.length}
									{@const ercTokenStandards = contract.ercTokenStandards.includes('erc1155') && contract.ercTokenStandards.includes('erc721') ? ['erc1155'] : contract.ercTokenStandards}
									<span class="card-annotation">{ercTokenStandards.join('/')}</span>
								{/if}
							{/if}
						</InlineTransition>

						{#if toggle}
							<button
								class="small"
								data-after={isOpen ? '▲' : '▼'}
								on:click={toggle}
							/>
						{/if}
					</div>

					{#if showNFTMetadata}
						{#if contract.metadata?.description}<p>{contract.metadata.description}</p>{/if}
					{/if}
				</header>

				{#if contract.nfts}
					<hr />

					<div class="nfts" class:scrollable-list={isScrollable && contract.nfts?.length > 3 && !show3D}>
						{#each contract.nfts as nft}<!-- (nft.tokenId || nft.tokenUri || nft.metadata.name) -->
							<SizeContainerOld contentsOnly={showImagesOnly}>
								<Nft
									{nft}
									layout={showImagesOnly ? 'stack' : 'column'}
									showMetadata={showNFTMetadata}
									is3d={show3D}
								/>
							</SizeContainerOld>
						{/each}
					</div>
				{/if}
			</Collapsible>
		</article>	
	{:else}
		<div class="card empty">
			<p class="faded">No NFTs found.</p>
		</div>
	{/each}
</div>
