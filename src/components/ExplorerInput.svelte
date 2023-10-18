<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'

	import type { ExplorerInputParams } from '../routes/explorer/_explorerParams'
	import { ExplorerQueryType, explorerQuery, getExplorerQueryType } from '../routes/explorer/_explorerContext'

	import { InputPattern, inputPatternsConfig } from '../data/inputPatterns'


	// Context
	import { accountConnections } from '../state/account'

	import { getLocalPortfolios } from '../state/portfolio-accounts'
	const localPortfolios = getLocalPortfolios()

	import { localStorageWritable } from '../utils/localStorageWritable'
	const history = localStorageWritable<string[]>('ExplorerInput/history', [])


	// Inputs
	export let inputPatterns: InputPattern[] = Object.values(InputPattern)
	export let required = false
	export let autofocus = false
	export let placeholder = inputPatterns
		.map(type => `${inputPatternsConfig[type].label} (${inputPatternsConfig[type].placeholder})`)
		.join(' / ')

	export let network: Ethereum.Network


	// Functions
	import { isTruthy } from '../utils/isTruthy'

	import { findMatchedCaptureGroupName } from '../utils/findMatchedCaptureGroup'

	const findPatternMatches = (value: string, pattern: RegExp) =>
		(pattern.global ? [...value.matchAll(pattern)] : [value.match(pattern)].filter(isTruthy))
			.flatMap(match =>
				Object.entries(match.groups ?? {})
					.map(([groupName, match]) => ({ inputPattern: groupName as InputPattern, match }))
					.filter(({match}) => match)
			)


	// Shared state
	export let explorerInputParams: ExplorerInputParams
	export let explorerQueryType: ExplorerQueryType = ExplorerQueryType.None
	export let value: string
	// (Computed)
	$: value = $explorerQuery
	$: explorerInputParams = value.match(pattern)?.groups ?? {}
	$: explorerQueryType = getExplorerQueryType(explorerInputParams)


	// Internal state
	// (Computed)
	$: pattern = new RegExp(`^(?:${
		inputPatterns
			.sort((a, b) => inputPatternsConfig[b].matchComplexity - inputPatternsConfig[a].matchComplexity)
			.map(inputPattern => `(?<${inputPattern}>${inputPatternsConfig[inputPattern].pattern.source})`)
			.join('|')
	})$`)

	// const subpattern = /(?<address>0x[0-9a-fA-F]{40})|(?<transactionId>0x[0-9a-fA-F]{64})|(?<blockNumber>0|[1-9][0-9]*)|(?<ensName>(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test))/g
	$: subpattern = new RegExp(`(?:${
		inputPatterns
			.sort((a, b) => inputPatternsConfig[b].matchComplexity - inputPatternsConfig[a].matchComplexity)
			.map(inputPattern => `(?<${inputPattern}>${inputPatternsConfig[inputPattern].pattern.source})`)
			.join('|')}
		)`, 'g')

	$: matchedInputPattern = findMatchedCaptureGroupName<InputPattern>(pattern, value) ?? ''	


	// Actions
	import { afterNavigate } from '$app/navigation'

	afterNavigate(() => {
		$history = [...new Set([value, ...$history])]
	})
</script>


<style>
	[data-matched-input-pattern="address"],
	[data-matched-input-pattern="blockNumber"],
	/* [data-matched-input-pattern="ensName"], */
	[data-matched-input-pattern="transactionId"] {
		font-family: var(--monospace-fonts);
	}
</style>


<input
	type="search"
	bind:value
	{required}
	{autofocus}
	{placeholder}
	pattern={pattern.source}
	data-matched-input-pattern={matchedInputPattern}
	list="ExplorerInputList"
	on:focus={e => e.target.select()}
/>

<datalist id="ExplorerInputList">
	{#each findPatternMatches(value, subpattern) as { inputPattern, match }}
		<option
			value={match}
			label={inputPatternsConfig[inputPattern].label}
		/>
	{/each}

	{#if $localPortfolios.length}
		{#each $localPortfolios as {name, accounts}, i (i)}
			<optgroup label={name}>
				{#each accounts as account}
					{@const _value = account.id}
					{@const inputPattern = inputPatternsConfig[findPatternMatches(_value, subpattern)[0]?.inputPattern]}
					<option
						value={_value}
						label={`Portfolio › ${name}${inputPattern ? ` │ ${network ? `${network.name} › ` : ''}${inputPattern.label}` : ''}`}
					/>
				{/each}
			</optgroup>
		{/each}
	{/if}

	{#if $accountConnections?.length}
		<optgroup label="Connected Accounts">
			{#each $accountConnections as accountConnection}
				{#if accountConnection.state?.account?.address}
					<option
						value={accountConnection.state.account.address}
						label={accountConnection.walletType}
					/>
				{/if}
			{/each}
		</optgroup>
	{/if}

	<optgroup label="History">
		{#each
			$history
				.map(value => ({
					value,
					match: findPatternMatches(value, pattern)[0],
				}))
				.filter(({ match }) => match)
		as
			{ value: _value, match }
		}
			{@const inputPattern = inputPatternsConfig[match.inputPattern]}

			<!-- {#if _value !== value}
				<option value={_value} />
			{/if} -->
			<option
				value={_value}
				label={`History${inputPattern ? ` │ ${network ? `${network.name} › ` : ''}${inputPattern.label}` : ''}`}
			/>
				<!-- label={
					inputPattern
						// ? `${inputPattern.label} (Explore › History)`
						// ? `Explore › History (${inputPattern.label})`
						? `Explore › History │ ${inputPattern.label}`
						: 'Explore › History'
				} -->
		{/each}
	</optgroup>
</datalist>
