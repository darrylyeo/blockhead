<script lang="ts">
	// External state
	export let address: string = ''

	export let required = false


	// Internal state
	let _address: string = address

	let inputElement

	// let isResolvingEns = false


	// Methods/hooks/lifecycle
	const onChange = () => {
		if(inputElement?.valid)
			address = _address
	}

	const onInput = () => {
		address = _address.trim()

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
	pattern={`0x[0-9a-f]{40}|.+[.](eth|[a-z]{2,})`}
	on:change={onChange}
	on:input={onInput}
/>
<!-- placeholder="0xabc...6789 / ens.eth" -->
