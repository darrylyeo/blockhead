<script lang="ts">
	// Context
	import type { load } from './page.opengraph'

	$: ({
		data: {
			tokensCount,
			nftContractsCount,
			nftContractsHasMore,
			nftsCount,
		},
	} = $$props as {
		data: Awaited<ReturnType<typeof load>>
	})


	// Components
	import FormattedNumber from '$/components/FormattedNumber.svelte'
</script>


<section class="layout card">
	<span class="summary row">
		{#if tokensCount}
			<span class="row inline">
				<strong>
					<FormattedNumber
						value={tokensCount}
					/>
				</strong>

				tokens
			</span>

			<span role="separator" />
		{/if}

		{#if nftContractsCount}
			<span class="row inline">
				{#if nftsCount}
					<span>
						<strong>
							<FormattedNumber
								value={nftsCount}
							/>
						</strong>
						{#if nftContractsHasMore}+{/if}
					</span>
				{/if}

				NFTs from

				{#if nftContractsCount}
					<span>
						<strong>
							<FormattedNumber
								value={nftContractsCount}
							/>
						</strong>
						{#if nftContractsHasMore}+{/if}
					</span>

					contracts
				{/if}
			</span>
		{/if}
	</span>
</section>


<style>
	section {
		flex: 1;

		justify-content: center;
		align-content: center;

		font-size: 2em;
	}

	.summary {
		margin: auto;
	}
</style>
