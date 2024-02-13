<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { IpfsGatewayProvider } from '$/data/ipfsGateways'


	// Context
	import type { load } from './page.opengraph'

	$: ({
		data: {
			network,
			nftContractsWithBalances,
			hasMore,
			summary,
		},
	} = $$props as {
		data: Awaited<ReturnType<typeof load>>
	})

	let collectionsSortFunction = (a: Ethereum.NftContractWithNfts, b: Ethereum.NftContractWithNfts) => (b.conversion?.value ?? 0) - (a.conversion?.value ?? 0)


	// Functions
	import { formatValue } from '$/utils/formatValue'


	// Components
	import NftImage from '$/components/NftImage.svelte'
</script>


<section class="layout">
	<header class="row">
		<h3>{network.name} NFTs</h3>

		{#if summary}
			<span class="summary row">
				{#if summary.quoteTotal}
					<strong>
						{formatValue(
							summary.quoteTotal,
							{
								compactLargeValues: true,
								currency: 'USD',
							},
						)}
					</strong>

					<span role="separator" />
				{/if}

				<span class="row inline">
					<strong>
						{formatValue(
							summary.nftsCount,
							{
								compactLargeValues: true,
							},
						)}
					</strong>{#if hasMore}+{/if}

					NFTs
				</span>
			</span>
		{/if}
	</header>

	<section class="card row">
		<div class="masonry">
			{#each (
				nftContractsWithBalances
					?.sort(collectionsSortFunction)
					.filter(({ nfts }) => nfts && nfts.length > 0)
				?? []
			).slice(0, 35) as contract}
				{#each (contract.nfts ?? []) as nft}
					<NftImage
						{nft}
						width={160}
						ipfsGateway={IpfsGatewayProvider.Cloudflare}
					/>
				{/each}
			{/each}
		</div>
	</section>
</section>


<style>
	.layout {
		height: 100%;

		display: flex;
		flex-direction: column;
		row-gap: 1em;

		font-size: 1.3em;
	}

	.card {
		flex-shrink: 1;
		flex-grow: 1;

		padding: 0;
		overflow: hidden;
	}
	.masonry {
		margin: -3em 0;

		display: flex;
		flex-direction: column;
		column-gap: 2px;
		row-gap: 2px;
		flex-wrap: wrap;
		justify-content: center;
		align-content: center;
	}
	.masonry > :global(*) {
		flex: 0 1 auto;
		overflow: hidden;
		border-radius: 8px;
	}

	.summary {
		column-gap: 0.5em;
		color: rgba(255, 255, 255, 0.5);
	}
	.summary strong {
		color: rgba(255, 255, 255, 1);
	}
	[role="separator"] {
		display: block;
		align-self: stretch;
		border-left: 2px solid white;
		opacity: 0.75;
	}
</style>
