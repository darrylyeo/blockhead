<script lang="ts">
	// External state
	export let address: string = ''

	export let required = false


	// Internal state
	let _address: string = address

	let inputElement

	// let isResolvingEns = false


	// const pattern = /^(?<address>0x[0-9a-fA-F]{40})|(?<ensName>(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test))$/g
	const pattern = /(?<ensName>(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test))|(?<address>0x[0-9a-fA-F]{40})/
	// const pattern = /(?<ensName>(?:[^. ]+[.])+(?:eth|xyz|luxe|kred|art|club|test))|(?<address>0x[0-9a-fA-F]{40})|(?<ensTld>(?:eth|xyz|luxe|kred|art|club|test))/


	// Methods/hooks/lifecycle

	const onInput = () => {
		// _address = _address.trim()

		// address = _address
	}

	const onChange = () => {
		// address = inputElement?.valid || _address === '' ? _address : ''
		// address = pattern.test(_address) || _address === '' ? _address : ''
		address = _address.match(pattern)?.[0] || _address || ''

		// address =
		// 	_address.match(/(?<ensName>(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test))/)?.[0]
		// 	|| _address.match(/(?<address>0x[0-9a-fA-F]{40})/)?.[0]
		// 	|| _address
		// 	|| ''

		_address = address
	}


	import { findMatchedCaptureGroup } from '../utils/findMatchedCaptureGroup'


	// Components
	// import { isAddress } from '@ethersproject/address'
</script>


<style>
	[data-format="address"] {
		font-family: var(--monospace-fonts);
	}
</style>


<input
	type="text"
	{required}
	bind:this={inputElement}
	bind:value={_address}
	placeholder="0x0000000000000000000000000000000000000000 / ens.eth"
	pattern={pattern.source}
	on:input={onInput}
	on:change={onChange}
	data-format={findMatchedCaptureGroup(new RegExp(`^${pattern.source}$`), _address)}
/>
<!-- placeholder="0xabc...6789 / ens.eth" -->
