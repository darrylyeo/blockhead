<script lang="ts">
	// External state
	export let address: string = ''

	export let name: string
	export let required = false
	export let placeholder = "0x0000000000000000000000000000000000000000 / ens.eth"
	export let autofocus = false


	// Internal state
	let value: string = address

	let inputElement

	// let isResolvingEns = false


	// const pattern = /^(?<address>0x[0-9a-fA-F]{40})|(?<ensName>(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test))$/g
	const pattern = /(?<ensName>(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test))|(?<lensName>(?:[^. ]+[.])(?:lens|test))|(?<address>0x[0-9a-fA-F]{40})/
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


	import { findMatchedCaptureGroup } from '../utils/findMatchedCaptureGroup'


	// Components
	// import { isAddress } from 'ethers'
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
	data-format={findMatchedCaptureGroup(new RegExp(`^${pattern.source}$`), value)}
/>
<!-- placeholder="0xabc...6789 / ens.eth" -->
