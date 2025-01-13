<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { StringPattern, stringPatterns } from '$/data/stringPatterns'


	// Context
	import { accountConnectionToInfo } from '$/state/account'

	import { getLocalPortfolios } from '$/state/portfolio-accounts'
	const localPortfolios = getLocalPortfolios()

	import { localStorageWritable } from '$/utils/localStorageWritable'
	const history = localStorageWritable<string[]>('ExplorerInput/history', [])


	// Inputs
	export let inputPatterns: StringPattern[] = Object.values(StringPattern)
	export let required = false
	export let autofocus = false
	export let placeholder: string

	export let network: Ethereum.Network
	
	// (Computed)
	$: placeholder = $$props.placeholder || (
		inputPatterns
			.map(type => `${stringPatterns[type].label} (${stringPatterns[type].placeholder})`)
			.join(' / ')
	)


	// Functions
	import { isTruthy } from '$/utils/isTruthy'

	import { createExactMatcher, createPartialMatcher } from '$/utils/stringPatterns'
	import { findMatchedCaptureGroupName } from '$/utils/findMatchedCaptureGroup'

	const findPatternMatches = (value: string, pattern: RegExp) =>
		(pattern.global ? [...value.matchAll(pattern)] : [value.match(pattern)].filter(isTruthy))
			.flatMap(match =>
				Object.entries(match.groups ?? {})
					.map(([groupName, match]) => ({ inputPattern: groupName as StringPattern, match }))
					.filter(({match}) => match)
			)


	// Shared state
	export let value: string
	export let matchedPatterns: Partial<Record<StringPattern, string>>
	$: matchedPatterns = value.match(exactMatcher)?.groups ?? {}


	// Internal state
	export const datalistId = crypto.randomUUID()

	// (Computed)
	$: patterns = (
		inputPatterns
			.map(inputPattern => ({
				name: inputPattern,
				pattern: stringPatterns[inputPattern].pattern,
				complexity: stringPatterns[inputPattern].complexity,
			}))
	)

	$: exactMatcher = createExactMatcher(patterns)

	$: partialMatcher = createPartialMatcher(patterns)

	$: matchedStringPattern = findMatchedCaptureGroupName<StringPattern>(exactMatcher, value) ?? ''


	// Actions
	import { afterNavigate } from '$app/navigation'

	afterNavigate(() => {
		$history = [...new Set([value, ...$history])]
	})
</script>


<input
	type="search"
	bind:value
	{required}
	{autofocus}
	{placeholder}
	pattern={exactMatcher.source}
	data-matched-input-pattern={matchedStringPattern}
	list={datalistId}
	on:focus={e => e.target.select()}
	style={matchedStringPattern && `--input-annotation: " ${stringPatterns[matchedStringPattern]?.label.toUpperCase()}   │   ✕"`}
/>

<datalist id={datalistId}>
	{#each findPatternMatches(value, partialMatcher) as { inputPattern, match }}
		<option
			value={match}
			label={stringPatterns[inputPattern].label}
		/>
	{/each}

	{#if $localPortfolios.length}
		{#each $localPortfolios as {name, accounts}, i (i)}
			<optgroup label={name}>
				{#each accounts as account}
					{@const _value = account.id}
					{@const inputPattern = stringPatterns[findPatternMatches(_value, partialMatcher)[0]?.inputPattern]}
					<option
						value={_value}
						label={`Portfolio › ${name}${inputPattern ? ` │ ${network ? `${network.name} › ` : ''}${inputPattern.label}` : ''}`}
					/>
				{/each}
			</optgroup>
		{/each}
	{/if}

	{#if $accountConnectionToInfo.size}
		<optgroup label="Connected Accounts">
			{#each $accountConnectionToInfo.values() as accountConnectionInfo}
				{#if accountConnectionInfo.address}
					<option
						value={accountConnectionInfo.address}
						label={`Wallets › ${accountConnectionInfo.walletName}`}
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
					match: findPatternMatches(value, exactMatcher)[0],
				}))
				.filter(({ match }) => match)
		as
			{ value: _value, match }
		}
			{@const inputPattern = stringPatterns[match.inputPattern]}

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


<style>
	[data-matched-input-pattern="address"],
	[data-matched-input-pattern="blockNumber"],
	/* [data-matched-input-pattern="ensName"], */
	[data-matched-input-pattern="filecoinAccountId"],
	[data-matched-input-pattern="filecoinBlockCid"],
	[data-matched-input-pattern="filecoinTipsetCid"],
	[data-matched-input-pattern="filecoinTipsetNumber"],
	[data-matched-input-pattern="filecoinTransactionId"],
	[data-matched-input-pattern="transactionId"] {
		font-family: var(--monospace-fonts);
	}

	[data-matched-input-pattern-name]:after {
		content: attr(data-matched-input-pattern-name);
		color: #000;
		place-self: center end;
		margin-right: 2.25em;

		opacity: 0.4;
		letter-spacing: 0.2ch;
		font-size: 0.8em;
		text-transform: uppercase;
	}

	input::-webkit-search-cancel-button {
		list-style-type: var(--input-annotation, "✕");
		width: auto;
		margin-right: 0.3rem;
		padding: 0.5em;

		font-family: var(--base-fonts);
		color: rgba(0, 0, 0, 0.6);
		letter-spacing: 0.2ch;
		text-indent: 0.2ch;
		font-size: 0.8em;
		line-height: 1;
		text-transform: uppercase;
		white-space: pre;

		background-color: rgba(0, 0, 0, 0.066);
		background-color: color-mix(in oklab, var(--primary-color) 8%, #eee);
		border-radius: 0.33em;
	}

	input::-webkit-textfield-decoration-container {
		width: 100%;
	}
</style>
