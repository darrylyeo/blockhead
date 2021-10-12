<script lang="ts">
	import type { CryptoAddress } from '../data/CryptoAddress'
	
	export let address: CryptoAddress = ''

	export let autofocus = false
	export let required = false

	export let placeholder = 'Address (0xabcd...6789) / Transaction ID (0xabcdef...456789) / Block Number (12345678) / ENS Domain (vitalik.eth)'
	const isValid = address =>
		address !== undefined
</script>

<input class="address-field" type="search" class:is-valid={isValid(address)} {placeholder} bind:value={address} {autofocus} {required} />