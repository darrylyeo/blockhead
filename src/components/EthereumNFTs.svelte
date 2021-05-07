<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { Covalent } from '../data/analytics/covalent'
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import type { QuoteCurrency, TickerSymbol } from '../data/currency/currency'
	import { getTokenAddressBalances } from '../data/analytics/covalent'

	export let network: Ethereum.Network
	export let address: string
	export let analyticsProvider: AnalyticsProvider
	export let quoteCurrency: QuoteCurrency
	export let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending'
	export let showNFTMetadata = false
	export let showValues

	export let quoteTotal
	export let nftContractCount
	export let nftCount

	export let isCollapsed: boolean


	let filterFunction: (b: Covalent.ERC20TokenOrNFTContractWithBalance) => boolean
	$: filterFunction =
		b => b.type === 'nft'

	let sortFunction: (a: Covalent.ERC20TokenOrNFTContractWithBalance, b: Covalent.ERC20TokenOrNFTContractWithBalance) => number
	$: sortFunction =
		sortBy === 'value-descending' ? (a, b) => b.quote - a.quote || b.balance - a.balance :
		sortBy === 'value-ascending' ? (a, b) => a.quote - b.quote || a.balance - b.balance :
		sortBy === 'ticker-ascending' ? (a, b) => a.contract_ticker_symbol.localeCompare(b.contract_ticker_symbol) :
		undefined


	$: getBalancesPromise = getTokenAddressBalances({address, nft: true, chainID: network.chainId, quoteCurrency: quoteCurrency})
	export let balances: Covalent.NFTContractWithBalance[] = []
	$: getBalancesPromise.then(balances => (filterFunction ? balances.items.filter(filterFunction) : balances.items).sort(sortFunction) as Covalent.NFTContractWithBalance[])
		.then(_ => balances = _)

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
	

	import Address from './Address.svelte'
	import Loader from './Loader.svelte'
	import { flip } from 'svelte/animate'
	import { quintOut } from 'svelte/easing'
</script>

<style>
	.nft-contracts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
		grid-auto-flow: dense;
	}
	.nft-contract:not(.is-single) {
		grid-column: 1 / -1;
	}

	.nfts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
		grid-template-rows: masonry;
		align-items: stretch;

		--padding-inner: 1.5em;
		gap: var(--padding-inner);
	}

	.nft-image {
		width: 100%;
		border-radius: 0.33em;
		margin: auto;
		background-color: rgba(0, 0, 0, 0.1);
		object-fit: contain;
		aspect-ratio: 1;
	}

	.nft {
		--padding-inner: 0.75em;
		gap: var(--padding-inner);
	}
	.nft header {
		row-gap: 0.15em;
	}
	.nft * {
		overflow: hidden;
		text-overflow: ellipsis;
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
</style>

{#if address}
	<Loader
		loadingIcon={'/logos/covalent-logomark.svg'}
		loadingIconName={'Covalent'}
		loadingMessage="Retrieving {network.name} NFTs from {analyticsProvider}..."
		errorMessage="Error retrieving {network.name} NFTs from {analyticsProvider}"
		fromPromise={() => getBalancesPromise}
		showIf={() => balances.length}
		{isCollapsed}
	>
		<svelte:fragment slot="header">
			{#if balances.length}
				<slot name="header" {network} {quoteCurrency} {quoteTotal} {nftContractCount} {nftCount}></slot>
			{/if}
		</svelte:fragment>

		{#if balances}
			<div class="nft-contracts column">
				{#each
					balances
					as {balance, contract_name, contract_address, contract_ticker_symbol, logo_url, nft_data, supports_erc},
					i (contract_address || contract_ticker_symbol || contract_name)
				}
					<div class="nft-contract card column"
						class:is-single={nft_data?.length <= 1}
						animate:flip|local={{duration: 500, delay: Math.abs(i) * 10, easing: quintOut}}
					>
						<div class="bar">
							<h4><Address {network} address={contract_address} let:formattedAddress>{contract_name || formattedAddress}</Address> ({balance})</h4>
							{#each [supports_erc.filter(erc => erc !== 'erc20')] as supports_erc}
								{#if supports_erc?.length}
									<span class="card-annotation">{supports_erc.filter(erc => erc !== 'erc20').join('/')}</span>
								{/if}
							{/each}
						</div>
						{#if nft_data}
							<hr>
							<div class="nfts" class:scrollable-list={nft_data?.length > 3}>
								{#each nft_data as {token_id, token_url, external_data, supports_erc}}
									{#if external_data}
										{#each [parseNFTAttributes(external_data.attributes)] as attributes}
											<article class="nft column" title={
												[
													[`${contract_name ? `${contract_name} ` : ''}#${token_id}`, external_data.name],
													[external_data.description],
													attributes.map(({trait_type, value}) => `${trait_type}: ${value}`)
												].map(section => section.filter(Boolean).join('\n')).filter(Boolean).join('\n\n')
											}>
												<a class="bar" href={token_url || external_data?.external_url} target="_blank">
													{#if external_data.image}
														<img class="nft-image" src={external_data.image} alt={external_data.name} loading="lazy" />
													{/if}
												</a>
												<header class="bar">
													<h5>{external_data.name}</h5>
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
											</article>
										{/each}
									{:else}
										<div class="nft" title={`${contract_name ? `${contract_name} ` : ''}#${token_id}`}>
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
