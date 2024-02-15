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

	// Internal state
	$: shownContracts = (
		nftContractsWithBalances
			?.sort(collectionsSortFunction)
			.filter(contract => contract.nfts && contract.nfts.length > 0)
	)

	$: nftsCount = shownContracts?.reduce((sum, contract) => sum + contract.nfts.length, 0)

	$: shownNfts = shownContracts
		?.flatMap(contract => (
			contract.nfts
				// .slice(0, Math.ceil(limit * contract.nfts.length / nftsCount) + 1)
		))
		?? []


	// Components
	import FormattedNumber from '$/components/FormattedNumber.svelte'
	import NftImage from '$/components/NftImage.svelte'
</script>


<section class="layout">
	<header class="row">
		<h3>{network.name} NFTs</h3>

		{#if summary}
			<span class="summary row">
				{#if summary.quoteTotal}
					<strong>
						<FormattedNumber
							value={summary.quoteTotal}
						/>
					</strong>

					<span role="separator" />
				{/if}

				<span class="row inline">
					<span>
						<strong>
							<FormattedNumber
								value={nftsCount}
							/>
						</strong>
						{#if hasMore}+{/if}
					</span>

					NFTs
				</span>

				<span role="separator" />

				<span class="row inline">
					<span>
						<strong>
							<FormattedNumber
								value={summary.nftContractsCount}
							/>
						</strong>
					</span>

					collections
				</span>
			</span>
		{/if}
	</header>

	<section class="card row">
		<div class="masonry">
			{#each shownNfts as nft}
				<NftImage
					{nft}
					width={221}
					ipfsGateway={IpfsGatewayProvider.Cloudflare}
				/>
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
		margin: -4em 0;

		display: flex;
		flex-direction: column;
		column-gap: 3px;
		row-gap: 3px;
		flex-wrap: wrap;
		justify-content: center;
		align-content: center;
		justify-items: center;
		align-items: center;
	}
	.masonry > :global(*) {
		flex: 0 1 auto;
		overflow: hidden;
		border-radius: 8px;
	}
</style>
