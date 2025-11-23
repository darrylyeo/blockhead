<script lang="ts">
	// Types/constants
	import { EthereumMainnet } from '$/data/Network'


	// Props
	let { 
		network = EthereumMainnet,
	} = $props()


	// Queries
	import { getLatestBlocks } from '$/data/Viem.remote.ts'


	// State
	let bucketLength = $state<number>(5 * 60 * 1000) // Default: 5 minutes in milliseconds


	// Components
	import { Line, Area, AxisX, AxisY, GridY, RuleY, BarY, binX } from 'svelteplot'
	import Chart from '$/components/Chart.svelte'
</script>


<article
	data-column="gap-0"
>
	<header
		data-sticky="inline"
		data-scroll-item="inline-detached padding-match-start padding-match-end"
	>
		<h2>Blockchain Timeline</h2>
	</header>

	{#if true}
		{@const blocks = await getLatestBlocks({
			network: network.$id,
			count: 50
		})}

		{#if blocks && Array.isArray(blocks) && blocks.length > 0}
			{@const reversedBlocks = [...blocks].reverse()}

			<div
				data-column="gap-6"
			>
				<section
					data-scroll-item="inline-detached"
					data-column="gap-0"
				>
					<Chart title="Gas Used (Last 50 Blocks)">
						<AxisX
							position="bottom"
							title="Time"
							removeDuplicateTicks={true}
						/>
						<AxisY
							title="Gas"
						/>
						<GridY />
						<Area
							data={reversedBlocks}
							x1={b => new Date(b.$fields.timestamp)}
							y1={0}
							y2={b => Number(b.$fields.gasUsed)}
							fill="#8884d8"
							fillOpacity={0.3}
						/>
						<Line
							data={reversedBlocks}
							x={b => new Date(b.$fields.timestamp)}
							y={b => Number(b.$fields.gasUsed)}
							stroke="#8884d8"
						/>
						<RuleY
							data={[{ y: 30_000_000 }]}
							y={d => d.y}
							stroke="red"
							strokeDasharray="4"
						/>
					</Chart>
				</section>

				<section
					data-scroll-item="inline-detached"
					data-column="gap-0"
				>
					<Chart title="Base Fee (Gwei)">
						<AxisX
							position="bottom"
							title="Time"
							removeDuplicateTicks={true}
						/>
						<AxisY
							title="Gwei"
						/>
						<GridY />
						<Line
							data={reversedBlocks}
							x={b => new Date(b.$fields.timestamp)}
							y={b => Number(b.$fields.baseFeePerGas || 0n) / 1e9}
							stroke="#82ca9d"
							strokeWidth={2}
						/>
					</Chart>
				</section>

				<!-- <section
					data-scroll-item="inline-detached"
					data-column="gap-0"
				>
					<Chart
						title="Gas Used Over Time (Binned)"
						{bucketOptions}
						bind:bucketLength
					>
						{#if blocks && Array.isArray(blocks) && blocks.length > 0}
							{@const binnedData = binX(
								{
									data: reversedBlocks,
									x: b => new Date(b.$fields.timestamp),
									y: b => Number(b.$fields.gasUsed),
									thresholds: bucketLength,
								},
								{
									y: 'sum',
								}
							)}
							<AxisX
								position="bottom"
								title="Time"
								data={reversedBlocks}
								x={b => new Date(b.$fields.timestamp)}
								removeDuplicateTicks={true}
							/>
							<AxisY
								title="Total Gas Used"
							/>
							<GridY />
							<BarY
								{...binnedData}
								fill="#82ca9d"
								fillOpacity={0.8}
							/>
						{/if}
					</Chart>
				</section> -->

				<!-- <details
					data-scroll-item="inline-detached padding-match-end"
					data-card="secondary"
				>
					<summary>Raw Data (Latest Block)</summary>
					<pre>{JSON.stringify(
						blocks[0],
						(key, value) => typeof value === 'bigint' ? value.toString() : value,
						2
					)}</pre>
				</details> -->
			</div>
		{:else}
			<p data-scroll-item="inline-detached padding-match-end">No blocks available</p>
		{/if}
	{/if}
</article>
