<script lang="ts">
	// Types
	import type { Ethereum } from '$/data/networks/types'
	import { StringPattern, stringPatterns } from '$/data/stringPatterns'


	// External state
	export let address: Ethereum.Address | string = ''

	export let name: string
	export let patterns: StringPattern[] = [
		StringPattern.Address,
		StringPattern.EnsName,
	]
	export let required = false
	export let placeholder: string
	export let autofocus = false

	export let suggestedValues: Datalist<typeof address>['$$prop_def']['list']
	
	// (Computed)
	$: placeholder = $$props.placeholder || (
		patterns
			.map(type => 'placeholderLong' in stringPatterns[type] ? stringPatterns[type].placeholderLong : stringPatterns[type].placeholder)
			.join(' / ')
	)


	// Functions
	import { createExactMatcher, createPartialMatcher } from '$/utils/stringPatterns'
	import { findMatchedCaptureGroup, findMatchedCaptureGroupName } from '$/utils/findMatchedCaptureGroup'


	// Internal state
	let value: string = address

	let inputElement

	// let isResolvingEns = false

	let datalistId: Datalist<typeof address>['$$prop_def']['datalistId']

	$: _patterns = (
		patterns
			.map(inputPattern => ({
				name: inputPattern,
				pattern: stringPatterns[inputPattern].pattern,
				complexity: stringPatterns[inputPattern].complexity
			}))
	)

	$: exactMatcher = createExactMatcher(_patterns)

	$: partialMatcher = createPartialMatcher(_patterns)


	// Components
	import Datalist from './Datalist.svelte'
</script>


<style>
	[data-matched-input-pattern="address"] {
		font-family: var(--monospace-fonts);
	}
</style>


<input
	type="text"
	bind:this={inputElement}
	bind:value
	{name}
	{required}
	{autofocus}
	{placeholder}
	pattern={exactMatcher.source}
	on:input={event => {
		if(!(event instanceof InputEvent)) return

		if(
			[
				'insertFromDrop',
				'insertFromPaste'
			].includes(event.inputType)
			&& event.data
		){
			address = event.data
			value = address
		}
	}}
	on:change={() => {
		address = findMatchedCaptureGroup(partialMatcher, value)?.[0] ?? value ?? ''
		value = address
	}}
	data-matched-input-pattern={findMatchedCaptureGroupName(exactMatcher, value)}
	list={datalistId}
/>

<Datalist list={suggestedValues} bind:datalistId />
