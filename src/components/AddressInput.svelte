<script lang="ts">
	// External state
	export let address: string = ''

	export let required = false


	// Internal state
	let _address: string = address

	let inputElement

	// let isResolvingEns = false


	const pattern = /(?<ensName>(?:[^. ]+[^ ])*?(?:eth|xyz|luxe|kred|art|club|test))/g


	// Methods/hooks/lifecycle

	const onInput = () => {
		// _address = _address.trim()

		// address = _address
	}

	const onChange = () => {
		// address = inputElement?.valid || _address === '' ? _address : ''
		// address = pattern.test(_address) || _address === '' ? _address : ''
		address = _address.match(pattern)?.[0] || _address || ''

		_address = address
	}


	// Components
	// import { isAddress } from '@ethersproject/address'
</script>


<style>
	/* input {
		font-family: var(--monospace-fonts);
	} */
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
/>
<!-- placeholder="0xabc...6789 / ens.eth" -->
