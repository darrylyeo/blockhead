<script lang="ts">
	// Types
	import type { Ethereum } from '../data/networks/types'


	// External state
	export let address: Ethereum.Address | string = ''

	export let name: string
	export let required = false
	export let placeholder = "0x0000000000000000000000000000000000000000 / ens.eth"
	export let autofocus = false

	export let suggestedValues: Datalist<typeof address>['$$prop_def']['list']


	// Internal state
	let value: string = address

	let inputElement

	// let isResolvingEns = false

	let datalistId: Datalist<typeof address>['$$prop_def']['datalistId']


	// const pattern = /^(?<address>0x[0-9a-fA-F]{40})|(?<ensName>(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test))$/g
	const pattern = /(?<ensName>(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club))|(?<lensName>(?:[^. ]+[.])(?:lens|test))|(?<address>0x[0-9a-fA-F]{40})/
	// const pattern = /(?<ensName>(?:[^. ]+[.])+(?:eth|xyz|luxe|kred|art|club|test))|(?<address>0x[0-9a-fA-F]{40})|(?<ensTld>(?:eth|xyz|luxe|kred|art|club|test))/


	// Methods/hooks/lifecycle

	const onInput = (e: InputEvent) => {
		if([
			'insertFromDrop',
			'insertFromPaste'
		].includes(e.inputType)){
			address = value.match(pattern)?.[0] || value || ''
			value = address
		}

		// value = value.trim()
		// address = value
	}

	const onChange = () => {
		// address = inputElement?.valid || value === '' ? value : ''
		// address = pattern.test(value) || value === '' ? value : ''
		address = value.match(pattern)?.[0] || value || ''

		// address =
		// 	value.match(/(?<ensName>(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test))/)?.[0]
		// 	|| value.match(/(?<address>0x[0-9a-fA-F]{40})/)?.[0]
		// 	|| value
		// 	|| ''

		value = address
	}


	import { findMatchedCaptureGroupName } from '../utils/findMatchedCaptureGroup'
	// import { isAddress } from 'ethers'
	
	
	// Components
	import Datalist from './Datalist.svelte'
</script>


<style>
	[data-format="address"] {
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
	pattern={pattern.source}
	on:input={onInput}
	on:change={onChange}
	data-format={findMatchedCaptureGroupName(new RegExp(`^${pattern.source}$`), value)}
	list={datalistId}
/>
<!-- placeholder="0xabc...6789 / ens.eth" -->

<Datalist list={suggestedValues} bind:datalistId />
