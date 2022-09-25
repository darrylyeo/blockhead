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

	type integer = number
	type ERCTokenStandard = 'erc20' | 'erc721' | 'erc1155'
	type NftAttribute = {
		key?: string
		display_type?: string
		trait_type: string
		value: string | number
	}
	type NFT = {
		token_id: integer
		token_url: string
		name: string
		description: string
		image: string
		owner: string
		attributes: NftAttribute[]
	}
	type NFTContract = {
	  type: 'nft'
		contract_address: Ethereum.ContractAddress
		nft_data: NFT[]
		contract_name?: string
		contract_ticker_symbol?: TickerSymbol
		supports_erc: ERCTokenStandard[]
	}

	let sortFunction: (a: Covalent.ERC20TokenOrNFTContractWithBalance, b: Covalent.ERC20TokenOrNFTContractWithBalance) => number
	$: sortFunction =
		sortBy === 'value-descending' ? (a, b) => b.quote - a.quote || b.balance - a.balance :
		sortBy === 'value-ascending' ? (a, b) => a.quote - b.quote || a.balance - b.balance :
		sortBy === 'ticker-ascending' ? (a, b) => a.contract_ticker_symbol?.localeCompare(b.contract_ticker_symbol) :
		undefined


	export let balances: Covalent.NFTContractWithBalance[] = []
	export let nftContracts: NFTContract[] = []

	export let summary: {
		quoteTotal: number,
		quoteCurrency: QuoteCurrency,
		nftContractsCount: number,
		nftsCount: number,
	}
	$: summary = balances.length
		? {
			quoteTotal: balances.reduce((sum, item) => sum + item.quote, 0),
			quoteCurrency,
			nftContractsCount: balances.length,
			nftsCount: balances.reduce((sum, item) => sum + (item.nft_data?.length ?? 0), 0)
		}
		: undefined

	const parseNFTAttributes = (attributes: Covalent.NFTAttributes | null): NftAttribute[] => (
		!attributes ?
			[]
		: Array.isArray(attributes) ?
			attributes
		:
			Object.entries(attributes).map(([trait_type, value]) => ({trait_type, value}))
	)

	const networkSlugToNftportChain: Record<Ethereum.NetworkName, Nftport.AccountRequestSupportedChain> = {
		'ethereum': 'ethereum',
		'polygon': 'polygon',
		'ethereum-rinkeby': 'rinkeby',
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
		loadingIcon={'/logos/Covalent.svg'}
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
				.map(nftContract => ({
					...nftContract,
					supports_erc: nftContract.supports_erc?.filter(erc => erc !== 'erc20')
				}))
				.sort(sortFunction)
		)}
		bind:result={balances}
		{isCollapsed}
	>
		<svelte:fragment slot="header">
			<slot name="header" {balances} {summary}></slot>
		</svelte:fragment>

		{#if balances}
			<div
				class="nft-contracts column"
				class:scrollable-list={(isScrollable && balances?.length > 3) || show3D}
				class:showImagesOnly
				class:show3D
			>
			<!-- on:contextmenu={() => showImagesOnly = !showImagesOnly}
			on:dblclick={() => show3D = !show3D} -->
				{#each
					balances.filter(({ nft_data }) => nft_data?.length > 0)
					as {balance, contract_name, contract_address, contract_ticker_symbol, logo_url, nft_data, supports_erc},
					i (contract_address || contract_ticker_symbol || contract_name)
				}
					<div class="nft-contract card column"
						class:is-single={nft_data ? nft_data.length <= 1 : true}
						tabIndex={show3D ? 0 : undefined}
						animate:flip|local={{duration: 500, delay: Math.abs(i) * 10, easing: quintOut}}
						draggable={true}
					>
						<header class="bar">
							<h4>
								<Address {network} address={contract_address} let:formattedAddress>{contract_name || formattedAddress}</Address>
								{#if balance > 1}({balance}){/if}
							</h4>
							{#if supports_erc?.length}
								<span class="card-annotation">{supports_erc.join('/')}</span>
							{/if}
						</header>

						{#if nft_data}
							<hr />

							<div class="nfts" class:scrollable-list={isScrollable && nft_data?.length > 3 && !show3D}>
								{#each nft_data as {token_id, token_url, token_balance, external_data, supports_erc, burned}}
									{#if external_data}
										{#each [parseNFTAttributes(external_data?.attributes)] as attributes}
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
														href={token_url || external_data?.external_url}
														target="_blank"
														draggable={false}
													> -->
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
																draggable={false}
															/>
															<!-- <img class="nft-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt={formatNFTNameAndTokenID(external_data.name, token_id)} /> -->
														</picture>

														<!-- {#if external_data.animation_url}
															<iframe src={external_data.animation_url} lazy="true" />
														{/if} -->
													<!-- </a> -->
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
														{#if showNFTMetadata}
															{#if external_data.description}
																<p class="description">{external_data.description}</p>
															{/if}
															{#if attributes.length}
																<dl class="attributes">
																	{#each attributes as {trait_type, value}}
																		<dt>{trait_type}</dt>
																		<dd>{value}</dd>
																	{/each}
																</dl>
															{/if}
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
{:else if nftProvider === 'NFTPort'}
	<Loader
		loadingIcon={'/logos/NFTPort.svg'}
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
		then={([nftsResponse, nftContractsResponse]) => {
			// const contractsByAddress: Map<string, NFTContract> = new Map<string, NFTContract>()
			const contractsByAddress = Object.fromEntries(
				nftContractsResponse.contracts.map(nftContract => [
					nftContract.address,
					{
						contract_address: nftContract.address,
						contract_name: nftContract.name,
						contract_ticker_symbol: nftContract.symbol,
						supports_erc: [nftContract.type?.toLowerCase()], // as ERCTokenStandard[]
						metadata: nftContract.metadata,
					}
				])
			)

			const nftsByContractAddress = {}

			for(const nft of nftsResponse.nfts){
				// const nftContract: NFTContract | undefined = contractsByAddress[nft.contract_address]
				const nfts = nftsByContractAddress[nft.contract_address] ||= []

				nfts.push({
					token_id: Number(nft.token_id),
					token_url: nft.metadata_url,
					name: nft.name || nft.metadata?.['name'],
					description: nft.description || nft.metadata?.['description'],
					image: parseIpfs(nft.cached_file_url || nft.file_url || nft.metadata?.['image'] || nft.metadata?.['ipfs_image'] || nft.metadata?.['google_image']),
					owner: address,
					attributes: parseNFTAttributes(nft.metadata?.['attributes']),
				})

				// contractsByAddress[nft.contract_address] = {
				// 	contract_address: nft.contract_address,
				// 	contract_name: nft.contract?.name,
				// 	contract_ticker_symbol: nft.contract?.symbol,
				// 	supports_erc: nft.contract?.type && [nft.contract.type.toLowerCase()], // as ERCTokenStandard[]
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
				...contractsByAddress[contractAddress],
				nft_data: nfts
			}))

			return Object.entries(contractsByAddress).map(([contractAddress, contract]) => ({
				...contract,
				nft_data: nftsByContractAddress[contractAddress]
			}))
		}}
		bind:result={nftContracts}
		{isCollapsed}
	>
		<svelte:fragment slot="header">
			<slot name="header" {nftContracts} {summary}></slot>
		</svelte:fragment>

		{#if nftContracts}
			<div
				class="nft-contracts column"
				class:scrollable-list={(isScrollable && nftContracts?.length > 3) || show3D}
				class:showImagesOnly
				class:show3D
			>
			<!-- on:contextmenu={() => showImagesOnly = !showImagesOnly}
			on:dblclick={() => show3D = !show3D} -->
				{#each
					nftContracts.filter(({ nft_data }) => nft_data?.length > 0)
					as {contract_name, contract_address, contract_ticker_symbol, nft_data, supports_erc, metadata},
					i (contract_address || contract_ticker_symbol || contract_name)
				}
					<div class="nft-contract card column"
						class:is-single={nft_data ? nft_data.length <= 1 : true}
						tabIndex={show3D ? 0 : undefined}
						animate:flip|local={{duration: 500, delay: Math.abs(i) * 10, easing: quintOut}}
						draggable={true}
					>
						{#if metadata?.banner_url || metadata?.cached_banner_url}
							<img class="cover-image" src={metadata.banner_url || metadata.cached_banner_url} />
						{/if}

						<header class="column">
							<div class="bar">
								<div class="row">
									{#if metadata?.thumbnail_url || metadata?.cached_thumbnail}
										<img src={metadata.thumbnail_url || metadata.cached_thumbnail} height="24" style="width: fit-content" />
									{/if}
									<h4>
										<Address {network} address={contract_address} let:formattedAddress>{contract_name || formattedAddress}</Address>
										{#if nft_data.length > 1}({nft_data.length}){/if}
									</h4>
								</div>
								{#if supports_erc?.length}
									<span class="card-annotation">{supports_erc.join('/')}</span>
								{/if}
							</div>
							{#if showNFTMetadata}
								{#if metadata?.description}<p>{metadata.description}</p>{/if}
							{/if}
						</header>

						{#if nft_data}
							<hr />
							<div class="nfts" class:scrollable-list={isScrollable && nft_data?.length > 3 && !show3D}>
								{#each nft_data as {token_id, name, description, image, attributes}}
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
														[formatNFTNameAndTokenID(contract_name, token_id), name],
														[description],
													].map(section => section.filter(Boolean).join('\n')).filter(Boolean).join('\n\n')
												}
											>
												<img
													class="nft-image"
													src={image}
													alt={formatNFTNameAndTokenID(name, token_id)}
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
														{#if name}<h5>{name}</h5>{/if}
													</div>
													{#if String(token_id).length < 6}
														<span class="card-annotation token-id">#{token_id}</span>
													{/if}
												</header>
												{#if showNFTMetadata}
													{#if description}
														<p class="description">{description}</p>
													{/if}
													{#if attributes.length}
														<dl class="attributes">
															{#each attributes as {trait_type, value}}
																<dt>{trait_type}</dt>
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
