<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { InputPattern, inputPatternsConfig } from '$/data/inputPatterns'


	// Context
	import { accountConnectionToInfo } from '$/state/account'

	import { getLocalPortfolios } from '$/state/portfolios.svelte'
	const _portfoliosState = getLocalPortfolios()
	const portfoliosState = $derived(_portfoliosState.value)

	import { localStorageWritable } from '$/utils/localStorageWritable'
	const history = localStorageWritable<string[]>('ExplorerInput/history', [])


	// Inputs
	let {
		inputPatterns = Object.values(InputPattern),
		required = false,
		autofocus = false,
		placeholder,
		network,

		// Outputs
		value = $bindable(''),
		matchedPatterns = $bindable({}),
		datalistId = $bindable(crypto.randomUUID())
	}: {
		inputPatterns?: InputPattern[]
		required?: boolean
		autofocus?: boolean
		placeholder?: string
		network?: Ethereum.Network

		// Outputs
		value?: string
		matchedPatterns?: Partial<Record<InputPattern, string>>
		datalistId?: string
	} = $props()

	// (Computed)
	const computedPlaceholder = $derived(
		placeholder || (
			inputPatterns
				.map(type => `${inputPatternsConfig[type].label} (${inputPatternsConfig[type].placeholder})`)
				.join(' / ')
		)
	)


	// Functions
	import { isTruthy } from '$/utils/isTruthy'

	import { findMatchedCaptureGroupName } from '$/utils/findMatchedCaptureGroup'

	const findPatternMatches = (value: string, pattern: RegExp) =>
		(pattern.global ? [...value.matchAll(pattern)] : [value.match(pattern)].filter(isTruthy))
			.flatMap(match =>
				Object.entries(match.groups ?? {})
					.map(([groupName, match]) => ({ inputPattern: groupName as InputPattern, match }))
					.filter(({match}) => match)
			)


	// Internal state
	// (Computed)
	const pattern = $derived(
		new RegExp(`^(?:${
			inputPatterns
				.sort((a, b) => inputPatternsConfig[b].matchComplexity - inputPatternsConfig[a].matchComplexity)
				.map(inputPattern => `(?<${inputPattern}>${inputPatternsConfig[inputPattern].pattern.source})`)
				.join('|')
		})$`)
	)

	// const subpattern = $derived(
	// 	/(?<address>0x[0-9a-fA-F]{40})|(?<transactionId>0x[0-9a-fA-F]{64})|(?<blockNumber>0|[1-9][0-9]*)|(?<ensName>(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test))/g
	// )
	const subpattern = $derived(
		new RegExp(`(?:${
			inputPatterns
				.sort((a, b) => inputPatternsConfig[b].matchComplexity - inputPatternsConfig[a].matchComplexity)
				.map(inputPattern => `(?<${inputPattern}>${inputPatternsConfig[inputPattern].pattern.source})`)
				.join('|')}
			)`, 'g')
	)

	const matchedInputPattern = $derived(
		findMatchedCaptureGroupName<InputPattern>(pattern, value) ?? ''
	)

	// Outputs
	$effect(() => {
		matchedPatterns = value.match(pattern)?.groups ?? {}
	})


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
	placeholder={computedPlaceholder}
	pattern={pattern.source}
	data-matched-input-pattern={matchedInputPattern}
	list={datalistId}
	on:focus={e => e.target.select()}
	style={matchedInputPattern && `--input-annotation: " ${inputPatternsConfig[matchedInputPattern]?.label.toUpperCase()}   │   ✕"`}
/>

<datalist id={datalistId}>
	{#each findPatternMatches(value, subpattern) as { inputPattern, match }}
		<option
			value={match}
			label={inputPatternsConfig[inputPattern].label}
		/>
	{/each}

	{#if portfoliosState.portfolios.length}
		{#each portfoliosState.portfolios as {name, accounts}, i (i)}
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


<style>
	[data-matched-input-pattern="address"],
	[data-matched-input-pattern="blockNumber"],
	/* [data-matched-input-pattern="ensName"], */
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
