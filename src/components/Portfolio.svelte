<script lang="ts">
    import Address from './Address.svelte';
    import TokenValue from './TokenValue.svelte';

	import type { CryptoAddress } from '../data/CryptoAddress'
	import type { CryptoPosition } from '../data/CryptoPosition'

    export let address: CryptoAddress
</script>

<h2><Address {address} /></h2>

<!-- {#each balances as balance} -->
    <TokenValue token="BTC" />
<!-- {/each} -->