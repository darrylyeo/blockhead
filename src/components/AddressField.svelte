<script lang="ts">
	import type { CryptoAddress } from '../data/CryptoAddress'
	
	export let address: CryptoAddress = ''

	export let autofocus = false
	export let required = false
	export let placeholder = 'Address (0xabcd...6789) / ENS Domain (mywallet.eth)'

	const isValid = address =>
		address !== undefined
</script>

<input class="address-field" type="search" class:is-valid={isValid(address)} {placeholder} bind:value={address} {autofocus} {required} />