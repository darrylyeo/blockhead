<script lang="ts">
	import type { CryptoAddress } from '../data/CryptoAddress'
	
	export let address: CryptoAddress = ''

	export let autofocus = false
	export let required = false

	const isValid = address =>
		address !== undefined
</script>

<input class="address-field" type="text" class:is-valid={isValid(address)} placeholder="Address (0xabcd...6789) / ENS (mywallet.eth)" bind:value={address} {autofocus} {required} />