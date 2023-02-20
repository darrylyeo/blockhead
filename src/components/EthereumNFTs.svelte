<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { Covalent } from '../api/covalent'
	import type { QuoteCurrency } from '../data/currency/currency'
	import type { Nftport } from '../data/analytics/nftport'
	import type { TickerSymbol } from '../data/currency/currency'
	import { getTokenAddressBalances } from '../api/covalent'
	import { NftportApi } from '../data/analytics/nftport'

	export let network: Ethereum.Network
	export let address: string

	export let nftProvider
	export let quoteCurrency: QuoteCurrency

	export let showImagesOnly = false
	export let show3D = false
	export let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending'
	export let showNFTMetadata = false
	export let tokenBalanceFormat
	export let isScrollable = true

	export let isCollapsed: boolean

	type NftWithBalance = Ethereum.Nft & {
		erc1155Balance?: number
	}
	type NftContractWithBalance = Ethereum.NftContract & {
		balance: number
		quote?: number
		quoteRate?: number

		nfts: NftWithBalance[]
	}

	let sortFunction: (a: NftContractWithBalance, b: NftContractWithBalance) => number
	$: sortFunction =
		sortBy === 'value-descending' ? (a, b) => b.quote - a.quote || b.balance - a.balance :
		sortBy === 'value-ascending' ? (a, b) => a.quote - b.quote || a.balance - b.balance :
		sortBy === 'ticker-ascending' ? (a, b) => a.symbol?.localeCompare(b.symbol) :
		undefined


	export let nftContractsWithBalances: NftContractWithBalance[] = []

	export let summary: {
		quoteTotal: number,
		quoteCurrency: QuoteCurrency,
		nftContractsCount: number,
		nftsCount: number,
	}
	$: summary = nftContractsWithBalances.length
		? {
			quoteTotal: nftContractsWithBalances.reduce((sum, item) => sum + item.quote, 0),
			quoteCurrency,
			nftContractsCount: nftContractsWithBalances.length,
			nftsCount: nftContractsWithBalances.reduce((sum, item) => sum + (item.nfts?.length ?? 0), 0)
		}
		: undefined


	const normalizeCovalentContractWithBalance = (nftContractWithBalance: Covalent.NFTContractWithBalance): NftContractWithBalance => ({
		name: nftContractWithBalance.contract_name,
		address: nftContractWithBalance.contract_address,
		symbol: nftContractWithBalance.contract_ticker_symbol,
		ercTokenStandards: nftContractWithBalance.supports_erc?.filter(erc => erc !== 'erc20'),
	
		metadata: {
			logoImage: nftContractWithBalance.logo_url,
		},

		balance: nftContractWithBalance.balance,
		quote: nftContractWithBalance.quote,
		quoteRate: nftContractWithBalance.quote_rate,

		nfts: nftContractWithBalance.nft_data.map(nft => ({
			tokenId: nft.token_id,
			tokenUri: nft.token_url, 
			name: nft.external_data?.name,
			description: nft.external_data?.description,
			image: nft.external_data?.image,

			
			metadata: {
				...nft.external_data,
				attributes: normalizeNFTAttributes(nft.external_data?.attributes),
			},

			owner: nft.owner,
		})),
	})

	const normalizeNftportNftsAndContracts = ({
		nftsResponse,
		nftContractsResponse
	}: {
		nftsResponse: AccountNftsResponse,
		nftContractsResponse: AccountContractsResponse
	}): NftContractWithBalance[] => {
		// const contractsByAddress: Map<string, NFTContract> = new Map<string, NFTContract>()
		const contractsByAddress = Object.fromEntries(
			nftContractsResponse.contracts.map(nftContract => [
				nftContract.address,
				{
					address: nftContract.address,
					name: nftContract.name,
					symbol: nftContract.symbol,
					ercTokenStandards: [nftContract.type?.toLowerCase()] as Ethereum.ERCTokenStandard[],
					metadata: {
						description: nftContract.metadata?.description,
						bannerImage: nftContract.metadata?.banner_url || nftContract.metadata?.cached_banner_url,
						logoImage: nftContract.metadata?.thumbnail_url || nftContract.metadata?.cached_thumbnail_url,
					}
				}
			])
		)

		const nftsByContractAddress: Record<Ethereum.Address, NftWithBalance[]> = {}

		for(const nft of nftsResponse.nfts){
			// const nftContract: NFTContract | undefined = contractsByAddress[nft.contract_address]
			const nfts = nftsByContractAddress[nft.contract_address] ||= []

			nfts.push({
				tokenId: Number(nft.token_id),
				tokenUri: nft.metadata_url,
				name: nft.name || nft.metadata?.['name'],
				description: nft.description || nft.metadata?.['description'],
				image: parseIpfs(nft.cached_file_url || nft.file_url || nft.metadata?.['image'] || nft.metadata?.['ipfs_image'] || nft.metadata?.['google_image']),
				owner: address,
				attributes: normalizeNFTAttributes(nft.metadata?.['attributes']),
			})

			// contractsByAddress[nft.contract_address] = {
			// 	contract_address: nft.contract_address,
			// 	contract_name: nft.contract?.name,
			// 	contract_ticker_symbol: nft.contract?.symbol,
			// 	ercTokenStandards: nft.contract?.type && [nft.contract.type.toLowerCase()], // as ERCTokenStandard[]
			// 	metadata: nft.contract?.metadata,
			// 	// {
			// 	// 	description: nft.contract?.metadata.description
			// 	// 	thumbnail_url
			// 	// 	cached_thumbnail_url
			// 	// 	banner_url
			// 	// 	cached_banner_url
			// 	// },
			// 	nft_data,
			// }
		}

		return Object.entries(nftsByContractAddress).map(([contractAddress, nfts]) => ({
			...{
				balance: nfts.length,
				...contractsByAddress[contractAddress],
			},
			nfts
		}))

		// return Object.entries(contractsByAddress).map(([contractAddress, contract]) => ({
		// 	...contract,
		// 	nfts: nftsByContractAddress[contractAddress]
		// }))
	}

	const normalizeNFTAttributes = (attributes: Covalent.NFTAttributes | null): Ethereum.NftAttribute[] => (
		!attributes ?
			[]
		: Array.isArray(attributes) ?
			attributes.map(({
				key,
				display_type,
				trait_type,
				value
			}) => ({
				key,
				displayType: display_type,
				traitType: trait_type,
				value
			}))
		:
			Object.entries(attributes).map(([trait_type, value]) => ({
				traitType: trait_type,
				value
			}))
	)

	const networkSlugToNftportChain: Record<Ethereum.NetworkName, Nftport.AccountRequestSupportedChain> = {
		'ethereum': 'ethereum',
		'ethereum-rinkeby': 'rinkeby',
		// 'polygon': 'polygon',
	}

	const parseIpfs = (hashOrUri: string | undefined) =>
		hashOrUri?.replace(/^(Qm.+)$/, 'https://ipfs.io/ipfs/$1').replace(/^ipfs:\/\/(.+)$/, 'https://ipfs.io/ipfs/$1')


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

		const scaleFactor = Math.max(1, Math.round(Math.sqrt((target * target) / (numerator * denominator))))
		return [numerator * scaleFactor, denominator * scaleFactor]
	}


	import { useQuery } from '@sveltestack/svelte-query'
	import Address from './Address.svelte'
	import Loader from './Loader.svelte'
	import SizeContainer from './SizeContainer.svelte'
	import { flip } from 'svelte/animate'
	import { quintOut } from 'svelte/easing'


	import { CovalentIcon, NFTPortIcon } from '../assets/icons'
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
	.show3D .nft-contract:before {
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
	.show3D .nft-contract:not(:focus-within):before {
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


{#if nftProvider === 'Covalent'}
	<Loader
		loadingIcon={CovalentIcon}
		loadingIconName={nftProvider}
		loadingMessage="Retrieving {network.name} NFTs from {nftProvider}..."
		errorMessage="Error retrieving {network.name} NFTs from {nftProvider}"
		fromUseQuery={
			useQuery({
				queryKey: ['NFTs', {
					nftProvider,
					address,
					chainID: network.chainId,
					quoteCurrency: quoteCurrency
				}],
				queryFn: async () => (
					await getTokenAddressBalances({
						address,
						nft: true,
						chainID: network.chainId,
						quoteCurrency: quoteCurrency
					})
				)
			})
		}
		then={result => (
			result.items
				.filter(balance => balance.type === 'nft')
				.map(normalizeCovalentContractWithBalance)
				.sort(sortFunction)
		)}
		bind:result={nftContractsWithBalances}
		{isCollapsed}
	>
		<svelte:fragment slot="header">
			<slot name="header" {nftContractsWithBalances} {summary}></slot>
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
					nftContractsWithBalances.filter(({ nfts }) => nfts?.length > 0)
					as {
						name, address, symbol, ercTokenStandards,
						balance,
						metadata,
						nfts
					},
					i (address || symbol || name)
				}
					<div class="nft-contract card column"
						class:is-single={nfts ? nfts.length <= 1 : true}
						tabIndex={show3D ? 0 : undefined}
						animate:flip|local={{duration: 500, delay: Math.abs(i) * 10, easing: quintOut}}
						draggable={true}
					>
						{#if metadata.bannerImage && !show3D}
							<img class="cover-image" src={metadata.bannerImage} on:error={e => e.target.hidden = true} />
						{/if}

						<header class="column">
							<div class="bar">
								<h5 class="row">
									{#if metadata.logoImage}
										<img src={metadata.logoImage} height="24" style="width: fit-content" on:error={e => e.target.hidden = true} />
									{/if}
									<span>
										<Address {network} {address} let:formattedAddress>{name || formattedAddress}</Address>
										{#if nfts.length > 1}({nfts.length}){/if}
									</span>
								</h5>
								{#if ercTokenStandards?.length}
									<span class="card-annotation">{ercTokenStandards.join('/')}</span>
								{/if}
							</div>
							{#if showNFTMetadata}
								{#if metadata?.description}<p>{metadata.description}</p>{/if}
							{/if}
						</header>

						{#if nfts}
							<hr />

							<div class="nfts" class:scrollable-list={isScrollable && nfts?.length > 3 && !show3D}>
								{#each nfts as {
									tokenId, tokenUri,
									ercTokenStandards,
									metadata,
									burned,
									erc1155Balance,
								}}
									{#if metadata}
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
													href={tokenUri || metadata?.external_url}
													target="_blank"
													draggable={false}
												> -->
													<picture
														title={
															[
																[formatNFTNameAndTokenID(name, tokenId), metadata.name],
																[metadata.description],
																metadata.attributes.map(({traitType, value}) => `${traitType}: ${value}`)
															].map(section => section.filter(Boolean).join('\n')).filter(Boolean).join('\n\n')
														}
													>
														{#if metadata.image}<source src={metadata.image} />{/if}
														{#if metadata.image_256}<source src={metadata.image_256} media="(min-width: 256px)" />{/if}
														{#if metadata.image_512}<source src={metadata.image_512} media="(min-width: 512px)" />{/if}
														{#if metadata.image_1024}<source src={metadata.image_1024} media="(min-width: 1024px)" />{/if}
														<img
															class="nft-image"
															src={metadata.image_256 || metadata.image}
															alt={formatNFTNameAndTokenID(metadata.name, tokenId)}
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
														<header class="bar">
															<div class="nft-name" class:row-inline={!showImagesOnly}>
																{#if metadata.name}<h6>{metadata.name}</h6>{/if}
																{#if erc1155Balance > 1}
																	<span class="nft-count">×{erc1155Balance}</span>
																{/if}
															</div>
															{#if String(tokenId).length < 6}
																<span class="card-annotation token-id">#{tokenId}</span>
															{/if}
														</header>
														{#if showNFTMetadata}
															{#if metadata.description}
																<p class="description">{metadata.description}</p>
															{/if}
															{#if metadata.attributes.length}
																<dl class="attributes">
																	{#each metadata.attributes as {traitType, value}}
																		<dt>{traitType}</dt>
																		<dd>{value}</dd>
																	{/each}
																</dl>
															{/if}
														{/if}
													</figcaption>
												</figure>
											</SizeContainer>
									{:else}
										<div class="nft column" title={`${name ? `${name} ` : ''}#${tokenId}`}>
											<div class="nft-image" />
											<span class="card-annotation token-id">#{tokenId}</span>
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
{:else if nftProvider === 'NFTPort'}
	<Loader
		loadingIcon={NFTPortIcon}
		loadingIconName={nftProvider}
		loadingMessage="Retrieving {network.name} NFTs from {nftProvider}..."
		errorMessage="Error retrieving {network.name} NFTs from {nftProvider}"
		fromUseQuery={
			useQuery({
				queryKey: ['NFTs', {
					nftProvider,
					address,
					chainID: network.chainId,
					quoteCurrency: quoteCurrency
				}],
				queryFn: async () => {
					const chain = networkSlugToNftportChain[network.slug]
					if(!chain)
						throw new Error(`NFTPort does not support the ${network.name} network.`)

					return await Promise.all([
						NftportApi.v0.accountNftsV0AccountsAccountAddressGet({
							accountAddress: address,
							include: ['default', 'metadata', 'contract_information'],
							chain
						}),
						NftportApi.v0.accountContractsV0AccountsContractsAccountAddressGet({
							accountAddress: address,
							type: 'owns_contract_nfts',
							include: ['default', 'metadata', 'contract_information'],
							chain
						})
					])
					//
				}
			})
		}
		then={([nftsResponse, nftContractsResponse]) => (
			normalizeNftportNftsAndContracts({nftsResponse, nftContractsResponse})
		)}
		bind:result={nftContractsWithBalances}
		{isCollapsed}
	>
		<svelte:fragment slot="header">
			<slot name="header" {nftContractsWithBalances} {summary}></slot>
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
					nftContractsWithBalances.filter(({ nfts }) => nfts?.length > 0)
					as {
						name, address, symbol, ercTokenStandards,
						balance,
						metadata,
						nfts,
					},
					i (address || symbol || name)
				}
					<div class="nft-contract card column"
						class:is-single={nfts ? nfts.length <= 1 : true}
						tabIndex={show3D ? 0 : undefined}
						animate:flip|local={{duration: 500, delay: Math.abs(i) * 10, easing: quintOut}}
						draggable={true}
					>
						{#if metadata.bannerImage}
							<img class="cover-image" src={metadata.bannerImage} on:error={e => e.target.hidden = true} />
						{/if}

						<header class="column">
							<div class="bar">
								<h5 class="row">
									{#if metadata.logoImage}
										<img class="nft-contract-logo" src={metadata.logoImage} on:error={e => e.target.hidden = true} />
									{/if}
									<span>
										<Address {network} {address} let:formattedAddress>{name || formattedAddress}</Address>
										{#if nfts.length > 1}({nfts.length}){/if}
									</span>
								</h5>
								{#if ercTokenStandards?.length}
									<span class="card-annotation">{ercTokenStandards.join('/')}</span>
								{/if}
							</div>
							{#if showNFTMetadata}
								{#if metadata?.description}<p>{metadata.description}</p>{/if}
							{/if}
						</header>

						{#if nfts}
							<hr />

							<div class="nfts" class:scrollable-list={isScrollable && nfts?.length > 3 && !show3D}>
								{#each nfts as {
									tokenId,
									name,
									description,
									image,
									metadata
								}}
									<SizeContainer contentsOnly={showImagesOnly}>
										<figure
											class="nft"
											class:column={!showImagesOnly}
											class:stack={showImagesOnly}
											draggable={true}
											tabIndex={0}
										>
											<picture
												title={
													[
														[formatNFTNameAndTokenID(name, tokenId), name],
														[description],
													].map(section => section.filter(Boolean).join('\n')).filter(Boolean).join('\n\n')
												}
											>
												<img
													class="nft-image"
													src={image}
													alt={formatNFTNameAndTokenID(name, tokenId)}
													loading="lazy"
													on:load={e => {
														const [w, h] = findClosestAspectRatio(e.target.naturalWidth / e.target.naturalHeight)
														const figure = e.target.closest('figure')
														figure.style.setProperty('--grid-item-width', w)
														figure.style.setProperty('--grid-item-height', h)
													}}
													draggable={false}
												/>
											</picture>
											<figcaption class="column">
												<header class="bar">
													<div class="nft-name" class:row-inline={!showImagesOnly}>
														{#if name}<h6>{name}</h6>{/if}
													</div>
													{#if String(tokenId).length < 6}
														<span class="card-annotation token-id">#{tokenId}</span>
													{/if}
												</header>
												{#if showNFTMetadata}
													{#if description}
														<p class="description">{description}</p>
													{/if}
													{#if metadata?.attributes.length}
														<dl class="attributes">
															{#each metadata.attributes as {traitType, value}}
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
	</Loader>
{/if}
