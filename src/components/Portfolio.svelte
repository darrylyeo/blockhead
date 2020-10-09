<script lang="ts">
    import { onMount } from 'svelte'
    import Address from './Address.svelte';
    import TokenValue from './TokenValue.svelte';

	import type { CryptoAddress } from '../data/CryptoAddress'
    import type { CryptoPosition } from '../data/CryptoPosition'
    
	import { getAccounts } from '../data/ethereum/accounts'

    export let address: CryptoAddress

    let accounts
    onMount(() => {
        accounts = getAccounts()
    })
</script>

<h2><Address {address} /></h2>

<!-- {#each balances as balance} -->
    <TokenValue token="BTC" />
<!-- {/each} -->