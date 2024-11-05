<script lang="ts">
	// Types
	import type { Ethereum } from '$/data/networks/types'


	// Inputs
	export let network: Ethereum.Network
	export let trace: Ethereum.Trace
	export let contextualAddress: Ethereum.Address | undefined
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 5

	// Internal state
	export let depth = 0

	$: isExhaustive = detailLevel === 'exhaustive'
	$: contextIsSender = contextualAddress && trace.action.fromAddress.toLowerCase() === contextualAddress.toLowerCase()
	$: contextIsReceiver = contextualAddress && trace.action.toAddress.toLowerCase() === contextualAddress.toLowerCase()


	// Components
	import AddressWithLabel from './AddressWithLabel.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'
	import Collapsible from './Collapsible.svelte'
	import TweenedNumber from './TweenedNumber.svelte'
</script>


<div class="card">
	<Collapsible
		isOpen
		canToggle={Boolean(trace.subtraces?.length)}
		showTriggerText={false}
		class="column"
	>
		<svelte:fragment slot="title">
			<header class="bar">
				<svelte:element this={`h${headingLevel}`} class="row">
					<span class="addresses">
						{#if !(detailLevel === 'summary' && (contextIsSender || contextIsReceiver))}
							<span class="sender" class:mark={contextIsSender}>
								<AddressWithLabel
									{network}
									address={trace.action.fromAddress}
									format={isExhaustive ? 'both' : 'label'}
									addressFormat="middle-truncated"
								/>
							</span>
						{/if}

						<span class="action">
							{({
								call: 'called',
								staticcall: 'called static method',
							})[trace.action.callType]}
						</span>

						<span class="receiver" class:mark={contextIsReceiver}>
							<AddressWithLabel
								{network}
								address={trace.action.toAddress}
								format={isExhaustive ? 'both' : 'label'}
								addressFormat="middle-truncated"
							/>
						</span>
					</span>

					{#if trace.action.value > 0n}
						for

						<TokenBalanceWithConversion
							{tokenBalanceFormat}
							showDecimalPlaces={isExhaustive ? 9 : 6}
							token={{
								chainId: network.chainId,
								...network.nativeCurrency
							}}
							balance={trace.action.value}
						/>
					{/if}
				</svelte:element>

				<span role="toolbar">
					<TweenedNumber value={Number(trace.result.gasUsed)} /> gas units
					<!-- <TweenedNumber value={Number(trace.result.gasUsed)} /> / <TweenedNumber value={Number(trace.action.gasUnits)} /> gas units -->
				</span>
			</header>
		</svelte:fragment>

		<svelte:fragment slot="header-right">
			<span class="card-annotation">{trace.type}</span>
		</svelte:fragment>

		<!-- {#if isExhaustive}
			<hr>

			<!-- <dl>
				{#if trace.action.input && trace.action.input !== '0x'}
					<dt>Input</dt>
					<dd>
						<output class="scrollable-list">{trace.action.input}</output>
					</dd>
				{/if}

				{#if trace.result.output && trace.result.output !== '0x'}
					<dt>Output</dt>
					<dd>
						<output class="scrollable-list">{trace.result.output}</output>
					</dd>
				{/if}
			</dl> -- >

			<dl>
				{#if trace.action.input && trace.action.input !== '0x'}
					<dt>Input</dt>
					<dd>
						<output class="scrollable-list">{trace.action.input}</output>
					</dd>
				{/if}
			</dl>
		{/if} -->

		{#if trace.subtraces?.length}
			<div class="subtraces column">
				{#each trace.subtraces as subtrace}
					<svelte:self
						{network}
						trace={subtrace}
						{contextualAddress}
						{detailLevel}
						{tokenBalanceFormat}
						depth={depth + 1}
					/>
				{/each}
			</div>
		{/if}

		<!-- {#if isExhaustive}
			<dl>
				{#if trace.result.output && trace.result.output !== '0x'}
					<dt>Output</dt>
					<dd>
						<output class="scrollable-list">{trace.result.output}</output>
					</dd>
				{/if}
			</dl>
		{/if} -->
	</Collapsible>
</div>


<style>
	.subtraces {
		margin-left: calc(0.5 * var(--padding-outer));
		margin-right: calc(-0.25 * var(--padding-outer));
	}

	dl {
		gap: 0.5em;
		grid-template-columns: minmax(min-content, auto) 1fr;
	}
	output.scrollable-list {
		font-size: 0.85em;
	}
</style>
