<script lang="ts">
	// Types/constants
	import type { EvmNetwork } from '$/schema/EvmNetwork'
	import { InputPattern, inputPatternsConfig } from '$/schema/_patterns'
	import type { TypeForInputPattern } from '$/schema/_patterns'
	import { findMatchedCaptureGroupName } from '$/lib/regex'

	export type Suggestion = {
		value: string
		label: string
		group?: string
	}


	// Props
	let {
		inputPatterns = Object.values(InputPattern),
		required = false,
		autofocus = false,
		placeholder,
		network,
		suggestions,
		history = $bindable([]),

		// Outputs
		value = $bindable(''),
		matchedPatterns = $bindable({}),
		datalistId = $bindable(crypto.randomUUID()),
		inputElement = $bindable(null as HTMLInputElement | null),

		...restProps
	}: SvelteHTMLElements['input'] & {
		inputPatterns?: InputPattern[]
		required?: boolean
		autofocus?: boolean
		placeholder?: string
		network?: EvmNetwork['$id']
		suggestions?: Suggestion[]
		history?: string[]

		// Outputs
		value?: string
		matchedPatterns?: Partial<TypeForInputPattern>
		datalistId?: string
		inputElement?: HTMLInputElement | null
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
	import { isTruthy } from '$/lib/isTruthy'

	const findPatternMatches = (value: string, pattern: RegExp) => (
		(
			pattern.global ?
				[...value.matchAll(pattern)]
			:
				[value.match(pattern)]
					.filter(isTruthy)
		)
			.flatMap(match => (
				Object.entries(match.groups ?? {})
					.map(([groupName, match]) => ({ inputPattern: groupName as InputPattern, match }))
					.filter(({match}) => match)
			))
	)


	// State
	const pattern = $derived(
		new RegExp(`^(?:${
			inputPatterns
				.sort((a, b) => (
					inputPatternsConfig[b].matchComplexity - inputPatternsConfig[a].matchComplexity
				))
				.map(inputPattern => (
					`(?<${inputPattern}>${inputPatternsConfig[inputPattern].pattern.source})`
				))
				.join('|')
		})$`)
	)

	const subpattern = $derived(
		new RegExp(
			`(?:${
				inputPatterns
					.sort((a, b) => (
						inputPatternsConfig[b].matchComplexity - inputPatternsConfig[a].matchComplexity
					))
					.map(inputPattern => (
						`(?<${inputPattern}>${inputPatternsConfig[inputPattern].pattern.source})`
					))
					.join('|')
			})`,
			'g'
		)
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
	import type { SvelteHTMLElements } from 'svelte/elements'

	afterNavigate(() => {
		if (history && value) {
			history = [...new Set([value, ...history])]
		}
	})
</script>


<input
	type="search"
	bind:this={inputElement}
	bind:value
	{required}
	placeholder={computedPlaceholder}

	pattern={pattern.source}
	data-matchPattern={matchedInputPattern || undefined}
	data-matchPattern-label={matchedInputPattern && inputPatternsConfig[matchedInputPattern]?.label || undefined}
	data-text={!matchedInputPattern || inputPatternsConfig[matchedInputPattern]?.isHumanReadable ? 'font-base' : 'font-monospace'}
	style:--input-annotation={matchedInputPattern && `" ${inputPatternsConfig[matchedInputPattern]?.label.toUpperCase()}   │   ✕"`}

	list={datalistId}

	onfocus={(e) => {
		if (e.target instanceof HTMLInputElement)
			e.target.select()
	}}

	{...restProps}
/>

<datalist id={datalistId}>
	{#each findPatternMatches(value, subpattern) as { inputPattern, match }}
		<option
			value={match}
			label={inputPatternsConfig[inputPattern].label}
		></option>
	{/each}

	{#if suggestions?.length}
		{@const groupedSuggestions = suggestions.reduce((acc, suggestion) => {
			const group = suggestion.group || 'Suggestions'
			if (!acc[group]) acc[group] = []
			acc[group].push(suggestion)
			return acc
		}, {} as Record<string, Suggestion[]>)}
		
		{#each Object.entries(groupedSuggestions) as [group, groupSuggestions]}
			<optgroup label={group}>
				{#each groupSuggestions as { value: _value, label }}
					<option
						value={_value}
						{label}
					></option>
				{/each}
			</optgroup>
		{/each}
	{/if}

	{#if history && history.length}
		<optgroup label="History">
			{#each (
				history
					.map(value => ({
						value,
						match: findPatternMatches(value, pattern)[0],
					}))
					.filter(({ match }) => match)
			) as {
				value: _value,
				match
			}}
				{@const inputPattern = inputPatternsConfig[match.inputPattern]}

				<option
					value={_value}
					label={`History${inputPattern ? ` │ ${inputPattern.label}` : ''}`}
				></option>
			{/each}
		</optgroup>
	{/if}
</datalist>


<style>
	input {
		&[data-matchPattern-label]:after {
			content: attr(data-matchedInputPattern-label);
			color: #000;
			place-self: center end;
			margin-right: 2.25em;

			opacity: 0.4;
			letter-spacing: 0.2ch;
			font-size: 0.8em;
			text-transform: uppercase;
		}

		&::-webkit-search-cancel-button {
			list-style-type: var(--input-annotation, "✕" attr(data-matchPattern-label));
			width: auto;
			margin-block: -0.5em;
			margin-inline: 0.4em;
			padding: 0.66em;

			font-family: var(--fontFamily-base);
			color: color-mix(in oklab, var(--text-primary) 60%, var(--accent));
			letter-spacing: 0.2ch;
			text-indent: 0.2ch;
			font-size: 0.8em;
			line-height: 1;
			text-transform: uppercase;
			white-space: pre;

			background-color: color-mix(in oklab, var(--text-primary) 6%, var(--background-primary));
			background-color: color-mix(in oklab, var(--accent) 8%, var(--background-primary));
			border-radius: 0.33em;
		}

		&::-webkit-textfield-decoration-container {
			width: 100%;
		}
	}
</style>
