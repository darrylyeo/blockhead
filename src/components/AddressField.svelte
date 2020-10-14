<script lang="ts">
	import type { CryptoAddress } from '../data/CryptoAddress'
	
	export let address: CryptoAddress = ''

	const isValid = address =>
		address !== undefined
</script>

<input type="text" class:is-valid={isValid(address)} placeholder="Address (0xabcd...6789) / ENS (example.eth)" bind:value={address} />